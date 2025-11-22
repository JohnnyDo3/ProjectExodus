'use client'

/**
 * ProgressiveSkyline - A silhouette showing the evolution of human settlement
 *
 * Visual narrative: Rural countryside → Urban city → Sustainable green city
 * Positioned at the bottom of the page as a footer element
 * Features wildlife, trees, buildings, and greenery in silhouette form
 */

export function ProgressiveSkyline() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full h-auto opacity-20 dark:opacity-15"
        viewBox="0 0 2000 250"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for subtle depth */}
          <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <g fill="url(#skylineGradient)" className="text-[var(--foreground)]">
          {/* SECTION 1: RURAL COUNTRYSIDE (Left Third - 0-650) */}

          {/* Rolling hills base */}
          <path d="M 0,200 Q 100,180 200,190 Q 300,200 400,185 Q 500,170 650,175 L 650,250 L 0,250 Z"
                opacity="0.6" />

          {/* Trees - Forest/woodland */}
          {/* Tree cluster 1 */}
          <path d="M 50,190 L 40,150 L 35,155 L 30,145 L 25,150 L 15,150 L 20,190 Z" />
          <path d="M 60,185 L 55,155 L 50,160 L 48,150 L 45,155 L 40,155 L 42,185 Z" />

          {/* Tree cluster 2 */}
          <path d="M 120,195 L 110,160 L 105,165 L 100,155 L 95,162 L 85,160 L 90,195 Z" />
          <path d="M 135,192 L 128,165 L 123,168 L 120,160 L 115,165 L 110,163 L 112,192 Z" />
          <path d="M 150,190 L 142,162 L 138,167 L 135,158 L 130,164 L 125,162 L 127,190 Z" />

          {/* Small barn/farmhouse */}
          <rect x="180" y="175" width="35" height="25" />
          <path d="M 175,175 L 197.5,158 L 220,175 Z" />

          {/* Tree cluster 3 - near barn */}
          <path d="M 230,185 L 222,155 L 218,160 L 215,152 L 210,158 L 205,156 L 207,185 Z" />
          <path d="M 245,188 L 240,163 L 236,167 L 233,160 L 228,165 L 223,163 L 225,188 Z" />

          {/* Windmill (traditional) */}
          <rect x="295" y="160" width="10" height="40" />
          <path d="M 300,165 L 315,155 M 300,165 L 285,155 M 300,165 L 310,180 M 300,165 L 290,180"
                strokeWidth="2" stroke="currentColor" fill="none" opacity="0.7" />

          {/* More trees */}
          <path d="M 350,182 L 342,155 L 338,160 L 335,152 L 330,158 L 325,156 L 327,182 Z" />
          <path d="M 370,185 L 365,162 L 361,166 L 358,160 L 353,164 L 348,162 L 350,185 Z" />

          {/* Wildlife silhouettes */}
          {/* Deer */}
          <g transform="translate(420, 185)">
            <ellipse cx="0" cy="0" rx="8" ry="5" />
            <rect x="-2" y="-8" width="1" height="4" />
            <rect x="2" y="-8" width="1" height="4" />
            <path d="M -8,-2 L -8,5 M -5,-1 L -5,5 M 5,-1 L 5,5 M 8,-2 L 8,5"
                  stroke="currentColor" strokeWidth="1" fill="none" />
          </g>

          {/* Birds flying */}
          <path d="M 480,140 Q 475,138 470,140 Q 475,139 480,140 Z M 485,140 Q 490,138 495,140 Q 490,139 485,140 Z" />
          <path d="M 520,135 Q 515,133 510,135 Q 515,134 520,135 Z M 525,135 Q 530,133 535,135 Q 530,134 525,135 Z" />

          {/* Small cottage */}
          <rect x="550" y="172" width="30" height="20" />
          <path d="M 547,172 L 565,158 L 583,172 Z" />
          <rect x="558" y="180" width="6" height="12" opacity="0.5" />

          {/* Tree cluster 4 */}
          <path d="M 610,178 L 602,152 L 598,157 L 595,150 L 590,156 L 585,154 L 587,178 Z" />
          <path d="M 630,180 L 625,158 L 621,162 L 618,156 L 613,160 L 608,158 L 610,180 Z" />

          {/* SECTION 2: URBAN CITY (Middle Third - 650-1350) */}

          {/* City base/ground */}
          <rect x="650" y="175" width="700" height="75" opacity="0.5" />

          {/* Buildings - varied heights creating city skyline */}
          <rect x="660" y="140" width="45" height="110" />
          <rect x="710" y="155" width="38" height="95" />
          <rect x="753" y="125" width="52" height="125" />
          <rect x="810" y="145" width="42" height="105" />
          <rect x="857" y="110" width="58" height="140" />
          <rect x="920" y="130" width="48" height="120" />
          <rect x="973" y="150" width="40" height="100" />
          <rect x="1018" y="120" width="55" height="130" />
          <rect x="1078" y="135" width="45" height="115" />
          <rect x="1128" y="105" width="62" height="145" />
          <rect x="1195" y="145" width="42" height="105" />
          <rect x="1242" y="125" width="50" height="125" />
          <rect x="1297" y="155" width="38" height="95" />

          {/* Windows pattern on buildings (subtle grid) */}
          <g opacity="0.3">
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={`windows-${i}`}>
                <rect x={670 + i * 55} y="145" width="3" height="3" />
                <rect x={670 + i * 55} y="152" width="3" height="3" />
                <rect x={670 + i * 55} y="159" width="3" height="3" />
                <rect x={677 + i * 55} y="145" width="3" height="3" />
                <rect x={677 + i * 55} y="152" width="3" height="3" />
                <rect x={677 + i * 55} y="159" width="3" height="3" />
              </g>
            ))}
          </g>

          {/* Tall antenna/radio tower */}
          <rect x="1000" y="75" width="4" height="75" />
          <path d="M 1002,80 L 990,95 M 1002,80 L 1014,95" stroke="currentColor" strokeWidth="1.5" fill="none" />

          {/* SECTION 3: SUSTAINABLE GREEN CITY (Right Third - 1350-2000) */}

          {/* Transition buildings with green roofs */}
          <rect x="1350" y="140" width="48" height="110" />
          <rect x="1403" y="155" width="42" height="95" />
          <rect x="1450" y="130" width="50" height="120" />

          {/* Rooftop gardens (wavy top edges) */}
          <path d="M 1350,140 Q 1360,135 1370,140 Q 1380,135 1398,140 L 1398,145 L 1350,145 Z"
                fill="currentColor" opacity="0.5" />
          <path d="M 1403,155 Q 1413,150 1423,155 Q 1433,150 1445,155 L 1445,160 L 1403,160 Z"
                fill="currentColor" opacity="0.5" />

          {/* Wind turbines (modern) */}
          <g transform="translate(1520, 145)">
            <rect x="-2" y="0" width="4" height="60" />
            <circle cx="0" cy="0" r="6" />
            {/* Blades */}
            <path d="M 0,-6 L 2,-28 L -2,-28 Z M 6,0 L 26,-4 L 24,4 Z M -3,5 L -18,20 L -12,22 Z"
                  opacity="0.8" />
          </g>

          <g transform="translate(1590, 155)">
            <rect x="-2" y="0" width="4" height="50" />
            <circle cx="0" cy="0" r="5" />
            <path d="M 0,-5 L 1.5,-22 L -1.5,-22 Z M 5,0 L 20,-3 L 19,3 Z M -2.5,4 L -14,16 L -9,18 Z"
                  opacity="0.8" />
          </g>

          {/* Green buildings with vegetation */}
          <rect x="1630" y="145" width="45" height="105" />
          {/* Vertical gardens (lines on facade) */}
          <path d="M 1638,150 Q 1640,165 1638,180 M 1648,150 Q 1650,165 1648,180 M 1658,150 Q 1660,165 1658,180"
                stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />

          <rect x="1680" y="135" width="52" height="115" />
          <path d="M 1688,140 Q 1690,160 1688,180 M 1700,140 Q 1702,160 1700,180 M 1712,140 Q 1714,160 1712,180"
                stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />

          {/* Trees integrated into city */}
          <path d="M 1745,175 L 1738,148 L 1734,153 L 1731,145 L 1726,151 L 1721,149 L 1723,175 Z" />
          <path d="M 1765,177 L 1760,155 L 1756,159 L 1753,153 L 1748,157 L 1743,155 L 1745,177 Z" />
          <path d="M 1790,173 L 1783,150 L 1779,155 L 1776,148 L 1771,154 L 1766,152 L 1768,173 Z" />

          {/* Solar panels on building */}
          <rect x="1810" y="160" width="55" height="90" />
          <g opacity="0.5">
            <rect x="1815" y="165" width="10" height="8" />
            <rect x="1827" y="165" width="10" height="8" />
            <rect x="1839" y="165" width="10" height="8" />
            <rect x="1851" y="165" width="10" height="8" />
          </g>

          {/* Community garden/green space */}
          <ellipse cx="1900" cy="195" rx="40" ry="20" opacity="0.4" />

          {/* More trees and wildlife */}
          <path d="M 1875,180 L 1868,155 L 1864,160 L 1861,153 L 1856,159 L 1851,157 L 1853,180 Z" />
          <path d="M 1920,182 L 1915,162 L 1911,166 L 1908,160 L 1903,164 L 1898,162 L 1900,182 Z" />

          {/* Birds in sustainable city */}
          <path d="M 1950,125 Q 1945,123 1940,125 Q 1945,124 1950,125 Z M 1955,125 Q 1960,123 1965,125 Q 1960,124 1955,125 Z" />
          <path d="M 1980,130 Q 1975,128 1970,130 Q 1975,129 1980,130 Z M 1985,130 Q 1990,128 1995,130 Q 1990,129 1985,130 Z" />

          {/* Final transitional elements */}
          <path d="M 1960,177 L 1955,158 L 1951,162 L 1948,156 L 1943,160 L 1938,158 L 1940,177 Z" />
          <path d="M 1985,175 L 1978,152 L 1974,157 L 1971,150 L 1966,156 L 1961,154 L 1963,175 Z" />

          {/* Gentle hill to blend edge */}
          <path d="M 1900,180 Q 1950,175 2000,185 L 2000,250 L 1900,250 Z" opacity="0.5" />
        </g>
      </svg>
    </div>
  )
}
