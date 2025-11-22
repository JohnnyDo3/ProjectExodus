'use client'

export function TreeBranches() {
  return (
    <>
      {/* Worm's-Eye View - Looking Up Through Forest Canopy */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-20 dark:opacity-12"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Tree 1 - Center-left trunk radiating upward-left */}
        <g opacity="0.7">
          {/* Main trunk */}
          <path
            d="M 450,550 Q 420,500 390,440 Q 360,380 320,310 Q 280,240 230,160 Q 180,80 120,0"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Major branches spreading left */}
          <path d="M 390,440 Q 350,420 310,390 Q 270,360 220,320 Q 170,280 100,230" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 320,310 Q 280,300 240,280 Q 200,260 150,230 Q 100,200 40,160" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 360,380 Q 320,360 280,340 Q 240,320 180,290 Q 120,260 50,220" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 280,240 Q 240,220 200,200 Q 160,180 100,150 L 40,120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 350,420 Q 300,400 250,380 L 180,350" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          {/* Twigs */}
          <path d="M 220,320 L 180,300 L 140,280" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
          <path d="M 310,390 L 270,370 L 230,350" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
        </g>

        {/* Tree 2 - Center-right trunk radiating upward-right */}
        <g opacity="0.7">
          {/* Main trunk */}
          <path
            d="M 550,550 Q 580,500 610,440 Q 640,380 680,310 Q 720,240 770,160 Q 820,80 880,0"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Major branches spreading right */}
          <path d="M 610,440 Q 650,420 690,390 Q 730,360 780,320 Q 830,280 900,230" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 680,310 Q 720,300 760,280 Q 800,260 850,230 Q 900,200 960,160" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 640,380 Q 680,360 720,340 Q 760,320 820,290 Q 880,260 950,220" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 720,240 Q 760,220 800,200 Q 840,180 900,150 L 960,120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 650,420 Q 700,400 750,380 L 820,350" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          {/* Twigs */}
          <path d="M 780,320 L 820,300 L 860,280" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
          <path d="M 690,390 L 730,370 L 770,350" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
        </g>

        {/* Tree 3 - Center-bottom trunk radiating downward-left */}
        <g opacity="0.65">
          {/* Main trunk */}
          <path
            d="M 480,520 Q 450,570 420,630 Q 390,690 350,760 Q 310,830 260,900 Q 210,970 150,1000"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Major branches */}
          <path d="M 420,630 Q 380,660 340,690 Q 300,720 250,760 Q 200,800 130,850" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 350,760 Q 310,780 270,810 Q 230,840 180,880 Q 130,920 60,970" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 390,690 Q 350,710 310,740 Q 270,770 210,810 L 140,860" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 310,830 Q 270,850 230,880 L 170,920" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 380,660 Q 340,680 300,710 L 240,750" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
        </g>

        {/* Tree 4 - Center-bottom trunk radiating downward-right */}
        <g opacity="0.65">
          {/* Main trunk */}
          <path
            d="M 520,520 Q 550,570 580,630 Q 610,690 650,760 Q 690,830 740,900 Q 790,970 850,1000"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Major branches */}
          <path d="M 580,630 Q 620,660 660,690 Q 700,720 750,760 Q 800,800 870,850" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 650,760 Q 690,780 730,810 Q 770,840 820,880 Q 870,920 940,970" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 610,690 Q 650,710 690,740 Q 730,770 790,810 L 860,860" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 690,830 Q 730,850 770,880 L 830,920" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 620,660 Q 660,680 700,710 L 760,750" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
        </g>

        {/* Tree 5 - Center-top trunk radiating upward */}
        <g opacity="0.75">
          {/* Main trunk */}
          <path
            d="M 500,580 Q 500,520 500,450 Q 500,380 500,300 Q 500,220 500,130 Q 500,60 500,0"
            stroke="currentColor"
            strokeWidth="15"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Branches spreading left and right */}
          <path d="M 500,450 Q 460,430 420,410 Q 380,390 330,360 Q 280,330 220,290" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,450 Q 540,430 580,410 Q 620,390 670,360 Q 720,330 780,290" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,300 Q 450,280 400,260 Q 350,240 280,210 L 200,170" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,300 Q 550,280 600,260 Q 650,240 720,210 L 800,170" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 500,380 Q 460,360 420,340 L 360,310" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 500,380 Q 540,360 580,340 L 640,310" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          {/* Twigs */}
          <path d="M 420,410 L 380,390 L 340,370" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
          <path d="M 580,410 L 620,390 L 660,370" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />
        </g>

        {/* Tree 6 - Center trunk radiating downward */}
        <g opacity="0.7">
          {/* Main trunk */}
          <path
            d="M 500,500 Q 500,560 500,630 Q 500,700 500,780 Q 500,860 500,930 Q 500,970 500,1000"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-[var(--foreground)]"
          />
          {/* Branches spreading left and right */}
          <path d="M 500,630 Q 460,650 420,670 Q 380,690 330,720 Q 280,750 220,790" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,630 Q 540,650 580,670 Q 620,690 670,720 Q 720,750 780,790" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,780 Q 450,800 400,820 Q 350,840 280,870 L 200,910" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,780 Q 550,800 600,820 Q 650,840 720,870 L 800,910" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Smaller branches */}
          <path d="M 500,700 Q 460,720 420,740 L 360,770" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 500,700 Q 540,720 580,740 L 640,770" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
        </g>

        {/* Additional depth layer - Background branches (more subtle) */}
        <g opacity="0.35">
          <path d="M 470,540 Q 420,480 370,420 Q 320,360 250,280 Q 180,200 90,100" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 530,540 Q 580,480 630,420 Q 680,360 750,280 Q 820,200 910,100" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 490,560 Q 440,620 390,680 Q 340,740 270,820 Q 200,900 110,980" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 510,560 Q 560,620 610,680 Q 660,740 730,820 Q 800,900 890,980" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Fine detail layer - Furthest branches (very subtle) */}
        <g opacity="0.25">
          <path d="M 460,530 Q 400,460 340,390 Q 280,320 200,230 L 120,140 L 40,50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 540,530 Q 600,460 660,390 Q 720,320 800,230 L 880,140 L 960,50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 470,570 Q 410,640 350,710 Q 290,780 210,870 L 130,950" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 530,570 Q 590,640 650,710 Q 710,780 790,870 L 870,950" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          {/* Cross branches */}
          <path d="M 300,400 Q 380,420 460,440 Q 540,460 620,480 Q 700,500 780,520" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 300,600 Q 380,580 460,560 Q 540,540 620,520 Q 700,500 780,480" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Birds flying through the canopy */}
        <g opacity="0.4">
          <g transform="translate(350, 300)">
            <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(650, 280)">
            <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
            <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(520, 700)">
            <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
            <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          </g>
        </g>
      </svg>
    </>
  )
}
