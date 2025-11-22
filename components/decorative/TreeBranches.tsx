'use client'

export function TreeBranches() {
  return (
    <>
      {/* Natural Canopy View - Organic Branches Converging to Center */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-15 dark:opacity-8"
        viewBox="0 0 1200 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Bottom Left - Main organic branch reaching toward center */}
        <path
          d="M 0,1000 Q 80,920 140,840 Q 200,760 280,680 Q 360,600 420,540 Q 480,480 520,460 Q 550,440 580,430"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        {/* Sub-branches from bottom left main */}
        <path d="M 140,840 Q 180,800 220,760 Q 260,720 300,690" stroke="currentColor" strokeWidth="6" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 280,680 Q 320,660 360,640 Q 400,620 440,600" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 420,540 Q 450,520 480,510" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        {/* Twigs */}
        <path d="M 180,800 L 210,780" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 320,660 L 340,650" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 450,520 L 470,515" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Bottom Left Secondary */}
        <path
          d="M 50,980 Q 120,900 180,820 Q 240,740 300,670 Q 360,600 410,550 Q 460,500 500,470"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 180,820 Q 220,780 260,750" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        <path d="M 300,670 Q 340,640 380,620" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Bottom Right - Main organic branch */}
        <path
          d="M 1200,1000 Q 1120,920 1060,840 Q 1000,760 920,680 Q 840,600 780,540 Q 720,480 680,460 Q 650,440 620,430"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        {/* Sub-branches from bottom right main */}
        <path d="M 1060,840 Q 1020,800 980,760 Q 940,720 900,690" stroke="currentColor" strokeWidth="6" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 920,680 Q 880,660 840,640 Q 800,620 760,600" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 780,540 Q 750,520 720,510" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        {/* Twigs */}
        <path d="M 1020,800 L 990,780" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 880,660 L 860,650" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 750,520 L 730,515" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Bottom Right Secondary */}
        <path
          d="M 1150,980 Q 1080,900 1020,820 Q 960,740 900,670 Q 840,600 790,550 Q 740,500 700,470"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 1020,820 Q 980,780 940,750" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        <path d="M 900,670 Q 860,640 820,620" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Top Left - Main organic branch */}
        <path
          d="M 0,0 Q 80,80 140,160 Q 200,240 280,320 Q 360,400 420,460 Q 480,520 520,540 Q 550,560 580,570"
          stroke="currentColor"
          strokeWidth="11"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        {/* Sub-branches from top left main */}
        <path d="M 140,160 Q 180,200 220,240 Q 260,280 300,310" stroke="currentColor" strokeWidth="6" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 280,320 Q 320,340 360,360 Q 400,380 440,400" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 420,460 Q 450,480 480,490" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        {/* Twigs */}
        <path d="M 180,200 L 210,220" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 320,340 L 340,350" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 450,480 L 470,485" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Top Left Secondary */}
        <path
          d="M 50,20 Q 120,100 180,180 Q 240,260 300,330 Q 360,400 410,450 Q 460,500 500,530"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 180,180 Q 220,220 260,250" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        <path d="M 300,330 Q 340,360 380,380" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Top Right - Main organic branch */}
        <path
          d="M 1200,0 Q 1120,80 1060,160 Q 1000,240 920,320 Q 840,400 780,460 Q 720,520 680,540 Q 650,560 620,570"
          stroke="currentColor"
          strokeWidth="11"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.6"
        />
        {/* Sub-branches from top right main */}
        <path d="M 1060,160 Q 1020,200 980,240 Q 940,280 900,310" stroke="currentColor" strokeWidth="6" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 920,320 Q 880,340 840,360 Q 800,380 760,400" stroke="currentColor" strokeWidth="5" className="text-[var(--foreground)]" opacity="0.4" />
        <path d="M 780,460 Q 750,480 720,490" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        {/* Twigs */}
        <path d="M 1020,200 L 990,220" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 880,340 L 860,350" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 750,480 L 730,485" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Top Right Secondary */}
        <path
          d="M 1150,20 Q 1080,100 1020,180 Q 960,260 900,330 Q 840,400 790,450 Q 740,500 700,530"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 1020,180 Q 980,220 940,250" stroke="currentColor" strokeWidth="4" className="text-[var(--foreground)]" opacity="0.35" />
        <path d="M 900,330 Q 860,360 820,380" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Left Side branches - organic curves toward center */}
        <path
          d="M 0,350 Q 60,360 120,370 Q 180,390 240,410 Q 300,430 360,450 Q 420,470 480,485"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 120,370 Q 160,380 200,395" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 240,410 Q 280,425 320,440" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 0,500 Q 70,505 140,510 Q 210,520 280,530 Q 350,540 420,545 Q 490,550 550,550"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 140,510 Q 190,515 240,525" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 280,530 Q 330,535 380,540" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 0,650 Q 60,640 120,630 Q 180,610 240,590 Q 300,570 360,550 Q 420,530 480,515"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 120,630 Q 160,620 200,605" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Right Side branches - organic curves toward center */}
        <path
          d="M 1200,350 Q 1140,360 1080,370 Q 1020,390 960,410 Q 900,430 840,450 Q 780,470 720,485"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 1080,370 Q 1040,380 1000,395" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 960,410 Q 920,425 880,440" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 1200,500 Q 1130,505 1060,510 Q 990,520 920,530 Q 850,540 780,545 Q 710,550 650,550"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 1060,510 Q 1010,515 960,525" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 920,530 Q 870,535 820,540" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 1200,650 Q 1140,640 1080,630 Q 1020,610 960,590 Q 900,570 840,550 Q 780,530 720,515"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.5"
        />
        <path d="M 1080,630 Q 1040,620 1000,605" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Top branches curving down toward center */}
        <path
          d="M 350,0 Q 360,60 370,120 Q 385,180 400,240 Q 420,300 440,360 Q 465,420 490,470"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path d="M 370,120 Q 380,160 395,200" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 600,0 Q 605,70 610,140 Q 615,210 610,280 Q 600,350 585,420 Q 570,480 555,530"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.45"
        />
        <path d="M 610,140 Q 612,190 610,240" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 850,0 Q 840,60 830,120 Q 815,180 800,240 Q 780,300 760,360 Q 735,420 710,470"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path d="M 830,120 Q 820,160 805,200" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Bottom branches curving up toward center */}
        <path
          d="M 350,1000 Q 360,940 370,880 Q 385,820 400,760 Q 420,700 440,640 Q 465,580 490,530"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path d="M 370,880 Q 380,840 395,800" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 600,1000 Q 595,930 590,860 Q 585,790 590,720 Q 600,650 615,580 Q 630,520 645,470"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.45"
        />
        <path d="M 590,860 Q 588,810 590,760" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path
          d="M 850,1000 Q 840,940 830,880 Q 815,820 800,760 Q 780,700 760,640 Q 735,580 710,530"
          stroke="currentColor"
          strokeWidth="7"
          fill="none"
          className="text-[var(--foreground)]"
          opacity="0.4"
        />
        <path d="M 830,880 Q 820,840 805,800" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" opacity="0.3" />

        {/* Additional density - small branches */}
        <path d="M 100,250 Q 180,280 260,320 Q 340,360 420,400" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 1100,250 Q 1020,280 940,320 Q 860,360 780,400" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 100,750 Q 180,720 260,680 Q 340,640 420,600" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />
        <path d="M 1100,750 Q 1020,720 940,680 Q 860,640 780,600" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" opacity="0.3" />

        <path d="M 250,100 Q 330,180 410,260 Q 480,340 540,420" stroke="currentColor" strokeWidth="2.5" className="text-[var(--foreground)]" opacity="0.28" />
        <path d="M 950,100 Q 870,180 790,260 Q 720,340 660,420" stroke="currentColor" strokeWidth="2.5" className="text-[var(--foreground)]" opacity="0.28" />
        <path d="M 250,900 Q 330,820 410,740 Q 480,660 540,580" stroke="currentColor" strokeWidth="2.5" className="text-[var(--foreground)]" opacity="0.28" />
        <path d="M 950,900 Q 870,820 790,740 Q 720,660 660,580" stroke="currentColor" strokeWidth="2.5" className="text-[var(--foreground)]" opacity="0.28" />

        {/* Fine detail twigs */}
        <path d="M 150,400 L 200,430" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 1050,400 L 1000,430" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 150,600 L 200,570" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 1050,600 L 1000,570" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        <path d="M 300,150 L 340,200" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 900,150 L 860,200" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 300,850 L 340,800" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />
        <path d="M 900,850 L 860,800" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" opacity="0.25" />

        {/* Birds flying through canopy */}
        <g transform="translate(450, 420)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(750, 470)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(350, 580)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(850, 530)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(600, 380)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(520, 620)" opacity="0.3">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>
    </>
  )
}
