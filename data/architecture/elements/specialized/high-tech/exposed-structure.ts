import type { ArchitecturalElement } from '../../../types';

export const EXPOSED_STRUCTURE: ArchitecturalElement = {
  id: 'exposed-structure',
  slug: 'exposed-structure',
  name: 'Exposed Structure',
  alternativeNames: ['Structural Expressionism', 'Visible Framework', 'Expressed Frame', 'Structural Display'],
  pronunciation: {
    phonetic: 'eks-POHZD STRUK-chur',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Building framework made deliberately visible',
    rootWord: 'From Latin "exponere" (to expose) and "structura" (arrangement)',
  },
  category: 'STRUCTURAL',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/exposed-structure-primary.jpg',
    gallery: [
      '/images/architecture/elements/exposed-structure-pompidou.jpg',
      '/images/architecture/elements/exposed-structure-hsbc.jpg',
      '/images/architecture/elements/exposed-structure-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/exposed-structure-assembly.svg',
  },

  description: {
    ELEMENTARY: 'Exposed structure is when the metal beams and columns that hold up a building are left visible on the outside instead of being hidden. It\'s like showing off the building\'s skeleton! This makes buildings look honest and industrial, like giant machines or construction sites that are finished but still show how they work.',
    MIDDLE_SCHOOL: 'In High-Tech architecture, structural elements like steel beams, columns, and trusses are deliberately exposed on the building\'s exterior rather than covered up. This "honest expression" of structure celebrates engineering and construction, turning functional elements into architectural features. The raw industrial aesthetic became a signature of 1970s-80s High-Tech design.',
    HIGH_SCHOOL: 'Exposed structure embodies the High-Tech principle of structural honesty-making visible the engineering systems that support the building. Steel I-beams, tubular columns, cross-bracing, and truss systems become exterior features, often painted in bold colors. This approach celebrates technology and construction processes, rejecting traditional facades that hide structural systems. The aesthetic draws from industrial and engineering design.',
    UNDERGRADUATE: 'Structural expressionism in High-Tech architecture represents both an aesthetic philosophy and a construction strategy. By externalizing structural elements, architects create column-free interior spaces while celebrating technological achievement. The approach requires careful detailing for weatherproofing and thermal performance of exposed steel. Color-coding systems (Pompidou\'s functional color scheme) can express different structural roles. Contemporary applications balance honest expression with energy performance requirements.',
    GRADUATE: 'Exposed structure in High-Tech architecture engages questions of architectural authenticity, technological celebration, and spatial flexibility. The strategy reflects 1960s-70s architectural theory (Team 4, Archigram) that rejected decorated sheds in favor of honest expression. Technical considerations include corrosion protection, thermal bridging, fire protection, and acoustic performance of external steel. Research examines the maintenance implications and long-term performance of exposed structural systems in various climates.',
    PHD: 'Scholarship on exposed structure examines the intersection of structural engineering, architectural theory, and industrial aesthetics. Historical research traces influences from 19th-century engineering (Eiffel, Paxton) through Constructivism to postwar British Brutalism and 1970s High-Tech. Critical analysis interrogates the "honesty" claim-exposed structure requires significant technical artifice and maintenance. Contemporary research addresses adaptive reuse of High-Tech buildings and the environmental performance implications of externalized thermal mass.',
  },

  history: {
    ELEMENTARY: 'About 50 years ago, architects decided to turn buildings "inside out" by putting the skeleton on the outside. The most famous example is the Centre Pompidou in Paris, built in 1977, which looks like a colorful factory! This style spread around the world and influenced how we design modern buildings today.',
    MIDDLE_SCHOOL: 'Exposed structure emerged in 1970s High-Tech architecture, pioneered by Richard Rogers and Renzo Piano\'s Centre Pompidou (1977) and Norman Foster\'s work. The approach drew from 19th-century engineering structures and 1960s architectural theory. While initially controversial, exposed structure influenced commercial architecture worldwide through the 1980s-90s. Contemporary architects continue to explore structural expression with new materials and digital design.',
    HIGH_SCHOOL: 'The concept evolved from 19th-century engineering (Crystal Palace, Eiffel Tower) through Team 4\'s experiments (1960s Rogers and Foster partnership) to mature High-Tech expression at Centre Pompidou. Lloyd\'s Building (1986) and HSBC Hong Kong (1985) refined the vocabulary. Structural expressionism reflected 1970s technological optimism and rejection of decorated postmodernism. The aesthetic influenced mainstream commercial architecture, though often simplified from High-Tech\'s rigorous engineering integration.',
    UNDERGRADUATE: 'Exposed structure\'s genealogy traces from Victorian engineering through Russian Constructivism and Buckminster Fuller\'s systems thinking to 1960s British architecture. Cedric Price\'s unbuilt Fun Palace (1961) theorized flexible, exposed infrastructure. Team 4\'s Reliance Controls Factory (1967) pioneered the serviced shed. Centre Pompidou (1977) synthesized these ideas into cultural architecture. The 1980s saw commercial adoption (Lloyd\'s, HSBC) and global diffusion, though often losing High-Tech\'s social and technological aspirations.',
    GRADUATE: 'Historical analysis of exposed structure examines technological utopianism, architectural authenticity debates, and the relationship between engineering and architecture. The movement reflected 1970s energy crisis concerns (flexible servicing), computational advancement (complex engineering), and cultural shifts (transparency, participation). Critical scholarship questions whether exposed structure truly represents "honesty" or constitutes another formal style. Maintenance and performance challenges of aging High-Tech buildings present contemporary preservation dilemmas.',
    PHD: 'Exposed structure scholarship engages architectural theory, technology studies, and cultural history. Research examines the movement\'s relationship to contemporaneous developments: postmodern historicism (as opposition), late modernism (as continuation), and systems theory (as influence). Analysis of specific buildings reveals gaps between theoretical claims (flexibility, adaptability) and realized performance. Contemporary work addresses the environmental retrofit of High-Tech buildings-their externalized structure complicates envelope improvement-and preservation questions around aging exposed steel.',
  },

  characteristics: [
    'Structural elements visible on exterior',
    'Steel beams, columns, and trusses exposed',
    'Often color-coded by function',
    'Creates column-free interior spaces',
    'Industrial/technological aesthetic',
    'Requires specialized weatherproofing',
    'Celebrates engineering and construction',
  ],

  famousExamples: [
    {
      name: 'Centre Pompidou',
      location: 'Paris, France',
      year: '1977',
      description: 'Rogers and Piano\'s inside-out cultural center with color-coded external structure'
    },
    {
      name: 'Lloyd\'s Building',
      location: 'London, UK',
      year: '1986',
      description: 'Richard Rogers\' headquarters with external concrete service towers and exposed steel'
    },
    {
      name: 'HSBC Headquarters',
      location: 'Hong Kong',
      year: '1985',
      description: 'Foster\'s suspended structure with massive external cross-bracing'
    },
    {
      name: 'Inmos Microprocessor Factory',
      location: 'Newport, Wales',
      year: '1982',
      description: 'Rogers\' elegant factory with exposed tubular steel structure'
    },
    {
      name: 'Sainsbury Centre',
      location: 'Norwich, UK',
      year: '1978',
      description: 'Foster\'s museum with external lattice truss forming structural skin'
    },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall',
      reason: 'Both are exterior building systems',
      distinction: 'Exposed structure shows the actual structural frame; curtain walls are non-structural glazed skins that hang from hidden structure',
    },
    {
      elementId: 'exoskeleton',
      reason: 'Both involve external structural elements',
      distinction: 'Exposed structure shows normal internal frame externalized; exoskeleton is structure designed from the start to be exterior-bearing',
    },
  ],

  searchTags: ['high-tech', 'steel', 'industrial', 'engineering', 'structural', 'modernist', 'truss', 'frame', 'rogers', 'foster'],

  arMetadata: {
    modelPath: '/models/architecture/exposed-structure.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Steel I-Beam', position: { x: 0, y: 2, z: 0 } },
      { label: 'Cross-Bracing', position: { x: 1, y: 1.5, z: 0 } },
      { label: 'Column Connection', position: { x: 0, y: 0, z: 0 } },
      { label: 'Weather Protection', position: { x: 0.5, y: 1, z: 0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
