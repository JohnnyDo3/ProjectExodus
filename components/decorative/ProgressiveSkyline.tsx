'use client'

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
  return (
    <div className="absolute bottom-[9px] left-0 right-0 pointer-events-none z-10 overflow-hidden">
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
          50% { opacity: 1; }
        }

        .window-light {
          animation: twinkle 3s ease-in-out infinite;
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

              {/* Red Barn #1 - Large Classic Barn with Details */}
              <g>
                <rect x="180" y="185" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 176,185 L 196,170 L 216,185 Z" fill="#a83232" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 181,190 L 211,190 M 181,195 L 211,195 M 181,200 L 211,200" stroke="#a83232" strokeWidth="0.5" opacity="1" />
                {/* Barn doors */}
                <rect x="194" y="193" width="8" height="12" fill="#6d4428" opacity="1" />
                {/* Barn door cross pattern */}
                <path d="M 198,197 L 198,205 M 194,201 L 202,201" stroke="#5a3a2a" strokeWidth="1" opacity="1" />
                {/* Hayloft window */}
                <rect x="184" y="190" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <rect x="204" y="190" width="4" height="5" fill="#4a4a4a" opacity="1" />
                {/* Weather vane on top */}
                <rect x="195.5" y="168" width="1" height="5" fill="#4a4a4a" opacity="1" />
                <path d="M 191,170 L 196,168 L 196,172 Z" fill="#d4af37" opacity="1" />
                <path d="M 201,170 L 196,168 L 196,172 Z" fill="#d4af37" opacity="1" />
                {/* Silo next to barn */}
                <rect x="215" y="180" width="8" height="25" fill="#d4d4d4" opacity="1" />
                <ellipse cx="219" cy="180" rx="4" ry="2" fill="#b8b8b8" opacity="1" />
                {/* Silo roof */}
                <path d="M 217,178 L 219,173 L 221,178" fill="#a83232" opacity="1" />
                {/* Silo bands */}
                <rect x="215" y="188" width="8" height="1" fill="#a8a8a8" opacity="1" />
                <rect x="215" y="196" width="8" height="1" fill="#a8a8a8" opacity="1" />
              </g>

              {/* Red Barn #2 - Smaller Barn */}
              <g>
                <rect x="450" y="190" width="24" height="15" fill="#c73e3e" opacity="1" />
                <path d="M 447,190 L 462,178 L 477,190 Z" fill="#a83232" opacity="1" />
                <rect x="458" y="195" width="6" height="10" fill="#6d4428" opacity="1" />
                <rect x="452" y="193" width="3" height="4" fill="#4a4a4a" opacity="1" />
                <rect x="467" y="193" width="3" height="4" fill="#4a4a4a" opacity="1" />
                {/* Small silo */}
                <rect x="477" y="188" width="6" height="17" fill="#d4d4d4" opacity="1" />
                <ellipse cx="480" cy="188" rx="3" ry="1.5" fill="#b8b8b8" opacity="1" />
              </g>

              {/* Red Barn #3 - Rustic Small Barn */}
              <g>
                <rect x="650" y="192" width="20" height="13" fill="#c73e3e" opacity="1" />
                <path d="M 648,192 L 660,182 L 672,192 Z" fill="#a83232" opacity="1" />
                <rect x="656" y="196" width="5" height="9" fill="#6d4428" opacity="1" />
                <rect x="651" y="194" width="2.5" height="3" fill="#4a4a4a" opacity="1" />
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
                    <path d="M 798,${195 + i * 3} L 800,${192 + i * 3} L 802,${195 + i * 3} Z" fill="#f5f5f5" />
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
                <rect x="800" y="215" width="1200" height="35" fill={`url(#roadGradient-${iteration})`} />

                {/* Road center line (dashed) */}
                {Array.from({length: 30}).map((_, i) => (
                  <rect key={`dash-${i}`} x={800 + i * 40} y="231" width="20" height="2" opacity="1" />
                ))}

                {/* Sidewalks */}
                <rect x="800" y="210" width="1200" height="4" opacity="1" />
                <rect x="800" y="251" width="1200" height="2" opacity="1" />
              </g>

              {/* Ultra-detailed miniature houses - Victorian style */}
              {[820, 1120, 1420, 1720].map((x, i) => (
                <g key={`victorian-${i}`}>
                  {/* Main house body - small and detailed */}
                  <rect x={x} y="185" width="28" height="22" fill={`url(#victorianHouse-${iteration})`} />

                  {/* Steep Victorian roof with decorative peak */}
                  <path d={`M ${x-3},185 L ${x+14},170 L ${x+31},185 Z`} fill={`url(#victorianRoof-${iteration})`} />
                  <rect x={x+12} y="170" width="4" height="15" fill={`url(#victorianHouse-${iteration})`} /> {/* Tower */}
                  <path d={`M ${x+10},170 L ${x+14},163 L ${x+18},170 Z`} fill={`url(#victorianRoof-${iteration})`} /> {/* Tower roof */}

                  {/* Detailed windows */}
                  <rect x={x+4} y="190" width="5" height="7" fill="#6b8ea8" opacity="1" />
                  <rect x={x+19} y="190" width="5" height="7" fill="#6b8ea8" opacity="1" />
                  {/* Tower window - centered within tower (tower is at x+12, width 4) */}
                  <rect x={x+12.5} y="178" width="3" height="5" fill="#6b8ea8" opacity="1" />

                  {/* Front door with porch */}
                  <rect x={x+11} y="197" width="6" height="10" fill="#8b5a3c" opacity="1" />
                  <path d={`M ${x+8},197 L ${x+20},197`} stroke="#6d4428" strokeWidth="1.5" opacity="1" />

                  {/* Chimney with smoke */}
                  <rect x={x+22} y="176" width="3" height="9" fill="#a85757" opacity="1" />
                  <ellipse className="chimney-smoke" cx={x+23.5} cy="173" rx="2" ry="3" fill="#c4c4c4" opacity="1" />

                  {/* Decorative trim */}
                  <rect x={x} y="207" width="28" height="1.5" fill="#d4c4a8" opacity="1" />
                </g>
              ))}

              {/* Colonial style houses - symmetrical design */}
              {[1000, 1300, 1600, 1900].map((x, i) => (
                <g key={`colonial-${i}`}>
                  {/* Main colonial structure */}
                  <rect x={x} y="183" width="32" height="24" fill={`url(#colonialHouse-${iteration})`} />

                  {/* Classic colonial roof */}
                  <path d={`M ${x-2},183 L ${x+16},172 L ${x+34},183 Z`} fill={`url(#colonialRoof-${iteration})`} />

                  {/* Symmetrical windows (4 windows, 2 stories) */}
                  <rect x={x+4} y="188" width="5" height="6" fill="#6b8ea8" opacity="1" />
                  <rect x={x+23} y="188" width="5" height="6" fill="#6b8ea8" opacity="1" />
                  <rect x={x+4} y="197" width="5" height="6" fill="#6b8ea8" opacity="1" />
                  <rect x={x+23} y="197" width="5" height="6" fill="#6b8ea8" opacity="1" />

                  {/* Centered front door */}
                  <rect x={x+13} y="197" width="6" height="10" fill="#5a4a3a" opacity="1" />
                  <circle cx={x+17} cy="202" r="0.5" fill="#d4af37" opacity="1" />

                  {/* Front porch pillars */}
                  <rect x={x+10} y="197" width="1.5" height="10" fill="#e8e8e8" opacity="1" />
                  <rect x={x+20.5} y="197" width="1.5" height="10" fill="#e8e8e8" opacity="1" />

                  {/* Chimney */}
                  <rect x={x+27} y="175" width="3" height="8" fill="#a85757" opacity="1" />

                  {/* Shutters */}
                  <rect x={x+2.5} y="188" width="1" height="6" fill="#2f2f2f" opacity="1" />
                  <rect x={x+9.5} y="188" width="1" height="6" fill="#2f2f2f" opacity="1" />
                  <rect x={x+21.5} y="188" width="1" height="6" fill="#2f2f2f" opacity="1" />
                  <rect x={x+28.5} y="188" width="1" height="6" fill="#2f2f2f" opacity="1" />
                </g>
              ))}

              {/* Ranch style houses - low and wide */}
              {[880, 1180, 1480, 1780].map((x, i) => (
                <g key={`ranch-${i}`}>
                  {/* Wide, low ranch house */}
                  <rect x={x} y="193" width="38" height="14" fill={`url(#ranchHouse-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-2},193 L ${x+19},186 L ${x+40},193 Z`} fill={`url(#ranchRoof-${iteration})`} />

                  {/* Horizontal windows */}
                  <rect x={x+5} y="195" width="8" height="4" fill="#6b8ea8" opacity="1" />
                  <rect x={x+25} y="195" width="8" height="4" fill="#6b8ea8" opacity="1" />

                  {/* Attached garage */}
                  <rect x={x+30} y="197" width="7" height="10" fill="#c9b18f" opacity="1" />
                  <rect x={x+31} y="203" width="5" height="4" fill="#4a4a4a" opacity="1" />

                  {/* Front door */}
                  <rect x={x+15} y="199" width="4" height="8" fill="#6b5a45" opacity="1" />

                  {/* Driveway */}
                  <path d={`M ${x+33},207 L ${x+33},215`} stroke="#8a8a8a" strokeWidth="4" opacity="1" />
                </g>
              ))}

              {/* Cottage style houses - small and cozy */}
              {[1060, 1360, 1660, 1960].map((x, i) => (
                <g key={`cottage-${i}`}>
                  {/* Small cottage body */}
                  <rect x={x} y="192" width="24" height="15" fill={`url(#cottageHouse-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-2},192 Q ${x+12},182 ${x+26},192 Z`} fill={`url(#cottageRoof-${iteration})`} />

                  {/* Arched door */}
                  <path d={`M ${x+9},197 L ${x+9},207 L ${x+15},207 L ${x+15},197 Q ${x+12},195 ${x+9},197 Z`} fill="#a85757" opacity="1" />

                  {/* Small cottage windows */}
                  <rect x={x+4} y="194" width="4" height="4" fill="#6b8ea8" opacity="1" />
                  <rect x={x+16} y="194" width="4" height="4" fill="#6b8ea8" opacity="1" />

                  {/* Window boxes with flowers */}
                  <rect x={x+3} y="198" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <rect x={x+15} y="198" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <circle cx={x+5} cy="197" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+7} cy="197" r="0.8" fill="#ffd700" opacity="1" />
                  <circle cx={x+17} cy="197" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+19} cy="197" r="0.8" fill="#ffd700" opacity="1" />

                  {/* Small chimney */}
                  <rect x={x+19} y="186" width="2.5" height="6" fill="#a85757" opacity="1" />

                  {/* Garden fence */}
                  {Array.from({length: 6}).map((_, fi) => (
                    <rect key={`fence-${fi}`} x={x + fi * 4} y="207" width="1" height="5" fill="#e8d4b8" opacity="1" />
                  ))}
                </g>
              ))}

              {/* Modern style houses - clean lines */}
              {[940, 1240, 1540, 1840].map((x, i) => (
                <g key={`modern-${i}`}>
                  {/* Cubic modern house */}
                  <rect x={x} y="188" width="26" height="19" fill={`url(#modernHouse-${iteration})`} />

                  {/* Flat/minimal roof */}
                  <rect x={x-1} y="186" width="28" height="2" fill={`url(#modernRoof-${iteration})`} />

                  {/* Large modern windows */}
                  <rect x={x+2} y="192" width="8" height="11" fill="#6b8ea8" opacity="1" />
                  <rect x={x+16} y="192" width="8" height="11" fill="#6b8ea8" opacity="1" />

                  {/* Minimal door */}
                  <rect x={x+11} y="199" width="4" height="8" fill="#5a7a8a" opacity="1" />

                  {/* Solar panels on roof */}
                  <rect x={x+2} y="187" width="10" height="1" fill="#3d5866" opacity="1" />
                  <rect x={x+14} y="187" width="10" height="1" fill="#3d5866" opacity="1" />

                  {/* Modern landscaping */}
                  <circle cx={x+4} cy="208" r="3" fill="#8bc34a" opacity="1" />
                  <circle cx={x+22} cy="208" r="3" fill="#8bc34a" opacity="1" />
                </g>
              ))}

              {/* Yard trees and landscaping - between houses, not blocking views */}
              <g opacity="1">
                {[815, 865, 1020, 1175, 1225, 1280, 1330, 1385, 1590, 1645, 1695, 1850, 1900, 1950].map((x, i) => (
                  <g key={`yard-tree-${i}`}>
                    {/* Tree trunk */}
                    <rect x={x} y="203" width="2" height="7" fill="#6b5a45" opacity="1" />
                    {/* Tree foliage */}
                    <circle cx={x+1} cy="201" r="4" fill="#5a8a5a" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Street lights along the road */}
              <g opacity="1">
                {[840, 990, 1140, 1290, 1440, 1590, 1740, 1890].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    <rect x={x} y="208" width="2" height="15" fill="#4a4a4a" opacity="1" />
                    <circle cx={x+1} cy="206" r="3" fill="#ffd700" opacity="1" />
                    <circle cx={x+1} cy="206" r="1.5" fill="#ffeb3b" className="window-light" />
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

              {/* Stop signs at intersections */}
              <g opacity="1">
                {[1100, 1400, 1700].map((x, i) => (
                  <g key={`stop-sign-${i}`}>
                    <rect x={x} y="208" width="1.5" height="10" fill="#4a4a4a" opacity="1" />
                    <polygon points={`${x+0.75},204 ${x+4},206 ${x+4},210 ${x+0.75},212 ${x-2.5},210 ${x-2.5},206`} fill="#cc3333" opacity="1" />
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

                {/* Grass foreground area between sidewalk and buildings */}
                <rect x="2000" y="215" width="1800" height="5" fill="#7aa87a" opacity="1" />

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
                  {x: 2682, h: 72, w: 54, color: "#f0f8f0"}, {x: 2746, h: 95, w: 66, color: "#e0f2e0"},
                  {x: 2822, h: 82, w: 58, color: "#e8f4e8"}, {x: 2890, h: 75, w: 52, color: "#f0f8f0"},
                  {x: 2952, h: 92, w: 64, color: "#e0f2e0"}, {x: 3026, h: 68, w: 50, color: "#e8f4e8"},
                  {x: 3086, h: 88, w: 62, color: "#f0f8f0"}, {x: 3158, h: 78, w: 56, color: "#e0f2e0"},
                  {x: 3224, h: 98, w: 68, color: "#e8f4e8"}, {x: 3302, h: 85, w: 60, color: "#f0f8f0"},
                  {x: 3372, h: 72, w: 54, color: "#e0f2e0"}, {x: 3436, h: 95, w: 66, color: "#e8f4e8"},
                  {x: 3512, h: 82, w: 58, color: "#f0f8f0"}, {x: 3580, h: 100, w: 70, color: "#e0f2e0"},
                  {x: 3660, h: 88, w: 62, color: "#e8f4e8"}, {x: 3732, h: 75, w: 54, color: "#f0f8f0"}
                ].map((bldg, i) => (
                  <g key={`green-bldg-${i}`}>
                    {/* Building body with green tint */}
                    <rect x={bldg.x} y={215-bldg.h} width={bldg.w} height={bldg.h} fill={bldg.color} opacity="1" />

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

                    {/* VERTICAL GARDENS - greenery cascading down facade */}
                    <g opacity="1">
                      {Array.from({length: Math.floor(bldg.w/18)}).map((_, vine) => (
                        <path key={`vine-${vine}`}
                              d={`M ${bldg.x+8+vine*18},${215-bldg.h+8} Q ${bldg.x+10+vine*18},${215-bldg.h+bldg.h/3} ${bldg.x+8+vine*18},${215-bldg.h+2*bldg.h/3} Q ${bldg.x+10+vine*18},${215-bldg.h+bldg.h-5} ${bldg.x+8+vine*18},${215-bldg.h+bldg.h-2}`}
                              stroke="#5a8a5a"
                              strokeWidth="3"
                              fill="none" />
                      ))}
                    </g>

                    {/* Large windows with frames for natural light */}
                    <g opacity="1">
                      {Array.from({length: Math.floor(bldg.h/20)}).map((_, row) => (
                        Array.from({length: Math.floor(bldg.w/16)}).map((_, col) => (
                          <g key={`win-${row}-${col}`}>
                            {/* Window frame */}
                            <rect x={bldg.x + 4 + col * 16}
                                  y={215 - bldg.h + 12 + row * 20}
                                  width="10"
                                  height="14"
                                  fill="#8a9a8a"
                                  opacity="1" />
                            {/* Window glass */}
                            <rect x={bldg.x + 5 + col * 16}
                                  y={215 - bldg.h + 13 + row * 20}
                                  width="8"
                                  height="12"
                                  fill="#6b8ea8"
                                  opacity="1" />
                          </g>
                        ))
                      ))}
                    </g>

                    {/* Balconies on select floors - only for taller buildings */}
                    {/* Balconies align with window grid: windows at x+4+col*16, y+12+row*20 */}
                    {bldg.h > 70 && (
                      <g opacity="1">
                        {Array.from({length: Math.floor((bldg.h - 20)/40)}).map((_, floor) => (
                          Array.from({length: Math.max(1, Math.floor((bldg.w - 8)/32))}).map((_, side) => {
                            // Align balcony X with window column (windows at bldg.x + 4 + col*16)
                            const balconyX = bldg.x + 4 + side * 32
                            // Balcony sits at bottom of window row (window at y+12, height 14, so bottom at y+26)
                            // Place balcony every 2 window rows (40px spacing)
                            const windowRowY = 215 - bldg.h + 26 + floor * 40
                            return (
                              <g key={`balc-${floor}-${side}`}>
                                {/* Balcony floor/platform - extends out from building */}
                                <rect x={balconyX - 1}
                                      y={windowRowY}
                                      width="12"
                                      height="2"
                                      fill="#6a7a6a"
                                      opacity="1" />
                                {/* Balcony railing - sits on top of platform */}
                                <rect x={balconyX - 1}
                                      y={windowRowY - 6}
                                      width="1"
                                      height="6"
                                      fill="#5a6a5a"
                                      opacity="1" />
                                <rect x={balconyX + 10}
                                      y={windowRowY - 6}
                                      width="1"
                                      height="6"
                                      fill="#5a6a5a"
                                      opacity="1" />
                                {/* Top rail connecting posts */}
                                <rect x={balconyX - 1}
                                      y={windowRowY - 6}
                                      width="12"
                                      height="1"
                                      fill="#5a6a5a"
                                      opacity="1" />
                              </g>
                            )
                          })
                        ))}
                      </g>
                    )}

                    {/* Ground-level entrance doors */}
                    <g opacity="1">
                      <rect x={bldg.x + bldg.w/2 - 6}
                            y={215 - 12}
                            width="12"
                            height="12"
                            fill="#6a7a6a"
                            opacity="1" />
                      {/* Door handle */}
                      <circle cx={bldg.x + bldg.w/2 + 3}
                              cy={215 - 6}
                              r="0.8"
                              fill="#d4af37"
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
                ))}
              </g>

              {/* City Park - Green space with fountain, benches, and trees */}
              <g>
                {/* Park 1 - at former 5th building location (x: 2278) - Continuation of landscape */}
                <g>
                  {/* Two trees in back of foreground */}
                  <g key="park1-tree-1">
                    <rect x="2275" y="192" width="4" height="16" fill="#6b5a45" opacity="1" />
                    <circle cx="2277" cy="190" r="9" fill="#4a7c2f" opacity="1" />
                    <circle cx="2273" cy="193" r="6" fill="#5a8a5a" opacity="1" />
                    <circle cx="2281" cy="193" r="6" fill="#5a8a5a" opacity="1" />
                  </g>
                  <g key="park1-tree-2">
                    <rect x="2315" y="194" width="4" height="15" fill="#6b5a45" opacity="1" />
                    <circle cx="2317" cy="192" r="8" fill="#4a7c2f" opacity="1" />
                    <circle cx="2313" cy="195" r="6" fill="#5a8a5a" opacity="1" />
                    <circle cx="2321" cy="195" r="6" fill="#5a8a5a" opacity="1" />
                  </g>

                  {/* Fountain in middle */}
                  <g>
                    {/* Fountain base */}
                    <ellipse cx="2298" cy="210" rx="10" ry="4" fill="#a8a8a8" opacity="1" />
                    <rect x="2293" y="206" width="10" height="4" fill="#b8b8b8" opacity="1" rx="1" />

                    {/* Fountain basin */}
                    <ellipse cx="2298" cy="206" rx="8" ry="3" fill="#87CEEB" opacity="1" />

                    {/* Water spray */}
                    <circle cx="2298" cy="203" r="1.5" fill="#B0E0E6" opacity="1" />
                    <circle cx="2295" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2301" cy="204" r="1" fill="#B0E0E6" opacity="1" />
                    <circle cx="2296" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />
                    <circle cx="2300" cy="201" r="0.8" fill="#B0E0E6" opacity="1" />

                    {/* Central water column */}
                    <path d="M 2298,203 L 2298,198 L 2297,199 M 2298,198 L 2299,199"
                          stroke="#B0E0E6" strokeWidth="0.8" fill="none" opacity="1" />
                  </g>

                  {/* Bench on left side */}
                  <g>
                    <rect x="2273" y="209" width="12" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2273" y="205" width="12" height="4" fill="#8b7355" opacity="1" />
                    <rect x="2273" y="207" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2283" y="207" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>

                  {/* Bench on right side */}
                  <g>
                    <rect x="2310" y="209" width="12" height="2" fill="#8b7355" opacity="1" />
                    <rect x="2310" y="205" width="12" height="4" fill="#8b7355" opacity="1" />
                    <rect x="2310" y="207" width="2" height="4" fill="#6b5a45" opacity="1" />
                    <rect x="2320" y="207" width="2" height="4" fill="#6b5a45" opacity="1" />
                  </g>
                </g>
              </g>

              {/* Trees lining EVERY street - Dense urban forest with varied depth! */}
              <g opacity="1">
                {Array.from({length: 45}).map((_, i) => {
                  const x = 2030 + i * 40;
                  // Randomize y position for depth variation (195-210 range)
                  const yVariation = [0, 3, 7, 2, 10, 5, 8, 1, 12, 4, 6, 9, 3, 11, 2, 8, 5, 1, 7, 10, 4, 6, 9, 3, 12, 5, 8, 2, 11, 7, 4, 1, 9, 6, 10, 3, 8, 5, 12, 2, 7, 4, 11, 6, 9][i % 45];
                  const treeY = 195 + yVariation;
                  const trunkHeight = 13 + (yVariation > 6 ? 2 : 0); // Taller trunks for closer trees
                  const foliageRadius = yVariation > 6 ? 9 : 8; // Larger foliage for closer trees

                  return (
                    <g key={`green-tree-${i}`}>
                      {/* Tree trunk */}
                      <rect x={x} y={treeY + 7} width="4" height={trunkHeight} fill="#6b5a45" opacity="1" />
                      {/* Lush green foliage */}
                      <circle cx={x+2} cy={treeY + 5} r={foliageRadius} fill="#4a7c2f" opacity="1" />
                      <circle cx={x-3} cy={treeY + 7} r={foliageRadius - 2} fill="#5a8a5a" opacity="1" />
                      <circle cx={x+7} cy={treeY + 7} r={foliageRadius - 2} fill="#5a8a5a" opacity="1" />
                      <circle cx={x+2} cy={treeY} r={foliageRadius - 3} fill="#6a9a6a" opacity="1" />
                    </g>
                  );
                })}
              </g>

              {/* Water features & fountains */}
              <g>
                {[2250, 2750, 3250, 3750].map((x, i) => (
                  <g key={`fountain-${i}`}>
                    {/* Fountain basin */}
                    <ellipse cx={x} cy="208" rx="18" ry="6" fill="#6b8ea8" opacity="1" />
                    {/* Water spray */}
                    <circle cx={x} cy="200" r="3" fill="#add8e6" opacity="1" />
                    <circle cx={x-4} cy="203" r="2" fill="#add8e6" opacity="1" />
                    <circle cx={x+4} cy="203" r="2" fill="#add8e6" opacity="1" />
                    <circle cx={x} cy="196" r="2" fill="#add8e6" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Electric cars/bikes on streets */}
              <g opacity="1">
                {Array.from({length: 20}).map((_, i) => (
                  <g key={`e-vehicle-${i}`}>
                    <ellipse cx={2100 + i * 90} cy="227" rx="6" ry="3" fill="#5a8a5a" />
                    <circle cx={2100 + i * 90} cy="225" r="2" fill="#6b8ea8" opacity="1" />
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
                    <path d="M 3798,${195 + i * 3} L 3800,${192 + i * 3} L 3802,${195 + i * 3} Z" fill="#f5f5f5" />
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

              {/* Red barns - matching opening, extended */}
              <g>
                <rect x="3980" y="185" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 3976,185 L 3996,170 L 4016,185 Z" fill="#a83232" opacity="1" />
                <rect x="3994" y="193" width="8" height="12" fill="#6d4428" opacity="1" />
                <rect x="4015" y="180" width="8" height="25" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4019" cy="180" rx="4" ry="2" fill="#b8b8b8" opacity="1" />

                <rect x="4250" y="190" width="24" height="15" fill="#c73e3e" opacity="1" />
                <path d="M 4247,190 L 4262,178 L 4277,190 Z" fill="#a83232" opacity="1" />
                <rect x="4258" y="195" width="6" height="10" fill="#6d4428" opacity="1" />

                <rect x="4450" y="192" width="20" height="13" fill="#c73e3e" opacity="1" />
                <path d="M 4448,192 L 4460,182 L 4472,192 Z" fill="#a83232" opacity="1" />
                <rect x="4456" y="196" width="5" height="9" fill="#6d4428" opacity="1" />

                <rect x="4680" y="187" width="28" height="18" fill="#c73e3e" opacity="1" />
                <path d="M 4677,187 L 4694,174 L 4711,187 Z" fill="#a83232" opacity="1" />
                <rect x="4690" y="194" width="7" height="11" fill="#6d4428" opacity="1" />
                <rect x="4711" y="183" width="7" height="22" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4714.5" cy="183" rx="3.5" ry="1.8" fill="#b8b8b8" opacity="1" />

                <rect x="4900" y="191" width="22" height="14" fill="#c73e3e" opacity="1" />
                <path d="M 4898,191 L 4911,180 L 4924,191 Z" fill="#a83232" opacity="1" />
                <rect x="4907" y="196" width="6" height="9" fill="#6d4428" opacity="1" />
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
