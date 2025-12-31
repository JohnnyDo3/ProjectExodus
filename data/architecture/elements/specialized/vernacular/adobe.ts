import type { ArchitecturalElement } from '../../../types';

export const ADOBE: ArchitecturalElement = {
  id: 'adobe',
  slug: 'adobe',
  name: 'Adobe',
  alternativeNames: ['Sun-Dried Brick', 'Mud Brick', 'Adobe Brick'],
  pronunciation: {
    phonetic: 'uh-DOH-bee',
    language: 'English',
  },
  etymology: {
    origin: 'Spanish from Arabic',
    meaning: 'From Arabic "al-tub" meaning "the brick"',
    rootWord: 'al-ṭūb (الطوب)',
  },
  category: 'WALL',
  subcategory: 'earthen_construction',
  periods: ['ANCIENT', 'MEDIEVAL', 'COLONIAL', 'VERNACULAR'],
  regions: ['MIDDLE_EAST', 'NORTH_AFRICA', 'MEDITERRANEAN', 'MESOAMERICA', 'NORTH_AMERICA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/adobe-primary.jpg',
    gallery: [
      '/images/architecture/elements/adobe-wall.jpg',
      '/images/architecture/elements/adobe-making.jpg',
      '/images/architecture/elements/adobe-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/adobe-construction.svg',
  },

  description: {
    ELEMENTARY: 'Adobe (say "uh-DOH-bee") is a building material made from mud, clay, water, and sometimes straw, formed into bricks and dried in the sun. People have been making adobe bricks for thousands of years! You mix the ingredients together like making cookies, shape them into rectangles, and let the hot sun bake them hard. The bricks are then stacked to build walls. Adobe buildings stay cool inside even when it\'s hot outside, which is perfect for desert areas. The walls are thick and smooth, often painted white or earthy colors.',
    MIDDLE_SCHOOL: 'Adobe is one of humanity\'s oldest building materials, consisting of sun-dried bricks made from clay-rich soil mixed with water, sand, and organic binders like straw or grass. The mixture is shaped in wooden molds, then dried in direct sunlight for several weeks until hard. Adobe bricks are laid in courses with mud mortar, creating thick walls (often 12-24 inches) that provide excellent thermal mass - absorbing heat during the day and releasing it at night. This makes adobe ideal for hot, arid climates. The walls are typically plastered with mud or lime to protect from erosion. Adobe construction requires minimal energy and uses locally-available materials, making it highly sustainable.',
    HIGH_SCHOOL: 'Adobe represents one of the world\'s most enduring vernacular building technologies, developed independently by multiple civilizations in arid regions. The material consists of clay soil (15-30% clay content ideal), sand, water, and fibrous organic material that prevents cracking during drying. Traditional adobe brick dimensions vary by region but typically measure 10"×14"×4" to 10"×14"×6". The sun-drying process requires 2-4 weeks depending on climate. Structural properties include excellent compressive strength but poor tensile strength, necessitating thick walls and limiting building height. Thermal performance derives from high thermal mass (R-value approximately 0.3 per inch, but effective R-value much higher due to thermal lag). Adobe walls moderate interior temperatures through thermal flywheel effect. Traditional construction techniques include foundation preparation, moisture barriers, and protective roof overhangs.',
    UNDERGRADUATE: 'Adobe construction encompasses sophisticated vernacular engineering adapted to specific climatic and geological conditions. Material science considerations include soil composition (optimum clay content 15-30%, remainder sand and silt), aggregate sizing, and organic fiber selection. The drying process involves complex moisture migration and clay particle bonding. Structural analysis reveals adobe\'s brittle failure mode under seismic loading, addressed through various reinforcement strategies: bond beams, vertical reinforcement, buttressing, and modern innovations like wire mesh or bamboo reinforcement. Thermal performance analysis demonstrates phase-shifting of heat transmission through thick walls, creating comfortable interior conditions despite extreme exterior temperature swings. Regional variations reflect local conditions - Southwestern US adobe differs from Middle Eastern or South American traditions in dimensions, additives, and construction details. Modern adobe construction codes (like New Mexico\'s) specify stabilization requirements, foundation details, and seismic considerations.',
    GRADUATE: 'Scholarly examination of adobe addresses material science, structural engineering, thermal physics, cultural geography, and conservation science. Materials research investigates clay mineralogy, particle bonding mechanisms, and stabilization techniques (cement, lime, asphalt, or natural stabilizers). Some research questions optimal soil composition and the role of various additives in strength, durability, and thermal properties. Structural research addresses seismic vulnerability - adobe\'s mass and brittleness create significant earthquake risks, driving development of retrofit technologies and improved construction standards. Thermal research employs computational fluid dynamics and heat transfer modeling to optimize wall thickness and configurations. Cultural studies examine adobe\'s role in identity and place-making across different societies. Conservation science addresses deterioration mechanisms (water erosion, salt efflorescence, biological growth) and develops compatible repair materials and techniques. Contemporary research explores hybrid systems combining traditional adobe with modern engineering.',
    PHD: 'Adobe research offers rich interdisciplinary opportunities spanning materials engineering, architectural history, anthropology, and sustainability science. Advanced materials research employs microstructural analysis, x-ray diffraction, and thermogravimetric analysis to understand bonding mechanisms and develop improved stabilization methods. Some work investigates bio-based stabilizers as sustainable alternatives to cement. Structural engineering research addresses seismic performance through shake table testing, finite element modeling, and field performance assessment of historical earthquakes. Questions include: What reinforcement strategies provide optimal seismic resistance while respecting traditional character? How can traditional knowledge inform modern practice? Thermal research employs advanced building energy modeling to optimize configurations for contemporary comfort standards and climate change scenarios. Archaeological research traces adobe technology evolution across civilizations - was development independent or transmitted? Cultural geography examines adobe\'s persistence and revival in various contexts, including sustainability-driven contemporary interest. Conservation science develops non-destructive testing methods and compatible intervention strategies. Life-cycle assessment research quantifies adobe\'s environmental benefits and limitations.',
  },

  history: {
    ELEMENTARY: 'People have been making adobe bricks for at least 10,000 years! Ancient civilizations in the Middle East, Egypt, and the Americas all discovered they could build with sun-dried mud bricks. The oldest adobe ruins are found in places like Iraq and Egypt. In the American Southwest, Native Americans built amazing adobe pueblos (villages) that are still standing after hundreds of years. When Spanish explorers came to America, they brought their own adobe traditions and combined them with Native American techniques. Today, people still build with adobe because it\'s good for the environment and keeps buildings comfortable.',
    MIDDLE_SCHOOL: 'Adobe construction dates to at least 8000 BCE in Mesopotamia and was independently developed in multiple regions worldwide. Ancient civilizations including the Babylonians, Egyptians, and Indus Valley cultures built extensively with adobe. In the Americas, adobe appeared around 3000 BCE in Peru and later throughout Mesoamerica and the American Southwest. Pueblo peoples of New Mexico and Arizona constructed multi-story adobe apartment complexes by 750 CE, some still inhabited today (like Taos Pueblo, continuously occupied since ~1000 CE). Spanish colonizers brought Mediterranean adobe traditions to the Americas in the 16th century, creating the distinctive Southwestern US style. Adobe construction declined with industrialization but revived in the 20th century due to sustainability movements.',
    HIGH_SCHOOL: 'Adobe represents one of humanity\'s earliest construction technologies, with archaeological evidence dating to the Pre-Pottery Neolithic period (8000-6000 BCE) in Mesopotamia. The technology emerged independently in multiple regions: Middle East, Indus Valley (2600 BCE), China (Longshan culture, 3000-2000 BCE), Egypt, Peru (Caral civilization, 3000 BCE), and Mesoamerica. Regional traditions developed distinct characteristics - Mesopotamian ziggurats, Egyptian workers\' villages, Peruvian pyramids, and Southwestern pueblos all employed adobe but with different techniques and architectural forms. Islamic architecture spread adobe traditions across North Africa and Spain (8th-15th centuries). Spanish colonization (16th-19th centuries) transmitted Mediterranean-Islamic adobe traditions to the Americas, where they merged with indigenous techniques. The California missions (1769-1833) represent this synthesis. Industrial revolution brought adobe\'s decline, but late 20th century sustainability movements sparked revival.',
    UNDERGRADUATE: 'Adobe historiography addresses questions of independent invention, cultural transmission, technological evolution, and contemporary relevance. Archaeological research documents adobe use from Pre-Pottery Neolithic B sites like Jericho and Çatalhöyük through successive civilizations. The technology\'s independent development in geographically separated regions (Mesopotamia, Egypt, Indus Valley, China, Peru, Mesoamerica) demonstrates parallel innovation under similar environmental conditions - aridity, limited timber, clay-rich soils. Regional technological variations reflect cultural preferences and environmental adaptations. Middle Eastern traditions emphasized brick standardization and kiln-fired brick integration; Egyptian construction used massive mud brick fortifications and workers\' housing; Andean cultures developed specialized seismic-resistant techniques; Southwestern pueblos perfected multi-story construction with sophisticated structural systems. Islamic expansion diffused Middle Eastern techniques to North Africa and Iberia, creating distinctive Moroccan and Andalusian traditions. Spanish colonization transmitted these traditions to the Americas, where mestizo cultures synthesized European and indigenous knowledge. Modernization and industrialization marginalized adobe (19th-20th centuries), but environmental movements drove revival from the 1970s.',
    GRADUATE: 'Scholarly examination of adobe addresses archaeological, technological, sociocultural, and environmental dimensions. Archaeological research continues refining chronologies and documenting technological evolution - recent work questions assumptions about independent invention versus long-distance knowledge transmission. Material science research investigates historical recipes and manufacturing techniques, revealing sophisticated empirical knowledge. Some research examines why certain additives were selected and how traditional builders understood material properties. Architectural history traces stylistic evolution within regional traditions and examines cultural meanings - adobe as vernacular necessity versus aesthetic choice versus cultural identity marker. Anthropological research addresses social organization of adobe construction - communal building traditions, specialist knowledge transmission, and gender roles in production and construction. Environmental history examines adobe\'s relationship to resource availability and climate. Contemporary research investigates adobe\'s potential role in sustainable construction, addressing both technical improvements and sociocultural acceptance challenges. Conservation studies develop appropriate methodologies for preserving historical adobe structures.',
    PHD: 'Adobe research presents exceptional opportunities for interdisciplinary investigation across archaeology, materials science, architectural history, anthropology, and sustainability studies. Archaeological research employs scientific dating, provenance analysis, and microstratigraphic analysis to refine understanding of technological origins and diffusion. Questions persist about the relationships between geographically separated traditions - truly independent or evidence of prehistoric knowledge transmission? Materials science research investigates historical manufacturing processes through experimental archaeology and analysis of archaeological samples, informing both historical understanding and contemporary practice. Architectural history examines adobe\'s role across different architectural traditions and its relationship to social hierarchy - vernacular versus monumental architecture. Anthropological research addresses traditional knowledge systems and their transmission - what sophisticated understanding did traditional builders possess? How was knowledge encoded and transmitted without written documentation? Sociocultural research examines adobe\'s contemporary meanings - sustainability symbol, cultural heritage, poverty marker, luxury material. Sustainability science employs life-cycle assessment and embodied energy analysis to quantify environmental benefits. Building science research optimizes thermal performance through advanced modeling. Engineering research develops seismically-resilient systems. Conservation science addresses deterioration mechanisms and compatible intervention strategies.',
  },

  characteristics: [
    'Sun-dried earthen bricks made from clay, sand, and organic binders',
    'Thick walls (typically 12-24 inches) providing thermal mass',
    'Excellent thermal performance in hot, arid climates',
    'Locally-sourced, low-embodied-energy materials',
    'Requires protective plastering and roof overhangs',
    'Limited tensile strength necessitating thick walls and seismic considerations',
  ],

  famousExamples: [
    { name: 'Taos Pueblo', location: 'New Mexico, USA', year: 'c. 1000-1450 CE', description: 'Multi-story adobe pueblo continuously inhabited for 1000 years' },
    { name: 'San Francisco de Asís Mission Church', location: 'Ranchos de Taos, New Mexico, USA', year: '1772-1815', description: 'Iconic Spanish colonial adobe church with massive buttressed walls' },
    { name: 'Arg-e Bam', location: 'Bam, Iran', year: '500 BCE-1850 CE', description: 'Largest adobe structure in world before 2003 earthquake' },
    { name: 'Chan Chan', location: 'Trujillo, Peru', year: '850-1470 CE', description: 'Largest pre-Columbian adobe city, Chimú capital' },
    { name: 'Great Mosque of Djenné', location: 'Djenné, Mali', year: '1907 (rebuilt)', description: 'Largest mud-brick building in world, West African Sudano-Sahelian style' },
  ],

  confusionPairs: [
    {
      elementId: 'rammed-earth',
      reason: 'Both are earthen construction techniques using similar materials',
      distinction: 'Adobe uses molded sun-dried bricks; rammed earth compresses moist earth in formwork to create monolithic walls',
    },
    {
      elementId: 'cob',
      reason: 'Both use clay, sand, and straw mixed together',
      distinction: 'Adobe shapes mixture into bricks and dries them; cob applies wet mixture directly to walls without bricks or formwork',
    },
  ],

  searchTags: ['vernacular', 'earthen', 'mud brick', 'sustainable', 'thermal mass', 'desert', 'traditional', 'natural materials', 'pueblo', 'southwestern'],

  arMetadata: {
    modelPath: '/models/architecture/adobe.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Adobe Brick', position: { x: 0, y: 0, z: 0 } },
      { label: 'Mud Mortar', position: { x: 0.15, y: 0.05, z: 0 } },
      { label: 'Plaster Coating', position: { x: 0, y: 0, z: 0.06 } },
      { label: 'Straw Binder', position: { x: 0.08, y: 0.03, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
