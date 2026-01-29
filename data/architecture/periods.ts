// Architectural Periods - Complete chronological history of architecture
// From ancient civilizations to contemporary movements

import { ArchitecturalPeriod, GeographicRegion, LeveledContent } from './types';

export interface PeriodDefinition {
  id: ArchitecturalPeriod;
  name: string;
  shortName: string;

  // Timeline
  startYear: number;          // Negative for BCE
  endYear: number;            // Use current year for ongoing
  ongoing?: boolean;

  // Geographic scope
  primaryRegions: GeographicRegion[];

  // Visual identity
  color: string;              // For timeline visualization
  icon: string;               // Emoji or icon

  // Educational content
  description: LeveledContent;
  keyCharacteristics: string[];

  // Notable examples
  iconicBuildings: {
    name: string;
    location: string;
    year: string;
  }[];

  // Context
  influencedBy: ArchitecturalPeriod[];
  influenced: ArchitecturalPeriod[];

  // Fun facts
  funFact: string;
}

export const ARCHITECTURAL_PERIODS: PeriodDefinition[] = [
  // ==========================================================================
  // ANCIENT WORLD
  // ==========================================================================
  {
    id: 'ancient-egyptian',
    name: 'Ancient Egyptian',
    shortName: 'Egyptian',
    startYear: -3100,
    endYear: -30,
    primaryRegions: ['north-africa', 'middle-east'],
    color: '#D4A574',
    icon: '🏺',
    description: {
      ELEMENTARY: 'The ancient Egyptians built incredible pyramids and temples that still stand after thousands of years! They built for their pharaohs and gods using huge stone blocks.',
      MIDDLE_SCHOOL: 'Egyptian architecture spans over 3,000 years, from the early pyramids to the great temples of Luxor and Karnak. They developed post-and-lintel construction, obelisks, and massive stone pylons.',
      HIGH_SCHOOL: 'Egyptian architecture demonstrates remarkable engineering achievements including pyramid construction, hypostyle halls with papyriform and lotiform columns, and sophisticated understanding of stone masonry and monumental scale.',
      UNDERGRADUATE: 'Ancient Egyptian architecture evolved from mastaba tombs to true pyramids, developed distinctive column orders based on papyrus and lotus plants, and established principles of axial temple planning that influenced Mediterranean architecture.',
      GRADUATE: 'Egyptian architectural development reveals sophisticated understanding of structural engineering, solar orientation, and symbolic geometry. The shift from stepped to true pyramids demonstrates iterative engineering refinement.',
      PHD: 'Current scholarship examines Egyptian construction techniques through experimental archaeology, questioning traditional theories about ramp systems and labor organization. Computational analysis of temple alignments reveals complex astronomical knowledge.',
    },
    keyCharacteristics: [
      'Pyramids and mastaba tombs',
      'Massive stone construction',
      'Papyriform and lotiform columns',
      'Hypostyle halls',
      'Obelisks',
      'Pylon temple gateways',
      'Hieroglyphic decoration',
      'Solar and stellar alignments',
    ],
    iconicBuildings: [
      { name: 'Great Pyramid of Giza', location: 'Giza, Egypt', year: 'c. 2560 BCE' },
      { name: 'Temple of Karnak', location: 'Luxor, Egypt', year: 'c. 2055-100 BCE' },
      { name: 'Abu Simbel', location: 'Aswan, Egypt', year: 'c. 1264 BCE' },
    ],
    influencedBy: [],
    influenced: ['classical-greek', 'roman'],
    funFact: 'The Great Pyramid was the tallest human-made structure for over 3,800 years!',
  },

  {
    id: 'mesopotamian',
    name: 'Mesopotamian',
    shortName: 'Mesopotamian',
    startYear: -3500,
    endYear: -539,
    primaryRegions: ['middle-east'],
    color: '#8B7355',
    icon: '🏛️',
    description: {
      ELEMENTARY: 'In ancient Mesopotamia (modern Iraq), people built huge stepped temples called ziggurats to reach toward the heavens. They also invented the arch!',
      MIDDLE_SCHOOL: 'Mesopotamian civilizations including Sumerians, Babylonians, and Assyrians developed mud-brick architecture, ziggurats, and early vaulting techniques. The famous Ishtar Gate featured glazed blue bricks.',
      HIGH_SCHOOL: 'Mesopotamian architecture pioneered fired brick construction, true arches, and barrel vaults. Palace complexes featured elaborate decorative programs with glazed tiles and carved reliefs depicting royal power.',
      UNDERGRADUATE: 'Mesopotamian architectural innovation includes the development of mud-brick standardization, bitumen waterproofing, and early structural vaulting. Ziggurat forms influenced religious architecture throughout the ancient Near East.',
      GRADUATE: 'Archaeological analysis reveals sophisticated Mesopotamian urban planning including grid systems, drainage infrastructure, and defensive architecture. Decorative programs functioned as political propaganda and religious symbolism.',
      PHD: 'Current research employs remote sensing and digital reconstruction to understand Mesopotamian building techniques and urban morphology. Studies examine the relationship between temple economics and architectural production.',
    },
    keyCharacteristics: [
      'Ziggurats (stepped temple platforms)',
      'Mud-brick construction',
      'Glazed decorative tiles',
      'Early true arches',
      'Barrel vaults',
      'Palace complexes',
      'Fortified city walls',
      'Drainage systems',
    ],
    iconicBuildings: [
      { name: 'Ziggurat of Ur', location: 'Nasiriyah, Iraq', year: 'c. 2100 BCE' },
      { name: 'Ishtar Gate', location: 'Babylon, Iraq', year: 'c. 575 BCE' },
      { name: 'Palace of Nineveh', location: 'Mosul, Iraq', year: 'c. 700 BCE' },
    ],
    influencedBy: [],
    influenced: ['ancient-persian', 'roman'],
    funFact: 'The Babylonians invented the 360-degree circle, which influenced how we measure arches today!',
  },

  {
    id: 'classical-greek',
    name: 'Classical Greek',
    shortName: 'Greek',
    startYear: -900,
    endYear: -30,
    primaryRegions: ['mediterranean'],
    color: '#FFFFFF',
    icon: '🏛️',
    description: {
      ELEMENTARY: 'The ancient Greeks created beautiful temples with tall columns that we still copy today! They invented three types of columns: Doric, Ionic, and Corinthian.',
      MIDDLE_SCHOOL: 'Greek architecture established the classical orders (Doric, Ionic, Corinthian) that would influence building design for millennia. Temples like the Parthenon demonstrate sophisticated understanding of proportion and optical refinement.',
      HIGH_SCHOOL: 'Greek architectural theory introduced concepts of symmetria (commensurability of parts), entasis (column curvature), and optical corrections. The orders codified proportional relationships between all building elements.',
      UNDERGRADUATE: 'Classical Greek architecture developed systematic approaches to proportion, rhythm, and visual refinement. The interplay of structure and ornament established principles that would define Western architectural tradition.',
      GRADUATE: 'Greek architectural theory, transmitted through Vitruvius, established canonical approaches to proportion, site selection, and building typology. Recent scholarship examines polychromy and the role of color in Greek temples.',
      PHD: 'Current research challenges traditional narratives of Greek architectural development, examining regional variations, non-temple typologies, and the relationship between architectural production and political economy.',
    },
    keyCharacteristics: [
      'The three orders: Doric, Ionic, Corinthian',
      'Temples with peristyle colonnades',
      'Post-and-lintel construction',
      'Entasis (column curvature)',
      'Optical refinements',
      'Marble construction',
      'Mathematical proportions',
      'Polychrome decoration',
    ],
    iconicBuildings: [
      { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE' },
      { name: 'Temple of Hephaestus', location: 'Athens, Greece', year: 'c. 450 BCE' },
      { name: 'Erechtheion', location: 'Athens, Greece', year: '421-406 BCE' },
    ],
    influencedBy: ['ancient-egyptian', 'minoan-mycenaean'],
    influenced: ['hellenistic', 'roman', 'renaissance', 'neoclassical'],
    funFact: 'The columns of the Parthenon lean slightly inward - if extended, they would meet about a mile above the building!',
  },

  {
    id: 'roman',
    name: 'Roman',
    shortName: 'Roman',
    startYear: -500,
    endYear: 476,
    primaryRegions: ['mediterranean', 'western-europe', 'middle-east', 'north-africa'],
    color: '#8B0000',
    icon: '🏟️',
    description: {
      ELEMENTARY: 'The Romans were master builders who invented concrete! They built huge domes, arches, and aqueducts that brought water to cities. The Colosseum could hold 50,000 people!',
      MIDDLE_SCHOOL: 'Roman architecture combined Greek orders with revolutionary innovations: concrete, true arches, barrel vaults, groin vaults, and domes. This enabled unprecedented spans and interior spaces.',
      HIGH_SCHOOL: 'Roman architectural innovation centered on opus caementicium (concrete) which enabled vaulted spaces impossible with post-and-lintel construction. The orders became decorative rather than structural, applied to arches and walls.',
      UNDERGRADUATE: 'Roman architecture developed sophisticated building typologies for civic, religious, and entertainment functions. Engineering innovations in concrete, vaulting, and infrastructure enabled an empire-wide building program.',
      GRADUATE: 'Roman concrete construction enabled new spatial configurations including the revolutionary interior space of the Pantheon. The integration of Greek aesthetic vocabulary with indigenous structural innovation created a distinctive architectural synthesis.',
      PHD: 'Current research examines Roman concrete composition and durability, construction logistics across the empire, and the social organization of building production. Digital modeling reveals sophisticated understanding of structural behavior.',
    },
    keyCharacteristics: [
      'Concrete (opus caementicium)',
      'True arches and vaults',
      'Domes (Pantheon)',
      'Amphitheaters and theaters',
      'Basilicas',
      'Triumphal arches',
      'Aqueducts',
      'Applied orders (decorative columns)',
    ],
    iconicBuildings: [
      { name: 'Pantheon', location: 'Rome, Italy', year: '126 CE' },
      { name: 'Colosseum', location: 'Rome, Italy', year: '80 CE' },
      { name: 'Pont du Gard', location: 'Nîmes, France', year: 'c. 19 BCE' },
    ],
    influencedBy: ['classical-greek', 'mesopotamian'],
    influenced: ['byzantine', 'romanesque', 'renaissance', 'neoclassical'],
    funFact: 'Roman concrete is so durable that the Pantheon\'s dome is still the world\'s largest unreinforced concrete dome after nearly 2,000 years!',
  },

  // ==========================================================================
  // MEDIEVAL
  // ==========================================================================
  {
    id: 'byzantine',
    name: 'Byzantine',
    shortName: 'Byzantine',
    startYear: 330,
    endYear: 1453,
    primaryRegions: ['eastern-europe', 'middle-east', 'mediterranean'],
    color: '#FFD700',
    icon: '☦️',
    description: {
      ELEMENTARY: 'Byzantine builders created churches with beautiful golden domes and glittering mosaics inside. The Hagia Sophia has a dome so big it looks like it\'s floating!',
      MIDDLE_SCHOOL: 'Byzantine architecture developed the pendentive dome, enabling circular domes over square bases. Churches featured central-plan layouts, extensive mosaic decoration, and iconostasis screens.',
      HIGH_SCHOOL: 'Byzantine architectural innovation centered on the pendentive - triangular sections that transition from square walls to circular domes. This structural solution enabled vast domed interiors filled with mosaic imagery.',
      UNDERGRADUATE: 'Byzantine architecture synthesized Roman structural technology with Eastern mysticism, creating spaces designed for liturgical function and theological symbolism. The centralized plan reflected cosmic and hierarchical meanings.',
      GRADUATE: 'Byzantine architectural development reveals sophisticated understanding of structural forces, light manipulation, and symbolic geometry. The relationship between architectural form and liturgical practice shaped Eastern Orthodox church design.',
      PHD: 'Current scholarship examines Byzantine construction techniques through structural analysis and material science, the transmission of architectural knowledge through workshop traditions, and the political dimensions of imperial building programs.',
    },
    keyCharacteristics: [
      'Pendentive domes',
      'Central-plan churches',
      'Mosaic decoration',
      'Iconostasis screens',
      'Multiple domes',
      'Exterior brick patterns',
      'Gold leaf and glass tesserae',
      'Mystical use of light',
    ],
    iconicBuildings: [
      { name: 'Hagia Sophia', location: 'Istanbul, Turkey', year: '537 CE' },
      { name: 'San Vitale', location: 'Ravenna, Italy', year: '547 CE' },
      { name: 'St. Mark\'s Basilica', location: 'Venice, Italy', year: '1092 CE' },
    ],
    influencedBy: ['roman'],
    influenced: ['early-islamic', 'romanesque', 'ottoman'],
    funFact: 'When the Hagia Sophia was completed, Emperor Justinian supposedly exclaimed "Solomon, I have surpassed thee!"',
  },

  {
    id: 'medieval-ethiopian',
    name: 'Medieval Ethiopian',
    shortName: 'Zagwe',
    startYear: 1137,
    endYear: 1270,
    primaryRegions: ['east-africa'],
    color: '#8B4513',
    icon: '✝️',
    description: {
      ELEMENTARY: 'Ethiopian builders carved entire churches from solid rock! They dug down from the top, creating buildings without ever stacking stones - like sculpting giant sculptures.',
      MIDDLE_SCHOOL: 'During the Zagwe Dynasty, Ethiopian masons carved 11 monolithic churches at Lalibela from living rock. Using only hand tools, they created complete buildings by removing stone from top to bottom.',
      HIGH_SCHOOL: 'Medieval Ethiopian architecture pioneered subtractive construction - creating buildings by carving away material rather than adding it. The rock-cut churches demonstrate sophisticated structural understanding and spiritual symbolism.',
      UNDERGRADUATE: 'Zagwe Dynasty architecture at Lalibela represents a unique architectural paradigm where structure and ornament are inseparable from the parent rock. The top-down carving method required precise geometric planning and structural foresight.',
      GRADUATE: 'Ethiopian rock-cut architecture reveals sophisticated engineering adapted to volcanic basalt, with excavation trenches serving structural, ceremonial, and drainage functions. Axumite architectural influences merged with Byzantine Christian symbolism.',
      PHD: 'Current scholarship examines Lalibela\'s construction through structural geology, questions dating methodologies, and analyzes the churches as embodiments of New Jerusalem theology. Recent photogrammetry reveals construction sequence and planning systems.',
    },
    keyCharacteristics: [
      'Monolithic rock-cut churches',
      'Top-down carving method',
      'Subtractive architecture',
      'Excavation trenches and courtyards',
      'Greek cross and cruciform plans',
      'Axumite architectural influence',
      'Ethiopian Christian symbolism',
      'Seismic-resistant construction',
    ],
    iconicBuildings: [
      { name: 'Biete Ghiorgis (Church of St. George)', location: 'Lalibela, Ethiopia', year: 'c. 1200' },
      { name: 'Biete Medhane Alem', location: 'Lalibela, Ethiopia', year: 'c. 1180-1200' },
      { name: 'Biete Maryam', location: 'Lalibela, Ethiopia', year: 'c. 1180-1200' },
    ],
    influencedBy: ['byzantine'],
    influenced: [],
    funFact: 'Biete Ghiorgis is carved 12 meters deep into the ground - over 3,400 cubic meters of rock was excavated around it without using explosives!',
  },

  {
    id: 'romanesque',
    name: 'Romanesque',
    shortName: 'Romanesque',
    startYear: 1000,
    endYear: 1200,
    primaryRegions: ['western-europe'],
    color: '#8B4513',
    icon: '⛪',
    description: {
      ELEMENTARY: 'Romanesque churches look like castles with their thick stone walls and round arches. They were built to last forever and protect holy treasures inside!',
      MIDDLE_SCHOOL: 'Romanesque architecture is characterized by massive stone construction, round arches, barrel and groin vaults, and fortress-like appearance. Churches featured thick walls, small windows, and towers.',
      HIGH_SCHOOL: 'Romanesque architecture developed systematic approaches to stone vaulting, enabling fireproof church construction. The pilgrimage church typology emerged with ambulatories, radiating chapels, and elaborate sculptural programs.',
      UNDERGRADUATE: 'Romanesque architecture marks the first pan-European architectural movement since Rome, developing regional variations while sharing structural vocabulary. Sculptural programs at portals functioned as theological instruction.',
      GRADUATE: 'Romanesque architectural development reflects the intersection of monastic reform movements, pilgrimage culture, and feudal political organization. Regional schools demonstrate technological experimentation with vaulting systems.',
      PHD: 'Current research examines Romanesque building campaigns through archaeological analysis, construction chronology, and the organization of stone quarrying and transport. Studies reveal sophisticated structural understanding despite apparent massiveness.',
    },
    keyCharacteristics: [
      'Round (semicircular) arches',
      'Thick masonry walls',
      'Barrel and groin vaults',
      'Small windows',
      'Towers (westwork)',
      'Sculptural portals',
      'Blind arcades',
      'Fortress-like appearance',
    ],
    iconicBuildings: [
      { name: 'Durham Cathedral', location: 'Durham, England', year: '1093-1133' },
      { name: 'Pisa Cathedral', location: 'Pisa, Italy', year: '1063-1092' },
      { name: 'Cluny Abbey III', location: 'Cluny, France', year: '1088-1130' },
    ],
    influencedBy: ['roman', 'byzantine'],
    influenced: ['gothic'],
    funFact: 'Romanesque churches were so dark inside that monks sometimes couldn\'t read their prayer books - this helped inspire the Gothic style with its bigger windows!',
  },

  {
    id: 'gothic',
    name: 'Gothic',
    shortName: 'Gothic',
    startYear: 1150,
    endYear: 1500,
    primaryRegions: ['western-europe'],
    color: '#4A4A4A',
    icon: '⛪',
    description: {
      ELEMENTARY: 'Gothic cathedrals reach toward the sky with pointed arches and huge stained glass windows! Flying buttresses on the outside hold up the walls so windows can be gigantic.',
      MIDDLE_SCHOOL: 'Gothic architecture revolutionized building with pointed arches, ribbed vaults, and flying buttresses. These innovations allowed walls to become mostly glass, filling churches with colored light.',
      HIGH_SCHOOL: 'Gothic structural innovation concentrated loads at specific points, enabling dissolution of the wall into glass. The pointed arch, ribbed vault, and flying buttress formed an integrated structural system allowing unprecedented height and luminosity.',
      UNDERGRADUATE: 'Gothic architecture represents a complete rethinking of structural logic, replacing mass with linear elements. The skeletal frame anticipated modern structural thinking, while iconographic programs expressed scholastic theology.',
      GRADUATE: 'Gothic architectural development reveals sophisticated empirical engineering, with master masons developing proportional systems and structural rules of thumb transmitted through workshop practice. Regional variations demonstrate diverse approaches to the Gothic vocabulary.',
      PHD: 'Current research employs structural modeling to understand Gothic structural behavior, examining the extent to which medieval builders understood the forces at work. Studies of construction records reveal project management and labor organization.',
    },
    keyCharacteristics: [
      'Pointed arches',
      'Ribbed vaults',
      'Flying buttresses',
      'Large stained glass windows',
      'Rose windows',
      'Tracery (bar and plate)',
      'Verticality and height',
      'Sculptural programs',
    ],
    iconicBuildings: [
      { name: 'Notre-Dame de Paris', location: 'Paris, France', year: '1163-1345' },
      { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1220' },
      { name: 'Cologne Cathedral', location: 'Cologne, Germany', year: '1248-1880' },
    ],
    influencedBy: ['romanesque'],
    influenced: ['gothic-revival', 'isabelline-gothic'],
    funFact: 'Gothic cathedrals were originally painted in bright colors inside - the stone gray we see today is just centuries of wear!',
  },

  {
    id: 'isabelline-gothic',
    name: 'Isabelline Gothic',
    shortName: 'Isabelline',
    startYear: 1474,
    endYear: 1516,
    primaryRegions: ['iberia'],
    color: '#D4AF37',
    icon: '👑',
    description: {
      ELEMENTARY: 'Isabelline buildings in Spain are covered with incredible decorations! Stone carves look like lace, with plants, animals, and royal symbols covering every inch.',
      MIDDLE_SCHOOL: 'Named after Queen Isabel I of Castile, Isabelline Gothic combines Gothic structure with extreme ornamental elaboration. Stone facades feature dense vegetal carving, heraldic devices, and sculptural programs.',
      HIGH_SCHOOL: 'Isabelline architecture represents "intentional excess" - Gothic structural systems overlaid with tapestry-like decoration mixing biblical, heraldic, and naturalistic elements. The style served royal propaganda during the Reconquista.',
      UNDERGRADUATE: 'Isabelline Gothic synthesized Gothic structure, Mudéjar craftsmanship, Flemish artistic influence, and Italian Renaissance motifs. The style\'s political dimensions expressed Catholic Monarchs\' consolidation of power and religious identity.',
      GRADUATE: 'Isabelline architecture\'s dense ornamental programs encoded complex political messages during Castilian consolidation. The transition from Gothic to Plateresque reveals shifting patronage patterns and cultural exchange with Italy.',
      PHD: 'Current scholarship examines Isabelline architecture through frameworks of royal propaganda, workshop organization, and the fusion of Islamic and Christian artistic traditions. Material analysis reveals pigment and gilding programs.',
    },
    keyCharacteristics: [
      'Extreme decorative elaboration',
      'Gothic structure with Renaissance ornament',
      'Plateresque stone carving (silversmith-like)',
      'Heraldic altarpiece facades',
      'Astwerk (vegetal branch work)',
      'Wild men and grotesque figures',
      'Ogee and trefoil arches',
      'Horror vacui (fear of empty space)',
    ],
    iconicBuildings: [
      { name: 'Colegio de San Gregorio', location: 'Valladolid, Spain', year: '1488-1498' },
      { name: 'San Juan de los Reyes', location: 'Toledo, Spain', year: '1477-1504' },
      { name: 'Monastery of Santa María de Guadalupe', location: 'Cáceres, Spain', year: 'c. 1490' },
    ],
    influencedBy: ['gothic', 'early-islamic'],
    influenced: ['plateresque', 'spanish-renaissance'],
    funFact: 'The facade of Colegio de San Gregorio features 16 carved "wild men" - hairy primitive figures symbolizing nature tamed by learning!',
  },

  {
    id: 'early-islamic',
    name: 'Early Islamic',
    shortName: 'Islamic',
    startYear: 650,
    endYear: 1000,
    primaryRegions: ['middle-east', 'north-africa'],
    color: '#006400',
    icon: '🕌',
    description: {
      ELEMENTARY: 'Islamic architects created beautiful mosques with tall towers called minarets and courtyards where people can pray. They decorated buildings with amazing geometric patterns!',
      MIDDLE_SCHOOL: 'Islamic architecture developed distinctive forms including the hypostyle mosque, minaret, and dome. Decoration featured geometric patterns, calligraphy, and arabesques rather than human images.',
      HIGH_SCHOOL: 'Early Islamic architecture synthesized Roman, Byzantine, and Persian traditions into distinctive forms serving Muslim religious practice. The prohibition on figural imagery led to sophisticated geometric and calligraphic decoration.',
      UNDERGRADUATE: 'Islamic architectural development established typologies for the mosque, madrasa, caravanserai, and palace. The qibla orientation, minaret, and mihrab became universal elements while regional traditions developed distinctive vocabularies.',
      GRADUATE: 'Islamic architecture demonstrates sophisticated understanding of climate response, water management, and urban morphology. Geometric patterns encode mathematical knowledge while calligraphic programs convey religious and political messages.',
      PHD: 'Current research examines the transmission of architectural knowledge across the Islamic world, the role of patronage in architectural production, and the relationship between religious law and spatial organization.',
    },
    keyCharacteristics: [
      'Minarets',
      'Domes',
      'Horseshoe and pointed arches',
      'Courtyards (sahn)',
      'Mihrab (prayer niche)',
      'Geometric decoration',
      'Arabesques',
      'Calligraphy',
    ],
    iconicBuildings: [
      { name: 'Dome of the Rock', location: 'Jerusalem', year: '691 CE' },
      { name: 'Great Mosque of Damascus', location: 'Damascus, Syria', year: '715 CE' },
      { name: 'Great Mosque of Córdoba', location: 'Córdoba, Spain', year: '784-987 CE' },
    ],
    influencedBy: ['byzantine', 'ancient-persian', 'roman'],
    influenced: ['moorish', 'ottoman-classical', 'mughal'],
    funFact: 'The Great Mosque of Córdoba has over 850 columns - many recycled from Roman and Visigothic buildings!',
  },

  {
    id: 'ottoman-classical',
    name: 'Ottoman Classical',
    shortName: 'Ottoman',
    startYear: 1453,
    endYear: 1703,
    primaryRegions: ['middle-east', 'eastern-europe', 'north-africa'],
    color: '#8B0000',
    icon: '🕌',
    description: {
      ELEMENTARY: 'Ottoman architects built palaces with beautiful pavilions and blue-tiled rooms! Instead of one big building, they created gardens filled with elegant kiosks with golden domes.',
      MIDDLE_SCHOOL: 'Ottoman architecture developed distinctive palace organization through layered courtyards and freestanding pavilions (kiosks). Iznik tiles, muqarnas vaulting, and conical tent-inspired ceilings characterized the style.',
      HIGH_SCHOOL: 'Classical Ottoman architecture synthesized Byzantine structural systems, Islamic geometric decoration, and Central Asian nomadic traditions. The organic courtyard palace model contrasted with European monolithic palace design.',
      UNDERGRADUATE: 'Ottoman architectural development reveals progressive spatial organization through sequential courtyards establishing hierarchical access. Kiosk architecture maintained cultural connections to nomadic tent traditions while employing permanent materials.',
      GRADUATE: 'Ottoman palace architecture\'s flexible courtyard aggregation enabled organic growth over centuries, reflecting patronage patterns and functional evolution. Decorative programs integrated Iznik ceramic innovation, nacre inlay, and imperial calligraphy.',
      PHD: 'Current scholarship examines Ottoman architectural workshops, the transmission of building knowledge, and the palace as political theater. Material studies of Iznik tile production reveal technological development and declining quality in later periods.',
    },
    keyCharacteristics: [
      'Layered courtyard organization',
      'Kiosk and pavilion architecture',
      'Central domes with columned porticos',
      'Iznik tile decoration (blue, red, green)',
      'Muqarnas honeycomb vaulting',
      'Tented ceilings (nomadic heritage)',
      'Four-iwan plan with sofas',
      'Ottoman imperial calligraphy',
    ],
    iconicBuildings: [
      { name: 'Topkapi Palace', location: 'Istanbul, Turkey', year: '1459-1856' },
      { name: 'Baghdad Kiosk', location: 'Istanbul, Turkey', year: '1638-1639' },
      { name: 'Süleymaniye Mosque', location: 'Istanbul, Turkey', year: '1550-1558' },
    ],
    influencedBy: ['byzantine', 'early-islamic', 'ancient-persian'],
    influenced: ['ottoman-baroque'],
    funFact: 'The Baghdad Kiosk at Topkapi Palace has a ceiling painted ultramarine blue and studded with golden stars to evoke the heavens - and traditional Ottoman tents!',
  },

  // ==========================================================================
  // RENAISSANCE TO EARLY MODERN
  // ==========================================================================
  {
    id: 'renaissance',
    name: 'Renaissance',
    shortName: 'Renaissance',
    startYear: 1400,
    endYear: 1600,
    primaryRegions: ['mediterranean', 'western-europe'],
    color: '#D2691E',
    icon: '🏰',
    description: {
      ELEMENTARY: 'Renaissance architects looked back at ancient Greek and Roman buildings and made them new again! They used domes, columns, and perfect geometric shapes.',
      MIDDLE_SCHOOL: 'Renaissance architecture revived classical forms including the orders, domes, and symmetry. Architects like Brunelleschi, Alberti, and Palladio established principles still used today.',
      HIGH_SCHOOL: 'Renaissance architecture marked a self-conscious return to classical antiquity, interpreting Vitruvius and Roman ruins. Theoretical treatises established architecture as a liberal art based on mathematical proportion.',
      UNDERGRADUATE: 'Renaissance architectural theory developed systematic approaches to proportion, the orders, and building typology. Brunelleschi\'s dome and Alberti\'s treatises established new relationships between practice and theory.',
      GRADUATE: 'Renaissance architecture reveals the intersection of humanist scholarship, patronage, and professional practice. The development of architectural drawing and publication transformed knowledge transmission.',
      PHD: 'Current research examines Renaissance architecture through the lens of material culture, construction practice, and social history, moving beyond the traditional focus on great architects and their theoretical writings.',
    },
    keyCharacteristics: [
      'Revival of classical orders',
      'Symmetry and proportion',
      'Domes (Brunelleschi)',
      'Rusticated stonework',
      'Pediments',
      'Pilasters',
      'Centralized plans',
      'Mathematical harmony',
    ],
    iconicBuildings: [
      { name: 'Florence Cathedral Dome', location: 'Florence, Italy', year: '1420-1436' },
      { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1506-1626' },
      { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1592' },
    ],
    influencedBy: ['roman', 'classical-greek'],
    influenced: ['baroque', 'neoclassical'],
    funFact: 'Brunelleschi built the dome of Florence Cathedral without scaffolding from the ground - no one knew exactly how he did it during his lifetime!',
  },

  {
    id: 'baroque',
    name: 'Baroque',
    shortName: 'Baroque',
    startYear: 1600,
    endYear: 1750,
    primaryRegions: ['western-europe', 'mediterranean', 'south-america'],
    color: '#FFD700',
    icon: '👑',
    description: {
      ELEMENTARY: 'Baroque buildings are full of drama and excitement! They have curvy walls, lots of gold decoration, and make you feel small and amazed when you walk inside.',
      MIDDLE_SCHOOL: 'Baroque architecture features dramatic curved forms, theatrical lighting, and lavish decoration. It was designed to impress visitors and show the power of kings and the Catholic Church.',
      HIGH_SCHOOL: 'Baroque architecture employed dynamic spatial effects including curved walls, dramatic lighting, and illusionistic ceiling paintings. The style served Counter-Reformation religious programs and absolutist political expression.',
      UNDERGRADUATE: 'Baroque architecture manipulated space, light, and ornament to create theatrical effects supporting religious and political meanings. Regional variations from Roman to Austrian to Latin American demonstrate adaptive transformation.',
      GRADUATE: 'Baroque architectural space reveals sophisticated understanding of human perception, employing perspective, lighting, and material effects to create specific experiential and emotional responses in viewers.',
      PHD: 'Current research examines Baroque architecture through phenomenological, semiotic, and social-historical frameworks, analyzing the relationship between architectural space and embodied experience.',
    },
    keyCharacteristics: [
      'Curved and dynamic forms',
      'Dramatic lighting effects',
      'Lavish ornamentation',
      'Broken pediments',
      'Solomonic columns',
      'Illusionistic ceiling paintings',
      'Grand staircases',
      'Theatrical spaces',
    ],
    iconicBuildings: [
      { name: 'Palace of Versailles', location: 'Versailles, France', year: '1661-1715' },
      { name: 'Sant\'Ivo alla Sapienza', location: 'Rome, Italy', year: '1642-1660' },
      { name: 'Karlskirche', location: 'Vienna, Austria', year: '1716-1737' },
    ],
    influencedBy: ['renaissance', 'mannerism'],
    influenced: ['rococo', 'neoclassical'],
    funFact: 'The Palace of Versailles has 2,300 rooms, 67 staircases, and 2,153 windows - it took 36,000 workers to build!',
  },

  // ==========================================================================
  // 19TH CENTURY
  // ==========================================================================
  {
    id: 'neoclassical',
    name: 'Neoclassical',
    shortName: 'Neoclassical',
    startYear: 1750,
    endYear: 1850,
    primaryRegions: ['western-europe', 'north-america'],
    color: '#F5F5DC',
    icon: '🏛️',
    description: {
      ELEMENTARY: 'Neoclassical buildings look like ancient Greek and Roman temples! Many government buildings, like the US Capitol, use tall columns and triangular pediments.',
      MIDDLE_SCHOOL: 'Neoclassical architecture returned to pure Greek and Roman forms after the elaborate Baroque and Rococo periods. It expressed Enlightenment ideals of reason, democracy, and civic virtue.',
      HIGH_SCHOOL: 'Neoclassicism arose from archaeological discoveries at Pompeii and Herculaneum, theoretical writings, and Enlightenment philosophy. The style was adopted for civic buildings as an expression of democratic ideals.',
      UNDERGRADUATE: 'Neoclassical architecture reflects Enlightenment discourse on origins, beauty, and civic virtue. The Greek Revival and Roman Revival strands expressed different political associations and aesthetic theories.',
      GRADUATE: 'Neoclassical architecture\'s relationship to political ideology varied by context - revolutionary in France, conservative in Britain, democratic in America. Theoretical debates about origins and character shaped design approaches.',
      PHD: 'Current research examines Neoclassicism through postcolonial frameworks, analyzing its global transmission and local adaptations, the politics of archaeological interpretation, and the construction of national identities through classical reference.',
    },
    keyCharacteristics: [
      'Greek and Roman orders',
      'Temple fronts with pediments',
      'Symmetry and balance',
      'Minimal decoration',
      'Domes (for government buildings)',
      'Porticos and colonnades',
      'Clean geometric forms',
      'White or light colors',
    ],
    iconicBuildings: [
      { name: 'US Capitol Building', location: 'Washington DC, USA', year: '1793-1863' },
      { name: 'British Museum', location: 'London, UK', year: '1823-1852' },
      { name: 'Brandenburg Gate', location: 'Berlin, Germany', year: '1788-1791' },
    ],
    influencedBy: ['classical-greek', 'roman', 'renaissance'],
    influenced: ['beaux-arts'],
    funFact: 'Thomas Jefferson designed the Virginia State Capitol based on a Roman temple he\'d never seen in person - only from drawings!',
  },

  {
    id: 'art-nouveau',
    name: 'Art Nouveau',
    shortName: 'Art Nouveau',
    startYear: 1890,
    endYear: 1910,
    primaryRegions: ['western-europe', 'north-america'],
    color: '#50C878',
    icon: '🌿',
    description: {
      ELEMENTARY: 'Art Nouveau buildings look like plants came alive! Doorways curve like vines, windows look like flowers, and iron railings twist like branches.',
      MIDDLE_SCHOOL: 'Art Nouveau rejected historical styles, using organic forms inspired by plants and nature. Iron, glass, and ceramics enabled flowing curves and colorful decoration.',
      HIGH_SCHOOL: 'Art Nouveau emerged as a reaction against academic historicism, seeking a new style for the modern age. The movement embraced new materials and celebrated craftsmanship with organic, flowing forms.',
      UNDERGRADUATE: 'Art Nouveau\'s organic vocabulary reflected influences from Japanese art, Arts and Crafts philosophy, and Symbolist aesthetics. Regional variations - Jugendstil, Stile Liberty, Modernisme - developed distinctive characteristics.',
      GRADUATE: 'Art Nouveau architecture demonstrates the intersection of Arts and Crafts ideology, new construction technologies, and avant-garde aesthetics. The total work of art (Gesamtkunstwerk) concept integrated all design elements.',
      PHD: 'Current research examines Art Nouveau through the lens of material culture, examining craft production, commercial networks, and the construction of modern identities through designed environments.',
    },
    keyCharacteristics: [
      'Organic, flowing curves',
      'Nature-inspired forms (plants, flowers)',
      'Whiplash lines',
      'Iron and glass',
      'Colorful ceramics and mosaics',
      'Asymmetry',
      'Integration of structure and decoration',
      'Handcrafted details',
    ],
    iconicBuildings: [
      { name: 'Casa Batlló', location: 'Barcelona, Spain', year: '1904-1906' },
      { name: 'Hôtel Tassel', location: 'Brussels, Belgium', year: '1892-1893' },
      { name: 'Paris Métro Entrances', location: 'Paris, France', year: '1900' },
    ],
    influencedBy: ['arts-and-crafts', 'gothic'],
    influenced: ['art-deco', 'international-style'],
    funFact: 'Gaudí\'s Casa Batlló is nicknamed "House of Bones" because its balconies look like skulls and the columns like bones!',
  },

  // ==========================================================================
  // 20TH CENTURY
  // ==========================================================================
  {
    id: 'art-deco',
    name: 'Art Deco',
    shortName: 'Art Deco',
    startYear: 1920,
    endYear: 1940,
    primaryRegions: ['north-america', 'western-europe', 'global'],
    color: '#C9A959',
    icon: '🌆',
    description: {
      ELEMENTARY: 'Art Deco buildings look like they\'re from the future! Tall skyscrapers with zigzag patterns, sunbursts, and shiny chrome decorations made cities look exciting.',
      MIDDLE_SCHOOL: 'Art Deco combined modern materials with bold geometric decoration. Skyscrapers like the Chrysler Building featured setbacks, sunburst patterns, and stylized natural forms.',
      HIGH_SCHOOL: 'Art Deco synthesized modernist abstraction with decorative exuberance, responding to both the machine age and traditional craftsmanship. The style became associated with glamour, progress, and urban modernity.',
      UNDERGRADUATE: 'Art Deco architecture negotiated tensions between modernist functionalism and decorative tradition, embracing new technologies and materials while maintaining ornamental expression. The style served commercial and civic symbolism.',
      GRADUATE: 'Art Deco\'s global dissemination reveals processes of cultural exchange, colonial networks, and local adaptation. The style\'s commercial associations and eventual displacement by International Style raise questions about modernity and ornament.',
      PHD: 'Current research examines Art Deco through frameworks of global modernism, examining its development across diverse contexts and its relationship to colonial modernity, consumerism, and national identity construction.',
    },
    keyCharacteristics: [
      'Geometric patterns (zigzags, sunbursts)',
      'Stepped or setback forms',
      'Stylized natural motifs',
      'Chrome, glass, and exotic materials',
      'Bold colors',
      'Vertical emphasis',
      'Egyptian and Aztec influences',
      'Streamlined forms',
    ],
    iconicBuildings: [
      { name: 'Chrysler Building', location: 'New York City, USA', year: '1928-1930' },
      { name: 'Empire State Building', location: 'New York City, USA', year: '1930-1931' },
      { name: 'Palais de Tokyo', location: 'Paris, France', year: '1937' },
    ],
    influencedBy: ['art-nouveau', 'international-style'],
    influenced: ['postmodernism'],
    funFact: 'The Chrysler Building\'s eagle ornaments are actually modeled after the 1929 Chrysler automobile hood ornaments!',
  },

  {
    id: 'international-style',
    name: 'International Style / Modernism',
    shortName: 'Modernism',
    startYear: 1920,
    endYear: 1970,
    primaryRegions: ['global'],
    color: '#FFFFFF',
    icon: '🏢',
    description: {
      ELEMENTARY: 'Modernist buildings are like clean, simple boxes. They use lots of glass and steel, have flat roofs, and don\'t have any fancy decoration - the shape IS the beauty!',
      MIDDLE_SCHOOL: 'The International Style eliminated ornament, using glass, steel, and concrete to create simple geometric forms. Architects like Le Corbusier and Mies van der Rohe believed form should follow function.',
      HIGH_SCHOOL: 'Modernist architecture rejected historical styles, embracing industrial materials and technologies. The machine aesthetic, expressed through standardization, transparency, and flowing space, embodied progressive social ideals.',
      UNDERGRADUATE: 'Modernist architectural theory developed from multiple sources: Bauhaus pedagogy, CIAM doctrine, and individual architects\' writings. The movement\'s utopian social agenda intersected with corporate and governmental patronage.',
      GRADUATE: 'Modernist architecture\'s relationship to social transformation remains contested, with critics questioning both its technological determinism and its colonial dimensions in global dissemination.',
      PHD: 'Current research examines Modernism through diverse frameworks: postcolonial critiques, gender analysis, material culture studies, and revisionist histories of marginalized practitioners and regional variations.',
    },
    keyCharacteristics: [
      'Rejection of ornament',
      'Glass curtain walls',
      'Steel and reinforced concrete',
      'Flat roofs',
      'Open floor plans',
      'Pilotis (supporting columns)',
      'Ribbon windows',
      'White or neutral colors',
    ],
    iconicBuildings: [
      { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931' },
      { name: 'Seagram Building', location: 'New York City, USA', year: '1954-1958' },
      { name: 'Farnsworth House', location: 'Plano, Illinois, USA', year: '1945-1951' },
    ],
    influencedBy: ['art-nouveau', 'chicago-school'],
    influenced: ['brutalism', 'high-tech', 'postmodernism'],
    funFact: 'Le Corbusier\'s Villa Savoye was nearly demolished for a school - it was saved and is now a French national monument!',
  },

  {
    id: 'brutalism',
    name: 'Brutalism',
    shortName: 'Brutalism',
    startYear: 1950,
    endYear: 1980,
    primaryRegions: ['global'],
    color: '#808080',
    icon: '🏗️',
    description: {
      ELEMENTARY: 'Brutalist buildings look like giant concrete sculptures! They\'re massive and powerful, with rough textures that show exactly what they\'re made of.',
      MIDDLE_SCHOOL: 'Brutalism uses raw concrete (béton brut in French) left exposed, showing construction marks and textures. These massive buildings express their structure honestly and powerfully.',
      HIGH_SCHOOL: 'Brutalism emerged from Le Corbusier\'s late work, embracing raw concrete, massive forms, and exposed structure. The style served public and institutional buildings with expressive monumentality.',
      UNDERGRADUATE: 'Brutalist architecture\'s ethical dimension emphasized material honesty and social purpose. The style\'s association with public housing and institutional buildings reflects post-war social democratic ambitions.',
      GRADUATE: 'Brutalism\'s critical rehabilitation reveals shifting frameworks for evaluating architectural value. Recent preservation debates address material deterioration, changing social associations, and adaptive reuse challenges.',
      PHD: 'Current research examines Brutalism through perspectives of heritage conservation, concrete technology and deterioration, and the politics of public memory, challenging earlier dismissals of the movement.',
    },
    keyCharacteristics: [
      'Raw, exposed concrete (béton brut)',
      'Massive, monolithic forms',
      'Bold geometric shapes',
      'Visible construction marks',
      'Fortress-like appearance',
      'Minimal windows',
      'Sculptural expression',
      'Integration with landscape',
    ],
    iconicBuildings: [
      { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976' },
      { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967' },
      { name: 'National Theatre', location: 'London, UK', year: '1976' },
    ],
    influencedBy: ['international-style'],
    influenced: ['postmodernism', 'deconstructivism'],
    funFact: 'Brutalism comes from the French "béton brut" meaning "raw concrete" - not from "brutal" as many people think!',
  },

  {
    id: 'postmodernism',
    name: 'Postmodernism',
    shortName: 'Postmodern',
    startYear: 1970,
    endYear: 2000,
    primaryRegions: ['global'],
    color: '#FF69B4',
    icon: '🎭',
    description: {
      ELEMENTARY: 'Postmodern buildings are playful and colorful! They might have classical columns but use them in funny ways, or have unusual shapes and bright colors.',
      MIDDLE_SCHOOL: 'Postmodern architecture rejected Modernism\'s rules, bringing back historical elements, color, and decoration - often with humor and irony. Architects quoted from many styles and eras.',
      HIGH_SCHOOL: 'Postmodernism challenged Modernist orthodoxy through historical reference, decoration, and symbolic meaning. Architects like Venturi, Graves, and Johnson embraced complexity and contradiction.',
      UNDERGRADUATE: 'Postmodern architectural theory drew on linguistics, semiotics, and philosophy to critique Modernist assumptions about meaning, function, and progress. Historicism served varied ideological purposes.',
      GRADUATE: 'Postmodern architecture\'s diverse tendencies - populist, historicist, deconstructivist - resist unified characterization. The movement\'s critique of Modernist universalism anticipated broader postmodern theory.',
      PHD: 'Current research examines Postmodernism\'s legacy, its relationship to neoliberalism and consumer culture, and its ongoing influence on contemporary practice. Revisionist accounts complicate earlier dismissals.',
    },
    keyCharacteristics: [
      'Historical references and quotations',
      'Color and ornamentation',
      'Irony and humor',
      'Broken pediments and columns',
      'Mixing of styles',
      'Symbolic and communicative forms',
      'Rejection of "less is more"',
      'Contextual responses',
    ],
    iconicBuildings: [
      { name: 'AT&T Building (550 Madison)', location: 'New York City, USA', year: '1978-1984' },
      { name: 'Piazza d\'Italia', location: 'New Orleans, USA', year: '1978' },
      { name: 'Portland Building', location: 'Portland, Oregon, USA', year: '1980-1982' },
    ],
    influencedBy: ['brutalism', 'international-style', 'art-deco'],
    influenced: ['deconstructivism', 'parametricism'],
    funFact: 'Philip Johnson\'s AT&T Building (now 550 Madison) has a top shaped like a Chippendale dresser - a piece of furniture!',
  },

  {
    id: 'deconstructivism',
    name: 'Deconstructivism',
    shortName: 'Decon',
    startYear: 1980,
    endYear: 2025,
    ongoing: true,
    primaryRegions: ['global'],
    color: '#9932CC',
    icon: '💥',
    description: {
      ELEMENTARY: 'Deconstructivist buildings look like they\'re exploding or melting! Walls lean, corners twist, and nothing seems to be where you\'d expect it.',
      MIDDLE_SCHOOL: 'Deconstructivist architecture fragments and distorts familiar forms. Buildings by architects like Gehry, Hadid, and Libeskind challenge our expectations with unusual angles and shapes.',
      HIGH_SCHOOL: 'Deconstructivism drew on Russian Constructivism and French philosophy to challenge architectural conventions. Buildings fragment, tilt, and distort, questioning stability and order.',
      UNDERGRADUATE: 'Deconstructivist architecture manifests philosophical concepts of instability, displacement, and difference in built form. The style\'s challenging geometries were enabled by new digital design tools.',
      GRADUATE: 'Deconstructivism\'s relationship to Derrida\'s philosophy remains debated - was it genuine intellectual engagement or stylistic appropriation? The movement\'s institutional consolidation through the 1988 MoMA exhibition is critically examined.',
      PHD: 'Current research examines Deconstructivism\'s legacy in contemporary digital practice, the gap between theoretical claims and lived experience, and the movement\'s relationship to late capitalism and spectacle architecture.',
    },
    keyCharacteristics: [
      'Fragmented and distorted forms',
      'Angular and colliding geometries',
      'Tilting and leaning elements',
      'Unpredictable and disorienting',
      'Exposed structure',
      'Challenging conventions',
      'Dynamic asymmetry',
      'Tension and conflict',
    ],
    iconicBuildings: [
      { name: 'Guggenheim Museum Bilbao', location: 'Bilbao, Spain', year: '1991-1997' },
      { name: 'Jewish Museum Berlin', location: 'Berlin, Germany', year: '1993-2001' },
      { name: 'CCTV Headquarters', location: 'Beijing, China', year: '2004-2012' },
    ],
    influencedBy: ['postmodernism', 'brutalism', 'international-style'],
    influenced: ['parametricism'],
    funFact: 'Gehry\'s Guggenheim Bilbao is covered in over 33,000 titanium tiles - each one slightly different to create its shimmering effect!',
  },

  // ==========================================================================
  // 21ST CENTURY
  // ==========================================================================
  {
    id: 'sustainable',
    name: 'Sustainable / Green Architecture',
    shortName: 'Sustainable',
    startYear: 2000,
    endYear: 2025,
    ongoing: true,
    primaryRegions: ['global'],
    color: '#228B22',
    icon: '🌱',
    description: {
      ELEMENTARY: 'Green buildings are kind to the Earth! They have plants on their roofs, solar panels, and use less energy. Some even make their own electricity!',
      MIDDLE_SCHOOL: 'Sustainable architecture minimizes environmental impact through energy efficiency, renewable materials, and integration with nature. Living walls, green roofs, and passive design are common features.',
      HIGH_SCHOOL: 'Sustainable architecture addresses climate change through carbon reduction, renewable energy, and resilient design. Certification systems like LEED provide frameworks for evaluating environmental performance.',
      UNDERGRADUATE: 'Sustainable architecture spans technological (photovoltaics, building management systems) and ecological (biomimicry, regenerative design) approaches. Life cycle assessment enables comprehensive environmental evaluation.',
      GRADUATE: 'Sustainable architecture\'s diverse frameworks - efficiency, sufficiency, regeneration - imply different design strategies and political orientations. The relationship between certification systems and genuine sustainability is debated.',
      PHD: 'Current research examines the performance gap between predicted and actual building performance, the social dimensions of sustainability, and the potential for buildings to serve as carbon sinks through mass timber construction.',
    },
    keyCharacteristics: [
      'Green roofs and living walls',
      'Solar panels and renewables',
      'Passive solar design',
      'Natural ventilation',
      'Rainwater harvesting',
      'Recycled and local materials',
      'Net-zero energy',
      'Biophilic design',
    ],
    iconicBuildings: [
      { name: 'Bosco Verticale', location: 'Milan, Italy', year: '2009-2014' },
      { name: 'The Edge', location: 'Amsterdam, Netherlands', year: '2014' },
      { name: 'One Central Park', location: 'Sydney, Australia', year: '2013' },
    ],
    influencedBy: ['international-style', 'high-tech'],
    influenced: [],
    funFact: 'The Bosco Verticale (Vertical Forest) in Milan has over 900 trees - the equivalent of 3 acres of forest growing on the building!',
  },

  {
    id: 'parametricism',
    name: 'Parametricism',
    shortName: 'Parametric',
    startYear: 2000,
    endYear: 2025,
    ongoing: true,
    primaryRegions: ['global'],
    color: '#00CED1',
    icon: '🌊',
    description: {
      ELEMENTARY: 'Parametric buildings look like they were made by computers - because they were! Flowing curves and complex shapes that would be impossible to design by hand.',
      MIDDLE_SCHOOL: 'Parametric architecture uses computer algorithms to create complex, flowing forms. Buildings by Zaha Hadid and others feature curves and shapes that would be impossible without digital tools.',
      HIGH_SCHOOL: 'Parametric design uses algorithmic processes to generate complex geometries responsive to multiple parameters. Digital fabrication enables construction of forms previously impossible or prohibitively expensive.',
      UNDERGRADUATE: 'Parametric architecture emerged from digital design research, enabling responsive, differentiated forms. Theoretical claims about the style\'s epochal significance remain contested.',
      GRADUATE: 'Parametric design\'s relationship to mass customization, computational morphogenesis, and responsive environments extends beyond formal expression to systemic approaches. Critics question its social and environmental implications.',
      PHD: 'Current research examines parametric design\'s material and construction implications, the epistemological claims of computation-based design, and the political economy of signature architecture in global urbanism.',
    },
    keyCharacteristics: [
      'Algorithmic/computational design',
      'Fluid, continuous surfaces',
      'Complex curvilinear geometry',
      'Digital fabrication',
      'Responsive to parameters',
      'Differentiation and gradient',
      'Biomimetic forms',
      'Tessellated surfaces',
    ],
    iconicBuildings: [
      { name: 'Heydar Aliyev Center', location: 'Baku, Azerbaijan', year: '2007-2012' },
      { name: 'Beijing National Stadium', location: 'Beijing, China', year: '2003-2008' },
      { name: 'Galaxy SOHO', location: 'Beijing, China', year: '2009-2012' },
    ],
    influencedBy: ['deconstructivism', 'high-tech'],
    influenced: [],
    funFact: 'The Beijing National Stadium (Bird\'s Nest) uses 110,000 tons of steel - enough to make 16 Eiffel Towers!',
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getPeriodById(id: ArchitecturalPeriod): PeriodDefinition | undefined {
  return ARCHITECTURAL_PERIODS.find(p => p.id === id);
}

export function getPeriodsByRegion(region: GeographicRegion): PeriodDefinition[] {
  return ARCHITECTURAL_PERIODS.filter(p => p.primaryRegions.includes(region));
}

export function getPeriodsInTimeRange(startYear: number, endYear: number): PeriodDefinition[] {
  return ARCHITECTURAL_PERIODS.filter(p =>
    p.startYear <= endYear && p.endYear >= startYear
  );
}

export function getOngoingPeriods(): PeriodDefinition[] {
  return ARCHITECTURAL_PERIODS.filter(p => p.ongoing);
}

export function sortPeriodsByStartYear(periods: PeriodDefinition[]): PeriodDefinition[] {
  return [...periods].sort((a, b) => a.startYear - b.startYear);
}


// Alias exports for simpler imports
export const PERIODS = ARCHITECTURAL_PERIODS;

