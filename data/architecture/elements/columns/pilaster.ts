import type { ArchitecturalElement } from '../../types';

export const PILASTER: ArchitecturalElement = {
  id: 'pilaster',
  slug: 'pilaster',
  name: 'Pilaster',
  alternativeNames: ['Engaged Pillar', 'Wall Column', 'Flat Column'],
  pronunciation: {
    phonetic: 'pi-LAS-ter',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/Latin',
    meaning: 'A flattened column against a wall',
    rootWord: 'pilastro (from pila, pillar)',
  },
  category: 'COLUMN',
  subcategory: 'column_variations',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'CENTRAL_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/pilaster-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/pilaster.svg',
  },

  description: {
    ELEMENTARY: 'A pilaster is like a column that got squished flat against a wall! It looks like a column from the front, with a base and capital, but it\'s not round—it\'s rectangular and sticks out just a little from the wall.',
    MIDDLE_SCHOOL: 'A pilaster is a flat, rectangular column attached to a wall. It has the same parts as a real column (base, shaft, capital) but only projects slightly from the wall surface. It\'s mostly decorative, adding visual rhythm and classical elegance without taking up floor space.',
    HIGH_SCHOOL: 'Pilasters are rectangular columns attached to walls, projecting typically one-third to one-half their width. They follow the proportions and details of the classical orders but serve primarily decorative rather than structural purposes. Pilasters articulate wall surfaces and can frame windows, doors, or create visual bays.',
    UNDERGRADUATE: 'Pilasters represent the application of columnar vocabulary to wall articulation. While occasionally engaged with structural walls, their primary function is the organization of façade composition. The relationship between pilaster and column raises questions about the distinction between structural and decorative elements in classical architecture—a distinction less clear to ancient builders than to modern theorists.',
    GRADUATE: 'Pilaster analysis addresses the translation of columnar systems to wall surfaces, examining how architects negotiated between three-dimensional orders and two-dimensional applications. Renaissance theorists debated pilaster propriety, while Baroque practice exploited pilasters for dynamic wall articulation. Questions of entasis, proportional adjustment, and capital adaptation reveal the conceptual work involved in this translation.',
    PHD: 'Pilaster studies engage broader questions about architectural representation and the relationship between structure and ornament. The history of pilaster use from Roman interiors through Renaissance facades to Neoclassical monumentality reveals changing attitudes toward classical vocabulary. Critical analysis examines how pilasters both maintain and subvert the tectonic logic of columnar architecture.',
  },

  history: {
    ELEMENTARY: 'Romans invented pilasters because they wanted their walls to look fancy like Greek temples, but real columns would take up too much space! Architects have used them ever since to make buildings look classical without adding bulky columns everywhere.',
    MIDDLE_SCHOOL: 'Romans developed pilasters for interior decoration and exterior façade articulation. Renaissance architects like Alberti and Palladio perfected their use, creating elegant buildings where pilasters divide walls into visual sections. You\'ll see them on churches, palaces, and important buildings everywhere in Europe and America.',
    HIGH_SCHOOL: 'Pilasters appear in Roman architecture for wall articulation, continuing through Byzantine, Renaissance, and later periods. Renaissance theorists debated whether pilasters required entasis or could be flat. Alberti\'s influential Palazzo Rucellai (1446-1451) demonstrates systematic pilaster use to organize a palace façade according to classical principles.',
    UNDERGRADUATE: 'The pilaster\'s development reflects the adaptation of Greek columnar vocabulary to Roman and post-antique building practices. Questions of authenticity—whether pilasters should exactly follow column proportions—occupied Renaissance theorists. Michelangelo\'s innovative "giant order" pilasters spanning multiple stories influenced Baroque and later monumental architecture.',
    GRADUATE: 'Critical pilaster analysis examines the tension between structural expression and surface decoration. The pilaster\'s ability to suggest depth without occupying space made it essential to post-antique classical architecture. Analysis of specific deployments—from Brunelleschi\'s Santo Spirito to Palladio\'s villas—reveals varying solutions to the challenge of translating three-dimensional orders to wall surfaces.',
    PHD: 'Advanced pilaster scholarship addresses questions of architectural theory, representation, and the relationship between column and wall. The pilaster\'s history illuminates changing conceptions of classical authenticity and the nature of architectural meaning. Reception studies trace how pilasters signified "classicism" across cultural contexts while their actual design solutions varied considerably.',
  },

  characteristics: [
    'Rectangular column attached to wall',
    'Projects 1/3 to 1/2 of its width',
    'Has base, shaft, and capital like columns',
    'Can be any classical order',
    'Primarily decorative, not structural',
    'Articulates and organizes wall surfaces',
  ],

  famousExamples: [
    { name: 'Palazzo Rucellai', location: 'Florence, Italy', year: '1446-1451', description: 'Alberti\'s influential pilaster façade' },
    { name: 'St. Peter\'s Basilica interior', location: 'Vatican City', year: '1506-1626', description: 'Giant Composite pilasters' },
    { name: 'San Giorgio Maggiore', location: 'Venice, Italy', year: '1566-1610', description: 'Palladio\'s interlocking pilaster façade' },
    { name: 'Buckingham Palace', location: 'London, UK', year: '1703-1913', description: 'Neoclassical pilaster articulation' },
  ],

  confusionPairs: [
    {
      elementId: 'engaged-column',
      reason: 'Both are attached to walls',
      distinction: 'Pilaster is flat/rectangular; Engaged column is round (half a cylinder)',
    },
  ],

  searchTags: ['column', 'wall', 'pilaster', 'flat', 'decorative', 'classical', 'facade', 'order', 'renaissance'],

  arMetadata: {
    modelPath: '/models/architecture/pilaster.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Capital', position: { x: 0, y: 0.95, z: 0.1 } },
      { label: 'Flat Shaft', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Base', position: { x: 0, y: 0.05, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
