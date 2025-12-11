// Water Systems Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Greywater Systems
export const greywaterSystems: Module = {
  id: 'water-greywater', slug: 'greywater-systems', title: 'Greywater Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to reuse water from sinks and showers!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how greywater recycling works in homes.', [LearningLevel.HIGH_SCHOOL]: 'Explore greywater treatment, regulations, and landscape irrigation.', [LearningLevel.UNDERGRADUATE]: 'Analyze greywater system design, treatment options, and health considerations.', [LearningLevel.GRADUATE]: 'Examine greywater policy, public acceptance, and integrated reuse strategies.', [LearningLevel.PHD]: 'Research advanced greywater treatment, pathogen risk assessment, and water quality modeling.' },
  topic: 'water-systems',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'grey-1', title: 'Reusing Water', content: { [LearningLevel.ELEMENTARY]: '<h2>Water Second Chances!</h2><p>Water from your shower can water your garden instead of going down the drain!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>What is Greywater?</h2><p>Greywater = used water from sinks, showers, and laundry. Not from toilets (that\'s blackwater).</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Greywater Systems</h2><p>Simple: laundry to landscape. Complex: treatment and storage. Must use plant-safe soaps.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>System Design</h2><p>Surge tanks, filtration, disinfection options. Sizing based on generation and irrigation demand.</p>', [LearningLevel.GRADUATE]: '<h2>Policy Landscape</h2><p>Regulations vary widely. Public health concerns vs. water conservation benefits.</p>', [LearningLevel.PHD]: '<h2>Risk Assessment</h2><p>QMRA for pathogen exposure. Treatment efficacy and monitoring requirements.</p>' } }],
  activities: [{ id: 'grey-act-1', title: 'Design Greywater System', type: 'SIMULATION', description: 'Plan household greywater reuse', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'grey-game', title: 'Water Recycler', type: 'simulation', description: 'Manage greywater reuse', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'grey-q1', question: 'What is NOT greywater?', options: ['Shower water', 'Toilet water', 'Laundry water', 'Sink water'], correctAnswer: 1, explanation: 'Toilet water is called blackwater, not greywater.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: Drip Irrigation
export const dripIrrigation: Module = {
  id: 'water-drip', slug: 'drip-irrigation', title: 'Drip Irrigation',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about watering plants one drop at a time!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover efficient irrigation that saves water for farms and gardens.', [LearningLevel.HIGH_SCHOOL]: 'Explore drip system design, components, and water savings.', [LearningLevel.UNDERGRADUATE]: 'Analyze emitter hydraulics, scheduling, and system optimization.', [LearningLevel.GRADUATE]: 'Examine precision irrigation, sensor integration, and deficit irrigation strategies.', [LearningLevel.PHD]: 'Research variable rate irrigation, crop modeling, and climate-adaptive systems.' },
  topic: 'water-systems',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'drip-1', title: 'Efficient Watering', content: { [LearningLevel.ELEMENTARY]: '<h2>Drip Drip!</h2><p>Tiny tubes deliver water right to plant roots - no waste, happy plants!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>How Drip Works</h2><p>Water flows through tubes with small emitters at each plant. Uses 30-50% less water than sprinklers.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>System Components</h2><p>Mainline, sub-mains, laterals, emitters. Pressure regulation, filtration, backflow prevention.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Hydraulic Design</h2><p>Emitter uniformity, pressure compensation, lateral sizing for uniform distribution.</p>', [LearningLevel.GRADUATE]: '<h2>Precision Irrigation</h2><p>Soil moisture sensors, ET-based scheduling, variable rate application.</p>', [LearningLevel.PHD]: '<h2>Optimization Research</h2><p>Deficit irrigation strategies, real-time optimization, digital twin approaches.</p>' } }],
  activities: [{ id: 'drip-act-1', title: 'Design Drip System', type: 'SIMULATION', description: 'Layout a drip irrigation system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'drip-game', title: 'Irrigation Pro', type: 'puzzle', description: 'Design efficient irrigation', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'drip-q1', question: 'How much water can drip irrigation save vs sprinklers?', options: ['No savings', '10-20%', '30-50%', '90-100%'], correctAnswer: 2, explanation: 'Drip irrigation typically uses 30-50% less water than sprinklers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 6: Well Water Systems
export const wellWaterSystems: Module = {
  id: 'water-wells', slug: 'well-water-systems', title: 'Well Water Systems',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how water comes up from underground!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how wells tap into groundwater for homes and farms.', [LearningLevel.HIGH_SCHOOL]: 'Explore well construction, pump systems, and water testing.', [LearningLevel.UNDERGRADUATE]: 'Analyze well hydraulics, aquifer testing, and sustainable yield.', [LearningLevel.GRADUATE]: 'Examine groundwater management, contaminant transport, and recharge.', [LearningLevel.PHD]: 'Research aquifer storage recovery, managed recharge, and groundwater modeling.' },
  topic: 'water-systems',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'well-1', title: 'Underground Water', content: { [LearningLevel.ELEMENTARY]: '<h2>Hidden Water!</h2><p>Water hides underground in rocks and sand. Wells are like straws to drink it up!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Groundwater Basics</h2><p>Rain soaks in and fills spaces in soil and rock (aquifers). Wells pump it to the surface.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Well Construction</h2><p>Drilled wells: 100-400ft deep. Casing, screen, seal, pump. Annual testing recommended.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Aquifer Hydraulics</h2><p>Transmissivity, storativity, drawdown. Pump tests to characterize aquifer properties.</p>', [LearningLevel.GRADUATE]: '<h2>Groundwater Management</h2><p>Safe yield, overdraft, land subsidence. Conjunctive use strategies.</p>', [LearningLevel.PHD]: '<h2>Advanced Management</h2><p>ASR, MAR, groundwater banking. Numerical modeling for basin management.</p>' } }],
  activities: [{ id: 'well-act-1', title: 'Find Groundwater', type: 'SIMULATION', description: 'Locate and design a well', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'well-game', title: 'Well Driller', type: 'simulation', description: 'Drill and manage a water well', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'well-q1', question: 'Where is groundwater stored?', options: ['In underground rivers', 'In spaces in rock and soil', 'In caves only', 'In underground tanks'], correctAnswer: 1, explanation: 'Groundwater fills pore spaces in soil and rock formations called aquifers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 7: Water Filtration
export const waterFiltration: Module = {
  id: 'water-filtration', slug: 'water-filtration', title: 'Water Filtration',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how dirty water becomes clean!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover different ways to filter and clean water.', [LearningLevel.HIGH_SCHOOL]: 'Explore filtration technologies from sand filters to membranes.', [LearningLevel.UNDERGRADUATE]: 'Analyze filtration mechanisms, media selection, and system design.', [LearningLevel.GRADUATE]: 'Examine advanced membrane processes, fouling, and hybrid systems.', [LearningLevel.PHD]: 'Research novel membrane materials, forward osmosis, and selective separations.' },
  topic: 'water-systems',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'filter-1', title: 'Cleaning Water', content: { [LearningLevel.ELEMENTARY]: '<h2>Water Cleaning!</h2><p>Filters catch dirt and germs so water is safe to drink!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Filtration Basics</h2><p>Sand, activated carbon, ceramic filters. Each removes different contaminants.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Filtration Technologies</h2><p>Particle size: sediment > microfiltration > ultrafiltration > nanofiltration > reverse osmosis.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>System Design</h2><p>Media selection, flow rates, backwash, pretreatment requirements.</p>', [LearningLevel.GRADUATE]: '<h2>Membrane Processes</h2><p>MF/UF for particles/pathogens. NF/RO for dissolved contaminants. Fouling management.</p>', [LearningLevel.PHD]: '<h2>Research Frontiers</h2><p>Graphene membranes, biomimetic membranes, selective contaminant removal.</p>' } }],
  activities: [{ id: 'filter-act-1', title: 'Build a Filter', type: 'STEP_GUIDED', description: 'Create a water filter', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'filter-game', title: 'Filter Designer', type: 'puzzle', description: 'Design the right filter system', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'filter-q1', question: 'Which filter removes the smallest particles?', options: ['Sand filter', 'Coffee filter', 'Reverse osmosis', 'Screen'], correctAnswer: 2, explanation: 'Reverse osmosis can remove dissolved molecules, the smallest contaminants.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 8: Stormwater Management
export const stormwaterManagement: Module = {
  id: 'water-stormwater', slug: 'stormwater-management', title: 'Stormwater Management',
  description: { [LearningLevel.ELEMENTARY]: 'Learn what happens to rain in cities!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover how cities manage rainwater runoff.', [LearningLevel.HIGH_SCHOOL]: 'Explore green infrastructure and stormwater best management practices.', [LearningLevel.UNDERGRADUATE]: 'Analyze stormwater hydrology, LID design, and regulatory requirements.', [LearningLevel.GRADUATE]: 'Examine integrated urban water management and green-grey infrastructure.', [LearningLevel.PHD]: 'Research stormwater pollutant removal, climate adaptation, and blue-green networks.' },
  topic: 'water-systems',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'storm-1', title: 'Rain in Cities', content: { [LearningLevel.ELEMENTARY]: '<h2>Where Does Rain Go?</h2><p>In cities, rain can\'t soak in through concrete, so we need special ways to handle it!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Urban Runoff</h2><p>Impervious surfaces (roads, roofs) create runoff. Storm drains carry it to streams.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, permeable pavement, green roofs slow and filter runoff.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>LID Design</h2><p>Low Impact Development mimics natural hydrology. Sizing, soil media, underdrain design.</p>', [LearningLevel.GRADUATE]: '<h2>Integrated Management</h2><p>Combined sewer overflow, MS4 permits, green-grey optimization, co-benefits.</p>', [LearningLevel.PHD]: '<h2>Research Areas</h2><p>Pollutant removal performance, climate resilience, nature-based solutions scaling.</p>' } }],
  activities: [{ id: 'storm-act-1', title: 'Design Rain Garden', type: 'SIMULATION', description: 'Plan green infrastructure', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'storm-game', title: 'Storm Manager', type: 'simulation', description: 'Manage urban stormwater', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'storm-q1', question: 'What is a rain garden?', options: ['A garden that only needs rain', 'A planted area to capture runoff', 'A garden with a fountain', 'An indoor garden'], correctAnswer: 1, explanation: 'Rain gardens are planted depressions that capture and filter stormwater runoff.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const waterSystemsModules: Module[] = [
  greywaterSystems,
  dripIrrigation,
  wellWaterSystems,
  waterFiltration,
  stormwaterManagement,
  // Module 1: Water Conservation Fundamentals
  {
    id: 'water-conservation-basics',
    slug: 'water-conservation',
    title: 'Water Conservation Fundamentals',
    description: {
      ELEMENTARY: 'Learn why water is precious and how to save it every day! Every drop counts.',
      MIDDLE_SCHOOL: 'Discover the water cycle, why conservation matters, and practical ways to reduce water use.',
      HIGH_SCHOOL: 'Understand water scarcity, watershed management, and conservation technologies for homes and communities.',
      UNDERGRADUATE: 'Analyze water resource management, demand-side strategies, and policy frameworks for sustainable water use.',
      GRADUATE: 'Evaluate integrated water resource management, climate impacts on water systems, and adaptive strategies.',
      PHD: 'Research water-energy-food nexus interactions, transboundary water governance, and emerging treatment technologies.'
    },
    topic: 'water-systems',
    category: 'CONSERVATION',
    icon: 'Droplet',
    color: 'ocean',
    duration: {
      ELEMENTARY: 30,
      MIDDLE_SCHOOL: 40,
      HIGH_SCHOOL: 55,
      UNDERGRADUATE: 70,
      GRADUATE: 90,
      PHD: 120
    },
    isMasterclass: false,
    lessons: [
      {
        id: 'water-lesson-1',
        title: 'Why Water Matters',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 Water is Life!</h2><div class="intro-box"><p>Water is everywhere - in rivers, oceans, clouds, and even inside YOU! Your body is about 60% water.</p></div><div class="fun-fact"><span class="icon">🌍</span><p><strong>Amazing Fact:</strong> Earth has the same amount of water it had millions of years ago. The water you drink might have been drunk by a dinosaur!</p></div><h3>We Need Water For:</h3><div class="uses-grid"><div class="use"><span>🚰</span><p>Drinking</p></div><div class="use"><span>🛁</span><p>Bathing</p></div><div class="use"><span>🌱</span><p>Growing Food</p></div><div class="use"><span>🏭</span><p>Making Things</p></div></div><div class="problem-alert"><h4>⚠️ The Problem</h4><p>Even though Earth has lots of water, only a tiny bit (less than 1%) is fresh water we can use!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Our Water Resources</h2><h3>The Water Distribution</h3><ul><li>97.5% of Earth's water is saltwater (oceans)</li><li>2.5% is freshwater</li><li>Of freshwater: 69% is ice, 30% is groundwater</li><li>Only 1% of freshwater is easily accessible</li></ul><h3>The Water Cycle</h3><p>Water continuously cycles through evaporation, condensation, precipitation, and collection. This natural process purifies and redistributes water globally.</p><h3>Why Conservation Matters</h3><ul><li>Growing population increases demand</li><li>Climate change affects availability</li><li>Pollution reduces usable supplies</li><li>Ecosystems depend on water too</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Water Scarcity and Security</h2><h3>Global Water Stress</h3><p>Water stress occurs when demand exceeds available supply or poor quality restricts use. Currently, 2 billion people live in water-stressed countries.</p><div class="data-box"><h4>Water Stress Indicators</h4><ul><li><strong>Water scarcity:</strong> < 1,000 m³/person/year</li><li><strong>Water stress:</strong> < 1,700 m³/person/year</li><li><strong>Water vulnerability:</strong> < 2,500 m³/person/year</li></ul></div><h3>Drivers of Water Scarcity</h3><ol><li><strong>Physical scarcity:</strong> Insufficient natural resources</li><li><strong>Economic scarcity:</strong> Lack of infrastructure</li><li><strong>Climate change:</strong> Altered precipitation patterns</li><li><strong>Pollution:</strong> Contaminated sources</li></ol></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Water Resource Management Frameworks</h2><h3>Integrated Water Resource Management (IWRM)</h3><p>IWRM promotes coordinated development and management of water, land, and related resources to maximize economic and social welfare without compromising ecosystem sustainability.</p><h3>Key Principles</h3><ul><li>Water as an economic good and social good</li><li>Participatory approach involving all stakeholders</li><li>Central role of women in water provision</li><li>Management at lowest appropriate level</li></ul><h3>Water Footprint Concept</h3><p>Total freshwater volume used to produce goods and services:</p><ul><li><strong>Blue water:</strong> Surface and groundwater consumption</li><li><strong>Green water:</strong> Rainwater in soil moisture</li><li><strong>Grey water:</strong> Freshwater required to assimilate pollutants</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Climate Change and Water Systems</h2><h3>Projected Impacts</h3><ul><li>Intensification of hydrological cycle</li><li>Changes in precipitation timing and form</li><li>Glacier and snowpack decline</li><li>Sea level rise affecting coastal aquifers</li><li>Increased drought and flood frequency</li></ul><h3>Adaptation Strategies</h3><ul><li>Supply augmentation (storage, transfers, desalination)</li><li>Demand management (pricing, efficiency, allocation)</li><li>System flexibility and redundancy</li><li>Nature-based solutions</li></ul><h3>Water-Climate Policy Integration</h3><p>NDCs increasingly incorporate water sector adaptation and mitigation measures.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Water-Energy-Food Nexus</h2><h3>Systems Interactions</h3><p>Critical interdependencies create complex tradeoffs:</p><ul><li>Energy for water (pumping, treatment, desalination)</li><li>Water for energy (cooling, hydropower, biofuels)</li><li>Water for food (irrigation = 70% of withdrawals)</li><li>Energy for food (fertilizers, processing, transport)</li></ul><h3>Nexus Modeling Approaches</h3><ul><li>Integrated assessment models</li><li>Agent-based modeling</li><li>System dynamics</li><li>Multi-criteria optimization</li></ul><h3>Research Frontiers</h3><ul><li>Circular economy applications</li><li>Digital water (IoT, AI for management)</li><li>Atmospheric water harvesting</li><li>Direct potable reuse advancement</li></ul></div>`
        }
      },
      {
        id: 'water-lesson-2',
        title: 'Water-Saving Strategies',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🦸 Be a Water Hero!</h2><h3>Easy Ways to Save Water</h3><div class="tips-grid"><div class="tip"><span>🚿</span><h4>Shorter Showers</h4><p>Try a 5-minute shower song!</p></div><div class="tip"><span>🦷</span><h4>Turn Off the Tap</h4><p>While brushing teeth</p></div><div class="tip"><span>🚽</span><h4>Full Loads Only</h4><p>Wait for full laundry loads</p></div><div class="tip"><span>💧</span><h4>Fix Drips</h4><p>Tell an adult about leaky faucets</p></div></div><div class="challenge-box"><h4>🎯 Water Hero Challenge</h4><p>Can you save 10 gallons today?</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Practical Conservation Techniques</h2><h3>Indoor Water Savings</h3><table><tr><th>Action</th><th>Water Saved</th></tr><tr><td>Low-flow showerhead</td><td>2,700 gal/year</td></tr><tr><td>Fix running toilet</td><td>200 gal/day</td></tr><tr><td>Efficient dishwasher</td><td>5,000 gal/year</td></tr><tr><td>Turn off tap while brushing</td><td>8 gal/day</td></tr></table><h3>Outdoor Water Savings</h3><ul><li>Water lawns early morning or evening</li><li>Use drip irrigation for gardens</li><li>Choose native, drought-tolerant plants</li><li>Collect rainwater for gardens</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Conservation Technology and Policy</h2><h3>Efficient Fixtures</h3><p>WaterSense labeled products use at least 20% less water:</p><ul><li>Toilets: 1.28 gpf vs 1.6 gpf standard</li><li>Showerheads: 2.0 gpm vs 2.5 gpm</li><li>Faucets: 1.5 gpm vs 2.2 gpm</li></ul><h3>Smart Water Management</h3><ul><li>Smart meters and leak detection</li><li>Weather-based irrigation controllers</li><li>Greywater recycling systems</li><li>Real-time consumption feedback</li></ul><h3>Policy Instruments</h3><ul><li>Tiered pricing structures</li><li>Building codes and standards</li><li>Rebate programs</li><li>Drought restrictions</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Demand Management Strategies</h2><h3>Economic Instruments</h3><ul><li><strong>Pricing:</strong> Block tariffs, seasonal rates, scarcity pricing</li><li><strong>Incentives:</strong> Rebates, tax credits, subsidized audits</li><li><strong>Markets:</strong> Water trading, cap-and-trade</li></ul><h3>Regulatory Approaches</h3><ul><li>Efficiency standards (appliances, fixtures)</li><li>Building codes (green buildings, LEED)</li><li>Allocation limits and permits</li><li>Mandatory restrictions during shortage</li></ul><h3>Information and Voluntary</h3><ul><li>Education and outreach campaigns</li><li>Real-time feedback and smart metering</li><li>Certification and labeling</li><li>Behavioral nudges</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Conservation Planning</h2><h3>Water Conservation Potential Assessment</h3><p>Bottom-up estimation of achievable savings:</p><ol><li>End-use analysis and baseline</li><li>Technical potential (all measures)</li><li>Economic potential (cost-effective measures)</li><li>Achievable potential (adoption constraints)</li></ol><h3>Cost-Effectiveness Analysis</h3><p>Metrics for comparing options:</p><ul><li>$/acre-foot saved</li><li>Cost of conserved water vs. supply alternatives</li><li>Net present value over program life</li></ul><h3>Program Evaluation</h3><ul><li>Attribution and additionality</li><li>Free-ridership and spillover</li><li>Persistence of savings</li><li>Equity considerations</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Conservation Science Frontiers</h2><h3>Behavioral Economics of Water Use</h3><ul><li>Social norms and peer comparisons</li><li>Default effects and choice architecture</li><li>Loss aversion framing</li><li>Commitment devices</li></ul><h3>Technology Innovation</h3><ul><li>IoT-enabled leak detection</li><li>AI for demand forecasting</li><li>Blockchain for water markets</li><li>Digital twins for system optimization</li></ul><h3>Research Questions</h3><ul><li>Long-term behavioral persistence</li><li>Rebound effects and conservation paradox</li><li>Equity impacts of pricing</li><li>Optimal policy instrument mixes</li></ul></div>`
        }
      },
      {
        id: 'water-lesson-3',
        title: 'Protecting Water Quality',
        order: 3,
        duration: 12,
        hasActivity: true,
        activityType: 'PUZZLE',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌊 Keeping Water Clean!</h2><h3>What Makes Water Dirty?</h3><div class="pollution-sources"><div class="source bad"><span>🗑️</span><p>Litter and trash</p></div><div class="source bad"><span>🧴</span><p>Chemicals and soap</p></div><div class="source bad"><span>🛢️</span><p>Oil and grease</p></div></div><h3>How You Can Help!</h3><ul><li>Never litter - especially near water</li><li>Use eco-friendly soaps</li><li>Don't pour chemicals down the drain</li><li>Pick up pet waste</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Water Quality and Pollution</h2><h3>Types of Water Pollution</h3><ul><li><strong>Point source:</strong> Identifiable single source (factory pipe)</li><li><strong>Non-point source:</strong> Diffuse sources (agricultural runoff)</li></ul><h3>Common Pollutants</h3><ul><li>Nutrients (nitrogen, phosphorus) → algae blooms</li><li>Pathogens (bacteria, viruses) → illness</li><li>Sediment → habitat destruction</li><li>Chemicals (pesticides, heavy metals) → toxicity</li></ul><h3>Water Treatment</h3><p>Treatment plants remove contaminants through filtration, sedimentation, and disinfection.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Water Quality Science</h2><h3>Key Water Quality Parameters</h3><ul><li><strong>pH:</strong> Measure of acidity (6.5-8.5 acceptable)</li><li><strong>Dissolved Oxygen:</strong> Essential for aquatic life (>5 mg/L)</li><li><strong>Turbidity:</strong> Cloudiness from suspended particles</li><li><strong>Total Dissolved Solids:</strong> Mineral content</li><li><strong>Coliform bacteria:</strong> Indicator of contamination</li></ul><h3>Treatment Technologies</h3><ul><li>Physical: Screening, sedimentation, filtration</li><li>Chemical: Coagulation, chlorination, ozonation</li><li>Biological: Activated sludge, biofiltration</li><li>Advanced: Membrane filtration, UV, advanced oxidation</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Water Quality Management</h2><h3>Regulatory Framework</h3><ul><li>Clean Water Act (surface water)</li><li>Safe Drinking Water Act (potable supply)</li><li>NPDES permits for dischargers</li><li>Total Maximum Daily Loads (TMDLs)</li></ul><h3>Source Water Protection</h3><ul><li>Wellhead protection areas</li><li>Buffer zones and setbacks</li><li>Land use controls</li><li>Best management practices</li></ul><h3>Emerging Contaminants</h3><ul><li>Pharmaceuticals and personal care products</li><li>PFAS (forever chemicals)</li><li>Microplastics</li><li>Endocrine disruptors</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Water Quality Issues</h2><h3>Emerging Contaminant Management</h3><p>Challenges in addressing CECs:</p><ul><li>Detection at trace levels (ng/L)</li><li>Unknown toxicity thresholds</li><li>Treatment technology gaps</li><li>Regulatory uncertainty</li></ul><h3>Nature-Based Solutions</h3><ul><li>Constructed wetlands</li><li>Riparian buffers</li><li>Green infrastructure</li><li>Soil aquifer treatment</li></ul><h3>Climate Change Impacts</h3><ul><li>Increased harmful algal blooms</li><li>Saltwater intrusion</li><li>Infrastructure vulnerability</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Water Quality Research Frontiers</h2><h3>Advanced Treatment Research</h3><ul><li>Selective membranes for contaminant removal</li><li>Advanced oxidation process optimization</li><li>Biological transformation pathways</li><li>Energy-efficient treatment systems</li></ul><h3>Monitoring Innovation</h3><ul><li>Real-time sensors and networks</li><li>Machine learning for anomaly detection</li><li>Citizen science and crowdsourcing</li><li>Remote sensing applications</li></ul><h3>One Health Framework</h3><p>Integrating human, animal, and environmental health in water quality research.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'water-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Sort the Water Users!',
          MIDDLE_SCHOOL: 'Water Cycle Journey',
          HIGH_SCHOOL: 'Treatment Process Order',
          UNDERGRADUATE: 'Water Budget Analysis',
          GRADUATE: 'IWRM System Design',
          PHD: 'Nexus Optimization'
        },
        description: {
          ELEMENTARY: 'Drag pictures to show who uses water and how!',
          MIDDLE_SCHOOL: 'Arrange the water cycle stages in the correct order.',
          HIGH_SCHOOL: 'Order water treatment steps from source to tap.',
          UNDERGRADUATE: 'Allocate water among competing uses in a watershed.',
          GRADUATE: 'Design an integrated water management system.',
          PHD: 'Optimize water-energy-food nexus allocations.'
        },
        config: {
          ELEMENTARY: { items: 6, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 10, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 20, hints: false, timeLimit: 90 },
          PHD: { items: 25, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'water-game',
      type: 'matching',
      title: 'Water Wisdom Challenge',
      description: 'Match water facts, terms, and conservation tips!',
      rounds: 5,
      timeLimit: 30,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'easy',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'medium',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'water-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wq1',
          question: {
            ELEMENTARY: 'How much of Earth\'s water can we easily use?',
            MIDDLE_SCHOOL: 'What percentage of global freshwater withdrawals goes to agriculture?',
            HIGH_SCHOOL: 'What is the water stress threshold (m³/person/year)?',
            UNDERGRADUATE: 'What are the three components of a water footprint?',
            GRADUATE: 'What is the primary driver of increasing global water demand?',
            PHD: 'In water-energy nexus analysis, what is the typical energy intensity of seawater desalination?'
          },
          options: {
            ELEMENTARY: ['Less than 1%', '50%', '100%', '25%'],
            MIDDLE_SCHOOL: ['About 70%', 'About 10%', 'About 50%', 'About 90%'],
            HIGH_SCHOOL: ['< 1,700 m³/person/year', '< 5,000 m³/person/year', '< 100 m³/person/year', '< 10,000 m³/person/year'],
            UNDERGRADUATE: ['Blue, green, and grey water', 'Surface, ground, and rain', 'Fresh, salt, and brackish', 'Potable, industrial, and agricultural'],
            GRADUATE: ['Population growth and economic development', 'Climate change alone', 'Industrial use only', 'Hydropower expansion'],
            PHD: ['3-4 kWh/m³ for RO', '0.5 kWh/m³', '10-15 kWh/m³', '50 kWh/m³']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Less than 1% of all water on Earth is freshwater we can easily access and use!',
            MIDDLE_SCHOOL: 'Agriculture uses about 70% of all freshwater withdrawals globally, mainly for irrigation.',
            HIGH_SCHOOL: 'Water stress occurs below 1,700 m³/person/year; below 1,000 is water scarcity.',
            UNDERGRADUATE: 'Water footprint = blue (surface/ground) + green (rainwater in soil) + grey (dilution of pollutants).',
            GRADUATE: 'Combined population and economic growth drive demand, with climate change exacerbating stress.',
            PHD: 'Modern seawater RO desalination requires 3-4 kWh/m³, approaching thermodynamic minimum (~1 kWh/m³).'
          }
        }
      ]
    },
    externalResources: [
      { title: 'USGS Water Science School', url: 'https://www.usgs.gov/special-topics/water-science-school', type: 'article' },
      { title: 'EPA WaterSense', url: 'https://www.epa.gov/watersense', type: 'tool' }
    ]
  },
  // Module 2: Rainwater Harvesting
  {
    id: 'water-rainwater-harvesting',
    slug: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: {
      ELEMENTARY: 'Catch rain from the sky! Learn how to collect rainwater for your garden.',
      MIDDLE_SCHOOL: 'Discover how rainwater collection systems work and why they\'re important.',
      HIGH_SCHOOL: 'Design rainwater harvesting systems for residential and commercial applications.',
      UNDERGRADUATE: 'Engineer rainwater catchment systems with proper sizing, treatment, and storage.',
      GRADUATE: 'Analyze rainwater harvesting potential at urban and regional scales.',
      PHD: 'Research optimal integration of rainwater harvesting in urban water portfolios.'
    },
    topic: 'water-systems',
    category: 'HARVESTING',
    icon: 'CloudRain',
    color: 'ocean',
    duration: {
      ELEMENTARY: 25,
      MIDDLE_SCHOOL: 35,
      HIGH_SCHOOL: 50,
      UNDERGRADUATE: 65,
      GRADUATE: 85,
      PHD: 110
    },
    isMasterclass: false,
    lessons: [
      {
        id: 'rain-lesson-1',
        title: 'Catching Rain',
        order: 1,
        duration: 12,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌧️ Free Water From the Sky!</h2><p>When it rains, water falls everywhere. Instead of letting it all flow away, we can catch it and use it!</p><h3>Simple Rain Barrel</h3><ol><li>Rain falls on your roof</li><li>It flows into gutters</li><li>Gutters lead to a barrel</li><li>Use the water for plants!</li></ol><div class="fun-fact"><p>One inch of rain on a 1,000 sq ft roof = 600 gallons!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Rainwater Collection Basics</h2><h3>System Components</h3><ul><li><strong>Catchment:</strong> Roof surface that collects rain</li><li><strong>Conveyance:</strong> Gutters and downspouts</li><li><strong>First flush diverter:</strong> Removes initial dirty water</li><li><strong>Storage:</strong> Barrels, tanks, or cisterns</li><li><strong>Distribution:</strong> Gravity or pump to point of use</li></ul><h3>Calculating Collection</h3><p>Collection = Roof Area × Rainfall × Efficiency (0.8)</p><p>Example: 1,500 sq ft × 30 in/year × 0.8 = 22,440 gallons/year</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Rainwater System Design</h2><h3>Design Parameters</h3><ul><li>Local rainfall patterns (intensity, frequency)</li><li>Roof area and material</li><li>Intended uses and quality requirements</li><li>Storage sizing (supply vs. demand matching)</li></ul><h3>Water Quality Considerations</h3><ul><li>Roof material affects quality (avoid treated wood)</li><li>First flush removes debris and contaminants</li><li>Screening prevents mosquito breeding</li><li>Treatment required for potable use</li></ul><h3>Regulatory Landscape</h3><p>Regulations vary widely - some states encourage, others restrict rainwater harvesting.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Engineering Rainwater Systems</h2><h3>Tank Sizing Methods</h3><ul><li><strong>Demand-side:</strong> Based on expected usage</li><li><strong>Supply-side:</strong> Based on roof area and rainfall</li><li><strong>Simulation:</strong> Daily water balance modeling</li></ul><h3>Treatment Train for Potable Use</h3><ol><li>First flush diversion (1-2 mm)</li><li>Coarse filtration (screens, leaf guards)</li><li>Settling</li><li>Fine filtration (sediment, carbon)</li><li>Disinfection (UV, chlorine, ozone)</li></ol><h3>Economic Analysis</h3><p>Compare system cost to water rates, rebates, and avoided stormwater fees.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Urban-Scale Rainwater Harvesting</h2><h3>Aggregate Potential Assessment</h3><ul><li>GIS-based roof area analysis</li><li>Spatially distributed rainfall modeling</li><li>Demand estimation by sector</li><li>Reliability analysis under climate scenarios</li></ul><h3>Policy and Planning Integration</h3><ul><li>Stormwater management credits</li><li>Green building requirements</li><li>Rebate and incentive programs</li><li>Water supply portfolio diversification</li></ul><h3>Co-Benefits</h3><ul><li>Reduced stormwater runoff and flooding</li><li>Distributed storage resilience</li><li>Groundwater recharge potential</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Rainwater Harvesting Research</h2><h3>Optimization Models</h3><ul><li>Multi-objective optimization (cost, reliability, runoff reduction)</li><li>Spatial optimization of system deployment</li><li>Integration with other distributed systems</li></ul><h3>Climate Resilience</h3><ul><li>Performance under non-stationary climate</li><li>Adaptive management strategies</li><li>Ensemble rainfall projections</li></ul><h3>Research Gaps</h3><ul><li>Long-term water quality data</li><li>Behavioral adoption drivers</li><li>Maintenance and persistence</li><li>Equity in access and benefits</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'rain-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Fill the Rain Barrel!',
          MIDDLE_SCHOOL: 'Design Your Collection System',
          HIGH_SCHOOL: 'Size Your Cistern',
          UNDERGRADUATE: 'Annual Water Balance Model',
          GRADUATE: 'Urban Potential Mapper',
          PHD: 'Optimization Scenario Tool'
        },
        description: {
          ELEMENTARY: 'Watch rain fill your barrel and water your garden!',
          MIDDLE_SCHOOL: 'Design a rainwater system for a house.',
          HIGH_SCHOOL: 'Calculate the right tank size for your needs.',
          UNDERGRADUATE: 'Model a year of rainwater supply and demand.',
          GRADUATE: 'Map rainwater potential across a city.',
          PHD: 'Optimize deployment under multiple objectives.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 2 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 4 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 6 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 10 },
          GRADUATE: { complexity: 'expert', variables: 15 },
          PHD: { complexity: 'research', variables: 20 }
        }
      }
    ],
    game: {
      id: 'rain-game',
      type: 'puzzle',
      title: 'Rainwater System Builder',
      description: 'Assemble a complete rainwater harvesting system!',
      rounds: 4,
      timeLimit: 45,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'easy',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'medium',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'rain-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rq1',
          question: {
            ELEMENTARY: 'Where does a rain barrel get its water from?',
            MIDDLE_SCHOOL: 'What is the purpose of a first flush diverter?',
            HIGH_SCHOOL: 'How many gallons can 1 inch of rain on 1,000 sq ft of roof produce?',
            UNDERGRADUATE: 'What treatment is essential for potable rainwater use?',
            GRADUATE: 'What is a key co-benefit of urban rainwater harvesting?',
            PHD: 'What is the primary uncertainty in climate-adaptive rainwater system design?'
          },
          options: {
            ELEMENTARY: ['From the roof when it rains', 'From a hose', 'From a river', 'From underground'],
            MIDDLE_SCHOOL: ['Remove the first dirty water', 'Make water flow faster', 'Add minerals', 'Heat the water'],
            HIGH_SCHOOL: ['About 600 gallons', 'About 100 gallons', 'About 1,000 gallons', 'About 50 gallons'],
            UNDERGRADUATE: ['Disinfection (UV, chlorine)', 'Heating', 'Aeration', 'Magnetization'],
            GRADUATE: ['Stormwater runoff reduction', 'Increased water bills', 'More flooding', 'Higher energy use'],
            PHD: ['Non-stationary precipitation patterns', 'Tank material costs', 'Roof colors', 'Gutter shapes']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Rain barrels collect rainwater that falls on your roof and flows through the gutters!',
            MIDDLE_SCHOOL: 'First flush diverters remove the initial water that washes dirt and debris off the roof.',
            HIGH_SCHOOL: '1" of rain × 1,000 sq ft × 0.623 gal/sq ft/inch = 623 gallons (we estimate ~600).',
            UNDERGRADUATE: 'Disinfection is critical to eliminate pathogens for potable use.',
            GRADUATE: 'Rainwater harvesting reduces stormwater runoff, decreasing flooding and pollution.',
            PHD: 'Climate change creates non-stationary conditions, making historical rainfall unreliable for design.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Rainwater Catchment Systems Association', url: 'https://www.arcsa.org/', type: 'article' },
      { title: 'Texas Manual on Rainwater Harvesting', url: 'https://www.twdb.texas.gov/publications/reports/rainwaterharvestingmanual.asp', type: 'article' }
    ]
  },
  // MASTERCLASS: Integrated Water Management
  {
    id: 'water-masterclass',
    slug: 'integrated-water-management-masterclass',
    title: 'Integrated Water Management Masterclass',
    description: {
      ELEMENTARY: 'Become a water expert! Learn everything about keeping water clean and available.',
      MIDDLE_SCHOOL: 'Master the complete water cycle - from clouds to your cup and back again.',
      HIGH_SCHOOL: 'Comprehensive study of water systems, treatment, conservation, and management.',
      UNDERGRADUATE: 'Advanced analysis of integrated water resource management across sectors.',
      GRADUATE: 'Expert examination of water governance, climate adaptation, and system resilience.',
      PHD: 'Research synthesis of sustainable water systems, nexus approaches, and innovation pathways.'
    },
    topic: 'water-systems',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'ocean',
    duration: {
      ELEMENTARY: 45,
      MIDDLE_SCHOOL: 60,
      HIGH_SCHOOL: 90,
      UNDERGRADUATE: 120,
      GRADUATE: 150,
      PHD: 180
    },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-water-1',
        title: 'The Complete Water Picture',
        order: 1,
        duration: 25,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 The Amazing Water Journey!</h2><p>Water is always moving - from oceans to clouds to rain to rivers and back again!</p><h3>Follow a Water Drop</h3><ol><li>☀️ Sun heats ocean water</li><li>☁️ Water rises and forms clouds</li><li>🌧️ Clouds release rain</li><li>🏔️ Rain flows to rivers and lakes</li><li>🌊 Water returns to the ocean</li></ol></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Water Systems</h2><h3>Natural Water Cycle</h3><p>The hydrological cycle moves 505,000 km³ of water annually through evaporation and precipitation.</p><h3>Human Water Systems</h3><ul><li><strong>Supply:</strong> Source water → treatment → distribution</li><li><strong>Use:</strong> Residential, commercial, industrial, agricultural</li><li><strong>Wastewater:</strong> Collection → treatment → discharge/reuse</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Integrated Water Systems</h2><h3>One Water Approach</h3><p>Managing drinking water, wastewater, and stormwater as interconnected resources.</p><h3>System Components</h3><ul><li>Source water protection</li><li>Treatment and distribution</li><li>Demand management</li><li>Wastewater treatment and reuse</li><li>Stormwater management</li><li>Ecosystem needs</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Water System Integration</h2><h3>Portfolio Approach</h3><p>Diversified supply sources for reliability:</p><ul><li>Surface water</li><li>Groundwater</li><li>Recycled water</li><li>Desalination</li><li>Rainwater and stormwater capture</li></ul><h3>Fit-for-Purpose Water</h3><p>Matching water quality to intended use for efficiency.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Water Governance</h2><h3>Polycentric Governance</h3><p>Multi-level, multi-actor water governance frameworks.</p><h3>Adaptive Management</h3><ul><li>Monitoring and evaluation</li><li>Learning and adjustment</li><li>Stakeholder engagement</li><li>Scenario planning</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Water System Transformation</h2><h3>Socio-Technical Transitions</h3><p>Understanding pathways to sustainable water systems.</p><h3>Research Frontiers</h3><ul><li>Digital water systems</li><li>Circular water economy</li><li>Energy-positive treatment</li><li>Nature-based solutions at scale</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-water-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Run the Water Town!',
          MIDDLE_SCHOOL: 'Balance the Water Budget',
          HIGH_SCHOOL: 'Manage the Watershed',
          UNDERGRADUATE: 'Optimize Water Portfolio',
          GRADUATE: 'Climate Adaptation Planner',
          PHD: 'System Transformation Model'
        },
        description: {
          ELEMENTARY: 'Keep water flowing to everyone in town!',
          MIDDLE_SCHOOL: 'Balance supply and demand for a city.',
          HIGH_SCHOOL: 'Manage competing water uses in a watershed.',
          UNDERGRADUATE: 'Optimize a diversified water supply portfolio.',
          GRADUATE: 'Plan adaptation strategies under climate uncertainty.',
          PHD: 'Model pathways to sustainable water systems.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 28 },
          PHD: { complexity: 'research', variables: 40 }
        }
      }
    ],
    game: {
      id: 'master-water-game',
      type: 'timed_challenge',
      title: 'Water Systems Master Challenge',
      description: 'Test your comprehensive water knowledge!',
      rounds: 10,
      timeLimit: 20,
      difficultyByLevel: {
        ELEMENTARY: 'easy',
        MIDDLE_SCHOOL: 'medium',
        HIGH_SCHOOL: 'medium',
        UNDERGRADUATE: 'hard',
        GRADUATE: 'hard',
        PHD: 'expert'
      }
    },
    quiz: {
      id: 'master-water-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mwq1',
          question: {
            ELEMENTARY: 'What happens to water when the sun heats it?',
            MIDDLE_SCHOOL: 'What is the "One Water" approach?',
            HIGH_SCHOOL: 'What is the concept of fit-for-purpose water?',
            UNDERGRADUATE: 'What is the primary goal of water portfolio diversification?',
            GRADUATE: 'What characterizes adaptive water management?',
            PHD: 'What framework best describes water system transformation?'
          },
          options: {
            ELEMENTARY: ['It rises up to make clouds', 'It gets colder', 'It turns green', 'It disappears forever'],
            MIDDLE_SCHOOL: ['Managing all water as one connected resource', 'Using only one water source', 'Drinking one glass of water daily', 'Having one water company'],
            HIGH_SCHOOL: ['Using water quality matched to intended use', 'Treating all water to drinking standards', 'Using only bottled water', 'Fit-testing water pipes'],
            UNDERGRADUATE: ['Supply reliability and resilience', 'Lowest cost only', 'Maximum treatment', 'Single source dependence'],
            GRADUATE: ['Learning, monitoring, and adjusting strategies', 'Fixed long-term plans', 'Top-down control only', 'Avoiding stakeholder input'],
            PHD: ['Socio-technical transitions theory', 'Simple linear progression', 'Technology-only solutions', 'Static equilibrium models']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'When the sun heats water, it evaporates and rises up to form clouds!',
            MIDDLE_SCHOOL: 'One Water manages drinking water, wastewater, and stormwater as interconnected resources.',
            HIGH_SCHOOL: 'Fit-for-purpose means using water of appropriate quality for each use, improving efficiency.',
            UNDERGRADUATE: 'Diversification improves reliability by reducing dependence on any single source.',
            GRADUATE: 'Adaptive management involves continuous learning and adjustment based on monitoring.',
            PHD: 'Socio-technical transitions theory captures the co-evolution of technology, institutions, and practices.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'UN Water', url: 'https://www.unwater.org/', type: 'research' },
      { title: 'World Resources Institute - Water', url: 'https://www.wri.org/water', type: 'research' }
    ]
  }
]
