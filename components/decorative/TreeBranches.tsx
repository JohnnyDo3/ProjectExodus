'use client'

export function TreeBranches() {
  return (
    <>
      {/* Canopy View - Looking Up at Trees Converging to Center */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-15 dark:opacity-8"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main Trunk Branches from Bottom Left Corner */}
        <path
          d="M 0,1000 Q 150,850 250,700 Q 350,550 450,450 Q 475,425 500,400"
          stroke="currentColor"
          strokeWidth="18"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        <path
          d="M 50,1000 Q 180,870 270,740 Q 360,610 440,500 Q 460,470 480,440"
          stroke="currentColor"
          strokeWidth="14"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />

        {/* Branch from Bottom Left with sub-branches */}
        <path
          d="M 100,1000 Q 200,900 300,800 Q 400,700 480,580"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 200,900 Q 250,860 300,820" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 300,800 Q 340,770 380,740" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Main Trunk Branches from Bottom Right Corner */}
        <path
          d="M 1000,1000 Q 850,850 750,700 Q 650,550 550,450 Q 525,425 500,400"
          stroke="currentColor"
          strokeWidth="18"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        <path
          d="M 950,1000 Q 820,870 730,740 Q 640,610 560,500 Q 540,470 520,440"
          stroke="currentColor"
          strokeWidth="14"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />

        {/* Branch from Bottom Right with sub-branches */}
        <path
          d="M 900,1000 Q 800,900 700,800 Q 600,700 520,580"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 800,900 Q 750,860 700,820" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 700,800 Q 660,770 620,740" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Main Trunk Branches from Top Left Corner */}
        <path
          d="M 0,0 Q 150,150 250,300 Q 350,450 450,550 Q 475,575 500,600"
          stroke="currentColor"
          strokeWidth="16"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        <path
          d="M 50,0 Q 180,130 270,260 Q 360,390 440,500 Q 460,530 480,560"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />

        {/* Branch from Top Left with sub-branches */}
        <path
          d="M 100,0 Q 200,100 300,200 Q 400,300 480,420"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 200,100 Q 250,140 300,180" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 300,200 Q 340,230 380,260" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Main Trunk Branches from Top Right Corner */}
        <path
          d="M 1000,0 Q 850,150 750,300 Q 650,450 550,550 Q 525,575 500,600"
          stroke="currentColor"
          strokeWidth="16"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        <path
          d="M 950,0 Q 820,130 730,260 Q 640,390 560,500 Q 540,530 520,560"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />

        {/* Branch from Top Right with sub-branches */}
        <path
          d="M 900,0 Q 800,100 700,200 Q 600,300 520,420"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 800,100 Q 750,140 700,180" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 700,200 Q 660,230 620,260" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Smaller branches from Left Side converging to center */}
        <path
          d="M 0,400 Q 100,420 200,440 Q 300,460 400,480"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path
          d="M 0,500 Q 100,500 200,500 Q 300,500 400,500"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path
          d="M 0,600 Q 100,580 200,560 Q 300,540 400,520"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />

        {/* Smaller branches from Right Side converging to center */}
        <path
          d="M 1000,400 Q 900,420 800,440 Q 700,460 600,480"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path
          d="M 1000,500 Q 900,500 800,500 Q 700,500 600,500"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path
          d="M 1000,600 Q 900,580 800,560 Q 700,540 600,520"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />

        {/* Fine twigs reaching toward center from all directions */}
        <path d="M 150,200 Q 250,300 350,400" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 850,200 Q 750,300 650,400" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 150,800 Q 250,700 350,600" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 850,800 Q 750,700 650,600" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path d="M 200,300 Q 300,380 400,460" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 800,300 Q 700,380 600,460" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 200,700 Q 300,620 400,540" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 800,700 Q 700,620 600,540" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Additional fine detail branches */}
        <path d="M 100,300 L 200,380" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 900,300 L 800,380" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 100,700 L 200,620" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 900,700 L 800,620" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />

        <path d="M 250,150 Q 350,280 430,400" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 750,150 Q 650,280 570,400" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 250,850 Q 350,720 430,600" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 750,850 Q 650,720 570,600" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Top Side branches converging down */}
        <path d="M 400,0 Q 420,100 440,200 Q 460,300 480,400" stroke="currentColor" strokeWidth="7" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 500,0 Q 500,100 500,200 Q 500,300 500,400" stroke="currentColor" strokeWidth="9" className="text-[var(--foreground)]" opacity="0.5" />
        <path d="M 600,0 Q 580,100 560,200 Q 540,300 520,400" stroke="currentColor" strokeWidth="7" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Bottom Side branches converging up */}
        <path d="M 400,1000 Q 420,900 440,800 Q 460,700 480,600" stroke="currentColor" strokeWidth="7" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 500,1000 Q 500,900 500,800 Q 500,700 500,600" stroke="currentColor" strokeWidth="9" className="text-[var(--foreground)]" opacity="0.5" />
        <path d="M 600,1000 Q 580,900 560,800 Q 540,700 520,600" stroke="currentColor" strokeWidth="7" className="text-[var(--foreground)]" opacity="0.4" />

        {/* Birds flying through the canopy */}
        <g transform="translate(450, 400)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(550, 450)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(350, 550)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(650, 520)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
        </g>

        {/* Central convergence point - subtle leaf cluster effect */}
        <circle cx="500" cy="500" r="8" fill="currentColor" className="text-[var(--foreground)]" opacity="0.1" />
        <circle cx="500" cy="500" r="15" fill="currentColor" className="text-[var(--foreground)]" opacity="0.05" />
        <circle cx="500" cy="500" r="25" fill="currentColor" className="text-[var(--foreground)]" opacity="0.03" />
      </svg>
    </>
  )
}
