import type { ArchitecturalElement } from '../../../types';

export const GLASS_ELEVATOR: ArchitecturalElement = {
  id: 'glass-elevator',
  slug: 'glass-elevator',
  name: 'Glass Elevator',
  alternativeNames: ['External Elevator', 'Scenic Elevator', 'Transparent Lift', 'Express Glass Lift'],
  pronunciation: {
    phonetic: 'GLAS EL-uh-vay-tor',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Transparent vertical transportation system',
    rootWord: 'From "glass" (Germanic) and "elevator" from Latin "elevare" (to lift)',
  },
  category: 'FACADE',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/glass-elevator-primary.jpg',
    gallery: [
      '/images/architecture/elements/glass-elevator-lloyds.jpg',
      '/images/architecture/elements/glass-elevator-pompidou.jpg',
      '/images/architecture/elements/glass-elevator-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/glass-elevator-system.svg',
  },

  description: {
    ELEMENTARY: 'Glass elevators are see-through elevators on the outside of buildings! Instead of being hidden in dark shafts inside, these elevators let you see out as you ride up and down. People outside can also see the elevator moving, showing off how the building works. They make riding up a tall building an exciting experience instead of boring!',
    MIDDLE_SCHOOL: 'External glass elevators are transparent lift systems placed on building exteriors rather than concealed in internal shafts. The elevator car, shaft, and mechanism are visible through glass enclosures, making vertical circulation a dramatic architectural feature. This High-Tech strategy saves interior space, provides riders with views, and expresses the building\'s mechanical systems as part of its aesthetic.',
    HIGH_SCHOOL: 'Glass elevator systems externalize vertical circulation, serving both functional and symbolic purposes. Structurally, they require external support frames and weather-protected mechanisms. The transparent cab and shaft assembly becomes an architectural element, often color-coded (red at Centre Pompidou) or expressed through structural detailing (Lloyd\'s polished steel pods). Engineering challenges include wind loads, thermal expansion, weatherproofing of mechanisms, and maintaining ride comfort in external conditions.',
    UNDERGRADUATE: 'External glass elevators embody High-Tech principles: technological display, functional honesty, and spatial efficiency. Design considerations include structural support (freestanding towers vs. building-attached), machine room location, emergency egress, and environmental protection. The glazing system must address solar heat gain, glare, and visual privacy for riders while maintaining transparency. Contemporary applications integrate energy-efficient drives, regenerative braking, and smart control systems. The element type appears in hotels, commercial buildings, and museums worldwide.',
    GRADUATE: 'Glass elevator design engages mechanical engineering, structural dynamics, and architectural expression. Technical challenges include vibration control (wind-induced motion), thermal management (greenhouse effect in glass shaft), and corrosion protection in exposed conditions. Research areas include ride quality in high-rise external elevators, emergency evacuation strategies, and accessibility compliance. Cultural analysis examines how external elevators transform vertical circulation from utilitarian function to theatrical experience-riders become performers in the building\'s mechanical ballet.',
    PHD: 'Scholarly research on glass elevators explores the intersection of technology, spectacle, and spatial experience. Historical work traces development from early hotel atrium elevators through High-Tech externalization to contemporary supertall applications. Critical analysis questions the claimed space-saving benefits-external elevators require substantial support structure and weather protection. Phenomenological studies examine how transparent vertical movement alters spatial perception and building legibility. Contemporary research addresses accessibility, security, and energy performance of exposed elevator systems.',
  },

  history: {
    ELEMENTARY: 'The first elevators were hidden inside buildings in dark, boring boxes. About 50 years ago, architects started putting them on the outside in glass tubes. The Centre Pompidou (1977) has famous red glass elevators climbing up the outside! Now glass elevators are popular in hotels, museums, and malls because they\'re fun to ride and beautiful to watch.',
    MIDDLE_SCHOOL: 'While panoramic elevators existed earlier in hotels and department stores, High-Tech architecture made external glass elevators a signature element. Centre Pompidou (1977) featured diagonal external escalators and service elevators in transparent tubes. Lloyd\'s Building (1986) showcased polished stainless steel elevator pods in external glass towers. The element spread to commercial and hospitality architecture globally, valued for spatial drama and interior space savings.',
    HIGH_SCHOOL: 'Glass elevator development parallels elevator technology evolution and architectural transparency trends. Early examples include hotel atrium elevators (John Portman\'s Hyatt Regency, 1967). High-Tech architects externalized the concept-Centre Pompidou\'s glass-enclosed escalators and Lloyd\'s dramatic stainless pods became iconic. Technical advances (traction systems, computer controls, safety mechanisms) enabled reliable external operation. Contemporary applications include observation towers, museums, and luxury hotels where the elevator ride becomes an attraction.',
    UNDERGRADUATE: 'External glass elevators evolved from multiple precedents: panoramic hotel elevators (spatial drama), industrial material hoists (functional transparency), and High-Tech service expression (technological display). Key innovations include environmental control systems for glass-enclosed shafts, structural integration with building facades, and machine-room-less (MRL) technology enabling compact installations. The 1980s-90s saw proliferation in commercial architecture. Contemporary development focuses on energy efficiency-many external elevators suffer thermal penalties requiring climate control-and integration with smart building systems.',
    GRADUATE: 'Historical analysis reveals glass elevators\' role in transforming vertical circulation from hidden necessity to architectural spectacle. The element reflects broader cultural shifts-technological optimism, experiential design, and the building as theatre. Performance research documents thermal challenges (solar gain in glass shafts), maintenance complexities (weather exposure of mechanisms), and ride quality issues (wind-induced vibration). Contemporary scholarship examines the accessibility implications-while visually dramatic, external glass elevators can create anxiety for riders with acrophobia or claustrophobia.',
    PHD: 'Glass elevator scholarship engages architectural phenomenology, technology studies, and disability studies. Theoretical work examines how transparent vertical movement transforms spatial experience-riders simultaneously inside (elevator) and outside (building), creating complex spatial consciousness. Historical research documents the element\'s diffusion from High-Tech signature to mainstream commercial architecture. Critical analysis questions the environmental cost-many external glass elevators require significant energy for thermal control-versus claimed spatial benefits. Accessibility research reveals tensions between architectural spectacle and inclusive design.',
  },

  characteristics: [
    'Transparent elevator car and shaft',
    'Located on building exterior',
    'Visible mechanical systems',
    'Dramatic views during vertical travel',
    'Structural support framework visible',
    'Weather-protected mechanisms',
    'Often color-coded or architecturally detailed',
  ],

  famousExamples: [
    {
      name: 'Lloyd\'s Building',
      location: 'London, UK',
      year: '1986',
      description: 'Richard Rogers\' external glass elevator towers with polished stainless steel pods'
    },
    {
      name: 'Centre Pompidou',
      location: 'Paris, France',
      year: '1977',
      description: 'Rogers/Piano\'s external glass-enclosed escalators and elevators in red tubes'
    },
    {
      name: 'Lloyd\'s Register',
      location: 'London, UK',
      year: '2000',
      description: 'Rogers\' headquarters with external glass elevator towers flanking atrium'
    },
    {
      name: 'Leadenhall Building',
      location: 'London, UK',
      year: '2014',
      description: 'Rogers Stirk Harbour\'s tower with external glass elevators in structural brace zone'
    },
    {
      name: 'Channel 4 Headquarters',
      location: 'London, UK',
      year: '1994',
      description: 'Richard Rogers\' building with transparent glass elevator towers'
    },
  ],

  confusionPairs: [
    {
      elementId: 'escalator',
      reason: 'Both are visible vertical circulation elements',
      distinction: 'Glass elevators move in enclosed cars within shafts; escalators are moving stairs continuously visible and accessible',
    },
    {
      elementId: 'atrium-elevator',
      reason: 'Both are transparent elevator systems',
      distinction: 'Glass elevators are on building exterior exposed to weather; atrium elevators are within interior atriums in controlled climate',
    },
  ],

  searchTags: ['high-tech', 'elevator', 'glass', 'transparent', 'vertical', 'circulation', 'external', 'lift', 'rogers', 'lloyds'],

  arMetadata: {
    modelPath: '/models/architecture/glass-elevator.glb',
    scale: 0.25,
    rotatable: true,
    annotations: [
      { label: 'Glass Elevator Car', position: { x: 0, y: 1.5, z: 0 } },
      { label: 'Structural Support Tower', position: { x: -0.3, y: 2, z: 0 } },
      { label: 'Guide Rails', position: { x: 0.2, y: 1, z: 0 } },
      { label: 'Machine Room/Equipment', position: { x: 0, y: 3, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
