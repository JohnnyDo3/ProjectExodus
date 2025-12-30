import type { ArchitecturalElement } from '../../types';

export const POINTED_ARCH: ArchitecturalElement = {
  id: 'pointed-arch',
  slug: 'pointed-arch',
  name: 'Pointed Arch',
  alternativeNames: ['Gothic Arch', 'Ogival Arch', 'Lancet Arch', 'Two-Centered Arch'],
  pronunciation: {
    phonetic: 'POYN-tid arch',
    language: 'English',
  },
  etymology: {
    origin: 'English/French',
    meaning: 'An arch that rises to a point at the apex',
    rootWord: 'ogive (French, pointed arch)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['ISLAMIC_GOLDEN_AGE', 'GOTHIC', 'GOTHIC_REVIVAL'],
  regions: ['MIDDLE_EAST', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/pointed-arch-primary.jpg',
    gallery: [
      '/images/architecture/elements/notre-dame-arches.jpg',
      '/images/architecture/elements/gothic-cathedral-interior.jpg',
    ],
    diagram: '/images/architecture/diagrams/pointed-arch.svg',
  },

  description: {
    ELEMENTARY: 'A pointed arch looks like two curves meeting at a peak, like hands coming together in prayer! Gothic cathedrals are full of pointed arches—they helped builders make churches taller and fill them with huge stained glass windows.',
    MIDDLE_SCHOOL: 'The pointed arch is formed by two curves meeting at a point at the top. It was a key innovation of Gothic architecture, allowing builders to create taller structures and larger windows. The pointed shape directs forces more downward than round arches, requiring less massive walls.',
    HIGH_SCHOOL: 'The pointed arch, fundamental to Gothic architecture, offers structural advantages over round arches. Its geometry allows variable height with consistent width, enabling rectangular bay coverage with equal-height crowns. The more vertical thrust line reduces lateral forces, permitting thinner walls and larger window openings.',
    UNDERGRADUATE: 'The pointed arch originated in Islamic architecture before European adoption in the 12th century. Its geometric properties—two arc segments meeting at an apex—allow flexible height-to-span ratios while maintaining structural efficiency. This enabled Gothic builders to span rectangular bays with uniform crown heights and reduce the lateral thrust requiring buttressing.',
    GRADUATE: 'The pointed arch\'s development reveals complex patterns of technological and cultural transfer. While long established in Islamic architecture, its adoption in Western Europe transformed building practice. Analysis of early Gothic monuments (Saint-Denis, Sens) reveals experimentation with pointed arch geometry and its integration with rib vaulting.',
    PHD: 'Pointed arch studies address origins, structural behavior, and cultural significance. Questions of Islamic influence on Western Gothic remain debated. Structural analysis distinguishes between pure pointed arches and more complex forms (equilateral, lancet, depressed). The arch\'s symbolic associations—medieval spirituality, Gothic Revival nationalism—extend analysis to cultural history.',
  },

  history: {
    ELEMENTARY: 'Pointed arches were used in the Middle East and India centuries before European cathedrals! When European builders discovered them, they realized these arches could help build taller, lighter churches. The result was the amazing Gothic cathedrals like Notre-Dame.',
    MIDDLE_SCHOOL: 'Pointed arches appeared in Islamic architecture by the 7th century and in India even earlier. European builders adopted them in the 12th century, launching the Gothic style. The Abbey of Saint-Denis near Paris (1140s) is often considered the first Gothic building. From there, pointed arches spread across Europe.',
    HIGH_SCHOOL: 'The pointed arch developed independently in several traditions—Sassanian Persia, Islamic architecture, and possibly Indian sources. European adoption, beginning in the Île-de-France around 1140, combined pointed arches with rib vaults and flying buttresses to create the Gothic structural system. Gothic Revival architects in the 19th century championed the pointed arch as morally superior to classical forms.',
    UNDERGRADUATE: 'The pointed arch\'s transmission to Western Europe likely occurred through multiple channels: Crusader contacts, Norman Sicily, and Iberian interchange. The Abbey of Saint-Denis under Abbot Suger (1140-1144) represents a conscious synthesis of pointed arch, rib vault, and wall dissolution. Subsequent development refined proportional systems and expanded structural possibilities.',
    GRADUATE: 'Critical analysis of pointed arch development addresses historiographical debates about Islamic influence, technological versus aesthetic motivations, and the meaning of "Gothic" invention. The arch\'s role in enabling larger windows connects to theological programs of light symbolism. Gothic Revival reception constructed narratives of Christian versus pagan architecture.',
    PHD: 'Advanced pointed arch scholarship engages archaeological evidence, structural mechanics, and cultural history. Questions include: the precise channels of transmission to Europe, the relative importance of structural versus aesthetic motivations in adoption, and the ideological deployments of pointed versus round arches from medieval to modern periods.',
  },

  characteristics: [
    'Two arc segments meeting at apex',
    'Creates a peak at the crown',
    'More vertical thrust than round arch',
    'Allows variable height for same span',
    'Enables thinner walls and larger windows',
    'Foundational to Gothic architecture',
  ],

  famousExamples: [
    { name: 'Notre-Dame de Paris', location: 'Paris, France', year: '1163-1345', description: 'Iconic Gothic pointed arches' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1250', description: 'High Gothic perfection' },
    { name: 'Cologne Cathedral', location: 'Cologne, Germany', year: '1248-1880', description: 'Tallest Gothic twin spires' },
    { name: 'Westminster Abbey', location: 'London, UK', year: '1245-1272', description: 'English Gothic pointed arches' },
    { name: 'Al-Aqsa Mosque', location: 'Jerusalem', year: '705-715 CE', description: 'Early Islamic pointed arches' },
  ],

  confusionPairs: [
    {
      elementId: 'round-arch',
      reason: 'Both are fundamental arch types',
      distinction: 'Pointed arch rises to a peak; Round arch is semicircular',
    },
    {
      elementId: 'ogee-arch',
      reason: 'Both have complex curves',
      distinction: 'Pointed arch is two simple curves meeting; Ogee has S-shaped curves',
    },
    {
      elementId: 'tudor-arch',
      reason: 'Both are pointed-type arches',
      distinction: 'Gothic pointed is steeply pointed; Tudor is a flattened, four-centered arch',
    },
  ],

  searchTags: ['arch', 'gothic', 'pointed', 'ogival', 'cathedral', 'medieval', 'lancet', 'notre-dame', 'islamic'],

  arMetadata: {
    modelPath: '/models/architecture/pointed-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Apex/Point', position: { x: 0, y: 0.98, z: 0 } },
      { label: 'Voussoirs', position: { x: 0.25, y: 0.7, z: 0 } },
      { label: 'Spring Point', position: { x: 0.4, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
