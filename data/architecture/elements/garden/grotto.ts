import type { ArchitecturalElement } from '../../types';

export const GROTTO: ArchitecturalElement = {
  id: 'grotto',
  slug: 'grotto',
  name: 'Grotto',
  alternativeNames: ['Artificial Cave', 'Nymphaeum', 'Grotte', 'Cave Pavilion'],
  pronunciation: {
    phonetic: 'GROT-oh',
    language: 'Italian',
  },
  etymology: {
    origin: 'Italian/Latin',
    meaning: 'Cave or cavern',
    rootWord: 'From Italian "grotta" and Latin "crypta" (crypt, cave)',
  },
  category: 'GARDEN',
  subcategory: 'water_features',
  periods: ['RENAISSANCE', 'MANNERISM', 'BAROQUE', 'ROCOCO', 'ROMANTIC', 'VICTORIAN'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'ENGLAND', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/grotto-primary.jpg',
    gallery: [
      '/images/architecture/elements/grotto-shell.jpg',
      '/images/architecture/elements/grotto-romantic.jpg',
    ],
    diagram: '/images/architecture/diagrams/grotto-construction.svg',
  },

  description: {
    ELEMENTARY: 'A grotto is a man-made cave built in a garden! It\'s usually decorated with shells, rocks, and crystals to look magical and mysterious. Inside it\'s cool and shady, and often has water dripping or a little fountain. Grottos feel like secret hideaways where fairies might live!',
    MIDDLE_SCHOOL: 'A grotto is an artificial cave or cavern constructed as a garden feature. Built from rocks, shells, minerals, and sometimes featuring water elements, grottos create cool, shaded, mysterious spaces. They range from small niches with fountains to walk-through cave-like rooms. Interior surfaces are often decorated with shells (shellwork), geological specimens, or mosaic. Grottos provided retreat from summer heat.',
    HIGH_SCHOOL: 'The garden grotto is an artificial cave structure combining rustication, water features, and decorative geological elements. Construction involves rough stonework or tufa (porous limestone) creating cave-like interiors. Decorative treatments include shellwork, mineral encrustations, and stalactite formations. Grottos serve multiple purposes: cooling retreat, display of natural specimens, and evocation of primitive nature. They represent controlled wildness within formal gardens.',
    UNDERGRADUATE: 'Grotto design integrates hydraulic engineering, geological display, and aesthetic theory. Structural considerations include drainage, moisture management, and load-bearing rough stonework. Decorative programs range from elaborate shellwork patterns to rustic tufa formations. Historical grottos incorporated automata and hydraulic surprises (giochi d\'acqua). The grotto embodies tensions between nature and artifice, representing both retreat from civilization and triumph of artistic control over natural materials.',
    GRADUATE: 'Grotto analysis encompasses architectural history, garden theory, and material culture. Research examines construction techniques-tufa quarrying, shell sourcing, hydraulic systems-and iconographic programs linking grottos to classical nymphaea and mythological associations. Conservation challenges include managing moisture damage, stabilizing fragile shellwork, and reconstructing lost hydraulic features. Contemporary scholarship explores the grotto\'s role in natural history collecting and scientific display.',
    PHD: 'Research into grottos engages multiple disciplines: art history (iconography and patronage), geology (materials and techniques), and cultural history (collecting practices and natural philosophy). Investigation addresses the grotto\'s classical origins in nymphaea, Renaissance development as sites of natural wonder, and dissemination through treatises. Current scholarship examines grottos as spaces of scientific investigation, the relationship between grottos and early museums, and conservation science for fragile shell and mineral decorations.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks and Romans built nymphaea-special caves for water nymphs! In the Renaissance, rich Italian families built amazing grottos decorated with thousands of shells and sparkling minerals. Some had trick fountains that would spray visitors! English romantic gardens built grottos to look like wild nature. Queen Victoria loved visiting grottos!',
    MIDDLE_SCHOOL: 'Roman nymphaea were sacred grottoes with fountains honoring water nymphs. Renaissance Italy revived the form-Buontalenti\'s grottos at Boboli Gardens (1583) featured elaborate decorations and automata. Baroque and Rococo periods favored extravagant shellwork. English landscape gardens embraced picturesque romantic grottos. Victorian era saw grotto construction in public parks and private estates. Grotto building declined after 1900 but has seen recent revival.',
    HIGH_SCHOOL: 'Ancient nymphaea established the grotto prototype-cave-like fountain shrines. Renaissance humanists studied Roman examples and created elaborate interpretations combining hydraulics, sculpture, and natural specimens. Mannerist grottos (Pratolino, Palazzo Te) featured sophisticated automata and architectural illusions. Picturesque theory embraced grottos as embodiments of sublime nature. Victorian grottos served as fern houses and geological displays. Conservation challenges include moisture damage and material deterioration.',
    UNDERGRADUATE: 'Grotto history reveals changing concepts of nature, science, and display. Roman nymphaea combined religious function with hydraulic technology. Renaissance grottos materialized humanist engagement with classical texts and natural philosophy. The grotto became a site for displaying natural history collections-shells, minerals, coral-prefiguring museums. Picturesque aesthetics valued grottos as artfully wild contrasts to formal gardens. Victorian grottos merged romantic sensibility with geological education.',
    GRADUATE: 'Historical analysis of grottos examines construction treatises, collecting practices, and iconographic programs. Research addresses technical achievements (Pratolino\'s complex hydraulics), the symbolism of shell and mineral arrangements, and the grotto\'s role in scientific networks (specimen exchange). Conservation research develops methods for stabilizing deteriorating materials-shell, tufa, mineral encrustations-while maintaining visual authenticity. Documentation challenges include recording complex three-dimensional decorative surfaces.',
    PHD: 'Grotto scholarship engages art history, history of science, and conservation science. Methodologies include archival research (construction accounts, specimen sources), material analysis (shell species identification, mortar composition), and hydraulic archaeology (reconstructing water systems). Current research examines grottos as sites of early modern science, the role of grotto builders and shell artists as specialist craftspeople, and ethical questions in restoration (replacement of lost natural materials).',
  },

  characteristics: [
    'Artificial cave-like structure',
    'Rough stonework or tufa construction',
    'Often incorporates water features',
    'Decorated with shells, minerals, crystals',
    'Cool, shaded interior atmosphere',
    'Irregular, naturalistic forms',
    'Contrasts with formal garden elements',
  ],

  famousExamples: [
    { name: 'Grotto of Buontalenti', location: 'Boboli Gardens, Florence, Italy', year: '1583-1593', description: 'Mannerist masterpiece with elaborate sculptural program' },
    { name: 'Versailles Grotto of Thetis', location: 'Versailles, France', year: '1664-1670', description: 'Baroque grotto with Apollo sculptures (demolished 1684)' },
    { name: 'Stourhead Grotto', location: 'Wiltshire, UK', year: '1748', description: 'Picturesque landscape garden grotto with nymph statue' },
    { name: 'Painshill Grotto', location: 'Surrey, UK', year: '1760s', description: 'Spectacular crystal and spar grotto, recently restored' },
    { name: 'Worlitz Park Grotto', location: 'Saxony-Anhalt, Germany', year: '1773', description: 'Romantic landscape garden grotto with volcanic rock' },
  ],

  confusionPairs: [
    {
      elementId: 'niche',
      reason: 'Both are concave architectural features',
      distinction: 'Grottos are walk-in cave-like structures; niches are small wall recesses for statuary or decoration',
    },
    {
      elementId: 'folly',
      reason: 'Both are ornamental garden structures',
      distinction: 'Grottos are specifically cave-like structures with water; follies are any non-functional ornamental buildings',
    },
    {
      elementId: 'fountain',
      reason: 'Both often feature water',
      distinction: 'Grottos are enclosed cave-like spaces with water; fountains are open water displays',
    },
  ],

  searchTags: ['cave', 'shells', 'water', 'romantic', 'garden', 'tufa', 'minerals', 'nymphaeum', 'picturesque'],

  arMetadata: {
    modelPath: '/models/architecture/grotto.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Rough Stone Entrance', position: { x: 0, y: 1, z: 1 } },
      { label: 'Shell Decoration', position: { x: 0.5, y: 1.5, z: 0.3 } },
      { label: 'Water Basin', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Tufa/Rockwork', position: { x: -0.5, y: 1.2, z: 0.2 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
