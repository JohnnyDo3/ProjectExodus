import type { ArchitecturalElement } from '../../types';

export const BELVEDERE: ArchitecturalElement = {
  id: 'belvedere',
  slug: 'belvedere',
  name: 'Belvedere',
  alternativeNames: ['Viewing Tower', 'Mirador', 'Prospect Tower', 'Lookout'],
  pronunciation: {
    phonetic: 'BEL-vuh-deer',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian',
    meaning: 'Beautiful view',
    rootWord: 'From Italian "bel" (beautiful) + "vedere" (to see)',
  },
  category: 'GARDEN',
  subcategory: 'viewing_structures',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'ROMANTIC', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['ITALY', 'WESTERN_EUROPE', 'ENGLAND', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/belvedere-primary.jpg',
    gallery: [
      '/images/architecture/elements/belvedere-tower.jpg',
      '/images/architecture/elements/belvedere-rooftop.jpg',
    ],
    diagram: '/images/architecture/diagrams/belvedere-types.svg',
  },

  description: {
    ELEMENTARY: 'A belvedere is a special tower or high room built just for looking at beautiful views! The word means "beautiful view" in Italian. Some belvederes are towers in gardens where you can climb up to see far away. Others are fancy rooms on top of buildings where you can see the whole city. They\'re perfect spots for watching sunsets!',
    MIDDLE_SCHOOL: 'A belvedere is an architectural structure designed specifically for viewing scenery. Types include freestanding towers in landscape gardens, rooftop pavilions on buildings, and elevated garden structures. Unlike follies built mainly for decoration, belvederes have the practical function of providing panoramic views. Italian Renaissance villas pioneered rooftop belvederes. English landscape gardens featured belvedere towers as viewing platforms for surveying estates.',
    HIGH_SCHOOL: 'The belvedere is a viewing structure-either a tower, rooftop pavilion, or elevated platform-positioned to command prospect over landscape or cityscape. Renaissance Italian villa design established the rooftop belvedere type, combining recreation with defensive surveillance. Landscape belvederes positioned on high ground serve as destinations and viewpoints. Design considerations include height, openness (columns vs. walls), accessibility, and relationship to surrounding topography. The belvedere materializes the Enlightenment value of visual command.',
    UNDERGRADUATE: 'Belvedere design integrates structural engineering, landscape theory, and aesthetic philosophy. Freestanding towers require foundation adequate for height and wind loads. Rooftop belvederes must integrate with building structure and waterproofing. Site selection analyzes viewsheds and compositional relationships. The belvedere embodies concepts of prospect, surveillance, and visual possession-from Renaissance military-domestic hybrids through Picturesque viewing stations to contemporary observation decks. Contemporary applications include museum viewing terraces and park structures.',
    GRADUATE: 'Belvedere analysis encompasses architectural history, landscape theory, and visual culture. Research examines Renaissance villa belvedere programs (Vatican Belvedere, Villa Madama), structural techniques for tower construction, and the relationship between viewpoint and landscape composition. Conservation challenges include structural assessment of exposed rooftop structures and tower stability. Theoretical investigation addresses the politics of visual command-prospect as power, the gendered nature of viewing, and the relationship between belvederes and landscape survey.',
    PHD: 'Research into belvederes engages architectural history, visual culture studies, and geography. Scholarly investigation examines Renaissance theoretical writing on villa prospect (Alberti, Palladio), the belvedere\'s role in territorial display and management, and the dissemination of the type across Europe. Current research addresses the relationship between belvederes and practices of surveillance, the gendered spaces of viewing, and comparative analysis with other viewing traditions (Chinese pavilions, Islamic miradoras). Conservation science develops assessment methods for structurally challenged historic towers.',
  },

  history: {
    ELEMENTARY: 'The word belvedere comes from Italy, where Renaissance villas had special rooms on their roofs for enjoying views over beautiful gardens and countryside. English landowners loved this idea and built towers on hills so they could see their entire estates! Some belvederes were tall enough to see for many miles. Today, we still build belvederes in parks and on buildings.',
    MIDDLE_SCHOOL: 'Renaissance Italian architecture developed the belvedere-both rooftop pavilions (Bramante\'s Vatican Belvedere, 1505) and garden structures. The type spread across Europe. English landscape gardens featured belvedere towers as viewing platforms and compositional elements. Castle Howard\'s Temple of the Four Winds (1738) exemplifies the garden belvedere. Victorian era saw picturesque belvederes in public parks. Contemporary architecture continues the tradition in observation decks and rooftop terraces.',
    HIGH_SCHOOL: 'Bramante\'s Vatican Belvedere (1505) established the Renaissance prototype-a gallery and courtyard complex connecting papal apartments to a hilltop villa with panoramic views. The type evolved into rooftop pavilions and freestanding towers. Palladio theorized villa siting for prospect. English landscape designers positioned belvedere towers to command views and serve as eyecatchers (Vanbrugh, Hawksmoor). Victorian belvederes graced parks and institutional buildings. Modern skyscraper observation decks continue the tradition.',
    UNDERGRADUATE: 'Belvedere history reveals changing concepts of landscape viewing and territorial possession. Renaissance belvederes combined pleasure with surveillance-monitoring estates and territories. Palladio\'s theoretical writing emphasized prospect in villa siting. Baroque belvederes served theatrical display (Versailles perspectives). Picturesque theory valued belvederes as stations for landscape appreciation. Victorian belvederes democratized views previously reserved for elites. The type\'s persistence suggests universal human desire for elevated prospect.',
    GRADUATE: 'Historical analysis of belvederes examines architectural treatises, construction techniques, and cultural geography. Research addresses Renaissance theoretical writing (Alberti on villa siting, Palladio on prospect), the structural engineering of towers, and the relationship between viewpoint and landscape design. Estate records reveal belvedere construction costs and patron motivations. Conservation challenges include weathering of exposed rooftop structures and seismic vulnerability of tall towers. Contemporary scholarship examines viewing as gendered practice and the politics of visual command.',
    PHD: 'Belvedere scholarship engages architectural history, visual culture, and landscape studies. Methodologies include analysis of architectural treatises, archaeological investigation of historic structures, and theoretical examination of viewing practices. Current research addresses the belvedere\'s role in territorial management and display, comparative analysis with viewing traditions across cultures, and the relationship between prospect and power. Conservation science develops non-invasive structural assessment for historic towers and rooftop pavilions.',
  },

  characteristics: [
    'Designed specifically for viewing',
    'Elevated position-tower or rooftop',
    'Commands panoramic prospects',
    'Often open or with large windows',
    'May serve as compositional focal point',
    'Accessible viewing platform',
    'Strategic siting for optimal views',
  ],

  famousExamples: [
    { name: 'Vatican Belvedere Courtyard', location: 'Vatican City', year: '1505', description: 'Bramante\'s influential Renaissance design' },
    { name: 'Temple of the Four Winds', location: 'Castle Howard, UK', year: '1738', description: 'Vanbrugh\'s classical garden belvedere' },
    { name: 'Schönbrunn Gloriette', location: 'Vienna, Austria', year: '1775', description: 'Neoclassical hilltop viewing pavilion' },
    { name: 'Leith Hill Tower', location: 'Surrey, UK', year: '1766', description: 'Gothic Revival belvedere tower on highest point in southeast England' },
    { name: 'Getty Center', location: 'Los Angeles, USA', year: '1997', description: 'Modern belvedere terraces by Richard Meier' },
  ],

  confusionPairs: [
    {
      elementId: 'gazebo',
      reason: 'Both can be freestanding garden structures',
      distinction: 'Belvederes are elevated specifically for commanding views; gazebos are ground-level pavilions for shelter and seating',
    },
    {
      elementId: 'folly',
      reason: 'Both may be towers in gardens',
      distinction: 'Belvederes have the practical function of viewing; follies are primarily decorative with minimal function',
    },
    {
      elementId: 'cupola',
      reason: 'Both can be rooftop structures',
      distinction: 'Belvederes are accessible viewing platforms; cupolas are typically small domes providing light and ventilation',
    },
  ],

  searchTags: ['viewing', 'tower', 'prospect', 'panorama', 'rooftop', 'landscape', 'Italian', 'observation', 'vista'],

  arMetadata: {
    modelPath: '/models/architecture/belvedere.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Viewing Platform', position: { x: 0, y: 3, z: 0 } },
      { label: 'Open Colonnade', position: { x: 0.5, y: 2.5, z: 0 } },
      { label: 'Access Stairs', position: { x: 0.8, y: 1.5, z: 0.8 } },
      { label: 'Foundation/Base', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
