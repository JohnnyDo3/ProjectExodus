import type { ArchitecturalElement } from '../../types';

export const PAGODA: ArchitecturalElement = {
  id: 'pagoda',
  slug: 'pagoda',
  name: 'Pagoda',
  alternativeNames: ['Ta', 'Tah', 'Multi-tiered Tower'],
  pronunciation: {
    phonetic: 'puh-GOH-duh',
    language: 'Portuguese/Sanskrit',
  },
  etymology: {
    origin: 'Portuguese/Sanskrit',
    meaning: 'Sacred tower',
    rootWord: 'pagode (from Sanskrit bhagavati, sacred)',
  },
  category: 'RELIGIOUS',
  subcategory: 'east_asian',
  periods: ['classical', 'medieval', 'early-modern'],
  regions: ['EAST_ASIA', 'SOUTHEAST_ASIA'],

  images: {
    primary: '/images/architecture/elements/pagoda-primary.jpg',
    gallery: [
      '/images/architecture/elements/pagoda-chinese.jpg',
      '/images/architecture/elements/pagoda-japanese.jpg',
    ],
    diagram: '/images/architecture/diagrams/pagoda-structure.svg',
  },

  description: {
    ELEMENTARY: 'A pagoda is a tall tower with many roofs stacked on top of each other, like a layered cake! Each level has its own curved roof that sticks out. Pagodas are Buddhist or Taoist temples found in China, Japan, Korea, and other East Asian countries.',
    MIDDLE_SCHOOL: 'The pagoda is a tiered tower with multiple eaves, common in East and Southeast Asia, serving as Buddhist temples, reliquaries, or landmarks. Pagodas evolved from Indian stupas, transforming the dome shape into a vertical tower with multiple stories—typically 3, 5, 7, 9, or 13 tiers (odd numbers are auspicious). Each tier features projecting curved roofs with upturned corners. Pagodas are built from various materials: timber, brick, stone, or combinations. The interior often contains religious relics, statues, or sacred texts.',
    HIGH_SCHOOL: 'The pagoda is a multi-tiered tower characteristic of East Asian architecture, evolving from Indian Buddhist stupas through Central Asian and Chinese transformations. Structurally, pagodas employ timber frame construction (Chinese and Japanese examples) or masonry (stone and brick). Key features include multiple stories with individual roofs, central pillar (heart pillar or shinbashira) in some Japanese pagodas providing earthquake resistance, decorative roof finials, and often veranda balconies on each level. Pagoda design embodies Buddhist cosmology with vertical tiers representing levels of enlightenment or heavens. Regional variations include Chinese square, hexagonal, or octagonal plans with bracketing systems (dougong) supporting wide eaves, Japanese five-story wooden pagodas with distinctive roof profiles, Korean multi-tiered brick pagodas, and Vietnamese pagodas showing Chinese influence. The pagoda\'s structural systems demonstrate sophisticated engineering, particularly Japanese examples\' earthquake resistance through flexible timber framing and independent central pillars.',
    UNDERGRADUATE: 'The pagoda represents a remarkable architectural evolution transforming the Indian stupa\'s hemispherical form into East Asian vertical tower typology. This transformation occurred through Central Asian Buddhist cave shrines and early Chinese timber tower temples (appearing by 1st century CE). The pagoda\'s development shows synthesis of Buddhist religious requirements, indigenous Chinese timber construction traditions, and cosmological symbolism. Structural analysis reveals sophisticated engineering: Chinese pagodas employ bracketing systems (dougong) supporting wide eaves and distributing loads, Japanese pagodas utilize central pillars (shinbashira) acting as pendulum dampers during earthquakes, and masonry pagodas demonstrate advanced stone and brickwork. Regional variations reflect materials, climate, and aesthetic preferences—Chinese brick pagodas with geometric ornament, Japanese wooden pagodas with refinement of proportions, Korean stone pagodas with simplified forms. The pagoda\'s function evolved from pure reliquary to temple, monastery landmark, feng shui element, and architectural symbol. Symbolic interpretations layer multiple meanings—vertical axis representing spiritual ascent, odd-numbered tiers (auspicious numbers), and specific decorative elements encoding Buddhist concepts.',
    GRADUATE: 'The pagoda embodies complex cultural, religious, and technological dimensions in East Asian architecture. Analysis reveals transformation processes from stupa to pagoda involving multiple intermediary forms—Gandharan tall stupas, Central Asian cave shrine towers, early Chinese lou (multi-story towers)—demonstrating creative architectural adaptation. Structural systems show regional engineering sophistication: Chinese timber frames achieving cantilevers through bracketing, Japanese development of independent central pillar systems providing seismic resistance (five-story pagodas surviving earthquakes for over 1,000 years), masonry pagodas solving structural challenges of vertical load distribution. The pagoda\'s symbolic program evolved—early Buddhist reliquary function expanded to include Daoist cosmological elements in Chinese tradition, integration with Shinto beliefs in Japan. Architectural treatises and carpenter manuals reveal design knowledge transmission. Regional variations demonstrate distinctive aesthetic developments—Chinese emphasis on horizontal eaves creating dynamic silhouettes, Japanese refinement toward elegant proportions and roof curves, Korean geometric simplification. The pagoda\'s urban roles as landmarks, feng shui elements, and architectural symbols receive scholarly attention. Conservation challenges include timber deterioration, seismic vulnerability, and appropriate restoration approaches.',
    PHD: 'The pagoda constitutes a crucial element for examining Buddhist architectural transmission, structural engineering evolution, and cultural adaptation across East Asia. Scholarly research addresses multiple dimensions: archaeological investigation documenting early pagoda forms and construction dates, architectural analysis examining structural systems and regional variations, engineering studies modeling seismic performance, religious studies interpreting symbolic meanings, and conservation science addressing preservation challenges. Recent work employs dendrochronology dating wooden pagodas, structural monitoring revealing earthquake response, and digital reconstruction visualizing lost examples. Debates address transformation mechanisms from stupa to pagoda—the extent of Central Asian influence, role of indigenous Chinese architectural traditions, timing of key innovations. Comparative studies examine pagoda variations across China, Japan, Korea, and Vietnam revealing both shared features and distinctive developments. Research on historical earthquakes and pagoda survival informs understanding of traditional seismic design. Studies of carpenter guilds and construction documents reveal building processes and knowledge systems. Conservation research develops appropriate interventions for timber, brick, and stone pagodas. Contemporary scholarship examines modern pagoda construction, role in heritage tourism, and pagoda symbolism in contemporary East Asian identity.',
  },

  history: {
    ELEMENTARY: 'Pagodas came from India to China almost 2,000 years ago when Buddhism spread along the Silk Road. Chinese builders changed the dome-shaped stupa into a tall tower with many roofs! From China, pagodas spread to Korea, Japan, and Vietnam, with each country developing its own special style.',
    MIDDLE_SCHOOL: 'Pagodas evolved from Indian Buddhist stupas, arriving in China by the 1st century CE via the Silk Road. Early Chinese pagodas adapted stupa forms to indigenous timber tower traditions. By the Tang Dynasty (618-907), pagodas became standard Buddhist temple elements. The form spread to Korea (appearing by 7th century) and Japan (introduced 6th century), where distinctive national styles developed. Famous early examples include the Songyue Temple Pagoda (523 CE, China\'s oldest brick pagoda) and Horyuji Temple\'s five-story pagoda (7th century, world\'s oldest wooden building).',
    HIGH_SCHOOL: 'Pagoda development traces from Indian stupas through Central Asian intermediaries to Chinese transformation. Early Chinese pagodas (1st-6th centuries CE) showed experimental forms combining stupa elements with Chinese towers. The Northern Wei (386-534) and Sui (581-618) dynasties saw standardization of multi-tiered forms. Tang Dynasty (618-907) produced classic square and octagonal pagodas in brick and timber. Transmission to Korea (Three Kingdoms period, 4th-7th centuries) and Japan (Asuka period, 6th-7th centuries) established regional traditions. Song Dynasty (960-1279) created elaborate iron and brick pagodas. Japanese development emphasized wooden construction with distinctive roof forms. The pagoda continued evolving through modern times with ongoing construction and restoration.',
    UNDERGRADUATE: 'The pagoda\'s history encompasses Buddhist transmission, architectural innovation, and cultural adaptation across centuries and regions. Archaeological evidence suggests pagodas appeared in China by the 1st century CE, though early examples don\'t survive. The transformation from hemispherical stupa to vertical tower involved multiple intermediary forms visible in Central Asian sites. Chinese dynasties developed distinctive pagoda styles: Northern Wei experimental multi-eaved towers, Sui standardization of forms, Tang classical brick and timber examples, Song elaborate iron and ceramic pagodas, Ming and Qing monumental constructions. Korean pagoda evolution shows early wood construction (none surviving) transitioning to stone and brick (Bunhwangsa Pagoda, 634 CE, earliest surviving). Japanese development emphasized wooden five- and three-story pagodas with independent central pillars (Horyuji, Yakushiji examples). Vietnamese pagodas combined Chinese influence with local adaptations. Technical evolution included refinement of bracketing systems, development of earthquake-resistant designs, and experimentation with materials. The pagoda\'s functions expanded from pure reliquary to include monastic, ceremonial, and civic roles.',
    GRADUATE: 'The pagoda\'s evolution reveals complex processes of religious and architectural transmission, technological innovation, and cultural interpretation. Research examines transformation mechanisms from stupa to pagoda through literary evidence, archaeological remains, and comparative analysis of transitional forms in Central Asia. Early Chinese Buddhist architecture adapted indigenous lou (towers) and que (gate towers) to Buddhist requirements, creating hybrid forms. Dynastic developments show progressive refinement: Northern Wei experimentation, Tang systematization, Song elaboration, later periods consolidating and monumentalizing forms. Regional transmissions to Korea and Japan involved both direct Chinese influence and independent innovations—Japanese development of shinbashira (central pillar) system represents indigenous engineering achievement addressing seismic conditions. Scholarly debates address dating controversies, attribution of innovations, and relationships between textual descriptions and built examples. Studies of carpenter traditions reveal design knowledge systems and construction techniques. The pagoda\'s symbolic dimensions evolved through interaction of Buddhist, Daoist, and indigenous beliefs. Urban and landscape roles as landmarks and feng shui elements receive attention. Modern period shows both conservation of historic examples and new construction.',
    PHD: 'Scholarly engagement with pagoda history employs interdisciplinary approaches: archaeological investigation establishing chronologies and documenting construction techniques, architectural analysis examining structural systems and design evolution, engineering research modeling structural performance especially seismic response, religious studies interpreting symbolic meanings, and art history analyzing decorative programs. Recent work applies scientific dating techniques (dendrochronology, radiocarbon) resolving chronological debates, structural monitoring revealing earthquake behavior, and digital reconstruction visualizing lost pagodas. Comparative research maps pagoda type distributions and transmission patterns. Studies examine relationships between Chinese architectural treatises and built pagodas, revealing gaps between prescriptive literature and actual practice. Research on historical earthquakes and pagoda survival informs understanding of traditional seismic design principles. Conservation science addresses deterioration of timber, brick, and stone structures, developing appropriate intervention strategies. Contemporary scholarship examines pagoda roles in tourism and heritage interpretation, modern pagoda construction worldwide, and pagoda symbolism in contemporary Asian and diaspora identity formation.',
  },

  characteristics: [
    'Multi-tiered tower (typically odd number)',
    'Each level has projecting eaved roof',
    'Square, hexagonal, or octagonal plan',
    'Curved upturned roof corners',
    'Central pillar in some Japanese examples',
    'Ornamental finial at top',
  ],

  famousExamples: [
    { name: 'Giant Wild Goose Pagoda', location: 'Xi\'an, China', year: '652 CE', description: 'Tang Dynasty brick pagoda, 7 stories, 210 feet' },
    { name: 'Horyuji Pagoda', location: 'Nara, Japan', year: '7th century', description: 'World\'s oldest wooden building, 5 stories' },
    { name: 'Bulguksa Temple Pagodas', location: 'Gyeongju, South Korea', year: '751 CE', description: 'Twin stone pagodas, UNESCO site' },
    { name: 'Fogong Temple Pagoda', location: 'Shanxi, China', year: '1056', description: 'Tallest wooden pagoda (220 feet), Liao Dynasty' },
    { name: 'Tran Quoc Pagoda', location: 'Hanoi, Vietnam', year: '6th century (rebuilt)', description: 'Oldest pagoda in Vietnam' },
  ],

  confusionPairs: [
    {
      elementId: 'stupa',
      reason: 'Pagodas evolved from stupas',
      distinction: 'Stupa is dome-shaped (Indian); pagoda is multi-tiered tower (East Asian evolution)',
    },
    {
      elementId: 'minaret',
      reason: 'Both are tall religious towers',
      distinction: 'Minaret is Islamic, cylindrical/square, for call to prayer; pagoda is Buddhist, multi-tiered with multiple roofs',
    },
  ],

  searchTags: ['buddhist', 'tower', 'china', 'japan', 'korea', 'tiered', 'temple', 'curved-roof', 'wooden', 'east-asian'],

  arMetadata: {
    modelPath: '/models/architecture/pagoda.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Finial/Spire', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Upper Tier Roof', position: { x: 0.15, y: 0.85, z: 0 } },
      { label: 'Middle Tiers', position: { x: 0.2, y: 0.6, z: 0 } },
      { label: 'Base Tier', position: { x: 0.3, y: 0.2, z: 0 } },
      { label: 'Central Pillar (interior)', position: { x: 0, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
