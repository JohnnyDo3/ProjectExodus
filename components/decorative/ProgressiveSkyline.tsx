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

              {/* Moving cars on the road */}
              <g className="moving-car" opacity="0.7">
                {[850, 1100, 1400, 1700].map((startX, i) => (
                  <g key={`car-${i}`} style={{animationDelay: `${i * 3}s`}}>
                    {/* Sedan */}
                    <rect x={startX} y="220" width="22" height="9" rx="2" />
                    <rect x={startX + 3} y="216" width="7" height="5" rx="1" opacity="0.6" />
                    <rect x={startX + 12} y="216" width="7" height="5" rx="1" opacity="0.6" />
                    <circle cx={startX + 5} cy="229" r="2" opacity="0.5" />
                    <circle cx={startX + 17} cy="229" r="2" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* Additional trucks/vehicles */}
              <g opacity="0.65">
                {[950, 1550].map((x, i) => (
                  <g key={`truck-${i}`}>
                    {/* Pickup truck */}
                    <rect x={x} y="236" width="28" height="10" rx="2" />
                    <rect x={x + 2} y="232" width="10" height="5" rx="1" opacity="0.6" />
                    <circle cx={x + 6} cy="246" r="2.5" opacity="0.5" />
                    <circle cx={x + 22} cy="246" r="2.5" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* Ultra-detailed miniature houses - Victorian style */}
              {[820, 920, 1020, 1120, 1220, 1320, 1420, 1520, 1620, 1720].map((x, i) => (
                <g key={`victorian-${i}`} opacity="0.85">
                  {/* Main house body - small and detailed */}
                  <rect x={x} y="185" width="28" height="22" fill={`url(#buildingGradient-${iteration})`} />

                  {/* Steep Victorian roof with decorative peak */}
                  <path d={`M ${x-3},185 L ${x+14},170 L ${x+31},185 Z`} opacity="0.8" />
                  <rect x={x+12} y="170" width="4" height="15" opacity="0.6" /> {/* Tower */}
                  <path d={`M ${x+10},170 L ${x+14},163 L ${x+18},170 Z`} opacity="0.7" /> {/* Tower roof */}

                  {/* Detailed windows */}
                  <rect x={x+4} y="190" width="5" height="7" fill="currentColor" opacity="0.3" />
                  <rect x={x+19} y="190" width="5" height="7" fill="currentColor" opacity="0.3" />
                  <rect x={x+11} y="178" width="4" height="5" fill="currentColor" opacity="0.3" />

                  {/* Front door with porch */}
                  <rect x={x+11} y="197" width="6" height="10" opacity="0.5" />
                  <path d={`M ${x+8},197 L ${x+20},197`} stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

                  {/* Chimney with smoke */}
                  <rect x={x+22} y="176" width="3" height="9" opacity="0.7" />
                  <ellipse className="chimney-smoke" cx={x+23.5} cy="173" rx="2" ry="3" opacity="0.4" />

                  {/* Decorative trim */}
                  <rect x={x} y="207" width="28" height="1.5" opacity="0.5" />
                </g>
              ))}

              {/* Colonial style houses - symmetrical design */}
              {[865, 965, 1065, 1165, 1265, 1365, 1465, 1565, 1665, 1765].map((x, i) => (
                <g key={`colonial-${i}`} opacity="0.85">
                  {/* Main colonial structure */}
                  <rect x={x} y="183" width="32" height="24" fill={`url(#buildingGradient-${iteration})`} />

                  {/* Classic colonial roof */}
                  <path d={`M ${x-2},183 L ${x+16},172 L ${x+34},183 Z`} opacity="0.8" />

                  {/* Symmetrical windows (4 windows, 2 stories) */}
                  <rect x={x+4} y="188" width="5" height="6" fill="currentColor" opacity="0.3" />
                  <rect x={x+23} y="188" width="5" height="6" fill="currentColor" opacity="0.3" />
                  <rect x={x+4} y="197" width="5" height="6" fill="currentColor" opacity="0.3" />
                  <rect x={x+23} y="197" width="5" height="6" fill="currentColor" opacity="0.3" />

                  {/* Centered front door */}
                  <rect x={x+13} y="197" width="6" height="10" opacity="0.5" />
                  <circle cx={x+17} cy="202" r="0.5" fill="currentColor" opacity="0.6" />

                  {/* Front porch pillars */}
                  <rect x={x+10} y="197" width="1.5" height="10" opacity="0.4" />
                  <rect x={x+20.5} y="197" width="1.5" height="10" opacity="0.4" />

                  {/* Chimney */}
                  <rect x={x+27} y="175" width="3" height="8" opacity="0.7" />

                  {/* Shutters */}
                  <rect x={x+2.5} y="188" width="1" height="6" opacity="0.4" />
                  <rect x={x+9.5} y="188" width="1" height="6" opacity="0.4" />
                  <rect x={x+21.5} y="188" width="1" height="6" opacity="0.4" />
                  <rect x={x+28.5} y="188" width="1" height="6" opacity="0.4" />
                </g>
              ))}

              {/* Ranch style houses - low and wide */}
              {[843, 943, 1043, 1143, 1243, 1343, 1443, 1543, 1643, 1743].map((x, i) => (
                <g key={`ranch-${i}`} opacity="0.85">
                  {/* Wide, low ranch house */}
                  <rect x={x} y="193" width="38" height="14" fill={`url(#buildingGradient-${iteration})`} />

                  {/* Low-pitched roof */}
                  <path d={`M ${x-2},193 L ${x+19},186 L ${x+40},193 Z`} opacity="0.75" />

                  {/* Horizontal windows */}
                  <rect x={x+5} y="196" width="8" height="5" fill="currentColor" opacity="0.3" />
                  <rect x={x+25} y="196" width="8" height="5" fill="currentColor" opacity="0.3" />

                  {/* Attached garage */}
                  <rect x={x+30} y="197" width="7" height="10" opacity="0.4" />
                  <rect x={x+31} y="203" width="5" height="4" fill="currentColor" opacity="0.25" />

                  {/* Front door */}
                  <rect x={x+15} y="199" width="4" height="8" opacity="0.5" />

                  {/* Driveway */}
                  <path d={`M ${x+33},207 L ${x+33},215`} stroke="currentColor" strokeWidth="4" opacity="0.25" />
                </g>
              ))}

              {/* Cottage style houses - small and cozy */}
              {[888, 988, 1088, 1188, 1288, 1388, 1488, 1588, 1688, 1788].map((x, i) => (
                <g key={`cottage-${i}`} opacity="0.85">
                  {/* Small cottage body */}
                  <rect x={x} y="192" width="24" height="15" fill={`url(#buildingGradient-${iteration})`} />

                  {/* Rounded cottage roof */}
                  <path d={`M ${x-2},192 Q ${x+12},182 ${x+26},192 Z`} opacity="0.8" />

                  {/* Arched door */}
                  <path d={`M ${x+9},197 L ${x+9},207 L ${x+15},207 L ${x+15},197 Q ${x+12},195 ${x+9},197 Z`} opacity="0.5" />

                  {/* Small cottage windows */}
                  <rect x={x+4} y="195" width="4" height="5" fill="currentColor" opacity="0.3" />
                  <rect x={x+16} y="195" width="4" height="5" fill="currentColor" opacity="0.3" />

                  {/* Window boxes with flowers */}
                  <rect x={x+3} y="200" width="6" height="1.5" opacity="0.4" />
                  <rect x={x+15} y="200" width="6" height="1.5" opacity="0.4" />
                  <circle cx={x+5} cy="199" r="0.8" opacity="0.5" />
                  <circle cx={x+7} cy="199" r="0.8" opacity="0.5" />
                  <circle cx={x+17} cy="199" r="0.8" opacity="0.5" />
                  <circle cx={x+19} cy="199" r="0.8" opacity="0.5" />

                  {/* Small chimney */}
                  <rect x={x+19} y="186" width="2.5" height="6" opacity="0.7" />

                  {/* Garden fence */}
                  {Array.from({length: 6}).map((_, fi) => (
                    <rect key={`fence-${fi}`} x={x + fi * 4} y="207" width="1" height="5" opacity="0.3" />
                  ))}
                </g>
              ))}

              {/* Modern style houses - clean lines */}
              {[908, 1008, 1108, 1208, 1308, 1408, 1508, 1608, 1708, 1808].map((x, i) => (
                <g key={`modern-${i}`} opacity="0.85">
                  {/* Cubic modern house */}
                  <rect x={x} y="188" width="26" height="19" fill={`url(#buildingGradient-${iteration})`} />

                  {/* Flat/minimal roof */}
                  <rect x={x-1} y="186" width="28" height="2" opacity="0.7" />

                  {/* Large modern windows */}
                  <rect x={x+3} y="192" width="9" height="11" fill="currentColor" opacity="0.25" />
                  <rect x={x+14} y="192" width="9" height="11" fill="currentColor" opacity="0.25" />

                  {/* Minimal door */}
                  <rect x={x+11} y="199" width="4" height="8" opacity="0.45" />

                  {/* Solar panels on roof */}
                  <rect x={x+2} y="187" width="10" height="1" opacity="0.5" />
                  <rect x={x+14} y="187" width="10" height="1" opacity="0.5" />

                  {/* Modern landscaping */}
                  <circle cx={x+4} cy="208" r="3" opacity="0.35" />
                  <circle cx={x+22} cy="208" r="3" opacity="0.35" />
                </g>
              ))}

              {/* Yard trees and landscaping */}
              <g opacity="0.7">
                {[810, 855, 900, 945, 990, 1035, 1080, 1125, 1170, 1215, 1260, 1305, 1350, 1395, 1440, 1485, 1530, 1575, 1620, 1665, 1710, 1755, 1800].map((x, i) => (
                  <g key={`yard-tree-${i}`}>
                    {/* Tree trunk */}
                    <rect x={x} y="203" width="2" height="7" opacity="0.6" />
                    {/* Tree foliage */}
                    <circle cx={x+1} cy="201" r="4" opacity="0.5" />
                  </g>
                ))}
              </g>

              {/* Street lights along the road */}
              <g opacity="0.6">
                {[830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, 1730, 1830, 1930].map((x, i) => (
                  <g key={`street-light-${i}`}>
                    <rect x={x} y="208" width="2" height="15" />
                    <circle cx={x+1} cy="206" r="3" opacity="0.4" />
                    <circle cx={x+1} cy="206" r="1.5" className="window-light" />
                  </g>
                ))}
              </g>

              {/* Mailboxes */}
              <g opacity="0.5">
                {[825, 870, 915, 960, 1005, 1050, 1095, 1140, 1185, 1230, 1275, 1320, 1365, 1410, 1455, 1500, 1545, 1590, 1635, 1680, 1725, 1770, 1815].map((x, i) => (
                  <g key={`mailbox-${i}`}>
                    <rect x={x} y="211" width="1.5" height="4" opacity="0.7" />
                    <rect x={x-0.5} y="210" width="2.5" height="2" rx="0.5" opacity="0.8" />
                  </g>
                ))}
              </g>

              {/* Fire hydrants */}
              <g opacity="0.6">
                {[900, 1100, 1300, 1500, 1700, 1900].map((x, i) => (
                  <g key={`hydrant-${i}`}>
                    <rect x={x} y="212" width="3" height="4" opacity="0.7" />
                    <rect x={x-0.5} y="213" width="4" height="1.5" opacity="0.6" />
                  </g>
                ))}
              </g>

              {/* Stop signs at intersections */}
              <g opacity="0.65">
                {[1000, 1400, 1800].map((x, i) => (
                  <g key={`stop-sign-${i}`}>
                    <rect x={x} y="208" width="1.5" height="10" opacity="0.7" />
                    <polygon points={`${x+0.75},204 ${x+4},206 ${x+4},210 ${x+0.75},212 ${x-2.5},210 ${x-2.5},206`} opacity="0.7" />
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
            </g>
          </svg>
        ))}
      </div>
    </div>
  )
}
