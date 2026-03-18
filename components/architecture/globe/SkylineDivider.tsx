"use client";

import React from "react";

interface SkylineDividerProps {
  className?: string;
}

export default function SkylineDivider({ className }: SkylineDividerProps) {
  return (
    <div
      className={`w-full leading-none text-black/80 ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="80"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d={[
            // Start bottom-left
            "M 0 80",
            "L 0 62",

            // === Egyptian Pyramid ===
            // Flat approach
            "L 60 62",
            // Great pyramid
            "L 105 14",
            "L 150 62",
            // Smaller companion pyramid
            "L 170 62",
            "L 195 34",
            "L 220 62",

            // Gap before Greek temple
            "L 250 62",

            // === Greek Temple (Parthenon-style) ===
            // Left column base
            "L 250 42",
            // Left column
            "L 252 42",
            "L 252 32",
            // Architrave left
            "L 248 32",
            // Pediment (triangular gable)
            "L 248 30",
            "L 300 18",
            "L 352 30",
            // Architrave right
            "L 352 32",
            "L 348 32",
            // Right column
            "L 348 42",
            "L 350 42",
            "L 350 62",

            // Column details (thin notches to suggest columns)
            "M 268 62 L 268 33 L 272 33 L 272 62",
            "M 284 62 L 284 33 L 288 33 L 288 62",
            "M 300 62 L 300 33 L 304 33 L 304 62",
            "M 316 62 L 316 33 L 320 33 L 320 62",
            "M 332 62 L 332 33 L 336 33 L 336 62",

            // Resume main outline from right side of temple
            "M 350 62",

            // Gap
            "L 390 62",

            // === Roman Dome (Pantheon-style) ===
            // Left wall
            "L 390 38",
            // Dome - smooth arc using cubic bezier
            "C 390 38, 400 6, 450 6",
            "C 500 6, 510 38, 510 38",
            // Right wall
            "L 510 62",

            // Small portico at base
            "M 430 62 L 430 40 L 432 38 L 468 38 L 470 40 L 470 62",

            // Resume
            "M 510 62",

            // Gap
            "L 545 62",

            // === Gothic Cathedral with Spire ===
            // Left buttress
            "L 545 44",
            "L 550 44",
            // Left roof slope
            "L 550 30",
            // Central spire - tall and sharp
            "L 570 30",
            "L 572 22",
            "L 580 4",
            "L 588 22",
            "L 590 30",
            // Right roof slope
            "L 610 30",
            // Right buttress
            "L 610 44",
            "L 615 44",
            "L 615 62",

            // Rose window suggestion (small circle cutout area - just a notch)
            "M 570 62 L 570 34 L 590 34 L 590 62",

            // Resume
            "M 615 62",

            // Gap
            "L 660 62",

            // === Islamic Mosque with Minaret ===
            // Minaret (thin tall tower on left)
            "L 660 40",
            "L 662 40",
            "L 662 14",
            // Minaret cap - small pointed dome
            "L 660 14",
            "Q 661 8, 666 6",
            "Q 671 8, 672 14",
            "L 670 14",
            "L 670 40",
            "L 672 40",
            "L 672 62",

            // Gap to main dome
            "L 685 62",

            // Mosque body
            "L 685 38",
            // Main onion dome
            "Q 685 32, 690 22",
            "Q 695 10, 720 8",
            "Q 745 10, 750 22",
            "Q 755 32, 755 38",
            "L 755 62",

            // Second smaller minaret
            "L 762 62",
            "L 762 42",
            "L 764 42",
            "L 764 20",
            "L 762 20",
            "Q 763 14, 768 12",
            "Q 773 14, 774 20",
            "L 772 20",
            "L 772 42",
            "L 774 42",
            "L 774 62",

            // Gap
            "L 820 62",

            // === Modern Skyscrapers ===
            // Building 1 - medium office tower
            "L 820 30",
            "L 855 30",
            "L 855 62",

            // Small gap
            "L 860 62",

            // Building 2 - tall sleek tower with antenna
            "L 860 22",
            "L 870 22",
            "L 870 18",
            "L 872 18",
            "L 873 8",
            "L 874 18",
            "L 876 18",
            "L 876 22",
            "L 890 22",
            "L 890 62",

            // Small gap
            "L 893 62",

            // Building 3 - stepped/tapered tower
            "L 893 36",
            "L 910 36",
            "L 910 28",
            "L 925 28",
            "L 925 20",
            "L 935 20",
            "L 935 28",
            "L 950 28",
            "L 950 36",
            "L 967 36",
            "L 967 62",

            // Small gap
            "L 972 62",

            // Building 4 - wide short building
            "L 972 42",
            "L 1010 42",
            "L 1010 62",

            // Small gap
            "L 1015 62",

            // Building 5 - another tall tower with flat top
            "L 1015 18",
            "L 1050 18",
            "L 1050 62",

            // Small gap
            "L 1055 62",

            // Building 6 - curved top modern tower
            "L 1055 34",
            "Q 1055 14, 1075 14",
            "Q 1095 14, 1095 34",
            "L 1095 62",

            // Small gap
            "L 1100 62",

            // Building 7 - final narrow tower
            "L 1100 26",
            "L 1120 26",
            "L 1120 62",

            // Flat ground to edge
            "L 1200 62",
            "L 1200 80",
            "Z",
          ].join(" ")}
        />
      </svg>
    </div>
  );
}
