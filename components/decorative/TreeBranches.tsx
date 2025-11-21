'use client'

export function TreeBranches() {
  return (
    <>
      {/* Left Branch */}
      <svg
        className="fixed left-0 top-0 h-screen w-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 300 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch from top-left */}
        <path
          d="M 0,0 Q 50,100 80,200 T 120,400 Q 140,500 150,600 T 160,800 Q 165,900 170,1000"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Sub-branches */}
        <path
          d="M 80,200 Q 120,220 160,240 Q 200,260 240,280"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 120,400 Q 150,420 180,440"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 150,600 Q 180,610 210,620 Q 240,630 260,640"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Small twigs */}
        <path d="M 160,240 L 180,250" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 180,440 L 200,450" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 210,620 L 230,625" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

        {/* Birds on branches */}
        <g transform="translate(180, 250)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>

        <g transform="translate(230, 625)">
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-1.5" cy="-0.5" r="1" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -5,-0.5 Q -7,-2 -9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
          <path d="M 5,-0.5 Q 7,-2 9,-1" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>

      {/* Right Branch */}
      <svg
        className="fixed right-0 top-0 h-screen w-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 300 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main branch from top-right */}
        <path
          d="M 300,0 Q 250,100 220,200 T 180,400 Q 160,500 150,600 T 140,800 Q 135,900 130,1000"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Sub-branches */}
        <path
          d="M 220,200 Q 180,220 140,240 Q 100,260 60,280"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 180,400 Q 150,420 120,440"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 150,600 Q 120,610 90,620 Q 60,630 40,640"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Small twigs */}
        <path d="M 140,240 L 120,250" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 120,440 L 100,450" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 90,620 L 70,625" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

        {/* Birds on branches */}
        <g transform="translate(120, 250)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="2" cy="-1" r="1.5" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M 6,-1 Q 8,-3 10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
          <path d="M -6,-1 Q -8,-3 -10,-2" stroke="currentColor" strokeWidth="1" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>

      {/* Top Branch - Hanging down */}
      <svg
        className="fixed top-0 left-1/4 w-1/2 h-auto pointer-events-none z-10 opacity-20 dark:opacity-10"
        viewBox="0 0 800 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main horizontal branch */}
        <path
          d="M 0,50 Q 200,40 400,50 T 800,50"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Hanging branches */}
        <path
          d="M 150,50 Q 155,100 160,150 T 165,200"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 400,50 Q 405,80 410,110 T 415,140"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />
        <path
          d="M 650,50 Q 655,90 660,130 T 665,170"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-[var(--foreground)]"
        />

        {/* Small twigs */}
        <path d="M 160,150 L 170,160" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 410,110 L 420,115" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />
        <path d="M 660,130 L 670,135" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]" />

        {/* Bird on top branch */}
        <g transform="translate(300, 45)">
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="currentColor" className="text-[var(--foreground)]" />
          <circle cx="-2" cy="-1" r="2" fill="currentColor" className="text-[var(--foreground)]" />
          <path d="M -7,-1 Q -10,-4 -13,-2" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--foreground)]" />
          <path d="M 7,-1 Q 10,-4 13,-2" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--foreground)]" />
        </g>
      </svg>
    </>
  )
}
