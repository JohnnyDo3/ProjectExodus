
// ═══════════════════════════════════════════════════════════════════════
// THEMED LAYOUT CONFIGS
// Two-layer depth system with z-axis perspective (top = back of tank):
//   midground  (z-12): plants rooted at back sand (baseY=240) + structures (same SVG for correct layering)
//   foreground (z-25): rocks, corals, aquatic plants at front glass (baseY=305) — scaled ~2.5x for prominence
// ═══════════════════════════════════════════════════════════════════════

interface LayeredDecoConfig {
  sandColors?: { color: string; lighter: string; detail: string }
  background: {
    kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  }
  midground: {
    structures: Array<{ type: string; x: number; y: number; scale?: number }>
  }
  foreground: {
    rocks: Array<{ x: number; y: number; variant: 'small' | 'medium' | 'large'; color: string }>
    corals: Array<{ x: number; y: number; variant: 'branch' | 'brain' | 'fan'; color: string }>
    kelps: Array<{ x: number; height: number; variant: 'thin' | 'wide' | 'bushy'; color: string; delay: number }>
  }
}

const OCEAN_LAYOUT: LayeredDecoConfig = {
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 32, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 45, height: 140, variant: 'bushy', color: '#1B5E20', delay: 0.2 },
      // Left-center wide cluster
      { x: 65, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 80, height: 145, variant: 'wide', color: '#4CAF50', delay: 0.9 },
      { x: 95, height: 155, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Thin grass blades transition
      { x: 115, height: 170, variant: 'thin', color: '#43A047', delay: 1.1 },
      { x: 125, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 135, height: 160, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 148, height: 140, variant: 'thin', color: '#4CAF50', delay: 1.3 },
      // Mid-left bushy patch
      { x: 370, height: 165, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 385, height: 150, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 400, height: 170, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      // Mid wide cluster
      { x: 420, height: 155, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 435, height: 140, variant: 'wide', color: '#4CAF50', delay: 1.0 },
      { x: 450, height: 150, variant: 'wide', color: '#388E3C', delay: 0.7 },
      // Mid thin grass
      { x: 470, height: 160, variant: 'thin', color: '#43A047', delay: 1.4 },
      { x: 480, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      // Right bushy cluster
      { x: 690, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 705, height: 155, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      { x: 718, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Right wide cluster
      { x: 738, height: 150, variant: 'wide', color: '#388E3C', delay: 0.8 },
      { x: 752, height: 140, variant: 'wide', color: '#4CAF50', delay: 1.2 },
      // Right thin grass
      { x: 770, height: 160, variant: 'thin', color: '#43A047', delay: 1.6 },
      { x: 782, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.4 },
      { x: 793, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.9 },
    ],
  },
  midground: {
    structures: [
      { type: 'coral-arch', x: 180, y: 114 },
      { type: 'sunken-temple', x: 500, y: 140 },
    ],
  },
  foreground: {
    rocks: [
      { x: 42, y: 254, variant: 'medium', color: '#78716C' },
      { x: 350, y: 268, variant: 'small', color: '#6B7280' },
      { x: 692, y: 272, variant: 'small', color: '#78716C' },
      { x: 160, y: 266, variant: 'small', color: '#57534E' },
    ],
    corals: [
      { x: 73, y: 240, variant: 'branch', color: '#E91E63' },
      { x: 200, y: 248, variant: 'fan', color: '#AB47BC' },
      { x: 328, y: 258, variant: 'brain', color: '#AB47BC' },
      { x: 448, y: 242, variant: 'fan', color: '#FF5722' },
      { x: 560, y: 252, variant: 'branch', color: '#E91E63' },
      { x: 740, y: 250, variant: 'branch', color: '#F06292' },
    ],
    kelps: [
      // Left cluster — thin Vallisneria group near glass edge
      { x: 8, height: 36, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 18, height: 30, variant: 'thin', color: '#4CAF50', delay: 0.7 },
      { x: 28, height: 34, variant: 'thin', color: '#388E3C', delay: 0.4 },
      // Left-center cluster — Amazon Sword rosettes
      { x: 95, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.3 },
      { x: 108, height: 30, variant: 'wide', color: '#1B5E20', delay: 0.8 },
      // --- open swim lane ---
      // Center-left — thin grass accent
      { x: 270, height: 26, variant: 'thin', color: '#43A047', delay: 0.4 },
      { x: 280, height: 30, variant: 'thin', color: '#388E3C', delay: 1.0 },
      // --- open swim lane ---
      // Center-right — wide Amazon Swords
      { x: 530, height: 36, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 542, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.3 },
      // Right cluster — thin Vallisneria carpet
      { x: 690, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 700, height: 30, variant: 'thin', color: '#43A047', delay: 0.7 },
      { x: 710, height: 34, variant: 'thin', color: '#1B5E20', delay: 1.6 },
    ],
  },
}

const TROPICAL_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#D4A43A', lighter: '#E8C468', detail: '#B8862D' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 180, variant: 'bushy', color: '#00C853', delay: 0 },
      { x: 18, height: 160, variant: 'bushy', color: '#00BFA5', delay: 0.4 },
      { x: 32, height: 170, variant: 'bushy', color: '#00C853', delay: 0.8 },
      { x: 45, height: 145, variant: 'bushy', color: '#00BFA5', delay: 0.2 },
      // Left wide cluster
      { x: 65, height: 165, variant: 'wide', color: '#00E676', delay: 0.5 },
      { x: 78, height: 150, variant: 'wide', color: '#00E676', delay: 1.0 },
      { x: 92, height: 155, variant: 'wide', color: '#64DD17', delay: 0.7 },
      // Left thin grass
      { x: 110, height: 175, variant: 'thin', color: '#76FF03', delay: 0.9 },
      { x: 120, height: 155, variant: 'thin', color: '#64DD17', delay: 0.3 },
      { x: 130, height: 165, variant: 'thin', color: '#76FF03', delay: 1.2 },
      { x: 142, height: 145, variant: 'thin', color: '#00E676', delay: 0.6 },
      // Right bushy cluster
      { x: 650, height: 170, variant: 'bushy', color: '#00C853', delay: 0.4 },
      { x: 663, height: 155, variant: 'bushy', color: '#00BFA5', delay: 0.9 },
      { x: 676, height: 165, variant: 'bushy', color: '#00C853', delay: 0.2 },
      { x: 690, height: 145, variant: 'bushy', color: '#00BFA5', delay: 0.7 },
      // Right wide cluster
      { x: 710, height: 160, variant: 'wide', color: '#76FF03', delay: 0.8 },
      { x: 723, height: 145, variant: 'wide', color: '#00E676', delay: 1.3 },
      { x: 736, height: 155, variant: 'wide', color: '#64DD17', delay: 0.5 },
      // Right thin grass
      { x: 755, height: 170, variant: 'thin', color: '#76FF03', delay: 1.1 },
      { x: 767, height: 150, variant: 'thin', color: '#00E676', delay: 0.3 },
      { x: 778, height: 160, variant: 'thin', color: '#64DD17', delay: 0.6 },
      { x: 790, height: 145, variant: 'thin', color: '#00C853', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'volcano', x: 140, y: 120 },
      { type: 'dragon-stone', x: 480, y: 138 },
    ],
  },
  foreground: {
    rocks: [
      { x: 88, y: 273, variant: 'small', color: '#A8A29E' },
      { x: 590, y: 253, variant: 'medium', color: '#78716C' },
    ],
    corals: [
      { x: 112, y: 240, variant: 'branch', color: '#FF6D00' },
      { x: 238, y: 258, variant: 'brain', color: '#FF4081' },
      { x: 302, y: 242, variant: 'fan', color: '#FF1744' },
      { x: 572, y: 249, variant: 'branch', color: '#FF9100' },
    ],
    kelps: [
      // Left cluster — bushy Rotala group
      { x: 8, height: 36, variant: 'bushy', color: '#69F0AE', delay: 0.2 },
      { x: 22, height: 30, variant: 'bushy', color: '#00E676', delay: 0.6 },
      // Left-mid — wide sword pair
      { x: 90, height: 30, variant: 'wide', color: '#00E676', delay: 1.3 },
      { x: 104, height: 36, variant: 'wide', color: '#76FF03', delay: 0.4 },
      // --- open swim lane ---
      // Center-left — thin Vallisneria trio
      { x: 250, height: 36, variant: 'thin', color: '#69F0AE', delay: 1.0 },
      { x: 260, height: 30, variant: 'thin', color: '#00E676', delay: 1.7 },
      { x: 270, height: 34, variant: 'thin', color: '#B9F6CA', delay: 0.8 },
      // --- open swim lane ---
      // Right-mid — wide swords near rock
      { x: 510, height: 36, variant: 'wide', color: '#69F0AE', delay: 0.5 },
      { x: 524, height: 30, variant: 'wide', color: '#76FF03', delay: 1.4 },
      // Right cluster — thin grass carpet
      { x: 700, height: 30, variant: 'thin', color: '#00E676', delay: 0.3 },
      { x: 710, height: 36, variant: 'thin', color: '#69F0AE', delay: 0.9 },
      { x: 720, height: 26, variant: 'thin', color: '#B9F6CA', delay: 1.6 },
    ],
  },
}

const SHIPWRECK_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8B7355', lighter: '#A08B6C', detail: '#6B5B45' },
  background: {
    kelps: [
      // Behind ship — tall plants visible around the wreck
      { x: 40, height: 180, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 55, height: 165, variant: 'bushy', color: '#1B5E20', delay: 0.7 },
      { x: 72, height: 175, variant: 'wide', color: '#33691E', delay: 0.4 },
      { x: 90, height: 155, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 108, height: 170, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      { x: 125, height: 160, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 145, height: 175, variant: 'bushy', color: '#33691E', delay: 0.3 },
      { x: 165, height: 150, variant: 'thin', color: '#558B2F', delay: 1.2 },
      { x: 185, height: 165, variant: 'wide', color: '#1B5E20', delay: 0.6 },
      { x: 205, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 225, height: 170, variant: 'thin', color: '#33691E', delay: 1.4 },
      // Mid bushy cluster 2
      { x: 360, height: 160, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 373, height: 145, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      { x: 386, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Mid wide cluster
      { x: 400, height: 150, variant: 'wide', color: '#33691E', delay: 1.1 },
      { x: 413, height: 140, variant: 'wide', color: '#558B2F', delay: 0.6 },
      // Thin near treasure
      { x: 430, height: 165, variant: 'thin', color: '#1B5E20', delay: 0.7 },
      { x: 440, height: 148, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      // Right bushy cluster
      { x: 530, height: 170, variant: 'bushy', color: '#2E7D32', delay: 1.5 },
      { x: 543, height: 150, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 556, height: 160, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      // Right wide
      { x: 590, height: 155, variant: 'wide', color: '#558B2F', delay: 1.8 },
      { x: 603, height: 145, variant: 'wide', color: '#2E7D32', delay: 0.2 },
    ],
  },
  midground: {
    structures: [
      { type: 'shipwreck', x: 40, y: 122 },
      { type: 'treasure', x: 640, y: 146 },
    ],
  },
  foreground: {
    rocks: [
      { x: 24, y: 244, variant: 'large', color: '#57534E' },
      { x: 693, y: 266, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 308, y: 243, variant: 'branch', color: '#6D4C41' },
      { x: 500, y: 260, variant: 'brain', color: '#795548' },
      { x: 760, y: 241, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Ship-adjacent plants — in front of ship, fish swim behind these
      // Left wide cluster (flanking ship)
      { x: 5, height: 40, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 18, height: 36, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 32, height: 38, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster (near ship bow)
      { x: 50, height: 42, variant: 'bushy', color: '#33691E', delay: 0.4 },
      { x: 63, height: 36, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 76, height: 40, variant: 'bushy', color: '#33691E', delay: 0.6 },
      // Near-wreck cluster — sparse thin grass (damaged area)
      { x: 155, height: 30, variant: 'thin', color: '#558B2F', delay: 0.9 },
      { x: 165, height: 34, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      // Scattered thin near wreck stern
      { x: 210, height: 32, variant: 'thin', color: '#558B2F', delay: 0.9 },
      { x: 222, height: 28, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 234, height: 34, variant: 'thin', color: '#558B2F', delay: 0.7 },
      // Mid bushy cluster
      { x: 270, height: 38, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 283, height: 34, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      // Mid-left — wide swords cluster
      { x: 310, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.3 },
      { x: 324, height: 30, variant: 'wide', color: '#33691E', delay: 0.7 },
      // --- open swim lane ---
      // Center — thin grass patch
      { x: 455, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 465, height: 36, variant: 'thin', color: '#33691E', delay: 1.5 },
      { x: 475, height: 26, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      // --- open swim lane ---
      // Right cluster — wide swords near treasure
      { x: 695, height: 30, variant: 'wide', color: '#558B2F', delay: 0.4 },
      { x: 708, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      // Far right edge — thin accent
      { x: 755, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
    ],
  },
}

const SAILBOAT_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#B89B52' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 45, height: 140, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      // Left wide cluster
      { x: 65, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 78, height: 145, variant: 'wide', color: '#4CAF50', delay: 1.0 },
      { x: 92, height: 150, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Left thin grass
      { x: 112, height: 165, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 122, height: 148, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 132, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.3 },
      { x: 142, height: 140, variant: 'thin', color: '#43A047', delay: 1.5 },
      // Right bushy cluster
      { x: 610, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 623, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.7 },
      { x: 636, height: 165, variant: 'bushy', color: '#2E7D32', delay: 1.1 },
      { x: 650, height: 145, variant: 'bushy', color: '#1B5E20', delay: 0.4 },
      // Right wide cluster
      { x: 670, height: 160, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 683, height: 148, variant: 'wide', color: '#4CAF50', delay: 0.2 },
      { x: 696, height: 155, variant: 'wide', color: '#388E3C', delay: 1.4 },
      // Right thin grass
      { x: 720, height: 165, variant: 'thin', color: '#43A047', delay: 0.7 },
      { x: 732, height: 150, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 744, height: 155, variant: 'thin', color: '#4CAF50', delay: 0.5 },
      { x: 758, height: 140, variant: 'thin', color: '#43A047', delay: 1.7 },
      { x: 770, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'sailboat', x: 350, y: 210, scale: 1.3 },
    ],
  },
  foreground: {
    rocks: [
      { x: 72, y: 255, variant: 'medium', color: '#78716C' },
      { x: 695, y: 268, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 192, y: 242, variant: 'branch', color: '#FF6D00' },
      { x: 700, y: 256, variant: 'fan', color: '#FF8A65' },
      { x: 575, y: 244, variant: 'brain', color: '#FFAB91' },
    ],
    kelps: [
      // Left edge — thin Vallisneria cluster
      { x: 8, height: 30, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 18, height: 36, variant: 'thin', color: '#4CAF50', delay: 0.6 },
      { x: 28, height: 26, variant: 'thin', color: '#388E3C', delay: 1.2 },
      // Left-center — wide Amazon Sword pair
      { x: 155, height: 36, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 168, height: 30, variant: 'wide', color: '#43A047', delay: 1.0 },
      // --- open swim lane ---
      // Center — bushy Rotala accent
      { x: 375, height: 36, variant: 'bushy', color: '#43A047', delay: 1.6 },
      { x: 388, height: 30, variant: 'bushy', color: '#388E3C', delay: 0.8 },
      // --- open swim lane ---
      // Right — thin grass cluster
      { x: 645, height: 30, variant: 'thin', color: '#2E7D32', delay: 1.4 },
      { x: 655, height: 36, variant: 'thin', color: '#4CAF50', delay: 0.3 },
      { x: 665, height: 26, variant: 'thin', color: '#388E3C', delay: 0.9 },
    ],
  },
}

const SUBMARINE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#5C5C5C', lighter: '#787878', detail: '#454545' },
  background: {
    kelps: [
      // Left wide cluster
      { x: 5, height: 165, variant: 'wide', color: '#1B5E20', delay: 0 },
      { x: 18, height: 148, variant: 'wide', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 155, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster
      { x: 50, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      { x: 63, height: 150, variant: 'bushy', color: '#33691E', delay: 0.9 },
      { x: 76, height: 160, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      // Left thin grass
      { x: 95, height: 155, variant: 'thin', color: '#33691E', delay: 0.8 },
      { x: 105, height: 140, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 115, height: 148, variant: 'thin', color: '#33691E', delay: 0.3 },
      // Right thin cluster
      { x: 600, height: 160, variant: 'thin', color: '#33691E', delay: 0.3 },
      { x: 610, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 622, height: 155, variant: 'thin', color: '#33691E', delay: 0.5 },
      // Right bushy cluster
      { x: 640, height: 170, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 653, height: 150, variant: 'bushy', color: '#33691E', delay: 1.0 },
      { x: 666, height: 162, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 680, height: 145, variant: 'bushy', color: '#33691E', delay: 0.7 },
      // Right wide cluster
      { x: 700, height: 160, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 713, height: 148, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 726, height: 155, variant: 'wide', color: '#1B5E20', delay: 1.5 },
      // Far right thin
      { x: 748, height: 165, variant: 'thin', color: '#2E7D32', delay: 0.9 },
      { x: 758, height: 148, variant: 'thin', color: '#33691E', delay: 0.2 },
    ],
  },
  midground: {
    structures: [
      { type: 'submarine', x: 280, y: 140, scale: 1.3 },
    ],
  },
  foreground: {
    rocks: [
      { x: 58, y: 244, variant: 'large', color: '#44403C' },
      { x: 688, y: 266, variant: 'medium', color: '#44403C' },
    ],
    corals: [
      { x: 152, y: 258, variant: 'brain', color: '#795548' },
      { x: 660, y: 241, variant: 'branch', color: '#6D4C41' },
      { x: 750, y: 255, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Left edge — thin grass pair (sparse, industrial feel)
      { x: 15, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 25, height: 26, variant: 'thin', color: '#33691E', delay: 0.7 },
      // Near brain coral — wide swords
      { x: 125, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 138, height: 30, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      // --- open swim lane ---
      // Mid — sparse thin cluster
      { x: 370, height: 30, variant: 'thin', color: '#1B5E20', delay: 0.5 },
      { x: 380, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.8 },
      { x: 390, height: 26, variant: 'thin', color: '#33691E', delay: 0.9 },
      // --- open swim lane ---
      // Right — wide pair near fan coral
      { x: 635, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      { x: 648, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.2 },
      // Far right — thin accent
      { x: 760, height: 30, variant: 'thin', color: '#2E7D32', delay: 1.6 },
    ],
  },
}

const MINIMAL_LAYOUT: LayeredDecoConfig = {
  background: {
    kelps: [
      // Naturally scattered background — irregular spacing, varied density, organic feel
      // Left sparse cluster
      { x: 3, height: 175, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 14, height: 158, variant: 'thin', color: '#388E3C', delay: 0.6 },
      { x: 28, height: 182, variant: 'bushy', color: '#33691E', delay: 1.1 },
      // Gap — open space
      { x: 52, height: 145, variant: 'wide', color: '#4CAF50', delay: 0.3 },
      // Sparse singles
      { x: 78, height: 168, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 95, height: 155, variant: 'bushy', color: '#388E3C', delay: 0.2 },
      // Dense patch — left of rock formation
      { x: 118, height: 178, variant: 'wide', color: '#33691E', delay: 1.4 },
      { x: 128, height: 162, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 140, height: 172, variant: 'wide', color: '#4CAF50', delay: 0.9 },
      { x: 150, height: 148, variant: 'thin', color: '#388E3C', delay: 1.6 },
      { x: 162, height: 170, variant: 'bushy', color: '#33691E', delay: 0.3 },
      // Sparse behind structures
      { x: 195, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 215, height: 180, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      // Mid gap — let structures breathe
      { x: 268, height: 150, variant: 'wide', color: '#43A047', delay: 0.4 },
      { x: 290, height: 165, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      // Right of log area — dense natural patch
      { x: 365, height: 175, variant: 'bushy', color: '#388E3C', delay: 0.6 },
      { x: 378, height: 155, variant: 'wide', color: '#33691E', delay: 1.3 },
      { x: 395, height: 168, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      // Scattered mid-right
      { x: 432, height: 158, variant: 'bushy', color: '#4CAF50', delay: 0.8 },
      { x: 460, height: 172, variant: 'wide', color: '#2E7D32', delay: 1.5 },
      { x: 478, height: 148, variant: 'thin', color: '#388E3C', delay: 0.4 },
      // Dense cluster right
      { x: 520, height: 180, variant: 'bushy', color: '#33691E', delay: 0.9 },
      { x: 532, height: 162, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 548, height: 175, variant: 'wide', color: '#388E3C', delay: 1.1 },
      // Gap
      { x: 585, height: 155, variant: 'thin', color: '#43A047', delay: 0.7 },
      // Sparse right
      { x: 618, height: 168, variant: 'bushy', color: '#2E7D32', delay: 1.4 },
      { x: 645, height: 150, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 672, height: 175, variant: 'thin', color: '#388E3C', delay: 0.2 },
      // Dense far right
      { x: 705, height: 182, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 718, height: 158, variant: 'wide', color: '#4CAF50', delay: 1.2 },
      { x: 738, height: 170, variant: 'thin', color: '#33691E', delay: 0.6 },
      { x: 755, height: 148, variant: 'bushy', color: '#388E3C', delay: 1.0 },
      // Far edge singles
      { x: 778, height: 162, variant: 'wide', color: '#2E7D32', delay: 0.3 },
      { x: 794, height: 155, variant: 'thin', color: '#33691E', delay: 1.5 },
    ],
  },
  midground: {
    structures: [
      { type: 'rock-formation', x: 120, y: 158, scale: 1.8 },
      { type: 'driftwood', x: 420, y: 200, scale: 1.6 },
    ],
  },
  foreground: {
    rocks: [
      { x: 47, y: 270, variant: 'small', color: '#78716C' },
      { x: 295, y: 262, variant: 'medium', color: '#6B7280' },
      { x: 518, y: 275, variant: 'small', color: '#57534E' },
      { x: 710, y: 250, variant: 'medium', color: '#78716C' },
      { x: 165, y: 272, variant: 'small', color: '#6B7280' },
    ],
    corals: [
      { x: 55, y: 248, variant: 'branch', color: '#81C784' },
      { x: 342, y: 255, variant: 'fan', color: '#A5D6A7' },
      { x: 580, y: 243, variant: 'branch', color: '#81C784' },
      { x: 752, y: 258, variant: 'fan', color: '#A5D6A7' },
    ],
    kelps: [
      // Naturally scattered foreground — irregular gaps, mixed species
      { x: 8, height: 36, variant: 'bushy', color: '#4CAF50', delay: 0.3 },
      { x: 42, height: 28, variant: 'thin', color: '#2E7D32', delay: 1.1 },
      { x: 75, height: 38, variant: 'wide', color: '#43A047', delay: 0.5 },
      // Gap
      { x: 148, height: 30, variant: 'thin', color: '#388E3C', delay: 0.8 },
      { x: 195, height: 36, variant: 'bushy', color: '#33691E', delay: 1.4 },
      // Gap
      { x: 262, height: 32, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      { x: 310, height: 26, variant: 'thin', color: '#4CAF50', delay: 0.9 },
      { x: 338, height: 40, variant: 'bushy', color: '#388E3C', delay: 0.6 },
      // Sparse around log
      { x: 465, height: 28, variant: 'thin', color: '#33691E', delay: 1.2 },
      { x: 510, height: 36, variant: 'wide', color: '#43A047', delay: 0.4 },
      // Gap
      { x: 575, height: 32, variant: 'bushy', color: '#2E7D32', delay: 1.0 },
      { x: 622, height: 38, variant: 'wide', color: '#4CAF50', delay: 0.7 },
      // Gap
      { x: 688, height: 30, variant: 'thin', color: '#388E3C', delay: 0.3 },
      { x: 735, height: 36, variant: 'bushy', color: '#33691E', delay: 1.5 },
      { x: 775, height: 28, variant: 'wide', color: '#2E7D32', delay: 0.8 },
    ],
  },
}

const CASTLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#6B6B6B', lighter: '#8A8A8A', detail: '#5A5A5A' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 170, variant: 'bushy', color: '#1B5E20', delay: 0 },
      { x: 18, height: 150, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 32, height: 162, variant: 'bushy', color: '#1B5E20', delay: 0.2 },
      { x: 45, height: 140, variant: 'bushy', color: '#33691E', delay: 0.8 },
      // Left wide cluster
      { x: 65, height: 155, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 78, height: 142, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      { x: 92, height: 150, variant: 'wide', color: '#2E7D32', delay: 0.6 },
      // Left thin cluster
      { x: 112, height: 160, variant: 'thin', color: '#33691E', delay: 0.9 },
      { x: 122, height: 145, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 132, height: 152, variant: 'thin', color: '#33691E', delay: 0.3 },
      // Mid thin cluster
      { x: 370, height: 160, variant: 'thin', color: '#33691E', delay: 0.3 },
      { x: 380, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      { x: 392, height: 152, variant: 'thin', color: '#33691E', delay: 1.1 },
      // Mid bushy cluster
      { x: 430, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 443, height: 150, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 456, height: 158, variant: 'bushy', color: '#33691E', delay: 1.2 },
      // Mid wide cluster
      { x: 500, height: 155, variant: 'wide', color: '#1B5E20', delay: 1.5 },
      { x: 513, height: 140, variant: 'wide', color: '#2E7D32', delay: 0.4 },
      { x: 526, height: 148, variant: 'wide', color: '#1B5E20', delay: 0.9 },
      // Right thin cluster
      { x: 740, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 750, height: 142, variant: 'thin', color: '#33691E', delay: 1.0 },
      { x: 762, height: 150, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      // Right bushy cluster
      { x: 778, height: 165, variant: 'bushy', color: '#33691E', delay: 1.1 },
      { x: 791, height: 148, variant: 'bushy', color: '#1B5E20', delay: 0.6 },
    ],
  },
  midground: {
    structures: [
      { type: 'castle', x: 200, y: 132 },
      { type: 'drawbridge', x: 560, y: 148 },
    ],
  },
  foreground: {
    rocks: [
      { x: 52, y: 244, variant: 'large', color: '#57534E' },
      { x: 712, y: 267, variant: 'medium', color: '#57534E' },
    ],
    corals: [
      { x: 148, y: 258, variant: 'brain', color: '#795548' },
      { x: 490, y: 241, variant: 'branch', color: '#6D4C41' },
      { x: 720, y: 255, variant: 'fan', color: '#8D6E63' },
    ],
    kelps: [
      // Left — thin grass cluster near castle ruins
      { x: 15, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.3 },
      { x: 25, height: 36, variant: 'thin', color: '#1B5E20', delay: 0.8 },
      { x: 35, height: 26, variant: 'thin', color: '#33691E', delay: 1.2 },
      // Near brain coral — wide Amazon Swords
      { x: 95, height: 36, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 108, height: 30, variant: 'wide', color: '#2E7D32', delay: 1.6 },
      // --- open swim lane ---
      // Mid — thin accent pair
      { x: 370, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 380, height: 36, variant: 'thin', color: '#1B5E20', delay: 0.9 },
      // --- open swim lane ---
      // Right — wide pair near fan coral
      { x: 645, height: 36, variant: 'wide', color: '#2E7D32', delay: 1.4 },
      { x: 658, height: 30, variant: 'wide', color: '#33691E', delay: 0.7 },
      // Far right — thin grass
      { x: 755, height: 30, variant: 'thin', color: '#33691E', delay: 0.4 },
      { x: 765, height: 36, variant: 'thin', color: '#2E7D32', delay: 1.0 },
    ],
  },
}

const PYRAMID_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#C4A862', lighter: '#D4B872', detail: '#A08B52' },
  background: {
    kelps: [
      // Left wide cluster
      { x: 5, height: 165, variant: 'wide', color: '#2E7D32', delay: 0 },
      { x: 18, height: 148, variant: 'wide', color: '#558B2F', delay: 0.5 },
      { x: 32, height: 158, variant: 'wide', color: '#2E7D32', delay: 0.2 },
      // Left bushy cluster
      { x: 50, height: 170, variant: 'bushy', color: '#558B2F', delay: 0.5 },
      { x: 63, height: 152, variant: 'bushy', color: '#2E7D32', delay: 1.0 },
      { x: 76, height: 162, variant: 'bushy', color: '#388E3C', delay: 0.3 },
      // Left thin grass
      { x: 95, height: 155, variant: 'thin', color: '#388E3C', delay: 1.0 },
      { x: 105, height: 140, variant: 'thin', color: '#558B2F', delay: 0.4 },
      { x: 115, height: 148, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      // Mid bushy cluster
      { x: 270, height: 168, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 283, height: 150, variant: 'bushy', color: '#558B2F', delay: 0.7 },
      { x: 296, height: 160, variant: 'bushy', color: '#388E3C', delay: 1.2 },
      // Mid wide cluster
      { x: 340, height: 155, variant: 'wide', color: '#558B2F', delay: 0.6 },
      { x: 353, height: 142, variant: 'wide', color: '#2E7D32', delay: 1.1 },
      { x: 366, height: 150, variant: 'wide', color: '#388E3C', delay: 0.4 },
      // Mid-right bushy
      { x: 470, height: 165, variant: 'bushy', color: '#388E3C', delay: 0.9 },
      { x: 483, height: 148, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      { x: 496, height: 158, variant: 'bushy', color: '#558B2F', delay: 1.4 },
      // Right thin cluster
      { x: 690, height: 170, variant: 'thin', color: '#558B2F', delay: 1.2 },
      { x: 700, height: 152, variant: 'thin', color: '#2E7D32', delay: 0.5 },
      { x: 712, height: 162, variant: 'thin', color: '#388E3C', delay: 0.9 },
      // Right bushy cluster
      { x: 728, height: 160, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      { x: 741, height: 145, variant: 'bushy', color: '#2E7D32', delay: 0.3 },
      // Right wide cluster
      { x: 758, height: 155, variant: 'wide', color: '#2E7D32', delay: 1.5 },
      { x: 771, height: 142, variant: 'wide', color: '#558B2F', delay: 0.6 },
      // Far right thin
      { x: 788, height: 160, variant: 'thin', color: '#388E3C', delay: 1.8 },
      { x: 798, height: 145, variant: 'thin', color: '#2E7D32', delay: 0.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'pyramid', x: 80, y: 134 },
      { type: 'sphinx', x: 520, y: 152 },
    ],
  },
  foreground: {
    rocks: [
      { x: 48, y: 254, variant: 'medium', color: '#A08B6C' },
      { x: 648, y: 244, variant: 'large', color: '#8B7355' },
    ],
    corals: [
      { x: 380, y: 243, variant: 'branch', color: '#F06292' },
      { x: 442, y: 256, variant: 'fan', color: '#E91E63' },
      { x: 710, y: 246, variant: 'brain', color: '#EC407A' },
    ],
    kelps: [
      // Left — thin grass near rock (Egyptian papyrus feel)
      { x: 10, height: 36, variant: 'thin', color: '#388E3C', delay: 0.2 },
      { x: 20, height: 30, variant: 'thin', color: '#558B2F', delay: 0.7 },
      // Left-center — wide sword pair
      { x: 95, height: 36, variant: 'wide', color: '#558B2F', delay: 1.0 },
      { x: 108, height: 30, variant: 'wide', color: '#388E3C', delay: 0.4 },
      // --- open swim lane ---
      // Center cluster — thin grass trio
      { x: 330, height: 26, variant: 'thin', color: '#2E7D32', delay: 1.3 },
      { x: 340, height: 36, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 350, height: 30, variant: 'thin', color: '#558B2F', delay: 0.6 },
      // --- open swim lane ---
      // Right — wide swords near large rock
      { x: 705, height: 30, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 718, height: 36, variant: 'wide', color: '#558B2F', delay: 1.7 },
      // Far right — thin accent
      { x: 775, height: 30, variant: 'thin', color: '#388E3C', delay: 0.3 },
    ],
  },
}

const TEMPLE_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#8D8D8D', lighter: '#A8A8A8', detail: '#6B6B6B' },
  background: {
    kelps: [
      // Left bushy cluster
      { x: 5, height: 172, variant: 'bushy', color: '#2E7D32', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#1B5E20', delay: 0.5 },
      { x: 32, height: 164, variant: 'bushy', color: '#2E7D32', delay: 0.2 },
      { x: 45, height: 142, variant: 'bushy', color: '#1B5E20', delay: 0.8 },
      // Left wide cluster
      { x: 63, height: 160, variant: 'wide', color: '#388E3C', delay: 0.4 },
      { x: 76, height: 145, variant: 'wide', color: '#2E7D32', delay: 0.9 },
      { x: 90, height: 152, variant: 'wide', color: '#388E3C', delay: 0.6 },
      // Left thin cluster
      { x: 108, height: 158, variant: 'thin', color: '#43A047', delay: 0.8 },
      { x: 118, height: 142, variant: 'thin', color: '#2E7D32', delay: 1.2 },
      { x: 128, height: 150, variant: 'thin', color: '#43A047', delay: 0.3 },
      // Right bushy cluster
      { x: 670, height: 175, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 683, height: 155, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 696, height: 165, variant: 'bushy', color: '#1B5E20', delay: 1.1 },
      { x: 710, height: 148, variant: 'bushy', color: '#2E7D32', delay: 0.4 },
      // Right wide cluster
      { x: 728, height: 160, variant: 'wide', color: '#388E3C', delay: 0.9 },
      { x: 741, height: 145, variant: 'wide', color: '#1B5E20', delay: 0.2 },
      { x: 754, height: 152, variant: 'wide', color: '#388E3C', delay: 1.5 },
      // Right thin cluster
      { x: 772, height: 168, variant: 'thin', color: '#43A047', delay: 0.5 },
      { x: 782, height: 150, variant: 'thin', color: '#2E7D32', delay: 1.0 },
      { x: 793, height: 158, variant: 'thin', color: '#43A047', delay: 0.3 },
    ],
  },
  midground: {
    structures: [
      { type: 'torii', x: 120, y: 148, scale: 1.6 },
      { type: 'pagoda', x: 440, y: 110, scale: 2.6 },
    ],
  },
  foreground: {
    rocks: [
      { x: 68, y: 274, variant: 'small', color: '#78716C' },
      { x: 342, y: 254, variant: 'medium', color: '#6B7280' },
    ],
    corals: [
      { x: 242, y: 243, variant: 'branch', color: '#E64A19' },
      { x: 380, y: 256, variant: 'brain', color: '#D84315' },
      { x: 700, y: 244, variant: 'fan', color: '#FF5722' },
    ],
    kelps: [
      // Left — thin grass cluster (zen garden feel)
      { x: 10, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 20, height: 36, variant: 'thin', color: '#43A047', delay: 0.6 },
      { x: 30, height: 26, variant: 'thin', color: '#388E3C', delay: 0.8 },
      // Near rock — wide Amazon Sword accent
      { x: 75, height: 36, variant: 'wide', color: '#388E3C', delay: 1.3 },
      { x: 88, height: 30, variant: 'wide', color: '#1B5E20', delay: 0.4 },
      // --- open swim lane ---
      // Center — bushy Rotala pair (asymmetric placement)
      { x: 375, height: 36, variant: 'bushy', color: '#2E7D32', delay: 0.5 },
      { x: 388, height: 30, variant: 'bushy', color: '#1B5E20', delay: 1.0 },
      // --- open swim lane ---
      // Right — thin grass trio near fan coral
      { x: 555, height: 36, variant: 'thin', color: '#388E3C', delay: 1.5 },
      { x: 565, height: 30, variant: 'thin', color: '#2E7D32', delay: 0.7 },
      // Far right — wide pair
      { x: 735, height: 36, variant: 'wide', color: '#43A047', delay: 1.8 },
      { x: 748, height: 30, variant: 'wide', color: '#2E7D32', delay: 0.3 },
    ],
  },
}

const ATLANTIS_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#1A5276', lighter: '#2471A3', detail: '#154360' },
  background: {
    kelps: [
      // Left bushy cluster — neon blend
      { x: 5, height: 175, variant: 'bushy', color: '#00E5FF', delay: 0 },
      { x: 18, height: 155, variant: 'bushy', color: '#E040FB', delay: 0.4 },
      { x: 32, height: 165, variant: 'bushy', color: '#76FF03', delay: 0.8 },
      { x: 45, height: 142, variant: 'bushy', color: '#00E5FF', delay: 0.2 },
      // Left wide cluster
      { x: 63, height: 162, variant: 'wide', color: '#FF4081', delay: 0.9 },
      { x: 76, height: 145, variant: 'wide', color: '#00E676', delay: 0.3 },
      { x: 90, height: 155, variant: 'wide', color: '#E040FB', delay: 1.3 },
      // Left thin cluster
      { x: 108, height: 160, variant: 'thin', color: '#76FF03', delay: 0.5 },
      { x: 118, height: 142, variant: 'thin', color: '#00E5FF', delay: 1.0 },
      { x: 128, height: 152, variant: 'thin', color: '#FF4081', delay: 0.3 },
      // Mid wide cluster
      { x: 290, height: 155, variant: 'wide', color: '#00E676', delay: 0.6 },
      { x: 303, height: 140, variant: 'wide', color: '#E040FB', delay: 1.1 },
      { x: 316, height: 148, variant: 'wide', color: '#76FF03', delay: 0.4 },
      // Mid bushy cluster
      { x: 390, height: 168, variant: 'bushy', color: '#00E5FF', delay: 0.3 },
      { x: 403, height: 150, variant: 'bushy', color: '#FF4081', delay: 0.8 },
      { x: 416, height: 160, variant: 'bushy', color: '#00E676', delay: 1.2 },
      // Mid thin cluster
      { x: 490, height: 158, variant: 'thin', color: '#E040FB', delay: 0.7 },
      { x: 500, height: 142, variant: 'thin', color: '#76FF03', delay: 0.2 },
      { x: 512, height: 150, variant: 'thin', color: '#00E5FF', delay: 0.9 },
      // Right wide cluster
      { x: 725, height: 165, variant: 'wide', color: '#FF4081', delay: 0.8 },
      { x: 738, height: 148, variant: 'wide', color: '#00E676', delay: 0.3 },
      { x: 751, height: 155, variant: 'wide', color: '#E040FB', delay: 1.1 },
      // Right bushy cluster
      { x: 768, height: 170, variant: 'bushy', color: '#76FF03', delay: 0.5 },
      { x: 781, height: 152, variant: 'bushy', color: '#00E5FF', delay: 1.0 },
      { x: 794, height: 160, variant: 'bushy', color: '#FF4081', delay: 0.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'atlantean-dome', x: 100, y: 132 },
      { type: 'atlantean-obelisk', x: 380, y: 130 },
      { type: 'atlantean-dome', x: 600, y: 138, scale: 2.4 },
    ],
  },
  foreground: {
    rocks: [
      { x: 58, y: 254, variant: 'medium', color: '#1F618D' },
      { x: 450, y: 262, variant: 'small', color: '#154360' },
      { x: 688, y: 267, variant: 'medium', color: '#1A5276' },
    ],
    corals: [
      { x: 55, y: 243, variant: 'branch', color: '#26C6DA' },
      { x: 280, y: 250, variant: 'fan', color: '#E040FB' },
      { x: 420, y: 252, variant: 'fan', color: '#00BCD4' },
      { x: 500, y: 260, variant: 'brain', color: '#0097A7' },
      { x: 700, y: 240, variant: 'branch', color: '#4DD0E1' },
    ],
    kelps: [
      // Left — thin neon grass cluster
      { x: 10, height: 30, variant: 'thin', color: '#00E5FF', delay: 0.2 },
      { x: 20, height: 36, variant: 'thin', color: '#E040FB', delay: 0.6 },
      { x: 30, height: 26, variant: 'thin', color: '#76FF03', delay: 1.0 },
      // Left-mid — wide neon swords
      { x: 75, height: 36, variant: 'wide', color: '#FF4081', delay: 0.4 },
      { x: 88, height: 30, variant: 'wide', color: '#00E676', delay: 1.3 },
      // --- open swim lane ---
      // Center — bushy neon cluster
      { x: 335, height: 36, variant: 'bushy', color: '#00E5FF', delay: 0.8 },
      { x: 348, height: 30, variant: 'bushy', color: '#E040FB', delay: 1.4 },
      { x: 362, height: 34, variant: 'bushy', color: '#76FF03', delay: 0.5 },
      // --- open swim lane ---
      // Right-center — wide neon swords
      { x: 555, height: 30, variant: 'wide', color: '#FF4081', delay: 1.7 },
      { x: 568, height: 36, variant: 'wide', color: '#00E676', delay: 0.2 },
      // Right — thin neon grass
      { x: 750, height: 36, variant: 'thin', color: '#00E5FF', delay: 0.9 },
      { x: 760, height: 30, variant: 'thin', color: '#E040FB', delay: 1.5 },
      { x: 770, height: 26, variant: 'thin', color: '#76FF03', delay: 0.4 },
    ],
  },
}

const STAGNANT_LAYOUT: LayeredDecoConfig = {
  sandColors: { color: '#5C4A38', lighter: '#6B5A48', detail: '#4A3828' },
  background: {
    kelps: [
      // Dense, overgrown background — murky stagnant pool, organically irregular
      // Left thick overgrowth
      { x: 3, height: 188, variant: 'bushy', color: '#1B5E20', delay: 0 },
      { x: 16, height: 165, variant: 'wide', color: '#2E7D32', delay: 0.5 },
      { x: 35, height: 180, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 52, height: 148, variant: 'thin', color: '#33691E', delay: 0.2 },
      { x: 68, height: 175, variant: 'bushy', color: '#2E7D32', delay: 1.3 },
      // Sparse patch
      { x: 92, height: 158, variant: 'wide', color: '#1B5E20', delay: 0.4 },
      { x: 112, height: 172, variant: 'thin', color: '#33691E', delay: 1.0 },
      // Dense behind skull
      { x: 142, height: 182, variant: 'bushy', color: '#2E7D32', delay: 0.6 },
      { x: 158, height: 160, variant: 'wide', color: '#1B5E20', delay: 1.4 },
      { x: 178, height: 175, variant: 'bushy', color: '#33691E', delay: 0.3 },
      { x: 196, height: 155, variant: 'thin', color: '#2E7D32', delay: 0.8 },
      { x: 218, height: 168, variant: 'wide', color: '#1B5E20', delay: 1.6 },
      // Right of skull — overgrowth creeping in
      { x: 475, height: 162, variant: 'bushy', color: '#33691E', delay: 0.5 },
      { x: 498, height: 178, variant: 'wide', color: '#2E7D32', delay: 1.1 },
      { x: 520, height: 150, variant: 'thin', color: '#1B5E20', delay: 0.2 },
      // Dense mid-right patch
      { x: 545, height: 185, variant: 'bushy', color: '#2E7D32', delay: 0.7 },
      { x: 562, height: 155, variant: 'bushy', color: '#1B5E20', delay: 1.3 },
      { x: 582, height: 170, variant: 'wide', color: '#33691E', delay: 0.4 },
      // Sparse transition
      { x: 610, height: 158, variant: 'thin', color: '#2E7D32', delay: 0.9 },
      { x: 635, height: 175, variant: 'bushy', color: '#1B5E20', delay: 1.5 },
      // Far right heavy overgrowth
      { x: 658, height: 182, variant: 'wide', color: '#33691E', delay: 0.3 },
      { x: 678, height: 165, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 698, height: 178, variant: 'thin', color: '#1B5E20', delay: 1.2 },
      { x: 718, height: 155, variant: 'bushy', color: '#33691E', delay: 0.5 },
      { x: 742, height: 170, variant: 'wide', color: '#2E7D32', delay: 1.0 },
      { x: 765, height: 160, variant: 'thin', color: '#1B5E20', delay: 0.6 },
      { x: 788, height: 175, variant: 'bushy', color: '#33691E', delay: 1.4 },
    ],
  },
  midground: {
    structures: [
      { type: 'deer-skull', x: 200, y: 210, scale: 1.0 },
    ],
  },
  foreground: {
    rocks: [
      { x: 42, y: 244, variant: 'large', color: '#4A3828' },
      { x: 212, y: 273, variant: 'small', color: '#5C4A38' },
      { x: 572, y: 254, variant: 'medium', color: '#4A3828' },
      { x: 728, y: 246, variant: 'large', color: '#3A2A1E' },
    ],
    corals: [
      { x: 128, y: 258, variant: 'brain', color: '#6D4C41' },
      { x: 235, y: 241, variant: 'branch', color: '#5D4037' },
      { x: 600, y: 255, variant: 'fan', color: '#795548' },
      { x: 672, y: 246, variant: 'brain', color: '#4E342E' },
    ],
    kelps: [
      // Dense overgrown foreground — stagnant pool, organically scattered
      { x: 6, height: 42, variant: 'bushy', color: '#1B5E20', delay: 0.3 },
      { x: 22, height: 34, variant: 'wide', color: '#2E7D32', delay: 0.8 },
      { x: 48, height: 38, variant: 'thin', color: '#1B5E20', delay: 1.4 },
      // Gap
      { x: 78, height: 40, variant: 'bushy', color: '#33691E', delay: 0.5 },
      { x: 105, height: 32, variant: 'wide', color: '#1B5E20', delay: 1.0 },
      // Sparse
      { x: 148, height: 36, variant: 'thin', color: '#2E7D32', delay: 0.2 },
      { x: 182, height: 42, variant: 'bushy', color: '#33691E', delay: 0.7 },
      // Around skull base
      { x: 238, height: 38, variant: 'wide', color: '#1B5E20', delay: 1.3 },
      { x: 265, height: 34, variant: 'thin', color: '#2E7D32', delay: 0.4 },
      // Gap
      { x: 318, height: 40, variant: 'bushy', color: '#1B5E20', delay: 0.9 },
      { x: 355, height: 36, variant: 'wide', color: '#33691E', delay: 1.5 },
      // Mid
      { x: 405, height: 38, variant: 'thin', color: '#2E7D32', delay: 0.6 },
      { x: 440, height: 42, variant: 'bushy', color: '#1B5E20', delay: 1.1 },
      // Gap
      { x: 492, height: 34, variant: 'wide', color: '#33691E', delay: 0.3 },
      { x: 538, height: 40, variant: 'bushy', color: '#2E7D32', delay: 0.8 },
      { x: 568, height: 36, variant: 'thin', color: '#1B5E20', delay: 1.6 },
      // Right
      { x: 615, height: 38, variant: 'wide', color: '#33691E', delay: 0.5 },
      { x: 660, height: 42, variant: 'bushy', color: '#1B5E20', delay: 1.2 },
      // Far right sparse
      { x: 705, height: 34, variant: 'thin', color: '#2E7D32', delay: 0.4 },
      { x: 748, height: 40, variant: 'bushy', color: '#33691E', delay: 0.9 },
      { x: 782, height: 36, variant: 'wide', color: '#1B5E20', delay: 1.4 },
    ],
  },
}

const THEME_LAYOUTS: Record<string, LayeredDecoConfig> = {
  ocean: OCEAN_LAYOUT,
  volcano: TROPICAL_LAYOUT,
  shipwreck: SHIPWRECK_LAYOUT,
  sailboat: SAILBOAT_LAYOUT,
  submarine: SUBMARINE_LAYOUT,
  minimal: MINIMAL_LAYOUT,
  castle: CASTLE_LAYOUT,
  pyramid: PYRAMID_LAYOUT,
  temple: TEMPLE_LAYOUT,
  atlantis: ATLANTIS_LAYOUT,
  stagnant: STAGNANT_LAYOUT,
}

export { THEME_LAYOUTS }
export type { LayeredDecoConfig }
