import type { ArchitecturalElement } from '../../types';

export const AQUEDUCT: ArchitecturalElement = {
  id: 'aqueduct',
  slug: 'aqueduct',
  name: 'Aqueduct',
  alternativeNames: ['Water Bridge', 'Water Channel', 'Qanat (underground type)'],
  pronunciation: {
    phonetic: 'AK-wuh-dukt',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Water conduit',
    rootWord: 'From Latin "aqua" (water) + "ductus" (led/conveyed)',
  },
  category: 'URBAN',
  subcategory: 'infrastructure',
  periods: ['ancient-persian', 'ancient-roman', 'medieval', 'renaissance', 'industrial-revolution'],
  regions: ['MIDDLE_EAST', 'MEDITERRANEAN', 'WESTERN_EUROPE', 'LATIN_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/aqueduct-primary.jpg',
    gallery: [
      '/images/architecture/elements/aqueduct-pontdugard.jpg',
      '/images/architecture/elements/aqueduct-segovia.jpg',
    ],
    diagram: '/images/architecture/diagrams/aqueduct-system.svg',
  },

  description: {
    ELEMENTARY: 'An aqueduct is like a river built by people to bring water from far away to cities! The Romans were masters at building them. Some aqueducts are tall bridges with water flowing on top instead of roads. The water travels in a channel, using gravity to flow downhill. Many ancient Roman aqueducts still stand today and are amazing to see!',
    MIDDLE_SCHOOL: 'An aqueduct is an engineered channel for conveying water from distant sources to cities. Roman aqueducts combined underground tunnels, surface channels, and elevated arches. The channel (specus) maintains a gentle downward slope so gravity moves the water. Famous elevated sections use multiple tiers of arches to cross valleys. Romans built hundreds of miles of aqueducts to supply cities with fresh water for drinking, baths, and fountains. Many aqueducts still survive as monuments to Roman engineering.',
    HIGH_SCHOOL: 'The aqueduct is a water conveyance system utilizing gravity flow through channels maintained at precise gradients. Roman engineering combined surveying for gradient calculation, arch construction for valley crossings, tunnel excavation through hills, and waterproof concrete (opus caementicium) for channel lining. Multi-tiered arcades reached heights over 50 meters. Distribution systems included settling tanks, distribution castellums, and pressurized pipes. Medieval and Renaissance engineers maintained Roman aqueducts and built new ones using similar principles.',
    UNDERGRADUATE: 'Aqueduct design integrates hydraulic engineering, structural design, and construction logistics. Hydraulic calculations determine required gradient (typically 0.1-0.5%), channel cross-section for desired flow rate, and settling basin locations. Structural systems address arch span capabilities, foundation conditions, and lateral stability. Construction challenges include tunnel excavation from multiple headings, precise surveying over long distances, and waterproof lining application. Contemporary practice includes historical aqueduct preservation and adaptation for modern water supply systems.',
    GRADUATE: 'Aqueduct analysis addresses hydraulic performance, structural behavior, and construction methodology. Research examines flow characteristics in Roman channels, structural efficiency of multi-tiered arcades, and surveying accuracy achieved without modern instruments. Contemporary challenges include preserving aqueduct monuments while allowing public access, managing vegetation and water damage, and interpreting ancient hydraulic systems for engineering education. Studies employ computational fluid dynamics, structural finite element analysis, and archaeological investigation of construction techniques.',
    PHD: 'Aqueduct scholarship engages engineering history, Roman archaeology, and water resources management. Methodologies include archaeological survey mapping entire aqueduct systems, hydraulic analysis of flow capacity, and materials science examining concrete durability. Current research addresses the social organization of Roman hydraulic engineering, water distribution and social equity in ancient cities, gender and labor in aqueduct construction and maintenance, and lessons from ancient water systems for contemporary water security.',
  },

  history: {
    ELEMENTARY: 'The ancient Persians built underground water channels called qanats 3,000 years ago! The Romans became famous for building huge stone aqueducts. They built the Pont du Gard in France almost 2,000 years ago, and it still stands. Roman aqueducts brought water to cities for drinking, bathing, and fountains. After the Roman Empire ended, many aqueducts broke. Later, people built new ones to bring water to growing cities.',
    MIDDLE_SCHOOL: 'Persian qanats (circa 1000 BCE) used underground channels with vertical shafts for construction and maintenance. Greek cities built aqueducts, including Athens\' Peisistratean aqueduct (6th century BCE). Roman engineering reached its peak with aqueducts supplying Rome-11 aqueducts by 226 CE delivered 1 million cubic meters daily. The Pont du Gard (1st century CE) exemplifies monumental construction. After Rome\'s fall, aqueduct maintenance declined. Islamic engineers maintained Persian technologies. Renaissance cities rebuilt water systems, and Industrial Revolution brought new materials like cast iron pipes.',
    HIGH_SCHOOL: 'Ancient Near Eastern civilizations pioneered water conveyance-Assyrian channels, Persian qanats. Archaic Greece developed stone aqueducts (Eupalinian Tunnel, Samos, 6th century BCE). Roman systematization created standardized construction methods documented by Vitruvius and Frontinus. Roman aqueducts combined above-ground arcades, surface channels, and underground sections-the Aqua Claudia stretched 69 km. Post-Roman maintenance declined, but Islamic Spain maintained water systems (Alhambra). Renaissance engineers studied Roman remains-Medici Aqueduct (1563). Industrial-era engineers used iron pipes under pressure, replacing gravity-fed masonry channels.',
    UNDERGRADUATE: 'Aqueduct history reveals hydraulic knowledge evolution and infrastructure investment patterns. Ancient systems demonstrate sophisticated surveying (using groma, chorobates, and dioptra), gradient control, and construction organization. Roman engineering produced remarkably durable structures through quality materials and construction oversight. Medieval decline reflects political fragmentation and maintenance system collapse. Renaissance revival combined archaeological study with new construction. Industrial Revolution transformed water supply through pressurized systems, but gravity-fed aqueducts remained important. Modern practice includes preserving heritage aqueducts and studying ancient hydraulic principles.',
    GRADUATE: 'Historical analysis of aqueducts examines engineering knowledge, social organization, and urban development. Research addresses surveying accuracy achieved by Roman engineers, construction labor organization and costs, water allocation politics in ancient cities, and the relationship between water infrastructure and urban growth. Contemporary challenges include preserving aqueduct monuments threatened by development and environmental changes, interpreting ancient hydraulic systems for diverse audiences, and applying lessons from sustainable ancient systems to modern water management.',
    PHD: 'Aqueduct scholarship engages archaeology, engineering history, and water resources studies. Methodologies include archaeological excavation revealing construction sequences, hydraulic modeling of ancient systems, and chemical analysis of deposits indicating water sources. Current research examines aqueducts in colonial contexts, the environmental impacts of ancient water diversion, gendered labor in water management, and the social meanings of monumental water infrastructure as expressions of state power.',
  },

  characteristics: [
    'Channel for conveying water',
    'Uses gravity flow with precise gradient',
    'May include arched bridge sections',
    'Underground tunnels and surface channels',
    'Distribution system at destination',
    'Often multi-tiered arcade over valleys',
    'Durable construction for long service life',
  ],

  famousExamples: [
    { name: 'Pont du Gard', location: 'Nîmes, France', year: '1st century CE', description: 'Three-tiered Roman aqueduct, 49m tall, UNESCO site' },
    { name: 'Segovia Aqueduct', location: 'Segovia, Spain', year: '1st-2nd century CE', description: 'Roman aqueduct with 167 arches, still standing in city center' },
    { name: 'Aqua Claudia', location: 'Rome, Italy', year: '38-52 CE', description: 'Major Roman aqueduct, 69 km long with impressive arcade remains' },
    { name: 'Croton Aqueduct', location: 'New York, USA', year: '1842', description: '19th-century aqueduct bringing water from upstate to NYC' },
    { name: 'Los Arcos del Sitio', location: 'Tepotzotlán, Mexico', year: '1855', description: 'Monumental colonial aqueduct with single tall arcade' },
  ],

  confusionPairs: [
    {
      elementId: 'bridge',
      reason: 'Both use arches to span obstacles',
      distinction: 'Bridges carry traffic (roads, railways); aqueducts carry water in channels on top of the structure',
    },
    {
      elementId: 'viaduct',
      reason: 'Similar arched structures',
      distinction: 'Viaducts carry roads or railways on arches; aqueducts carry water channels',
    },
  ],

  searchTags: ['aqueduct', 'water', 'Roman', 'engineering', 'arches', 'infrastructure', 'channel', 'hydraulic'],

  arMetadata: {
    modelPath: '/models/architecture/aqueduct.glb',
    scale: 0.08,
    rotatable: true,
    annotations: [
      { label: 'Water Channel (Specus)', position: { x: 0, y: 3, z: 0 } },
      { label: 'Upper Arcade', position: { x: 0, y: 2.5, z: 0 } },
      { label: 'Middle Arcade', position: { x: 0, y: 1.5, z: 0 } },
      { label: 'Lower Arcade', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
