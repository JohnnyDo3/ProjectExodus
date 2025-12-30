/**
 * Geographic Regions for Architecture Learning Platform
 * Comprehensive global coverage of architectural traditions
 */

import { GeographicRegion, LearningLevel } from './types';

export interface RegionDefinition {
  id: GeographicRegion;
  name: string;
  shortName: string;
  continent: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Global';
  subRegions: string[];
  color: string;
  icon: string;
  description: Record<LearningLevel, string>;
  architecturalIdentity: string[];
  climateInfluences: string[];
  keyMaterials: string[];
  notableArchitects: { name: string; era: string; contribution: string }[];
  funFact: string;
}

export const REGION_DEFINITIONS: Record<GeographicRegion, RegionDefinition> = {
  MEDITERRANEAN: {
    id: 'MEDITERRANEAN',
    name: 'Mediterranean Basin',
    shortName: 'Mediterranean',
    continent: 'Europe',
    subRegions: ['Greece', 'Italy', 'Southern France', 'Spain', 'Turkey', 'North Africa', 'Levant'],
    color: '#3498db',
    icon: '🏛️',
    description: {
      ELEMENTARY: 'The Mediterranean is a beautiful sea surrounded by lands where people built amazing temples and buildings with tall columns thousands of years ago!',
      MIDDLE_SCHOOL: 'The Mediterranean region, surrounding the famous sea, was home to ancient Greeks and Romans who created architectural styles still copied today, featuring columns, arches, and domes.',
      HIGH_SCHOOL: 'Mediterranean architecture evolved from ancient Greek temples through Roman innovations like concrete and the arch, creating a vocabulary of forms—columns, pediments, domes—that defined Western building for millennia.',
      UNDERGRADUATE: 'The Mediterranean basin served as the crucible of Western architectural tradition, where Greek post-and-lintel systems merged with Roman structural innovations, establishing typologies from the temple to the basilica that would inform architecture globally.',
      GRADUATE: 'Mediterranean architectural development represents a complex dialogue between Hellenic idealism and Roman pragmatism, producing not merely formal languages but comprehensive building systems—from opus caementicium to the orders—that enabled unprecedented spatial ambitions.',
      PHD: 'The Mediterranean architectural sphere constitutes an epistemological framework wherein tectonic expression, spatial organization, and symbolic meaning coalesced into systematic approaches to building that would be continuously reinterpreted across temporal and geographic boundaries, from Byzantine adaptations to Renaissance revivals.',
    },
    architecturalIdentity: ['Classical orders', 'Stone construction', 'Courtyard houses', 'Public forums', 'Thermal baths', 'Amphitheaters'],
    climateInfluences: ['Hot dry summers', 'Mild winters', 'Strong sunlight', 'Sea breezes'],
    keyMaterials: ['Marble', 'Limestone', 'Terracotta', 'Roman concrete'],
    notableArchitects: [
      { name: 'Ictinus', era: '5th century BCE', contribution: 'Parthenon designer' },
      { name: 'Apollodorus of Damascus', era: '2nd century CE', contribution: "Trajan's Forum and Column" },
      { name: 'Anthemius of Tralles', era: '6th century CE', contribution: 'Hagia Sophia' },
    ],
    funFact: 'The Pantheon in Rome has the largest unreinforced concrete dome ever built—and it\'s nearly 2,000 years old!',
  },

  MIDDLE_EAST: {
    id: 'MIDDLE_EAST',
    name: 'Middle East & Persia',
    shortName: 'Middle East',
    continent: 'Asia',
    subRegions: ['Mesopotamia', 'Persia/Iran', 'Arabian Peninsula', 'Levant', 'Anatolia'],
    color: '#e67e22',
    icon: '🕌',
    description: {
      ELEMENTARY: 'The Middle East is where people first started building cities! They made huge ziggurats (like step pyramids) and beautiful mosques with pointy domes.',
      MIDDLE_SCHOOL: 'The Middle East, often called the "Cradle of Civilization," gave us the first cities, ziggurats, and later stunning Islamic architecture with geometric patterns and soaring minarets.',
      HIGH_SCHOOL: 'Middle Eastern architecture spans from ancient Mesopotamian ziggurats through Persian palatial complexes to Islamic architectural traditions featuring muqarnas, geometric tilework, and innovative dome construction.',
      UNDERGRADUATE: 'The architectural traditions of the Middle East represent continuous innovation from Sumerian urban planning through Achaemenid columned halls to Islamic spatial concepts emphasizing interiority, geometric abstraction, and the integration of water and light.',
      GRADUATE: 'Middle Eastern architecture embodies distinct epistemologies of space—from Mesopotamian cosmological ziggurats to Persian paradisiacal gardens to Islamic conceptions of infinity expressed through geometric pattern—each responding to specific theological and environmental conditions.',
      PHD: 'The architectural production of the Middle East constitutes multiple overlapping traditions wherein ancient Near Eastern, Persian, and Islamic building cultures developed sophisticated responses to questions of monumentality, environmental mediation, and symbolic expression, generating typologies and ornamental systems of global significance.',
    },
    architecturalIdentity: ['Ziggurats', 'Iwans', 'Muqarnas', 'Geometric tilework', 'Courtyards', 'Wind towers'],
    climateInfluences: ['Extreme heat', 'Arid climate', 'Dust storms', 'Temperature extremes'],
    keyMaterials: ['Mud brick', 'Glazed tiles', 'Stone', 'Stucco'],
    notableArchitects: [
      { name: 'Mimar Sinan', era: '16th century', contribution: 'Ottoman imperial architect, Süleymaniye Mosque' },
      { name: 'Ustad Ahmad Lahauri', era: '17th century', contribution: 'Taj Mahal (attributed)' },
    ],
    funFact: 'The ancient Mesopotamians invented the arch and the dome over 4,000 years before the Romans made them famous!',
  },

  EAST_ASIA: {
    id: 'EAST_ASIA',
    name: 'East Asia',
    shortName: 'East Asia',
    continent: 'Asia',
    subRegions: ['China', 'Japan', 'Korea', 'Mongolia', 'Taiwan'],
    color: '#e74c3c',
    icon: '🏯',
    description: {
      ELEMENTARY: 'In East Asia, builders made beautiful wooden temples and palaces with curved roofs that look like they\'re flying! They used special joints instead of nails.',
      MIDDLE_SCHOOL: 'East Asian architecture features distinctive curved roofs, wooden post-and-beam construction without nails, and careful attention to how buildings sit in nature and face certain directions.',
      HIGH_SCHOOL: 'East Asian architectural traditions developed sophisticated timber frame systems using interlocking bracket sets (dougong), emphasized harmony with nature through feng shui principles, and created distinct building types from pagodas to sukiya tea houses.',
      UNDERGRADUATE: 'East Asian architecture represents a coherent system wherein timber frame construction, modular planning, and cosmological orientation principles produced building traditions of remarkable longevity—Chinese classical architecture influencing Korean and Japanese developments while each culture evolved distinctive expressions.',
      GRADUATE: 'The architectural traditions of East Asia embody philosophical frameworks—Confucian hierarchy in spatial organization, Daoist naturalism in garden design, Buddhist cosmology in pagoda symbolism—realized through highly refined timber technologies and systematic approaches to ornament and color.',
      PHD: 'East Asian architectural discourse encompasses multiple interpretive frameworks: technological (the evolution of bracket systems and structural carpentry), philosophical (spatial manifestations of Confucian, Daoist, and Buddhist thought), and cultural (the continuous negotiation between canonical forms and regional/temporal adaptations).',
    },
    architecturalIdentity: ['Curved roofs', 'Bracket systems (dougong)', 'Timber frames', 'Modular bays', 'Garden integration', 'Feng shui orientation'],
    climateInfluences: ['Monsoons', 'Earthquakes', 'Humid summers', 'Variable by latitude'],
    keyMaterials: ['Timber', 'Tile', 'Paper screens', 'Lacquer', 'Stone foundations'],
    notableArchitects: [
      { name: 'Yu Hao', era: '10th century', contribution: 'Song dynasty master builder, Yingzao Fashi manual' },
      { name: 'Kenzo Tange', era: '20th century', contribution: 'Tokyo Olympic Stadium, Metabolist movement' },
      { name: 'I.M. Pei', era: '20th century', contribution: 'Louvre Pyramid, Bank of China Tower' },
    ],
    funFact: 'Japanese carpenters can build entire temples using only wooden joinery—no nails, screws, or glue—and they can be disassembled and rebuilt elsewhere!',
  },

  SOUTH_ASIA: {
    id: 'SOUTH_ASIA',
    name: 'South Asia',
    shortName: 'South Asia',
    continent: 'Asia',
    subRegions: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan'],
    color: '#9b59b6',
    icon: '🕉️',
    description: {
      ELEMENTARY: 'South Asia has amazing temples carved from single rocks, colorful palaces, and the famous Taj Mahal—a white marble building that sparkles in the moonlight!',
      MIDDLE_SCHOOL: 'South Asian architecture includes Hindu temples with towering spires, Buddhist stupas, Mughal palaces and tombs, and buildings carved entirely from solid rock like the caves at Ellora.',
      HIGH_SCHOOL: 'South Asian architecture developed distinct Hindu temple forms (Nagara and Dravida styles), Buddhist architectural traditions (stupas, viharas, chaityas), and later synthesized with Islamic influences to create Indo-Islamic and Mughal masterpieces.',
      UNDERGRADUATE: 'South Asian architectural traditions manifest complex cosmological programs—Hindu temples as representations of Mount Meru, Buddhist stupas encoding dharmic principles—while demonstrating sophisticated stone-cutting techniques and, later, innovative Indo-Islamic syntheses.',
      GRADUATE: 'The architectural production of South Asia represents continuous dialogue between indigenous traditions and external influences, generating distinct regional schools while maintaining coherent symbolic systems relating built form to cosmological, theological, and social ordering principles.',
      PHD: 'South Asian architecture constitutes a rich field of inquiry spanning rock-cut and structural traditions, multiple religious architectural programs, and colonial/post-colonial negotiations, wherein questions of regional identity, technological transfer, and symbolic meaning remain subjects of active scholarly debate.',
    },
    architecturalIdentity: ['Temple towers (shikhara/gopuram)', 'Stupas', 'Rock-cut caves', 'Mughal domes', 'Jali screens', 'Chattris'],
    climateInfluences: ['Monsoons', 'Extreme heat', 'Humidity', 'Regional variation'],
    keyMaterials: ['Sandstone', 'Marble', 'Granite', 'Brick', 'Lime mortar'],
    notableArchitects: [
      { name: 'Ustad Ahmad Lahauri', era: '17th century', contribution: 'Taj Mahal' },
      { name: 'Edwin Lutyens', era: '20th century', contribution: 'New Delhi planning' },
      { name: 'Charles Correa', era: '20th century', contribution: 'Jawahar Kala Kendra' },
      { name: 'Balkrishna Doshi', era: '20th century', contribution: 'IIM Bangalore, Pritzker laureate' },
    ],
    funFact: 'The Kailasa Temple at Ellora was carved from the TOP DOWN out of a single massive rock—they removed 200,000 tons of stone!',
  },

  SOUTHEAST_ASIA: {
    id: 'SOUTHEAST_ASIA',
    name: 'Southeast Asia',
    shortName: 'SE Asia',
    continent: 'Asia',
    subRegions: ['Thailand', 'Cambodia', 'Vietnam', 'Indonesia', 'Myanmar', 'Malaysia', 'Philippines', 'Laos'],
    color: '#1abc9c',
    icon: '🛕',
    description: {
      ELEMENTARY: 'Southeast Asia has incredible temples hiding in jungles! Angkor Wat in Cambodia is the biggest religious building in the whole world!',
      MIDDLE_SCHOOL: 'Southeast Asian architecture blends Indian and Chinese influences with local traditions, creating unique temples like Angkor Wat, Borobudur, and the golden stupas of Myanmar.',
      HIGH_SCHOOL: 'Southeast Asian architecture synthesized Indic religious and architectural concepts with indigenous building traditions, producing distinctive temple mountains (prang), tropical timber palaces, and innovative responses to monsoon climates.',
      UNDERGRADUATE: 'Southeast Asian architectural development reflects complex processes of cultural transmission and local adaptation—Khmer temple-mountains, Javanese candis, Thai prasat—each representing distinct interpretations of Indic cosmological models within specific environmental and political contexts.',
      GRADUATE: 'The architecture of Southeast Asia embodies sophisticated negotiations between imported religious and formal systems and indigenous traditions, generating regional variants that addressed specific cosmological programs, political ideologies, and environmental conditions.',
      PHD: 'Southeast Asian architectural studies engage questions of cultural transmission, local adaptation, and colonial/post-colonial identity, examining how building traditions mediated between pan-Asian religious and aesthetic frameworks and distinctive regional expressions of power, belief, and community.',
    },
    architecturalIdentity: ['Temple mountains', 'Stupas', 'Raised timber houses', 'Multi-tiered roofs', 'Naga motifs', 'Lotus symbolism'],
    climateInfluences: ['Tropical heat', 'Heavy monsoons', 'High humidity', 'Flooding'],
    keyMaterials: ['Laterite', 'Sandstone', 'Timber', 'Bamboo', 'Thatch'],
    notableArchitects: [
      { name: 'Suryavarman II', era: '12th century', contribution: 'Angkor Wat patron' },
      { name: 'Geoffrey Bawa', era: '20th century', contribution: 'Tropical modernism pioneer' },
    ],
    funFact: 'Angkor Wat was designed as a representation of Mount Meru, home of the gods, and its moat represents the cosmic ocean!',
  },

  AFRICA: {
    id: 'AFRICA',
    name: 'Africa',
    shortName: 'Africa',
    continent: 'Africa',
    subRegions: ['North Africa', 'West Africa', 'East Africa', 'Central Africa', 'Southern Africa', 'Sahel'],
    color: '#f39c12',
    icon: '🏺',
    description: {
      ELEMENTARY: 'Africa has the famous pyramids of Egypt, but also amazing mud mosques in Mali and stone cities in Zimbabwe! African builders are very clever with local materials.',
      MIDDLE_SCHOOL: 'African architecture is incredibly diverse—from ancient Egyptian pyramids and temples to the mud mosques of West Africa, stone churches of Ethiopia, and the Great Zimbabwe walls.',
      HIGH_SCHOOL: 'African architectural traditions span ancient Egyptian monumentality, Nubian pyramids, Ethiopian rock-hewn churches, Saharan mud-brick construction, and Swahili coastal synthesis, demonstrating sophisticated responses to diverse climates and cultures.',
      UNDERGRADUATE: 'African architecture encompasses distinct regional traditions—Egyptian stone monumentality, Sudano-Sahelian adobe construction, Great Zimbabwe\'s dry-stone walls, Ethiopian rock-cutting—each representing sophisticated technological and cultural developments often overlooked in conventional architectural histories.',
      GRADUATE: 'The architectural production of Africa challenges Eurocentric historical narratives, demonstrating independent development of monumental construction, urban planning, and building technologies across diverse environmental zones and cultural contexts.',
      PHD: 'African architectural studies engage postcolonial critiques of canonical histories while documenting building traditions from ancient Egyptian to contemporary practice, examining questions of indigenous technology, cultural continuity, and the negotiation of modern/traditional identities.',
    },
    architecturalIdentity: ['Pyramids', 'Mud-brick mosques', 'Rock-cut churches', 'Dry-stone walls', 'Compound housing', 'Conical roofs'],
    climateInfluences: ['Desert heat', 'Tropical humidity', 'Savanna seasons', 'Regional extremes'],
    keyMaterials: ['Mud/Adobe', 'Stone', 'Thatch', 'Timber', 'Banco (mud plaster)'],
    notableArchitects: [
      { name: 'Imhotep', era: '27th century BCE', contribution: 'Step Pyramid of Djoser—first architect known by name' },
      { name: 'David Adjaye', era: '21st century', contribution: 'National Museum of African American History' },
      { name: 'Francis Kéré', era: '21st century', contribution: 'Gando School, Pritzker laureate' },
    ],
    funFact: 'The Great Mosque of Djenné in Mali is the largest mud-brick building in the world, and the whole community comes together annually to replaster it!',
  },

  NORTHERN_EUROPE: {
    id: 'NORTHERN_EUROPE',
    name: 'Northern Europe',
    shortName: 'N. Europe',
    continent: 'Europe',
    subRegions: ['Scandinavia', 'British Isles', 'Baltic States', 'Netherlands', 'Germany'],
    color: '#2980b9',
    icon: '⛪',
    description: {
      ELEMENTARY: 'Northern Europe has Viking stave churches made of wood, tall Gothic cathedrals with pointy spires, and cozy timber houses with steep roofs for the snow!',
      MIDDLE_SCHOOL: 'Northern European architecture features Gothic cathedrals with flying buttresses, timber-framed buildings, Scandinavian stave churches, and modern designs from countries famous for furniture and simple, beautiful buildings.',
      HIGH_SCHOOL: 'Northern European architecture evolved from medieval timber and stone traditions through Gothic ecclesiastical architecture to significant modern contributions—Scandinavian modernism, Bauhaus, Dutch structuralism—emphasizing craftsmanship and social purpose.',
      UNDERGRADUATE: 'Northern European architectural development spans Viking-era timber construction, Gothic structural innovation, Renaissance/Baroque court architecture, and modernist movements that profoundly shaped 20th-century practice, from Bauhaus rationalism to Nordic organic modernism.',
      GRADUATE: 'The architectural traditions of Northern Europe demonstrate productive tensions between indigenous timber building and imported masonry technologies, between ecclesiastical and vernacular traditions, and between modernist internationalism and regional identity.',
      PHD: 'Northern European architecture constitutes a critical locus for understanding Gothic structural logic, Reformation impacts on sacred space, industrialization\'s transformation of building practice, and modernism\'s emergence and subsequent critiques.',
    },
    architecturalIdentity: ['Gothic cathedrals', 'Stave churches', 'Timber framing', 'Brick Gothic', 'Modern minimalism', 'Welfare state architecture'],
    climateInfluences: ['Cold winters', 'Limited daylight', 'Rain/snow', 'Wind'],
    keyMaterials: ['Timber', 'Brick', 'Stone', 'Glass', 'Steel'],
    notableArchitects: [
      { name: 'Alvar Aalto', era: '20th century', contribution: 'Finnish organic modernism' },
      { name: 'Jørn Utzon', era: '20th century', contribution: 'Sydney Opera House' },
      { name: 'Rem Koolhaas', era: '21st century', contribution: 'CCTV Headquarters, OMA' },
      { name: 'Bjarke Ingels', era: '21st century', contribution: 'BIG architecture, hedonistic sustainability' },
    ],
    funFact: 'Gothic cathedrals have stained glass windows not just for beauty—the colored light was meant to represent the heavenly light of God\'s presence!',
  },

  CENTRAL_EUROPE: {
    id: 'CENTRAL_EUROPE',
    name: 'Central Europe',
    shortName: 'C. Europe',
    continent: 'Europe',
    subRegions: ['Germany', 'Austria', 'Switzerland', 'Czech Republic', 'Poland', 'Hungary'],
    color: '#8e44ad',
    icon: '🏰',
    description: {
      ELEMENTARY: 'Central Europe has fairytale castles on hilltops, beautiful palaces with fancy decorations, and cities with colorful old buildings and church spires!',
      MIDDLE_SCHOOL: 'Central European architecture features medieval castles and fortifications, ornate Baroque palaces and churches, and the Bauhaus school that changed modern design forever.',
      HIGH_SCHOOL: 'Central European architecture spans Romanesque and Gothic ecclesiastical buildings, Habsburg Baroque splendor, Prussian neoclassicism, and revolutionary modern movements including the Bauhaus, Vienna Secession, and Czech Cubism.',
      UNDERGRADUATE: 'Central European architectural development reflects complex political histories—from Holy Roman Imperial patronage through Habsburg dynastic architecture to the emergence of national romantic movements and radical modernist experimentation in Vienna, Prague, and Weimar.',
      GRADUATE: 'The architecture of Central Europe embodies significant historiographical nodes: the development of Romanesque and Gothic ecclesiastical forms, Baroque and Rococo court culture, and early 20th-century avant-gardes that fundamentally redirected architectural discourse.',
      PHD: 'Central European architecture constitutes a crucial field for examining relationships between political power and architectural patronage, the emergence of national architectural identities, and the institutional and theoretical foundations of architectural modernism.',
    },
    architecturalIdentity: ['Medieval castles', 'Baroque palaces', 'Gothic churches', 'Bauhaus modernism', 'Vienna Secession', 'Czech Cubism'],
    climateInfluences: ['Continental climate', 'Cold winters', 'Warm summers', 'Mountain conditions'],
    keyMaterials: ['Stone', 'Brick', 'Timber', 'Plaster', 'Iron/Steel'],
    notableArchitects: [
      { name: 'Johann Bernhard Fischer von Erlach', era: '17th-18th century', contribution: 'Karlskirche, Austrian Baroque' },
      { name: 'Walter Gropius', era: '20th century', contribution: 'Bauhaus founder' },
      { name: 'Ludwig Mies van der Rohe', era: '20th century', contribution: 'Barcelona Pavilion, less is more' },
      { name: 'Otto Wagner', era: '19th-20th century', contribution: 'Vienna Secession, modern urbanism' },
    ],
    funFact: 'The Bauhaus school in Germany lasted only 14 years (1919-1933) but completely transformed how we think about modern design, from buildings to furniture to typography!',
  },

  EASTERN_EUROPE: {
    id: 'EASTERN_EUROPE',
    name: 'Eastern Europe & Russia',
    shortName: 'E. Europe',
    continent: 'Europe',
    subRegions: ['Russia', 'Ukraine', 'Belarus', 'Balkans', 'Romania', 'Bulgaria'],
    color: '#c0392b',
    icon: '⛪',
    description: {
      ELEMENTARY: 'Eastern Europe has churches with colorful onion-shaped domes, like St. Basil\'s Cathedral with its candy-colored towers in Moscow\'s Red Square!',
      MIDDLE_SCHOOL: 'Eastern European architecture features Byzantine-influenced churches with domes, Russian onion domes, wooden churches, and Soviet-era buildings with their own unique grand style.',
      HIGH_SCHOOL: 'Eastern European architecture reflects Byzantine Orthodox traditions in ecclesiastical building, distinctive wooden vernacular architecture, Russian imperial classicism, and Soviet constructivism and socialist realism.',
      UNDERGRADUATE: 'Eastern European architectural development traces Byzantine transmission through Orthodox Christianity, the emergence of distinctive national traditions (Russian, Ukrainian, Balkan), and 20th-century engagements with avant-garde movements and state socialist architectural programs.',
      GRADUATE: 'The architecture of Eastern Europe and Russia represents complex negotiations between Byzantine heritage, Western influences, national romantic movements, and Soviet-era impositions, generating distinctive building traditions and significant theoretical contributions.',
      PHD: 'Eastern European architectural studies engage questions of East-West cultural transmission, the architecture of Orthodox Christianity, and 20th-century state socialist building programs, including critical reexaminations of constructivist innovations and socialist realist monumentality.',
    },
    architecturalIdentity: ['Onion domes', 'Byzantine churches', 'Wooden architecture', 'Constructivism', 'Socialist realism', 'Iconostasis'],
    climateInfluences: ['Harsh winters', 'Short summers', 'Snow loads', 'Permafrost (Siberia)'],
    keyMaterials: ['Timber', 'Brick', 'Stone', 'Concrete', 'Gold leaf'],
    notableArchitects: [
      { name: 'Barma and Postnik', era: '16th century', contribution: "St. Basil's Cathedral" },
      { name: 'El Lissitzky', era: '20th century', contribution: 'Constructivist visionary' },
      { name: 'Konstantin Melnikov', era: '20th century', contribution: 'Melnikov House, Soviet avant-garde' },
    ],
    funFact: 'Russian onion domes were designed to shed snow easily, but they also symbolize candle flames reaching toward heaven!',
  },

  NORTH_AMERICA: {
    id: 'NORTH_AMERICA',
    name: 'North America',
    shortName: 'N. America',
    continent: 'North America',
    subRegions: ['United States', 'Canada', 'Mexico', 'Caribbean', 'Pre-Columbian regions'],
    color: '#27ae60',
    icon: '🏙️',
    description: {
      ELEMENTARY: 'North America has ancient Mayan pyramids, Native American cliff dwellings, and invented the skyscraper—super tall buildings that touch the clouds!',
      MIDDLE_SCHOOL: 'North American architecture ranges from ancient Mayan temples and Pueblo cliff dwellings to colonial styles, the invention of skyscrapers, and bold modern buildings like Fallingwater.',
      HIGH_SCHOOL: 'North American architecture encompasses pre-Columbian monumentality (Maya, Aztec, Pueblo), colonial adaptations of European styles, the Chicago School\'s invention of the skyscraper, and significant modern movements from Prairie School to postmodernism.',
      UNDERGRADUATE: 'North American architectural development represents layered histories: sophisticated pre-Columbian building traditions, colonial transplantation and adaptation, independent national traditions (particularly American technological innovation), and significant 20th-century theoretical contributions.',
      GRADUATE: 'The architecture of North America embodies tensions between imported European models and indigenous conditions, generating distinctive responses from Mesoamerican urbanism through Chicago School pragmatism to contemporary critical practices.',
      PHD: 'North American architectural studies engage pre-Columbian archaeology, colonial and postcolonial historiography, and the development of distinctively American architectural theory and practice, including critical examinations of race, technology, and landscape in shaping built environments.',
    },
    architecturalIdentity: ['Skyscrapers', 'Prairie houses', 'Adobe pueblos', 'Maya pyramids', 'Colonial styles', 'Suburban typologies'],
    climateInfluences: ['Extreme variety', 'Hurricanes', 'Tornadoes', 'Regional extremes'],
    keyMaterials: ['Steel', 'Glass', 'Concrete', 'Wood frame', 'Adobe'],
    notableArchitects: [
      { name: 'Frank Lloyd Wright', era: '20th century', contribution: 'Prairie School, Fallingwater, Guggenheim' },
      { name: 'Louis Sullivan', era: '19th-20th century', contribution: 'Father of skyscrapers, "form follows function"' },
      { name: 'Luis Barragán', era: '20th century', contribution: 'Mexican modernism, emotional architecture' },
      { name: 'Frank Gehry', era: '21st century', contribution: 'Guggenheim Bilbao, deconstructivism' },
    ],
    funFact: 'The Home Insurance Building in Chicago (1885) is considered the first skyscraper—but it was only 10 stories tall!',
  },

  SOUTH_AMERICA: {
    id: 'SOUTH_AMERICA',
    name: 'South America',
    shortName: 'S. America',
    continent: 'South America',
    subRegions: ['Andes', 'Brazil', 'Southern Cone', 'Amazon', 'Caribbean coast'],
    color: '#16a085',
    icon: '🏛️',
    description: {
      ELEMENTARY: 'South America has Machu Picchu high in the mountains—a secret Inca city with stones that fit together perfectly without any cement!',
      MIDDLE_SCHOOL: 'South American architecture includes Incan stone cities like Machu Picchu, ornate Spanish colonial churches, and the futuristic buildings of Brasília, a whole city designed from scratch.',
      HIGH_SCHOOL: 'South American architecture encompasses Incan precision stonework and urban planning, colonial Baroque churches with indigenous influences, and significant modernist contributions, notably Brazilian modernism and the planned capital of Brasília.',
      UNDERGRADUATE: 'South American architectural development traces pre-Columbian achievements (Incan construction technology, urban planning), colonial synthesis of European and indigenous traditions, and 20th-century modernist innovations that placed the region at the forefront of international discourse.',
      GRADUATE: 'The architecture of South America represents complex processes of cultural encounter and synthesis, generating distinctive colonial hybrids and significant modernist contributions that challenged Euro-American assumptions about center and periphery.',
      PHD: 'South American architectural studies engage pre-Columbian technologies and urbanism, colonial transculturation, and postcolonial identity formation, examining how regional modernisms negotiated international influences and local conditions.',
    },
    architecturalIdentity: ['Incan stonework', 'Colonial Baroque', 'Brazilian modernism', 'Andean urbanism', 'Fazenda typology', 'Tropical adaptations'],
    climateInfluences: ['Tropical heat', 'Andes altitude', 'Amazon humidity', 'Patagonian wind'],
    keyMaterials: ['Stone', 'Adobe', 'Concrete', 'Timber', 'Tile'],
    notableArchitects: [
      { name: 'Oscar Niemeyer', era: '20th century', contribution: 'Brasília, Brazilian modernism' },
      { name: 'Lina Bo Bardi', era: '20th century', contribution: 'MASP São Paulo, social architecture' },
      { name: 'Paulo Mendes da Rocha', era: '20th century', contribution: 'Brutalist modernism' },
    ],
    funFact: 'Incan walls at Sacsayhuamán have stones so precisely cut that you can\'t fit a piece of paper between them—and they\'ve survived 500 years of earthquakes!',
  },

  OCEANIA: {
    id: 'OCEANIA',
    name: 'Oceania & Pacific',
    shortName: 'Oceania',
    continent: 'Oceania',
    subRegions: ['Australia', 'New Zealand', 'Polynesia', 'Melanesia', 'Micronesia'],
    color: '#3498db',
    icon: '🏝️',
    description: {
      ELEMENTARY: 'Oceania has the famous Sydney Opera House that looks like giant seashells or sails, plus amazing meeting houses in New Zealand and tropical island buildings!',
      MIDDLE_SCHOOL: 'Oceania\'s architecture includes Polynesian meeting houses, Aboriginal shelter traditions, and modern landmarks like the Sydney Opera House, plus buildings designed to stay cool in tropical island climates.',
      HIGH_SCHOOL: 'Oceania\'s architectural traditions encompass Pacific Islander building practices (Māori wharenui, Polynesian fare), Australian colonial and modern architecture, and contemporary practices engaging indigenous and environmental themes.',
      UNDERGRADUATE: 'Oceanian architecture represents distinct indigenous building traditions adapted to Pacific environments, colonial transplantation and adaptation (particularly in Australia and New Zealand), and emerging contemporary practices addressing indigenous consultation and climate-responsive design.',
      GRADUATE: 'The architecture of Oceania engages questions of indigenous representation, colonial and postcolonial identity, and environmental adaptation, with contemporary practitioners developing distinctive responses to Pacific contexts and climate change.',
      PHD: 'Oceanian architectural studies address Pacific indigenous building traditions, settler colonial histories and their material manifestations, and contemporary negotiations of identity, sustainability, and indigenous rights in architectural practice.',
    },
    architecturalIdentity: ['Meeting houses (wharenui)', 'Tropical ventilation', 'Colonial adaptations', 'Contemporary regionalism', 'Sustainable design', 'Island vernacular'],
    climateInfluences: ['Tropical humidity', 'Cyclones', 'Desert heat (Australia)', 'Coastal exposure'],
    keyMaterials: ['Timber', 'Thatch', 'Coral', 'Modern concrete/steel', 'Local stone'],
    notableArchitects: [
      { name: 'Glenn Murcutt', era: '20th-21st century', contribution: 'Australian regional modernism, Pritzker laureate' },
      { name: 'Harry Seidler', era: '20th century', contribution: 'Australian modernism' },
      { name: 'Jørn Utzon', era: '20th century', contribution: 'Sydney Opera House' },
    ],
    funFact: 'Traditional Polynesian navigation houses were oriented to the stars, with their construction encoding astronomical knowledge used for ocean voyaging!',
  },

  GLOBAL: {
    id: 'GLOBAL',
    name: 'Global / International',
    shortName: 'Global',
    continent: 'Global',
    subRegions: ['International Style', 'Contemporary Global Practice', 'Digital Architecture'],
    color: '#34495e',
    icon: '🌍',
    description: {
      ELEMENTARY: 'Some building styles spread all around the world! Modern glass skyscrapers and cool curved buildings designed by computers can be found everywhere now.',
      MIDDLE_SCHOOL: 'Global architecture describes styles that spread worldwide, like glass and steel skyscrapers, or buildings designed using computers that can be built anywhere from Dubai to New York.',
      HIGH_SCHOOL: 'Global architectural practice emerged through 20th-century internationalism, postmodern pluralism, and contemporary digital technologies, generating worldwide networks of practice while raising questions about regional identity and cultural specificity.',
      UNDERGRADUATE: 'Global architecture addresses the internationalization of practice from early modernist universalism through contemporary starchitecture and digital design, examining tensions between international formal languages and local conditions.',
      GRADUATE: 'Contemporary global architectural practice operates through international networks, digital technologies, and globalized construction industries, generating critical debates about cultural imperialism, sustainability, and the ethics of transnational practice.',
      PHD: 'Global architectural discourse engages postcolonial critiques of international modernism, theories of critical regionalism and glocalization, and examinations of contemporary practice\'s navigation of global capital, digital tools, and local contexts.',
    },
    architecturalIdentity: ['International Style', 'Starchitecture', 'Parametric design', 'Sustainable buildings', 'Digital fabrication', 'Contemporary pluralism'],
    climateInfluences: ['Climate-responsive design', 'LEED/BREEAM standards', 'Net-zero goals', 'Adaptation strategies'],
    keyMaterials: ['Steel', 'Glass curtain walls', 'Reinforced concrete', 'Engineered timber', 'Composite materials'],
    notableArchitects: [
      { name: 'Zaha Hadid', era: '21st century', contribution: 'Parametric architecture, first woman Pritzker laureate' },
      { name: 'Norman Foster', era: '21st century', contribution: 'High-tech architecture, sustainable design' },
      { name: 'Renzo Piano', era: '21st century', contribution: 'Centre Pompidou, Shard' },
      { name: 'Tadao Ando', era: '21st century', contribution: 'Concrete minimalism, Church of the Light' },
    ],
    funFact: 'The International Space Station is technically architecture too—it\'s designed for humans to live and work in, just 250 miles above Earth!',
  },
};

// Helper functions for regions

export function getRegionById(id: GeographicRegion): RegionDefinition | undefined {
  return REGION_DEFINITIONS[id];
}

export function getRegionsByContinent(continent: RegionDefinition['continent']): RegionDefinition[] {
  return Object.values(REGION_DEFINITIONS).filter(region => region.continent === continent);
}

export function getAllRegions(): RegionDefinition[] {
  return Object.values(REGION_DEFINITIONS);
}

export function getRegionDescription(id: GeographicRegion, level: LearningLevel): string {
  const region = REGION_DEFINITIONS[id];
  return region?.description[level] || '';
}

export function searchRegions(query: string): RegionDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(REGION_DEFINITIONS).filter(region =>
    region.name.toLowerCase().includes(lowerQuery) ||
    region.shortName.toLowerCase().includes(lowerQuery) ||
    region.subRegions.some(sub => sub.toLowerCase().includes(lowerQuery)) ||
    region.architecturalIdentity.some(trait => trait.toLowerCase().includes(lowerQuery))
  );
}

// Region groupings for UI organization
export const REGION_GROUPS = {
  EUROPE: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'EASTERN_EUROPE'] as GeographicRegion[],
  ASIA: ['MIDDLE_EAST', 'EAST_ASIA', 'SOUTH_ASIA', 'SOUTHEAST_ASIA'] as GeographicRegion[],
  AMERICAS: ['NORTH_AMERICA', 'SOUTH_AMERICA'] as GeographicRegion[],
  OTHER: ['AFRICA', 'OCEANIA', 'GLOBAL'] as GeographicRegion[],
};

export const CONTINENT_ORDER = [
  'Europe',
  'Asia',
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Global',
] as const;
