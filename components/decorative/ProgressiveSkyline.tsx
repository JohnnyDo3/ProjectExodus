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
        }

        @keyframes cyclistBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }

        @keyframes wheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
        @keyframes headRaise {
          0%, 30% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(-35deg); }
          70%, 100% { transform: rotate(0deg); }
        }

        @keyframes headRaiseRight {
          0%, 30% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(35deg); }
          70%, 100% { transform: rotate(0deg); }
        }

        @keyframes chickenBathe {
          0%, 100% { transform: translateY(0px); }
          15% { transform: translateY(2px); }
          30% { transform: translateY(0.5px); }
          45% { transform: translateY(2.5px); }
          60% { transform: translateY(1px); }
          75% { transform: translateY(2px); }
        }

        .drinking-head-left {
          animation: headRaise 8s ease-in-out infinite;
        }
        .drinking-head-right {
          animation: headRaiseRight 8s ease-in-out infinite;
        }

        @keyframes chickenPeck {
          0%, 85%, 100% { transform: translateY(0px); }
          88% { transform: translateY(1.5px) rotate(8deg); }
          91% { transform: translateY(0px); }
          94% { transform: translateY(1.5px) rotate(8deg); }
          97% { transform: translateY(0.5px); }
        }

        /* === 7-chicken coop roaming system ===
           Each chicken cycles: roam outside → walk to door → hide inside → walk out → repeat
           Staggered delays keep 3-5 visible outside at any time */

        @keyframes coopChicken1 {
          0% { transform: translateX(8px) translateY(-1px); opacity: 1; }
          12% { transform: translateX(22px) translateY(0px); opacity: 1; }
          28% { transform: translateX(35px) translateY(-2px); opacity: 1; }
          42% { transform: translateX(18px) translateY(0px); opacity: 1; }
          56% { transform: translateX(6px) translateY(-1px); opacity: 1; }
          64% { transform: translateX(0px) translateY(0px); opacity: 1; }
          68% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          82% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          86% { transform: translateX(0px) translateY(0px); opacity: 1; }
          100% { transform: translateX(8px) translateY(-1px); opacity: 1; }
        }
        @keyframes coopChicken2 {
          0% { transform: translateX(15px) translateY(0px); opacity: 1; }
          10% { transform: translateX(28px) translateY(-1px); opacity: 1; }
          25% { transform: translateX(42px) translateY(1px); opacity: 1; }
          40% { transform: translateX(30px) translateY(-1px); opacity: 1; }
          55% { transform: translateX(12px) translateY(0px); opacity: 1; }
          63% { transform: translateX(0px) translateY(0px); opacity: 1; }
          67% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          80% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          84% { transform: translateX(0px) translateY(0px); opacity: 1; }
          92% { transform: translateX(10px) translateY(-1px); opacity: 1; }
          100% { transform: translateX(15px) translateY(0px); opacity: 1; }
        }
        @keyframes coopChicken3 {
          0% { transform: translateX(20px) translateY(1px); opacity: 1; }
          15% { transform: translateX(38px) translateY(-1px); opacity: 1; }
          30% { transform: translateX(50px) translateY(0px); opacity: 1; }
          48% { transform: translateX(25px) translateY(1px); opacity: 1; }
          60% { transform: translateX(5px) translateY(0px); opacity: 1; }
          66% { transform: translateX(0px) translateY(0px); opacity: 1; }
          70% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          84% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          88% { transform: translateX(0px) translateY(0px); opacity: 1; }
          100% { transform: translateX(20px) translateY(1px); opacity: 1; }
        }
        @keyframes coopChicken4 {
          0% { transform: translateX(12px) translateY(-1px); opacity: 1; }
          8% { transform: translateX(5px) translateY(0px); opacity: 1; }
          14% { transform: translateX(0px) translateY(0px); opacity: 1; }
          18% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          32% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          36% { transform: translateX(0px) translateY(0px); opacity: 1; }
          50% { transform: translateX(18px) translateY(-1px); opacity: 1; }
          65% { transform: translateX(32px) translateY(1px); opacity: 1; }
          78% { transform: translateX(45px) translateY(-1px); opacity: 1; }
          90% { transform: translateX(25px) translateY(0px); opacity: 1; }
          100% { transform: translateX(12px) translateY(-1px); opacity: 1; }
        }
        @keyframes coopChicken5 {
          0% { transform: translateX(30px) translateY(0px); opacity: 1; }
          14% { transform: translateX(45px) translateY(-2px); opacity: 1; }
          26% { transform: translateX(55px) translateY(0px); opacity: 1; }
          40% { transform: translateX(35px) translateY(1px); opacity: 1; }
          52% { transform: translateX(15px) translateY(-1px); opacity: 1; }
          62% { transform: translateX(3px) translateY(0px); opacity: 1; }
          67% { transform: translateX(0px) translateY(0px); opacity: 1; }
          71% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          83% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          87% { transform: translateX(0px) translateY(0px); opacity: 1; }
          94% { transform: translateX(15px) translateY(-1px); opacity: 1; }
          100% { transform: translateX(30px) translateY(0px); opacity: 1; }
        }
        @keyframes coopChicken6 {
          0% { transform: translateX(5px) translateY(0px); opacity: 1; }
          6% { transform: translateX(0px) translateY(0px); opacity: 1; }
          10% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          22% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          26% { transform: translateX(0px) translateY(0px); opacity: 1; }
          38% { transform: translateX(20px) translateY(-1px); opacity: 1; }
          52% { transform: translateX(40px) translateY(1px); opacity: 1; }
          68% { transform: translateX(55px) translateY(-1px); opacity: 1; }
          80% { transform: translateX(35px) translateY(0px); opacity: 1; }
          92% { transform: translateX(15px) translateY(1px); opacity: 1; }
          100% { transform: translateX(5px) translateY(0px); opacity: 1; }
        }
        @keyframes coopChicken7 {
          0% { transform: translateX(25px) translateY(-1px); opacity: 1; }
          12% { transform: translateX(40px) translateY(1px); opacity: 1; }
          24% { transform: translateX(48px) translateY(-1px); opacity: 1; }
          36% { transform: translateX(30px) translateY(0px); opacity: 1; }
          48% { transform: translateX(10px) translateY(1px); opacity: 1; }
          58% { transform: translateX(3px) translateY(0px); opacity: 1; }
          64% { transform: translateX(0px) translateY(0px); opacity: 1; }
          68% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          78% { transform: translateX(-3px) translateY(0px); opacity: 0; }
          82% { transform: translateX(0px) translateY(0px); opacity: 1; }
          90% { transform: translateX(12px) translateY(-1px); opacity: 1; }
          100% { transform: translateX(25px) translateY(-1px); opacity: 1; }
        }

        .coop-chicken-1 { animation: coopChicken1 26s ease-in-out infinite; }
        .coop-chicken-2 { animation: coopChicken2 28s ease-in-out infinite; }
        .coop-chicken-3 { animation: coopChicken3 30s ease-in-out infinite; }
        .coop-chicken-4 { animation: coopChicken4 25s ease-in-out infinite; }
        .coop-chicken-5 { animation: coopChicken5 32s ease-in-out infinite; }
        .coop-chicken-6 { animation: coopChicken6 27s ease-in-out infinite; }
        .coop-chicken-7 { animation: coopChicken7 29s ease-in-out infinite; }

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

              {/* Wildflower patches scattered in pastures - actual petal flowers */}
              <g opacity="0.9">
                {/* Patch near x=50 */}
                {[45, 48, 52, 55, 47, 53].map((fx, fi) => {
                  const cy = 213 + (fi % 3) * 1.5;
                  const color = ['#ff69b4', '#ffd700', '#9370db', '#ff6347', '#ffd700', '#ff69b4'][fi];
                  return (
                    <g key={`flower-a-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
                {/* Patch near x=380 */}
                {[375, 378, 382, 385, 377, 383].map((fx, fi) => {
                  const cy = 212 + (fi % 3) * 1.5;
                  const color = ['#ffd700', '#ff69b4', '#ff6347', '#9370db', '#ff69b4', '#ffd700'][fi];
                  return (
                    <g key={`flower-b-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
                {/* Patch near x=700 */}
                {[695, 698, 702, 705, 697, 703].map((fx, fi) => {
                  const cy = 213 + (fi % 3) * 1.5;
                  const color = ['#9370db', '#ffd700', '#ff69b4', '#ffd700', '#ff6347', '#9370db'][fi];
                  return (
                    <g key={`flower-c-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
              </g>

              {/* Building shadows/foundations - ground all structures */}
              <g opacity="0.3">
                {/* Barn #1 shadow */}
                <ellipse cx="195" cy="206" rx="28" ry="3" fill="#2f3f2f" />
                {/* Silo #1 shadow */}
                <ellipse cx="225.5" cy="206" rx="8" ry="2.5" fill="#2f3f2f" />
                {/* Farmhouse #1 shadow */}
                <ellipse cx="289" cy="206" rx="12" ry="2" fill="#2f3f2f" />
                {/* Tractor shadows */}
                <ellipse cx="259" cy="208" rx="10" ry="2" fill="#2f3f2f" />
                <ellipse cx="529" cy="208" rx="10" ry="2" fill="#2f3f2f" />
              </g>

              {/* Red Barn #1 - Large Classic Barn with Details (1/3 LARGER) */}
              <g>
                {/* Foundation - stone base */}
                <rect x="169" y="204" width="45" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="169" y="203" width="45" height="2" fill="#7a7a6a" opacity="0.5" />
                {/* Main body */}
                <rect x="170" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                {/* Roof with shingle texture */}
                <path d="M 165,178 L 191.5,158 L 218,178 Z" fill="#a83232" opacity="1" />
                {/* Shingle rows on roof */}
                <path d="M 168,174 L 191.5,161 L 215,174" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 170,170 L 191.5,163 L 213,170" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 173,166 L 191.5,165 L 210,166" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.5" />
                {/* Roof ridge cap */}
                <path d="M 189,158 L 191.5,156 L 194,158" fill="#7a2222" opacity="0.8" />
                {/* Roof eave overhang */}
                <path d="M 165,178 L 218,178" stroke="#8a2828" strokeWidth="1.5" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 172,182 L 212,182 M 172,186 L 212,186 M 172,190 L 212,190 M 172,194 L 212,194 M 172,198 L 212,198 M 172,202 L 212,202" stroke="#b03535" strokeWidth="0.3" opacity="0.5" />
                <path d="M 172,185 L 212,185 M 172,192 L 212,192 M 172,199 L 212,199" stroke="#a83232" strokeWidth="0.7" opacity="1" />
                {/* Barn doors - open slightly showing hay inside */}
                <rect x="185" y="188" width="11" height="17" fill="#6d4428" opacity="1" />
                {/* Hay visible through door gap */}
                <rect x="186" y="198" width="9" height="7" fill="#d4b874" opacity="0.6" />
                <rect x="187" y="196" width="3" height="3" fill="#c8a860" opacity="0.4" />
                {/* Barn door cross pattern */}
                <path d="M 190.5,193 L 190.5,205 M 185,198 L 196,198" stroke="#5a3a2a" strokeWidth="1.3" opacity="1" />
                {/* Door hinges */}
                <rect x="185" y="191" width="1.5" height="1" fill="#3a3a3a" opacity="0.7" />
                <rect x="185" y="200" width="1.5" height="1" fill="#3a3a3a" opacity="0.7" />
                {/* Hayloft windows with frames */}
                <rect x="174.5" y="182.5" width="7" height="8" fill="#5a3a2a" opacity="1" />
                <rect x="175" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 175,186.5 L 181,186.5 M 178,183 L 178,190" stroke="#5a3a2a" strokeWidth="0.5" />
                <rect x="199.5" y="182.5" width="7" height="8" fill="#5a3a2a" opacity="1" />
                <rect x="200" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 200,186.5 L 206,186.5 M 203,183 L 203,190" stroke="#5a3a2a" strokeWidth="0.5" />
                {/* Corner boards */}
                <rect x="170" y="178" width="2" height="27" fill="#a83232" opacity="0.8" />
                <rect x="211" y="178" width="2" height="27" fill="#a83232" opacity="0.8" />
                {/* Weather vane on top */}
                <rect x="190.5" y="155" width="1.5" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 185,158 L 191.5,155 L 191.5,161 Z" fill="#d4af37" opacity="1" />
                <path d="M 198,158 L 191.5,155 L 191.5,161 Z" fill="#d4af37" opacity="1" />
                {/* Silo next to barn - larger with detail */}
                <rect x="220" y="172" width="11" height="33" fill="#d4d4d4" opacity="1" />
                {/* Silo vertical rivet lines */}
                <rect x="222" y="172" width="0.3" height="33" fill="#b8b8b8" opacity="0.6" />
                <rect x="225" y="172" width="0.3" height="33" fill="#b8b8b8" opacity="0.6" />
                <rect x="228" y="172" width="0.3" height="33" fill="#b8b8b8" opacity="0.6" />
                <ellipse cx="225.5" cy="172" rx="5.5" ry="2.5" fill="#b8b8b8" opacity="1" />
                {/* Silo roof - conical */}
                <path d="M 220,172 L 225.5,162 L 231,172" fill="#a83232" opacity="1" />
                <path d="M 221,170 L 225.5,163.5 L 230,170" stroke="#8a2828" strokeWidth="0.3" fill="none" opacity="0.5" />
                {/* Silo bands - reinforcement hoops */}
                <rect x="219.5" y="178" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="219.5" y="188" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="219.5" y="198" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                {/* Silo chute/pipe */}
                <rect x="218" y="180" width="2.5" height="8" fill="#9a9a9a" opacity="0.8" />
                <rect x="217.5" y="187" width="3.5" height="2" fill="#8a8a8a" opacity="0.7" />
                {/* Silo ladder */}
                <rect x="225" y="175" width="1" height="28" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 10}).map((_, i) => (
                  <rect key={`ladder-${i}`} x="223" y={176 + i * 2.7} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}
              </g>


              {/* Open pasture areas for animals */}

              {/* Enhanced Farmhouses with porches, shutters, smoke */}
              <g>
                {/* Farmhouse #1 - larger with full detail */}
                {/* Foundation - stone base */}
                <rect x="279" y="204" width="20" height="2" fill="#8a8a7a" opacity="0.8" />
                <rect x="278" y="204.5" width="22" height="1" fill="#7a7a6a" opacity="0.4" />
                {/* Main body */}
                <rect x="280" y="195" width="18" height="10" fill="#f0e6d3" opacity="1" />
                {/* Clapboard siding lines */}
                <path d="M 280,197 L 298,197 M 280,199 L 298,199 M 280,201 L 298,201 M 280,203 L 298,203" stroke="#e0d6c3" strokeWidth="0.3" opacity="0.5" />
                {/* Roof with overhang */}
                <path d="M 277,195 L 289,186 L 301,195 Z" fill="#8b5a3c" opacity="1" />
                {/* Roof shingle lines */}
                <path d="M 279,193 L 289,187.5 L 299,193" stroke="#7a4a2c" strokeWidth="0.3" fill="none" opacity="0.4" />
                <path d="M 281,191 L 289,189 L 297,191" stroke="#7a4a2c" strokeWidth="0.3" fill="none" opacity="0.4" />
                {/* Roof ridge line */}
                <path d="M 277,195 L 289,186 L 301,195" stroke="#7a4a2c" strokeWidth="0.5" fill="none" opacity="1" />
                {/* Gable vent */}
                <circle cx="289" cy="191" r="1.2" fill="#4a4a4a" opacity="0.5" />
                <path d="M 287.8,191 L 290.2,191 M 289,189.8 L 289,192.2" stroke="#5a5a5a" strokeWidth="0.2" />
                {/* Front door with frame */}
                <rect x="284.5" y="197.5" width="4" height="7.5" fill="#5a3a2a" opacity="1" />
                <rect x="284" y="197" width="5" height="0.8" fill="#6d4428" opacity="1" />
                {/* Door panels */}
                <rect x="285" y="198.5" width="1.4" height="2.5" fill="#4a2a1a" opacity="0.4" />
                <rect x="286.8" y="198.5" width="1.4" height="2.5" fill="#4a2a1a" opacity="0.4" />
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
                {/* Window sills */}
                <rect x="281.5" y="200" width="3.5" height="0.4" fill="#d0c8b0" opacity="0.8" />
                <rect x="291.5" y="200" width="3.5" height="0.4" fill="#d0c8b0" opacity="0.8" />
                {/* Porch with railing */}
                <rect x="282" y="204.5" width="9" height="1.5" fill="#c9b18f" opacity="1" />
                {/* Porch posts */}
                <rect x="283" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                <rect x="289" y="201" width="1" height="4" fill="#c9b18f" opacity="0.8" />
                {/* Porch railing */}
                <rect x="283.5" y="203" width="6" height="0.4" fill="#c9b18f" opacity="0.7" />
                {/* Porch steps */}
                <rect x="285" y="205.5" width="3" height="0.5" fill="#b0a080" opacity="0.7" />
                {/* Chimney with smoke */}
                <rect x="295" y="189" width="2.5" height="6" fill="#a85757" opacity="1" />
                <rect x="294.5" y="188.5" width="3.5" height="1" fill="#8a4a4a" opacity="1" />
                {/* Chimney cap */}
                <rect x="294.8" y="188" width="3" height="0.5" fill="#7a3a3a" opacity="0.8" />
                <ellipse cx="296.5" cy="186" rx="1.5" ry="2" fill="#c4c4c4" opacity="0.3" />
                <ellipse cx="297" cy="183" rx="1" ry="1.5" fill="#c4c4c4" opacity="0.2" />

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
                  <rect x="110" y="196" width="2.5" height="14" fill="#5a4a35" />
                  <path d="M 103,205 L 111.25,187 L 119.5,205 Z" fill="#3a6a3a" />
                  <path d="M 105,200 L 111.25,185 L 117.5,200 Z" fill="#4a7a4a" />
                  <path d="M 107,195 L 111.25,183 L 115.5,195 Z" fill="#5a8a5a" />
                </g>
                {/* Small young tree - x=30 (moved from 165 to avoid Barn#1) */}
                <g>
                  <rect x="30" y="198" width="2" height="7" fill="#6b5a45" />
                  <circle cx="31" cy="196" r="4" fill="#6a9a6a" />
                  <circle cx="29" cy="197" r="3" fill="#7aaa7a" />
                  <circle cx="33" cy="197" r="3" fill="#7aaa7a" />
                </g>
                {/* Large deciduous maple - x=320 */}
                <g>
                  <rect x="319" y="194" width="4" height="11" fill="#5a4a35" />
                  <circle cx="321" cy="190" r="8" fill="#5a8a5a" />
                  <circle cx="315" cy="192" r="5.5" fill="#6a9a6a" />
                  <circle cx="327" cy="192" r="5.5" fill="#6a9a6a" />
                  <circle cx="321" cy="186" r="4.5" fill="#8ab88a" />
                </g>
                {/* Tall evergreen spruce - x=355 (moved from 410 to avoid windmill) */}
                <g>
                  <rect x="355" y="195" width="2.5" height="16" fill="#4a3a25" />
                  <path d="M 348,206 L 356.25,185 L 364.5,206 Z" fill="#2f5f2f" />
                  <path d="M 350,200 L 356.25,182 L 362.5,200 Z" fill="#3a6a3a" />
                  <path d="M 352,195 L 356.25,180 L 360.5,195 Z" fill="#4a7a4a" />
                </g>
                {/* Medium deciduous - x=505 (moved from 490 to clear Silo#2) */}
                <g>
                  <rect x="505" y="196" width="3" height="9" fill="#6b5a45" />
                  <circle cx="506.5" cy="193" r="6.5" fill="#5a8a5a" />
                  <circle cx="503" cy="195" r="4.5" fill="#6a9a6a" />
                  <circle cx="510" cy="195" r="4.5" fill="#6a9a6a" />
                </g>
                {/* Small evergreen - x=610 */}
                <g>
                  <rect x="610" y="198" width="2" height="12" fill="#4a3a25" />
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
                {/* Medium deciduous birch - x=750 (trunk extended to reach ground) */}
                <g>
                  <rect x="750" y="196" width="2.5" height="13" fill="#c9b89a" />
                  <path d="M 750.5,200 L 750.5,203" stroke="#6b5a45" strokeWidth="0.5" />
                  <path d="M 751.5,201 L 751.5,204" stroke="#6b5a45" strokeWidth="0.5" />
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
                  <g key={`horse-${i}`} transform={`translate(0, ${h.y + 12})`}>
                  <g className={h.dir > 0 ? "animal-horse-left" : "animal-horse"} style={{animationDelay: `${i * 3.7}s`, animationDuration: `${h.dir > 0 ? 32 + i * 5 : 28 + i * 7}s`}}>
                  <g transform={`translate(${h.x}, 203)`}>
                  <g style={{animation: `faceFlip ${h.dir > 0 ? 32 + i * 5 : 28 + i * 7}s linear infinite`, animationDelay: `${i * 3.7}s`}}>
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

              {/* Cows - Minecraft blocky style, in pairs */}
              <g>
                {[
                  {x: 95, dir: 1, y: 2, s: 1},
                  {x: 112, dir: 1, y: -1, s: 1},
                  {x: 420, dir: -1, y: -3, s: 1},
                  {x: 438, dir: -1, y: 0, s: 1},
                  {x: 600, dir: 1, y: -1, s: 1},
                  {x: 618, dir: 1, y: 1, s: 1},
                ].map((c, i) => (
                  <g key={`cow-${i}`} transform={`translate(${c.x - c.x * c.s}, ${c.y + 12 + (1 - c.s) * 208}) scale(${c.s})`}>
                  <g className={c.dir > 0 ? "animal-cow-left" : "animal-cow"} style={{animationDelay: `${i * 4.3}s`, animationDuration: `${c.dir > 0 ? 30 + i * 7 : 35 + i * 6}s`}}>
                  <g transform={`translate(${c.x}, 203)`}>
                  <g style={{animation: `faceFlip ${c.dir > 0 ? 30 + i * 7 : 35 + i * 6}s linear infinite`, animationDelay: `${i * 4.3}s`}}>
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

              {/* Sheep FLOCKS - 3 self-aware flocks that travel together */}
              {/* Flock 1 - section 1, grazing near x=300 */}
              <g>
                <g className="animal-sheep-left" style={{animationDuration: '38s'}}>
                  {[
                    {dx: -20, dy: -2},
                    {dx: 0, dy: 2},
                    {dx: 20, dy: -3},
                  ].map((m, mi) => {
                    const sx = 300 + m.dx;
                    const dir = 1;
                    return (
                      <g key={`flock1-sheep-${mi}`} transform={`translate(0, ${m.dy + 12})`}>
                      <g transform={`translate(${sx}, 206)`}>
                      <g style={{animation: 'faceFlip 38s linear infinite', animationDelay: `${mi * 0.4}s`}}>
                      <g transform={`translate(${-sx}, -206)`} opacity="1">
                        <rect x={sx - 5} y="203" width="10" height="6" fill="#f5f5f5" />
                        <rect x={sx - 4} y="203.5" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + 1} y="204" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx - 2} y="206" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + (dir > 0 ? -8 : 4)} y="203.5" width="3.5" height="4" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -8.5 : 4)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -5.5 : 6.5)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -7 : 5.5)} y="204.5" width="0.8" height="0.8" fill="#ffffff" />
                        <rect x={sx + (dir > 0 ? -6.8 : 5.7)} y="204.5" width="0.3" height="0.4" fill="#1a1a1a" />
                        <rect x={sx + (dir > 0 ? -8.5 : 7)} y="206" width="1" height="0.7" fill="#1a1a1a" />
                        <rect x={sx - 3.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx - 1.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 1} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 3} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? 4.5 : -5.5)} y="204" width="1.5" height="2" fill="#f5f5f5" />
                      </g></g></g>
                      </g>
                    );
                  })}
                </g>
              </g>

              {/* Chickens - Minecraft blocky style, de-crowded */}
              <g>
                {[
                  {x: 45, y: 1, dir: 1},
                  {x: 200, y: -1, dir: -1},
                  {x: 380, y: 2, dir: 1},
                  {x: 555, y: -1, dir: -1},
                  {x: 630, y: 1, dir: 1},
                  {x: 760, y: 0, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-${i}`} transform={`translate(0, ${ch.y + 12})`}>
                  <g className={ch.dir > 0 ? "animal-chicken-left" : "animal-chicken"} style={{animationDelay: `${i * 2.3}s`, animationDuration: `${ch.dir > 0 ? 20 + i * 3 : 18 + i * 4}s`}}>
                  <g transform={`translate(${ch.x}, 208)`}>
                  <g style={{animation: `faceFlip ${ch.dir > 0 ? 20 + i * 3 : 18 + i * 4}s linear infinite`, animationDelay: `${i * 2.3}s`}}>
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

              {/* Chicken coop - to the LEFT of Barn #1 */}
              <g>
                {/* Coop body */}
                <rect x="148" y="203" width="12" height="8" fill="#8a6a4a" opacity="1" />
                {/* Roof */}
                <path d="M 146,203 L 154,197 L 162,203 Z" fill="#6a4a2a" opacity="1" />
                <rect x="146" y="202.5" width="16" height="1" fill="#5a3a1a" opacity="1" />
                {/* Door opening - faces right toward barn */}
                <rect x="156" y="206" width="3.5" height="5" fill="#3a2a1a" opacity="1" />
                {/* Small window */}
                <rect x="150" y="204.5" width="2.5" height="2" fill="#4a4a4a" opacity="0.7" />
                <path d="M 150,205.5 L 152.5,205.5 M 151.25,204.5 L 151.25,206.5" stroke="#6a5a4a" strokeWidth="0.3" />
                {/* Ramp from door to ground */}
                <rect x="156" y="210.5" width="5" height="0.6" fill="#7a5a3a" opacity="0.9" transform="rotate(-15, 158.5, 210.5)" />
                {/* Hay/straw around coop */}
                <rect x="147" y="210" width="15" height="1" rx="0.5" fill="#d4b874" opacity="0.4" />
                {/* 7 chickens cycling in and out of coop - origin at door (x=159, y=208) */}
                {[
                  {cls: 'coop-chicken-1', delay: 0, color: '#d4a574'},
                  {cls: 'coop-chicken-2', delay: 4, color: '#f5f5f0'},
                  {cls: 'coop-chicken-3', delay: 8, color: '#d4a574'},
                  {cls: 'coop-chicken-4', delay: 12, color: '#c49464'},
                  {cls: 'coop-chicken-5', delay: 16, color: '#d4a574'},
                  {cls: 'coop-chicken-6', delay: 20, color: '#f5f5f0'},
                  {cls: 'coop-chicken-7', delay: 24, color: '#c49464'},
                ].map((ch, ci) => (
                  <g key={`coop1-ch-${ci}`} className={ch.cls} style={{animationDelay: `${ch.delay}s`}}>
                    {/* Body */}
                    <rect x="159" y="208" width="4" height="3" fill={ch.color} />
                    {/* Head */}
                    <rect x="163" y="207" width="2" height="2.5" fill={ch.color} />
                    {/* Comb */}
                    <rect x="164" y="206" width="1.2" height="1" fill="#cc3333" />
                    {/* Beak */}
                    <rect x="165" y="207.5" width="1" height="0.5" fill="#ffd700" />
                    {/* Legs */}
                    <rect x="160" y="210.5" width="0.6" height="1.5" fill="#e8a020" />
                    <rect x="161.5" y="210.5" width="0.6" height="1.5" fill="#e8a020" />
                  </g>
                ))}
              </g>

              {/* White picket fences - rendered AFTER animals so fence appears in front */}
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

              {/* FOREGROUND: Drinking animals at pond - Minecraft blocky style */}
              <g>
                {/* Cow drinking at pond - only head/neck raises */}
                <g>
                  {/* Static body */}
                  <rect x={143} y="207" width="11" height="7" fill="#f5f5f5" />
                  <rect x={144.5} y="208" width="3" height="2.5" fill="#2f2f2f" />
                  <rect x={149} y="207.5" width="3.5" height="2.5" fill="#2f2f2f" />
                  <rect x={147} y="213" width="3" height="1.5" fill="#ffb6c1" />
                  <rect x={144} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={146} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={150} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={152} y="213.5" width="1.3" height="3" fill="#e8e8e8" />
                  <rect x={144} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={146} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={150} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={152} y="216" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={153.5} y="208" width="1" height="5" fill="#2f2f2f" />
                  {/* Animated head/neck - pivots at neck-body joint */}
                  <g className="drinking-head-left" style={{animationDuration: '12s', animationDelay: '0s', transformOrigin: '143px 210px'}}>
                    <rect x={139} y="210" width="4.5" height="3" fill="#f5f5f5" />
                    <rect x={135} y="211" width="5" height="4.5" fill="#f5f5f5" />
                    <rect x={135.5} y="211.5" width="2" height="1.5" fill="#2f2f2f" />
                    <rect x={133.5} y="213.5" width="2" height="2" fill="#ffb6c1" />
                    <rect x={137.5} y="212" width="1" height="1" fill="#2f2f2f" />
                  </g>
                  {/* Water ripple - static */}
                  <rect x={133} y="216" width="6" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={132} y="216.5" width="8" height="0.5" fill="#6a9aba" opacity="0.2" />
                </g>

                {/* Horse drinking at opposite side - only head/neck raises */}
                <g>
                  {/* Static body */}
                  <rect x={109} y="204" width="12" height="7" fill="#654321" />
                  <rect x={117} y="204" width="4" height="7" fill="#7a5230" />
                  <rect x={110} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={112.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={115} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={117.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={110} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={112.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={115} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={117.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={108} y="205" width="1.5" height="5" fill="#4a3520" />
                  {/* Animated head/neck - pivots at shoulder */}
                  <g className="drinking-head-right" style={{animationDuration: '10s', animationDelay: '4s', transformOrigin: '120px 208px'}}>
                    <rect x={120} y="208" width="3" height="5" fill="#654321" />
                    <rect x={120} y="211" width="6" height="4" fill="#654321" />
                    <rect x={124.5} y="213" width="2" height="2" fill="#7a5230" />
                    <rect x={123} y="212" width="1" height="1" fill="#2f2f2f" />
                    <rect x={125.5} y="214" width="0.5" height="0.5" fill="#3a2a1a" />
                    <rect x={120} y="208" width="1" height="4" fill="#4a3520" />
                  </g>
                  {/* Water ripple - static */}
                  <rect x={123} y="215.5" width="5" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={122} y="216" width="7" height="0.5" fill="#6a9aba" opacity="0.2" />
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
                {/* Farthest house silhouettes - grounded on the hill line */}
                {(() => {
                  // Hill keypoints from the path: x → y
                  const hillPts: [number,number][] = [[800,195],[870,190],[950,186],[1050,178],[1150,174],[1250,168],[1350,165],[1450,162],[1550,164],[1650,162],[1750,166],[1850,172],[1950,180],[2000,188]];
                  const hillY = (x: number) => {
                    for (let i = 0; i < hillPts.length - 1; i++) {
                      if (x >= hillPts[i][0] && x <= hillPts[i+1][0]) {
                        const t = (x - hillPts[i][0]) / (hillPts[i+1][0] - hillPts[i][0]);
                        return hillPts[i][1] + t * (hillPts[i+1][1] - hillPts[i][1]);
                      }
                    }
                    return 180;
                  };
                  return [900, 980, 1060, 1150, 1240, 1330, 1420, 1510, 1600, 1690, 1780, 1870, 1940].map((bx, bi) => {
                    const bh = 2 + (bi % 2) * 1;
                    const bw = 3 + (bi % 3);
                    const by = hillY(bx) + 2; // Place house fully below hill line, roofs below horizon
                    return (
                      <g key={`bg-far-${bi}`}>
                        <rect x={bx} y={by} width={bw} height={bh} fill="#1a1a1a" />
                        <path d={`M ${bx-0.3},${by} L ${bx + bw/2},${by - 1.5} L ${bx + bw + 0.3},${by} Z`} fill="#1a1a1a" />
                      </g>
                    );
                  });
                })()}
              </g>

              {/* === LAYER 2: Mid-distance hills - ramps from rural mid-ground level === */}
              <g opacity="0.45">
                <path d="M 800,202 Q 880,198 960,195 Q 1050,190 1150,186 Q 1300,180 1450,183 Q 1600,179 1750,184 Q 1880,190 1950,197 Q 2000,202 2000,210 L 800,210 Z"
                      fill="#4a7a4a" />
                {/* Mid-distance tree silhouettes removed per design */}
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
                {/* Suburban sidewalk - concrete walkway winding through the neighborhood */}
                <path d="M 800,230 Q 850,225 900,228 Q 960,232 1020,226 Q 1100,222 1180,228 Q 1260,234 1340,226 Q 1420,220 1500,228 Q 1580,235 1660,227 Q 1740,222 1820,228 Q 1900,234 1960,228 Q 1990,226 2000,228" stroke="#d4d0c8" strokeWidth="4" fill="none" opacity="0.85" strokeLinecap="round" />
                <path d="M 800,230 Q 850,225 900,228 Q 960,232 1020,226 Q 1100,222 1180,228 Q 1260,234 1340,226 Q 1420,220 1500,228 Q 1580,235 1660,227 Q 1740,222 1820,228 Q 1900,234 1960,228 Q 1990,226 2000,228" stroke="#c8c4bc" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
                {/* Sidewalk expansion joints */}
                {Array.from({length: 40}).map((_, ji) => {
                  const jx = 810 + ji * 30;
                  const jy = 230 + Math.sin(ji * 0.47) * 4 - 2;
                  return <circle key={`sw-dot-${ji}`} cx={jx} cy={jy} r="0.3" fill="#bab6ae" opacity="0.4" />;
                })}
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

                {/* === BASKETBALL HOOP near x=1649 with rectangular half court === */}
                <g>
                  {/* Rectangular blacktop - slightly smaller half court */}
                  <rect x="1641" y="208" width="17" height="10" rx="0.5" fill="#3a3a3a" opacity="0.7" />
                  {/* Court boundary lines (baseline, sidelines, half-court line) */}
                  <rect x="1641" y="208" width="17" height="10" rx="0.5" fill="none" stroke="#e8e8e8" strokeWidth="0.4" opacity="0.5" />
                  {/* Half-court line (bottom edge, farthest from basket) */}
                  <path d="M 1641,218 L 1658,218" stroke="#e8e8e8" strokeWidth="0.3" opacity="0.5" />
                  {/* Center circle at half-court line */}
                  <circle cx="1649.5" cy="218" r="2" fill="none" stroke="#e8e8e8" strokeWidth="0.3" opacity="0.45" />
                  {/* Free throw line */}
                  <path d="M 1645,212 L 1654,212" stroke="#e8e8e8" strokeWidth="0.3" opacity="0.45" />
                  {/* Free throw lane (key/paint area) */}
                  <rect x="1646.5" y="208" width="6" height="4" fill="none" stroke="#e8e8e8" strokeWidth="0.3" opacity="0.4" />
                  {/* Three-point arc */}
                  <path d="M 1643,208 Q 1643,215 1649.5,215.5 Q 1656,215 1656,208" fill="none" stroke="#e8e8e8" strokeWidth="0.3" opacity="0.4" />
                  {/* Pole - at the baseline edge, not in middle of court */}
                  <rect x="1648.5" y="194" width="1.2" height="14" fill="#6a6a6a" />
                  {/* Backboard */}
                  <rect x="1645.5" y="194" width="8" height="5" rx="0.3" fill="#e8e8e8" opacity="0.9" />
                  <rect x="1646.5" y="195" width="6" height="3.5" rx="0.2" fill="#ffffff" opacity="0.6" />
                  {/* Rim - centered on backboard */}
                  <ellipse cx="1649.5" cy="199" rx="2" ry="0.6" fill="none" stroke="#cc3333" strokeWidth="0.6" />
                  {/* Net (simplified) */}
                  <path d="M 1647.5,199.5 L 1648.5,202 M 1649.5,199.5 L 1649.5,202 M 1651.5,199.5 L 1650.5,202" stroke="#e8e0d0" strokeWidth="0.3" />
                </g>

                {/* === FLOWER GARDEN near x=1770 === */}
                <g>
                  {/* Garden border stones */}
                  <ellipse cx="1770" cy="212" rx="8" ry="3" fill="#5a8a5a" opacity="0.6" />
                  {/* Petal flowers - matching rural wildflower style */}
                  {[
                    {fx: 1765, cy: 211.5, color: '#ff69b4'},
                    {fx: 1767.5, cy: 210.8, color: '#ffd700'},
                    {fx: 1770, cy: 211.2, color: '#9370db'},
                    {fx: 1772, cy: 210.5, color: '#ff6347'},
                    {fx: 1774.5, cy: 211, color: '#ff69b4'},
                    {fx: 1766.5, cy: 212.5, color: '#87ceeb'},
                    {fx: 1769, cy: 212.8, color: '#ffd700'},
                    {fx: 1771.5, cy: 212.3, color: '#9370db'},
                    {fx: 1773.5, cy: 212.8, color: '#ff6347'},
                  ].map((f, fi) => (
                    <g key={`garden-flower-${fi}`}>
                      {/* Stem */}
                      <rect x={f.fx - 0.12} y={f.cy} width="0.25" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {/* 5 petals */}
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi}
                          cx={f.fx + Math.cos(angle * Math.PI / 180) * 0.6}
                          cy={f.cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.6}
                          rx="0.4" ry="0.25" fill={f.color}
                          transform={`rotate(${angle}, ${f.fx + Math.cos(angle * Math.PI / 180) * 0.6}, ${f.cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.6})`} />
                      ))}
                      {/* Golden center */}
                      <circle cx={f.fx} cy={f.cy - 0.3} r="0.25" fill="#ffd700" opacity="0.9" />
                    </g>
                  ))}
                  {/* Greenery between flowers */}
                  <ellipse cx="1768" cy="212" rx="1.5" ry="0.7" fill="#4a7a4a" opacity="0.5" />
                  <ellipse cx="1772" cy="212" rx="1.5" ry="0.7" fill="#5a8a5a" opacity="0.5" />
                </g>

                {/* === PARK BENCH 2 near x=1955 (moved from 1890 to avoid driveway overlap) === */}
                <g>
                  <rect x="1951" y="211" width="1" height="3" fill="#6b5a45" />
                  <rect x="1959" y="211" width="1" height="3" fill="#6b5a45" />
                  <rect x="1950" y="210.5" width="11" height="1" rx="0.3" fill="#8b7355" />
                  <rect x="1950" y="208.5" width="11" height="0.8" rx="0.3" fill="#8b7355" />
                  <rect x="1950" y="210" width="0.5" height="2" fill="#6b5a45" />
                  <rect x="1960.5" y="210" width="0.5" height="2" fill="#6b5a45" />
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
                {/* Person walking dog on sidewalk near x=900 */}
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

              {/* Grass meets road directly - no sidewalk strip needed */}

              {/* ===== WALKWAYS + DRIVEWAYS - all end at sidewalk top edge ===== */}
              {/* Sidewalk curve: M800,230 Q850,225 900,228 Q960,232 1020,226 Q1100,222 1180,228 Q1260,234 1340,226 Q1420,220 1500,228 Q1580,235 1660,227 Q1740,222 1820,228 Q1900,234 1960,228 */}
              {/* sidewalkY approximates the actual bezier curve; -2 = top edge of strokeWidth=4 sidewalk */}
              {(() => {
                // Sidewalk curve keypoints from the actual path definition
                const swPoints: [number,number][] = [[800,230],[850,225],[900,228],[960,232],[1020,226],[1100,222],[1180,228],[1260,234],[1340,226],[1420,220],[1500,228],[1580,235],[1660,227],[1740,222],[1820,228],[1900,234],[1960,228],[2000,228]];
                const sidewalkY = (px: number): number => {
                  // Find surrounding keypoints and linearly interpolate
                  if (px <= swPoints[0][0]) return swPoints[0][1] - 2;
                  if (px >= swPoints[swPoints.length-1][0]) return swPoints[swPoints.length-1][1] - 2;
                  for (let k = 0; k < swPoints.length - 1; k++) {
                    if (px >= swPoints[k][0] && px <= swPoints[k+1][0]) {
                      const t = (px - swPoints[k][0]) / (swPoints[k+1][0] - swPoints[k][0]);
                      return swPoints[k][1] + t * (swPoints[k+1][1] - swPoints[k][1]) - 2;
                    }
                  }
                  return 226; // fallback
                };
                return (
                  <>
                  {/* Front door walkways - all square-ended, extend halfway into sidewalk */}
                  <g>
                    {/* Victorian walkways - straight rects, no rounded corners */}
                    {[820, 1120, 1420, 1720].map((x, wi) => {
                      const swY = sidewalkY(x + 17.5);
                      return wi % 2 === 0 ? (
                        <rect key={`vic-dw-${wi}`} x={x+15.75} y={212.5} width="3.5" height={swY - 212.5} fill="#d4d0c8" opacity="0.85" />
                      ) : (
                        <g key={`vic-dw-${wi}`}>
                          {Array.from({length: 5}).map((_, si) => (
                            <rect key={`vic-stone-${wi}-${si}`} x={x+15.75 + (si % 2 === 0 ? 0 : 0.8)} y={213 + si * ((swY - 213) / 5)} width="3.5" height="1.8" fill="#d4d0c8" opacity="0.85" />
                          ))}
                        </g>
                      );
                    })}
                    {/* Colonial walkways - straight rects */}
                    {[1000, 1300, 1600, 1900].map((x, wi) => {
                      const swY = sidewalkY(x + 20);
                      return (
                        <rect key={`col-dw-${wi}`} x={x+18.5} y={212.5} width="3.5" height={swY - 212.5} fill="#d4d0c8" opacity="0.85" />
                      );
                    })}
                    {/* Ranch walkways - straight rects */}
                    {[880, 1180, 1480, 1780].map((x, wi) => {
                      const swY = sidewalkY(x + 21.5);
                      return wi % 2 === 0 ? (
                        <rect key={`ranch-dw-${wi}`} x={x+20} y={210} width="3.5" height={swY - 210} fill="#d4d0c8" opacity="0.85" />
                      ) : (
                        <g key={`ranch-dw-${wi}`}>
                          {Array.from({length: 5}).map((_, si) => (
                            <rect key={`ranch-stone-${wi}-${si}`} x={x+20 + (si % 2 === 0 ? 0 : 0.5)} y={211 + si * ((swY - 211) / 5)} width="3" height="1.8" fill="#d4d0c8" opacity="0.85" />
                          ))}
                        </g>
                      );
                    })}
                    {/* Cottage stepping stones */}
                    {[1060, 1360, 1660, 1960].map((x, wi) => {
                      const swY = sidewalkY(x + 15);
                      return (
                        <g key={`cot-path-${wi}`}>
                          {Array.from({length: 5}).map((_, si) => {
                            const wobble = Math.sin(si * 1.3 + wi) * 1.2;
                            return (
                              <rect key={`cot-step-${wi}-${si}`} x={x+13 + wobble} y={213 + si * ((swY - 213) / 5)} width="4" height="1.8" fill="#d4d0c8" opacity="0.85" />
                            );
                          })}
                        </g>
                      );
                    })}
                    {/* Modern walkways - straight rects */}
                    {[940, 1240, 1540, 1840].map((x, wi) => {
                      const swY = sidewalkY(x + 16.5);
                      return (
                        <rect key={`mod-dw-${wi}`} x={x+15} y={210} width="3" height={swY - 210} fill="#d4d0c8" opacity="0.85" />
                      );
                    })}
                  </g>
                  {/* Garage driveways - square-ended, extend halfway into sidewalk */}
                  <g>
                    {/* Ranch garage driveways */}
                    {[880, 1180, 1480, 1780].map((x, wi) => {
                      const swY = sidewalkY(x + 42);
                      return (
                        <rect key={`ranch-gdw-${wi}`} x={x+39} y={206} width="7" height={swY - 206} fill="#d4d0c8" opacity="0.85" />
                      );
                    })}
                    {/* Colonial driveways */}
                    {[1000, 1300, 1600, 1900].map((x, wi) => {
                      const swY = sidewalkY(x - 6);
                      return (
                        <rect key={`col-gdw-${wi}`} x={x-9} y={208} width="6" height={swY - 208} fill="#d4d0c8" opacity="0.85" />
                      );
                    })}
                    {/* Modern driveways */}
                    {[940, 1240, 1540, 1840].map((x, wi) => {
                      const swY = sidewalkY(x - 5);
                      return (
                        <rect key={`mod-gdw-${wi}`} x={x-8} y={207} width="6" height={swY - 207} fill="#d4d0c8" opacity="0.85" />
                      );
                    })}
                  </g>
                  </>
                );
              })()}

              {/* ===== MAILBOXES + FIRE HYDRANTS - positioned relative to sidewalk curve ===== */}
              {(() => {
                // Sidewalk curve keypoints (same as walkway section)
                const swPts: [number,number][] = [[800,230],[850,225],[900,228],[960,232],[1020,226],[1100,222],[1180,228],[1260,234],[1340,226],[1420,220],[1500,228],[1580,235],[1660,227],[1740,222],[1820,228],[1900,234],[1960,228],[2000,228]];
                const swAt = (px: number): number => {
                  if (px <= swPts[0][0]) return swPts[0][1];
                  if (px >= swPts[swPts.length-1][0]) return swPts[swPts.length-1][1];
                  for (let k = 0; k < swPts.length - 1; k++) {
                    if (px >= swPts[k][0] && px <= swPts[k+1][0]) {
                      const t = (px - swPts[k][0]) / (swPts[k+1][0] - swPts[k][0]);
                      return swPts[k][1] + t * (swPts[k+1][1] - swPts[k][1]);
                    }
                  }
                  return 228;
                };
                // Mailbox positions: to the left of each house walkway, above the sidewalk
                // House walkway x-centers: Vic x+17.5, Ranch x+21.5, Modern x+16.5, Colonial x+20, Cottage x+15
                const mailboxHouses = [
                  {hx: 820, wx: 820+17.5},  // Victorian
                  {hx: 880, wx: 880+21.5},  // Ranch
                  {hx: 1000, wx: 1000+20},  // Colonial
                  {hx: 1120, wx: 1120+17.5}, // Victorian
                  {hx: 1240, wx: 1240+16.5}, // Modern
                  {hx: 1360, wx: 1360+15},  // Cottage
                  {hx: 1420, wx: 1420+17.5}, // Victorian
                  {hx: 1540, wx: 1540+16.5}, // Modern
                  {hx: 1660, wx: 1660+15},  // Cottage
                  {hx: 1780, wx: 1780+21.5}, // Ranch
                  {hx: 1840, wx: 1840+16.5}, // Modern
                  {hx: 1960, wx: 1960+15},  // Cottage
                ];
                // Fire hydrant positions: between sidewalk and road, every ~200px
                const hydrantXs = [900, 1100, 1300, 1500, 1700, 1900];
                return (
                  <>
                  {/* Mailboxes - above sidewalk, to the left of each walkway */}
                  <g opacity="1">
                    {mailboxHouses.map((mb, mi) => {
                      const msx = mb.wx - 5; // 5px to the left of walkway center
                      const msy = swAt(msx) - 2; // sidewalk top edge
                      return (
                        <g key={`mailbox-${mi}`}>
                          <rect x={msx} y={msy - 5} width="1.2" height="5.5" fill="#5a4a3a" />
                          <rect x={msx - 0.8} y={msy - 6} width="3" height="2" rx="0.5" fill={mi % 3 === 0 ? "#2a2a2a" : "#d4af37"} />
                        </g>
                      );
                    })}
                  </g>
                  {/* Fire hydrants - below sidewalk, between sidewalk and road */}
                  <g opacity="0.9">
                    {hydrantXs.map((hx, hi) => {
                      const hsy = swAt(hx) + 3; // below sidewalk bottom edge
                      return (
                        <g key={`hydrant-${hi}`}>
                          <rect x={hx} y={hsy} width="2.5" height="3.5" fill="#cc3333" />
                          <rect x={hx - 0.3} y={hsy + 0.8} width="3" height="1.2" fill="#aa2222" />
                          {/* Cap */}
                          <rect x={hx + 0.3} y={hsy - 0.5} width="1.8" height="0.8" rx="0.3" fill="#dd4444" />
                          {/* Side nozzles */}
                          <rect x={hx - 0.8} y={hsy + 1.5} width="1" height="0.8" rx="0.2" fill="#bb3333" />
                          <rect x={hx + 2.3} y={hsy + 1.5} width="1" height="0.8" rx="0.2" fill="#bb3333" />
                        </g>
                      );
                    })}
                  </g>
                  </>
                );
              })()}

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
                {/* Sidewalk expansion joint lines every ~30px */}
                {Array.from({length: 60}).map((_, j) => (
                  <line key={`joint-${j}`} x1={2000 + j * 30} y1="214" x2={2000 + j * 30} y2="218"
                        stroke="#c0c0c0" strokeWidth="0.4" opacity="0.6" />
                ))}
                {/* Brick-pattern border strip along sidewalk edge */}
                <rect x="2000" y="217.5" width="1800" height="0.8" fill="#b0a090" opacity="0.7" />
                {Array.from({length: 180}).map((_, b) => (
                  <rect key={`brick-${b}`} x={2000 + b * 10} y="217.5" width="4.5" height="0.8"
                        fill={b % 2 === 0 ? "#a89080" : "#b8a898"} opacity="0.6" />
                ))}

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
                  {x: 2020, h: 60, w: 45, color: "#e8f4e8"}, {x: 2074, h: 80, w: 58, color: "#f5ede0"},
                  {x: 2142, h: 68, w: 52, color: "#e0ecf4"}, {x: 2204, h: 90, w: 64, color: "#e8d0c0"},
                  {x: 2338, h: 88, w: 62, color: "#f0f8f0"},
                  {x: 2410, h: 65, w: 48, color: "#f0e6d6"},
                  {x: 2468, h: 98, w: 68, color: "#e8f4e8"},
                  {x: 2546, h: 78, w: 56, color: "#e8e4e0"}, {x: 2612, h: 85, w: 60, color: "#e0f2e0"},
                  {x: 2682, h: 72, w: 54, color: "#d8e8f0"},
                  {x: 2822, h: 82, w: 58, color: "#e0c8b8"}, {x: 2890, h: 75, w: 52, color: "#e8f4e8"},
                  {x: 2952, h: 92, w: 64, color: "#ede0cf"}, {x: 3026, h: 68, w: 50, color: "#e0dcd8"},
                  {x: 3086, h: 88, w: 62, color: "#e0f2e0"}, {x: 3158, h: 78, w: 56, color: "#d8c0b0"},
                  {x: 3224, h: 98, w: 68, color: "#e4f0f8"}, {x: 3302, h: 85, w: 60, color: "#f0f8f0"},
                  /* Park 3 replaces building at x=3372 */
                  {x: 3436, h: 95, w: 66, color: "#e8d0c0"},
                  {x: 3512, h: 82, w: 58, color: "#e8f4e8"}, {x: 3580, h: 100, w: 70, color: "#d8d4d0"},
                  {x: 3660, h: 88, w: 62, color: "#f0f8f0"}, {x: 3732, h: 75, w: 54, color: "#f5ede0"}
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

                    {/* (Solar panels are rendered in rooftop equipment section, above the cornice) */}

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

                    {/* Building foundation/sidewalk - draws FIRST so storefront items layer on top */}
                    <g opacity="1">
                      <rect x={bldg.x - 3} y="212" width={bldg.w + 6} height="6" fill="#c8c8c8" opacity="1" />
                      <rect x={bldg.x - 3} y="212" width={bldg.w + 6} height="1" fill="#b0b0b0" opacity="1" />
                    </g>

                    {/* First floor - varied storefronts cycling 4 types */}
                    {(() => {
                      const storefrontType = i % 4 // 0=cafe, 1=flower shop, 2=bookstore, 3=standard glass
                      const cx = bldg.x + bldg.w / 2
                      const awningColors = ['#c84040', '#4a8a4a', '#b8860b', '#4a6a8a']
                      const awningColor = awningColors[storefrontType]
                      // Scale display window half-width to fit building (2px margin each side)
                      const displayHW = Math.min(18, bldg.w / 2 - 4)
                      // Standard type: window width fits within building with door gap
                      const stdWinW = Math.max(10, (bldg.w - 20) / 2)

                      return (
                        <g opacity="1">
                          {/* === STOREFRONT CONTENT (renders first / behind awning) === */}
                          {storefrontType === 0 ? (
                            /* CAFE: striped awning + bistro table */
                            <g>
                              {/* Wide display window */}
                              <rect x={cx - displayHW} y={201} width={displayHW * 2} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - displayHW + 1} y={201.5} width={displayHW * 2 - 2} height="8" fill={isNightTime && isWindowLit(bldg.x + 1000 + i) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                              {/* Cafe door */}
                              <rect x={cx - 4} y={201} width="8" height="11" fill="#5a6a5a" opacity="1" />
                              <rect x={cx - 3} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <rect x={cx + 0.5} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <circle cx={cx - 0.5} cy={207} r="0.5" fill="#d4af37" opacity="1" />
                              <circle cx={cx + 0.5} cy={207} r="0.5" fill="#d4af37" opacity="1" />
                              {/* Bistro table outside (on sidewalk) */}
                              <rect x={cx + 14} y={212} width="0.8" height="4" fill="#5a5a5a" opacity="1" />
                              <ellipse cx={cx + 14.4} cy={212} rx="3" ry="1" fill="#6a6a6a" opacity="1" />
                              {/* Tiny chairs */}
                              <rect x={cx + 10} y={213} width="2" height="3" rx="0.3" fill="#8a6a4a" opacity="0.8" />
                              <rect x={cx + 17} y={213} width="2" height="3" rx="0.3" fill="#8a6a4a" opacity="0.8" />
                            </g>
                          ) : storefrontType === 1 ? (
                            /* FLOWER SHOP: window boxes, green awning */
                            <g>
                              {/* Display windows - two panes flanking door */}
                              <rect x={cx - displayHW} y={201} width={displayHW - 5} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - displayHW + 1} y={201.5} width={displayHW - 7} height="8" fill={isNightTime && isWindowLit(bldg.x + 1000 + i) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                              <rect x={cx + 5} y={201} width={displayHW - 5} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx + 6} y={201.5} width={displayHW - 7} height="8" fill={isNightTime && isWindowLit(bldg.x + 1001 + i) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                              {/* Door */}
                              <rect x={cx - 4} y={201} width="8" height="11" fill="#5a6a5a" opacity="1" />
                              <rect x={cx - 3} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <rect x={cx + 0.5} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <circle cx={cx + 0.5} cy={207} r="0.5" fill="#d4af37" opacity="1" />
                              {/* Window flower boxes below display windows */}
                              <rect x={cx - displayHW + 1} y={209} width={displayHW - 7} height="2.5" fill="#7a5a3a" opacity="1" />
                              <circle cx={cx - displayHW + 4} cy={208.5} r="1.2" fill="#ff69b4" opacity="1" />
                              <circle cx={cx - displayHW + 7} cy={208} r="1.4" fill="#ffd700" opacity="1" />
                              <circle cx={cx - displayHW + 10} cy={208.5} r="1.2" fill="#ff69b4" opacity="1" />
                              <rect x={cx + 6} y={209} width={displayHW - 7} height="2.5" fill="#7a5a3a" opacity="1" />
                              <circle cx={cx + 9} cy={208.5} r="1.2" fill="#cc99ff" opacity="1" />
                              <circle cx={cx + 12} cy={208} r="1.4" fill="#ff6347" opacity="1" />
                              <circle cx={cx + 15} cy={208.5} r="1.2" fill="#cc99ff" opacity="1" />
                              {/* Potted plant by door */}
                              <rect x={cx + 5} y={213} width="2" height="3" fill="#7a5a3a" opacity="1" />
                              <circle cx={cx + 6} cy={212} r="2" fill="#4a8a4a" opacity="1" />
                            </g>
                          ) : storefrontType === 2 ? (
                            /* BOOKSTORE: wide display, warm awning */
                            <g>
                              {/* Wide display window with warm backing */}
                              <rect x={cx - displayHW} y={201} width={displayHW * 2} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - displayHW + 1} y={201.5} width={displayHW * 2 - 2} height="8" fill={isNightTime && isWindowLit(bldg.x + 1000 + i) ? "#FFD700" : "#8a7a6a"} opacity="1" />
                              {/* Book display in window */}
                              {Array.from({length: Math.min(5, Math.floor(displayHW * 2 / 7))}).map((_, b) => (
                                <rect key={`book-${i}-${b}`} x={cx - displayHW + 3 + b * 6} y={204} width="4" height="5" rx="0.3"
                                      fill={['#c84040', '#4a6a8a', '#8a6a4a', '#6a4a7a', '#4a8a6a'][b]} opacity="0.8" />
                              ))}
                              {/* Door */}
                              <rect x={cx - 4} y={201} width="8" height="11" fill="#5a4a3a" opacity="1" />
                              <rect x={cx - 3} y={202} width="6" height="10" fill="#8a7a6a" opacity="0.9" />
                              <rect x={cx - 3} y={207} width="6" height="0.5" fill="#5a4a3a" opacity="1" />
                              <circle cx={cx + 2} cy={207} r="0.5" fill="#d4af37" opacity="1" />
                            </g>
                          ) : (
                            /* STANDARD: glass doors - windows scaled to building width */
                            <g>
                              {/* Left storefront window */}
                              <rect x={cx - 8 - stdWinW} y={201} width={stdWinW} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - 7.4 - stdWinW} y={201.6} width={stdWinW - 1.2} height="7.8" fill={isNightTime && isWindowLit(bldg.x + 1000 + i) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                              <rect x={cx - 7.4 - stdWinW} y={205.5} width={stdWinW - 1.2} height="0.5" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - 8 - stdWinW / 2} y={201.6} width="0.6" height="7.8" fill="#4a5a4a" opacity="1" />
                              {/* Right storefront window */}
                              <rect x={cx + 8} y={201} width={stdWinW} height="9" fill="#4a5a4a" opacity="1" />
                              <rect x={cx + 8.6} y={201.6} width={stdWinW - 1.2} height="7.8" fill={isNightTime && isWindowLit(bldg.x + 1001 + i) ? "#FFD700" : "#6b8ea8"} opacity="1" />
                              <rect x={cx + 8.6} y={205.5} width={stdWinW - 1.2} height="0.5" fill="#4a5a4a" opacity="1" />
                              <rect x={cx + 8 + stdWinW / 2} y={201.6} width="0.6" height="7.8" fill="#4a5a4a" opacity="1" />
                              {/* Door */}
                              <rect x={cx - 4} y={201} width="8" height="11" fill="#5a6a5a" opacity="1" />
                              <rect x={cx - 3} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <rect x={cx + 0.5} y={202} width="2.5" height="10" fill="#6b8ea8" opacity="0.9" />
                              <rect x={cx - 3} y={207} width="2.5" height="0.5" fill="#4a5a4a" opacity="1" />
                              <rect x={cx + 0.5} y={207} width="2.5" height="0.5" fill="#4a5a4a" opacity="1" />
                              <rect x={cx - 0.8} y={206} width="0.8" height="4" fill="#d4af37" opacity="1" />
                              <rect x={cx + 0.1} y={206} width="0.8" height="4" fill="#d4af37" opacity="1" />
                            </g>
                          )}

                          {/* === AWNING (renders last / in front of windows + doors) === */}
                          <rect x={bldg.x + 4} y={198} width={bldg.w - 8} height="3.5" fill={awningColor} opacity="1" />
                          {/* Awning scalloped edge */}
                          {Array.from({length: Math.floor((bldg.w - 8) / 4)}).map((_, s) => (
                            <path key={`scallop-${i}-${s}`}
                                  d={`M ${bldg.x + 4 + s * 4},201.5 Q ${bldg.x + 6 + s * 4},203.5 ${bldg.x + 8 + s * 4},201.5`}
                                  fill={awningColor} opacity="0.9" />
                          ))}
                          {/* Awning stripe pattern for cafe */}
                          {storefrontType === 0 && Array.from({length: Math.floor((bldg.w - 8) / 3)}).map((_, s) => (
                            s % 2 === 0 ? (
                              <rect key={`stripe-${i}-${s}`} x={bldg.x + 4 + s * 3} y={198} width="3" height="3.5" fill="#e8e0d0" opacity="0.5" />
                            ) : null
                          ))}
                          {/* Sign text area on awning */}
                          {(storefrontType === 0 || storefrontType === 2) && (
                            <rect x={cx - 6} y={198.5} width="12" height="2" fill="#f5e6d3" opacity="0.8" rx="0.5" />
                          )}

                          {/* Entrance step */}
                          <rect x={cx - 10} y={212} width="20" height="1.5" fill="#a8a8a8" opacity="1" />
                        </g>
                      )
                    })()}

                    {/* Rooftop equipment - 3 cycling types with parapet */}
                    {(() => {
                      const roofType = i % 3 // 0=solar+turbine, 1=garden+planters+antenna, 2=HVAC+water tower+antenna
                      const roofY = 215 - bldg.h

                      if (roofType === 0) {
                        const tcx = bldg.x + bldg.w - 12; // turbine near right edge
                        const thy = roofY - 22; // hub height
                        return (
                          <g opacity="1">
                            {/* TYPE A: Solar panels + wind turbine */}
                            {/* Roof parapet */}
                            <rect x={bldg.x - 1} y={roofY - 2} width={bldg.w + 2} height="3" fill="#c8d8c8" opacity="1" />
                            <rect x={bldg.x} y={roofY - 2} width={bldg.w} height="0.5" fill="#b0c0b0" opacity="1" />
                            {/* Green roof restored above parapet */}
                            <rect x={bldg.x} y={roofY - 3} width={bldg.w} height="1.5" fill="#4a7c2f" opacity="1" />
                            {/* Solar panels - raised above cornice, angled on small supports */}
                            {Array.from({length: Math.max(1, Math.floor((bldg.w - 18) / 12))}).map((_, panel) => (
                              <g key={`roof-solar-${i}-${panel}`}>
                                {/* Panel support legs - extend from panel down to roof surface */}
                                <rect x={bldg.x + 4 + panel * 12} y={roofY - 7} width="0.8" height="4" fill="#8a8a8a" opacity="0.8" />
                                <rect x={bldg.x + 12 + panel * 12} y={roofY - 8} width="0.8" height="5" fill="#8a8a8a" opacity="0.8" />
                                {/* Panel - tilted via trapezoid shape */}
                                <path d={`M ${bldg.x + 3 + panel * 12},${roofY - 7} L ${bldg.x + 4 + panel * 12},${roofY - 10} L ${bldg.x + 13 + panel * 12},${roofY - 10} L ${bldg.x + 14 + panel * 12},${roofY - 7} Z`} fill="#2f4f7f" stroke="#1a2f4f" strokeWidth="0.4" />
                                {/* Panel grid lines */}
                                <line x1={bldg.x + 8.5 + panel * 12} y1={roofY - 7} x2={bldg.x + 8.5 + panel * 12} y2={roofY - 10} stroke="#1a2f4f" strokeWidth="0.3" />
                              </g>
                            ))}
                            {/* Wind turbine - emerges from roof surface */}
                            {/* Turbine tower/pole - tapered, base on green roof surface */}
                            <path d={`M ${tcx - 1.2},${roofY - 3} L ${tcx - 0.5},${thy + 2} L ${tcx + 0.5},${thy + 2} L ${tcx + 1.2},${roofY - 3} Z`} fill="#d0d0d0" stroke="#b0b0b0" strokeWidth="0.3" />
                            {/* Tower base plate - sits visibly on roof */}
                            <rect x={tcx - 2.5} y={roofY - 3.5} width="5" height="1.2" rx="0.3" fill="#b8b8b8" stroke="#a0a0a0" strokeWidth="0.2" />
                            {/* Nacelle housing - centered on tower */}
                            <rect x={tcx - 2.5} y={thy} width="5" height="2.5" rx="0.5" fill="#e0e0e0" stroke="#b0b0b0" strokeWidth="0.3" />
                            {/* Hub/spinner cone */}
                            <circle cx={tcx} cy={thy + 1.2} r="1.2" fill="#c0c0c0" stroke="#a0a0a0" strokeWidth="0.3" />
                            {/* Rotating blades - 3 blades at 120°, all 10px from hub center */}
                            <g className="turbine-blade" style={{animationDelay: `${i * 0.2}s`, transformOrigin: `${tcx}px ${thy + 1.2}px`}}>
                              {/* Blade 1 - pointing up (10px from hub) */}
                              <path d={`M ${tcx - 0.5},${thy + 0.5} Q ${tcx - 0.3},${thy - 4} ${tcx},${thy - 8.8} Q ${tcx + 0.3},${thy - 4} ${tcx + 0.5},${thy + 0.5} Z`} fill="#f0f0f0" stroke="#d8d8d8" strokeWidth="0.2" />
                              {/* Blade 2 - pointing lower-right (120°, 10px from hub) */}
                              <path d={`M ${tcx + 0.3},${thy + 1.8} Q ${tcx + 4.5},${thy + 3.5} ${tcx + 8.66},${thy + 6.2} Q ${tcx + 4.8},${thy + 4.3} ${tcx + 0.6},${thy + 2.1} Z`} fill="#e8e8e8" stroke="#d8d8d8" strokeWidth="0.2" />
                              {/* Blade 3 - pointing lower-left (240°, 10px from hub) */}
                              <path d={`M ${tcx - 0.3},${thy + 1.8} Q ${tcx - 4.5},${thy + 3.5} ${tcx - 8.66},${thy + 6.2} Q ${tcx - 4.8},${thy + 4.3} ${tcx - 0.6},${thy + 2.1} Z`} fill="#e8e8e8" stroke="#d8d8d8" strokeWidth="0.2" />
                            </g>
                          </g>
                        )
                      } else if (roofType === 1) {
                        return (
                          <g opacity="1">
                            {/* TYPE B: Garden roof + planters + lightning rod */}
                            {/* Lightning rod - behind parapet */}
                            <rect x={bldg.x + bldg.w - 8} y={roofY - 14} width="1" height="12" fill="#8a8a8a" opacity="1" />
                            <circle cx={bldg.x + bldg.w - 7.5} cy={roofY - 14} r="2" fill="#8a8a8a" opacity="1" />
                            {/* Roof parapet */}
                            <rect x={bldg.x - 1} y={roofY - 2} width={bldg.w + 2} height="3" fill="#c8d8c8" opacity="1" />
                            <rect x={bldg.x} y={roofY - 2} width={bldg.w} height="0.5" fill="#b0c0b0" opacity="1" />
                            {/* Green roof restored above parapet */}
                            <rect x={bldg.x} y={roofY - 3} width={bldg.w} height="1.5" fill="#4a7c2f" opacity="1" />
                            {/* Lush garden roof strip - in front of parapet */}
                            <rect x={bldg.x + 2} y={roofY - 2} width={bldg.w - 4} height="2" fill="#5a9a4a" opacity="1" />
                            {/* Planter boxes - in front */}
                            {Array.from({length: Math.floor(bldg.w / 16)}).map((_, p) => (
                              <g key={`planter-roof-${i}-${p}`}>
                                <rect x={bldg.x + 4 + p * 16} y={roofY - 5} width="10" height="4" fill="#8a6a4a" opacity="1" />
                                <circle cx={bldg.x + 7 + p * 16} cy={roofY - 6} r="2" fill="#4a8a4a" opacity="1" />
                                <circle cx={bldg.x + 11 + p * 16} cy={roofY - 6} r="1.8" fill="#5a9a5a" opacity="1" />
                                <circle cx={bldg.x + 9 + p * 16} cy={roofY - 7} r="1" fill="#ff69b4" opacity="0.8" />
                              </g>
                            ))}
                          </g>
                        )
                      } else {
                        return (
                          <g opacity="1">
                            {/* TYPE C: HVAC + water tower + antenna - all behind parapet */}
                            {/* Antenna */}
                            <rect x={bldg.x + bldg.w/2} y={roofY - 13} width="1" height="10" fill="#8a8a8a" opacity="1" />
                            <rect x={bldg.x + bldg.w/2 - 2} y={roofY - 11} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                            <rect x={bldg.x + bldg.w/2 - 1.5} y={roofY - 9} width="4" height="0.5" fill="#8a8a8a" opacity="1" />
                            {/* Water tower */}
                            <rect x={bldg.x + 8} y={roofY - 12} width="2" height="12" fill="#7a7a7a" opacity="1" />
                            <rect x={bldg.x + 12} y={roofY - 12} width="2" height="12" fill="#7a7a7a" opacity="1" />
                            <rect x={bldg.x + 6} y={roofY - 16} width="10" height="5" rx="1" fill="#a0a0a0" opacity="1" />
                            <ellipse cx={bldg.x + 11} cy={roofY - 16} rx="5" ry="1.5" fill="#b0b0b0" opacity="1" />
                            {/* HVAC unit */}
                            <rect x={bldg.x + bldg.w - 14} y={roofY - 7} width="10" height="6" fill="#a8a8a8" opacity="1" />
                            <rect x={bldg.x + bldg.w - 13} y={roofY - 8} width="3" height="2" fill="#909090" opacity="1" />
                            {Array.from({length: 3}).map((_, v) => (
                              <rect key={`vent-${i}-${v}`} x={bldg.x + bldg.w - 13 + v * 3} y={roofY - 5} width="2" height="0.5" fill="#808080" opacity="1" />
                            ))}
                            {/* Roof parapet - in front of all equipment */}
                            <rect x={bldg.x - 1} y={roofY - 2} width={bldg.w + 2} height="3" fill="#c8d8c8" opacity="1" />
                            <rect x={bldg.x} y={roofY - 2} width={bldg.w} height="0.5" fill="#b0c0b0" opacity="1" />
                            {/* Green roof + plants restored above parapet */}
                            <rect x={bldg.x} y={roofY - 3} width={bldg.w} height="1.5" fill="#4a7c2f" opacity="1" />
                            {Array.from({length: Math.floor(bldg.w/8)}).map((_, plant) => (
                              <circle key={`plant-c-${i}-${plant}`} cx={bldg.x + 4 + plant * 8} cy={roofY - 2.5} r="1.5" fill="#5a8a5a" opacity="1" />
                            ))}
                          </g>
                        )
                      }
                    })()}

                    {/* Window flower boxes on select buildings - below 2nd row window sills */}
                    {[0, 2, 3, 5, 7, 9, 11, 13, 16, 19].includes(i) && (() => {
                      // Position below 2nd row window sills: topMargin + 1 row + windowHeight + sill
                      const boxY = 215 - bldg.h + topMargin + (windowHeight + windowGapY) + windowHeight - 7
                      const flowerColors = [
                        ['#ff69b4', '#ffd700', '#ff69b4'],
                        ['#cc99ff', '#ff6347', '#cc99ff'],
                        ['#ffd700', '#ff69b4', '#ffd700'],
                        ['#ff6347', '#cc99ff', '#ff6347'],
                        ['#ff69b4', '#ffd700', '#9b59b6']
                      ]
                      const colors = flowerColors[i % 5]
                      // Place 2 flower boxes, evenly spaced within building width
                      const boxCount = Math.min(2, windowCols)
                      const boxSpacing = bldg.w / (boxCount + 1)
                      return (
                        <g>
                          {Array.from({length: boxCount}).map((_, fb) => {
                            const fbX = bldg.x + boxSpacing * (fb + 1) - windowWidth / 2
                            return (
                              <g key={`flowerbox-${i}-${fb}`}>
                                {/* Wooden box */}
                                <rect x={fbX - 1} y={boxY} width={windowWidth + 2} height="2.5" fill="#7a5a3a" opacity="1" />
                                <rect x={fbX - 1} y={boxY + 2} width={windowWidth + 2} height="0.5" fill="#6a4a2a" opacity="1" />
                                {/* Flowers */}
                                <circle cx={fbX + 1.5} cy={boxY - 0.5} r="1.2" fill={colors[0]} opacity="1" />
                                <circle cx={fbX + windowWidth / 2} cy={boxY - 1} r="1.4" fill={colors[1]} opacity="1" />
                                <circle cx={fbX + windowWidth - 1.5} cy={boxY - 0.5} r="1.2" fill={colors[2]} opacity="1" />
                                {/* Greenery/leaves */}
                                <ellipse cx={fbX + windowWidth / 2} cy={boxY + 0.5} rx="3" ry="1" fill="#4a8a4a" opacity="0.6" />
                              </g>
                            )
                          })}
                        </g>
                      )
                    })()}
                  </g>
                )})}
              </g>

              {/* Street lights along the city road */}
              <g>
                {[2090, 2180, 2270, 2360, 2450, 2540, 2630, 2720, 2810, 2900, 2990, 3080, 3170, 3260, 3350, 3440, 3530, 3620, 3710].map((lx, li) => (
                  <g key={`streetlight-${li}`}>
                    {/* Lamp post */}
                    <rect x={lx} y="210" width="1.5" height="8" fill="#5a5a5a" opacity="1" />
                    {/* Curved arm */}
                    <path d={`M ${lx + 0.75},210 Q ${lx + 0.75},208 ${lx + (li % 2 === 0 ? 4 : -3)},207.5`} stroke="#5a5a5a" strokeWidth="1" fill="none" />
                    {/* Lamp fixture */}
                    <rect x={lx + (li % 2 === 0 ? 3 : -4)} y="206.5" width="3" height="1.5" rx="0.5" fill="#4a4a4a" opacity="1" />
                    {/* Light glow */}
                    <ellipse cx={lx + (li % 2 === 0 ? 4.5 : -2.5)} cy="208.5" rx="2" ry="1.5" fill="#ffd700" opacity={isNightTime ? "0.3" : "0.05"} />
                  </g>
                ))}
              </g>

              {/* City Parks - Green spaces with centered fountains and symmetrical layout */}
              {/* Trees scaled to 75% of original size */}
              <g>
                {/* Park 1 - centered at x=2303 (between buildings 2268 and 2338) */}
                <g>
                  {/* Oak tree - left side (scaled down ~45%) */}
                  <g key="park1-tree-1">
                    <rect x="2275.5" y="205" width="1.5" height="5" fill="#5a4a3a" opacity="1" />
                    <circle cx="2276.5" cy="203" r="3.5" fill="#4a7c2f" opacity="1" />
                    <circle cx="2274" cy="204.5" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="2279" cy="204.5" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="2276.5" cy="200.5" r="2" fill="#6a9a5a" opacity="1" />
                  </g>
                  {/* Pine tree - left-center (scaled down ~45%) */}
                  <g key="park1-tree-2">
                    <rect x="2292.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <polygon points="2293,197 2289.5,207 2296.5,207" fill="#2d5a3d" opacity="1" />
                    <polygon points="2293,200 2290.5,206 2295.5,206" fill="#3d6a4d" opacity="1" />
                    <polygon points="2293,202.5 2291,205 2295,205" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Maple tree - center-right (scaled down ~45%) */}
                  <g key="park1-tree-3">
                    <rect x="2313.5" y="205.5" width="1" height="4.5" fill="#6b5a45" opacity="1" />
                    <ellipse cx="2314" cy="203" rx="3.5" ry="3" fill="#5a9a4a" opacity="1" />
                    <ellipse cx="2311.5" cy="204.5" r="1.8" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="2316.5" cy="204.5" r="1.8" fill="#6aaa5a" opacity="1" />
                  </g>
                  {/* Oak tree - right side (scaled down ~45%) */}
                  <g key="park1-tree-4">
                    <rect x="2329.5" y="205" width="1.5" height="5" fill="#5a4a3a" opacity="1" />
                    <circle cx="2330.5" cy="203" r="3.5" fill="#4a7c2f" opacity="1" />
                    <circle cx="2328" cy="204.5" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="2333" cy="204.5" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="2330.5" cy="200.5" r="2" fill="#6a9a5a" opacity="1" />
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
                  {/* Cypress tree - far left (scaled down ~45%) */}
                  <g key="park2-tree-1">
                    <rect x="2743.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <ellipse cx="2744" cy="200" rx="1.8" ry="6" fill="#2d5a3d" opacity="1" />
                    <ellipse cx="2744" cy="201" rx="1.4" ry="5" fill="#3d6a4d" opacity="1" />
                  </g>
                  {/* Oak - left side (scaled down ~45%) */}
                  <g key="park2-tree-2">
                    <rect x="2756" y="204" width="2" height="6" fill="#5a4a3a" opacity="1" />
                    <circle cx="2757" cy="201" r="4" fill="#4a7c2f" opacity="1" />
                    <circle cx="2754" cy="203" r="2.7" fill="#5a8a4a" opacity="1" />
                    <circle cx="2760" cy="203" r="2.7" fill="#5a8a4a" opacity="1" />
                    <circle cx="2757" cy="198" r="2.3" fill="#6a9a5a" opacity="1" />
                  </g>
                  {/* Pine - center left (scaled down ~45%) */}
                  <g key="park2-tree-3">
                    <rect x="2773.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <polygon points="2774,197 2770.5,207 2777.5,207" fill="#2d5a3d" opacity="1" />
                    <polygon points="2774,200 2771.5,206 2776.5,206" fill="#3d6a4d" opacity="1" />
                    <polygon points="2774,202.5 2772,205 2776,205" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Pine - center right (scaled down ~45%) */}
                  <g key="park2-tree-4">
                    <rect x="2785.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <polygon points="2786,198 2782.5,207 2789.5,207" fill="#2d5a3d" opacity="1" />
                    <polygon points="2786,200.5 2783.5,206 2788.5,206" fill="#3d6a4d" opacity="1" />
                    <polygon points="2786,203 2784,205 2788,205" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Oak - right side (scaled down ~45%) */}
                  <g key="park2-tree-5">
                    <rect x="2802" y="204" width="2" height="6" fill="#5a4a3a" opacity="1" />
                    <circle cx="2803" cy="201" r="4" fill="#4a7c2f" opacity="1" />
                    <circle cx="2800" cy="203" r="2.7" fill="#5a8a4a" opacity="1" />
                    <circle cx="2806" cy="203" r="2.7" fill="#5a8a4a" opacity="1" />
                    <circle cx="2803" cy="198" r="2.3" fill="#6a9a5a" opacity="1" />
                  </g>

                  {/* Garden statue/sculpture on pedestal centered at x=2779 */}
                  <g>
                    {/* Stone pedestal - tiered base */}
                    <rect x="2773" y="207" width="12" height="3" fill="#c8c0b8" opacity="1" rx="0.5" />
                    <rect x="2775" y="204" width="8" height="3" fill="#d0c8c0" opacity="1" rx="0.5" />
                    <rect x="2776" y="201" width="6" height="3" fill="#d8d0c8" opacity="1" rx="0.5" />
                    {/* Pedestal cap molding */}
                    <rect x="2774.5" y="206.5" width="9" height="0.8" fill="#b8b0a8" opacity="1" />
                    {/* Sculpture - abstract figure (person with outstretched arms) */}
                    <rect x="2778" y="194" width="2" height="7" fill="#a0a8a0" opacity="1" rx="0.5" />
                    {/* Head */}
                    <circle cx="2779" cy="192.5" r="2" fill="#a8b0a8" opacity="1" />
                    {/* Arms outstretched */}
                    <line x1="2775" y1="196" x2="2783" y2="196" stroke="#a0a8a0" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Dove in left hand */}
                    <ellipse cx="2774.5" cy="195" rx="1.5" ry="0.8" fill="#e0e0e0" opacity="1" />
                    <path d="M 2773.5,195 L 2772,194" stroke="#e0e0e0" strokeWidth="0.5" />
                    {/* Base platform */}
                    <ellipse cx="2779" cy="210" rx="10" ry="3.5" fill="#b8b0a8" opacity="1" />
                    {/* Decorative ring around pedestal base */}
                    <ellipse cx="2779" cy="209" rx="7" ry="2" fill="none" stroke="#a0a098" strokeWidth="0.5" opacity="0.6" />
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
                  {/* Maple tree - left side (scaled down ~45%) */}
                  <g key="park3-tree-1">
                    <rect x="3370" y="205" width="1.5" height="5" fill="#6b5a45" opacity="1" />
                    <ellipse cx="3370.5" cy="202.5" rx="3.5" ry="3.3" fill="#5a9a4a" opacity="1" />
                    <ellipse cx="3368" cy="204" r="2" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="3373" cy="204" r="2" fill="#6aaa5a" opacity="1" />
                    <ellipse cx="3370.5" cy="200" rx="2" ry="1.8" fill="#7aba6a" opacity="1" />
                  </g>
                  {/* Pine - left-center (scaled down ~45%) */}
                  <g key="park3-tree-2">
                    <rect x="3387.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <polygon points="3388,197.5 3384.5,207 3391.5,207" fill="#2d5a3d" opacity="1" />
                    <polygon points="3388,200 3385.5,206 3390.5,206" fill="#3d6a4d" opacity="1" />
                    <polygon points="3388,202.5 3386,205 3390,205" fill="#2d5a3d" opacity="1" />
                  </g>
                  {/* Cypress - center (scaled down ~45%) */}
                  <g key="park3-tree-3">
                    <rect x="3398.5" y="206" width="1" height="4" fill="#5a4a3a" opacity="1" />
                    <ellipse cx="3399" cy="201" rx="1.4" ry="5.5" fill="#2d5a3d" opacity="1" />
                    <ellipse cx="3399" cy="201.5" rx="1.1" ry="4.5" fill="#3d6a4d" opacity="1" />
                  </g>
                  {/* Oak tree - right side (scaled down ~45%) */}
                  <g key="park3-tree-4">
                    <rect x="3422" y="205" width="1.5" height="5" fill="#5a4a3a" opacity="1" />
                    <circle cx="3422.5" cy="202.5" r="3.5" fill="#4a7c2f" opacity="1" />
                    <circle cx="3420" cy="204" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="3425" cy="204" r="2.3" fill="#5a8a4a" opacity="1" />
                    <circle cx="3422.5" cy="200" r="2" fill="#6a9a5a" opacity="1" />
                  </g>

                  {/* Decorative garden bed with flower rings centered at x=3399 */}
                  <g>
                    {/* Outer ring - stone border */}
                    <ellipse cx="3399" cy="208" rx="12" ry="5" fill="#a8a098" opacity="1" />
                    {/* Garden soil */}
                    <ellipse cx="3399" cy="208" rx="11" ry="4.5" fill="#6a5a4a" opacity="1" />
                    {/* Outer flower ring */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, fi) => {
                      const rad = angle * Math.PI / 180
                      const fx = 3399 + Math.cos(rad) * 9
                      const fy = 208 + Math.sin(rad) * 3.5
                      const colors = ['#ff69b4', '#ffd700', '#9b59b6', '#ff6347', '#4a9adb', '#ff69b4', '#ffd700', '#9b59b6', '#ff6347', '#4a9adb', '#ff69b4', '#ffd700']
                      return <circle key={`outer-flower-${fi}`} cx={fx} cy={fy} r="1.2" fill={colors[fi]} opacity="1" />
                    })}
                    {/* Middle ring - stone border */}
                    <ellipse cx="3399" cy="208" rx="6" ry="2.5" fill="#b0a8a0" opacity="1" />
                    {/* Inner garden soil */}
                    <ellipse cx="3399" cy="208" rx="5" ry="2" fill="#5a4a3a" opacity="1" />
                    {/* Inner flower ring */}
                    {[0, 60, 120, 180, 240, 300].map((angle, fi) => {
                      const rad = angle * Math.PI / 180
                      const fx = 3399 + Math.cos(rad) * 4
                      const fy = 208 + Math.sin(rad) * 1.5
                      const colors = ['#cc99ff', '#ff9966', '#66cc99', '#ff69b4', '#ffd700', '#cc99ff']
                      return <circle key={`inner-flower-${fi}`} cx={fx} cy={fy} r="1" fill={colors[fi]} opacity="1" />
                    })}
                    {/* Center ornamental plant */}
                    <circle cx="3399" cy="207" r="1.5" fill="#4a8a4a" opacity="1" />
                    <circle cx="3399" cy="206" r="1" fill="#5a9a5a" opacity="1" />
                    {/* Greenery between flowers */}
                    <ellipse cx="3394" cy="208" rx="1.5" ry="0.8" fill="#4a7a4a" opacity="0.7" />
                    <ellipse cx="3404" cy="208" rx="1.5" ry="0.8" fill="#4a7a4a" opacity="0.7" />
                    <ellipse cx="3399" cy="205.5" rx="1" ry="0.5" fill="#5a8a5a" opacity="0.6" />
                    <ellipse cx="3399" cy="210.5" rx="1" ry="0.5" fill="#5a8a5a" opacity="0.6" />
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
                  {/* Roman arch support between buildings */}
                  {/* Thin stone deck/entablature */}
                  <rect x="2266" y="137" width="74" height="6" fill="#d8d0c8" opacity="1" />
                  <rect x="2265" y="136" width="76" height="1.5" fill="#e8e0d8" opacity="1" />
                  {/* Dentil molding along deck edge */}
                  {Array.from({length: 12}).map((_, d) => (
                    <rect key={`base-dentil1-${d}`} x={2270 + d * 5.5} y="141.5" width="3" height="1.5" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Impost blocks at arch springers */}
                  <rect x="2264" y="143" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="2264" y="143" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  <rect x="2334" y="143" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="2334" y="143" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  {/* Roman arch ring */}
                  <path d="M 2268,143 Q 2303,180 2338,143 L 2334,143 Q 2303,170 2272,143 Z" fill="#d8d0c8" opacity="1" />
                  <path d="M 2268,143 Q 2303,180 2338,143" stroke="#c0b8b0" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 2272,143 Q 2303,170 2334,143" stroke="#b8b0a8" strokeWidth="0.6" fill="none" opacity="0.5" />
                  {/* Arch drop shadow */}
                  <path d="M 2274,144 Q 2303,173 2332,144" stroke="#000000" strokeWidth="1.8" fill="none" opacity="0.06" />
                  {/* Springer rosettes */}
                  <circle cx="2270" cy="145" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  <circle cx="2336" cy="145" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  {/* Voussoir joints */}
                  <line x1="2280" y1="143" x2="2281" y2="151" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2289" y1="143" x2="2290" y2="156" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2298" y1="143" x2="2298" y2="159" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2308" y1="143" x2="2308" y2="159" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2317" y1="143" x2="2316" y2="156" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2326" y1="143" x2="2325" y2="151" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  {/* Decorative keystone */}
                  <path d="M 2300,159 L 2299,143 L 2307,143 L 2306,159 Z" fill="#e8e0d8" opacity="1" />
                  <circle cx="2303" cy="155" r="1.2" fill="#d0c8c0" opacity="0.8" />
                  {/* Balustrade on deck */}
                  <rect x="2270" y="137.5" width="66" height="0.6" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 14}).map((_, b) => (
                    <rect key={`baluster1-${b}`} x={2272 + b * 4.5} y="137.5" width="1.2" height="5.5" fill="#e8e0d8" opacity="0.7" />
                  ))}

                  {/* Indoor garden - rendered before columns so trees appear behind pillars */}
                  <rect x="2280" y="134" width="1.5" height="4" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2281" cy="131.5" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2279" cy="133" r="1.7" fill="#5a8a5a" opacity="0.7" />
                  <rect x="2324" y="134" width="1.5" height="4" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2325" cy="131.5" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2327" cy="133" r="1.7" fill="#5a8a5a" opacity="0.7" />
                  <rect x="2302" y="133" width="2" height="5" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2303" cy="129.5" r="3.5" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="2300" cy="131.5" r="2.2" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2306" cy="131.5" r="2.2" fill="#4a7c2f" opacity="0.7" />
                  <ellipse cx="2281" cy="137" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="2325" cy="137" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <circle cx="2281" cy="136" r="0.8" fill="#ff9999" opacity="0.7" />
                  <circle cx="2303" cy="135" r="1" fill="#ffcc66" opacity="0.7" />
                  <circle cx="2325" cy="136" r="0.8" fill="#cc99ff" opacity="0.7" />
                  <rect x="2296" y="136.5" width="14" height="0.8" fill="#d0c8c0" opacity="0.4" rx="0.3" />
                  <rect x="2278" y="136.8" width="6" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />
                  <rect x="2322" y="136.8" width="6" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />

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

                  {/* Glass dome - layered tinted fill for depth */}
                  <path d="M 2273,117 Q 2273,85 2303,80 Q 2333,85 2333,117"
                        fill="#c8e0f0" opacity="0.2" />
                  <path d="M 2275,117 Q 2285,105 2303,100 Q 2321,105 2331,117"
                        fill="#a0c8e0" opacity="0.12" />
                  <path d="M 2288,108 Q 2293,92 2303,86 Q 2313,92 2318,108"
                        fill="#d8ecf8" opacity="0.1" />
                  {/* Main dome frame */}
                  <path d="M 2273,117 Q 2273,85 2303,80 Q 2333,85 2333,117"
                        stroke="#88b0c8" strokeWidth="1.5" fill="none" opacity="0.8" />
                  {/* Meridian ribs */}
                  <path d="M 2278,116 Q 2280,91 2303,84 Q 2326,91 2328,116" stroke="#88b0c8" strokeWidth="0.7" fill="none" opacity="0.55" />
                  <path d="M 2285,114 Q 2288,95 2303,88 Q 2318,95 2321,114" stroke="#88b0c8" strokeWidth="0.6" fill="none" opacity="0.45" />
                  <path d="M 2294,111 Q 2297,99 2303,95 Q 2309,99 2312,111" stroke="#88b0c8" strokeWidth="0.45" fill="none" opacity="0.35" />
                  {/* Vertical mullions */}
                  <line x1="2279" y1="117" x2="2281" y2="89" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2287" y1="117" x2="2289" y2="93" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2295" y1="117" x2="2296" y2="87" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2303" y1="117" x2="2303" y2="80" stroke="#88b0c8" strokeWidth="0.5" opacity="0.55" />
                  <line x1="2311" y1="117" x2="2310" y2="87" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2319" y1="117" x2="2317" y2="93" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2327" y1="117" x2="2325" y2="89" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  {/* Horizontal ring mullions */}
                  <path d="M 2276,109 Q 2290,106 2303,104 Q 2316,106 2330,109" stroke="#88b0c8" strokeWidth="0.4" fill="none" opacity="0.4" />
                  <path d="M 2282,99 Q 2293,96 2303,94 Q 2313,96 2324,99" stroke="#88b0c8" strokeWidth="0.35" fill="none" opacity="0.35" />
                  {/* Glass reflections - elegant highlights */}
                  <path d="M 2279,108 Q 2287,95 2295,87" stroke="#ffffff" strokeWidth="0.7" fill="none" opacity="0.4" />
                  <path d="M 2281,113 Q 2286,103 2292,95" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.25" />
                  <path d="M 2309,99 Q 2317,91 2324,86" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.2" />
                  <path d="M 2285,102 Q 2290,97 2296,92" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.18" />

                  {/* Decorative finial at apex */}
                  <ellipse cx="2303" cy="79.5" rx="3" ry="2" fill="#e8e0d8" opacity="1" />
                  <rect x="2301.5" y="75.5" width="3" height="4.5" rx="0.5" fill="#d8d0c8" opacity="1" />
                  <circle cx="2303" cy="74.5" r="1.3" fill="#e8e0d8" opacity="1" />
                  <line x1="2303" y1="72.5" x2="2303" y2="73.5" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <circle cx="2303" cy="72" r="0.7" fill="#f0e8e0" opacity="1" />

                </g>

                {/* Bridge 2 over Park 2 - Roman columns + fully enclosed glass dome */}
                <g>
                  {/* Roman arch support between buildings */}
                  {/* Thin stone deck/entablature */}
                  <rect x="2734" y="142" width="90" height="6" fill="#d8d0c8" opacity="1" />
                  <rect x="2733" y="141" width="92" height="1.5" fill="#e8e0d8" opacity="1" />
                  {/* Dentil molding along deck edge */}
                  {Array.from({length: 15}).map((_, d) => (
                    <rect key={`base-dentil2-${d}`} x={2738 + d * 5.5} y="146.5" width="3" height="1.5" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Impost blocks at arch springers */}
                  <rect x="2732" y="148" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="2732" y="148" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  <rect x="2818" y="148" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="2818" y="148" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  {/* Roman arch ring */}
                  <path d="M 2736,148 Q 2779,188 2822,148 L 2818,148 Q 2779,178 2740,148 Z" fill="#d8d0c8" opacity="1" />
                  <path d="M 2736,148 Q 2779,188 2822,148" stroke="#c0b8b0" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 2740,148 Q 2779,178 2818,148" stroke="#b8b0a8" strokeWidth="0.6" fill="none" opacity="0.5" />
                  {/* Arch drop shadow */}
                  <path d="M 2742,149 Q 2779,180 2816,149" stroke="#000000" strokeWidth="1.8" fill="none" opacity="0.06" />
                  {/* Springer rosettes */}
                  <circle cx="2738" cy="150" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  <circle cx="2820" cy="150" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  {/* Voussoir joints */}
                  <line x1="2749" y1="148" x2="2750" y2="156" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2762" y1="148" x2="2763" y2="162" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2775" y1="148" x2="2775" y2="166" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2783" y1="148" x2="2783" y2="166" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2796" y1="148" x2="2795" y2="162" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="2809" y1="148" x2="2808" y2="156" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  {/* Decorative keystone */}
                  <path d="M 2776,166 L 2775,148 L 2783,148 L 2782,166 Z" fill="#e8e0d8" opacity="1" />
                  <circle cx="2779" cy="162" r="1.3" fill="#d0c8c0" opacity="0.8" />
                  {/* Balustrade on deck */}
                  <rect x="2738" y="142.5" width="82" height="0.6" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 17}).map((_, b) => (
                    <rect key={`baluster2-${b}`} x={2740 + b * 4.7} y="142.5" width="1.2" height="5.5" fill="#e8e0d8" opacity="0.7" />
                  ))}

                  {/* Indoor garden - rendered before columns so trees appear behind pillars */}
                  <rect x="2750" y="138" width="1.5" height="4" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2751" cy="135.5" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2749" cy="137" r="1.7" fill="#5a8a5a" opacity="0.7" />
                  <rect x="2806" y="138" width="1.5" height="4" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2807" cy="135.5" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2809" cy="137" r="1.7" fill="#5a8a5a" opacity="0.7" />
                  <rect x="2778" y="137" width="2" height="5" fill="#6b5a45" opacity="0.8" />
                  <circle cx="2779" cy="133.5" r="3.8" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="2776" cy="135.5" r="2.2" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="2782" cy="135.5" r="2.2" fill="#4a7c2f" opacity="0.7" />
                  <ellipse cx="2751" cy="142" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="2807" cy="142" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <circle cx="2751" cy="140" r="0.8" fill="#cc99ff" opacity="0.7" />
                  <circle cx="2779" cy="139" r="1" fill="#ffcc66" opacity="0.7" />
                  <circle cx="2807" cy="140" r="0.8" fill="#ff9999" opacity="0.7" />
                  <rect x="2770" y="141" width="18" height="0.8" fill="#d0c8c0" opacity="0.4" rx="0.3" />
                  <rect x="2748" y="141.3" width="8" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />
                  <rect x="2803" y="141.3" width="8" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />

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

                  {/* Glass dome - layered tinted fill for depth */}
                  <path d="M 2741,122 Q 2741,88 2779,82 Q 2817,88 2817,122"
                        fill="#c8e0f0" opacity="0.2" />
                  <path d="M 2743,122 Q 2755,108 2779,103 Q 2803,108 2815,122"
                        fill="#a0c8e0" opacity="0.12" />
                  <path d="M 2763,112 Q 2769,96 2779,89 Q 2789,96 2795,112"
                        fill="#d8ecf8" opacity="0.1" />
                  {/* Main dome frame */}
                  <path d="M 2741,122 Q 2741,88 2779,82 Q 2817,88 2817,122"
                        stroke="#88b0c8" strokeWidth="1.5" fill="none" opacity="0.8" />
                  {/* Meridian ribs */}
                  <path d="M 2747,121 Q 2750,94 2779,86 Q 2808,94 2811,121" stroke="#88b0c8" strokeWidth="0.7" fill="none" opacity="0.55" />
                  <path d="M 2755,119 Q 2760,98 2779,90 Q 2798,98 2803,119" stroke="#88b0c8" strokeWidth="0.6" fill="none" opacity="0.45" />
                  <path d="M 2766,116 Q 2770,101 2779,96 Q 2788,101 2792,116" stroke="#88b0c8" strokeWidth="0.45" fill="none" opacity="0.35" />
                  {/* Vertical mullions */}
                  <line x1="2749" y1="122" x2="2751" y2="92" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2758" y1="122" x2="2761" y2="96" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2769" y1="122" x2="2770" y2="89" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2779" y1="122" x2="2779" y2="82" stroke="#88b0c8" strokeWidth="0.5" opacity="0.55" />
                  <line x1="2789" y1="122" x2="2788" y2="89" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2800" y1="122" x2="2797" y2="96" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="2809" y1="122" x2="2807" y2="92" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  {/* Horizontal ring mullions */}
                  <path d="M 2746,112 Q 2763,109 2779,107 Q 2795,109 2812,112" stroke="#88b0c8" strokeWidth="0.4" fill="none" opacity="0.4" />
                  <path d="M 2754,101 Q 2767,98 2779,96 Q 2791,98 2804,101" stroke="#88b0c8" strokeWidth="0.35" fill="none" opacity="0.35" />
                  {/* Glass reflections */}
                  <path d="M 2749,112 Q 2760,97 2770,89" stroke="#ffffff" strokeWidth="0.7" fill="none" opacity="0.4" />
                  <path d="M 2751,117 Q 2758,106 2766,98" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.25" />
                  <path d="M 2786,101 Q 2798,93 2808,88" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.2" />
                  <path d="M 2757,104 Q 2764,99 2771,94" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.18" />

                  {/* Decorative finial at apex */}
                  <ellipse cx="2779" cy="81.5" rx="3" ry="2" fill="#e8e0d8" opacity="1" />
                  <rect x="2777.5" y="77.5" width="3" height="4.5" rx="0.5" fill="#d8d0c8" opacity="1" />
                  <circle cx="2779" cy="76.5" r="1.3" fill="#e8e0d8" opacity="1" />
                  <line x1="2779" y1="74.5" x2="2779" y2="75.5" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <circle cx="2779" cy="74" r="0.7" fill="#f0e8e0" opacity="1" />

                </g>

                {/* Bridge 3 over Park 3 - Roman columns + fully enclosed glass dome */}
                <g>
                  {/* Roman arch support between buildings */}
                  {/* Thin stone deck/entablature */}
                  <rect x="3360" y="140" width="82" height="6" fill="#d8d0c8" opacity="1" />
                  <rect x="3359" y="139" width="84" height="1.5" fill="#e8e0d8" opacity="1" />
                  {/* Dentil molding along deck edge */}
                  {Array.from({length: 13}).map((_, d) => (
                    <rect key={`base-dentil3-${d}`} x={3364 + d * 5.5} y="144.5" width="3" height="1.5" fill="#b8b0a8" opacity="1" />
                  ))}
                  {/* Impost blocks at arch springers */}
                  <rect x="3358" y="146" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="3358" y="146" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  <rect x="3436" y="146" width="8" height="5" fill="#c8c0b8" opacity="1" />
                  <rect x="3436" y="146" width="8" height="1.5" fill="#d8d0c8" opacity="1" />
                  {/* Roman arch ring */}
                  <path d="M 3362,146 Q 3401,184 3440,146 L 3436,146 Q 3401,174 3366,146 Z" fill="#d8d0c8" opacity="1" />
                  <path d="M 3362,146 Q 3401,184 3440,146" stroke="#c0b8b0" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 3366,146 Q 3401,174 3436,146" stroke="#b8b0a8" strokeWidth="0.6" fill="none" opacity="0.5" />
                  {/* Arch drop shadow */}
                  <path d="M 3368,147 Q 3401,176 3434,147" stroke="#000000" strokeWidth="1.8" fill="none" opacity="0.06" />
                  {/* Springer rosettes */}
                  <circle cx="3364" cy="148" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  <circle cx="3438" cy="148" r="1.2" fill="#d8d0c8" opacity="0.7" />
                  {/* Voussoir joints */}
                  <line x1="3374" y1="146" x2="3375" y2="154" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="3386" y1="146" x2="3387" y2="160" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="3397" y1="146" x2="3397" y2="163" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="3405" y1="146" x2="3405" y2="163" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="3416" y1="146" x2="3415" y2="160" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  <line x1="3428" y1="146" x2="3427" y2="154" stroke="#b8b0a8" strokeWidth="0.4" opacity="0.5" />
                  {/* Decorative keystone */}
                  <path d="M 3398,163 L 3397,146 L 3405,146 L 3404,163 Z" fill="#e8e0d8" opacity="1" />
                  <circle cx="3401" cy="159" r="1.3" fill="#d0c8c0" opacity="0.8" />
                  {/* Balustrade on deck */}
                  <rect x="3364" y="140.5" width="74" height="0.6" fill="#f0e8e0" opacity="1" />
                  {Array.from({length: 15}).map((_, b) => (
                    <rect key={`baluster3-${b}`} x={3366 + b * 4.7} y="140.5" width="1.2" height="5.5" fill="#e8e0d8" opacity="0.7" />
                  ))}

                  {/* Indoor garden - rendered before columns so trees appear behind pillars */}
                  <rect x="3376" y="135" width="1.5" height="4.5" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3377" cy="132" r="3" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3375" cy="133.5" r="1.8" fill="#5a8a5a" opacity="0.7" />
                  <rect x="3422" y="135" width="1.5" height="4.5" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3423" cy="132" r="3" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3425" cy="133.5" r="1.8" fill="#5a8a5a" opacity="0.7" />
                  <rect x="3399" y="134" width="2" height="6" fill="#6b5a45" opacity="0.8" />
                  <circle cx="3400" cy="130" r="4" fill="#5a8a5a" opacity="0.7" />
                  <circle cx="3396.5" cy="132" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3403.5" cy="132" r="2.5" fill="#4a7c2f" opacity="0.7" />
                  <circle cx="3400" cy="127" r="2" fill="#6a9a6a" opacity="0.7" />
                  <ellipse cx="3377" cy="140" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <ellipse cx="3423" cy="140" rx="2.2" ry="1.3" fill="#5a9a5a" opacity="0.6" />
                  <circle cx="3377" cy="139" r="0.8" fill="#ff9999" opacity="0.7" />
                  <circle cx="3400" cy="137" r="1" fill="#66ccff" opacity="0.7" />
                  <circle cx="3423" cy="139" r="0.8" fill="#cc99ff" opacity="0.7" />
                  <rect x="3393" y="139.5" width="16" height="0.8" fill="#d0c8c0" opacity="0.4" rx="0.3" />
                  <rect x="3374" y="139.8" width="7" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />
                  <rect x="3420" y="139.8" width="7" height="0.6" fill="#d0c8c0" opacity="0.3" rx="0.2" />

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

                  {/* Glass dome - layered tinted fill for depth */}
                  <path d="M 3367,119 Q 3367,80 3401,75 Q 3435,80 3435,119"
                        fill="#c8e0f0" opacity="0.2" />
                  <path d="M 3369,119 Q 3380,106 3401,100 Q 3422,106 3433,119"
                        fill="#a0c8e0" opacity="0.12" />
                  <path d="M 3386,111 Q 3392,94 3401,87 Q 3410,94 3416,111"
                        fill="#d8ecf8" opacity="0.1" />
                  {/* Main dome frame */}
                  <path d="M 3367,119 Q 3367,80 3401,75 Q 3435,80 3435,119"
                        stroke="#88b0c8" strokeWidth="1.5" fill="none" opacity="0.8" />
                  {/* Meridian ribs */}
                  <path d="M 3373,118 Q 3376,89 3401,81 Q 3426,89 3429,118" stroke="#88b0c8" strokeWidth="0.7" fill="none" opacity="0.55" />
                  <path d="M 3380,116 Q 3386,93 3401,85 Q 3416,93 3422,116" stroke="#88b0c8" strokeWidth="0.6" fill="none" opacity="0.45" />
                  <path d="M 3391,113 Q 3395,97 3401,92 Q 3407,97 3411,113" stroke="#88b0c8" strokeWidth="0.45" fill="none" opacity="0.35" />
                  {/* Vertical mullions */}
                  <line x1="3375" y1="119" x2="3377" y2="87" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="3384" y1="119" x2="3387" y2="91" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="3393" y1="119" x2="3394" y2="84" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="3401" y1="119" x2="3401" y2="75" stroke="#88b0c8" strokeWidth="0.5" opacity="0.55" />
                  <line x1="3409" y1="119" x2="3408" y2="84" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="3418" y1="119" x2="3415" y2="91" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  <line x1="3427" y1="119" x2="3425" y2="87" stroke="#88b0c8" strokeWidth="0.4" opacity="0.45" />
                  {/* Horizontal ring mullions */}
                  <path d="M 3372,107 Q 3387,104 3401,102 Q 3415,104 3430,107" stroke="#88b0c8" strokeWidth="0.4" fill="none" opacity="0.4" />
                  <path d="M 3379,96 Q 3391,93 3401,91 Q 3411,93 3423,96" stroke="#88b0c8" strokeWidth="0.35" fill="none" opacity="0.35" />
                  {/* Glass reflections */}
                  <path d="M 3375,109 Q 3386,95 3397,85" stroke="#ffffff" strokeWidth="0.7" fill="none" opacity="0.4" />
                  <path d="M 3377,114 Q 3384,103 3391,95" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.25" />
                  <path d="M 3407,98 Q 3418,90 3427,84" stroke="#ffffff" strokeWidth="0.45" fill="none" opacity="0.2" />
                  <path d="M 3383,101 Q 3390,96 3397,91" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.18" />

                  {/* Decorative finial at apex */}
                  <ellipse cx="3401" cy="74.5" rx="3" ry="2" fill="#e8e0d8" opacity="1" />
                  <rect x="3399.5" y="70.5" width="3" height="4.5" rx="0.5" fill="#d8d0c8" opacity="1" />
                  <circle cx="3401" cy="69.5" r="1.3" fill="#e8e0d8" opacity="1" />
                  <line x1="3401" y1="67.5" x2="3401" y2="68.5" stroke="#d8d0c8" strokeWidth="0.8" opacity="0.8" />
                  <circle cx="3401" cy="67" r="0.7" fill="#f0e8e0" opacity="1" />

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
                    // Tall tree (scaled to ~28%)
                    return (
                      <g key={`plant-${i}`}>
                        <rect x={x} y={baseY - 3.5} width="0.7" height="3.5" fill="#6b5a45" opacity="1" />
                        <circle cx={x+0.4} cy={baseY - 3.5} r="1.4" fill="#4a7c2f" opacity="1" />
                        <circle cx={x-0.5} cy={baseY - 2.8} r="1.1" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+1.3} cy={baseY - 2.8} r="1.1" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+0.4} cy={baseY - 4.5} r="0.9" fill="#6a9a6a" opacity="1" />
                      </g>
                    );
                  } else if (plantType === 1) {
                    // Medium tree (scaled to ~28%)
                    return (
                      <g key={`plant-${i}`}>
                        <rect x={x} y={baseY - 2.5} width="0.6" height="2.5" fill="#6b5a45" opacity="1" />
                        <circle cx={x+0.3} cy={baseY - 2.5} r="1.1" fill="#4a7c2f" opacity="1" />
                        <circle cx={x-0.4} cy={baseY - 2} r="0.9" fill="#5a8a5a" opacity="1" />
                        <circle cx={x+1} cy={baseY - 2} r="0.9" fill="#5a8a5a" opacity="1" />
                      </g>
                    );
                  } else if (plantType === 2) {
                    // Round bush (scaled to ~28%)
                    return (
                      <g key={`plant-${i}`}>
                        <circle cx={x+0.3} cy={baseY - 0.6} r="1.1" fill="#3a7a3a" opacity="1" />
                        <circle cx={x-0.3} cy={baseY - 0.3} r="0.9" fill="#4a8a4a" opacity="1" />
                        <circle cx={x+0.9} cy={baseY - 0.3} r="0.9" fill="#4a8a4a" opacity="1" />
                        <circle cx={x+0.3} cy={baseY - 1.1} r="0.7" fill="#5a9a5a" opacity="1" />
                      </g>
                    );
                  } else {
                    // Small bush/shrub (scaled to ~28%)
                    return (
                      <g key={`plant-${i}`}>
                        <ellipse cx={x+0.3} cy={baseY - 0.3} rx="0.9" ry="0.6" fill="#3a6a3a" opacity="1" />
                        <circle cx={x-0.1} cy={baseY - 0.6} r="0.6" fill="#4a7a4a" opacity="1" />
                        <circle cx={x+0.7} cy={baseY - 0.6} r="0.6" fill="#4a7a4a" opacity="1" />
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

              {/* Street furniture: Benches - positioned in gaps between buildings */}
              <g opacity="1">
                {/* Gap positions (building edges): 2065-2074, 2194-2204, 2458-2468, 2602-2612, 2880-2890, 3016-3026, 3148-3158, 3292-3302, 3570-3580, 3722-3732 */}
                {[2066, 2195, 2459, 2603, 2881, 3017, 3149, 3293, 3571, 3723].map((x, i) => (
                  <g key={`bench-${i}`}>
                    {/* Bench seat */}
                    <rect x={x} y="213" width="8" height="1.5" rx="0.3" fill="#8b7355" opacity="1" />
                    {/* Bench back */}
                    <rect x={x} y="210" width="8" height="3" rx="0.3" fill="#8b7355" opacity="1" />
                    {/* Bench legs */}
                    <rect x={x+1} y="214.5" width="0.8" height="2.5" fill="#6b5a45" opacity="1" />
                    <rect x={x+6.2} y="214.5" width="0.8" height="2.5" fill="#6b5a45" opacity="1" />
                    {/* Arm rests */}
                    <rect x={x} y="210" width="0.6" height="4.5" fill="#6b5a45" opacity="1" />
                    <rect x={x+7.4} y="210" width="0.6" height="4.5" fill="#6b5a45" opacity="1" />
                  </g>
                ))}
              </g>

              {/* Planters with flowers and greenery - positioned in gaps between buildings */}
              <g opacity="1">
                {/* Alternate gap positions: 2132-2142, 2400-2410, 2536-2546, 2672-2682, 2942-2952, 3076-3086, 3214-3224, 3502-3512, 3650-3660 */}
                {[2133, 2401, 2537, 2673, 2943, 3077, 3215, 3503, 3651].map((x, i) => {
                  const flowerData = [
                    {dx: 1.5, color: '#ff69b4'}, {dx: 3.5, color: '#ffd700'},
                    {dx: 5.5, color: '#9b59b6'}, {dx: 7.5, color: '#ff6347'}
                  ];
                  return (
                  <g key={`planter-${i}`}>
                    {/* Planter box */}
                    <rect x={x} y="212" width="9" height="5.5" rx="0.5" fill="#8b7355" opacity="1" />
                    {/* Soil visible at top */}
                    <rect x={x+0.5} y="211.5" width="8" height="1.5" rx="0.3" fill="#5a4a3a" opacity="0.8" />
                    {/* Petal flowers with stems */}
                    {flowerData.map((f, fi) => (
                      <g key={`planter-flower-${i}-${fi}`}>
                        {/* Stem */}
                        <rect x={x + f.dx - 0.1} y="209.5" width="0.2" height="2.5" fill="#4a7a3a" opacity="0.8" />
                        {/* Petals */}
                        {[0, 72, 144, 216, 288].map((angle, pi) => (
                          <ellipse key={pi}
                            cx={x + f.dx + Math.cos(angle * Math.PI / 180) * 0.6}
                            cy={209 + Math.sin(angle * Math.PI / 180) * 0.6}
                            rx="0.4" ry="0.25" fill={f.color}
                            transform={`rotate(${angle}, ${x + f.dx + Math.cos(angle * Math.PI / 180) * 0.6}, ${209 + Math.sin(angle * Math.PI / 180) * 0.6})`} />
                        ))}
                        {/* Center */}
                        <circle cx={x + f.dx} cy="209" r="0.25" fill="#ffd700" opacity="0.9" />
                      </g>
                    ))}
                    {/* Greenery leaves */}
                    <ellipse cx={x + 2.5} cy="211.5" rx="1.2" ry="0.6" fill="#4a7c2f" opacity="0.7" />
                    <ellipse cx={x + 6.5} cy="211.5" rx="1.2" ry="0.6" fill="#5a8a3a" opacity="0.7" />
                  </g>
                  );
                })}
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

              {/* Cyclists riding bikes - animated with bobbing + wheel spin */}
              <g opacity="1">
                {[2120, 2320, 2520, 2720, 2920, 3120, 3320, 3520, 3720].map((x, ci) => (
                  <g key={`cyclist-${ci}`} style={{animation: 'cyclistBob 1.2s ease-in-out infinite', animationDelay: `${ci * 0.15}s`}}>
                    {/* Bike frame */}
                    <path d={`M ${x},214 L ${x+4},214 L ${x+2},210 Z`} stroke="#4a7c2f" strokeWidth="1" fill="none" opacity="1" />
                    {/* Back wheel - spinning */}
                    <g style={{animation: 'wheelSpin 0.8s linear infinite', animationDelay: `${ci * 0.1}s`, transformOrigin: `${x}px 216px`}}>
                      <circle cx={x} cy="216" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="1" />
                      {/* Spoke */}
                      <line x1={x} y1="214.2" x2={x} y2="217.8" stroke="#4a4a4a" strokeWidth="0.3" />
                      <line x1={x - 1.8} y1="216" x2={x + 1.8} y2="216" stroke="#4a4a4a" strokeWidth="0.3" />
                    </g>
                    {/* Front wheel - spinning */}
                    <g style={{animation: 'wheelSpin 0.8s linear infinite', animationDelay: `${ci * 0.1 + 0.05}s`, transformOrigin: `${x+4}px 216px`}}>
                      <circle cx={x+4} cy="216" r="2" fill="none" stroke="#2f2f2f" strokeWidth="0.8" opacity="1" />
                      {/* Spoke */}
                      <line x1={x+4} y1="214.2" x2={x+4} y2="217.8" stroke="#4a4a4a" strokeWidth="0.3" />
                      <line x1={x + 2.2} y1="216" x2={x + 5.8} y2="216" stroke="#4a4a4a" strokeWidth="0.3" />
                    </g>
                    {/* Cyclist body */}
                    <ellipse cx={x+2} cy="211" rx="1.5" ry="2" fill={ci % 2 === 0 ? "#5a8a5a" : "#7a6a5a"} opacity="1" />
                    {/* Cyclist head */}
                    <circle cx={x+2} cy="208" r="1.2" fill="#d4a574" opacity="1" />
                    {/* Helmet */}
                    <ellipse cx={x+2} cy="207.5" rx="1.4" ry="1" fill={ci % 2 === 0 ? "#4a7c2f" : "#c73e3e"} opacity="1" />
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
              <path d="M 4709,203 Q 4730,206 4750,204 Q 4770,203 4780,204" stroke="#b89a6a" strokeWidth="2" fill="none" opacity="0.5" />

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

              {/* Wildflower patches - actual petal flowers */}
              <g opacity="0.9">
                {[3850, 3853, 3857, 3860, 3852, 3858].map((fx, fi) => {
                  const cy = 213 + (fi % 3) * 1.5;
                  const color = ['#ff69b4', '#ffd700', '#9370db', '#ff6347', '#ffd700', '#ff69b4'][fi];
                  return (
                    <g key={`flower-d-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
                {[4300, 4303, 4307, 4310, 4302, 4308].map((fx, fi) => {
                  const cy = 212 + (fi % 3) * 1.5;
                  const color = ['#ffd700', '#ff69b4', '#ff6347', '#9370db', '#ff69b4', '#ffd700'][fi];
                  return (
                    <g key={`flower-e-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
                {[4600, 4603, 4607, 4610, 4602, 4608].map((fx, fi) => {
                  const cy = 213 + (fi % 3) * 1.5;
                  const color = ['#9370db', '#ffd700', '#ff69b4', '#ffd700', '#ff6347', '#9370db'][fi];
                  return (
                    <g key={`flower-f-${fi}`}>
                      <rect x={fx - 0.15} y={cy} width="0.3" height="1.5" fill="#4a7a3a" opacity="0.7" />
                      {[0, 72, 144, 216, 288].map((angle, pi) => (
                        <ellipse key={pi} cx={fx + Math.cos(angle * Math.PI / 180) * 0.7} cy={cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7} rx="0.5" ry="0.3" fill={color} transform={`rotate(${angle}, ${fx + Math.cos(angle * Math.PI / 180) * 0.7}, ${cy - 0.3 + Math.sin(angle * Math.PI / 180) * 0.7})`} />
                      ))}
                      <circle cx={fx} cy={cy - 0.3} r="0.3" fill="#ffd700" opacity="0.9" />
                    </g>
                  );
                })}
              </g>

              {/* Building shadows/foundations - ground all structures */}
              <g opacity="0.3">
                <ellipse cx="3995" cy="206" rx="28" ry="3" fill="#2f3f2f" />
                <ellipse cx="4022.5" cy="206" rx="8" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4692" cy="203" rx="22" ry="2.5" fill="#2f3f2f" />
                <ellipse cx="4717.5" cy="203" rx="6" ry="2" fill="#2f3f2f" />
                <ellipse cx="4908" cy="203" rx="18" ry="2.5" fill="#2f3f2f" />
                {/* Farmhouse shadows */}
                <ellipse cx="4089" cy="206" rx="12" ry="2" fill="#2f3f2f" />
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
                {/* Foundation - stone base */}
                <rect x="3969" y="204" width="45" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="3969" y="203" width="45" height="2" fill="#7a7a6a" opacity="0.5" />
                {/* Main body */}
                <rect x="3970" y="178" width="43" height="27" fill="#c73e3e" opacity="1" />
                {/* Roof with shingle texture */}
                <path d="M 3965,178 L 3991.5,158 L 4018,178 Z" fill="#a83232" opacity="1" />
                {/* Shingle rows on roof */}
                <path d="M 3968,174 L 3991.5,161 L 4015,174" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 3970,170 L 3991.5,163 L 4013,170" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 3973,166 L 3991.5,165 L 4010,166" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.5" />
                {/* Roof ridge cap */}
                <path d="M 3989,158 L 3991.5,156 L 3994,158" fill="#7a2222" opacity="0.8" />
                {/* Roof eave overhang */}
                <path d="M 3965,178 L 4018,178" stroke="#8a2828" strokeWidth="1.5" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 3972,182 L 4012,182 M 3972,186 L 4012,186 M 3972,190 L 4012,190 M 3972,194 L 4012,194 M 3972,198 L 4012,198 M 3972,202 L 4012,202" stroke="#b03535" strokeWidth="0.3" opacity="0.5" />
                <path d="M 3972,185 L 4012,185 M 3972,192 L 4012,192 M 3972,199 L 4012,199" stroke="#a83232" strokeWidth="0.7" opacity="1" />
                {/* Barn doors - open slightly showing hay inside */}
                <rect x="3986" y="188" width="11" height="17" fill="#6d4428" opacity="1" />
                {/* Hay visible through door gap */}
                <rect x="3987" y="198" width="9" height="7" fill="#d4b874" opacity="0.6" />
                <rect x="3988" y="196" width="3" height="3" fill="#c8a860" opacity="0.4" />
                {/* Barn door cross pattern */}
                <path d="M 3991.5,193 L 3991.5,205 M 3986,198 L 3997,198" stroke="#5a3a2a" strokeWidth="1.3" opacity="1" />
                {/* Door hinges */}
                <rect x="3986" y="191" width="1.5" height="1" fill="#3a3a3a" opacity="0.7" />
                <rect x="3986" y="200" width="1.5" height="1" fill="#3a3a3a" opacity="0.7" />
                {/* Hayloft windows with frames */}
                <rect x="3974.5" y="182.5" width="7" height="8" fill="#5a3a2a" opacity="1" />
                <rect x="3975" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 3975,186.5 L 3981,186.5 M 3978,183 L 3978,190" stroke="#5a3a2a" strokeWidth="0.5" />
                <rect x="3999.5" y="182.5" width="7" height="8" fill="#5a3a2a" opacity="1" />
                <rect x="4000" y="183" width="6" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 4000,186.5 L 4006,186.5 M 4003,183 L 4003,190" stroke="#5a3a2a" strokeWidth="0.5" />
                {/* Corner boards */}
                <rect x="3970" y="178" width="2" height="27" fill="#a83232" opacity="0.8" />
                <rect x="4011" y="178" width="2" height="27" fill="#a83232" opacity="0.8" />
                {/* Weather vane on top */}
                <rect x="3990.5" y="155" width="1.5" height="7" fill="#4a4a4a" opacity="1" />
                <path d="M 3985,158 L 3991.5,155 L 3991.5,161 Z" fill="#d4af37" opacity="1" />
                <path d="M 3998,158 L 3991.5,155 L 3991.5,161 Z" fill="#d4af37" opacity="1" />
                {/* Silo next to barn - larger with detail */}
                <rect x="4017" y="170" width="11" height="35" fill="#d4d4d4" opacity="1" />
                {/* Silo vertical rivet lines */}
                <rect x="4019" y="170" width="0.3" height="35" fill="#b8b8b8" opacity="0.6" />
                <rect x="4022" y="170" width="0.3" height="35" fill="#b8b8b8" opacity="0.6" />
                <rect x="4025" y="170" width="0.3" height="35" fill="#b8b8b8" opacity="0.6" />
                <ellipse cx="4022.5" cy="170" rx="5.5" ry="2.5" fill="#b8b8b8" opacity="1" />
                {/* Silo roof - conical */}
                <path d="M 4017,170 L 4022.5,161 L 4028,170" fill="#a83232" opacity="1" />
                <path d="M 4018,168 L 4022.5,162.5 L 4027,168" stroke="#8a2828" strokeWidth="0.3" fill="none" opacity="0.5" />
                {/* Silo bands - reinforcement hoops */}
                <rect x="4016.5" y="178" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="4016.5" y="188" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                <rect x="4016.5" y="198" width="12" height="1.5" fill="#a8a8a8" opacity="1" />
                {/* Silo chute/pipe */}
                <rect x="4015" y="180" width="2.5" height="8" fill="#9a9a9a" opacity="0.8" />
                <rect x="4014.5" y="187" width="3.5" height="2" fill="#8a8a8a" opacity="0.7" />
                {/* Silo ladder */}
                <rect x="4022" y="175" width="1" height="28" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 10}).map((_, li) => (
                  <rect key={`ladder-end-${li}`} x="4020" y={176 + li * 2.7} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}


                {/* Barn 4 - Large (fully detailed) */}
                {/* Foundation - stone base */}
                <rect x="4671" y="201" width="39" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4671" y="200" width="39" height="2" fill="#7a7a6a" opacity="0.5" />
                {/* Main body */}
                <rect x="4672" y="178" width="37" height="24" fill="#c73e3e" opacity="1" />
                {/* Roof with shingle texture */}
                <path d="M 4668,178 L 4690.5,162 L 4713,178 Z" fill="#a83232" opacity="1" />
                {/* Shingle rows on roof */}
                <path d="M 4670,175 L 4690.5,164 L 4711,175" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 4672,172 L 4690.5,165.5 L 4709,172" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 4675,169 L 4690.5,167 L 4706,169" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.5" />
                {/* Roof ridge cap */}
                <path d="M 4688.5,162 L 4690.5,160 L 4692.5,162" fill="#7a2222" opacity="0.8" />
                {/* Roof eave overhang */}
                <path d="M 4668,178 L 4713,178" stroke="#8a2828" strokeWidth="1.3" opacity="1" />
                {/* Wood plank texture lines */}
                <path d="M 4674,182 L 4708,182 M 4674,186 L 4708,186 M 4674,190 L 4708,190 M 4674,194 L 4708,194 M 4674,198 L 4708,198" stroke="#b03535" strokeWidth="0.3" opacity="0.5" />
                <path d="M 4674,185 L 4708,185 M 4674,192 L 4708,192 M 4674,197 L 4708,197" stroke="#a83232" strokeWidth="0.5" opacity="1" />
                {/* Barn doors with X pattern */}
                <rect x="4684" y="187" width="9" height="15" fill="#6d4428" opacity="1" />
                {/* Hay visible through door */}
                <rect x="4685" y="196" width="7" height="6" fill="#d4b874" opacity="0.6" />
                <path d="M 4684,187 L 4693,202 M 4693,187 L 4684,202" stroke="#5a3a2a" strokeWidth="0.8" opacity="1" />
                {/* Door hinges */}
                <rect x="4684" y="190" width="1.2" height="0.8" fill="#3a3a3a" opacity="0.7" />
                <rect x="4684" y="198" width="1.2" height="0.8" fill="#3a3a3a" opacity="0.7" />
                {/* Hayloft windows with frames */}
                <rect x="4675.5" y="182.5" width="6" height="7" fill="#5a3a2a" opacity="1" />
                <rect x="4676" y="183" width="5" height="6" fill="#4a4a4a" opacity="1" />
                <path d="M 4676,186 L 4681,186 M 4678.5,183 L 4678.5,189" stroke="#5a3a2a" strokeWidth="0.4" />
                <rect x="4697.5" y="182.5" width="6" height="7" fill="#5a3a2a" opacity="1" />
                <rect x="4698" y="183" width="5" height="6" fill="#4a4a4a" opacity="1" />
                <path d="M 4698,186 L 4703,186 M 4700.5,183 L 4700.5,189" stroke="#5a3a2a" strokeWidth="0.4" />
                {/* Corner boards */}
                <rect x="4672" y="178" width="1.5" height="24" fill="#a83232" opacity="0.8" />
                <rect x="4707.5" y="178" width="1.5" height="24" fill="#a83232" opacity="0.8" />
                {/* Silo with full details */}
                <rect x="4713" y="173" width="9" height="29" fill="#d4d4d4" opacity="1" />
                {/* Silo vertical rivet lines */}
                <rect x="4715" y="173" width="0.3" height="29" fill="#b8b8b8" opacity="0.6" />
                <rect x="4717.5" y="173" width="0.3" height="29" fill="#b8b8b8" opacity="0.6" />
                <rect x="4720" y="173" width="0.3" height="29" fill="#b8b8b8" opacity="0.6" />
                <ellipse cx="4717.5" cy="173" rx="4.5" ry="2.2" fill="#b8b8b8" opacity="1" />
                {/* Silo roof - conical */}
                <path d="M 4713,173 L 4717.5,165 L 4722,173" fill="#a83232" opacity="1" />
                <path d="M 4714,171 L 4717.5,166 L 4721,171" stroke="#8a2828" strokeWidth="0.3" fill="none" opacity="0.5" />
                {/* Silo bands - reinforcement hoops */}
                <rect x="4712.5" y="180" width="10" height="1.2" fill="#a8a8a8" opacity="1" />
                <rect x="4712.5" y="190" width="10" height="1.2" fill="#a8a8a8" opacity="1" />
                <rect x="4712.5" y="197" width="10" height="1.2" fill="#a8a8a8" opacity="1" />
                {/* Silo chute/pipe */}
                <rect x="4711" y="182" width="2.2" height="6" fill="#9a9a9a" opacity="0.8" />
                <rect x="4710.5" y="187.5" width="3" height="1.5" fill="#8a8a8a" opacity="0.7" />
                {/* Silo ladder */}
                <rect x="4717" y="178" width="1" height="22" fill="#8a8a8a" opacity="1" />
                {Array.from({length: 7}).map((_, li) => (
                  <rect key={`ladder-end2-${li}`} x="4715" y={180 + li * 3} width="5" height="0.5" fill="#8a8a8a" opacity="1" />
                ))}

                {/* Barn 5 - Medium (detailed) */}
                {/* Foundation - stone base */}
                <rect x="4891" y="201" width="31" height="2" fill="#6a6a5a" opacity="0.8" />
                <rect x="4891" y="200" width="31" height="2" fill="#7a7a6a" opacity="0.5" />
                {/* Main body */}
                <rect x="4892" y="183" width="29" height="19" fill="#c73e3e" opacity="1" />
                {/* Roof with shingle texture */}
                <path d="M 4889,183 L 4906.5,170 L 4924,183 Z" fill="#a83232" opacity="1" />
                {/* Shingle rows */}
                <path d="M 4891,180 L 4906.5,172 L 4922,180" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 4893,177 L 4906.5,174 L 4920,177" stroke="#8a2828" strokeWidth="0.4" fill="none" opacity="0.5" />
                {/* Roof ridge cap */}
                <path d="M 4905,170 L 4906.5,168.5 L 4908,170" fill="#7a2222" opacity="0.8" />
                {/* Roof eave overhang */}
                <path d="M 4889,183 L 4924,183" stroke="#8a2828" strokeWidth="1" opacity="1" />
                {/* Wood plank texture */}
                <path d="M 4893,186 L 4920,186 M 4893,189 L 4920,189 M 4893,192 L 4920,192 M 4893,195 L 4920,195 M 4893,198 L 4920,198" stroke="#b03535" strokeWidth="0.3" opacity="0.5" />
                <path d="M 4893,189 L 4920,189 M 4893,194 L 4920,194" stroke="#a83232" strokeWidth="0.5" opacity="1" />
                {/* Barn door with cross pattern */}
                <rect x="4901" y="189" width="8" height="13" fill="#6d4428" opacity="1" />
                {/* Hay visible */}
                <rect x="4902" y="197" width="6" height="5" fill="#d4b874" opacity="0.5" />
                {/* Door cross */}
                <path d="M 4905,193 L 4905,202 M 4901,196 L 4909,196" stroke="#5a3a2a" strokeWidth="1" opacity="1" />
                {/* Door hinges */}
                <rect x="4901" y="192" width="1" height="0.8" fill="#3a3a3a" opacity="0.7" />
                <rect x="4901" y="199" width="1" height="0.8" fill="#3a3a3a" opacity="0.7" />
                {/* Windows with frames */}
                <rect x="4894.5" y="185.5" width="5" height="6" fill="#5a3a2a" opacity="1" />
                <rect x="4895" y="186" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <path d="M 4895,188.5 L 4899,188.5 M 4897,186 L 4897,191" stroke="#5a3a2a" strokeWidth="0.4" />
                <rect x="4913.5" y="185.5" width="5" height="6" fill="#5a3a2a" opacity="1" />
                <rect x="4914" y="186" width="4" height="5" fill="#4a4a4a" opacity="1" />
                <path d="M 4914,188.5 L 4918,188.5 M 4916,186 L 4916,191" stroke="#5a3a2a" strokeWidth="0.4" />
                {/* Corner boards */}
                <rect x="4892" y="183" width="1.5" height="19" fill="#a83232" opacity="0.8" />
                <rect x="4919.5" y="183" width="1.5" height="19" fill="#a83232" opacity="0.8" />
              </g>

              {/* ===== FENCED HORSE PASTURE - connected to left side of Barn 1 (x=3969) ===== */}
              <g>
                {/* Pasture grass - lush green patch */}
                <ellipse cx="3922" cy="208" rx="48" ry="5" fill="#8ab88a" opacity="0.5" />
                <ellipse cx="3922" cy="209" rx="42" ry="3.5" fill="#7aaa7a" opacity="0.3" />

                {/* Hay pile in corner near barn */}
                <ellipse cx="3963" cy="208" rx="5" ry="2" fill="#d4b874" opacity="0.6" />
                <ellipse cx="3963" cy="207" rx="4" ry="1.5" fill="#c8a860" opacity="0.5" />

                {/* Water trough - positioned behind fence (rendered before fence) */}
                <rect x="3895" y="207.5" width="8" height="3" rx="0.5" fill="#7a8a9a" opacity="0.9" />
                <rect x="3896" y="208" width="6" height="2" rx="0.3" fill="#5a8aaa" opacity="0.7" />
                {/* Trough legs */}
                <rect x="3897" y="210.5" width="1" height="1.5" fill="#5a6a6a" opacity="0.8" />
                <rect x="3901" y="210.5" width="1" height="1.5" fill="#5a6a6a" opacity="0.8" />

                {/* Static horses grazing/standing in pasture */}
                {/* Horse 1 - dark brown, facing right, grazing */}
                <g>
                  <rect x="3893" y="201" width="12" height="7" fill="#654321" />
                  <rect x="3901" y="201" width="4" height="7" fill="#7a5230" />
                  {/* Neck angled down (grazing) */}
                  <rect x="3905" y="204" width="2.5" height="5" fill="#654321" transform="rotate(25, 3905, 204)" />
                  {/* Head down near grass */}
                  <rect x="3907" y="208" width="4.5" height="3.5" fill="#654321" />
                  <rect x="3910.5" y="210" width="1.5" height="1.5" fill="#7a5230" />
                  <rect x="3909" y="209" width="0.8" height="0.8" fill="#2f2f2f" />
                  <rect x="3911.5" y="210.5" width="0.4" height="0.4" fill="#3a2a1a" />
                  {/* Ears */}
                  <rect x="3907.5" y="206.5" width="0.8" height="1.5" fill="#654321" />
                  <rect x="3909" y="206.5" width="0.8" height="1.5" fill="#654321" />
                  {/* Mane */}
                  <rect x="3905" y="203.5" width="1" height="4" fill="#4a3520" />
                  {/* Legs */}
                  <rect x="3894" y="207.5" width="1.3" height="4" fill="#654321" />
                  <rect x="3896" y="207.5" width="1.3" height="4" fill="#7a5230" />
                  <rect x="3901" y="207.5" width="1.3" height="4" fill="#654321" />
                  <rect x="3903" y="207.5" width="1.3" height="4" fill="#7a5230" />
                  {/* Hooves */}
                  <rect x="3894" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3896" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3901" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3903" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  {/* Tail */}
                  <rect x="3892" y="201.5" width="1.5" height="5.5" fill="#4a3520" />
                </g>

                {/* Horse 2 - chestnut, facing left, standing alert */}
                <g>
                  <rect x="3920" y="201" width="12" height="7" fill="#8b6f47" />
                  <rect x="3920" y="201" width="4" height="7" fill="#9a7a55" />
                  {/* Neck upright */}
                  <rect x="3917.5" y="197.5" width="2.5" height="4.5" fill="#8b6f47" />
                  {/* Head facing left */}
                  <rect x="3913.5" y="195.5" width="4.5" height="3.5" fill="#8b6f47" />
                  <rect x="3912" y="197" width="1.5" height="2" fill="#9a7a55" />
                  {/* Eye */}
                  <rect x="3915" y="196.5" width="0.8" height="0.8" fill="#2f2f2f" />
                  <rect x="3915.2" y="196.5" width="0.3" height="0.4" fill="#ffffff" />
                  {/* Ears */}
                  <rect x="3914.5" y="194" width="0.8" height="1.8" fill="#8b6f47" />
                  <rect x="3916" y="194" width="0.8" height="1.8" fill="#8b6f47" />
                  {/* Nostril */}
                  <rect x="3913" y="198" width="0.4" height="0.4" fill="#3a2a1a" />
                  {/* Mane */}
                  <rect x="3917" y="195.5" width="1" height="6" fill="#6a4a28" />
                  {/* Legs */}
                  <rect x="3921" y="207.5" width="1.3" height="4" fill="#8b6f47" />
                  <rect x="3923" y="207.5" width="1.3" height="4" fill="#9a7a55" />
                  <rect x="3928" y="207.5" width="1.3" height="4" fill="#8b6f47" />
                  <rect x="3930" y="207.5" width="1.3" height="4" fill="#9a7a55" />
                  {/* Hooves */}
                  <rect x="3921" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3923" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3928" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3930" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  {/* Tail */}
                  <rect x="3931" y="201.5" width="1.5" height="5.5" fill="#6a4a28" />
                </g>

                {/* Horse 3 - dark bay, facing right, standing calm */}
                <g>
                  <rect x="3944" y="201" width="12" height="7" fill="#4a3520" />
                  <rect x="3952" y="201" width="4" height="7" fill="#5a3a25" />
                  {/* Neck */}
                  <rect x="3956" y="197.5" width="2.5" height="4.5" fill="#4a3520" />
                  {/* Head facing right */}
                  <rect x="3957.5" y="195.5" width="4.5" height="3.5" fill="#4a3520" />
                  <rect x="3961" y="197" width="1.5" height="2" fill="#5a3a25" />
                  {/* Eye */}
                  <rect x="3959.5" y="196.5" width="0.8" height="0.8" fill="#2f2f2f" />
                  <rect x="3959.7" y="196.5" width="0.3" height="0.4" fill="#ffffff" />
                  {/* Ears */}
                  <rect x="3958" y="194" width="0.8" height="1.8" fill="#4a3520" />
                  <rect x="3959.5" y="194" width="0.8" height="1.8" fill="#4a3520" />
                  {/* Nostril */}
                  <rect x="3962" y="198" width="0.4" height="0.4" fill="#3a2a1a" />
                  {/* Mane */}
                  <rect x="3956.5" y="195.5" width="1" height="6" fill="#3a2a1a" />
                  {/* Legs */}
                  <rect x="3945" y="207.5" width="1.3" height="4" fill="#4a3520" />
                  <rect x="3947" y="207.5" width="1.3" height="4" fill="#5a3a25" />
                  <rect x="3952" y="207.5" width="1.3" height="4" fill="#4a3520" />
                  <rect x="3954" y="207.5" width="1.3" height="4" fill="#5a3a25" />
                  {/* Hooves */}
                  <rect x="3945" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3947" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3952" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x="3954" y="211" width="1.3" height="0.7" fill="#2f2f2f" />
                  {/* Tail */}
                  <rect x="3943" y="201.5" width="1.5" height="5.5" fill="#3a2a1a" />
                </g>

                {/* Wooden fence - ranch-style split rail, connected to barn left wall */}
                {/* Fence posts */}
                {[3875, 3898, 3921, 3944].map((px, pi) => (
                  <g key={`pasture-post-${pi}`}>
                    <rect x={px} y="203" width="2" height="10" fill="#8b7355" opacity="1" />
                    {/* Post cap - slightly wider */}
                    <rect x={px - 0.3} y="202.5" width="2.6" height="1" fill="#7a6345" opacity="1" />
                  </g>
                ))}
                {/* Connection post at barn wall */}
                <rect x="3968" y="203" width="2" height="10" fill="#8b7355" opacity="1" />
                <rect x="3967.7" y="202.5" width="2.6" height="1" fill="#7a6345" opacity="1" />

                {/* Top rail */}
                <rect x="3875" y="205" width="95" height="1.2" fill="#a08060" opacity="1" />
                {/* Bottom rail */}
                <rect x="3875" y="209" width="95" height="1.2" fill="#a08060" opacity="1" />

                {/* Rail wood grain detail */}
                <path d="M 3880,205.6 L 3920,205.4 M 3925,205.5 L 3965,205.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />
                <path d="M 3880,209.6 L 3920,209.4 M 3925,209.5 L 3965,209.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />

                {/* Gate - closed, flush with fence line */}
                {/* Gate hinge post (left side) */}
                <rect x="3869" y="203" width="2" height="10" fill="#8b7355" opacity="1" />
                <rect x="3868.7" y="202.5" width="2.6" height="1" fill="#7a6345" opacity="1" />
                {/* Gate latch post (connects to first fence post at 3875) */}
                {/* Gate frame - horizontal top and bottom rails */}
                <rect x="3871" y="205" width="4" height="1" fill="#a08060" opacity="1" />
                <rect x="3871" y="209.2" width="4" height="1" fill="#a08060" opacity="1" />
                {/* Gate vertical boards */}
                <rect x="3871.2" y="205" width="0.8" height="5.2" fill="#9a7050" opacity="1" />
                <rect x="3872.5" y="205" width="0.8" height="5.2" fill="#a08060" opacity="1" />
                <rect x="3873.8" y="205" width="0.8" height="5.2" fill="#9a7050" opacity="1" />
                {/* Gate diagonal brace - Z pattern for strength */}
                <path d="M 3871,205.5 L 3875,207.5 L 3871,209.5" stroke="#8a6a4a" strokeWidth="0.5" fill="none" opacity="0.7" />
                {/* Hinge hardware on hinge post */}
                <rect x="3870.5" y="205.5" width="1" height="0.6" fill="#3a3a3a" opacity="0.9" />
                <rect x="3870.5" y="209" width="1" height="0.6" fill="#3a3a3a" opacity="0.9" />
                {/* Latch on right side */}
                <rect x="3874.5" y="207" width="1" height="0.5" fill="#3a3a3a" opacity="0.9" />
                <circle cx="3875" cy="207.25" r="0.3" fill="#5a5a5a" opacity="0.8" />
              </g>

              {/* ===== COW PASTURE - to the right of Barn 1 silo (x=4040-4115) ===== */}
              <g>
                {/* Pasture grass */}
                <ellipse cx="4077" cy="208" rx="38" ry="4.5" fill="#8ab88a" opacity="0.45" />
                <ellipse cx="4077" cy="209" rx="32" ry="3" fill="#7aaa7a" opacity="0.25" />
                {/* Hay pile inside */}
                <ellipse cx="4100" cy="208" rx="4" ry="1.5" fill="#d4b874" opacity="0.5" />
                <ellipse cx="4100" cy="207.5" rx="3" ry="1" fill="#c8a860" opacity="0.4" />
                {/* Water trough */}
                <rect x="4048" y="207.5" width="7" height="2.5" rx="0.5" fill="#7a8a9a" opacity="0.9" />
                <rect x="4049" y="208" width="5" height="1.5" rx="0.3" fill="#5a8aaa" opacity="0.7" />
                <rect x="4050" y="210" width="1" height="1.2" fill="#5a6a6a" opacity="0.8" />
                <rect x="4053" y="210" width="1" height="1.2" fill="#5a6a6a" opacity="0.8" />
                {/* Fence posts */}
                {[4040, 4055, 4070, 4085, 4100, 4115].map((px, i) => (
                  <g key={`cow-pasture-post-${i}`}>
                    <rect x={px - 1} y="203" width="2.5" height="10" fill="#8b7355" opacity="1" />
                    <rect x={px - 1.3} y="202.5" width="3" height="1" fill="#7a6345" opacity="1" />
                  </g>
                ))}
                {/* Top rail */}
                <rect x="4040" y="205" width="75" height="1.2" fill="#a08060" opacity="1" />
                {/* Bottom rail */}
                <rect x="4040" y="209" width="75" height="1.2" fill="#a08060" opacity="1" />
                {/* Rail wood grain */}
                <path d="M 4045,205.6 L 4075,205.4 M 4080,205.5 L 4110,205.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />
                <path d="M 4045,209.6 L 4075,209.4 M 4080,209.5 L 4110,209.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />
              </g>

              {/* ===== SHEEP PASTURE - to the right of cow pasture (x=4130-4205) ===== */}
              <g>
                {/* Pasture grass */}
                <ellipse cx="4167" cy="208" rx="38" ry="4.5" fill="#8ab88a" opacity="0.45" />
                <ellipse cx="4167" cy="209" rx="32" ry="3" fill="#7aaa7a" opacity="0.25" />
                {/* Small hay scatter */}
                <ellipse cx="4145" cy="209" rx="3" ry="1" fill="#d4b874" opacity="0.35" />
                <ellipse cx="4190" cy="208.5" rx="3.5" ry="1.2" fill="#d4b874" opacity="0.35" />
                {/* Fence posts */}
                {[4130, 4145, 4160, 4175, 4190, 4205].map((px, i) => (
                  <g key={`sheep-pasture-post-${i}`}>
                    <rect x={px - 1} y="203" width="2.5" height="10" fill="#8b7355" opacity="1" />
                    <rect x={px - 1.3} y="202.5" width="3" height="1" fill="#7a6345" opacity="1" />
                  </g>
                ))}
                {/* Top rail */}
                <rect x="4130" y="205" width="75" height="1.2" fill="#a08060" opacity="1" />
                {/* Bottom rail */}
                <rect x="4130" y="209" width="75" height="1.2" fill="#a08060" opacity="1" />
                {/* Rail wood grain */}
                <path d="M 4135,205.6 L 4165,205.4 M 4170,205.5 L 4200,205.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />
                <path d="M 4135,209.6 L 4165,209.4 M 4170,209.5 L 4200,209.7" stroke="#8a6a4a" strokeWidth="0.2" opacity="0.5" />
              </g>

              {/* Enhanced Farmhouses with porches, shutters, smoke */}
              <g>
                {/* ===== AMERICAN FARMHOUSE - classic 2-story white clapboard (x=4250-4285) ===== */}
                {/* Foundation - stone base */}
                <rect x="4248" y="204" width="39" height="2.5" fill="#7a7a6a" opacity="0.9" />
                <rect x="4249" y="204.5" width="37" height="1.5" fill="#8a8a7a" opacity="0.6" />
                {/* Stone texture on foundation */}
                <path d="M 4252,205 L 4256,205 M 4260,204.8 L 4264,204.8 M 4268,205.2 L 4272,205.2 M 4276,205 L 4280,205" stroke="#6a6a5a" strokeWidth="0.4" opacity="0.5" />
                {/* Main body - 2 stories, white clapboard */}
                <rect x="4250" y="183" width="35" height="22" fill="#f5f0e8" opacity="1" />
                {/* Clapboard siding lines - horizontal */}
                <path d="M 4251,186 L 4284,186 M 4251,188.5 L 4284,188.5 M 4251,191 L 4284,191 M 4251,193.5 L 4284,193.5 M 4251,196 L 4284,196 M 4251,198.5 L 4284,198.5 M 4251,201 L 4284,201 M 4251,203.5 L 4284,203.5" stroke="#e8e0d0" strokeWidth="0.4" opacity="0.7" />
                {/* Corner boards */}
                <rect x="4250" y="183" width="1.5" height="22" fill="#e8e0d0" opacity="1" />
                <rect x="4283.5" y="183" width="1.5" height="22" fill="#e8e0d0" opacity="1" />
                {/* Steep gable roof - dark grey */}
                <path d="M 4246,183 L 4267.5,165 L 4289,183 Z" fill="#4a4a4a" opacity="1" />
                {/* Roof shingle texture */}
                <path d="M 4249,180 L 4267.5,167 L 4286,180" stroke="#3a3a3a" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M 4252,177 L 4267.5,169 L 4283,177" stroke="#3a3a3a" strokeWidth="0.4" fill="none" opacity="0.5" />
                <path d="M 4255,174 L 4267.5,171 L 4280,174" stroke="#3a3a3a" strokeWidth="0.4" fill="none" opacity="0.4" />
                {/* Roof ridge cap */}
                <path d="M 4265.5,165 L 4267.5,163 L 4269.5,165" fill="#3a3a3a" opacity="0.8" />
                {/* Roof eave overhang */}
                <path d="M 4246,183 L 4289,183" stroke="#3a3a3a" strokeWidth="1.5" opacity="1" />
                {/* Dormer window - centered */}
                <path d="M 4263,178 L 4267.5,173 L 4272,178 Z" fill="#4a4a4a" opacity="1" />
                <rect x="4264.5" y="175" width="6" height="3.5" fill="#f5f0e8" opacity="1" />
                <rect x="4265" y="175.5" width="5" height="2.5" fill="#6b8ea8" opacity="1" />
                <path d="M 4267.5,175.5 L 4267.5,178 M 4265,176.8 L 4270,176.8" stroke="#e8e0d0" strokeWidth="0.3" />
                {/* === Second floor windows (3) with shutters === */}
                {/* Window 1 - left */}
                <rect x="4255" y="185" width="3.5" height="5" fill="#6b8ea8" opacity="1" />
                <rect x="4254.3" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <rect x="4258.5" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <path d="M 4256.75,185 L 4256.75,190 M 4255,187.5 L 4258.5,187.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Window 2 - center */}
                <rect x="4265.5" y="185" width="3.5" height="5" fill="#6b8ea8" opacity="1" />
                <rect x="4264.8" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <rect x="4269" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <path d="M 4267.25,185 L 4267.25,190 M 4265.5,187.5 L 4269,187.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Window 3 - right */}
                <rect x="4276" y="185" width="3.5" height="5" fill="#6b8ea8" opacity="1" />
                <rect x="4275.3" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <rect x="4279.5" y="185" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <path d="M 4277.75,185 L 4277.75,190 M 4276,187.5 L 4279.5,187.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* === First floor - door and 2 windows with shutters === */}
                {/* Front door - paneled with frame */}
                <rect x="4264" y="195" width="7" height="10" fill="#5a3a2a" opacity="1" />
                <rect x="4263.5" y="194.5" width="8" height="1" fill="#6d4428" opacity="1" />
                {/* Door panels */}
                <rect x="4265" y="196" width="2" height="3.5" fill="#4a2a1a" opacity="0.6" />
                <rect x="4268" y="196" width="2" height="3.5" fill="#4a2a1a" opacity="0.6" />
                <rect x="4265" y="200.5" width="2" height="3.5" fill="#4a2a1a" opacity="0.6" />
                <rect x="4268" y="200.5" width="2" height="3.5" fill="#4a2a1a" opacity="0.6" />
                {/* Door knob */}
                <circle cx="4270" cy="200" r="0.5" fill="#d4af37" opacity="1" />
                {/* Transom window above door */}
                <rect x="4264.5" y="193" width="6" height="1.5" fill="#6b8ea8" opacity="0.8" />
                {/* Window left of door */}
                <rect x="4254" y="196" width="4" height="5" fill="#6b8ea8" opacity="1" />
                <rect x="4253.3" y="196" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <rect x="4258" y="196" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <path d="M 4256,196 L 4256,201 M 4254,198.5 L 4258,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* Window right of door */}
                <rect x="4276" y="196" width="4" height="5" fill="#6b8ea8" opacity="1" />
                <rect x="4275.3" y="196" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <rect x="4280" y="196" width="0.7" height="5" fill="#3a5a3a" opacity="1" />
                <path d="M 4278,196 L 4278,201 M 4276,198.5 L 4280,198.5" stroke="#4a6a7a" strokeWidth="0.3" />
                {/* === Full-width front porch === */}
                {/* Porch floor */}
                <rect x="4248" y="204" width="39" height="2" fill="#c9b18f" opacity="1" />
                <path d="M 4250,204.5 L 4285,204.5 M 4250,205 L 4285,205" stroke="#b8a07a" strokeWidth="0.3" opacity="0.5" />
                {/* Porch roof */}
                <rect x="4247" y="193" width="41" height="1" fill="#5a5a5a" opacity="0.7" />
                {/* Porch support posts (5) */}
                {[4250, 4259, 4267.5, 4276, 4285].map((px, i) => (
                  <rect key={`porch-post-${i}`} x={px - 0.5} y="193.5" width="1" height="11" fill="#e8e0d0" opacity="0.9" />
                ))}
                {/* Porch railing between posts */}
                <rect x="4250" y="200" width="35" height="0.8" fill="#e8e0d0" opacity="0.7" />
                {/* Brick chimney - right side */}
                <rect x="4280" y="168" width="3.5" height="15" fill="#a85757" opacity="1" />
                {/* Chimney cap */}
                <rect x="4279.5" y="167.5" width="4.5" height="1.2" fill="#8a4a4a" opacity="1" />
                {/* Brick texture */}
                <path d="M 4280.5,170 L 4283,170 M 4280.5,172 L 4283,172 M 4280.5,174 L 4283,174 M 4280.5,176 L 4283,176 M 4280.5,178 L 4283,178" stroke="#964747" strokeWidth="0.3" opacity="0.5" />
                {/* Smoke wisps */}
                <ellipse cx="4282" cy="165" rx="2" ry="2.5" fill="#c4c4c4" opacity="0.25" />
                <ellipse cx="4283" cy="161" rx="1.5" ry="2" fill="#c4c4c4" opacity="0.15" />
                {/* Steps at front door */}
                <rect x="4263" y="205.5" width="9" height="1.2" fill="#8a8a7a" opacity="0.8" />
                <rect x="4262" y="206.5" width="11" height="1.2" fill="#8a8a7a" opacity="0.7" />

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
                {/* Evergreen pine - x=3818, left of pasture fence, behind white fence */}
                <g><rect x="3818" y="196" width="2.5" height="14" fill="#5a4a35" /><path d="M 3811,205 L 3819.25,187 L 3827.5,205 Z" fill="#3a6a3a" /><path d="M 3813,200 L 3819.25,185 L 3825.5,200 Z" fill="#4a7a4a" /><path d="M 3815,195 L 3819.25,183 L 3823.5,195 Z" fill="#5a8a5a" /></g>
                {/* Young deciduous - x=3842, staggered from pine */}
                <g><rect x="3842" y="198" width="2" height="7" fill="#6b5a45" /><circle cx="3843" cy="196" r="4" fill="#6a9a6a" /><circle cx="3841" cy="197" r="3" fill="#7aaa7a" /><circle cx="3846" cy="197" r="3" fill="#7aaa7a" /></g>
                {/* Large oak - 3860 */}
                <g><rect x="3859" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="3861" cy="189" r="9" fill="#4a7a4a" /><circle cx="3855" cy="191" r="6" fill="#5a8a5a" /><circle cx="3867" cy="191" r="6" fill="#5a8a5a" /></g>
                {/* Large maple - 4122, between cow and sheep pastures (tad large) */}
                <g><rect x="4121" y="190" width="5" height="15" fill="#5a4a35" /><circle cx="4123.5" cy="185" r="11" fill="#5a8a5a" /><circle cx="4115" cy="188" r="7.5" fill="#6a9a6a" /><circle cx="4132" cy="188" r="7.5" fill="#6a9a6a" /><circle cx="4123.5" cy="181" r="6" fill="#8ab88a" /></g>
                {/* Large oak - 4210, after sheep pasture (tad large) */}
                <g><rect x="4209" y="190" width="5" height="15" fill="#5a4a35" /><circle cx="4211.5" cy="186" r="10" fill="#4a7a4a" /><circle cx="4205" cy="189" r="7" fill="#5a8a5a" /><circle cx="4218" cy="189" r="7" fill="#5a8a5a" /><circle cx="4211.5" cy="182" r="5.5" fill="#6a9a6a" /></g>
                {/* Tall spruce - 4340, after chicken coop */}
                <g><rect x="4340" y="195" width="2.5" height="16" fill="#4a3a25" /><path d="M 4333,206 L 4341.25,185 L 4349.5,206 Z" fill="#2f5f2f" /><path d="M 4335,200 L 4341.25,182 L 4347.5,200 Z" fill="#3a6a3a" /><path d="M 4337,195 L 4341.25,180 L 4345.5,195 Z" fill="#4a7a4a" /></g>
                {/* Small evergreen - 4410 */}
                <g><rect x="4410" y="198" width="2" height="12" fill="#4a3a25" /><path d="M 4405,205 L 4411,192 L 4417,205 Z" fill="#3a6a3a" /><path d="M 4407,201 L 4411,190 L 4415,201 Z" fill="#4a7a4a" /></g>
                {/* Large oak - 4490 */}
                <g><rect x="4489" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="4491" cy="189" r="8" fill="#4a7a4a" /><circle cx="4485" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4497" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4491" cy="185" r="5" fill="#6a9a6a" /></g>
                {/* Birch - 4550 */}
                <g><rect x="4550" y="196" width="2.5" height="9" fill="#c9b89a" /><path d="M 4550.5,197 L 4550.5,200" stroke="#6b5a45" strokeWidth="0.5" /><circle cx="4551.25" cy="193" r="6" fill="#6a9a6a" /><circle cx="4548" cy="195" r="4" fill="#7aaa7a" /><circle cx="4555" cy="195" r="4" fill="#7aaa7a" /></g>
                {/* Medium deciduous - 4640 */}
                <g><rect x="4640" y="196" width="3" height="9" fill="#6b5a45" /><circle cx="4641.5" cy="192" r="7" fill="#5a8a5a" /><circle cx="4638" cy="194" r="5" fill="#6a9a6a" /><circle cx="4645" cy="194" r="5" fill="#6a9a6a" /></g>
                {/* Evergreen - 4745 (moved from 4720 to clear silo) */}
                <g><rect x="4745" y="196" width="2.5" height="14" fill="#4a3a25" /><path d="M 4739,205 L 4746.25,188 L 4753.5,205 Z" fill="#3a6a3a" /><path d="M 4741,201 L 4746.25,186 L 4751.5,201 Z" fill="#4a7a4a" /><path d="M 4743,197 L 4746.25,184 L 4749.5,197 Z" fill="#5a8a5a" /></g>
                {/* Large elm - 4790 */}
                <g><rect x="4789" y="193" width="4" height="12" fill="#5a4a35" /><circle cx="4791" cy="189" r="8" fill="#4a7a4a" /><circle cx="4785" cy="191" r="5.5" fill="#5a8a5a" /><circle cx="4797" cy="191" r="5.5" fill="#5a8a5a" /></g>
                {/* Small deciduous - 4880 */}
                <g><rect x="4880" y="198" width="2" height="7" fill="#6b5a45" /><circle cx="4881" cy="196" r="4.5" fill="#6a9a6a" /><circle cx="4879" cy="197" r="3.5" fill="#7aaa7a" /><circle cx="4884" cy="197" r="3.5" fill="#7aaa7a" /></g>
                {/* Tall pine - 4960 */}
                <g><rect x="4960" y="196" width="2.5" height="14" fill="#5a4a35" /><path d="M 4954,205 L 4961.25,188 L 4968.5,205 Z" fill="#3a6a3a" /><path d="M 4956,200 L 4961.25,185 L 4966.5,200 Z" fill="#4a7a4a" /><path d="M 4958,195 L 4961.25,183 L 4964.5,195 Z" fill="#5a8a5a" /></g>
              </g>

              {/* Tractors - fully detailed like Phase 1 */}
              <g>
                {[4500, 4750, 4930].map((x, i) => (
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

              {/* Windmill - iconic rural landmark, moved to x=4220 center */}
              <g>
                <path d="M 4215,205 L 4218,175 L 4222,175 L 4225,205 Z" fill="#8a8a7a" opacity="0.9" />
                <path d="M 4216.5,200 L 4223,180 M 4223.5,200 L 4217,180" stroke="#6a6a5a" strokeWidth="0.5" opacity="0.7" />
                <path d="M 4217,195 L 4223,190 M 4223,195 L 4217,190" stroke="#6a6a5a" strokeWidth="0.4" opacity="0.6" />
                <rect x="4216" y="174" width="8" height="1.5" fill="#6a6a5a" opacity="1" />
                <rect x="4218" y="172" width="4" height="3" rx="1" fill="#7a7a6a" opacity="1" />
                {/* Blades - 4 wide fan blades, animated spin (slower) */}
                <g className="windmill-blades-slow" style={{transformOrigin: '4220px 173px'}}>
                  {/* Blade 1 - Up */}
                  <path d="M 4219,172 L 4218,158 L 4220,155 L 4222,158 L 4221,172 Z" fill="#e8e0d0" opacity="0.85" />
                  <path d="M 4219,172 L 4218,158 L 4220,155" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 4220,165 L 4221,165" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  <path d="M 4220,160 L 4221,160" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 2 - Down */}
                  <path d="M 4221,174 L 4222,188 L 4220,191 L 4218,188 L 4219,174 Z" fill="#ddd6c4" opacity="0.8" />
                  <path d="M 4221,174 L 4222,188 L 4220,191" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 4220,181 L 4219,181" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 3 - Left */}
                  <path d="M 4219,172 L 4205,171 L 4203,173 L 4205,175 L 4219,174 Z" fill="#d8d0be" opacity="0.82" />
                  <path d="M 4219,172 L 4205,171 L 4203,173" stroke="#ccc4b0" strokeWidth="0.4" fill="none" />
                  <path d="M 4212,173 L 4212,172" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                  {/* Blade 4 - Right */}
                  <path d="M 4221,174 L 4235,175 L 4237,173 L 4235,171 L 4221,172 Z" fill="#e8e0d0" opacity="0.78" />
                  <path d="M 4221,174 L 4235,175 L 4237,173" stroke="#d4ccb8" strokeWidth="0.4" fill="none" />
                  <path d="M 4228,173 L 4228,174" stroke="#ccc4b0" strokeWidth="0.3" opacity="0.6" />
                </g>
                <circle cx="4220" cy="173" r="2" fill="#6a6a5a" opacity="1" />
                <circle cx="4220" cy="173" r="1" fill="#5a5a4a" opacity="1" />
              </g>

              {/* FARM ANIMALS - Minecraft/voxel style, matching opening biome */}

              {/* Horses - now housed in fenced pasture next to Barn 1 (see above) */}

              {/* Cows - in pairs */}
              <g>
                {[
                  {x: 4060, dir: 1, y: 3},
                  {x: 4095, dir: -1, y: 0},
                  {x: 4350, dir: -1, y: -1},
                  {x: 4368, dir: -1, y: 2},
                  {x: 4700, dir: 1, y: -2},
                  {x: 4718, dir: 1, y: 1},
                ].map((c, i) => (
                  <g key={`cow-end-${i}`} transform={`translate(0, ${c.y + 12})`}>
                  <g className={c.dir > 0 ? "animal-cow-left" : "animal-cow"} style={{animationDelay: `${i * 5.7}s`, animationDuration: `${c.dir > 0 ? 28 + i * 8 : 33 + i * 5}s`}}>
                  <g transform={`translate(${c.x}, 203)`}>
                  <g style={{animation: `faceFlip ${c.dir > 0 ? 28 + i * 8 : 33 + i * 5}s linear infinite`, animationDelay: `${i * 5.7}s`}}>
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

              {/* Sheep FLOCKS - Flock 2 in sheep pasture x=4130-4205, Flock 3 near x=4700 */}
              {/* Flock 2 - inside sheep pasture, grazing near x=4155 */}
              <g>
                <g className="animal-sheep" style={{animationDuration: '42s'}}>
                  {[
                    {dx: -12, dy: 1},
                    {dx: 0, dy: -3},
                    {dx: 12, dy: 2},
                  ].map((m, mi) => {
                    const sx = 4155 + m.dx;
                    const dir = -1;
                    return (
                      <g key={`flock2-sheep-${mi}`} transform={`translate(0, ${m.dy + 12})`}>
                      <g transform={`translate(${sx}, 206)`}>
                      <g style={{animation: 'faceFlip 42s linear infinite', animationDelay: `${mi * 0.5}s`}}>
                      <g transform={`translate(${-sx}, -206)`} opacity="1">
                        <rect x={sx - 5} y="203" width="10" height="6" fill="#f5f5f5" />
                        <rect x={sx - 4} y="203.5" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + 1} y="204" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx - 2} y="206" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + (dir > 0 ? -8 : 4)} y="203.5" width="3.5" height="4" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -8.5 : 4)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -5.5 : 6.5)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -7 : 5.5)} y="204.5" width="0.8" height="0.8" fill="#ffffff" />
                        <rect x={sx + (dir > 0 ? -6.8 : 5.7)} y="204.5" width="0.3" height="0.4" fill="#1a1a1a" />
                        <rect x={sx + (dir > 0 ? -8.5 : 7)} y="206" width="1" height="0.7" fill="#1a1a1a" />
                        <rect x={sx - 3.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx - 1.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 1} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 3} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? 4.5 : -5.5)} y="204" width="1.5" height="2" fill="#f5f5f5" />
                      </g></g></g>
                      </g>
                    );
                  })}
                </g>
              </g>
              {/* Flock 3 - section 2, grazing near x=4700 */}
              <g>
                <g className="animal-sheep-left" style={{animationDuration: '35s'}}>
                  {[
                    {dx: -20, dy: 2},
                    {dx: 0, dy: -2},
                    {dx: 20, dy: -1},
                  ].map((m, mi) => {
                    const sx = 4700 + m.dx;
                    const dir = 1;
                    return (
                      <g key={`flock3-sheep-${mi}`} transform={`translate(0, ${m.dy + 12})`}>
                      <g transform={`translate(${sx}, 206)`}>
                      <g style={{animation: 'faceFlip 35s linear infinite', animationDelay: `${mi * 0.3}s`}}>
                      <g transform={`translate(${-sx}, -206)`} opacity="1">
                        <rect x={sx - 5} y="203" width="10" height="6" fill="#f5f5f5" />
                        <rect x={sx - 4} y="203.5" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + 1} y="204" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx - 2} y="206" width="2" height="1.5" fill="#e8e8e8" />
                        <rect x={sx + (dir > 0 ? -8 : 4)} y="203.5" width="3.5" height="4" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -8.5 : 4)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -5.5 : 6.5)} y="203" width="1.2" height="1.5" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? -7 : 5.5)} y="204.5" width="0.8" height="0.8" fill="#ffffff" />
                        <rect x={sx + (dir > 0 ? -6.8 : 5.7)} y="204.5" width="0.3" height="0.4" fill="#1a1a1a" />
                        <rect x={sx + (dir > 0 ? -8.5 : 7)} y="206" width="1" height="0.7" fill="#1a1a1a" />
                        <rect x={sx - 3.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx - 1.5} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 1} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + 3} y="208.5" width="1" height="3" fill="#2f2f2f" />
                        <rect x={sx + (dir > 0 ? 4.5 : -5.5)} y="204" width="1.5" height="2" fill="#f5f5f5" />
                      </g></g></g>
                      </g>
                    );
                  })}
                </g>
              </g>

              {/* Chickens - de-crowded */}
              <g>
                {[
                  {x: 4300, y: 2, dir: 1},
                  {x: 4320, y: -2, dir: -1},
                  {x: 4335, y: 1, dir: 1},
                  {x: 4435, y: -1, dir: -1},
                  {x: 4630, y: -1, dir: 1},
                  {x: 4825, y: 1, dir: -1},
                ].map((ch, i) => (
                  <g key={`chicken-end-${i}`} transform={`translate(0, ${ch.y + 12})`}>
                  <g className={ch.dir > 0 ? "animal-chicken-left" : "animal-chicken"} style={{animationDelay: `${i * 2.9}s`, animationDuration: `${ch.dir > 0 ? 19 + i * 4 : 17 + i * 3}s`}}>
                  <g transform={`translate(${ch.x}, 208)`}>
                  <g style={{animation: `faceFlip ${ch.dir > 0 ? 19 + i * 4 : 17 + i * 3}s linear infinite`, animationDelay: `${i * 2.9}s`}}>
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

              {/* Chicken coop - to the RIGHT of American farmhouse (x=4295) */}
              <g>
                {/* Coop body */}
                <rect x="4295" y="203" width="12" height="8" fill="#8a6a4a" opacity="1" />
                {/* Roof */}
                <path d="M 4293,203 L 4301,197 L 4309,203 Z" fill="#6a4a2a" opacity="1" />
                <rect x="4293" y="202.5" width="16" height="1" fill="#5a3a1a" opacity="1" />
                {/* Door opening - faces right */}
                <rect x="4303" y="206" width="3.5" height="5" fill="#3a2a1a" opacity="1" />
                {/* Small window */}
                <rect x="4297" y="204.5" width="2.5" height="2" fill="#4a4a4a" opacity="0.7" />
                <path d="M 4297,205.5 L 4299.5,205.5 M 4298.25,204.5 L 4298.25,206.5" stroke="#6a5a4a" strokeWidth="0.3" />
                {/* Ramp */}
                <rect x="4303" y="210.5" width="5" height="0.6" fill="#7a5a3a" opacity="0.9" transform="rotate(-15, 4305.5, 210.5)" />
                {/* Hay/straw around coop */}
                <rect x="4294" y="210" width="15" height="1" rx="0.5" fill="#d4b874" opacity="0.4" />
                {/* 7 chickens cycling in and out of coop - origin at door (x=4306, y=208) */}
                {[
                  {cls: 'coop-chicken-1', delay: 2, color: '#f5f5f0'},
                  {cls: 'coop-chicken-2', delay: 6, color: '#d4a574'},
                  {cls: 'coop-chicken-3', delay: 10, color: '#c49464'},
                  {cls: 'coop-chicken-4', delay: 14, color: '#d4a574'},
                  {cls: 'coop-chicken-5', delay: 18, color: '#f5f5f0'},
                  {cls: 'coop-chicken-6', delay: 22, color: '#d4a574'},
                  {cls: 'coop-chicken-7', delay: 26, color: '#c49464'},
                ].map((ch, ci) => (
                  <g key={`coop2-ch-${ci}`} className={ch.cls} style={{animationDelay: `${ch.delay}s`}}>
                    {/* Body */}
                    <rect x="4306" y="208" width="4" height="3" fill={ch.color} />
                    {/* Head */}
                    <rect x="4310" y="207" width="2" height="2.5" fill={ch.color} />
                    {/* Comb */}
                    <rect x="4311" y="206" width="1.2" height="1" fill="#cc3333" />
                    {/* Beak */}
                    <rect x="4312" y="207.5" width="1" height="0.5" fill="#ffd700" />
                    {/* Legs */}
                    <rect x="4307" y="210.5" width="0.6" height="1.5" fill="#e8a020" />
                    <rect x="4308.5" y="210.5" width="0.6" height="1.5" fill="#e8a020" />
                  </g>
                ))}
              </g>

              {/* White picket fences - rendered AFTER animals so fence appears in front */}
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

              {/* FOREGROUND: Drinking animals at ending pond - Minecraft blocky style */}
              <g>
                {/* Cow drinking - only head/neck raises */}
                <g>
                  {/* Static body */}
                  <rect x={4843} y="207" width="11" height="7" fill="#f5f5f5" />
                  <rect x={4844.5} y="208" width="3" height="2.5" fill="#2f2f2f" />
                  <rect x={4849} y="207.5" width="3.5" height="2.5" fill="#2f2f2f" />
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
                  {/* Animated head/neck - pivots at neck-body joint */}
                  <g className="drinking-head-left" style={{animationDuration: '11s', animationDelay: '2s', transformOrigin: '4843px 210px'}}>
                    <rect x={4839} y="210" width="4.5" height="3" fill="#f5f5f5" />
                    <rect x={4835} y="211" width="5" height="4.5" fill="#f5f5f5" />
                    <rect x={4835.5} y="211.5" width="2" height="1.5" fill="#2f2f2f" />
                    <rect x={4833.5} y="213.5" width="2" height="2" fill="#ffb6c1" />
                    <rect x={4837.5} y="212" width="1" height="1" fill="#2f2f2f" />
                  </g>
                  <rect x={4833} y="216" width="6" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={4832} y="216.5" width="8" height="0.5" fill="#6a9aba" opacity="0.2" />
                </g>

                {/* Horse drinking - only head/neck raises */}
                <g>
                  {/* Static body */}
                  <rect x={4809} y="204" width="12" height="7" fill="#654321" />
                  <rect x={4817} y="204" width="4" height="7" fill="#7a5230" />
                  <rect x={4810} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4812.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4815} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4817.5} y="210.5" width="1.3" height="4.5" fill="#654321" />
                  <rect x={4810} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4812.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4815} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4817.5} y="214.5" width="1.3" height="0.7" fill="#2f2f2f" />
                  <rect x={4808} y="205" width="1.5" height="5" fill="#4a3520" />
                  {/* Animated head/neck - pivots at shoulder */}
                  <g className="drinking-head-right" style={{animationDuration: '9s', animationDelay: '6s', transformOrigin: '4820px 208px'}}>
                    <rect x={4820} y="208" width="3" height="5" fill="#654321" />
                    <rect x={4820} y="211" width="6" height="4" fill="#654321" />
                    <rect x={4824.5} y="213" width="2" height="2" fill="#7a5230" />
                    <rect x={4823} y="212" width="1" height="1" fill="#2f2f2f" />
                    <rect x={4825.5} y="214" width="0.5" height="0.5" fill="#3a2a1a" />
                    <rect x={4820} y="208" width="1" height="4" fill="#4a3520" />
                  </g>
                  <rect x={4823} y="215.5" width="5" height="0.5" fill="#6a9aba" opacity="0.4" />
                  <rect x={4822} y="216" width="7" height="0.5" fill="#6a9aba" opacity="0.2" />
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

              {/* VARIETY TREES - Bonsai-scaled evergreen and deciduous mix along foreground - GREEN CITY ONLY (x=2000-3800) */}
              <g opacity="1">
                {Array.from({length: 45}).map((_, i) => {
                  const x = 2010 + i * 40;
                  // Tree pattern: 0=tall evergreen (pine), 1=deciduous (oak), 2=small evergreen (cypress), 3=deciduous (maple)
                  const treeType = [0, 1, 2, 3, 1, 0, 3, 2, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 0, 1, 2, 3, 1][i % 50];
                  const baseY = 235;

                  if (treeType === 0) {
                    // Bonsai Pine - tiny triangular conifer
                    return (
                      <g key={`fg-tree-${i}`}>
                        <rect x={x+1.5} y={baseY-1} width="1.5" height="2.5" fill="#5a4a3a" opacity="1" />
                        <polygon points={`${x+2.2},${baseY-9.5} ${x-0.5},${baseY-2} ${x+5},${baseY-2}`} fill="#2d5a3d" opacity="1" />
                        <polygon points={`${x+2.2},${baseY-7.5} ${x+0.3},${baseY-2.8} ${x+4.2},${baseY-2.8}`} fill="#3d6a4d" opacity="1" />
                        <polygon points={`${x+2.2},${baseY-5.5} ${x+0.8},${baseY-1.8} ${x+3.7},${baseY-1.8}`} fill="#2d5a3d" opacity="1" />
                      </g>
                    );
                  } else if (treeType === 1) {
                    // Bonsai Oak - tiny round canopy
                    return (
                      <g key={`fg-tree-${i}`}>
                        <rect x={x+1.5} y={baseY-1} width="1.8" height="2.5" fill="#6b5a45" opacity="1" />
                        <circle cx={x+2.2} cy={baseY-5.5} r="3.5" fill="#5a8a4a" opacity="1" />
                        <circle cx={x-0.3} cy={baseY-4} r="2" fill="#6a9a5a" opacity="1" />
                        <circle cx={x+4.8} cy={baseY-4} r="2" fill="#6a9a5a" opacity="1" />
                        <circle cx={x+2.2} cy={baseY-7.5} r="1.8" fill="#7aaa6a" opacity="1" />
                      </g>
                    );
                  } else if (treeType === 2) {
                    // Bonsai Cypress - tiny columnar shape
                    return (
                      <g key={`fg-tree-${i}`}>
                        <rect x={x+1.5} y={baseY-1} width="1" height="2" fill="#5a4a3a" opacity="1" />
                        <ellipse cx={x+2} cy={baseY-5} rx="1.8" ry="5" fill="#2d5a3d" opacity="1" />
                        <ellipse cx={x+2} cy={baseY-5.5} rx="1.4" ry="4" fill="#3d6a4d" opacity="1" />
                      </g>
                    );
                  } else {
                    // Bonsai Maple - tiny spreading canopy
                    return (
                      <g key={`fg-tree-${i}`}>
                        <rect x={x+1.5} y={baseY-1} width="1.5" height="2.5" fill="#6b5a45" opacity="1" />
                        <ellipse cx={x+2} cy={baseY-5} rx="3.8" ry="3" fill="#5a9a4a" opacity="1" />
                        <ellipse cx={x-0.5} cy={baseY-4} rx="1.8" ry="1.8" fill="#6aaa5a" opacity="1" />
                        <ellipse cx={x+4.5} cy={baseY-4} rx="1.8" ry="1.8" fill="#6aaa5a" opacity="1" />
                        <ellipse cx={x+2} cy={baseY-7} rx="2.2" ry="1.8" fill="#7aba6a" opacity="1" />
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
