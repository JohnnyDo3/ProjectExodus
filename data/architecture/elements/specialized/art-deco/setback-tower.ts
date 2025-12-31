import type { ArchitecturalElement } from '../../../types';

export const SETBACK_TOWER: ArchitecturalElement = {
  id: 'setback-tower',
  slug: 'setback-tower',
  name: 'Setback Tower',
  alternativeNames: ['Stepped Skyscraper', 'Ziggurat Tower', 'Wedding Cake Building', 'Setback Massing'],
  pronunciation: {
    phonetic: 'SET-bak TOW-er',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Tower that progressively recedes or steps back as it rises',
    rootWord: 'Set (to place) + back (away from forward position)',
  },
  category: 'STRUCTURAL',
  subcategory: 'building_form',
  periods: ['art-deco'],
  regions: ['NORTH_AMERICA', 'WESTERN_EUROPE', 'SOUTH_AMERICA', 'ASIA'],

  images: {
    primary: '/images/architecture/elements/setback-tower-primary.jpg',
    gallery: [
      '/images/architecture/elements/setback-empire-state.jpg',
      '/images/architecture/elements/setback-profile.jpg',
      '/images/architecture/elements/setback-aerial.jpg',
    ],
    diagram: '/images/architecture/diagrams/setback-tower-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A setback tower is a tall building that gets narrower as it goes up, like a giant staircase or wedding cake! Instead of going straight up, the building steps back at different levels. This creates terraces and makes the building look really cool. New York City made a rule in 1916 that tall buildings had to do this so sunlight could reach the streets below.',
    MIDDLE_SCHOOL: 'Setback towers are skyscrapers designed with a stepped profile, where upper floors progressively recede from the street. This creates a distinctive pyramidal or ziggurat-like silhouette. The design emerged from the 1916 New York City Zoning Resolution, which required tall buildings to step back at certain heights to preserve light and air at street level. Architects transformed this legal requirement into an iconic Art Deco aesthetic, creating dramatic stepped compositions that emphasized verticality while allowing light to penetrate the urban canyon.',
    HIGH_SCHOOL: 'The setback tower represents the architectural synthesis of regulatory necessity and aesthetic innovation. The 1916 zoning law established "envelope" rules requiring buildings to step back proportionally to street width, preventing dark, airless urban canyons. Architects embraced these constraints, developing the characteristic Art Deco stepped profile that became synonymous with 1920s-1930s American skyscrapers. The setback form offered practical advantages: lower floors maximized lot coverage while upper floors reduced rental space as demand decreased with height. Aesthetically, setbacks created dynamic silhouettes, emphasized soaring verticality, and provided opportunities for decorative crowns and terraces.',
    UNDERGRADUATE: 'Setback massing constitutes a defining characteristic of Art Deco skyscraper architecture, representing the productive tension between urban regulation and architectural expression. The 1916 New York Zoning Resolution codified setback requirements through mathematical formulas relating building height to street width, creating permissible "envelopes" within which architects worked. Designers developed sophisticated compositional strategies: emphasizing vertical piers that unified the stepping composition; using different materials or ornamental densities to distinguish base, shaft, and crown; and creating architectural drama through dramatic setbacks and decorative terminal features. The form\'s economic logic - maximizing lower-floor rentable area while reducing less-valuable upper floors - aligned with aesthetic aspirations for soaring, sculpted towers.',
    GRADUATE: 'Critical analysis of setback towers reveals complex interactions between regulation, economics, technology, and aesthetics. The 1916 zoning law responded to concerns about the 1915 Equitable Building\'s sheer mass blocking light, but its envelope formulas permitted diverse architectural solutions. Comparative study shows regional variations - New York\'s aggressive vertical emphasis versus Chicago\'s more restrained approach. Technical research examines structural challenges of discontinuous floor plates and cantilevered setback floors. Economic analysis investigates how setback profiles optimized rental returns given declining value at height. The setback\'s symbolic resonance - evoking ancient ziggurats, mountains, and crystalline forms - connected modern commerce to timeless architectural archetypes. Post-war rejection of setbacks in favor of tower-and-plaza urbanism demonstrates shifting planning ideologies.',
    PHD: 'Scholarly investigation of setback towers addresses fundamental questions in architectural, urban, and cultural history. Research areas include: detailed analysis of the 1916 Zoning Resolution\'s drafting and political context; comparative study of international zoning regimes and their architectural effects; examination of Hugh Ferriss\'s influential charcoal renderings that visualized zoning envelopes as romantic architecture; investigation of engineering innovations required for discontinuous structural systems; economic modeling of optimal setback configurations; analysis of how setback forms shaped urban experience and skyline aesthetics; study of the form\'s cultural meanings as symbol of American capitalism and modernity; and investigation of preservation challenges as setback towers face alteration pressures. Digital research methods enable comprehensive documentation and analysis of setback geometries across large building datasets.',
  },

  history: {
    ELEMENTARY: 'In 1915, a huge building in New York blocked out so much sunlight that people complained the streets were too dark. So in 1916, the city made a new rule: really tall buildings had to step back as they went up. Architects thought this was great! They designed beautiful stepped towers that looked like zigzags against the sky. The Empire State Building and Chrysler Building are famous examples of these "wedding cake" skyscrapers.',
    MIDDLE_SCHOOL: 'The setback tower emerged from the 1916 New York City Zoning Resolution, America\'s first comprehensive zoning law. This regulation was prompted by the 1915 Equitable Building, whose sheer 40-story mass cast streets into shadow. The law required buildings to step back at specified heights to preserve light and air. Architects working in the 1920s-1930s transformed this restriction into Art Deco\'s signature form. Competitions and theoretical studies by Hugh Ferriss popularized the aesthetic potential of setback massing. By the 1930s, setback towers dominated American skylines, from the Empire State Building to smaller city skyscrapers.',
    HIGH_SCHOOL: 'The setback tower\'s development reflects the intersection of urban reform, real estate economics, and architectural innovation. Progressive Era concerns about tenement overcrowding and public health informed the 1916 Zoning Resolution, which established height districts and setback requirements. Architect Harvey Wiley Corbett and renderer Hugh Ferriss explored the new regulations through theoretical studies, producing dramatic charcoal drawings of stepped "towers of light." The 1922 Chicago Tribune Tower competition showcased international approaches to tall building design, but American architects increasingly favored setback compositions. Peak construction occurred 1925-1931, producing icons like the Chrysler Building (1930) and Empire State Building (1931). The 1961 New York zoning revision allowed sheer towers with plazas, ending the setback era.',
    UNDERGRADUATE: 'The setback tower\'s historical trajectory illuminates the complex relationship between regulation, technology, and architectural culture. The 1916 law synthesized concerns about light, air, fire safety, and property values into mathematical formulas governing building envelopes. Early responses varied: some architects produced awkward, minimally compliant designs, while others explored the aesthetic potential. Hugh Ferriss\'s 1922 drawings for the New York Times, later collected in "The Metropolis of Tomorrow" (1929), crystallized the setback\'s romantic possibilities. Economic pressures during the late 1920s boom encouraged maximum envelope exploitation. European modernists like Le Corbusier criticized setback massing as irrational, advocating instead for freestanding towers in parks - a vision that influenced post-war zoning. The setback\'s decline paralleled broader rejection of Art Deco ornament and urban density.',
    GRADUATE: 'Academic research on setback towers engages multiple scholarly discourses. Urban planning historians examine the 1916 law\'s development, implementation, and unintended consequences, including how setback formulas shaped real estate speculation and architectural services. Architectural historians analyze stylistic evolution from early transitional buildings to mature Art Deco compositions, tracing influences from ancient ziggurats, Mayan temples, and modern crystallography. Technical investigations examine structural solutions for discontinuous floor plates, particularly steel frame innovations. Economic studies model setback decisions as optimization problems balancing construction costs and rental returns. Cultural analysis explores the setback\'s symbolic meanings - verticality as American ambition, stepping as democratic light access, ziggurat forms as timeless monumentality. Preservation research addresses retrofit and alteration challenges in setback towers.',
    PHD: 'Scholarship on setback towers contributes to debates about regulatory effects on architectural form, modernism\'s contested definitions, and urban spatial production. Research areas include: detailed analysis of zoning law drafting through archival sources revealing debates about urban form; systematic documentation of how different cities adapted setback regulations with varying architectural results; investigation of Hugh Ferriss\'s role in shaping setback aesthetics through his visual rhetoric; examination of European modernist critiques (CIAM, Le Corbusier) and their influence on post-war planning; study of setback towers\' role in defining "skyline" as aesthetic and symbolic construct; technical research on structural systems using period engineering documents and building archaeology; analysis of how setback forms structured urban experience and social meanings; and comparative study of setback preservation approaches internationally. Digital humanities methods enable computational analysis of setback geometries and their relationships to zoning envelopes.',
  },

  characteristics: [
    'Progressive stepping back of upper floors',
    'Pyramidal or ziggurat-like overall profile',
    'Base typically occupies full lot width',
    'Setbacks create terraces at various levels',
    'Vertical piers often unify the composition',
    'Dramatic sculptural crown at summit',
    'Emphasizes verticality and upward movement',
    'Allows light and air to reach street level',
  ],

  famousExamples: [
    { name: 'Empire State Building', location: 'New York, USA', year: '1930-1931', description: 'Iconic setback tower with multiple stepped tiers rising to slender crown' },
    { name: 'Chrysler Building', location: 'New York, USA', year: '1928-1930', description: 'Dramatic setback profile culminating in distinctive steel spire' },
    { name: '30 Rockefeller Plaza', location: 'New York, USA', year: '1930-1933', description: 'Vertical slab with modest setbacks and limestone facade' },
    { name: 'American Radiator Building', location: 'New York, USA', year: '1924', description: 'Early setback tower with black brick and gold terra cotta crown' },
    { name: 'Tribune Tower', location: 'Chicago, USA', year: '1922-1925', description: 'Gothic-inspired setback tower from famous 1922 competition' },
  ],

  confusionPairs: [
    {
      elementId: 'ziggurat',
      reason: 'Both feature stepped, pyramidal forms',
      distinction: 'Ziggurats are ancient Mesopotamian stepped pyramids; setback towers are modern skyscrapers with regulatory-driven stepping',
    },
    {
      elementId: 'stepped-pyramid',
      reason: 'Both use progressive stepping',
      distinction: 'Stepped pyramids are solid ancient monuments; setback towers are hollow modern buildings with functional floors',
    },
  ],

  searchTags: ['art-deco', 'skyscraper', 'tower', 'setback', 'stepped', 'ziggurat', 'zoning', 'new-york', 'wedding-cake', '1920s', '1930s', 'massing'],

  arMetadata: {
    modelPath: '/models/architecture/setback-tower.glb',
    scale: 0.01,
    rotatable: true,
    annotations: [
      { label: 'Base (Full Lot)', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'First Setback', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Upper Setback', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Tower Crown', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Terrace', position: { x: 0.05, y: 0.3, z: 0.05 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
