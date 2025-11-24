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
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden">
      <style jsx>{`
        @keyframes skylineScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-5000px);
          }
        }

        .skyline-container {
          animation: skylineScroll 240s linear infinite;
          will-change: transform;
        }

        @keyframes smogDrift {
          0%, 100% {
            opacity: 0.15;
            transform: translateX(0);
          }
          50% {
            opacity: 0.25;
            transform: translateX(20px);
          }
        }

        .smog-layer {
          animation: smogDrift 8s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
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
          animation: carDrive 180s linear infinite;
        }

        @keyframes carDriveReverse {
          0% { transform: translateX(0) scaleX(-1); }
          100% { transform: translateX(-5000px) scaleX(-1); }
        }

        .moving-car-reverse {
          animation: carDriveReverse 180s linear infinite;
        }

        @keyframes chimneySmokeRise {
          0% { opacity: 0.6; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
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
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

      <div className="skyline-container flex">
        {/* Main skyline (duplicated for seamless loop) */}
        {[0, 1].map((iteration) => (
          <svg
            key={iteration}
            className="flex-shrink-0 opacity-60 dark:opacity-50"
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

              {/* Beautiful rolling hills with green grass */}
              <path d="M 0,210 Q 100,195 200,205 Q 300,215 400,200 Q 500,190 600,200 Q 700,205 800,195 L 800,250 L 0,250 Z"
                    fill="#7aa87a" opacity="0.7" />
              <path d="M 0,205 Q 80,192 160,200 Q 240,208 320,195 Q 400,185 480,195 Q 560,203 640,190 Q 720,185 800,192 L 800,250 L 0,250 Z"
                    fill="#8ab88a" opacity="0.6" />

              {/* White picket fences along hills */}
              <g>
                {[40, 140, 240, 340, 440, 540, 640, 740].map((x, i) => (
                  <g key={`fence-section-${i}`}>
                    {Array.from({length: 12}).map((_, fi) => (
                      <g key={`picket-${fi}`}>
                        <rect x={x + fi * 8} y="195" width="2" height="8" fill="#f5f5f5" opacity="0.95" />
                        <path d={`M ${x + fi * 8},195 L ${x + fi * 8 + 1},193 L ${x + fi * 8 + 2},195 Z`} fill="#f5f5f5" opacity="0.95" />
                      </g>
                    ))}
                    <rect x={x} y="200" width="96" height="1.5" fill="#f5f5f5" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Red Barn #1 - Large Classic Barn with Details */}
              <g>
                <rect x="180" y="185" width="32" height="20" fill="#c73e3e" opacity="1" />
                <path d="M 176,185 L 196,170 L 216,185 Z" fill="#a83232" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 181,190 L 211,190 M 181,195 L 211,195 M 181,200 L 211,200" stroke="#a83232" strokeWidth="0.5" opacity="0.6" />
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
                <path d="M 201,170 L 196,168 L 196,172 Z" fill="#d4af37" opacity="0.8" />
                {/* Silo next to barn */}
                <rect x="215" y="180" width="8" height="25" fill="#d4d4d4" opacity="1" />
                <ellipse cx="219" cy="180" rx="4" ry="2" fill="#b8b8b8" opacity="1" />
                {/* Silo roof */}
                <path d="M 217,178 L 219,173 L 221,178" fill="#a83232" opacity="1" />
                {/* Silo bands */}
                <rect x="215" y="188" width="8" height="1" fill="#a8a8a8" opacity="0.8" />
                <rect x="215" y="196" width="8" height="1" fill="#a8a8a8" opacity="0.8" />
              </g>

              {/* Red Barn #2 - Smaller Barn */}
              <g>
                <rect x="450" y="190" width="24" height="15" fill="#c73e3e" opacity="1" />
                <path d="M 447,190 L 462,178 L 477,190 Z" fill="#a83232" opacity="1" />
                <rect x="458" y="195" width="6" height="10" fill="#6d4428" opacity="0.95" />
                <rect x="452" y="193" width="3" height="4" fill="#4a4a4a" opacity="0.8" />
                <rect x="467" y="193" width="3" height="4" fill="#4a4a4a" opacity="0.8" />
                {/* Small silo */}
                <rect x="477" y="188" width="6" height="17" fill="#d4d4d4" opacity="0.95" />
                <ellipse cx="480" cy="188" rx="3" ry="1.5" fill="#b8b8b8" opacity="0.95" />
              </g>

              {/* Red Barn #3 - Rustic Small Barn */}
              <g>
                <rect x="650" y="192" width="20" height="13" fill="#c73e3e" opacity="1" />
                <path d="M 648,192 L 660,182 L 672,192 Z" fill="#a83232" opacity="1" />
                <rect x="656" y="196" width="5" height="9" fill="#6d4428" opacity="0.95" />
                <rect x="651" y="194" width="2.5" height="3" fill="#4a4a4a" opacity="0.8" />
              </g>

              {/* Miniature Farmhouses */}
              <g>
                {/* Farmhouse #1 */}
                <rect x="280" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                <path d="M 278,195 L 289,188 L 300,195 Z" fill="#8b5a3c" opacity="1" />
                <rect x="285" y="198" width="3" height="7" fill="#6d4428" opacity="0.95" />
                <rect x={283} y="197" width="2" height="2.5" fill="#6b8ea8" opacity="0.8" />
                <rect x={291} y="197" width="2" height="2.5" fill="#6b8ea8" opacity="0.8" />
                <rect x="295" y="191" width="2" height="4" fill="#a85757" opacity="0.95" />

                {/* Farmhouse #2 */}
                <rect x="560" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                <path d="M 558,197 L 568,191 L 578,197 Z" fill="#6b5a45" opacity="1" />
                <rect x="565" y="199" width="3" height="6" fill="#6d4428" opacity="0.95" />
                <rect x={562} y="198" width="2" height="2" fill="#6b8ea8" opacity="0.8" />
                <rect x={570} y="198" width="2" height="2" fill="#6b8ea8" opacity="0.8" />
              </g>

              {/* Natural scattered trees */}
              <g>
                {[60, 110, 165, 320, 410, 490, 610, 690, 750].map((x, i) => (
                  <g key={`tree-${i}`} opacity="0.85">
                    {/* Tree trunk */}
                    <rect x={x} y="195" width="3" height="10" fill="#6b5a45" />
                    {/* Tree foliage - fuller, rounder */}
                    <circle cx={x+1.5} cy="192" r="7" fill="#5a8a5a" opacity="0.9" />
                    <circle cx={x-2} cy="194" r="5" fill="#6a9a6a" opacity="0.85" />
                    <circle cx={x+5} cy="194" r="5" fill="#6a9a6a" opacity="0.85" />
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
                    <rect x={x+5} y="195" width="4" height="3" fill="#6b8ea8" opacity="0.9" />
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

              {/* Horses in the fields - MORE HORSES! */}
              <g>
                {[120, 320, 420, 580, 680, 760].map((x, i) => (
                  <g key={`horse-${i}`} className="animal-horse" opacity="1" style={{animationDelay: `${i * 0.3}s`}}>
                    {/* Horse body */}
                    <ellipse cx={x} cy="200" rx="8" ry="5" fill="#654321" />
                    {/* Horse head - facing forward */}
                    <ellipse cx={x+6} cy="197" rx="3" ry="4" fill="#654321" />
                    {/* Legs */}
                    <rect x={x-3} y="205" width="1.5" height="5" fill="#654321" />
                    <rect x={x+2} y="205" width="1.5" height="5" fill="#654321" />
                    {/* Tail */}
                    <path d={`M ${x-8},200 Q ${x-11},198 ${x-12},202`} stroke="#4a3520" strokeWidth="1.5" fill="none" />
                    {/* Mane */}
                    <path d={`M ${x+6},195 Q ${x+4},193 ${x+2},195`} stroke="#4a3520" strokeWidth="1" fill="none" />
                    {/* Eye */}
                    <circle cx={x+7} cy="196" r="0.5" fill="#2f2f2f" />
                  </g>
                ))}
              </g>

              {/* Cows grazing - MORE COWS! */}
              <g>
                {[230, 390, 510, 640].map((x, i) => (
                  <g key={`cow-${i}`} className="animal-cow" opacity="1" style={{animationDelay: `${i * 0.5}s`}}>
                    {/* Cow body */}
                    <ellipse cx={x} cy="202" rx="9" ry="5" fill="#f5f5f5" />
                    {/* Black spots */}
                    <ellipse cx={x-3} cy="201" rx="2" ry="2" fill="#2f2f2f" opacity="1" />
                    <ellipse cx={x+4} cy="202" rx="2.5" ry="2.5" fill="#2f2f2f" opacity="1" />
                    {/* Cow head */}
                    <ellipse cx={x-7} cy="200" rx="3" ry="3.5" fill="#f5f5f5" />
                    {/* Horns */}
                    <path d={`M ${x-9},199 L ${x-10},197 M ${x-5},199 L ${x-4},197`} stroke="#4a4a4a" strokeWidth="0.8" />
                    {/* Legs */}
                    <rect x={x-4} y="207" width="1.5" height="4" fill="#e8e8e8" />
                    <rect x={x+3} y="207" width="1.5" height="4" fill="#e8e8e8" />
                  </g>
                ))}
              </g>

              {/* Sheep grazing - FLUFFY! */}
              <g>
                {[160, 290, 470, 590, 700].map((x, i) => (
                  <g key={`sheep-${i}`} className="animal-sheep" opacity="1" style={{animationDelay: `${i * 0.4}s`}}>
                    {/* Fluffy sheep body */}
                    <ellipse cx={x} cy="204" rx="6" ry="4" fill="#f5f5f5" />
                    <circle cx={x-2} cy="203" r="3" fill="#f5f5f5" />
                    <circle cx={x+2} cy="203" r="3" fill="#f5f5f5" />
                    {/* Black sheep face */}
                    <ellipse cx={x-5} cy="203" rx="2" ry="2.5" fill="#2f2f2f" />
                    {/* Tiny legs */}
                    <rect x={x-3} y="208" width="1" height="3" fill="#2f2f2f" />
                    <rect x={x+2} y="208" width="1" height="3" fill="#2f2f2f" />
                  </g>
                ))}
              </g>

              {/* Chickens pecking - TINY! */}
              <g>
                {[200, 260, 340, 480, 540, 620, 730].map((x, i) => (
                  <g key={`chicken-${i}`} className="animal-chicken" opacity="1" style={{animationDelay: `${i * 0.2}s`}}>
                    {/* Chicken body - super small */}
                    <ellipse cx={x} cy="207" rx="2.5" ry="2" fill="#d4a574" />
                    {/* Chicken head */}
                    <circle cx={x-2} cy="206" r="1.5" fill="#d4a574" />
                    {/* Red comb */}
                    <path d={`M ${x-2},205 L ${x-1.5},204 L ${x-2.5},204`} fill="#cc3333" />
                    {/* Beak */}
                    <path d={`M ${x-3},206 L ${x-3.5},206`} stroke="#ffd700" strokeWidth="0.5" />
                    {/* Tiny legs */}
                    <rect x={x-1} y="209" width="0.5" height="2" fill="#d4a574" />
                    <rect x={x+0.5} y="209" width="0.5" height="2" fill="#d4a574" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 2: DEVELOPING SUBURBS (800-2000) ========== */}

              {/* Grassy ground layer - matching rural appearance */}
              <path d="M 800,210 Q 900,205 1000,208 Q 1100,212 1200,207 Q 1300,203 1400,209 Q 1500,211 1600,206 Q 1700,204 1800,208 Q 1900,211 2000,207 L 2000,250 L 800,250 Z"
                    fill="#7aa87a" opacity="0.6" />
              <path d="M 800,208 Q 880,203 960,206 Q 1040,209 1120,205 Q 1200,202 1280,207 Q 1360,210 1440,205 Q 1520,203 1600,207 Q 1680,209 1760,205 Q 1840,203 1920,206 Q 1960,208 2000,205 L 2000,250 L 800,250 Z"
                    fill="#8ab88a" opacity="0.5" />

              {/* Main road infrastructure */}
              <g opacity="0.6">
                {/* Asphalt road */}
                <rect x="800" y="215" width="1200" height="35" fill={`url(#roadGradient-${iteration})`} />

                {/* Road center line (dashed) */}
                {Array.from({length: 30}).map((_, i) => (
                  <rect key={`dash-${i}`} x={800 + i * 40} y="231" width="20" height="2" opacity="0.4" />
                ))}

                {/* Sidewalks */}
                <rect x="800" y="210" width="1200" height="4" opacity="0.35" />
                <rect x="800" y="251" width="1200" height="2" opacity="0.35" />
              </g>

              {/* Ultra-detailed miniature houses - Victorian style */}
              {[820, 970, 1120, 1270, 1420, 1570, 1720, 1870].map((x, i) => (
                <g key={`victorian-${i}`}>
                  {/* Main house body - small and detailed */}
                  <rect x={x} y="185" width="28" height="22" fill={`url(#victorianHouse-${iteration})`} />

                  {/* Steep Victorian roof with decorative peak */}
                  <path d={`M ${x-3},185 L ${x+14},170 L ${x+31},185 Z`} fill={`url(#victorianRoof-${iteration})`} />
                  <rect x={x+12} y="170" width="4" height="15" fill={`url(#victorianHouse-${iteration})`} /> {/* Tower */}
                  <path d={`M ${x+10},170 L ${x+14},163 L ${x+18},170 Z`} fill={`url(#victorianRoof-${iteration})`} /> {/* Tower roof */}

                  {/* Detailed windows */}
                  <rect x={x+4} y="190" width="5" height="7" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+19} y="190" width="5" height="7" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+11} y="178" width="4" height="5" fill="#6b8ea8" opacity="0.95" />

                  {/* Front door with porch */}
                  <rect x={x+11} y="197" width="6" height="10" fill="#8b5a3c" opacity="1" />
                  <path d={`M ${x+8},197 L ${x+20},197`} stroke="#6d4428" strokeWidth="1.5" opacity="1" />

                  {/* Chimney with smoke */}
                  <rect x={x+22} y="176" width="3" height="9" fill="#a85757" opacity="1" />
                  <ellipse className="chimney-smoke" cx={x+23.5} cy="173" rx="2" ry="3" fill="#c4c4c4" opacity="0.5" />

                  {/* Decorative trim */}
                  <rect x={x} y="207" width="28" height="1.5" fill="#d4c4a8" opacity="1" />
                </g>
              ))}

              {/* Colonial style houses - symmetrical design */}
              {[850, 1000, 1150, 1300, 1450, 1600, 1750, 1900].map((x, i) => (
                <g key={`colonial-${i}`}>
                  {/* Main colonial structure */}
                  <rect x={x} y="183" width="32" height="24" fill={`url(#colonialHouse-${iteration})`} />

                  {/* Classic colonial roof */}
                  <path d={`M ${x-2},183 L ${x+16},172 L ${x+34},183 Z`} fill={`url(#colonialRoof-${iteration})`} />

                  {/* Symmetrical windows (4 windows, 2 stories) */}
                  <rect x={x+4} y="188" width="5" height="6" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+23} y="188" width="5" height="6" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+4} y="197" width="5" height="6" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+23} y="197" width="5" height="6" fill="#6b8ea8" opacity="0.95" />

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
              {[880, 1030, 1180, 1330, 1480, 1630, 1780, 1930].map((x, i) => (
                <g key={`ranch-${i}`}>
                  {/* Wide, low ranch house */}
                  <rect x={x} y="193" width="38" height="14" fill={`url(#ranchHouse-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-2},193 L ${x+19},186 L ${x+40},193 Z`} fill={`url(#ranchRoof-${iteration})`} />

                  {/* Horizontal windows */}
                  <rect x={x+5} y="195" width="8" height="4" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+25} y="195" width="8" height="4" fill="#6b8ea8" opacity="0.95" />

                  {/* Attached garage */}
                  <rect x={x+30} y="197" width="7" height="10" fill="#c9b18f" opacity="1" />
                  <rect x={x+31} y="203" width="5" height="4" fill="#4a4a4a" opacity="0.95" />

                  {/* Front door */}
                  <rect x={x+15} y="199" width="4" height="8" fill="#6b5a45" opacity="1" />

                  {/* Driveway */}
                  <path d={`M ${x+33},207 L ${x+33},215`} stroke="#8a8a8a" strokeWidth="4" opacity="0.9" />
                </g>
              ))}

              {/* Cottage style houses - small and cozy */}
              {[910, 1060, 1210, 1360, 1510, 1660, 1810, 1960].map((x, i) => (
                <g key={`cottage-${i}`}>
                  {/* Small cottage body */}
                  <rect x={x} y="192" width="24" height="15" fill={`url(#cottageHouse-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-2},192 Q ${x+12},182 ${x+26},192 Z`} fill={`url(#cottageRoof-${iteration})`} />

                  {/* Arched door */}
                  <path d={`M ${x+9},197 L ${x+9},207 L ${x+15},207 L ${x+15},197 Q ${x+12},195 ${x+9},197 Z`} fill="#a85757" opacity="1" />

                  {/* Small cottage windows */}
                  <rect x={x+4} y="194" width="4" height="4" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+16} y="194" width="4" height="4" fill="#6b8ea8" opacity="0.95" />

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
                    <rect key={`fence-${fi}`} x={x + fi * 4} y="207" width="1" height="5" fill="#e8d4b8" opacity="0.95" />
                  ))}
                </g>
              ))}

              {/* Modern style houses - clean lines */}
              {[940, 1090, 1240, 1390, 1540, 1690, 1840, 1990].map((x, i) => (
                <g key={`modern-${i}`}>
                  {/* Cubic modern house */}
                  <rect x={x} y="188" width="26" height="19" fill={`url(#modernHouse-${iteration})`} />

                  {/* Flat/minimal roof */}
                  <rect x={x-1} y="186" width="28" height="2" fill={`url(#modernRoof-${iteration})`} />

                  {/* Large modern windows */}
                  <rect x={x+2} y="192" width="8" height="11" fill="#6b8ea8" opacity="0.9" />
                  <rect x={x+16} y="192" width="8" height="11" fill="#6b8ea8" opacity="0.9" />

                  {/* Minimal door */}
                  <rect x={x+11} y="199" width="4" height="8" fill="#5a7a8a" opacity="1" />

                  {/* Solar panels on roof */}
                  <rect x={x+2} y="187" width="10" height="1" fill="#3d5866" opacity="1" />
                  <rect x={x+14} y="187" width="10" height="1" fill="#3d5866" opacity="1" />

                  {/* Modern landscaping */}
                  <circle cx={x+4} cy="208" r="3" fill="#8bc34a" opacity="0.95" />
                  <circle cx={x+22} cy="208" r="3" fill="#8bc34a" opacity="0.95" />
                </g>
              ))}

              {/* Yard trees and landscaping - between houses with more grass */}
              <g opacity="0.8">
                {[815, 865, 915, 965, 1020, 1070, 1125, 1175, 1225, 1280, 1330, 1385, 1435, 1485, 1540, 1590, 1645, 1695, 1745, 1800, 1850, 1900, 1950].map((x, i) => (
                  <g key={`yard-tree-${i}`}>
                    {/* Tree trunk */}
                    <rect x={x} y="203" width="2" height="7" fill="#6b5a45" opacity="0.9" />
                    {/* Tree foliage */}
                    <circle cx={x+1} cy="201" r="4" fill="#5a8a5a" opacity="0.8" />
                  </g>
                ))}
              </g>

              {/* Street lights along the road */}
              <g opacity="0.7">
                {[840, 990, 1140, 1290, 1440, 1590, 1740, 1890].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    <rect x={x} y="208" width="2" height="15" fill="#4a4a4a" opacity="0.9" />
                    <circle cx={x+1} cy="206" r="3" fill="#ffd700" opacity="0.5" />
                    <circle cx={x+1} cy="206" r="1.5" fill="#ffeb3b" className="window-light" />
                  </g>
                ))}
              </g>

              {/* Mailboxes */}
              <g opacity="0.8">
                {[825, 975, 1125, 1275, 1425, 1575, 1725, 1875].map((x, i) => (
                  <g key={`mailbox-${i}`}>
                    <rect x={x} y="211" width="1.5" height="4" fill="#5a4a3a" opacity="0.9" />
                    <rect x={x-0.5} y="210" width="2.5" height="2" rx="0.5" fill="#d4af37" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Fire hydrants */}
              <g opacity="0.8">
                {[1000, 1300, 1600, 1900].map((x, i) => (
                  <g key={`hydrant-${i}`}>
                    <rect x={x} y="212" width="3" height="4" fill="#cc3333" opacity="0.9" />
                    <rect x={x-0.5} y="213" width="4" height="1.5" fill="#aa2222" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Stop signs at intersections */}
              <g opacity="0.8">
                {[1100, 1400, 1700].map((x, i) => (
                  <g key={`stop-sign-${i}`}>
                    <rect x={x} y="208" width="1.5" height="10" fill="#4a4a4a" opacity="0.9" />
                    <polygon points={`${x+0.75},204 ${x+4},206 ${x+4},210 ${x+0.75},212 ${x-2.5},210 ${x-2.5},206`} fill="#cc3333" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 3: SUSTAINABLE GREEN CITY - PROJECT EXODUS (2000-3800) ========== */}

              {/* Green city base - EXPANDED */}
              <rect x="2000" y="160" width="1800" height="90" fill="#e8f5e8" opacity="0.3" />

              {/* Wind turbines (BEHIND buildings) - slowly spinning, peeking above buildings */}
              <g>
                {[2080, 2200, 2320, 2440, 2560, 2680, 2800, 2920, 3040, 3160, 3280, 3400, 3520, 3640, 3760].map((x, i) => (
                  <g key={`turbine-${i}`} transform={`translate(${x}, ${135 + (i % 4) * 10})`}>
                    {/* Turbine tower - TALLER to peek above buildings */}
                    <rect x="-3" y="0" width="6" height="110" fill="#e8e8e8" opacity="0.8" />
                    {/* Turbine hub */}
                    <circle cx="0" cy="0" r="8" fill="#4a7c2f" opacity="0.85" />
                    {/* Slowly rotating blades */}
                    <g className="turbine-blade" style={{animationDelay: `${i * 0.2}s`}}>
                      <path d="M 0,-8 L 3,-38 L -3,-38 Z" fill="#f0f0f0" opacity="0.75" />
                      <path d="M 8,0 L 34,-5 L 32,5 Z" fill="#f0f0f0" opacity="0.75" />
                      <path d="M -4,6 L -24,26 L -18,28 Z" fill="#f0f0f0" opacity="0.75" />
                    </g>
                  </g>
                ))}
              </g>

              {/* Pedestrian-friendly streets with bike lanes */}
              <g opacity="0.7">
                <rect x="2000" y="220" width="1800" height="30" fill={`url(#roadGradient-${iteration})`} />
                {/* Bike lane markings - MANY MORE! */}
                {Array.from({length: 36}).map((_, i) => (
                  <path key={`bike-${i}`} d={`M ${2010 + i * 50},225 L ${2015 + i * 50},230 L ${2010 + i * 50},235`}
                        stroke="#4a7c2f" strokeWidth="1.5" fill="none" opacity="0.7" />
                ))}
                {/* Pedestrian crosswalk */}
                {Array.from({length: 12}).map((_, i) => (
                  <rect key={`cross-${i}`} x={2300 + i * 15} y="220" width="8" height="30" fill="#f5f5f5" opacity="0.4" />
                ))}
                {Array.from({length: 12}).map((_, i) => (
                  <rect key={`cross2-${i}`} x={3200 + i * 15} y="220" width="8" height="30" fill="#f5f5f5" opacity="0.4" />
                ))}
              </g>

              {/* Modern eco-buildings with varied sizes and detailed architecture */}
              <g>
                {[
                  {x: 2020, h: 95, w: 45, color: "#e8f4e8"}, {x: 2074, h: 125, w: 58, color: "#f0f8f0"},
                  {x: 2142, h: 105, w: 52, color: "#e0f2e0"}, {x: 2204, h: 140, w: 64, color: "#e8f4e8"},
                  {x: 2278, h: 115, w: 50, color: "#f0f8f0"}, {x: 2338, h: 135, w: 62, color: "#e0f2e0"},
                  {x: 2410, h: 100, w: 48, color: "#e8f4e8"}, {x: 2468, h: 150, w: 68, color: "#f0f8f0"},
                  {x: 2546, h: 120, w: 56, color: "#e0f2e0"}, {x: 2612, h: 130, w: 60, color: "#e8f4e8"},
                  {x: 2682, h: 110, w: 54, color: "#f0f8f0"}, {x: 2746, h: 145, w: 66, color: "#e0f2e0"},
                  {x: 2822, h: 125, w: 58, color: "#e8f4e8"}, {x: 2890, h: 115, w: 52, color: "#f0f8f0"},
                  {x: 2952, h: 140, w: 64, color: "#e0f2e0"}, {x: 3026, h: 105, w: 50, color: "#e8f4e8"},
                  {x: 3086, h: 135, w: 62, color: "#f0f8f0"}, {x: 3158, h: 120, w: 56, color: "#e0f2e0"},
                  {x: 3224, h: 150, w: 68, color: "#e8f4e8"}, {x: 3302, h: 130, w: 60, color: "#f0f8f0"},
                  {x: 3372, h: 110, w: 54, color: "#e0f2e0"}, {x: 3436, h: 145, w: 66, color: "#e8f4e8"},
                  {x: 3512, h: 125, w: 58, color: "#f0f8f0"}, {x: 3580, h: 155, w: 70, color: "#e0f2e0"},
                  {x: 3660, h: 135, w: 62, color: "#e8f4e8"}, {x: 3732, h: 115, w: 54, color: "#f0f8f0"}
                ].map((bldg, i) => (
                  <g key={`green-bldg-${i}`}>
                    {/* Building body with green tint */}
                    <rect x={bldg.x} y={250-bldg.h} width={bldg.w} height={bldg.h} fill={bldg.color} opacity="0.95" />

                    {/* GREEN ROOF with plants */}
                    <rect x={bldg.x} y={250-bldg.h-3} width={bldg.w} height="3" fill="#4a7c2f" opacity="0.9" />
                    {Array.from({length: Math.floor(bldg.w/8)}).map((_, plant) => (
                      <circle key={`plant-${plant}`} cx={bldg.x + 4 + plant * 8} cy={250-bldg.h-2} r="1.5" fill="#5a8a5a" opacity="0.8" />
                    ))}

                    {/* SOLAR PANELS covering entire roof */}
                    <g opacity="0.7">
                      {Array.from({length: Math.floor(bldg.w/12)}).map((_, panel) => (
                        <rect key={`solar-${panel}`}
                              x={bldg.x + 2 + panel * 12}
                              y={250 - bldg.h - 6}
                              width="10"
                              height="6"
                              fill="#2f4f7f"
                              stroke="#1a2f4f"
                              strokeWidth="0.5" />
                      ))}
                    </g>

                    {/* VERTICAL GARDENS - greenery cascading down facade */}
                    <g opacity="0.6">
                      {Array.from({length: Math.floor(bldg.w/18)}).map((_, vine) => (
                        <path key={`vine-${vine}`}
                              d={`M ${bldg.x+8+vine*18},${250-bldg.h+8} Q ${bldg.x+10+vine*18},${250-bldg.h+bldg.h/3} ${bldg.x+8+vine*18},${250-bldg.h+2*bldg.h/3} Q ${bldg.x+10+vine*18},${250-bldg.h+bldg.h-5} ${bldg.x+8+vine*18},${250-bldg.h+bldg.h-2}`}
                              stroke="#5a8a5a"
                              strokeWidth="3"
                              fill="none" />
                      ))}
                    </g>

                    {/* Large windows with frames for natural light */}
                    <g opacity="0.7">
                      {Array.from({length: Math.floor(bldg.h/20)}).map((_, row) => (
                        Array.from({length: Math.floor(bldg.w/16)}).map((_, col) => (
                          <g key={`win-${row}-${col}`}>
                            {/* Window frame */}
                            <rect x={bldg.x + 4 + col * 16}
                                  y={250 - bldg.h + 12 + row * 20}
                                  width="10"
                                  height="14"
                                  fill="#8a9a8a"
                                  opacity="0.9" />
                            {/* Window glass */}
                            <rect x={bldg.x + 5 + col * 16}
                                  y={250 - bldg.h + 13 + row * 20}
                                  width="8"
                                  height="12"
                                  fill="#6b8ea8"
                                  opacity="0.8" />
                          </g>
                        ))
                      ))}
                    </g>

                    {/* Balconies on select floors */}
                    {bldg.h > 100 && (
                      <g opacity="0.8">
                        {Array.from({length: Math.floor(bldg.h/40)}).map((_, floor) => (
                          Array.from({length: Math.floor(bldg.w/32)}).map((_, side) => (
                            <g key={`balc-${floor}-${side}`}>
                              {/* Balcony platform */}
                              <rect x={bldg.x + 8 + side * 32}
                                    y={250 - bldg.h + 25 + floor * 40}
                                    width="12"
                                    height="2"
                                    fill="#7a8a7a"
                                    opacity="0.9" />
                              {/* Balcony railing */}
                              <rect x={bldg.x + 8 + side * 32}
                                    y={250 - bldg.h + 20 + floor * 40}
                                    width="12"
                                    height="5"
                                    fill="none"
                                    stroke="#7a8a7a"
                                    strokeWidth="0.5"
                                    opacity="0.7" />
                            </g>
                          ))
                        ))}
                      </g>
                    )}

                    {/* Ground-level entrance doors */}
                    <g opacity="0.95">
                      <rect x={bldg.x + bldg.w/2 - 6}
                            y={250 - 12}
                            width="12"
                            height="12"
                            fill="#6a7a6a"
                            opacity="1" />
                      {/* Door handle */}
                      <circle cx={bldg.x + bldg.w/2 + 3}
                              cy={250 - 6}
                              r="0.8"
                              fill="#d4af37"
                              opacity="1" />
                    </g>

                    {/* Rooftop equipment (HVAC units, antennas) */}
                    <g opacity="0.85">
                      {/* HVAC unit */}
                      <rect x={bldg.x + bldg.w - 12}
                            y={250 - bldg.h - 8}
                            width="8"
                            height="5"
                            fill="#a8a8a8"
                            opacity="0.9" />
                      {/* Antenna */}
                      <rect x={bldg.x + 6}
                            y={250 - bldg.h - 15}
                            width="1"
                            height="12"
                            fill="#8a8a8a"
                            opacity="0.9" />
                      <circle cx={bldg.x + 6.5}
                              cy={250 - bldg.h - 15}
                              r="2"
                              fill="#8a8a8a"
                              opacity="0.7" />
                    </g>
                  </g>
                ))}
              </g>

              {/* Trees lining EVERY street - Dense urban forest! */}
              <g opacity="0.8">
                {Array.from({length: 45}).map((_, i) => {
                  const x = 2030 + i * 40;
                  return (
                    <g key={`green-tree-${i}`}>
                      {/* Tree trunk */}
                      <rect x={x} y="200" width="4" height="15" fill="#6b5a45" opacity="0.9" />
                      {/* Lush green foliage */}
                      <circle cx={x+2} cy="198" r="8" fill="#4a7c2f" opacity="0.9" />
                      <circle cx={x-3} cy="200" r="6" fill="#5a8a5a" opacity="0.85" />
                      <circle cx={x+7} cy="200" r="6" fill="#5a8a5a" opacity="0.85" />
                      <circle cx={x+2} cy="193" r="5" fill="#6a9a6a" opacity="0.8" />
                    </g>
                  );
                })}
              </g>

              {/* Community gardens - EXPANDED with details */}
              <g>
                {[
                  {x: 2150, size: 40}, {x: 2400, size: 45}, {x: 2650, size: 42},
                  {x: 2900, size: 50}, {x: 3150, size: 48}, {x: 3400, size: 46}, {x: 3650, size: 44}
                ].map((garden, i) => (
                  <g key={`garden-${i}`}>
                    {/* Garden plot */}
                    <ellipse cx={garden.x} cy="202" rx={garden.size} ry="12" fill="#7aa87a" opacity="0.5" />
                    {/* Colorful flowers/vegetables */}
                    {Array.from({length: 8}).map((_, flower) => (
                      <circle key={`flower-${flower}`}
                              cx={garden.x - garden.size/2 + flower * (garden.size/4)}
                              cy={202 - 8 + (flower % 3) * 4}
                              r="2"
                              fill={["#ff6b6b", "#ffd700", "#ff69b4", "#9b59b6"][flower % 4]}
                              opacity="0.8" />
                    ))}
                  </g>
                ))}
              </g>

              {/* Water features & fountains */}
              <g>
                {[2250, 2750, 3250, 3750].map((x, i) => (
                  <g key={`fountain-${i}`}>
                    {/* Fountain basin */}
                    <ellipse cx={x} cy="208" rx="18" ry="6" fill="#6b8ea8" opacity="0.6" />
                    {/* Water spray */}
                    <circle cx={x} cy="200" r="3" fill="#add8e6" opacity="0.7" />
                    <circle cx={x-4} cy="203" r="2" fill="#add8e6" opacity="0.6" />
                    <circle cx={x+4} cy="203" r="2" fill="#add8e6" opacity="0.6" />
                    <circle cx={x} cy="196" r="2" fill="#add8e6" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* Electric buses - MORE! */}
              <g opacity="0.8">
                {[2050, 2350, 2650, 2950, 3250, 3550].map((x, i) => (
                  <g key={`ebus-${i}`}>
                    <rect x={x} y="235" width="38" height="13" rx="2" fill="#4a7c2f" opacity="0.9" />
                    <rect x={x+4} y="231" width="11" height="5" rx="1" fill="#6b8ea8" opacity="0.8" />
                    <rect x={x+23} y="231" width="11" height="5" rx="1" fill="#6b8ea8" opacity="0.8" />
                    <circle cx={x+9} cy="248" r="3" fill="#2f2f2f" />
                    <circle cx={x+29} cy="248" r="3" fill="#2f2f2f" />
                    {/* Electric symbol */}
                    <path d={`M ${x+18},238 L ${x+16},243 L ${x+20},243 L ${x+17},248`} stroke="#ffd700" strokeWidth="1.2" opacity="0.9" />
                    {/* "ELECTRIC" text simulation */}
                    <rect x={x+8} y="240" width="22" height="2" fill="#ffd700" opacity="0.3" />
                  </g>
                ))}
              </g>

              {/* Electric cars/bikes on streets */}
              <g opacity="0.75">
                {Array.from({length: 20}).map((_, i) => (
                  <g key={`e-vehicle-${i}`}>
                    <ellipse cx={2100 + i * 90} cy="227" rx="6" ry="3" fill="#5a8a5a" />
                    <circle cx={2100 + i * 90} cy="225" r="2" fill="#6b8ea8" opacity="0.7" />
                  </g>
                ))}
              </g>

              {/* Street furniture: Benches */}
              <g opacity="0.85">
                {[2080, 2280, 2480, 2680, 2880, 3080, 3280, 3480, 3680].map((x, i) => (
                  <g key={`bench-${i}`}>
                    {/* Bench seat */}
                    <rect x={x} y="217" width="12" height="2" fill="#8b7355" opacity="0.9" />
                    {/* Bench back */}
                    <rect x={x} y="213" width="12" height="4" fill="#8b7355" opacity="0.8" />
                    {/* Bench legs */}
                    <rect x={x+2} y="219" width="1" height="3" fill="#6b5a45" opacity="0.9" />
                    <rect x={x+9} y="219" width="1" height="3" fill="#6b5a45" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Planters with flowers and greenery */}
              <g opacity="0.85">
                {[2140, 2340, 2540, 2740, 2940, 3140, 3340, 3540, 3740].map((x, i) => (
                  <g key={`planter-${i}`}>
                    {/* Planter box */}
                    <rect x={x} y="215" width="16" height="7" fill="#8b7355" opacity="0.9" />
                    {/* Flowers/plants */}
                    <circle cx={x+3} cy="214" r="1.5" fill="#ff69b4" opacity="0.9" />
                    <circle cx={x+6} cy="213" r="1.5" fill="#ffd700" opacity="0.9" />
                    <circle cx={x+9} cy="214" r="1.5" fill="#9b59b6" opacity="0.9" />
                    <circle cx={x+12} cy="213" r="1.5" fill="#ff69b4" opacity="0.9" />
                    {/* Greenery */}
                    <rect x={x+4} y="216" width="1" height="4" fill="#4a7c2f" opacity="0.8" />
                    <rect x={x+8} y="216" width="1" height="5" fill="#4a7c2f" opacity="0.8" />
                    <rect x={x+11} y="216" width="1" height="4" fill="#4a7c2f" opacity="0.8" />
                  </g>
                ))}
              </g>

              {/* Pedestrians walking */}
              <g opacity="0.8">
                {[2050, 2200, 2350, 2500, 2650, 2800, 2950, 3100, 3250, 3400, 3550, 3700].map((x, i) => (
                  <g key={`ped-${i}`}>
                    {/* Person body */}
                    <ellipse cx={x} cy="218" rx="2" ry="3" fill={i % 3 === 0 ? "#5a7a8a" : i % 3 === 1 ? "#8a6a5a" : "#6a5a7a"} opacity="0.9" />
                    {/* Person head */}
                    <circle cx={x} cy="214" r="1.5" fill="#d4a574" opacity="0.9" />
                    {/* Person legs */}
                    <rect x={x-1} y="221" width="0.8" height="3" fill={i % 3 === 0 ? "#4a5a6a" : i % 3 === 1 ? "#6a5a4a" : "#5a4a6a"} opacity="0.9" />
                    <rect x={x+0.2} y="221" width="0.8" height="3" fill={i % 3 === 0 ? "#4a5a6a" : i % 3 === 1 ? "#6a5a4a" : "#5a4a6a"} opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Cyclists riding bikes */}
              <g opacity="0.8">
                {[2120, 2320, 2520, 2720, 2920, 3120, 3320, 3520, 3720].map((x, i) => (
                  <g key={`cyclist-${i}`}>
                    {/* Bike frame */}
                    <path d={`M ${x},219 L ${x+4},219 L ${x+2},215 Z`} stroke="#4a7c2f" strokeWidth="1" fill="none" opacity="0.9" />
                    {/* Wheels */}
                    <circle cx={x} cy="221" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="0.9" />
                    <circle cx={x+4} cy="221" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="0.9" />
                    {/* Cyclist body */}
                    <ellipse cx={x+2} cy="216" rx="1.5" ry="2" fill={i % 2 === 0 ? "#5a8a5a" : "#7a6a5a"} opacity="0.9" />
                    {/* Cyclist head */}
                    <circle cx={x+2} cy="213" r="1.2" fill="#d4a574" opacity="0.9" />
                    {/* Helmet */}
                    <ellipse cx={x+2} cy="212.5" rx="1.4" ry="1" fill={i % 2 === 0 ? "#4a7c2f" : "#c73e3e"} opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 4: RETURN TO RURAL - IDENTICAL TO OPENING (3800-5000) ========== */}
              {/* This creates a SEAMLESS LOOP back to the start */}

              {/* Rolling hills - EXTENDED to 5000px for seamless loop */}
              <path d="M 3800,210 Q 3900,195 4000,205 Q 4100,215 4200,200 Q 4300,190 4400,200 Q 4500,205 4600,195 Q 4700,200 4800,205 Q 4900,195 5000,210 L 5000,250 L 3800,250 Z"
                    fill="#7aa87a" opacity="0.7" />
              <path d="M 3800,205 Q 3880,192 3960,200 Q 4040,208 4120,195 Q 4200,185 4280,195 Q 4360,203 4440,190 Q 4520,185 4600,192 Q 4680,200 4760,195 Q 4840,188 4920,195 Q 4960,200 5000,205 L 5000,250 L 3800,250 Z"
                    fill="#8ab88a" opacity="0.6" />

              {/* White picket fences */}
              <g>
                {[3840, 3940, 4040, 4140, 4240, 4340, 4440, 4540, 4640, 4740, 4840, 4940].map((x, i) => (
                  <g key={`fence-end-${i}`}>
                    {Array.from({length: 12}).map((_, fi) => (
                      <g key={`picket-${fi}`}>
                        <rect x={x + fi * 8} y="195" width="2" height="8" fill="#f5f5f5" opacity="0.95" />
                        <path d={`M ${x + fi * 8},195 L ${x + fi * 8 + 1},193 L ${x + fi * 8 + 2},195 Z`} fill="#f5f5f5" opacity="0.95" />
                      </g>
                    ))}
                    <rect x={x} y="200" width="96" height="1.5" fill="#f5f5f5" opacity="0.9" />
                  </g>
                ))}
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
                <rect x="4258" y="195" width="6" height="10" fill="#6d4428" opacity="0.95" />

                <rect x="4450" y="192" width="20" height="13" fill="#c73e3e" opacity="1" />
                <path d="M 4448,192 L 4460,182 L 4472,192 Z" fill="#a83232" opacity="1" />
                <rect x="4456" y="196" width="5" height="9" fill="#6d4428" opacity="0.95" />

                <rect x="4680" y="187" width="28" height="18" fill="#c73e3e" opacity="1" />
                <path d="M 4677,187 L 4694,174 L 4711,187 Z" fill="#a83232" opacity="1" />
                <rect x="4690" y="194" width="7" height="11" fill="#6d4428" opacity="0.95" />
                <rect x="4711" y="183" width="7" height="22" fill="#d4d4d4" opacity="1" />
                <ellipse cx="4714.5" cy="183" rx="3.5" ry="1.8" fill="#b8b8b8" opacity="1" />

                <rect x="4900" y="191" width="22" height="14" fill="#c73e3e" opacity="1" />
                <path d="M 4898,191 L 4911,180 L 4924,191 Z" fill="#a83232" opacity="1" />
                <rect x="4907" y="196" width="6" height="9" fill="#6d4428" opacity="0.95" />
              </g>

              {/* Farmhouses */}
              <g>
                <rect x="4080" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                <path d="M 4078,195 L 4089,188 L 4100,195 Z" fill="#8b5a3c" opacity="1" />
                <rect x="4085" y="198" width="3" height="7" fill="#6d4428" opacity="0.95" />

                <rect x="4360" y="197" width="16" height="8" fill="#e8d4b8" opacity="1" />
                <path d="M 4358,197 L 4368,191 L 4378,197 Z" fill="#6b5a45" opacity="1" />
                <rect x="4365" y="199" width="3" height="6" fill="#6d4428" opacity="0.95" />

                <rect x="4620" y="196" width="17" height="9" fill="#f0e6d3" opacity="1" />
                <path d="M 4618,196 L 4628.5,190 L 4639,196 Z" fill="#8b5a3c" opacity="1" />
                <rect x="4626" y="199" width="3" height="6" fill="#6d4428" opacity="0.95" />

                <rect x="4850" y="198" width="15" height="7" fill="#e8d4b8" opacity="1" />
                <path d="M 4848,198 L 4857.5,193 L 4867,198 Z" fill="#6b5a45" opacity="1" />
                <rect x="4855" y="200" width="3" height="5" fill="#6d4428" opacity="0.95" />
              </g>

              {/* Trees */}
              <g>
                {[3860, 3910, 3965, 4120, 4210, 4290, 4410, 4490, 4550, 4640, 4720, 4790, 4880, 4960].map((x, i) => (
                  <g key={`tree-end-${i}`} opacity="0.85">
                    <rect x={x} y="195" width="3" height="10" fill="#6b5a45" />
                    <circle cx={x+1.5} cy="192" r="7" fill="#5a8a5a" opacity="0.9" />
                    <circle cx={x-2} cy="194" r="5" fill="#6a9a6a" opacity="0.85" />
                    <circle cx={x+5} cy="194" r="5" fill="#6a9a6a" opacity="0.85" />
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

              {/* Animals from earlier (horses, cows, sheep, chickens) will be rendered on top from the FARM ANIMALS section above */}
              {/* This creates perfect symmetry - the loop is now SEAMLESS! */}

              {/* ========== FOREGROUND: MAIN STREET WITH TRAFFIC ========== */}
              {/* Main foreground road spanning entire city */}
              <g opacity="0.85">
                {/* Asphalt road at very bottom */}
                <rect x="0" y="238" width="5000" height="12" fill="#4a4a4a" opacity="0.9" />

                {/* Road center dashed lines */}
                {Array.from({length: 125}).map((_, i) => (
                  <rect key={`fg-dash-${i}`} x={i * 40} y="243" width="20" height="1.5" fill="#ffeb3b" opacity="0.7" />
                ))}

                {/* Road edge lines */}
                <rect x="0" y="238" width="5000" height="1" fill="#f5f5f5" opacity="0.6" />
                <rect x="0" y="249" width="5000" height="1" fill="#f5f5f5" opacity="0.6" />
              </g>

              {/* Moving traffic - cars driving across the entire city with VARIED COLORS and BIDIRECTIONAL! */}
              <g>
                {[
                  {x: 100, color: "#c73e3e", direction: "forward"},    // Red
                  {x: 350, color: "#2f4f7f", direction: "reverse"},    // Blue
                  {x: 600, color: "#4a7c2f", direction: "forward"},    // Green
                  {x: 850, color: "#d4af37", direction: "reverse"},    // Gold
                  {x: 1100, color: "#8a8a8a", direction: "forward"},   // Silver
                  {x: 1350, color: "#4a4a4a", direction: "reverse"},   // Dark Gray
                  {x: 1600, color: "#cc6633", direction: "forward"},   // Orange
                  {x: 1850, color: "#5a3d8a", direction: "reverse"},   // Purple
                  {x: 2100, color: "#e8e8e8", direction: "forward"},   // White
                  {x: 2350, color: "#c73e3e", direction: "reverse"},   // Red
                  {x: 2600, color: "#2f4f7f", direction: "forward"},   // Blue
                  {x: 2850, color: "#4a7c2f", direction: "reverse"},   // Green
                  {x: 3100, color: "#d4af37", direction: "forward"},   // Gold
                  {x: 3350, color: "#8a8a8a", direction: "reverse"},   // Silver
                  {x: 3600, color: "#4a4a4a", direction: "forward"},   // Dark Gray
                  {x: 3850, color: "#cc6633", direction: "reverse"},   // Orange
                  {x: 4100, color: "#5a3d8a", direction: "forward"},   // Purple
                  {x: 4350, color: "#e8e8e8", direction: "reverse"},   // White
                  {x: 4600, color: "#c73e3e", direction: "forward"},   // Red
                  {x: 4850, color: "#2f4f7f", direction: "reverse"}    // Blue
                ].map((car, i) => (
                  <g key={`fg-car-${i}`} className={car.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 1.5}s`}}>
                    {/* Sedan body - COLORED! */}
                    <rect x={car.x} y="239.5" width="26" height="7" rx="2" fill={car.color} />
                    {/* Windshields */}
                    <rect x={car.x + 4} y="236" width="8" height="4" rx="1" fill="#6b8ea8" opacity="0.95" />
                    <rect x={car.x + 14} y="236" width="8" height="4" rx="1" fill="#6b8ea8" opacity="0.95" />
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
                  {x: 250, direction: "forward"},
                  {x: 700, direction: "reverse"},
                  {x: 1150, direction: "forward"},
                  {x: 1600, direction: "reverse"},
                  {x: 2050, direction: "forward"},
                  {x: 2500, direction: "reverse"},
                  {x: 2950, direction: "forward"},
                  {x: 3400, direction: "reverse"},
                  {x: 3850, direction: "forward"},
                  {x: 4300, direction: "reverse"},
                  {x: 4750, direction: "forward"}
                ].map((suv, i) => (
                  <g key={`fg-suv-${i}`} className={suv.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 2}s`}}>
                    {/* SUV body - taller and wider */}
                    <rect x={suv.x} y="237" width="30" height="9" rx="2" fill="#2f4f7f" />
                    {/* Windows */}
                    <rect x={suv.x + 4} y="234" width="10" height="4" rx="1" fill="#6b8ea8" opacity="0.95" />
                    <rect x={suv.x + 16} y="234" width="10" height="4" rx="1" fill="#6b8ea8" opacity="0.95" />
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
                  {x: 500, direction: "reverse"},
                  {x: 1000, direction: "forward"},
                  {x: 1500, direction: "reverse"},
                  {x: 2000, direction: "forward"},
                  {x: 2500, direction: "reverse"},
                  {x: 3000, direction: "forward"},
                  {x: 3500, direction: "reverse"},
                  {x: 4000, direction: "forward"},
                  {x: 4500, direction: "reverse"}
                ].map((truck, i) => (
                  <g key={`fg-truck-${i}`} className={truck.direction === "forward" ? "moving-car" : "moving-car-reverse"} opacity="1" style={{animationDelay: `${i * 2.5}s`}}>
                    {/* Truck body */}
                    <rect x={truck.x} y="236" width="35" height="10" rx="2" fill="#f0f0f0" />
                    {/* Cab positioned based on direction */}
                    {truck.direction === "forward" ? (
                      <>
                        <rect x={truck.x + 28} y="234" width="8" height="6" rx="1" fill="#e8d4b8" />
                        <rect x={truck.x + 29} y="235" width="6" height="3" rx="0.5" fill="#6b8ea8" opacity="0.95" />
                      </>
                    ) : (
                      <>
                        <rect x={truck.x} y="234" width="8" height="6" rx="1" fill="#e8d4b8" />
                        <rect x={truck.x + 1} y="235" width="6" height="3" rx="0.5" fill="#6b8ea8" opacity="0.95" />
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
