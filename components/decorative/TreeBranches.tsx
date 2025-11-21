'use client'

export function TreeBranches() {
  return (
    <>
      {/* Left Branch */}
      <svg
        className="fixed left-0 top-0 h-screen w-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 350 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch from top-left */}
        <path
          d="M 0,0 Q 50,100 80,200 T 120,400 Q 140,500 150,600 T 160,800 Q 165,900 170,1000"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Major sub-branches */}
        <path
          d="M 80,200 Q 120,220 160,240 Q 200,260 240,280 T 280,300"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 85,250 Q 115,260 145,270 Q 175,280 205,290"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 120,400 Q 150,420 180,440 Q 210,460 240,480"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 125,450 Q 155,465 185,480 Q 215,495 245,510"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 150,600 Q 180,610 210,620 Q 240,630 270,640 T 300,650"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 155,650 Q 185,660 215,670 Q 245,680 275,690"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Dense medium branches */}
        <path d="M 90,150 Q 120,160 150,170" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 100,350 Q 130,360 160,370" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 135,550 Q 165,560 195,570" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 145,700 Q 175,710 205,720" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 155,850 Q 185,860 215,870" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />

        {/* Many small twigs */}
        <path d="M 160,240 Q 175,245 190,250" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 145,270 L 165,278" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 205,290 L 225,298" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 180,440 Q 195,445 210,450" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 185,480 L 205,488" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 245,510 L 265,518" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 210,620 Q 225,623 240,626" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 270,640 L 290,646" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 215,670 L 235,676" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 150,170 L 165,177" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 160,370 L 175,377" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 195,570 L 210,577" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 205,720 L 220,727" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 215,870 L 230,877" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

        {/* Extra tiny twigs for density */}
        <path d="M 130,180 L 140,185" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 170,260 L 180,263" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 140,380 L 150,383" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 200,470 L 210,473" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 175,590 L 185,593" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 230,650 L 240,653" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 190,730 L 200,733" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 200,880 L 210,883" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

        {/* Birds on branches */}
        <g transform="translate(190, 250)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(240, 626)">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(165, 450)">
          <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(210, 720)">
          <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>

      {/* Right Branch */}
      <svg
        className="fixed right-0 top-0 h-screen w-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 350 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch from top-right */}
        <path
          d="M 350,0 Q 300,100 270,200 T 230,400 Q 210,500 200,600 T 190,800 Q 185,900 180,1000"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Major sub-branches */}
        <path
          d="M 270,200 Q 230,220 190,240 Q 150,260 110,280 T 70,300"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 265,250 Q 235,260 205,270 Q 175,280 145,290"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 230,400 Q 200,420 170,440 Q 140,460 110,480"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 225,450 Q 195,465 165,480 Q 135,495 105,510"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 200,600 Q 170,610 140,620 Q 110,630 80,640 T 50,650"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 195,650 Q 165,660 135,670 Q 105,680 75,690"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Dense medium branches */}
        <path d="M 260,150 Q 230,160 200,170" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 250,350 Q 220,360 190,370" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 215,550 Q 185,560 155,570" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 205,700 Q 175,710 145,720" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 195,850 Q 165,860 135,870" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />

        {/* Many small twigs */}
        <path d="M 190,240 Q 175,245 160,250" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 205,270 L 185,278" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 145,290 L 125,298" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 170,440 Q 155,445 140,450" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 165,480 L 145,488" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 105,510 L 85,518" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 140,620 Q 125,623 110,626" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 80,640 L 60,646" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 135,670 L 115,676" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 200,170 L 185,177" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 190,370 L 175,377" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 155,570 L 140,577" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 145,720 L 130,727" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 135,870 L 120,877" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

        {/* Extra tiny twigs for density */}
        <path d="M 220,180 L 210,185" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 180,260 L 170,263" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 210,380 L 200,383" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 150,470 L 140,473" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 175,590 L 165,593" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 120,650 L 110,653" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 160,730 L 150,733" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 150,880 L 140,883" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

        {/* Birds on branches */}
        <g transform="translate(160, 250)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(110, 626)">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(185, 450)">
          <ellipse cx="0" cy="0" rx="5.5" ry="3.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.8" cy="-0.8" r="1.2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 5.5,-0.8 Q 7.5,-2.5 9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
          <path d="M -5.5,-0.8 Q -7.5,-2.5 -9.5,-1.5" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(140, 720)">
          <ellipse cx="0" cy="0" rx="4.5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="1.2" cy="-0.6" r="0.9" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 4.5,-0.6 Q 6.5,-2 8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
          <path d="M -4.5,-0.6 Q -6.5,-2 -8,-1.2" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>

      {/* Top Branch - Hanging down */}
      <svg
        className="fixed top-0 left-1/4 w-1/2 h-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 800 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main horizontal branch */}
        <path
          d="M 0,50 Q 200,40 400,50 T 800,50"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Major hanging branches */}
        <path
          d="M 100,50 Q 105,90 110,130 T 115,180"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 150,50 Q 155,100 160,150 T 165,220 Q 168,250 170,280"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 250,50 Q 255,80 260,120 T 265,160"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 400,50 Q 405,80 410,110 T 415,160 Q 418,190 420,220"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 550,50 Q 555,85 560,125 T 565,165"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 650,50 Q 655,90 660,130 T 665,200 Q 668,230 670,260"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 700,50 Q 705,85 710,125 T 715,175"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Medium branches off main */}
        <path d="M 50,50 Q 55,75 60,100" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 325,50 Q 330,70 335,95" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 475,50 Q 480,75 485,100" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />
        <path d="M 750,50 Q 755,70 760,95" stroke="currentColor" strokeWidth="3" className="text-[var(--foreground)]" />

        {/* Small twigs off hanging branches */}
        <path d="M 110,130 L 120,135" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 115,180 L 105,185" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 160,150 L 170,160" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 165,220 L 155,225" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 170,280 L 180,285" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 260,120 L 270,125" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 265,160 L 255,165" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 410,110 L 420,115" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 415,160 L 425,165" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 420,220 L 410,225" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 560,125 L 570,130" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 565,165 L 555,170" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 660,130 L 670,135" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 665,200 L 655,205" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 670,260 L 680,265" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />
        <path d="M 710,125 L 720,130" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 715,175 L 705,180" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

        {/* Tiny twigs for extra density */}
        <path d="M 60,100 L 65,105" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 120,135 L 125,140" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 170,160 L 175,165" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 270,125 L 275,130" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 335,95 L 340,100" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 420,115 L 425,120" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 485,100 L 490,105" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 570,130 L 575,135" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 670,135 L 675,140" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 720,130 L 725,135" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        <path d="M 760,95 L 765,100" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

        {/* Birds on top branch */}
        <g transform="translate(200, 45)">
          <ellipse cx="0" cy="0" rx="6.5" ry="4.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="1.8" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6.5,-1 Q -9,-3.5 -12,-2" stroke="currentColor" strokeWidth="1.1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6.5,-1 Q 9,-3.5 12,-2" stroke="currentColor" strokeWidth="1.1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(300, 45)">
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -7,-1 Q -10,-4 -13,-2" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--foreground)]" />
          <path d="M 7,-1 Q 10,-4 13,-2" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(500, 45)">
          <ellipse cx="0" cy="0" rx="6.5" ry="4.5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="2" cy="-1" r="1.8" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 6.5,-1 Q 9,-3.5 12,-2" stroke="currentColor" strokeWidth="1.1" fill="none" className="text-[var(--foreground)]" />
          <path d="M -6.5,-1 Q -9,-3.5 -12,-2" stroke="currentColor" strokeWidth="1.1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(600, 45)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.5" cy="-0.8" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6,-0.8 Q -8.5,-3 -11,-1.8" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6,-0.8 Q 8.5,-3 11,-1.8" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>
    </>
  )
}
