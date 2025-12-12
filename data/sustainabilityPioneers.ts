import { Founder } from '@/components/learning/FounderCard'

/**
 * Sustainability Pioneers Database
 * Key figures in sustainability, permaculture, renewable energy, and environmental movements
 */

export const SUSTAINABILITY_PIONEERS: Founder[] = [
  // ============================================
  // PERMACULTURE & REGENERATIVE AGRICULTURE
  // ============================================
  {
    id: 'bill-mollison',
    name: 'Bill Mollison',
    title: 'Father of Permaculture',
    portrait: '/images/pioneers/bill-mollison.jpg',
    birthYear: 1928,
    deathYear: 2016,
    nationality: 'Australian',
    shortBio: 'Bill Mollison co-developed the concept of permaculture with David Holmgren, creating a sustainable design system that mimics natural ecosystems.',
    fullBio: 'Bill Mollison was an Australian researcher, author, scientist, teacher, and biologist. He is considered the father of permaculture, a term he coined with David Holmgren in 1978. Mollison spent years observing natural systems in the Tasmanian wilderness, which inspired his revolutionary approach to sustainable agriculture and design. He founded the Permaculture Institute and trained thousands of designers worldwide.',
    contributions: [
      'Co-developed permaculture design principles',
      'Founded the Permaculture Institute',
      'Authored "Permaculture: A Designers\' Manual"',
      'Established the permaculture diploma system',
      'Received the Right Livelihood Award (1981)'
    ],
    quote: 'The greatest change we need to make is from consumption to production, even if on a small scale, in our own gardens.',
    relatedTopics: ['permaculture', 'food-sovereignty', 'regenerative-agriculture'],
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Bill_Mollison'
  },
  {
    id: 'david-holmgren',
    name: 'David Holmgren',
    title: 'Co-originator of Permaculture',
    portrait: '/images/pioneers/david-holmgren.jpg',
    birthYear: 1955,
    nationality: 'Australian',
    shortBio: 'David Holmgren co-originated the permaculture concept and developed its ethical and design principles.',
    fullBio: 'David Holmgren is an Australian environmental designer, ecological educator and writer. As a young student, he co-developed the permaculture concept with Bill Mollison in the 1970s. He later refined the 12 permaculture principles that guide sustainable design worldwide. His property Melliodora is a demonstration of permaculture principles in practice.',
    contributions: [
      'Co-originated permaculture with Bill Mollison',
      'Developed the 12 Permaculture Design Principles',
      'Authored "Permaculture: Principles & Pathways Beyond Sustainability"',
      'Created the Melliodora permaculture demonstration site',
      'Developed RetroSuburbia concept for suburban transformation'
    ],
    quote: 'Permaculture is revolution disguised as gardening.',
    relatedTopics: ['permaculture', 'regenerative-agriculture', 'sustainable-design'],
    learnMoreUrl: 'https://holmgren.com.au/'
  },
  {
    id: 'masanobu-fukuoka',
    name: 'Masanobu Fukuoka',
    title: 'Pioneer of Natural Farming',
    portrait: '/images/pioneers/masanobu-fukuoka.jpg',
    birthYear: 1913,
    deathYear: 2008,
    nationality: 'Japanese',
    shortBio: 'Masanobu Fukuoka developed the revolutionary "do-nothing" farming method that works with nature rather than against it.',
    fullBio: 'Masanobu Fukuoka was a Japanese farmer and philosopher who developed a radical yet simple organic method of growing grain called natural farming. His approach, sometimes called "do-nothing farming," involves minimal human interference with natural processes. His book "The One-Straw Revolution" influenced sustainable agriculture movements worldwide.',
    contributions: [
      'Developed natural farming method (no tillage, no fertilizer, no pesticides)',
      'Pioneered seed ball technique for reforestation',
      'Authored "The One-Straw Revolution"',
      'Influenced organic and regenerative agriculture globally',
      'Demonstrated grain yields comparable to modern methods without chemicals'
    ],
    quote: 'The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.',
    relatedTopics: ['regenerative-agriculture', 'natural-farming', 'food-sovereignty'],
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Masanobu_Fukuoka'
  },
  {
    id: 'wangari-maathai',
    name: 'Wangari Maathai',
    title: 'Green Belt Movement Founder',
    portrait: '/images/pioneers/wangari-maathai.jpg',
    birthYear: 1940,
    deathYear: 2011,
    nationality: 'Kenyan',
    shortBio: 'Wangari Maathai founded the Green Belt Movement, which has planted over 51 million trees in Kenya, and became the first African woman to receive the Nobel Peace Prize.',
    fullBio: 'Professor Wangari Maathai was a Kenyan environmental activist and Nobel laureate. She founded the Green Belt Movement in 1977, which has since planted over 51 million trees. Her work connected environmental conservation with women\'s rights and good governance, demonstrating how tree planting can be a tool for social and political change.',
    contributions: [
      'Founded the Green Belt Movement',
      'Facilitated planting of over 51 million trees',
      'First African woman to win Nobel Peace Prize (2004)',
      'Served as Kenya\'s Assistant Minister for Environment',
      'Connected environmental activism with democracy and women\'s rights'
    ],
    quote: 'When we plant trees, we plant the seeds of peace and seeds of hope.',
    relatedTopics: ['reforestation', 'climate-action', 'food-sovereignty'],
    learnMoreUrl: 'https://www.greenbeltmovement.org/'
  },
  {
    id: 'allan-savory',
    name: 'Allan Savory',
    title: 'Holistic Management Pioneer',
    portrait: '/images/pioneers/allan-savory.jpg',
    birthYear: 1935,
    nationality: 'Zimbabwean',
    shortBio: 'Allan Savory developed Holistic Management, a systems-thinking approach that uses planned grazing to regenerate grasslands and sequester carbon.',
    fullBio: 'Allan Savory is a Zimbabwean ecologist, livestock farmer, and president of the Savory Institute. He developed Holistic Management, a decision-making framework and land management approach that can reverse desertification while addressing global challenges such as climate change, food security, and social instability.',
    contributions: [
      'Developed Holistic Management framework',
      'Founded the Savory Institute',
      'Demonstrated grassland regeneration through planned grazing',
      'Popularized concept of using livestock as tool for land restoration',
      'TED Talk on reversing desertification viewed millions of times'
    ],
    quote: 'Only livestock can save us. Because we cannot combat desertification, poverty, rural violence, and climate change with technology alone.',
    relatedTopics: ['regenerative-agriculture', 'climate-action', 'holistic-management'],
    learnMoreUrl: 'https://savory.global/'
  },

  // ============================================
  // RENEWABLE ENERGY
  // ============================================
  {
    id: 'hermann-scheer',
    name: 'Hermann Scheer',
    title: 'Solar Economy Visionary',
    portrait: '/images/pioneers/hermann-scheer.jpg',
    birthYear: 1944,
    deathYear: 2010,
    nationality: 'German',
    shortBio: 'Hermann Scheer was the driving force behind Germany\'s renewable energy revolution and the architect of feed-in tariff policies adopted worldwide.',
    fullBio: 'Hermann Scheer was a German politician and one of the most influential advocates for solar energy. He served in the German Bundestag and was instrumental in passing Germany\'s Renewable Energy Act. His work made Germany a world leader in solar power and influenced renewable energy policies globally.',
    contributions: [
      'Architect of Germany\'s Renewable Energy Act',
      'Founder of EUROSOLAR',
      'Established IRENA (International Renewable Energy Agency)',
      'Authored "The Solar Economy" and "Energy Autonomy"',
      'Received Right Livelihood Award and World Solar Prize'
    ],
    quote: 'The sun sends us a bill. The fuel is free. We only have to invest in the technology to use it.',
    relatedTopics: ['renewable-energy', 'solar-power', 'energy-policy'],
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Hermann_Scheer'
  },
  {
    id: 'amory-lovins',
    name: 'Amory Lovins',
    title: 'Energy Efficiency Pioneer',
    portrait: '/images/pioneers/amory-lovins.jpg',
    birthYear: 1947,
    nationality: 'American',
    shortBio: 'Amory Lovins coined the term "negawatts" and has championed energy efficiency as the cheapest, cleanest way to meet energy needs.',
    fullBio: 'Amory Lovins is an American physicist and chairman of the Rocky Mountain Institute. He has been a influential voice in energy policy for decades, promoting the "soft energy path" focused on efficiency and renewables. His work has influenced policy and practice in energy efficiency worldwide.',
    contributions: [
      'Founded Rocky Mountain Institute',
      'Coined "negawatts" concept for energy efficiency',
      'Authored "Soft Energy Paths" and "Reinventing Fire"',
      'Consulted for governments and Fortune 500 companies',
      'Designed ultra-efficient buildings and vehicles'
    ],
    quote: 'Energy efficiency is the invisible powerhouse - it\'s the cheapest, fastest, safest way to meet our energy needs.',
    relatedTopics: ['renewable-energy', 'energy-efficiency', 'green-building'],
    learnMoreUrl: 'https://rmi.org/'
  },

  // ============================================
  // ZERO WASTE & CIRCULAR ECONOMY
  // ============================================
  {
    id: 'bea-johnson',
    name: 'Bea Johnson',
    title: 'Zero Waste Home Pioneer',
    portrait: '/images/pioneers/bea-johnson.jpg',
    birthYear: 1974,
    nationality: 'French-American',
    shortBio: 'Bea Johnson popularized the zero-waste lifestyle, demonstrating that a family of four can fit a year\'s worth of trash in a small jar.',
    fullBio: 'Bea Johnson is a French-American author, speaker, and zero-waste advocate. She started her family\'s zero-waste journey in 2008 and documented it on her blog and in her book "Zero Waste Home." Her practical approach has inspired millions to reduce their waste and live more sustainably.',
    contributions: [
      'Pioneered the zero-waste home movement',
      'Authored "Zero Waste Home" (translated into 30+ languages)',
      'Created the 5Rs hierarchy: Refuse, Reduce, Reuse, Recycle, Rot',
      'Demonstrated a family can produce only a jar of trash per year',
      'Inspired zero-waste shops and communities worldwide'
    ],
    quote: 'Zero waste is not about recycling more, but consuming less.',
    relatedTopics: ['zero-waste', 'circular-economy', 'sustainable-living'],
    learnMoreUrl: 'https://zerowastehome.com/'
  },
  {
    id: 'william-mcdonough',
    name: 'William McDonough',
    title: 'Cradle to Cradle Architect',
    portrait: '/images/pioneers/william-mcdonough.jpg',
    birthYear: 1951,
    nationality: 'American',
    shortBio: 'William McDonough co-developed the Cradle to Cradle design framework, transforming how we think about products and waste.',
    fullBio: 'William McDonough is an American architect and designer who, along with chemist Michael Braungart, developed the Cradle to Cradle design philosophy. This approach reimagines industry as a positive force, where products are designed to be fully recycled or safely returned to nature.',
    contributions: [
      'Co-developed Cradle to Cradle design framework',
      'Authored "Cradle to Cradle: Remaking the Way We Make Things"',
      'Designed some of the world\'s greenest buildings',
      'Created C2C certification standard',
      'Received Presidential Award for Sustainable Development'
    ],
    quote: 'Design is the first signal of human intention. Our goal is a delightfully diverse, safe, healthy, and just world with clean air, water, soil, and power.',
    relatedTopics: ['zero-waste', 'circular-economy', 'green-building'],
    learnMoreUrl: 'https://mcdonough.com/'
  },

  // ============================================
  // GREEN BUILDING
  // ============================================
  {
    id: 'ed-mazria',
    name: 'Ed Mazria',
    title: 'Architecture 2030 Founder',
    portrait: '/images/pioneers/ed-mazria.jpg',
    birthYear: 1943,
    nationality: 'American',
    shortBio: 'Ed Mazria founded Architecture 2030 and has led the building sector\'s response to climate change.',
    fullBio: 'Ed Mazria is an American architect, author, and educator who founded Architecture 2030, a nonprofit challenging the building sector to dramatically reduce greenhouse gas emissions. His work has fundamentally changed how architects approach building design and energy use.',
    contributions: [
      'Founded Architecture 2030',
      'Authored "The Passive Solar Energy Book"',
      'Created the 2030 Challenge for carbon-neutral buildings',
      'Influenced building codes and standards worldwide',
      'Pioneered passive solar design principles'
    ],
    quote: 'Buildings are the major source of demand for energy and materials that produce by-product greenhouse gases.',
    relatedTopics: ['green-building', 'passive-design', 'climate-action'],
    learnMoreUrl: 'https://architecture2030.org/'
  },
  {
    id: 'wolfgang-feist',
    name: 'Wolfgang Feist',
    title: 'Passive House Pioneer',
    portrait: '/images/pioneers/wolfgang-feist.jpg',
    birthYear: 1954,
    nationality: 'German',
    shortBio: 'Wolfgang Feist developed the Passive House standard, creating buildings that require minimal energy for heating and cooling.',
    fullBio: 'Dr. Wolfgang Feist is a German physicist who developed the Passive House standard. He founded the Passivhaus Institut in 1996 and built the first Passive House in Darmstadt, Germany, in 1991. His rigorous approach to building physics has created a worldwide movement.',
    contributions: [
      'Developed the Passive House building standard',
      'Founded the Passivhaus Institut',
      'Built the first certified Passive House (1991)',
      'Created PHPP (Passive House Planning Package)',
      'Trained thousands of certified Passive House designers'
    ],
    quote: 'A Passive House is a building in which thermal comfort can be achieved solely by post-heating or post-cooling the fresh air flow.',
    relatedTopics: ['green-building', 'passive-house', 'energy-efficiency'],
    learnMoreUrl: 'https://passivehouse.com/'
  },

  // ============================================
  // WATER CONSERVATION
  // ============================================
  {
    id: 'brad-lancaster',
    name: 'Brad Lancaster',
    title: 'Rainwater Harvesting Expert',
    portrait: '/images/pioneers/brad-lancaster.jpg',
    birthYear: 1967,
    nationality: 'American',
    shortBio: 'Brad Lancaster has transformed arid landscapes using rainwater harvesting, demonstrating how to harvest water from rain, air, and stormwater.',
    fullBio: 'Brad Lancaster is a permaculturist and rainwater harvesting expert based in Tucson, Arizona. He has transformed his neighborhood from a barren landscape into an oasis using only rainwater. His "Rainwater Harvesting" book series is considered essential reading for water conservation.',
    contributions: [
      'Authored comprehensive "Rainwater Harvesting" book series',
      'Transformed Tucson neighborhood using rainwater harvesting',
      'Developed right-of-way rainwater harvesting policies',
      'Created demonstration sites in one of America\'s driest cities',
      'Trained thousands in water harvesting techniques'
    ],
    quote: 'Don\'t drain the rain - let it sustain.',
    relatedTopics: ['water-systems', 'rainwater-harvesting', 'permaculture'],
    learnMoreUrl: 'https://www.harvestingrainwater.com/'
  },
  {
    id: 'sunita-narain',
    name: 'Sunita Narain',
    title: 'Water Rights Advocate',
    portrait: '/images/pioneers/sunita-narain.jpg',
    birthYear: 1961,
    nationality: 'Indian',
    shortBio: 'Sunita Narain leads efforts to revive traditional water harvesting systems in India and advocates for environmental justice.',
    fullBio: 'Sunita Narain is an Indian environmentalist and political activist. As Director General of the Centre for Science and Environment, she has led movements to revive traditional water harvesting structures and protect community water rights. Her work bridges traditional knowledge with modern environmental policy.',
    contributions: [
      'Leads Centre for Science and Environment',
      'Revived traditional johads (water harvesting structures)',
      'Authored reports on water democracy and climate justice',
      'Advocated for community-based water management',
      'Received Stockholm Water Prize'
    ],
    quote: 'Water security is about capturing every raindrop and using it wisely.',
    relatedTopics: ['water-systems', 'environmental-justice', 'traditional-knowledge'],
    learnMoreUrl: 'https://www.cseindia.org/'
  },

  // ============================================
  // FOOD SOVEREIGNTY
  // ============================================
  {
    id: 'vandana-shiva',
    name: 'Vandana Shiva',
    title: 'Seed Freedom Activist',
    portrait: '/images/pioneers/vandana-shiva.jpg',
    birthYear: 1952,
    nationality: 'Indian',
    shortBio: 'Vandana Shiva champions seed freedom, biodiversity, and the rights of small farmers against corporate agriculture.',
    fullBio: 'Dr. Vandana Shiva is an Indian scholar, environmental activist, and food sovereignty advocate. She founded Navdanya, a network of seed keepers and organic producers, and has been a leading voice against GMO patents and corporate control of the food system. Her work connects ecological sustainability with social justice.',
    contributions: [
      'Founded Navdanya seed-saving network',
      'Established 150+ community seed banks in India',
      'Authored "Staying Alive" and "Monocultures of the Mind"',
      'Led global campaigns against seed patents',
      'Received Right Livelihood Award'
    ],
    quote: 'Seed freedom is the foundation of food freedom.',
    relatedTopics: ['food-sovereignty', 'seed-saving', 'organic-farming'],
    learnMoreUrl: 'https://www.navdanya.org/'
  },
  {
    id: 'will-allen',
    name: 'Will Allen',
    title: 'Urban Farming Pioneer',
    portrait: '/images/pioneers/will-allen.jpg',
    birthYear: 1949,
    nationality: 'American',
    shortBio: 'Will Allen founded Growing Power, transforming urban food deserts with innovative aquaponics and community farming.',
    fullBio: 'Will Allen is an American farmer and urban agriculture advocate. He founded Growing Power in Milwaukee, creating an innovative model for urban food production that combined aquaponics, vermiculture, and community engagement. His work demonstrated how cities can become food producers.',
    contributions: [
      'Founded Growing Power urban farm',
      'Developed innovative aquaponics systems',
      'Created model for urban food production',
      'Received MacArthur "Genius" Grant',
      'Trained thousands in urban farming techniques'
    ],
    quote: 'We can grow food anywhere, and we can grow it year-round.',
    relatedTopics: ['food-sovereignty', 'urban-farming', 'aquaponics'],
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Will_Allen_(urban_farmer)'
  }
]

// Helper function to find pioneers by topic
export function getPioneersByTopic(topic: string): Founder[] {
  return SUSTAINABILITY_PIONEERS.filter(pioneer =>
    pioneer.relatedTopics.some(t =>
      t.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(t.toLowerCase())
    )
  )
}

// Helper function to find pioneer by name
export function findPioneerByName(name: string): Founder | undefined {
  return SUSTAINABILITY_PIONEERS.find(pioneer =>
    pioneer.name.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(pioneer.name.split(' ')[0].toLowerCase())
  )
}

// Get pioneers mentioned in content
export function detectPioneersInContent(content: string): Founder[] {
  const lowerContent = content.toLowerCase()
  return SUSTAINABILITY_PIONEERS.filter(pioneer => {
    const firstName = pioneer.name.split(' ')[0].toLowerCase()
    const lastName = pioneer.name.split(' ').slice(-1)[0].toLowerCase()
    return (
      lowerContent.includes(pioneer.name.toLowerCase()) ||
      lowerContent.includes(firstName + ' ' + lastName) ||
      (lowerContent.includes(firstName) && lowerContent.includes(lastName))
    )
  })
}
