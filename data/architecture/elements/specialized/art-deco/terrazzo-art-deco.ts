import type { ArchitecturalElement } from '../../../types';

export const TERRAZZO_ART_DECO: ArchitecturalElement = {
  id: 'terrazzo-art-deco',
  slug: 'terrazzo-art-deco',
  name: 'Art Deco Terrazzo',
  alternativeNames: ['Decorative Terrazzo', 'Geometric Terrazzo', 'Terrazzo Floor', 'Patterned Terrazzo'],
  pronunciation: {
    phonetic: 'teh-RAH-zoh',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'Terrace or platform',
    rootWord: 'From Italian "terrazza" (terrace)',
  },
  category: 'FLOOR',
  subcategory: 'decorative_flooring',
  periods: ['art-deco'],
  regions: ['NORTH_AMERICA', 'WESTERN_EUROPE', 'SOUTH_AMERICA', 'OCEANIA', 'ASIA'],

  images: {
    primary: '/images/architecture/elements/terrazzo-art-deco-primary.jpg',
    gallery: [
      '/images/architecture/elements/terrazzo-geometric.jpg',
      '/images/architecture/elements/terrazzo-lobby.jpg',
      '/images/architecture/elements/terrazzo-border.jpg',
    ],
    diagram: '/images/architecture/diagrams/terrazzo-art-deco-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'Art Deco terrazzo is a super cool floor made by mixing colorful stone chips with cement and then polishing it until it\'s shiny and smooth! In the 1920s-1930s, artists created terrazzo floors with zigzags, sunbursts, geometric shapes, and even whole pictures. When you walk on these floors in old buildings, you\'re walking on a beautiful piece of art! The colors include black, white, red, green, gold, and many more.',
    MIDDLE_SCHOOL: 'Art Deco terrazzo is a composite flooring material consisting of colored marble, granite, glass, or quartz chips embedded in cement or resin, then ground and polished to a smooth, glossy finish. During the Art Deco era, craftsmen created elaborate geometric patterns, borders, and pictorial designs using different colored aggregates separated by metal or brass divider strips. These floors were durable, elegant, and perfectly suited to Art Deco\'s geometric aesthetic. Terrazzo appeared in building lobbies, theaters, hotels, government buildings, and commercial spaces.',
    HIGH_SCHOOL: 'Art Deco terrazzo represents the sophisticated application of an ancient flooring technique to modern geometric design. The material\'s versatility enabled infinite pattern possibilities: bold zigzags and chevrons, radiating sunbursts, stylized floral motifs, borders framing central medallions, and complete pictorial compositions. Craftsmen used brass, zinc, or aluminum divider strips to separate different colored sections, creating crisp geometric boundaries and controlling cracking. Color palettes ranged from restrained black-and-white compositions to vibrant polychrome designs incorporating red, green, gold, and other hues. The material\'s durability, maintainability, and hygienic properties made it ideal for high-traffic public spaces.',
    UNDERGRADUATE: 'Art Deco terrazzo constitutes a significant intersection of traditional craft and modern design aesthetics. The material\'s technical requirements - proper aggregate selection, matrix composition, grinding sequences, and polishing techniques - demanded skilled labor, yet its geometric patterning aligned with industrial-age aesthetics. Design approaches varied from abstract geometric compositions echoing contemporary art movements to representational imagery including zodiac symbols, corporate logos, and civic emblems. Divider strip layouts created structural grids preventing thermal cracking while enabling complex multicolor designs. Material innovations during the Art Deco period included new synthetic pigments expanding color ranges, thinner divider strips permitting finer details, and improved grinding equipment achieving superior finishes. Regional variations reflected local stone availability and craft traditions.',
    GRADUATE: 'Critical examination of Art Deco terrazzo reveals complex negotiations between artisanal tradition, industrial modernity, and architectural expression. The material\'s ancient pedigree (Venetian terrazzo dates to the 15th century) underwent transformation through modern design vocabularies and technical innovations. Research demonstrates how terrazzo mediated between bespoke craftsmanship and standardized production - while each installation required hand labor, pattern books and standard divider strip systems enabled economical reproduction of designs. Technical studies examine matrix formulations, aggregate characteristics, and surface treatment methods. The material\'s role in spatial experience - creating visual paths, defining zones, and enriching otherwise utilitarian lobbies - demonstrates flooring\'s architectural significance. Conservation research addresses wear, staining, repair techniques, and appropriate cleaning methods.',
    PHD: 'Scholarly investigation of Art Deco terrazzo engages multiple research domains including craft history, material science, and spatial theory. Research areas include: examination of terrazzo contractors\' archives documenting design processes, technical specifications, and business practices; investigation of how pattern books and trade publications circulated designs; technical analysis of period materials and methods using chemical analysis and microscopy; comparative studies of regional terrazzo traditions and their relationship to local stone industries; analysis of terrazzo\'s role in Art Deco\'s broader geometric ornamental program; examination of gendered associations (terrazzo as "feminine" decorative craft versus "masculine" structural engineering); study of terrazzo in phenomenological terms as material encountered through bodily movement; preservation research developing repair, restoration, and maintenance protocols; and digital documentation methods including photogrammetry and spectral imaging. Contemporary scholarship also explores terrazzo through environmental lenses examining material sourcing, longevity, and sustainability.',
  },

  history: {
    ELEMENTARY: 'Terrazzo floors were invented in Italy hundreds of years ago, but they became super popular in America during the 1920s-1930s Art Deco period. Skilled craftsmen would create amazing floor designs with colorful stone chips, brass strips, and lots of polishing. Every fancy hotel, theater, and office building wanted a beautiful terrazzo floor! These floors were so well-made that many of them are still gorgeous today, almost 100 years later.',
    MIDDLE_SCHOOL: 'Terrazzo originated in 15th-century Venice, where workers used marble remnants from building projects to create durable floors. Italian immigrants brought terrazzo techniques to America in the late 1800s. The material\'s popularity exploded during the 1920s-1930s Art Deco boom, as its geometric potential perfectly matched the era\'s design aesthetic. The National Terrazzo and Mosaic Association, founded in 1924, standardized specifications and promoted the craft. Art Deco terrazzo floors appeared in major buildings nationwide - the Empire State Building, Hoover Dam, Radio City Music Hall, and countless smaller structures. After World War II, vinyl and other materials reduced terrazzo\'s market share.',
    HIGH_SCHOOL: 'The evolution of Art Deco terrazzo reflects the intersection of traditional craft and modern design. While terrazzo\'s basic technique remained ancient, the 1920s-1930s period saw significant technical and aesthetic innovations. Electrically powered grinding machines replaced hand grinding, enabling larger installations and superior finishes. New pigments and aggregates expanded color possibilities beyond traditional marble. Thinner brass divider strips allowed more intricate geometric patterns. Designer-craftsmen collaborated with architects, translating Art Deco\'s geometric vocabulary into durable flooring. Notable installations demonstrated terrazzo\'s versatility: Radio City Music Hall\'s pictorial designs, the Hoover Dam\'s inlaid terrazzo terrazzo maps, and countless office building lobbies with zigzag and sunburst patterns. Post-war decline resulted from competing materials and changing aesthetics.',
    UNDERGRADUATE: 'Art Deco terrazzo\'s historical development illuminates the craft\'s adaptation to modern conditions and design languages. Italian terrazzo traditions, transmitted through immigrant craftsmen, encountered American scale, speed, and geometric modernism. The National Terrazzo and Mosaic Association (NTMA), established 1924, played crucial roles standardizing specifications, training workers, and marketing the material. Technical advances included portland cement improvements, synthetic color oxides, and mechanized grinding systems. Design development shows evolution from restrained geometric borders to ambitious pictorial programs. Regional centers emerged: New York concentrated high-end installations, while Florida developed distinctive pastel terrazzo traditions. Economic analysis reveals terrazzo\'s competitive positioning - more expensive than linoleum or rubber but cheaper than marble, offering durability justifying higher initial cost. Depression-era federal buildings employed terrazzo extensively, visible in post offices and courthouses nationwide.',
    GRADUATE: 'Academic research on Art Deco terrazzo addresses questions about craft survival, technological change, and material culture. Detailed studies of terrazzo contractors\' businesses illuminate craft organization, labor practices, and design processes. Technical art history investigates material formulations, examining how specific aggregates, matrices, and surface treatments achieved particular aesthetic effects. Comparative analysis identifies regional variations and stylistic evolution. The craft\'s gendering - coded masculine despite decorative nature - reveals complexity in period labor hierarchies. Documentation projects recording threatened terrazzo installations have created important archives. Conservation research has developed chemical analysis methods identifying original materials, informing restoration decisions. Terrazzo\'s role in spatial experience - its tactile qualities, acoustic properties, and visual effects - demonstrates flooring\'s phenomenological significance. Study of terrazzo\'s environmental performance shows exceptional durability and low maintenance needs.',
    PHD: 'Scholarship on Art Deco terrazzo contributes to broader debates about craft knowledge, material authenticity, and architectural representation. Research areas include: detailed examination of NTMA archives documenting technical standardization, apprenticeship systems, and industry promotion; investigation of terrazzo pattern book circulation and its role in design dissemination; materials science research on period formulations using chemical and petrographic analysis; study of terrazzo in labor history examining craft identity, unionization, and ethnic networks; analysis of terrazzo photography and representation in architectural publications; examination of preservation philosophy balancing material authenticity with functional requirements; investigation of terrazzo\'s acoustic and thermal properties through building science methods; theoretical inquiry into how horizontal surfaces structure embodied spatial experience; and digital humanities approaches creating databases of documented terrazzo installations enabling pattern analysis and stylistic mapping. Recent scholarship also examines terrazzo through sustainability lenses comparing life-cycle impacts with competing materials.',
  },

  characteristics: [
    'Composite material of aggregate chips in cementitious matrix',
    'Ground and polished to smooth, glossy finish',
    'Geometric patterns created with metal divider strips',
    'Colors include black, white, red, green, gold, and many variations',
    'Extremely durable and long-lasting',
    'Common in lobbies, corridors, and public spaces',
    'Patterns include borders, medallions, overall geometric designs',
    'Brass, zinc, or aluminum dividers separate colored sections',
  ],

  famousExamples: [
    { name: 'Empire State Building Lobby', location: 'New York, USA', year: '1930-1931', description: 'Geometric terrazzo floors with Art Deco patterns throughout public spaces' },
    { name: 'Radio City Music Hall', location: 'New York, USA', year: '1932', description: 'Elaborate terrazzo floors with pictorial and geometric designs' },
    { name: 'Hoover Dam', location: 'Nevada-Arizona, USA', year: '1931-1936', description: 'Terrazzo floors with inlaid map designs and geometric patterns' },
    { name: 'Cincinnati Union Terminal', location: 'Cincinnati, USA', year: '1933', description: 'Colorful terrazzo floors complementing Art Deco murals and architecture' },
    { name: 'Los Angeles Central Library', location: 'Los Angeles, USA', year: '1926', description: 'Geometric terrazzo floors with zodiac and decorative motifs' },
  ],

  confusionPairs: [
    {
      elementId: 'mosaic-floor',
      reason: 'Both are decorative composite floors with patterns',
      distinction: 'Terrazzo uses aggregate chips embedded in matrix and polished smooth; mosaic uses individual tiles creating textured surface',
    },
    {
      elementId: 'marble-inlay',
      reason: 'Both create patterns in stone flooring',
      distinction: 'Marble inlay uses cut stone pieces fitted together; terrazzo uses aggregate chips in continuous matrix',
    },
  ],

  searchTags: ['terrazzo', 'flooring', 'art-deco', 'geometric', 'pattern', 'marble', 'chips', 'polished', 'lobby', '1920s', '1930s', 'composite'],

  arMetadata: {
    modelPath: '/models/architecture/terrazzo-art-deco.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Marble Aggregate', position: { x: -0.05, y: 0, z: 0.02 } },
      { label: 'Brass Divider Strip', position: { x: 0, y: 0, z: 0.02 } },
      { label: 'Cement Matrix', position: { x: 0.05, y: 0, z: 0.02 } },
      { label: 'Polished Surface', position: { x: 0, y: 0.02, z: 0.02 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
