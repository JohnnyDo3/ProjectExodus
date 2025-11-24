'use client'

/**
 * ProgressiveSkyline - An animated journey through civilization's evolution
 *
 * Visual narrative: Rural → Suburbs → Industrial City (with pollution) → Sustainable Green City → Back to Rural
 * The cycle repeats infinitely, showing that sustainability means returning to harmony with nature
 *
 * Features:
 * - Smooth horizontal scrolling animation
 * - Pollution/smog effects in industrial phase
 * - Seamless looping
 * - Multiple layers for depth
 * - Detailed buildings, trees, and atmospheric effects
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
          animation: skylineScroll 180s linear infinite;
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
      `}</style>

      {/* Background atmosphere layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

      <div className="skyline-container flex">
        {/* Main skyline (duplicated for seamless loop) */}
        {[0, 1].map((iteration) => (
          <svg
            key={iteration}
            className="flex-shrink-0 opacity-20 dark:opacity-15"
            width="4000"
            height="250"
            viewBox="0 0 4000 250"
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
            </defs>

            <g fill={`url(#skylineGradient-${iteration})`} className="text-[var(--foreground)]">
              {/* ========== PHASE 1: RURAL COUNTRYSIDE (0-800) ========== */}

              {/* Rolling hills */}
              <path d="M 0,200 Q 80,185 160,195 Q 240,205 320,190 Q 400,175 480,185 Q 560,195 640,180 Q 720,170 800,175 L 800,250 L 0,250 Z"
                    opacity="0.5" />

              {/* Forest clusters */}
              <g opacity="0.8">
                {[40, 90, 140, 200, 260, 320, 380, 450, 520, 590, 650, 710, 760].map((x, i) => (
                  <path key={`tree1-${i}`}
                        d={`M ${x},190 L ${x-8},155 L ${x-10},160 L ${x-12},150 L ${x-15},157 L ${x-20},155 L ${x-18},190 Z`} />
                ))}
              </g>

              {/* Farm structures */}
              <g opacity="0.85">
                <rect x="180" y="175" width="40" height="30" />
                <path d="M 175,175 L 200,155 L 225,175 Z" />
                <rect x="550" y="172" width="35" height="25" />
                <path d="M 547,172 L 567.5,156 L 588,172 Z" />
              </g>

              {/* Wildlife silhouettes */}
              <g opacity="0.6">
                <ellipse cx="420" cy="185" rx="10" ry="6" />
                <ellipse cx="680" cy="183" rx="9" ry="5" />
              </g>

              {/* Birds */}
              <g opacity="0.5">
                <path d="M 250,140 Q 245,138 240,140 M 255,140 Q 260,138 265,140" />
                <path d="M 600,135 Q 595,133 590,135 M 605,135 Q 610,133 615,135" />
              </g>

              {/* ========== PHASE 2: DEVELOPING SUBURBS (800-1600) ========== */}

              {/* Suburb ground */}
              <rect x="800" y="185" width="800" height="65" opacity="0.4" />

              {/* Suburban houses (varied sizes) */}
              <g opacity="0.8">
                {[
                  {x: 820, h: 35}, {x: 880, h: 30}, {x: 935, h: 38}, {x: 995, h: 32},
                  {x: 1055, h: 36}, {x: 1115, h: 33}, {x: 1175, h: 40}, {x: 1235, h: 34},
                  {x: 1295, h: 37}, {x: 1355, h: 31}, {x: 1415, h: 39}, {x: 1475, h: 35},
                  {x: 1535, h: 33}
                ].map((house, i) => (
                  <g key={`house-${i}`}>
                    <rect x={house.x} y={250-house.h-15} width="45" height={house.h} fill={`url(#buildingGradient-${iteration})`} />
                    <path d={`M ${house.x-3},${250-house.h-15} L ${house.x+22.5},${250-house.h-28} L ${house.x+48},${250-house.h-15} Z`} />
                    <rect x={house.x+15} y={250-house.h} width="8" height="15" opacity="0.4" />
                  </g>
                ))}
              </g>

              {/* Street trees */}
              <g opacity="0.7">
                {[860, 970, 1080, 1190, 1300, 1410, 1520].map((x, i) => (
                  <circle key={`suburb-tree-${i}`} cx={x} cy="200" r="12" />
                ))}
              </g>

              {/* Street lights */}
              <g opacity="0.5">
                {[900, 1000, 1100, 1200, 1300, 1400, 1500].map((x, i) => (
                  <g key={`light-${i}`}>
                    <rect x={x} y="190" width="3" height="30" />
                    <circle cx={x+1.5} cy="188" r="4" />
                  </g>
                ))}
              </g>

              {/* ========== PHASE 3: INDUSTRIAL CITY WITH POLLUTION (1600-2400) ========== */}

              {/* City base */}
              <rect x="1600" y="160" width="800" height="90" opacity="0.6" />

              {/* Industrial smokestacks */}
              <g opacity="0.75">
                {[1650, 1850, 2050, 2250].map((x, i) => (
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
                  {x: 1620, h: 110, w: 50}, {x: 1675, h: 95, w: 42}, {x: 1722, h: 125, w: 55},
                  {x: 1782, h: 105, w: 48}, {x: 1835, h: 140, w: 60}, {x: 1900, h: 115, w: 52},
                  {x: 1957, h: 130, w: 58}, {x: 2020, h: 110, w: 50}, {x: 2075, h: 145, w: 62},
                  {x: 2142, h: 120, w: 54}, {x: 2201, h: 135, w: 60}, {x: 2266, h: 125, w: 56},
                  {x: 2327, h: 150, w: 65}
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
              <rect x="1600" y="100" width="800" height="80"
                    fill={`url(#smogGradient-${iteration})`}
                    className="smog-layer" opacity="0.3" />

              {/* Antenna towers */}
              <g opacity="0.7">
                <rect x="1980" y="75" width="5" height="75" />
                <path d="M 1982.5,80 L 1970,95 M 1982.5,80 L 1995,95" stroke="currentColor" strokeWidth="2" fill="none" />
              </g>

              {/* ========== PHASE 4: SUSTAINABLE GREEN CITY (2400-3200) ========== */}

              {/* Green city base */}
              <rect x="2400" y="170" width="800" height="80" opacity="0.5" />

              {/* Modern eco-buildings with green features */}
              <g>
                {[
                  {x: 2420, h: 105, w: 52}, {x: 2480, h: 115, w: 56}, {x: 2545, h: 100, w: 50},
                  {x: 2605, h: 120, w: 58}, {x: 2670, h: 110, w: 54}, {x: 2735, h: 125, w: 60},
                  {x: 2805, h: 115, w: 56}, {x: 2870, h: 130, w: 62}, {x: 2940, h: 120, w: 58},
                  {x: 3008, h: 135, w: 64}, {x: 3080, h: 125, w: 60}, {x: 3150, h: 115, w: 56}
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
                {[2500, 2650, 2800, 2950, 3100].map((x, i) => (
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
                {[2460, 2560, 2680, 2760, 2860, 2960, 3060, 3160].map((x, i) => (
                  <g key={`green-tree-${i}`}>
                    <path d={`M ${x},185 L ${x-10},155 L ${x-12},160 L ${x-14},152 L ${x-17},158 L ${x-22},156 L ${x-20},185 Z`} />
                    <path d={`M ${x+5},187 L ${x-3},160 L ${x-5},164 L ${x-7},158 L ${x-10},163 L ${x-14},161 L ${x-12},187 Z`} />
                  </g>
                ))}
              </g>

              {/* Birds flying in clean air */}
              <g opacity="0.6">
                {[2550, 2750, 2950, 3150].map((x, i) => (
                  <path key={`bird-${i}`}
                        d={`M ${x},125 Q ${x-5},123 ${x-10},125 M ${x+5},125 Q ${x+10},123 ${x+15},125`} />
                ))}
              </g>

              {/* Community gardens */}
              <g opacity="0.4">
                <ellipse cx="2620" cy="200" rx="45" ry="15" />
                <ellipse cx="2900" cy="198" rx="50" ry="18" />
              </g>

              {/* ========== PHASE 5: RETURN TO RURAL (3200-4000) ========== */}

              {/* Transition hills back to nature */}
              <path d="M 3200,185 Q 3280,175 3360,180 Q 3440,190 3520,175 Q 3600,165 3680,172 Q 3760,180 3840,168 Q 3920,175 4000,170 L 4000,250 L 3200,250 Z"
                    opacity="0.5" />

              {/* Restored forests */}
              <g opacity="0.8">
                {[3220, 3280, 3340, 3400, 3460, 3520, 3580, 3640, 3700, 3760, 3820, 3880, 3940].map((x, i) => (
                  <g key={`restored-tree-${i}`}>
                    <path d={`M ${x},180 L ${x-8},150 L ${x-10},155 L ${x-12},147 L ${x-15},153 L ${x-20},151 L ${x-18},180 Z`} />
                    <path d={`M ${x+15},182 L ${x+8},155 L ${x+6},159 L ${x+4},153 L ${x+1},157 L ${x-3},155 L ${x-2},182 Z`} />
                  </g>
                ))}
              </g>

              {/* Wildlife returns */}
              <g opacity="0.6">
                <ellipse cx="3350" cy="185" rx="11" ry="7" />
                <ellipse cx="3650" cy="183" rx="10" ry="6" />
                <ellipse cx="3880" cy="186" rx="9" ry="6" />
              </g>

              {/* Birds everywhere */}
              <g opacity="0.5">
                {[3300, 3500, 3700, 3900].map((x, i) => (
                  <path key={`nature-bird-${i}`}
                        d={`M ${x},130 Q ${x-5},128 ${x-10},130 M ${x+5},130 Q ${x+10},128 ${x+15},130`} />
                ))}
              </g>

              {/* Final peaceful countryside elements */}
              <g opacity="0.85">
                <rect x="3380" y="175" width="35" height="25" />
                <path d="M 3377,175 L 3397.5,159 L 3418,175 Z" />
                <rect x="3720" y="178" width="38" height="28" />
                <path d="M 3716,178 L 3739,160 L 3762,178 Z" />
              </g>
            </g>
          </svg>
        ))}
      </div>
    </div>
  )
}
