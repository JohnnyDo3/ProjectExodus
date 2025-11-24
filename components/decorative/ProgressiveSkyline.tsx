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
            transform: translateX(-50%);
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
          100% { transform: translateX(400px); }
        }

        .moving-car {
          animation: carDrive 15s linear infinite;
        }

        @keyframes carDriveReverse {
          0% { transform: translateX(0) scaleX(-1); }
          100% { transform: translateX(-400px) scaleX(-1); }
        }

        .moving-car-reverse {
          animation: carDriveReverse 15s linear infinite;
        }

        @keyframes chimneySmokeRise {
          0% { opacity: 0.6; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }

        .chimney-smoke {
          animation: chimneySmokeRise 3s ease-out infinite;
        }
      `}</style>

      {/* Background atmosphere layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

      <div className="skyline-container flex">
        {/* Main skyline (duplicated for seamless loop) */}
        {[0, 1].map((iteration) => (
          <svg
            key={iteration}
            className="flex-shrink-0 opacity-20 dark:opacity-15"
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

              {/* Horses in the fields - MORE HORSES! */}
              <g>
                {[120, 320, 420, 580, 680, 760].map((x, i) => (
                  <g key={`horse-${i}`} opacity="1">
                    {/* Horse body */}
                    <ellipse cx={x} cy="200" rx="8" ry="5" fill="#654321" />
                    {/* Horse head */}
                    <ellipse cx={x-6} cy="197" rx="3" ry="4" fill="#654321" />
                    {/* Legs */}
                    <rect x={x-3} y="205" width="1.5" height="5" fill="#654321" />
                    <rect x={x+2} y="205" width="1.5" height="5" fill="#654321" />
                    {/* Tail */}
                    <path d={`M ${x+8},200 Q ${x+11},198 ${x+12},202`} stroke="#4a3520" strokeWidth="1.5" fill="none" />
                    {/* Mane */}
                    <path d={`M ${x-6},195 Q ${x-4},193 ${x-2},195`} stroke="#4a3520" strokeWidth="1" fill="none" />
                  </g>
                ))}
              </g>

              {/* Cows grazing - MORE COWS! */}
              <g>
                {[230, 390, 510, 640].map((x, i) => (
                  <g key={`cow-${i}`} opacity="1">
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
                  <g key={`sheep-${i}`} opacity="1">
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
                  <g key={`chicken-${i}`} opacity="1">
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

              {/* Birds flying over countryside */}
              <g opacity="0.75">
                {[150, 250, 350, 450, 550, 650, 750].map((x, i) => (
                  <path key={`bird-${i}`}
                        d={`M ${x},160 Q ${x-4},158 ${x-8},160 M ${x+4},160 Q ${x+8},158 ${x+12},160`}
                        stroke="#4a4a4a" strokeWidth="1" fill="none" />
                ))}
              </g>

              {/* ========== PHASE 2: DEVELOPING SUBURBS (800-2000) ========== */}

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
              {[820, 940, 1060, 1180, 1300, 1420, 1540, 1660, 1780, 1900].map((x, i) => (
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
              {[870, 995, 1120, 1245, 1370, 1495, 1620, 1745, 1870, 1995].map((x, i) => (
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
              {[850, 980, 1110, 1240, 1370, 1500, 1630, 1760, 1890, 2020].map((x, i) => (
                <g key={`ranch-${i}`}>
                  {/* Wide, low ranch house */}
                  <rect x={x} y="193" width="38" height="14" fill={`url(#ranchHouse-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-2},193 L ${x+19},186 L ${x+40},193 Z`} fill={`url(#ranchRoof-${iteration})`} />

                  {/* Horizontal windows */}
                  <rect x={x+5} y="196" width="8" height="5" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+25} y="196" width="8" height="5" fill="#6b8ea8" opacity="0.95" />

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
              {[900, 1035, 1170, 1305, 1440, 1575, 1710, 1845, 1980, 2115].map((x, i) => (
                <g key={`cottage-${i}`}>
                  {/* Small cottage body */}
                  <rect x={x} y="192" width="24" height="15" fill={`url(#cottageHouse-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-2},192 Q ${x+12},182 ${x+26},192 Z`} fill={`url(#cottageRoof-${iteration})`} />

                  {/* Arched door */}
                  <path d={`M ${x+9},197 L ${x+9},207 L ${x+15},207 L ${x+15},197 Q ${x+12},195 ${x+9},197 Z`} fill="#a85757" opacity="1" />

                  {/* Small cottage windows */}
                  <rect x={x+4} y="195" width="4" height="5" fill="#6b8ea8" opacity="0.95" />
                  <rect x={x+16} y="195" width="4" height="5" fill="#6b8ea8" opacity="0.95" />

                  {/* Window boxes with flowers */}
                  <rect x={x+3} y="200" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <rect x={x+15} y="200" width="6" height="1.5" fill="#8b7355" opacity="1" />
                  <circle cx={x+5} cy="199" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+7} cy="199" r="0.8" fill="#ffd700" opacity="1" />
                  <circle cx={x+17} cy="199" r="0.8" fill="#ff69b4" opacity="1" />
                  <circle cx={x+19} cy="199" r="0.8" fill="#ffd700" opacity="1" />

                  {/* Small chimney */}
                  <rect x={x+19} y="186" width="2.5" height="6" fill="#a85757" opacity="1" />

                  {/* Garden fence */}
                  {Array.from({length: 6}).map((_, fi) => (
                    <rect key={`fence-${fi}`} x={x + fi * 4} y="207" width="1" height="5" fill="#e8d4b8" opacity="0.95" />
                  ))}
                </g>
              ))}

              {/* Modern style houses - clean lines */}
              {[920, 1060, 1200, 1340, 1480, 1620, 1760, 1900, 2040, 2180].map((x, i) => (
                <g key={`modern-${i}`}>
                  {/* Cubic modern house */}
                  <rect x={x} y="188" width="26" height="19" fill={`url(#modernHouse-${iteration})`} />

                  {/* Flat/minimal roof */}
                  <rect x={x-1} y="186" width="28" height="2" fill={`url(#modernRoof-${iteration})`} />

                  {/* Large modern windows */}
                  <rect x={x+3} y="192" width="9" height="11" fill="#6b8ea8" opacity="0.9" />
                  <rect x={x+14} y="192" width="9" height="11" fill="#6b8ea8" opacity="0.9" />

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

              {/* Yard trees and landscaping */}
              <g opacity="0.8">
                {[815, 860, 905, 955, 1000, 1050, 1095, 1145, 1190, 1240, 1285, 1335, 1380, 1430, 1475, 1525, 1570, 1620, 1665, 1715, 1760, 1810, 1855, 1905, 1950, 2000, 2050, 2095, 2145, 2190].map((x, i) => (
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
                {[840, 970, 1100, 1230, 1360, 1490, 1620, 1750, 1880, 2010, 2140].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    <rect x={x} y="208" width="2" height="15" fill="#4a4a4a" opacity="0.9" />
                    <circle cx={x+1} cy="206" r="3" fill="#ffd700" opacity="0.5" />
                    <circle cx={x+1} cy="206" r="1.5" fill="#ffeb3b" className="window-light" />
                  </g>
                ))}
              </g>

              {/* Mailboxes */}
              <g opacity="0.8">
                {[825, 945, 1065, 1185, 1305, 1425, 1545, 1665, 1785, 1905, 2025, 2145].map((x, i) => (
                  <g key={`mailbox-${i}`}>
                    <rect x={x} y="211" width="1.5" height="4" fill="#5a4a3a" opacity="0.9" />
                    <rect x={x-0.5} y="210" width="2.5" height="2" rx="0.5" fill="#d4af37" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Fire hydrants */}
              <g opacity="0.8">
                {[1000, 1300, 1600, 1900, 2200].map((x, i) => (
                  <g key={`hydrant-${i}`}>
                    <rect x={x} y="212" width="3" height="4" fill="#cc3333" opacity="0.9" />
                    <rect x={x-0.5} y="213" width="4" height="1.5" fill="#aa2222" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* Stop signs at intersections */}
              <g opacity="0.8">
                {[1100, 1500, 1900].map((x, i) => (
                  <g key={`stop-sign-${i}`}>
                    <rect x={x} y="208" width="1.5" height="10" fill="#4a4a4a" opacity="0.9" />
                    <polygon points={`${x+0.75},204 ${x+4},206 ${x+4},210 ${x+0.75},212 ${x-2.5},210 ${x-2.5},206`} fill="#cc3333" opacity="0.9" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 3: INDUSTRIAL CITY WITH POLLUTION (2000-2800) ========== */}

              {/* City base */}
              <rect x="2000" y="160" width="800" height="90" opacity="0.6" />

              {/* City streets */}
              <rect x="2000" y="220" width="800" height="30" fill={`url(#roadGradient-${iteration})`} opacity="0.5" />

              {/* Industrial smokestacks */}
              <g opacity="0.75">
                {[2050, 2250, 2450, 2650].map((x, i) => (
                  <g key={`stack-${i}`}>
                    <rect x={x} y="140" width="15" height="110" />
                    <rect x={x-3} y="137" width="21" height="6" />
                    {/* Smoke/pollution */}
                    <ellipse className="smog-layer" cx={x+7.5} cy="130" rx="15" ry="8"
                             fill={`url(#smogGradient-${iteration})`} opacity="0.6" />
                    <ellipse className="smog-layer" cx={x+7.5} cy="120" rx="20" ry="10"
                             fill={`url(#smogGradient-${iteration})`} opacity="0.4"
                             style={{animationDelay: '0.5s'}} />
                  </g>
                ))}
              </g>

              {/* Dense city buildings (tall, imposing) */}
              <g>
                {[
                  {x: 2020, h: 110, w: 50}, {x: 2075, h: 95, w: 42}, {x: 2122, h: 125, w: 55},
                  {x: 2182, h: 105, w: 48}, {x: 2235, h: 140, w: 60}, {x: 2300, h: 115, w: 52},
                  {x: 2357, h: 130, w: 58}, {x: 2420, h: 110, w: 50}, {x: 2475, h: 145, w: 62},
                  {x: 2542, h: 120, w: 54}, {x: 2601, h: 135, w: 60}, {x: 2666, h: 125, w: 56},
                  {x: 2727, h: 150, w: 65}
                ].map((bldg, i) => (
                  <g key={`industrial-bldg-${i}`}>
                    <rect x={bldg.x} y={250-bldg.h} width={bldg.w} height={bldg.h}
                          fill={`url(#buildingGradient-${iteration})`} />
                    {/* Windows grid */}
                    <g opacity="0.4">
                      {Array.from({length: Math.floor(bldg.h/15)}).map((_, row) => (
                        Array.from({length: Math.floor(bldg.w/12)}).map((_, col) => (
                          <rect key={`win-${row}-${col}`}
                                className="window-light"
                                x={bldg.x + 5 + col * 12}
                                y={250 - bldg.h + 8 + row * 15}
                                width="4"
                                height="6"
                                fill="currentColor"
                                style={{animationDelay: `${(row + col) * 0.2}s`}} />
                        ))
                      ))}
                    </g>
                  </g>
                ))}
              </g>

              {/* Heavy smog overlay for industrial area */}
              <rect x="2000" y="100" width="800" height="80"
                    fill={`url(#smogGradient-${iteration})`}
                    className="smog-layer" opacity="0.3" />

              {/* Antenna towers */}
              <g opacity="0.7">
                <rect x="2380" y="75" width="5" height="75" />
                <path d="M 2382.5,80 L 2370,95 M 2382.5,80 L 2395,95" stroke="currentColor" strokeWidth="2" fill="none" />
              </g>

              {/* ========== PHASE 4: SUSTAINABLE GREEN CITY (2800-3800) ========== */}

              {/* Green city base */}
              <rect x="2800" y="170" width="1000" height="80" opacity="0.5" />

              {/* Green city streets with bike lanes */}
              <g opacity="0.6">
                <rect x="2800" y="220" width="1000" height="30" fill={`url(#roadGradient-${iteration})`} />
                {/* Bike lane markings */}
                {Array.from({length: 20}).map((_, i) => (
                  <path key={`bike-${i}`} d={`M ${2810 + i * 50},225 L ${2815 + i * 50},230 L ${2810 + i * 50},235`}
                        stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
                ))}
              </g>

              {/* Modern eco-buildings with green features */}
              <g>
                {[
                  {x: 2820, h: 105, w: 52}, {x: 2880, h: 115, w: 56}, {x: 2945, h: 100, w: 50},
                  {x: 3005, h: 120, w: 58}, {x: 3070, h: 110, w: 54}, {x: 3135, h: 125, w: 60},
                  {x: 3205, h: 115, w: 56}, {x: 3270, h: 130, w: 62}, {x: 3340, h: 120, w: 58},
                  {x: 3408, h: 135, w: 64}, {x: 3480, h: 125, w: 60}, {x: 3550, h: 115, w: 56},
                  {x: 3615, h: 128, w: 61}, {x: 3685, h: 118, w: 57}, {x: 3750, h: 122, w: 59}
                ].map((bldg, i) => (
                  <g key={`green-bldg-${i}`}>
                    <rect x={bldg.x} y={250-bldg.h} width={bldg.w} height={bldg.h}
                          fill={`url(#buildingGradient-${iteration})`} />
                    {/* Green roof */}
                    <path d={`M ${bldg.x},${250-bldg.h} Q ${bldg.x+bldg.w/3},${250-bldg.h-5} ${bldg.x+2*bldg.w/3},${250-bldg.h} Q ${bldg.x+bldg.w},${250-bldg.h-5} ${bldg.x+bldg.w},${250-bldg.h} L ${bldg.x+bldg.w},${250-bldg.h+5} L ${bldg.x},${250-bldg.h+5} Z`}
                          opacity="0.5" />
                    {/* Vertical gardens (green lines on facade) */}
                    <g opacity="0.4">
                      {Array.from({length: 3}).map((_, line) => (
                        <path key={`garden-${line}`}
                              d={`M ${bldg.x+10+line*15},${250-bldg.h+10} Q ${bldg.x+12+line*15},${250-bldg.h+bldg.h/2} ${bldg.x+10+line*15},${250-bldg.h+bldg.h-10}`}
                              stroke="currentColor"
                              strokeWidth="2.5"
                              fill="none" />
                      ))}
                    </g>
                    {/* Solar panels on roof */}
                    <g opacity="0.5">
                      {Array.from({length: Math.floor(bldg.w/15)}).map((_, panel) => (
                        <rect key={`solar-${panel}`}
                              x={bldg.x + 5 + panel * 15}
                              y={250 - bldg.h - 4}
                              width="10"
                              height="8"
                              fill="currentColor" />
                      ))}
                    </g>
                  </g>
                ))}
              </g>

              {/* Wind turbines (with rotating blades) */}
              <g>
                {[2900, 3050, 3200, 3350, 3500, 3650].map((x, i) => (
                  <g key={`turbine-${i}`} transform={`translate(${x}, ${145 + i * 5})`}>
                    <rect x="-3" y="0" width="6" height="70" />
                    <circle cx="0" cy="0" r="8" />
                    <g className="turbine-blade" style={{animationDelay: `${i * 0.3}s`}}>
                      <path d="M 0,-8 L 3,-35 L -3,-35 Z" opacity="0.8" />
                      <path d="M 8,0 L 30,-5 L 28,5 Z" opacity="0.8" />
                      <path d="M -4,6 L -22,24 L -16,26 Z" opacity="0.8" />
                    </g>
                  </g>
                ))}
              </g>

              {/* Urban trees and green spaces */}
              <g opacity="0.75">
                {[2860, 2960, 3080, 3160, 3260, 3360, 3460, 3560, 3660, 3760].map((x, i) => (
                  <g key={`green-tree-${i}`}>
                    <path d={`M ${x},185 L ${x-10},155 L ${x-12},160 L ${x-14},152 L ${x-17},158 L ${x-22},156 L ${x-20},185 Z`} />
                    <path d={`M ${x+5},187 L ${x-3},160 L ${x-5},164 L ${x-7},158 L ${x-10},163 L ${x-14},161 L ${x-12},187 Z`} />
                  </g>
                ))}
              </g>

              {/* Birds flying in clean air */}
              <g opacity="0.6">
                {[2950, 3150, 3350, 3550, 3750].map((x, i) => (
                  <path key={`bird-${i}`}
                        d={`M ${x},125 Q ${x-5},123 ${x-10},125 M ${x+5},125 Q ${x+10},123 ${x+15},125`} />
                ))}
              </g>

              {/* Community gardens */}
              <g opacity="0.4">
                <ellipse cx="3020" cy="200" rx="45" ry="15" />
                <ellipse cx="3300" cy="198" rx="50" ry="18" />
                <ellipse cx="3600" cy="199" rx="48" ry="16" />
              </g>

              {/* Electric buses/vehicles */}
              <g opacity="0.7">
                {[2900, 3200, 3500].map((x, i) => (
                  <g key={`ebus-${i}`}>
                    <rect x={x} y="235" width="35" height="12" rx="2" />
                    <rect x={x+3} y="231" width="10" height="5" rx="1" opacity="0.5" />
                    <rect x={x+22} y="231" width="10" height="5" rx="1" opacity="0.5" />
                    <circle cx={x+8} cy="247" r="2.5" opacity="0.5" />
                    <circle cx={x+27} cy="247" r="2.5" opacity="0.5" />
                    {/* Electric symbol */}
                    <path d={`M ${x+17},238 L ${x+15},242 L ${x+18},242 L ${x+16},246`} stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 5: RETURN TO RURAL (3800-5000) ========== */}

              {/* Transition hills back to nature */}
              <path d="M 3800,185 Q 3880,175 3960,180 Q 4040,190 4120,175 Q 4200,165 4280,172 Q 4360,180 4440,168 Q 4520,175 4600,170 Q 4680,178 4760,173 Q 4840,168 4920,175 Q 4980,180 5000,178 L 5000,250 L 3800,250 Z"
                    opacity="0.5" />

              {/* Restored forests */}
              <g opacity="0.8">
                {[3820, 3880, 3940, 4000, 4060, 4120, 4180, 4240, 4300, 4360, 4420, 4480, 4540, 4600, 4660, 4720, 4780, 4840, 4900, 4960].map((x, i) => (
                  <g key={`restored-tree-${i}`}>
                    <path d={`M ${x},180 L ${x-8},150 L ${x-10},155 L ${x-12},147 L ${x-15},153 L ${x-20},151 L ${x-18},180 Z`} />
                    <path d={`M ${x+15},182 L ${x+8},155 L ${x+6},159 L ${x+4},153 L ${x+1},157 L ${x-3},155 L ${x-2},182 Z`} />
                  </g>
                ))}
              </g>

              {/* Wildlife returns */}
              <g opacity="0.6">
                <ellipse cx="3950" cy="185" rx="11" ry="7" />
                <ellipse cx="4250" cy="183" rx="10" ry="6" />
                <ellipse cx="4580" cy="186" rx="9" ry="6" />
                <ellipse cx="4850" cy="184" rx="10" ry="6" />
              </g>

              {/* Birds everywhere */}
              <g opacity="0.5">
                {[3900, 4100, 4300, 4500, 4700, 4900].map((x, i) => (
                  <path key={`nature-bird-${i}`}
                        d={`M ${x},130 Q ${x-5},128 ${x-10},130 M ${x+5},130 Q ${x+10},128 ${x+15},130`} />
                ))}
              </g>

              {/* Final peaceful countryside elements */}
              <g opacity="0.85">
                <rect x="3980" y="175" width="35" height="25" />
                <path d="M 3977,175 L 3997.5,159 L 4018,175 Z" />
                <rect x="4320" y="178" width="38" height="28" />
                <path d="M 4316,178 L 4339,160 L 4362,178 Z" />
                <rect x="4680" y="176" width="36" height="26" />
                <path d="M 4677,176 L 4698,161 L 4719,176 Z" />
              </g>

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
                  {x: 200, color: "#c73e3e", direction: "forward"},    // Red
                  {x: 600, color: "#2f4f7f", direction: "reverse"},    // Blue
                  {x: 1100, color: "#4a7c2f", direction: "forward"},   // Green
                  {x: 1700, color: "#d4af37", direction: "reverse"},   // Gold
                  {x: 2300, color: "#8a8a8a", direction: "forward"},   // Silver
                  {x: 2900, color: "#4a4a4a", direction: "reverse"},   // Dark Gray
                  {x: 3500, color: "#cc6633", direction: "forward"},   // Orange
                  {x: 4100, color: "#5a3d8a", direction: "reverse"},   // Purple
                  {x: 4700, color: "#e8e8e8", direction: "forward"}    // White
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
                  {x: 400, direction: "forward"},
                  {x: 1300, direction: "reverse"},
                  {x: 2200, direction: "forward"},
                  {x: 3100, direction: "reverse"},
                  {x: 4000, direction: "forward"}
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
                  {x: 800, direction: "reverse"},
                  {x: 2000, direction: "forward"},
                  {x: 3300, direction: "reverse"},
                  {x: 4500, direction: "forward"}
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
