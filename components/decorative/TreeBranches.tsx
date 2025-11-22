'use client'

export function TreeBranches() {
  return (
    <>
      {/* Dense Chaotic Forest Canopy - Worm's-Eye View with Random Branches Everywhere */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-18 dark:opacity-10"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main cluster - upper left radiating */}
        <g opacity="0.8">
          <path d="M 380,480 Q 340,420 300,350 Q 260,280 210,200 Q 160,120 100,30 L 40,0" stroke="currentColor" strokeWidth="16" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 300,350 Q 250,320 200,280 Q 150,240 90,180 L 20,110" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 260,280 Q 220,250 180,210 L 120,150 L 60,80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 340,420 Q 290,380 240,340 L 170,270" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 210,200 Q 170,170 130,130 L 80,70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.7" />
        </g>

        {/* Twisted trunk - upper right */}
        <g opacity="0.75">
          <path d="M 620,520 Q 660,460 700,390 Q 740,320 780,240 Q 820,160 860,70 L 900,0" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 700,390 Q 740,360 780,320 Q 820,280 870,220 L 930,140" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 740,320 Q 780,290 820,250 L 880,180 L 950,100" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 660,460 Q 710,420 760,380 L 830,310" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Lower left sprawl */}
        <g opacity="0.7">
          <path d="M 420,550 Q 380,610 340,680 Q 300,750 250,830 Q 200,910 140,980 L 80,1000" stroke="currentColor" strokeWidth="15" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 340,680 Q 290,720 240,770 Q 190,820 130,880 L 60,940" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 300,750 Q 250,790 200,840 L 140,900 L 70,970" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 380,610 Q 330,650 280,700 L 210,760" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Lower right tangle */}
        <g opacity="0.72">
          <path d="M 580,530 Q 620,590 660,660 Q 700,730 750,810 Q 800,890 860,970 L 920,1000" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 660,660 Q 710,710 760,770 Q 810,830 870,900 L 940,970" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 700,730 Q 750,780 800,840 L 870,920" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 620,590 Q 670,640 720,700 L 790,780" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Off-center vertical trunk */}
        <g opacity="0.78">
          <path d="M 450,560 Q 440,490 430,410 Q 420,330 410,240 Q 400,150 390,50 L 380,0" stroke="currentColor" strokeWidth="17" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 430,410 Q 390,380 350,350 Q 310,320 260,280 L 200,230" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 430,410 Q 470,380 510,350 Q 550,320 600,280 L 660,230" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 410,240 Q 370,210 330,180 L 270,130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 410,240 Q 450,210 490,180 L 550,130" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Diagonal slash - top left to bottom right */}
        <g opacity="0.65">
          <path d="M 150,180 Q 250,280 350,380 Q 450,480 550,580 Q 650,680 750,780 L 850,880" stroke="currentColor" strokeWidth="11" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 250,280 Q 290,320 330,360 L 390,420" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 450,480 Q 490,520 530,560 L 590,620" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 650,680 Q 690,720 730,760 L 790,820" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Random branch cluster - mid right */}
        <g opacity="0.68">
          <path d="M 720,480 Q 760,440 800,390 L 860,320 L 920,240" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 760,440 Q 810,460 860,480 L 930,510" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 800,390 Q 840,370 880,350 L 940,320" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 720,480 Q 750,520 780,560 L 830,620" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Wild upper sweep */}
        <g opacity="0.71">
          <path d="M 550,500 Q 580,430 610,350 Q 640,270 670,180 L 700,80 L 730,0" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 610,350 Q 650,320 690,290 L 750,240" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 640,270 Q 620,230 600,190 L 570,130" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Lower mid sprawl */}
        <g opacity="0.69">
          <path d="M 480,580 Q 460,650 440,720 Q 420,790 400,870 L 380,950 L 360,1000" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 440,720 Q 400,750 360,780 L 300,830 L 230,890" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 440,720 Q 480,750 520,780 L 580,830 L 650,890" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 420,790 Q 460,820 500,850 L 560,900" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Far left vertical */}
        <g opacity="0.63">
          <path d="M 220,520 Q 200,450 180,370 Q 160,290 140,200 L 120,100 L 100,0" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 180,370 Q 140,340 100,310 L 40,260" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 160,290 Q 120,260 80,230 L 20,180" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Far right vertical */}
        <g opacity="0.66">
          <path d="M 820,510 Q 840,440 860,360 Q 880,280 900,190 L 920,90 L 940,0" stroke="currentColor" strokeWidth="11" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 860,360 Q 900,340 940,320 L 980,290" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 880,280 Q 920,250 960,220 L 1000,180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Chaotic mid-layer - background depth */}
        <g opacity="0.4">
          <path d="M 320,460 Q 280,400 240,330 Q 200,260 150,180 L 90,90" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 680,440 Q 720,380 760,310 Q 800,240 850,160 L 910,70" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 350,570 Q 310,640 270,710 Q 230,780 180,860 L 120,950" stroke="currentColor" strokeWidth="11" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 650,560 Q 690,630 730,700 Q 770,770 820,850 L 880,940" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,420 Q 540,360 580,290 L 630,200 L 680,100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 490,600 Q 450,670 410,740 L 360,820 L 300,910" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Dense twig layer - very background */}
        <g opacity="0.3">
          <path d="M 280,380 Q 240,340 200,300 L 150,250 L 100,200 L 50,150" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 720,370 Q 760,330 800,290 L 850,240 L 900,190 L 950,140" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 290,620 Q 250,670 210,720 L 160,780 L 110,840 L 60,900" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 710,610 Q 750,660 790,710 L 840,770 L 890,830 L 940,890" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 400,300 Q 450,250 500,200 L 560,140 L 620,80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 410,700 Q 460,750 510,800 L 570,860 L 630,920" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Random crossing branches */}
        <g opacity="0.5">
          <path d="M 100,400 Q 200,420 300,440 Q 400,460 500,480 Q 600,500 700,520 Q 800,540 900,560" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 120,600 Q 220,580 320,560 Q 420,540 520,520 Q 620,500 720,480 Q 820,460 920,440" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 200,250 Q 300,300 400,350 Q 500,400 600,450 L 700,500" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 180,750 Q 280,700 380,650 Q 480,600 580,550 L 680,500" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Extra random twigs scattered */}
        <g opacity="0.35">
          <path d="M 150,320 L 180,290 L 210,260 L 240,230" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 850,310 L 820,280 L 790,250 L 760,220" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 160,680 L 190,710 L 220,740 L 250,770" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 840,670 L 810,700 L 780,730 L 750,760" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 450,200 L 480,170 L 510,140 L 540,110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 440,800 L 470,830 L 500,860 L 530,890" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 310,450 L 340,480 L 370,510" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 690,460 L 660,490 L 630,520" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Additional scattered small branches */}
        <g opacity="0.45">
          <path d="M 270,510 Q 240,480 210,450 L 170,410" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 730,520 Q 760,490 790,460 L 830,420" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 380,280 Q 350,250 320,220 L 280,180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 620,290 Q 650,260 680,230 L 720,190" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 370,720 Q 340,750 310,780 L 270,820" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 630,710 Q 660,740 690,770 L 730,810" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Off-angle wild branches */}
        <g opacity="0.58">
          <path d="M 330,390 Q 370,350 410,310 Q 450,270 490,230 L 540,180 L 590,130" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 670,610 Q 630,650 590,690 Q 550,730 510,770 L 460,820 L 410,870" stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 180,540 Q 230,510 280,480 Q 330,450 380,420" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 820,460 Q 770,490 720,520 Q 670,550 620,580" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* More chaos - zigzag branches */}
        <g opacity="0.42">
          <path d="M 140,260 L 190,310 L 240,360 L 290,410 L 340,460" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 860,270 L 810,320 L 760,370 L 710,420 L 660,470" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 130,740 L 180,690 L 230,640 L 280,590 L 330,540" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 870,730 L 820,680 L 770,630 L 720,580 L 670,530" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* Birds flying through chaos */}
        <g opacity="0.45">
          <g transform="translate(280, 350)">
            <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(720, 380)">
            <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
            <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(450, 650)">
            <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
            <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(580, 280)">
            <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
            <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          </g>
          <g transform="translate(340, 720)">
            <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          </g>
        </g>
      </svg>
    </>
  )
}
