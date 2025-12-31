import type { ArchitecturalElement } from '../../types';

export const LANDING: ArchitecturalElement = {
  id: 'landing',
  slug: 'landing',
  name: 'Landing',
  alternativeNames: ['Stair Landing', 'Staircase Platform', 'Half Landing', 'Quarter Landing'],
  pronunciation: {
    phonetic: 'LAN-ding',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'A platform where stairs come to rest',
    rootWord: 'From "to land" (to come to rest, to arrive)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['ANCIENT', 'CLASSICAL', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/landing-primary.jpg',
    gallery: [
      '/images/architecture/elements/landing-types.jpg',
      '/images/architecture/elements/landing-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/landing-configurations.svg',
  },

  description: {
    ELEMENTARY: 'A landing is a flat platform in the middle or at the ends of a staircase. It\'s like a little floor where you can stop and rest while going up or down long stairs. Landings also help you turn corners - some stairs go straight up, then have a landing, then turn and keep going. They make stairs safer by giving you a place to catch yourself if you trip.',
    MIDDLE_SCHOOL: 'Landings are horizontal platforms interrupting a flight of stairs, required by building codes for safety and rest. A "half landing" (or switchback landing) allows stairs to reverse direction 180 degrees. A "quarter landing" turns stairs 90 degrees. Code typically requires landings every 12-15 feet of vertical rise. Landing depth must equal or exceed the stair width. They provide rest points, reduce fall distances, and accommodate doorways opening onto stairs.',
    HIGH_SCHOOL: 'Stair landings serve multiple functions: safety (limiting continuous fall distance), ergonomics (rest opportunities during long climbs), and spatial planning (changing stair direction within building constraints). Building codes mandate maximum vertical rise between landings (typically 3.6-4.0 meters). Landing dimensions must accommodate door swing clearances, with minimum depth equal to stair width or door width plus swing space. Structural design treats landings as small floor platforms, transferring loads to supporting walls or beams.',
    UNDERGRADUATE: 'Landing design integrates safety regulations, circulation patterns, and architectural composition. Types include straight-through (no direction change), quarter-turn (90°), half-turn (180°), and irregular geometry landings. Code requirements address maximum rise, minimum dimensions, headroom, and guard rail continuity. Structural systems include cantilevered landings, landings supported by walls or columns, and landings integral to floor slabs. Historical grand stairs used generous landings as ceremonial pause points; utilitarian stairs minimize landing area for spatial efficiency.',
    GRADUATE: 'Landing analysis encompasses human factors, structural optimization, code compliance, and phenomenological experience. Research indicates landings reduce physiological stress during climbing and provide cognitive rest points. Structural considerations include point loads from upper stair flights, vibration isolation between flights, and thermal bridging at exterior locations. Contemporary practice addresses accessibility requirements (level landings for wheelchair transfers), means of egress capacity calculations, and integration with building systems (HVAC, lighting). Innovations include transparent landings (glass or grating), deployable emergency landings, and adaptive reuse challenges in historic buildings.',
    PHD: 'Landing research integrates biomechanics, crowd dynamics, architectural history, and sensory experience. Studies employ motion capture of climbing patterns, finite element analysis of landing structures, and evacuation modeling of emergency egress. Material investigations examine acoustic isolation (preventing footfall transmission between floors), slip resistance, and durability under concentrated traffic. Interdisciplinary work addresses the landing\'s role in spatial narrative (cinematic reveals, processional pauses), cultural variations in stair climbing practices, and psychological research on wayfinding and orientation during vertical circulation. Conservation challenges include code-compliant modifications to non-compliant historic stairs.',
  },

  history: {
    ELEMENTARY: 'People have been using landings in stairs for thousands of years. Ancient pyramids and ziggurats had landings where stairs changed direction. Castle stairs often had landings so defenders could stop and fight attackers. Grand palaces had big landings where important people could pause and be seen. Today, building rules require landings to keep people safe on tall stairs.',
    MIDDLE_SCHOOL: 'Landings evolved from functional necessities in ancient monumental stairs. Mesopotamian ziggurats (3rd millennium BCE) featured landing terraces between stair flights. Medieval castle stairs used landings for defensive advantages. Renaissance and Baroque architecture transformed landings into theatrical spaces for social display. The Industrial Revolution\'s multi-story factories and tenements established safety codes requiring landings. Modern building codes formalized landing requirements based on accident prevention research.',
    HIGH_SCHOOL: 'Landing design reflects both practical constraints and cultural values. Ancient Egyptian temples used landings to create processional rhythms. Medieval spiral stairs in towers incorporated occasional landings for rest and light. Renaissance palaces (16th-17th centuries) featured generous landings as social stages for court ceremony. The 1911 Triangle Shirtwaist Factory fire influenced code development mandating adequate landings for emergency egress. Mid-century modernism minimized landings for spatial efficiency; contemporary safety culture has reversed this trend.',
    UNDERGRADUATE: 'Historical landing evolution traces from geometric necessity (direction changes in constrained spaces) to architectural opportunity (ceremonial pause points). Baroque architects exploited landings for dramatic spatial sequences and sight lines. Nineteenth-century building science established empirical relationships between climb duration and fatigue, informing landing frequency requirements. Early 20th-century high-rise development necessitated code provisions for stairwell pressurization and fire-rated landing construction. Contemporary practice balances minimum code compliance in commercial buildings with generous landings in residential and civic architecture.',
    GRADUATE: 'Landing historiography reveals shifting priorities among safety, ceremony, and economy. Analysis of palace stairs shows landing size correlating with social hierarchy. Industrial-era accident statistics drove prescriptive code requirements. Mid-century code liberalization reflected confidence in modern construction; subsequent tightening followed disaster investigations. Regional variations persist: European codes permit longer flights between landings than North American standards. Contemporary scholarship examines landing accessibility for aging populations, post-9/11 egress capacity requirements, and sustainable stair design encouraging physical activity through attractive, well-lit landings.',
    PHD: 'Landing research encompasses architectural history, building codes evolution, human factors, and cultural studies. Investigations document ceremonial landing use in court protocol, analyze historic stair accidents informing code development, and examine psychological research on fatigue and way-finding. Conservation challenges include upgrading non-compliant historic stairs while preserving architectural character. Material culture studies address regional landing construction variations and craft traditions. Contemporary interdisciplinary work investigates landings in active design strategies promoting stair use over elevators, crowd management during emergency evacuations, and phenomenological studies of pause and prospect in vertical movement.',
  },

  characteristics: [
    'Horizontal platform within or between stair flights',
    'Required every 12-15 feet (3.6-4.0m) of vertical rise',
    'Minimum depth equals stair width or doorway requirement',
    'Types: straight-through, quarter-turn (90°), half-turn (180°)',
    'Provides rest points during long climbs',
    'Limits maximum continuous fall distance',
    'Accommodates direction changes in stair geometry',
    'Must maintain guard rail and headroom requirements',
  ],

  famousExamples: [
    { name: 'Laurentian Library', location: 'Florence, Italy', year: '1559', description: 'Michelangelo\'s theatrical landing with sculptural stair descending into reading room' },
    { name: 'Château de Blois', location: 'Blois, France', year: '1515-1524', description: 'François I\'s octagonal stair tower with ornate landings' },
    { name: 'Paris Opera House', location: 'Paris, France', year: '1875', description: 'Charles Garnier\'s grand ceremonial landing at stair junction' },
    { name: 'Bramante Staircase', location: 'Vatican Museums, Vatican City', year: '1932', description: 'Giuseppe Momo\'s double helix with intermediate viewing landings' },
    { name: 'Seattle Central Library', location: 'Seattle, USA', year: '2004', description: 'OMA/LMN\'s dramatic continuous landing-ramp system' },
  ],

  confusionPairs: [
    {
      elementId: 'platform',
      reason: 'Both are horizontal elevated surfaces',
      distinction: 'Landing specifically refers to platforms within stair systems; platform is a general term for any raised floor',
    },
    {
      elementId: 'floor',
      reason: 'Both are horizontal walking surfaces',
      distinction: 'Landing is intermediate between floor levels; floor is the main horizontal surface of a building story',
    },
  ],

  searchTags: ['stair', 'platform', 'rest', 'turn', 'switchback', 'quarter turn', 'safety', 'building code', 'circulation'],

  arMetadata: {
    modelPath: '/models/architecture/landing.glb',
    scale: 0.7,
    rotatable: true,
    annotations: [
      { label: 'Landing Platform', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Lower Flight Connection', position: { x: -0.4, y: 0, z: 0.3 } },
      { label: 'Upper Flight Connection', position: { x: 0.4, y: 0.2, z: -0.3 } },
      { label: 'Guard Rail Continuation', position: { x: 0.5, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
