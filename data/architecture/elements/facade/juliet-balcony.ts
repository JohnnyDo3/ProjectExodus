import type { ArchitecturalElement } from '../../types';

export const JULIET_BALCONY: ArchitecturalElement = {
  id: 'juliet-balcony',
  slug: 'juliet-balcony',
  name: 'Juliet Balcony',
  alternativeNames: ['Balconette', 'French Balcony', 'Balconet', 'False Balcony'],
  pronunciation: {
    phonetic: 'JOO-lee-et BAL-kuh-nee',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Named after Shakespeare\'s Juliet, who famously appeared at a balcony in Romeo and Juliet',
    rootWord: 'Juliet + balcony',
  },
  category: 'FACADE',
  subcategory: 'decorative_opening',
  periods: ['renaissance', 'baroque', 'neoclassical', 'art-nouveau', 'contemporary'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'FRANCE', 'ITALY', 'SPAIN', 'BRITAIN'],

  images: {
    primary: '/images/architecture/elements/juliet-balcony-primary.jpg',
    gallery: [
      '/images/architecture/elements/juliet-balcony-iron.jpg',
      '/images/architecture/elements/juliet-balcony-stone.jpg',
      '/images/architecture/elements/juliet-balcony-contemporary.jpg',
    ],
    diagram: '/images/architecture/diagrams/juliet-balcony-vs-balcony.svg',
  },

  description: {
    ELEMENTARY: 'A Juliet balcony is a tiny decorative balcony that doesn\'t stick out from the building! It\'s just a railing in front of French doors or tall windows. You can open the doors, stand inside, and look out-but you can\'t actually step outside because there\'s no floor! It\'s named after Juliet from the famous Shakespeare play, even though she probably had a real balcony. These pretty railings make windows look fancy and let fresh air in safely!',
    MIDDLE_SCHOOL: 'A Juliet balcony is a shallow or false balcony that consists of a decorative railing installed immediately outside French doors or full-height windows, with little or no projecting platform. Unlike a traditional balcony, you cannot step outside onto it-it serves primarily as a safety railing and decorative element. The name references Shakespeare\'s Romeo and Juliet, though the famous balcony scene likely depicted a traditional balcony. Juliet balconies became popular in European cities where space was limited, allowing windows to open fully while providing safety and architectural decoration. They\'re commonly made of wrought iron, stone, or modern materials, and can range from simple railings to elaborate decorative metalwork.',
    HIGH_SCHOOL: 'Juliet balconies are architectural features consisting of railings or balustrades placed directly at the threshold of French doors or floor-to-ceiling windows, without a significant projecting platform. These elements serve multiple functions: safety barriers preventing falls when doors are opened, decorative facade enrichment, and provision for air circulation while maintaining security. The term originated from Shakespeare\'s Romeo and Juliet, though the theatrical balcony was likely a full balcony. Juliet balconies evolved in dense European urban contexts where projecting balconies were impractical due to narrow streets or building regulations. They appear extensively in French, Italian, and Spanish architecture from the 17th century onward. Materials and designs vary widely-from simple wrought iron railings to elaborate Art Nouveau metalwork to minimalist contemporary glass panels.',
    UNDERGRADUATE: 'Juliet balconies represent architectural responses to spatial constraints, safety requirements, and aesthetic desires. Functionally, they provide safety barriers at full-height openings while occupying minimal space-crucial in dense urban environments with narrow streets where projecting balconies would obstruct passage or light. Aesthetically, they articulate facades, create rhythm across elevations, and demonstrate decorative metalwork or stonework craftsmanship. Culturally, they enable indoor-outdoor connection and street engagement without requiring significant structural projection. Their development relates to evolving door and window technology-the French door/window enabled by improved glass manufacturing. Regional variations reflect different craft traditions: French examples often feature delicate wrought iron; Spanish examples sometimes incorporate ceramic tiles; contemporary versions use minimalist glass or steel. Urban planning regulations in historic districts often mandate Juliet balconies over projecting balconies to maintain street character and dimensions.',
    GRADUATE: 'Critical analysis of Juliet balconies addresses their multivalent functions: safety devices, decorative elements, spatial mediators, and cultural signifiers. They exemplify architecture\'s response to competing demands-desire for outdoor access versus spatial constraints; need for ventilation versus security concerns; aesthetic enrichment versus economic efficiency. Historical development traces from Renaissance and Baroque urban palaces through 19th-century apartment buildings to contemporary residential architecture. Regulatory frameworks often shaped Juliet balcony prevalence-Parisian building codes restricting projections; historic district regulations preserving street character. Material and craft studies reveal regional traditions and technical evolution-wrought iron craftsmanship in France and Spain; cast iron industrialization in 19th century; contemporary glass and stainless steel. Social dimensions include surveillance and sociability-Juliet balconies enable street observation and casual social interaction without formal outdoor space. Phenomenological investigation addresses embodied experience of threshold-being inside while psychologically outside, visual connection without physical projection into public realm.',
    PHD: 'Advanced Juliet balcony scholarship engages technical, social, regulatory, and phenomenological dimensions across cultural contexts. Research questions include: How did Juliet balconies evolve in response to urban density, building regulations, and changing domestic practices? What roles do they play in mediating public-private boundaries? How do design variations reflect regional craft traditions and aesthetic movements? Methodological approaches encompass building code analysis (regulatory influences on balcony forms); material culture studies (metalwork traditions, industrial production); social history (domestic practices, street life, surveillance); and phenomenology (threshold experience, indoor-outdoor relationships). Comparative urban studies reveal variations-Parisian examples shaped by Haussmann-era regulations; Barcelona examples influenced by Modernisme aesthetics; London examples reflecting Georgian and Victorian conventions. Critical frameworks address Juliet balconies through space syntax (public-private interfaces), gender studies (domestic surveillance and display), and urban sociology (street life and neighborly interaction). Technical research examines structural attachment, weatherproofing, and safety standards evolution. Contemporary discourse addresses Juliet balconies in sustainable design (natural ventilation without thermal bridges), historic preservation (appropriate replacement in restoration), and housing density debates (minimal outdoor space provision).',
  },

  history: {
    ELEMENTARY: 'Juliet balconies became popular in Europe several hundred years ago when cities were very crowded and buildings were built close together. People wanted to open their windows wide and get fresh air, but they needed railings to stay safe. The fancy iron railings also made the buildings look beautiful! The name comes from William Shakespeare\'s famous play Romeo and Juliet, written over 400 years ago, even though Juliet\'s balcony in the play was probably bigger!',
    MIDDLE_SCHOOL: 'Juliet balconies developed in European cities during the Renaissance and Baroque periods (16th-18th centuries) as urban density increased. In crowded cities like Paris, Venice, and Barcelona, buildings stood close together with narrow streets, making large projecting balconies impractical. Juliet balconies solved this problem-providing safety and decoration without obstructing streets. The name references Shakespeare\'s Romeo and Juliet (written 1594-1596), though this was a literary association rather than historical origin. French apartment buildings in the 18th-19th centuries extensively used Juliet balconies, often with decorative wrought iron railings. The element spread throughout Europe and colonial territories. Art Nouveau (1890-1910) and Art Deco (1920s-1930s) movements created especially ornate Juliet balcony designs.',
    HIGH_SCHOOL: 'Juliet balcony development relates to urban densification, building regulations, and evolving door/window technology. Renaissance and Baroque Italian palaces featured balconette-small decorative railings at windows. French architecture from the 17th century onward extensively employed Juliet balconies, especially in urban contexts. Parisian Haussmann-era regulations (1850s-1870s) governed balcony projections, encouraging Juliet balconies on upper floors. Spanish and Italian cities developed regional variations reflecting local metalwork traditions. The name "Juliet balcony" emerged in English-speaking countries, referencing Shakespeare\'s Romeo and Juliet (1594-1596), though the play predated widespread adoption of the form. Victorian Britain adopted Juliet balconies for urban townhouses and terraces. Art Nouveau architects created elaborate decorative Juliet balconies-Paris, Barcelona, Brussels. Art Deco continued the tradition with modernist geometric patterns. Contemporary architecture employs Juliet balconies in high-density urban housing and historic district development.',
    UNDERGRADUATE: 'Juliet balcony evolution demonstrates interaction between spatial constraints, regulatory frameworks, technological developments, and aesthetic preferences. Renaissance Italian precedents included shallow balconette on palace facades-providing decorative enrichment and minimal outdoor access. French architecture systematized Juliet balcony usage in urban contexts. The development of French doors/windows in the 17th-18th centuries enabled full-height openings requiring safety barriers. Parisian building regulations shaped balcony forms-Haussmann-era codes specified projection limits and alignment requirements, encouraging Juliet balconies on upper floors while permitting larger balconies at piano nobile. Ironwork craftsmanship enabled decorative elaboration-scrollwork, floral patterns, geometric compositions. Regional variations reflect different traditions: French delicacy; Spanish robustness often incorporating ceramic elements; Italian Renaissance-inspired stonework. Industrial iron production in the 19th century made decorative railings more affordable and widely available. Art Nouveau architects employed Juliet balconies as canvases for organic decorative ironwork-Paris (Hector Guimard), Barcelona (Antoni Gaudí, Lluís Domènech i Montaner), Brussels (Victor Horta). Art Deco introduced geometric modernist patterns. Contemporary practice employs Juliet balconies in dense urban contexts and historic preservation projects.',
    GRADUATE: 'Critical Juliet balcony studies address regulatory, technical, social, and aesthetic dimensions. Regulatory influences shaped prevalence and forms-Parisian codes governing projections and alignments; historic district regulations in European cities; fire safety codes requiring egress or preventing obstruction. Technical developments enabled their proliferation-wrought iron craftsmanship in 17th-18th centuries; cast iron industrial production in 19th century; contemporary glass and stainless steel systems. Social functions include enabling street observation, facilitating casual social interaction, and providing limited outdoor access in dense housing. Gender studies scholarship addresses Juliet balconies in contexts of domestic surveillance and female social space-women observing street life while remaining in domestic sphere. Aesthetic analysis examines Juliet balconies as decorative elements-craft traditions in ironwork; stylistic movements from Baroque to Art Nouveau to Minimalism. Regional studies reveal variations: Parisian examples shaped by Haussmannization; Barcelona examples reflecting Modernisme; Venetian examples maintaining historical patterns. Phenomenological investigation addresses threshold experience-psychological sense of outdoor connection without physical projection; visual engagement with urban space from semi-exterior position. Comparative analysis with other balcony forms reveals functional and symbolic differences.',
    PHD: 'Advanced Juliet balcony scholarship employs interdisciplinary methodologies: building code history (regulatory frameworks shaping architectural forms); material culture studies (ironwork traditions, industrial production, contemporary materials); social history (domestic practices, gender roles, urban sociability); urban morphology (street dimensions, building typologies, urban density); and phenomenology (threshold experience, public-private boundaries). Research questions include: How did regulatory frameworks influence Juliet balcony prevalence? What roles did they play in domestic and urban social life? How do regional variations reflect cultural and craft traditions? Primary sources include building codes, architectural treatises, craft manuals, and period photographs. Theoretical frameworks encompass space syntax (public-private interfaces), actor-network theory (assemblages of regulations, materials, practices), and feminist geography (gendered domestic spaces, surveillance, street access). Comparative urban studies examine Juliet balcony distributions and forms across cities-Paris, Barcelona, Rome, London-revealing regulatory, cultural, and aesthetic influences. Contemporary research addresses Juliet balconies in sustainable design (natural ventilation strategies, thermal bridge avoidance), historic preservation (appropriate replacement materials and designs), and housing density debates (minimal outdoor space provision in urban contexts). The element exemplifies architecture\'s negotiation of competing demands: safety and openness, economy and decoration, privacy and sociability.',
  },

  characteristics: [
    'Railing or balustrade directly at door/window threshold',
    'Little or no projecting platform (typically less than 6 inches)',
    'Installed at French doors or full-height windows',
    'Provides safety barrier without occupying street space',
    'Purely decorative exterior appearance',
    'Enables full door opening for ventilation',
    'Often features ornamental metalwork or glass panels',
    'Does not support standing outside the building',
  ],

  famousExamples: [
    {
      name: 'Parisian Haussmann Buildings',
      location: 'Paris, France',
      year: '1850s-1870s',
      description: 'Thousands of Juliet balconies on standardized apartment facades',
    },
    {
      name: 'Casa Batlló',
      location: 'Barcelona, Spain',
      year: '1904-1906',
      description: 'Gaudí\'s Art Nouveau building with organic iron Juliet balconies',
    },
    {
      name: 'Juliet\'s House',
      location: 'Verona, Italy',
      year: '13th century (balcony added 1936)',
      description: 'Tourist attraction balcony added to medieval house, technically a small projecting balcony',
    },
    {
      name: 'Georgian Townhouses',
      location: 'London, England',
      year: '18th-19th centuries',
      description: 'Simple iron Juliet balconies on upper-floor windows',
    },
    {
      name: 'French Quarter Buildings',
      location: 'New Orleans, Louisiana, USA',
      year: '18th-19th centuries',
      description: 'Decorative cast iron Juliet balconies on Creole architecture',
    },
  ],

  confusionPairs: [
    {
      elementId: 'balcony',
      reason: 'Both are exterior features at windows/doors',
      distinction: 'Balconies project from the building with platforms you can stand on; Juliet balconies have no platform and are just decorative railings',
    },
    {
      elementId: 'balustrade',
      reason: 'Juliet balconies often consist of balustrades',
      distinction: 'Balustrades are the railing elements themselves; Juliet balconies are the architectural application of railings at windows/doors',
    },
  ],

  searchTags: [
    'juliet balcony',
    'balconette',
    'french balcony',
    'false balcony',
    'window railing',
    'decorative iron',
    'wrought iron',
    'facade detail',
    'safety barrier',
    'french door',
  ],

  arMetadata: {
    modelPath: '/models/architecture/juliet-balcony.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Decorative Railing', position: { x: 0, y: 0.3, z: 0.1 } },
      { label: 'Minimal Platform', position: { x: 0, y: -0.3, z: 0.05 } },
      { label: 'Window/Door Threshold', position: { x: 0, y: -0.3, z: -0.1 } },
      { label: 'Ornamental Ironwork', position: { x: 0.2, y: 0, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
