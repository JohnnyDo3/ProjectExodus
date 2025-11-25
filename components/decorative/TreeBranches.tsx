'use client'

import { usePathname } from 'next/navigation'

// Golden Ratio: φ ≈ 1.618
// Golden Angle: 137.5° - natural branching angle found in plants
// Branch length reduction: 1/φ ≈ 0.618 at each level
// This creates natural, fractal-like branching patterns

export function TreeBranches() {
  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  // Don't render on hero page
  if (isHeroPage) {
    return null
  }

  return (
    <>
      {/* Ultra-Dense Forest Canopy - Golden Ratio Branching System */}
      {/* Worm's-Eye View: Looking up through converging branches */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-18 dark:opacity-10"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* TRUNK 1 - Upper Left Quadrant - PRIMARY with GOLDEN RATIO BRANCHING */}
        <g opacity="0.85">
          {/* Main trunk */}
          <path d="M 380,480 Q 340,420 300,350 Q 260,280 210,200 Q 160,120 100,30 L 40,0"
            stroke="currentColor" strokeWidth="18" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches (length / 1.618) */}
          <path d="M 300,350 Q 250,320 200,280 Q 150,240 90,180 L 20,110"
            stroke="currentColor" strokeWidth="11" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 260,280 Q 220,250 180,210 L 120,150 L 60,80"
            stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 340,420 Q 290,380 240,340 L 170,270 L 100,200"
            stroke="currentColor" strokeWidth="9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 210,200 Q 170,170 130,130 L 80,70 L 30,20"
            stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches (length / 1.618²) */}
          <path d="M 200,280 Q 175,260 150,235 L 120,200"
            stroke="currentColor" strokeWidth="6.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.75" />
          <path d="M 180,210 Q 160,185 140,160 L 115,130"
            stroke="currentColor" strokeWidth="6.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.75" />
          <path d="M 240,340 Q 215,310 190,280 L 160,245"
            stroke="currentColor" strokeWidth="5.6" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.72" />
          <path d="M 170,270 Q 145,240 120,210 L 90,175"
            stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.7" />
          <path d="M 130,130 Q 110,105 90,80 L 65,50"
            stroke="currentColor" strokeWidth="4.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />

          {/* Quaternary branches (twigs) */}
          <path d="M 150,235 L 135,215 L 120,195"
            stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.6" />
          <path d="M 140,160 L 125,145 L 110,130"
            stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.58" />
          <path d="M 190,280 L 175,265 L 160,250"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.56" />
          <path d="M 120,210 L 105,190 L 90,170"
            stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.54" />
          <path d="M 90,80 L 78,68 L 66,56"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.52" />

          {/* Fine twigs (5th level) */}
          <path d="M 135,215 L 127,205 L 119,195 L 111,185"
            stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.45" />
          <path d="M 125,145 L 118,137 L 111,129"
            stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.43" />
          <path d="M 175,265 L 167,254 L 159,243"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.41" />
        </g>

        {/* TRUNK 2 - Upper Right Quadrant - GOLDEN RATIO BRANCHING */}
        <g opacity="0.82">
          {/* Main trunk */}
          <path d="M 620,520 Q 660,460 700,390 Q 740,320 780,240 Q 820,160 860,70 L 900,0"
            stroke="currentColor" strokeWidth="17" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 700,390 Q 740,360 780,320 Q 820,280 870,220 L 930,140"
            stroke="currentColor" strokeWidth="10.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 740,320 Q 780,290 820,250 L 880,180 L 950,100"
            stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 660,460 Q 710,420 760,380 L 830,310 L 900,240"
            stroke="currentColor" strokeWidth="8.8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 780,240 Q 820,200 860,160 L 920,90"
            stroke="currentColor" strokeWidth="7.8" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 780,320 Q 805,295 830,270 L 860,240"
            stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.74" />
          <path d="M 820,250 Q 845,225 870,200 L 900,170"
            stroke="currentColor" strokeWidth="5.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.72" />
          <path d="M 760,380 Q 790,350 820,320 L 855,285"
            stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.7" />
          <path d="M 830,310 Q 860,280 890,250 L 925,215"
            stroke="currentColor" strokeWidth="5.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />
          <path d="M 860,160 Q 885,135 910,110 L 940,80"
            stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.66" />

          {/* Quaternary branches */}
          <path d="M 830,270 L 845,253 L 860,236"
            stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.58" />
          <path d="M 870,200 L 885,183 L 900,166"
            stroke="currentColor" strokeWidth="3.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.56" />
          <path d="M 820,320 L 835,305 L 850,290"
            stroke="currentColor" strokeWidth="3.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.54" />
          <path d="M 890,250 L 905,235 L 920,220"
            stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.52" />

          {/* Fine twigs */}
          <path d="M 845,253 L 853,244 L 861,235 L 869,226"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.44" />
          <path d="M 885,183 L 892,175 L 899,167"
            stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.42" />
        </g>

        {/* TRUNK 3 - Lower Left Quadrant - GOLDEN RATIO BRANCHING */}
        <g opacity="0.79">
          {/* Main trunk */}
          <path d="M 420,550 Q 380,610 340,680 Q 300,750 250,830 Q 200,910 140,980 L 80,1000"
            stroke="currentColor" strokeWidth="16" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 340,680 Q 290,720 240,770 Q 190,820 130,880 L 60,940"
            stroke="currentColor" strokeWidth="9.9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 300,750 Q 250,790 200,840 L 140,900 L 70,970"
            stroke="currentColor" strokeWidth="8.9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 380,610 Q 330,650 280,700 L 210,760 L 140,830"
            stroke="currentColor" strokeWidth="8.2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 250,830 Q 200,870 150,920 L 90,980"
            stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 240,770 Q 215,795 190,820 L 160,855"
            stroke="currentColor" strokeWidth="6.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.73" />
          <path d="M 200,840 Q 175,865 150,890 L 120,920"
            stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.71" />
          <path d="M 280,700 Q 255,725 230,750 L 200,780"
            stroke="currentColor" strokeWidth="5.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.69" />
          <path d="M 210,760 Q 185,785 160,810 L 130,840"
            stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.67" />
          <path d="M 150,920 Q 125,945 100,970 L 70,995"
            stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.65" />

          {/* Quaternary branches */}
          <path d="M 190,820 L 175,837 L 160,854"
            stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.57" />
          <path d="M 150,890 L 135,907 L 120,924"
            stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.55" />
          <path d="M 230,750 L 215,767 L 200,784"
            stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.53" />
          <path d="M 160,810 L 145,827 L 130,844"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.51" />

          {/* Fine twigs */}
          <path d="M 175,837 L 167,846 L 159,855 L 151,864"
            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.43" />
          <path d="M 135,907 L 128,915 L 121,923"
            stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.41" />
        </g>

        {/* TRUNK 4 - Lower Right Quadrant - GOLDEN RATIO BRANCHING */}
        <g opacity="0.81">
          {/* Main trunk */}
          <path d="M 580,530 Q 620,590 660,660 Q 700,730 750,810 Q 800,890 860,970 L 920,1000"
            stroke="currentColor" strokeWidth="15" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 660,660 Q 710,710 760,770 Q 810,830 870,900 L 940,970"
            stroke="currentColor" strokeWidth="9.3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 700,730 Q 750,780 800,840 L 870,920 L 950,990"
            stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 620,590 Q 670,640 720,700 L 790,780 L 870,870"
            stroke="currentColor" strokeWidth="7.9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 750,810 Q 800,860 850,920 L 910,985"
            stroke="currentColor" strokeWidth="7.2" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 760,770 Q 785,795 810,820 L 840,855"
            stroke="currentColor" strokeWidth="5.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.72" />
          <path d="M 800,840 Q 825,865 850,890 L 880,920"
            stroke="currentColor" strokeWidth="5.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.7" />
          <path d="M 720,700 Q 745,725 770,750 L 800,780"
            stroke="currentColor" strokeWidth="4.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />
          <path d="M 790,780 Q 815,805 840,830 L 870,860"
            stroke="currentColor" strokeWidth="4.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.66" />
          <path d="M 850,920 Q 875,945 900,970 L 930,995"
            stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.64" />

          {/* Quaternary branches */}
          <path d="M 810,820 L 825,837 L 840,854"
            stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.56" />
          <path d="M 850,890 L 865,907 L 880,924"
            stroke="currentColor" strokeWidth="3.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.54" />
          <path d="M 770,750 L 785,767 L 800,784"
            stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.52" />
          <path d="M 840,830 L 855,847 L 870,864"
            stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.5" />

          {/* Fine twigs */}
          <path d="M 825,837 L 833,846 L 841,855 L 849,864"
            stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.42" />
          <path d="M 865,907 L 872,915 L 879,923"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.4" />
        </g>

        {/* TRUNK 5 - Central Vertical - GOLDEN RATIO BRANCHING */}
        <g opacity="0.83">
          {/* Main trunk */}
          <path d="M 500,550 Q 495,480 490,400 Q 485,320 480,230 Q 475,140 470,40 L 465,0"
            stroke="currentColor" strokeWidth="19" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches - left side */}
          <path d="M 490,400 Q 450,370 410,340 Q 370,310 320,270 L 260,220"
            stroke="currentColor" strokeWidth="11.7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 485,320 Q 445,290 405,260 L 350,220 L 290,175"
            stroke="currentColor" strokeWidth="10.8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 480,230 Q 440,200 400,170 L 345,130"
            stroke="currentColor" strokeWidth="9.8" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches - right side */}
          <path d="M 490,400 Q 530,370 570,340 Q 610,310 660,270 L 720,220"
            stroke="currentColor" strokeWidth="11.7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 485,320 Q 525,290 565,260 L 620,220 L 680,175"
            stroke="currentColor" strokeWidth="10.8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 480,230 Q 520,200 560,170 L 615,130"
            stroke="currentColor" strokeWidth="9.8" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches - left */}
          <path d="M 410,340 Q 380,320 350,300 L 315,275"
            stroke="currentColor" strokeWidth="7.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.75" />
          <path d="M 405,260 Q 375,240 345,220 L 310,195"
            stroke="currentColor" strokeWidth="6.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.73" />
          <path d="M 400,170 Q 370,150 340,130 L 305,105"
            stroke="currentColor" strokeWidth="6.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.71" />

          {/* Tertiary branches - right */}
          <path d="M 570,340 Q 600,320 630,300 L 665,275"
            stroke="currentColor" strokeWidth="7.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.75" />
          <path d="M 565,260 Q 595,240 625,220 L 660,195"
            stroke="currentColor" strokeWidth="6.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.73" />
          <path d="M 560,170 Q 590,150 620,130 L 655,105"
            stroke="currentColor" strokeWidth="6.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.71" />

          {/* Quaternary branches */}
          <path d="M 350,300 L 335,285 L 320,270"
            stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.59" />
          <path d="M 345,220 L 330,205 L 315,190"
            stroke="currentColor" strokeWidth="4.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.57" />
          <path d="M 630,300 L 645,285 L 660,270"
            stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.59" />
          <path d="M 625,220 L 640,205 L 655,190"
            stroke="currentColor" strokeWidth="4.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.57" />

          {/* Fine twigs */}
          <path d="M 335,285 L 327,276 L 319,267 L 311,258"
            stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.45" />
          <path d="M 645,285 L 653,276 L 661,267 L 669,258"
            stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.45" />
        </g>

        {/* TRUNK 6 - Diagonal NW to SE - GOLDEN RATIO BRANCHING */}
        <g opacity="0.76">
          {/* Main trunk */}
          <path d="M 200,200 Q 280,280 360,360 Q 440,440 520,520 Q 600,600 680,680 L 760,760"
            stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 360,360 Q 380,410 400,460 L 430,530"
            stroke="currentColor" strokeWidth="8.7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 440,440 Q 430,490 420,540 L 405,610"
            stroke="currentColor" strokeWidth="7.9" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 520,520 Q 540,570 560,620 L 585,685"
            stroke="currentColor" strokeWidth="7.3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 600,600 Q 620,650 640,700 L 665,760"
            stroke="currentColor" strokeWidth="6.8" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 400,460 Q 415,485 430,510 L 450,540"
            stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.7" />
          <path d="M 420,540 Q 425,565 430,590 L 438,620"
            stroke="currentColor" strokeWidth="4.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />
          <path d="M 560,620 Q 575,645 590,670 L 610,700"
            stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.66" />
          <path d="M 640,700 Q 655,725 670,750 L 688,780"
            stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.64" />

          {/* Quaternary branches */}
          <path d="M 430,510 L 440,527 L 450,544"
            stroke="currentColor" strokeWidth="3.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.55" />
          <path d="M 590,670 L 600,687 L 610,704"
            stroke="currentColor" strokeWidth="2.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.53" />

          {/* Fine twigs */}
          <path d="M 440,527 L 446,537 L 452,547 L 458,557"
            stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.41" />
        </g>

        {/* TRUNK 7 - Diagonal NE to SW - GOLDEN RATIO BRANCHING */}
        <g opacity="0.77">
          {/* Main trunk */}
          <path d="M 800,200 Q 720,280 640,360 Q 560,440 480,520 Q 400,600 320,680 L 240,760"
            stroke="currentColor" strokeWidth="13.5" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 640,360 Q 620,410 600,460 L 570,530"
            stroke="currentColor" strokeWidth="8.3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 560,440 Q 570,490 580,540 L 595,610"
            stroke="currentColor" strokeWidth="7.6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 480,520 Q 460,570 440,620 L 415,685"
            stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 400,600 Q 380,650 360,700 L 335,760"
            stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 600,460 Q 585,485 570,510 L 550,540"
            stroke="currentColor" strokeWidth="5.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.69" />
          <path d="M 580,540 Q 575,565 570,590 L 562,620"
            stroke="currentColor" strokeWidth="4.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.67" />
          <path d="M 440,620 Q 425,645 410,670 L 390,700"
            stroke="currentColor" strokeWidth="4.3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.65" />
          <path d="M 360,700 Q 345,725 330,750 L 312,780"
            stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.63" />

          {/* Quaternary branches */}
          <path d="M 570,510 L 560,527 L 550,544"
            stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.54" />
          <path d="M 410,670 L 400,687 L 390,704"
            stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.52" />

          {/* Fine twigs */}
          <path d="M 560,527 L 554,537 L 548,547 L 542,557"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.4" />
        </g>

        {/* TRUNK 8 - Far Left Edge - GOLDEN RATIO BRANCHING */}
        <g opacity="0.74">
          {/* Main trunk */}
          <path d="M 120,500 Q 100,420 80,340 Q 60,260 40,170 L 20,80 L 5,0"
            stroke="currentColor" strokeWidth="12.5" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 80,340 Q 110,310 140,280 L 180,240"
            stroke="currentColor" strokeWidth="7.7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 60,260 Q 90,230 120,200 L 160,160"
            stroke="currentColor" strokeWidth="7.1" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 40,170 Q 70,140 100,110 L 140,70"
            stroke="currentColor" strokeWidth="6.6" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 140,280 Q 160,265 180,250 L 205,230"
            stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />
          <path d="M 120,200 Q 140,185 160,170 L 185,150"
            stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.66" />
          <path d="M 100,110 Q 120,95 140,80 L 165,60"
            stroke="currentColor" strokeWidth="4.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.64" />

          {/* Quaternary branches */}
          <path d="M 180,250 L 192,238 L 204,226"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.53" />
          <path d="M 160,170 L 172,158 L 184,146"
            stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.51" />

          {/* Fine twigs */}
          <path d="M 192,238 L 198,231 L 204,224 L 210,217"
            stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.39" />
        </g>

        {/* TRUNK 9 - Far Right Edge - GOLDEN RATIO BRANCHING */}
        <g opacity="0.75">
          {/* Main trunk */}
          <path d="M 880,500 Q 900,420 920,340 Q 940,260 960,170 L 980,80 L 995,0"
            stroke="currentColor" strokeWidth="12.5" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Secondary branches */}
          <path d="M 920,340 Q 890,310 860,280 L 820,240"
            stroke="currentColor" strokeWidth="7.7" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 940,260 Q 910,230 880,200 L 840,160"
            stroke="currentColor" strokeWidth="7.1" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 960,170 Q 930,140 900,110 L 860,70"
            stroke="currentColor" strokeWidth="6.6" strokeLinecap="round" className="text-[var(--foreground)]" />

          {/* Tertiary branches */}
          <path d="M 860,280 Q 840,265 820,250 L 795,230"
            stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.68" />
          <path d="M 880,200 Q 860,185 840,170 L 815,150"
            stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.66" />
          <path d="M 900,110 Q 880,95 860,80 L 835,60"
            stroke="currentColor" strokeWidth="4.1" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.64" />

          {/* Quaternary branches */}
          <path d="M 820,250 L 808,238 L 796,226"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.53" />
          <path d="M 840,170 L 828,158 L 816,146"
            stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.51" />

          {/* Fine twigs */}
          <path d="M 808,238 L 802,231 L 796,224 L 790,217"
            stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="text-[var(--foreground)]" opacity="0.39" />
        </g>

        {/* ADDITIONAL CHAOTIC MID-LAYER BRANCHES - Using golden ratio spacing */}
        <g opacity="0.62">
          <path d="M 300,500 Q 350,450 400,400 Q 450,350 500,300"
            stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 700,500 Q 650,450 600,400 Q 550,350 500,300"
            stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,700 Q 520,650 540,600 L 570,540"
            stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 500,300 Q 480,250 460,200 L 430,140"
            stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* FINE BACKGROUND TWIGS - Smallest branches */}
        <g opacity="0.38">
          <path d="M 250,400 L 270,380 L 290,360"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 750,400 L 730,380 L 710,360"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 400,650 L 420,630 L 440,610"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 600,650 L 580,630 L 560,610"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 350,250 L 365,235 L 380,220"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 650,250 L 635,235 L 620,220"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* CROSSING PATTERNS - Web-like interconnections */}
        <g opacity="0.42">
          <path d="M 200,600 Q 300,550 400,500 Q 500,450 600,400"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 800,600 Q 700,550 600,500 Q 500,450 400,400"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 300,800 Q 400,750 500,700"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
          <path d="M 700,800 Q 600,750 500,700"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-[var(--foreground)]" />
        </g>

        {/* BIRDS - Flying through the dense canopy */}
        <g opacity="0.48">
          {/* Bird 1 */}
          <g transform="translate(320, 420)">
            <ellipse cx="0" cy="0" rx="6" ry="3.7" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -6,-0.5 Q -8,-2.5 -10,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
            <path d="M 6,-0.5 Q 8,-2.5 10,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 2 */}
          <g transform="translate(680, 320)">
            <ellipse cx="0" cy="0" rx="5.5" ry="3.4" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.3" cy="-0.4" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5.5,-0.5 Q -7.5,-2.2 -9.5,-1.3" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5.5,-0.5 Q 7.5,-2.2 9.5,-1.3" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 3 */}
          <g transform="translate(500, 550)">
            <ellipse cx="0" cy="0" rx="6.2" ry="3.8" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.6" cy="-0.5" r="1.1" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -6.2,-0.6 Q -8.2,-2.8 -10.2,-1.6" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
            <path d="M 6.2,-0.6 Q 8.2,-2.8 10.2,-1.6" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 4 */}
          <g transform="translate(250, 650)">
            <ellipse cx="0" cy="0" rx="5" ry="3.1" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.2" cy="-0.4" r="0.85" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5,-0.4 Q -7,-2 -9,-1.2" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5,-0.4 Q 7,-2 9,-1.2" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 5 */}
          <g transform="translate(750, 600)">
            <ellipse cx="0" cy="0" rx="5.8" ry="3.6" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.4" cy="-0.5" r="0.95" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5.8,-0.5 Q -7.8,-2.5 -9.8,-1.4" stroke="currentColor" strokeWidth="0.85" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5.8,-0.5 Q 7.8,-2.5 9.8,-1.4" stroke="currentColor" strokeWidth="0.85" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 6 - Additional */}
          <g transform="translate(450, 250)">
            <ellipse cx="0" cy="0" rx="5.3" ry="3.3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.3" cy="-0.4" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5.3,-0.4 Q -7.3,-2.1 -9.3,-1.3" stroke="currentColor" strokeWidth="0.78" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5.3,-0.4 Q 7.3,-2.1 9.3,-1.3" stroke="currentColor" strokeWidth="0.78" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 7 - Additional */}
          <g transform="translate(180, 380)">
            <ellipse cx="0" cy="0" rx="4.8" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.2" cy="-0.4" r="0.8" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -4.8,-0.4 Q -6.8,-1.9 -8.8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
            <path d="M 4.8,-0.4 Q 6.8,-1.9 8.8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          </g>

          {/* Bird 8 - Additional */}
          <g transform="translate(820, 450)">
            <ellipse cx="0" cy="0" rx="5.5" ry="3.4" fill="currentColor" className="text-[var(--foreground)]" />
            <circle cx="-1.4" cy="-0.5" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
            <path d="M -5.5,-0.5 Q -7.5,-2.3 -9.5,-1.4" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
            <path d="M 5.5,-0.5 Q 7.5,-2.3 9.5,-1.4" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          </g>
        </g>
      </svg>
    </>
  )
}
