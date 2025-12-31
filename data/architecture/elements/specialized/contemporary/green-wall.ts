import type { ArchitecturalElement } from '../../../types';

export const GREEN_WALL: ArchitecturalElement = {
  id: 'green-wall',
  slug: 'green-wall',
  name: 'Green Wall',
  alternativeNames: ['Living Wall', 'Vertical Garden', 'Plant Wall', 'Vegetated Facade', 'Bio Wall'],
  pronunciation: {
    phonetic: 'GREEN WAWL',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Wall covered with living plants',
    rootWord: 'From Old English "grene" (green, growing) + "wall"',
  },
  category: 'FACADE',
  subcategory: 'living_systems',
  periods: ['SUSTAINABLE', 'CONTEMPORARY', 'GREEN_ARCHITECTURE'],
  regions: ['GLOBAL', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/green-wall-primary.jpg',
    gallery: [
      '/images/architecture/elements/green-wall-detail.jpg',
      '/images/architecture/elements/green-wall-system.jpg',
      '/images/architecture/elements/green-wall-interior.jpg',
    ],
    diagram: '/images/architecture/diagrams/green-wall-layers.svg',
  },

  description: {
    ELEMENTARY: 'A green wall is a wall covered with real growing plants! Instead of paint or brick, the building has a living garden growing on its side. Plants are held in special pockets or trays attached to the wall. Pipes water them automatically, and the roots grow in special soil or foam. Green walls help clean the air, keep buildings cooler, and make cities more beautiful!',
    MIDDLE_SCHOOL: 'Green walls are vertical gardens integrated into building facades or interiors. Plants grow in modular panels, felt pockets, or planter boxes attached to structural frames on walls. Automated irrigation systems deliver water and nutrients. Green walls provide environmental benefits: temperature reduction (through evapotranspiration), air quality improvement (plants filter pollutants), acoustic insulation, and biodiversity habitat. Types include hydroponic systems (soil-less) and soil-based systems. Challenges include irrigation management, plant selection for local climate, and maintenance access.',
    HIGH_SCHOOL: 'Green wall systems consist of multiple components: structural support frame, waterproofing layer, growing medium (soil, felt, foam, or hydroponic), plants, irrigation/fertigation systems, and drainage. System types include: modular panels (pre-planted trays), felt pockets (plants inserted into textile pockets), and planter boxes (horizontal planters stacked vertically). Performance considerations include plant species selection for orientation and climate, irrigation efficiency, maintenance accessibility, and building envelope integration (managing moisture and structural loads). Benefits include thermal performance improvement, stormwater management, urban heat island mitigation, and biophilic design for occupant wellbeing.',
    UNDERGRADUATE: 'Green wall design integrates horticulture, building physics, and structural engineering. System selection depends on climate, orientation, plant types, and maintenance capacity. Hydroponic systems use felt media irrigated with nutrient solution, reducing weight but requiring sophisticated fertigation. Soil-based systems support broader plant palettes but increase structural loading (80-120 kg/m² saturated). Building integration addresses waterproofing continuity, structural capacity for dead and live loads, irrigation water supply and drainage, and maintenance access (scaffolding, permanent platforms, or window-washing systems). Research examines thermal performance quantification, air quality improvement measurement, and lifecycle cost analysis comparing installation, irrigation, and maintenance expenses against energy savings and property value impacts.',
    GRADUATE: 'Advanced green wall research encompasses plant physiology, microclimate analysis, and long-term ecosystem dynamics. Studies employ computational fluid dynamics to model evapotranspiration cooling effects, thermal imaging to measure facade temperature reduction, and air quality monitoring to quantify pollutant removal rates. Ecological research examines plant community succession, pest and disease management in vertical environments, and habitat value for urban wildlife. Engineering investigation addresses root barrier effectiveness, moisture migration into building assemblies, and structural deterioration risks. Economic analysis examines total cost of ownership including installation, irrigation, fertilization, plant replacement, and maintenance labor versus quantified benefits in energy savings, stormwater fees, and occupant productivity.',
    PHD: 'Scholarly investigation of green walls engages environmental science, building technology, and urban ecology. Research methodologies include long-term performance monitoring comparing multiple system types across climate zones, plant community analysis examining species survival and succession patterns, and post-occupancy studies assessing maintenance requirements and system longevity. Theoretical work addresses green walls within broader sustainable urbanism discourse, questioning whether technological green infrastructure represents genuine ecological thinking or "greenwashing" aesthetics. Critical analysis examines the gap between promotional claims and measured performance, particularly regarding air quality improvement (limited impact relative to building scale) and energy savings (often modest versus cost). Historical scholarship traces living walls from ancient precedents through Patrick Blanc\'s contemporary innovations to commercial proliferation.',
  },

  history: {
    ELEMENTARY: 'People have grown climbing plants on buildings for thousands of years, but modern green walls are different-they use special systems to grow plants without soil or on walls that wouldn\'t normally support plants. French botanist Patrick Blanc invented the modern green wall in the 1980s. His walls are like vertical gardens with thousands of plants. Now green walls appear on buildings worldwide!',
    MIDDLE_SCHOOL: 'Traditional ivy-covered walls existed for centuries, but contemporary green wall systems emerged in the 1980s. French botanist Patrick Blanc developed hydroponic vertical garden systems, creating prominent installations starting in the 1990s. The Musée du Quai Branly in Paris (2006) featured Blanc\'s 800m² living wall, bringing global attention. Technologies expanded with competing systems from companies worldwide. The movement gained momentum with sustainable building certifications (LEED, BREEAM) awarding credits for vegetated surfaces and growing awareness of urban heat islands and air quality.',
    HIGH_SCHOOL: 'Green wall precedents include ancient Hanging Gardens of Babylon (legendary) and centuries of ivy-covered buildings. Modern systems trace to Patrick Blanc\'s 1980s-90s innovations using felt-based hydroponic growing media, eliminating soil and reducing weight. Early prominent projects: Pershing Hall Hotel Paris (2001), Caixa Forum Madrid (2008, 460m²), and One Central Park Sydney (2014, world\'s tallest vertical garden at 50 stories). Parallel development of modular systems by companies like LiveWall, Sempergreen, and Biotecture created competing technologies. Research institutions including University of Toronto and TU Delft studied thermal and air quality benefits.',
    UNDERGRADUATE: 'Historical development of contemporary green walls traces from Blanc\'s biomimetic inspiration (observing plants on cliff faces) through prototype installations to commercial system development. Enabling technologies include lightweight growing media, efficient drip irrigation, automated fertigation systems, and improved waterproofing membranes. The sustainability movement of the 2000s created market demand; green building certification systems provided financial incentives. Regional variations emerged-extensive use in European sustainable architecture, signature installations in Singapore\'s "City in a Garden" vision, and integration with Latin American architectural traditions (vertical vegetation in tropical climates). Post-occupancy research revealed implementation challenges: irrigation system failures, plant species inappropriate for conditions, and higher-than-anticipated maintenance costs.',
    GRADUATE: 'Green wall historiography examines the convergence of environmental science, building technology, and sustainable architecture discourse. Patrick Blanc\'s work exemplifies practitioner-driven innovation outside traditional academic or industry research. The technology\'s rapid proliferation relates to sustainability branding, biophilic design trends, and green building certification markets. Scholarly analysis questions the proportionality of environmental benefits to installation and operational costs-are green walls ecologically effective or primarily aesthetic signifiers of environmental commitment? Research compares green wall performance against simpler alternatives (green roofs, street-level plantings, building-adjacent parks) examining cost-effectiveness of environmental outcomes. Critical work addresses maintenance realities-many installations experience plant mortality and require extensive replanting, questioning long-term sustainability.',
    PHD: 'Contemporary scholarship on green walls engages urban ecology, environmental engineering, and critical sustainability studies. Research examines the political ecology of green infrastructure-who benefits from green wall installations, and do they address or obscure systemic environmental inequities? Lifecycle assessment studies compare embodied impacts (manufacturing, transportation, installation) against operational benefits and end-of-life disposal. Theoretical work questions whether green walls represent authentic ecological urbanism or technological solutions avoiding deeper questions about urban form, density, and land use. Ethnographic research examines maintenance worker experiences and building occupant perceptions, revealing gaps between designer intentions and user realities. Historical investigation analyzes how green wall imagery circulates through architectural media, creating aesthetic trends potentially disconnected from performance outcomes.',
  },

  characteristics: [
    'Living plants on vertical surfaces',
    'Modular panels, felt pockets, or planter boxes',
    'Integrated irrigation and drainage systems',
    'Requires ongoing maintenance and plant care',
    'Provides cooling through evapotranspiration',
    'Improves air quality (filters pollutants)',
    'Weight: 30-120 kg/m² depending on system',
    'Interior or exterior applications',
  ],

  famousExamples: [
    { name: 'CaixaForum Madrid', location: 'Madrid, Spain', year: '2008', description: 'Herzog & de Meuron building with 460m² Patrick Blanc living wall' },
    { name: 'One Central Park', location: 'Sydney, Australia', year: '2014', description: 'Jean Nouvel tower with vertical gardens by Patrick Blanc, world\'s tallest' },
    { name: 'Musée du Quai Branly', location: 'Paris, France', year: '2006', description: 'Jean Nouvel museum with 800m² green wall by Patrick Blanc' },
    { name: 'Bosco Verticale', location: 'Milan, Italy', year: '2014', description: 'Stefano Boeri\'s residential towers with 900 trees and 20,000 plants' },
    { name: 'ParkRoyal on Pickering', location: 'Singapore', year: '2013', description: 'WOHA Architects\' hotel with 15,000m² sky gardens and green walls' },
  ],

  confusionPairs: [
    {
      elementId: 'green-roof',
      reason: 'Both are vegetated building surfaces',
      distinction: 'Green roofs cover horizontal roof surfaces; green walls cover vertical wall surfaces',
    },
    {
      elementId: 'climbing-plants',
      reason: 'Both involve plants on buildings',
      distinction: 'Climbing plants (ivy, etc.) grow from ground up; green walls use modular systems with plants at all levels and built-in irrigation',
    },
  ],

  searchTags: ['sustainable', 'plants', 'living', 'vertical', 'garden', 'facade', 'green', 'biophilic', 'ecology', 'nature'],

  arMetadata: {
    modelPath: '/models/architecture/green-wall.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Plant Layer', position: { x: 0, y: 0.5, z: 0.3 } },
      { label: 'Growing Medium', position: { x: 0, y: 0.5, z: 0.2 } },
      { label: 'Irrigation System', position: { x: 0.3, y: 0.7, z: 0.1 } },
      { label: 'Structural Support', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Waterproof Membrane', position: { x: 0, y: 0.5, z: -0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
