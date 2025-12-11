// Water Systems Modules - Complete Content for All Learning Levels
import { Module, LearningLevel } from './index'

// Module 4: Greywater Systems
export const greywaterSystems: Module = {
  id: 'water-greywater', slug: 'greywater-systems', title: 'Greywater Systems',
  description: { ELEMENTARY: 'Learn how to reuse water from sinks and showers!', MIDDLE_SCHOOL: 'Discover how greywater recycling works in homes.', HIGH_SCHOOL: 'Explore greywater treatment, regulations, and landscape irrigation.', UNDERGRADUATE: 'Analyze greywater system design, treatment options, and health considerations.', GRADUATE: 'Examine greywater policy, public acceptance, and integrated reuse strategies.', PHD: 'Research advanced greywater treatment, pathogen risk assessment, and water quality modeling.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'grey-1', title: 'Reusing Water', content: { ELEMENTARY: '<h2>Water Second Chances!</h2><p>Water from your shower can water your garden instead of going down the drain!</p>', MIDDLE_SCHOOL: '<h2>What is Greywater?</h2><p>Greywater = used water from sinks, showers, and laundry. Not from toilets (that\'s blackwater).</p>', HIGH_SCHOOL: '<h2>Greywater Systems</h2><p>Simple: laundry to landscape. Complex: treatment and storage. Must use plant-safe soaps.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Surge tanks, filtration, disinfection options. Sizing based on generation and irrigation demand.</p>', GRADUATE: '<h2>Policy Landscape</h2><p>Regulations vary widely. Public health concerns vs. water conservation benefits.</p>', PHD: '<h2>Risk Assessment</h2><p>QMRA for pathogen exposure. Treatment efficacy and monitoring requirements.</p>' } }],
  activities: [{ id: 'grey-act-1', title: 'Design Greywater System', type: 'SIMULATION', description: 'Plan household greywater reuse', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'grey-game', title: 'Water Recycler', type: 'simulation', description: 'Manage greywater reuse', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'grey-q1', question: 'What is NOT greywater?', options: ['Shower water', 'Toilet water', 'Laundry water', 'Sink water'], correctAnswer: 1, explanation: 'Toilet water is called blackwater, not greywater.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 5: Drip Irrigation
export const dripIrrigation: Module = {
  id: 'water-drip', slug: 'drip-irrigation', title: 'Drip Irrigation',
  description: { ELEMENTARY: 'Learn about watering plants one drop at a time!', MIDDLE_SCHOOL: 'Discover efficient irrigation that saves water for farms and gardens.', HIGH_SCHOOL: 'Explore drip system design, components, and water savings.', UNDERGRADUATE: 'Analyze emitter hydraulics, scheduling, and system optimization.', GRADUATE: 'Examine precision irrigation, sensor integration, and deficit irrigation strategies.', PHD: 'Research variable rate irrigation, crop modeling, and climate-adaptive systems.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'drip-1', title: 'Efficient Watering', content: { ELEMENTARY: '<h2>Drip Drip!</h2><p>Tiny tubes deliver water right to plant roots - no waste, happy plants!</p>', MIDDLE_SCHOOL: '<h2>How Drip Works</h2><p>Water flows through tubes with small emitters at each plant. Uses 30-50% less water than sprinklers.</p>', HIGH_SCHOOL: '<h2>System Components</h2><p>Mainline, sub-mains, laterals, emitters. Pressure regulation, filtration, backflow prevention.</p>', UNDERGRADUATE: '<h2>Hydraulic Design</h2><p>Emitter uniformity, pressure compensation, lateral sizing for uniform distribution.</p>', GRADUATE: '<h2>Precision Irrigation</h2><p>Soil moisture sensors, ET-based scheduling, variable rate application.</p>', PHD: '<h2>Optimization Research</h2><p>Deficit irrigation strategies, real-time optimization, digital twin approaches.</p>' } }],
  activities: [{ id: 'drip-act-1', title: 'Design Drip System', type: 'SIMULATION', description: 'Layout a drip irrigation system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'drip-game', title: 'Irrigation Pro', type: 'puzzle', description: 'Design efficient irrigation', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'drip-q1', question: 'How much water can drip irrigation save vs sprinklers?', options: ['No savings', '10-20%', '30-50%', '90-100%'], correctAnswer: 2, explanation: 'Drip irrigation typically uses 30-50% less water than sprinklers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 6: Well Water Systems
export const wellWaterSystems: Module = {
  id: 'water-wells', slug: 'well-water-systems', title: 'Well Water Systems',
  description: { ELEMENTARY: 'Learn how water comes up from underground!', MIDDLE_SCHOOL: 'Discover how wells tap into groundwater for homes and farms.', HIGH_SCHOOL: 'Explore well construction, pump systems, and water testing.', UNDERGRADUATE: 'Analyze well hydraulics, aquifer testing, and sustainable yield.', GRADUATE: 'Examine groundwater management, contaminant transport, and recharge.', PHD: 'Research aquifer storage recovery, managed recharge, and groundwater modeling.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'well-1', title: 'Underground Water', content: { ELEMENTARY: '<h2>Hidden Water!</h2><p>Water hides underground in rocks and sand. Wells are like straws to drink it up!</p>', MIDDLE_SCHOOL: '<h2>Groundwater Basics</h2><p>Rain soaks in and fills spaces in soil and rock (aquifers). Wells pump it to the surface.</p>', HIGH_SCHOOL: '<h2>Well Construction</h2><p>Drilled wells: 100-400ft deep. Casing, screen, seal, pump. Annual testing recommended.</p>', UNDERGRADUATE: '<h2>Aquifer Hydraulics</h2><p>Transmissivity, storativity, drawdown. Pump tests to characterize aquifer properties.</p>', GRADUATE: '<h2>Groundwater Management</h2><p>Safe yield, overdraft, land subsidence. Conjunctive use strategies.</p>', PHD: '<h2>Advanced Management</h2><p>ASR, MAR, groundwater banking. Numerical modeling for basin management.</p>' } }],
  activities: [{ id: 'well-act-1', title: 'Find Groundwater', type: 'SIMULATION', description: 'Locate and design a well', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'well-game', title: 'Well Driller', type: 'simulation', description: 'Drill and manage a water well', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'well-q1', question: 'Where is groundwater stored?', options: ['In underground rivers', 'In spaces in rock and soil', 'In caves only', 'In underground tanks'], correctAnswer: 1, explanation: 'Groundwater fills pore spaces in soil and rock formations called aquifers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 7: Water Filtration
export const waterFiltration: Module = {
  id: 'water-filtration', slug: 'water-filtration', title: 'Water Filtration',
  description: { ELEMENTARY: 'Learn how dirty water becomes clean!', MIDDLE_SCHOOL: 'Discover different ways to filter and clean water.', HIGH_SCHOOL: 'Explore filtration technologies from sand filters to membranes.', UNDERGRADUATE: 'Analyze filtration mechanisms, media selection, and system design.', GRADUATE: 'Examine advanced membrane processes, fouling, and hybrid systems.', PHD: 'Research novel membrane materials, forward osmosis, and selective separations.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'filter-1', title: 'Cleaning Water', content: { ELEMENTARY: '<h2>Water Cleaning!</h2><p>Filters catch dirt and germs so water is safe to drink!</p>', MIDDLE_SCHOOL: '<h2>Filtration Basics</h2><p>Sand, activated carbon, ceramic filters. Each removes different contaminants.</p>', HIGH_SCHOOL: '<h2>Filtration Technologies</h2><p>Particle size: sediment > microfiltration > ultrafiltration > nanofiltration > reverse osmosis.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Media selection, flow rates, backwash, pretreatment requirements.</p>', GRADUATE: '<h2>Membrane Processes</h2><p>MF/UF for particles/pathogens. NF/RO for dissolved contaminants. Fouling management.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene membranes, biomimetic membranes, selective contaminant removal.</p>' } }],
  activities: [{ id: 'filter-act-1', title: 'Build a Filter', type: 'STEP_GUIDED', description: 'Create a water filter', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'filter-game', title: 'Filter Designer', type: 'puzzle', description: 'Design the right filter system', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'filter-q1', question: 'Which filter removes the smallest particles?', options: ['Sand filter', 'Coffee filter', 'Reverse osmosis', 'Screen'], correctAnswer: 2, explanation: 'Reverse osmosis can remove dissolved molecules, the smallest contaminants.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 8: Stormwater Management
export const stormwaterManagement: Module = {
  id: 'water-stormwater', slug: 'stormwater-management', title: 'Stormwater Management',
  description: { ELEMENTARY: 'Learn what happens to rain in cities!', MIDDLE_SCHOOL: 'Discover how cities manage rainwater runoff.', HIGH_SCHOOL: 'Explore green infrastructure and stormwater best management practices.', UNDERGRADUATE: 'Analyze stormwater hydrology, LID design, and regulatory requirements.', GRADUATE: 'Examine integrated urban water management and green-grey infrastructure.', PHD: 'Research stormwater pollutant removal, climate adaptation, and blue-green networks.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'storm-1', title: 'Rain in Cities', content: { ELEMENTARY: '<h2>Where Does Rain Go?</h2><p>In cities, rain can\'t soak in through concrete, so we need special ways to handle it!</p>', MIDDLE_SCHOOL: '<h2>Urban Runoff</h2><p>Impervious surfaces (roads, roofs) create runoff. Storm drains carry it to streams.</p>', HIGH_SCHOOL: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, permeable pavement, green roofs slow and filter runoff.</p>', UNDERGRADUATE: '<h2>LID Design</h2><p>Low Impact Development mimics natural hydrology. Sizing, soil media, underdrain design.</p>', GRADUATE: '<h2>Integrated Management</h2><p>Combined sewer overflow, MS4 permits, green-grey optimization, co-benefits.</p>', PHD: '<h2>Research Areas</h2><p>Pollutant removal performance, climate resilience, nature-based solutions scaling.</p>' } }],
  activities: [{ id: 'storm-act-1', title: 'Design Rain Garden', type: 'SIMULATION', description: 'Plan green infrastructure', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'storm-game', title: 'Storm Manager', type: 'simulation', description: 'Manage urban stormwater', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'storm-q1', question: 'What is a rain garden?', options: ['A garden that only needs rain', 'A planted area to capture runoff', 'A garden with a fountain', 'An indoor garden'], correctAnswer: 1, explanation: 'Rain gardens are planted depressions that capture and filter stormwater runoff.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 9: Desalination
export const desalination: Module = {
  id: 'water-desal', slug: 'desalination', title: 'Desalination',
  description: { ELEMENTARY: 'Learn how to make ocean water drinkable!', MIDDLE_SCHOOL: 'Discover how salt is removed from seawater.', HIGH_SCHOOL: 'Explore reverse osmosis and thermal desalination technologies.', UNDERGRADUATE: 'Analyze desalination plant design, energy requirements, and economics.', GRADUATE: 'Examine brine disposal, renewable-powered desal, and environmental impacts.', PHD: 'Research next-generation membranes, energy recovery, and hybrid systems.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'desal-1', title: 'Salt to Fresh', content: { ELEMENTARY: '<h2>Freshening the Ocean!</h2><p>Special machines can remove salt from ocean water so we can drink it!</p>', MIDDLE_SCHOOL: '<h2>How Desal Works</h2><p>Push seawater through special filters (RO) or boil and collect steam (thermal).</p>', HIGH_SCHOOL: '<h2>Technologies</h2><p>RO: 3-4 kWh/m³. Thermal: MED, MSF for high-salinity. Energy is main cost.</p>', UNDERGRADUATE: '<h2>Plant Design</h2><p>Intake, pretreatment, RO trains, energy recovery devices, post-treatment.</p>', GRADUATE: '<h2>Sustainability</h2><p>Brine discharge impacts. Solar/wind powered desal. Co-location with power plants.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene oxide membranes, capacitive deionization, solar still advances.</p>' } }],
  activities: [{ id: 'desal-act-1', title: 'Desalination Plant', type: 'SIMULATION', description: 'Design a desal system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'desal-game', title: 'Desal Engineer', type: 'simulation', description: 'Run a desalination plant', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'desal-q1', question: 'What does desalination remove from water?', options: ['Dirt', 'Salt', 'Air', 'Color'], correctAnswer: 1, explanation: 'Desalination removes salt from seawater to make it drinkable.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 10: Wastewater Treatment
export const wastewaterTreatment: Module = {
  id: 'water-wastewater', slug: 'wastewater-treatment', title: 'Wastewater Treatment',
  description: { ELEMENTARY: 'Learn what happens to water after you flush!', MIDDLE_SCHOOL: 'Discover how dirty water gets cleaned at treatment plants.', HIGH_SCHOOL: 'Explore primary, secondary, and tertiary treatment processes.', UNDERGRADUATE: 'Analyze activated sludge, nutrient removal, and plant design.', GRADUATE: 'Examine resource recovery, energy-neutral treatment, and advanced processes.', PHD: 'Research anammox, mainstream deammonification, and circular water systems.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 55, UNDERGRADUATE: 75, GRADUATE: 100, PHD: 130 },
  lessons: [{ id: 'ww-1', title: 'Cleaning Used Water', content: { ELEMENTARY: '<h2>Water\'s Second Life!</h2><p>Water from toilets and sinks goes to a plant where it gets super clean!</p>', MIDDLE_SCHOOL: '<h2>Treatment Steps</h2><p>Screens remove big stuff, settling removes solids, bacteria eat organic matter, disinfection kills germs.</p>', HIGH_SCHOOL: '<h2>Treatment Levels</h2><p>Primary: physical. Secondary: biological (activated sludge). Tertiary: advanced (filtration, nutrient removal).</p>', UNDERGRADUATE: '<h2>Process Design</h2><p>BOD/COD removal, nitrification/denitrification, P removal, sludge handling.</p>', GRADUATE: '<h2>Resource Recovery</h2><p>Biogas from anaerobic digestion, struvite recovery, water reuse.</p>', PHD: '<h2>Advanced Biology</h2><p>Anammox for N removal, granular sludge, membrane bioreactors.</p>' } }],
  activities: [{ id: 'ww-act-1', title: 'Treatment Plant Tour', type: 'SIMULATION', description: 'Follow water through treatment', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ww-game', title: 'Plant Operator', type: 'simulation', description: 'Run a treatment plant', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ww-q1', question: 'What eats organic matter in secondary treatment?', options: ['Chemicals', 'Filters', 'Bacteria', 'Sunlight'], correctAnswer: 2, explanation: 'Bacteria consume organic matter in secondary biological treatment.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 11: Watershed Protection
export const watershedProtection: Module = {
  id: 'water-watershed', slug: 'watershed-protection', title: 'Watershed Protection',
  description: { ELEMENTARY: 'Learn how to protect the areas that give us clean water!', MIDDLE_SCHOOL: 'Discover what watersheds are and why they matter.', HIGH_SCHOOL: 'Explore watershed management practices and land use impacts.', UNDERGRADUATE: 'Analyze watershed modeling, BMPs, and source water protection.', GRADUATE: 'Examine payment for ecosystem services and integrated watershed management.', PHD: 'Research ecohydrology, watershed restoration, and climate adaptation.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ws-1', title: 'Water\'s Home', content: { ELEMENTARY: '<h2>Water Neighborhoods!</h2><p>A watershed is like a big bowl that catches rain and sends it to streams!</p>', MIDDLE_SCHOOL: '<h2>Watershed Basics</h2><p>All land drains to a common point. Ridges define boundaries. What happens upstream affects downstream.</p>', HIGH_SCHOOL: '<h2>Protection Strategies</h2><p>Riparian buffers, forest conservation, erosion control, limiting development.</p>', UNDERGRADUATE: '<h2>Watershed Planning</h2><p>Delineation, land use analysis, pollutant loading models, TMDL development.</p>', GRADUATE: '<h2>Ecosystem Services</h2><p>Valuing water quality, PES programs, conservation easements.</p>', PHD: '<h2>Research Areas</h2><p>Paired watershed studies, restoration ecology, climate-watershed interactions.</p>' } }],
  activities: [{ id: 'ws-act-1', title: 'Map a Watershed', type: 'SIMULATION', description: 'Identify watershed boundaries', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'ws-game', title: 'Watershed Guardian', type: 'simulation', description: 'Protect your watershed', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ws-q1', question: 'What defines a watershed boundary?', options: ['Rivers', 'Ridges and high points', 'Roads', 'Fences'], correctAnswer: 1, explanation: 'Watershed boundaries follow ridges and high points that separate drainage areas.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 12: Water Quality Testing
export const waterQualityTesting: Module = {
  id: 'water-testing', slug: 'water-quality-testing', title: 'Water Quality Testing',
  description: { ELEMENTARY: 'Learn how scientists test if water is clean!', MIDDLE_SCHOOL: 'Discover the tests that show if water is safe.', HIGH_SCHOOL: 'Explore physical, chemical, and biological water quality parameters.', UNDERGRADUATE: 'Analyze sampling protocols, analytical methods, and QA/QC.', GRADUATE: 'Examine real-time monitoring, sensor networks, and data management.', PHD: 'Research emerging contaminant detection, biosensors, and predictive monitoring.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'test-1', title: 'Testing Water', content: { ELEMENTARY: '<h2>Is It Clean?</h2><p>Scientists use special tests to check if water is safe for drinking and swimming!</p>', MIDDLE_SCHOOL: '<h2>Common Tests</h2><p>pH, temperature, dissolved oxygen, turbidity, bacteria (E. coli). Each tells something different.</p>', HIGH_SCHOOL: '<h2>Parameters</h2><p>Physical: temp, turbidity. Chemical: pH, DO, nutrients, metals. Biological: bacteria, algae.</p>', UNDERGRADUATE: '<h2>Analytical Methods</h2><p>Spectroscopy, chromatography, electrochemical sensors. Proper sampling and chain of custody.</p>', GRADUATE: '<h2>Monitoring Systems</h2><p>Continuous sensors, telemetry, event detection, data validation.</p>', PHD: '<h2>Advanced Detection</h2><p>Trace contaminant analysis, bioassays, machine learning for anomaly detection.</p>' } }],
  activities: [{ id: 'test-act-1', title: 'Water Testing Lab', type: 'SIMULATION', description: 'Test water quality', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'test-game', title: 'Water Detective', type: 'puzzle', description: 'Diagnose water quality issues', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'test-q1', question: 'What does pH measure?', options: ['Temperature', 'Acidity/alkalinity', 'Saltiness', 'Cloudiness'], correctAnswer: 1, explanation: 'pH measures how acidic or alkaline (basic) water is.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 13: Water Storage & Tanks
export const waterStorageTanks: Module = {
  id: 'water-storage', slug: 'water-storage-tanks', title: 'Water Storage & Tanks',
  description: { ELEMENTARY: 'Learn about tanks that hold water for when we need it!', MIDDLE_SCHOOL: 'Discover how water is stored safely for homes and communities.', HIGH_SCHOOL: 'Explore tank types, sizing, and water quality in storage.', UNDERGRADUATE: 'Analyze storage system hydraulics, materials, and design codes.', GRADUATE: 'Examine distribution system optimization, water age, and resilience.', PHD: 'Research smart storage, water quality modeling, and system dynamics.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'store-1', title: 'Holding Water', content: { ELEMENTARY: '<h2>Water Banks!</h2><p>Big tanks store water like a piggy bank saves money - for when you need it!</p>', MIDDLE_SCHOOL: '<h2>Storage Types</h2><p>Water towers (pressure), ground tanks, underground cisterns. Material: concrete, steel, plastic.</p>', HIGH_SCHOOL: '<h2>Design Considerations</h2><p>Volume for demand + fire flow + emergency. Keep water moving to prevent stagnation.</p>', UNDERGRADUATE: '<h2>System Hydraulics</h2><p>Elevated vs pumped storage. Pressure zones, turnover rates, disinfectant residual.</p>', GRADUATE: '<h2>Optimization</h2><p>Water age management, variable speed pumping, energy cost minimization.</p>', PHD: '<h2>Smart Systems</h2><p>Real-time optimization, water quality sensors, predictive control.</p>' } }],
  activities: [{ id: 'store-act-1', title: 'Size a Tank', type: 'SIMULATION', description: 'Design water storage', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'store-game', title: 'Storage Manager', type: 'simulation', description: 'Manage water storage levels', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'store-q1', question: 'Why do water towers create pressure?', options: ['Electric pumps inside', 'Gravity from height', 'Compressed air', 'Chemical reactions'], correctAnswer: 1, explanation: 'Water towers use gravity from their height to create water pressure.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 14: Fog Collection
export const fogCollection: Module = {
  id: 'water-fog', slug: 'fog-collection', title: 'Fog Collection',
  description: { ELEMENTARY: 'Learn how special nets catch water from fog and clouds!', MIDDLE_SCHOOL: 'Discover how coastal and mountain communities harvest water from fog.', HIGH_SCHOOL: 'Explore fog harvesting technology, site selection, and yield optimization.', UNDERGRADUATE: 'Analyze fog collector design, mesh materials, and meteorological factors.', GRADUATE: 'Examine fog water quality, community projects, and climate variability impacts.', PHD: 'Research biomimetic fog collection, advanced materials, and atmospheric water generation.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'fog-1', title: 'Catching Clouds', content: { ELEMENTARY: '<h2>Clouds on the Ground!</h2><p>When fog touches special nets, water droplets stick and drip down into containers!</p>', MIDDLE_SCHOOL: '<h2>How Fog Nets Work</h2><p>Mesh panels face the wind. Fog droplets collect on threads and drip to troughs. Can yield 200-1000 L/day per collector.</p>', HIGH_SCHOOL: '<h2>Fog Harvesting Science</h2><p>Best locations: coastal mountains, 400-1200m elevation, persistent advection fog. Raschel mesh common. Collection efficiency 1-10%.</p>', UNDERGRADUATE: '<h2>Collector Design</h2><p>Mesh parameters: shade coefficient, filament diameter, weave pattern. Wind speed and liquid water content determine yield.</p>', GRADUATE: '<h2>Project Development</h2><p>Site assessment protocols, community management models, water quality (typically low TDS, possible contamination).</p>', PHD: '<h2>Research Frontiers</h2><p>Beetle-inspired surfaces, nanostructured materials, hybrid dew/fog collectors, climate modeling for fog frequency.</p>' } }],
  activities: [{ id: 'fog-act-1', title: 'Build Fog Catcher', type: 'SIMULATION', description: 'Design a fog collection system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'fog-game', title: 'Cloud Catcher', type: 'simulation', description: 'Harvest water from fog', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'fog-q1', question: 'Where do fog collectors work best?', options: ['In deserts far from water', 'On coastal mountains with regular fog', 'In tropical rainforests', 'In flat plains'], correctAnswer: 1, explanation: 'Fog collectors work best on coastal mountains where fog is frequent and persistent.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 15: Wetlands Conservation
export const wetlandsConservation: Module = {
  id: 'water-wetlands', slug: 'wetlands-conservation', title: 'Wetlands Conservation',
  description: { ELEMENTARY: 'Learn about amazing swamps, marshes, and bogs that clean our water!', MIDDLE_SCHOOL: 'Discover how wetlands filter water, prevent floods, and support wildlife.', HIGH_SCHOOL: 'Explore wetland ecology, ecosystem services, and restoration techniques.', UNDERGRADUATE: 'Analyze wetland hydrology, biogeochemistry, and functional assessment.', GRADUATE: 'Examine wetland mitigation banking, policy frameworks, and constructed wetlands.', PHD: 'Research wetland carbon dynamics, blue carbon, and climate change impacts.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'wet-1', title: 'Nature\'s Sponges', content: { ELEMENTARY: '<h2>Super Swamps!</h2><p>Wetlands are like giant sponges that soak up water and clean it naturally!</p>', MIDDLE_SCHOOL: '<h2>Wetland Services</h2><p>Flood control, water purification, habitat, groundwater recharge, carbon storage. Lost 50%+ globally since 1900.</p>', HIGH_SCHOOL: '<h2>Wetland Types</h2><p>Marshes (emergent vegetation), swamps (trees), bogs (acidic, peat), fens (alkaline). Each provides different services.</p>', UNDERGRADUATE: '<h2>Wetland Function</h2><p>Hydroperiod, hydropattern, water budget. Nutrient cycling, denitrification, sediment trapping, contaminant removal.</p>', GRADUATE: '<h2>Policy & Management</h2><p>Clean Water Act Section 404, no net loss policy, mitigation banking, functional assessment methods.</p>', PHD: '<h2>Climate Interactions</h2><p>Blue carbon sequestration, methane emissions, sea level rise impacts, peatland restoration.</p>' } }],
  activities: [{ id: 'wet-act-1', title: 'Wetland Explorer', type: 'SIMULATION', description: 'Explore wetland ecosystems', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'wet-game', title: 'Wetland Guardian', type: 'simulation', description: 'Protect and restore wetlands', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'wet-q1', question: 'What do wetlands do for water?', options: ['Make it dirtier', 'Filter and clean it naturally', 'Heat it up', 'Make it salty'], correctAnswer: 1, explanation: 'Wetlands naturally filter and clean water as it passes through.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 16: Water Rights & Policy
export const waterRightsPolicy: Module = {
  id: 'water-policy', slug: 'water-rights-policy', title: 'Water Rights & Policy',
  description: { ELEMENTARY: 'Learn who gets to use water and why sharing is important!', MIDDLE_SCHOOL: 'Discover how water is divided up and the rules that protect it.', HIGH_SCHOOL: 'Explore water law, allocation systems, and environmental regulations.', UNDERGRADUATE: 'Analyze riparian vs. prior appropriation, water markets, and transboundary issues.', GRADUATE: 'Examine water governance frameworks, environmental flows, and conflict resolution.', PHD: 'Research water justice, indigenous water rights, and emerging legal frameworks.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'policy-1', title: 'Sharing Water Fairly', content: { ELEMENTARY: '<h2>Water Rules!</h2><p>Just like taking turns on the playground, we have rules for sharing water fairly!</p>', MIDDLE_SCHOOL: '<h2>Water Allocation</h2><p>Different systems: first in time (prior appropriation), next to water (riparian), or permits. Droughts create conflicts.</p>', HIGH_SCHOOL: '<h2>Water Law Systems</h2><p>Prior appropriation (Western US): "first in time, first in right." Riparian (Eastern US): reasonable use by adjacent landowners.</p>', UNDERGRADUATE: '<h2>Allocation Mechanisms</h2><p>Administrative allocation, water markets/trading, adjudication. Challenges: overallocation, environmental needs, climate change.</p>', GRADUATE: '<h2>Water Governance</h2><p>Multi-level governance, stakeholder participation, environmental flows, interstate compacts, international treaties.</p>', PHD: '<h2>Justice & Rights</h2><p>Human right to water, indigenous water rights, procedural justice, equitable allocation under scarcity.</p>' } }],
  activities: [{ id: 'policy-act-1', title: 'Water Court', type: 'SCENARIO', description: 'Resolve water allocation disputes', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'policy-game', title: 'Water Diplomat', type: 'simulation', description: 'Negotiate water agreements', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'policy-q1', question: 'What does "prior appropriation" mean?', options: ['Everyone shares equally', 'First to use water has priority', 'Only landowners can use water', 'Government controls all water'], correctAnswer: 1, explanation: 'Prior appropriation means those who first started using water have priority rights.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 17: Aquifer Recharge
export const aquiferRecharge: Module = {
  id: 'water-recharge', slug: 'aquifer-recharge', title: 'Aquifer Recharge',
  description: { ELEMENTARY: 'Learn how we help refill underground water storage!', MIDDLE_SCHOOL: 'Discover how water gets back into underground aquifers.', HIGH_SCHOOL: 'Explore managed aquifer recharge techniques and benefits.', UNDERGRADUATE: 'Analyze MAR system design, hydrogeology, and water quality considerations.', GRADUATE: 'Examine ASR, groundwater banking, and conjunctive use management.', PHD: 'Research reactive transport, clogging mechanisms, and emerging recharge technologies.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'recharge-1', title: 'Refilling Underground', content: { ELEMENTARY: '<h2>Filling Underground Tanks!</h2><p>We can help put water back underground where it\'s stored safely for later!</p>', MIDDLE_SCHOOL: '<h2>Natural vs Managed Recharge</h2><p>Rain naturally recharges aquifers slowly. We can speed it up with spreading basins, injection wells, or infiltration galleries.</p>', HIGH_SCHOOL: '<h2>MAR Techniques</h2><p>Surface spreading (basins, channels), vadose zone (dry wells), saturated zone (ASR wells). Site selection based on geology.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Hydrogeologic characterization, infiltration testing, pretreatment requirements, monitoring network design.</p>', GRADUATE: '<h2>Groundwater Banking</h2><p>Conjunctive use, storage credits, recovery efficiency, water quality changes during storage.</p>', PHD: '<h2>Research Areas</h2><p>Reactive transport modeling, bioclogging, redox changes, trace organic fate, stormwater recharge.</p>' } }],
  activities: [{ id: 'recharge-act-1', title: 'Recharge Designer', type: 'SIMULATION', description: 'Design an aquifer recharge project', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'recharge-game', title: 'Aquifer Banker', type: 'simulation', description: 'Manage groundwater storage', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'recharge-q1', question: 'What is aquifer recharge?', options: ['Removing water from underground', 'Adding water back to underground storage', 'Cleaning underground tanks', 'Building underground pipes'], correctAnswer: 1, explanation: 'Aquifer recharge is the process of adding water back into underground aquifers.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 18: Water-Efficient Landscaping
export const waterEfficientLandscaping: Module = {
  id: 'water-landscape', slug: 'water-efficient-landscaping', title: 'Water-Efficient Landscaping',
  description: { ELEMENTARY: 'Learn how to have a beautiful garden that doesn\'t need lots of water!', MIDDLE_SCHOOL: 'Discover xeriscaping and drought-tolerant landscaping techniques.', HIGH_SCHOOL: 'Explore landscape design principles for water conservation.', UNDERGRADUATE: 'Analyze plant water requirements, irrigation efficiency, and landscape water budgets.', GRADUATE: 'Examine urban landscape water policy, outdoor water use regulations, and incentive programs.', PHD: 'Research urban heat island mitigation, ecosystem services of landscapes, and behavioral change.' },
  topic: 'water-systems',
  estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'land-1', title: 'Smart Gardens', content: { ELEMENTARY: '<h2>Thirsty vs Tough Plants!</h2><p>Some plants need lots of water, but many beautiful plants can grow with very little!</p>', MIDDLE_SCHOOL: '<h2>Xeriscaping Principles</h2><p>1) Plan and design, 2) Soil improvement, 3) Efficient irrigation, 4) Mulch, 5) Appropriate turf, 6) Native/drought-tolerant plants, 7) Maintenance.</p>', HIGH_SCHOOL: '<h2>Design Strategies</h2><p>Hydrozoning (group plants by water needs), reduce turf, capture rainwater, use mulch (reduces evaporation 70%), smart controllers.</p>', UNDERGRADUATE: '<h2>Landscape Water Budget</h2><p>ET-based calculations, WUCOLS database, irrigation scheduling, distribution uniformity audits.</p>', GRADUATE: '<h2>Policy Tools</h2><p>Model Water Efficient Landscape Ordinance, turf replacement rebates, water budgets, enforcement.</p>', PHD: '<h2>Research Questions</h2><p>Landscape-scale water savings, behavioral persistence, ecosystem services quantification, equity in green space.</p>' } }],
  activities: [{ id: 'land-act-1', title: 'Design a Xeriscape', type: 'SIMULATION', description: 'Create a water-wise landscape', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'land-game', title: 'Garden Designer', type: 'puzzle', description: 'Create water-efficient gardens', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'land-q1', question: 'What is xeriscaping?', options: ['Watering plants extra', 'Landscaping that needs little water', 'Using only grass', 'Removing all plants'], correctAnswer: 1, explanation: 'Xeriscaping is a landscaping approach designed to reduce or eliminate the need for irrigation.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 19: Water Pumps & Distribution
export const waterPumpsDistribution: Module = {
  id: 'water-pumps', slug: 'water-pumps-distribution', title: 'Water Pumps & Distribution',
  description: { ELEMENTARY: 'Learn how water travels through pipes to your home!', MIDDLE_SCHOOL: 'Discover how pumps move water through distribution systems.', HIGH_SCHOOL: 'Explore pump types, hydraulics, and distribution network design.', UNDERGRADUATE: 'Analyze pump curves, system curves, and network modeling.', GRADUATE: 'Examine distribution system optimization, energy efficiency, and pressure management.', PHD: 'Research smart water networks, real-time control, and digital twins.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'pump-1', title: 'Moving Water', content: { ELEMENTARY: '<h2>Water Highways!</h2><p>Pumps push water through pipes like a heart pumps blood!</p>', MIDDLE_SCHOOL: '<h2>How Pumps Work</h2><p>Centrifugal pumps spin water outward. Positive displacement pumps push directly.</p>', HIGH_SCHOOL: '<h2>Distribution Systems</h2><p>Network of mains, service lines, valves, hydrants. Pressure zones for reliability.</p>', UNDERGRADUATE: '<h2>Hydraulic Analysis</h2><p>Hazen-Williams equation, pump curves, system head curves, EPANET modeling.</p>', GRADUATE: '<h2>System Optimization</h2><p>Pressure management, variable speed drives, district metering areas.</p>', PHD: '<h2>Smart Networks</h2><p>SCADA, sensors, real-time modeling, predictive maintenance, ML applications.</p>' } }],
  activities: [{ id: 'pump-act-1', title: 'Design Distribution', type: 'SIMULATION', description: 'Design a water distribution network', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'pump-game', title: 'Network Engineer', type: 'puzzle', description: 'Build efficient water networks', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'pump-q1', question: 'What do water pumps do?', options: ['Clean water', 'Move water through pipes', 'Heat water', 'Store water'], correctAnswer: 1, explanation: 'Pumps move water through distribution pipes.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 20: Water Recycling & Reuse
export const waterRecyclingReuse: Module = {
  id: 'water-recycling', slug: 'water-recycling-reuse', title: 'Water Recycling & Reuse',
  description: { ELEMENTARY: 'Learn how used water can be cleaned and used again!', MIDDLE_SCHOOL: 'Discover how cities recycle water for different uses.', HIGH_SCHOOL: 'Explore water reuse applications, treatment requirements, and regulations.', UNDERGRADUATE: 'Analyze advanced treatment for potable and non-potable reuse.', GRADUATE: 'Examine direct potable reuse, public perception, and regulatory frameworks.', PHD: 'Research trace contaminant removal, risk assessment, and reuse policy innovation.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'recycle-1', title: 'Water\'s Second Life', content: { ELEMENTARY: '<h2>Water Goes Around!</h2><p>Just like recycling bottles, we can clean used water and use it again!</p>', MIDDLE_SCHOOL: '<h2>Reuse Types</h2><p>Non-potable: irrigation, industrial. Potable: indirect or direct. Treatment varies.</p>', HIGH_SCHOOL: '<h2>Treatment for Reuse</h2><p>Beyond secondary: MF/UF, RO, UV/AOP. Purple pipe for non-potable.</p>', UNDERGRADUATE: '<h2>Advanced Treatment</h2><p>Full advanced treatment: MF, RO, UV/AOP. Monitoring and reliability requirements.</p>', GRADUATE: '<h2>Direct Potable Reuse</h2><p>Emerging practice, highest treatment, real-time monitoring, public outreach.</p>', PHD: '<h2>Research Frontiers</h2><p>CEC fate, QMRA for pathogens, public acceptance, fit-for-purpose optimization.</p>' } }],
  activities: [{ id: 'recycle-act-1', title: 'Reuse Planner', type: 'SIMULATION', description: 'Design a water reuse system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'recycle-game', title: 'Water Recycler', type: 'simulation', description: 'Manage water recycling', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'recycle-q1', question: 'What color pipes carry recycled water?', options: ['Blue', 'Purple', 'Green', 'Red'], correctAnswer: 1, explanation: 'Purple pipes indicate recycled water for non-potable uses.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 21: Arid Climate Water Solutions
export const aridClimateWater: Module = {
  id: 'water-arid', slug: 'arid-climate-water', title: 'Arid Climate Water Solutions',
  description: { ELEMENTARY: 'Learn how people find water in dry desert places!', MIDDLE_SCHOOL: 'Discover water strategies for desert and drought-prone regions.', HIGH_SCHOOL: 'Explore water management in arid climates.', UNDERGRADUATE: 'Analyze water supply portfolios for water-scarce regions.', GRADUATE: 'Examine integrated strategies for sustainable water in arid environments.', PHD: 'Research climate adaptation, water security, and innovations for water-stressed regions.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'arid-1', title: 'Desert Water', content: { ELEMENTARY: '<h2>Finding Water in Dry Places!</h2><p>Even in deserts, people find clever ways to get water!</p>', MIDDLE_SCHOOL: '<h2>Arid Water Sources</h2><p>Deep aquifers, imported water, desalination, rainwater, recycling.</p>', HIGH_SCHOOL: '<h2>Arid Water Strategies</h2><p>Demand management, efficient irrigation, groundwater banking, traditional methods (qanats).</p>', UNDERGRADUATE: '<h2>Portfolio Approach</h2><p>Diversified supplies, conjunctive use, drought contingency, economic allocation.</p>', GRADUATE: '<h2>Integrated Management</h2><p>Climate projections, adaptive pathways, governance challenges, transboundary cooperation.</p>', PHD: '<h2>Research Needs</h2><p>Non-conventional water, atmospheric harvesting, demand elasticity, sustainable yield.</p>' } }],
  activities: [{ id: 'arid-act-1', title: 'Desert Water Plan', type: 'SCENARIO', description: 'Plan water for an arid city', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'arid-game', title: 'Desert Manager', type: 'simulation', description: 'Manage water in dry climates', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'arid-q1', question: 'What is a qanat?', options: ['A cactus', 'An ancient underground water channel', 'A desert animal', 'A water bottle'], correctAnswer: 1, explanation: 'Qanats are ancient underground channels bringing water from mountains.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

// Module 22: Water Leak Detection
export const waterLeakDetection: Module = {
  id: 'water-leaks', slug: 'water-leak-detection', title: 'Water Leak Detection',
  description: { ELEMENTARY: 'Learn how to find sneaky water leaks!', MIDDLE_SCHOOL: 'Discover tools and techniques for finding hidden water leaks.', HIGH_SCHOOL: 'Explore leak detection methods from acoustic to satellite-based.', UNDERGRADUATE: 'Analyze non-revenue water, leak detection technologies, and asset management.', GRADUATE: 'Examine economic level of leakage, pressure management, and loss reduction.', PHD: 'Research AI-based leak detection, pipe condition assessment, and optimal replacement.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'leak-1', title: 'Finding Leaks', content: { ELEMENTARY: '<h2>Water Detectives!</h2><p>A dripping faucet wastes 3,000 gallons a year!</p>', MIDDLE_SCHOOL: '<h2>Leak Detection</h2><p>Listen for sounds, check meter, dye tablets, acoustic sensors.</p>', HIGH_SCHOOL: '<h2>Detection Tech</h2><p>Acoustic loggers, correlators, GPR, infrared, satellite imagery.</p>', UNDERGRADUATE: '<h2>Non-Revenue Water</h2><p>Real losses + apparent losses. IWA water balance. Economic level of leakage.</p>', GRADUATE: '<h2>Loss Reduction</h2><p>Active leakage control, pressure management, asset management.</p>', PHD: '<h2>Advanced Detection</h2><p>ML for leak prediction, smart meter analytics, digital twins.</p>' } }],
  activities: [{ id: 'leak-act-1', title: 'Leak Hunter', type: 'SIMULATION', description: 'Find and fix water leaks', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'leak-game', title: 'Leak Detective', type: 'puzzle', description: 'Hunt down water leaks', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'leak-q1', question: 'How much can a dripping faucet waste yearly?', options: ['30 gallons', '300 gallons', '3,000 gallons', '30,000 gallons'], correctAnswer: 2, explanation: 'A dripping faucet wastes about 3,000 gallons per year.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 23: Constructed Wetlands
export const constructedWetlands: Module = {
  id: 'water-constructed-wetlands', slug: 'constructed-wetlands', title: 'Constructed Wetlands',
  description: { ELEMENTARY: 'Learn how we build special swamps to clean water!', MIDDLE_SCHOOL: 'Discover how engineered wetlands treat wastewater using nature.', HIGH_SCHOOL: 'Explore constructed wetland design, types, and treatment mechanisms.', UNDERGRADUATE: 'Analyze wetland hydraulics, vegetation selection, and sizing methods.', GRADUATE: 'Examine hybrid systems, performance optimization, and emerging applications.', PHD: 'Research microbial processes, nutrient dynamics, and wetland modeling.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'cw-1', title: 'Built Wetlands', content: { ELEMENTARY: '<h2>Nature\'s Water Cleaners!</h2><p>We build wetlands with plants to clean dirty water!</p>', MIDDLE_SCHOOL: '<h2>How They Work</h2><p>Plant roots support bacteria. Water flows slowly, pollutants removed.</p>', HIGH_SCHOOL: '<h2>Wetland Types</h2><p>Free water surface, horizontal subsurface flow, vertical flow.</p>', UNDERGRADUATE: '<h2>Design Parameters</h2><p>Hydraulic loading, retention time, media selection, plant species.</p>', GRADUATE: '<h2>Advanced Systems</h2><p>Hybrid systems, tidal flow, aerated wetlands, integration with conventional.</p>', PHD: '<h2>Research Areas</h2><p>N removal pathways, P saturation, pharmaceutical removal, modeling.</p>' } }],
  activities: [{ id: 'cw-act-1', title: 'Design a Wetland', type: 'SIMULATION', description: 'Build a treatment wetland', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'cw-game', title: 'Wetland Builder', type: 'simulation', description: 'Create treatment wetlands', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'cw-q1', question: 'What cleans water in constructed wetlands?', options: ['Chemicals only', 'Plants and microbes', 'Heat', 'Electricity'], correctAnswer: 1, explanation: 'Constructed wetlands use plants and microbes to clean water.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 24: Flood Control & Management
export const floodControl: Module = {
  id: 'water-flood', slug: 'flood-control', title: 'Flood Control & Management',
  description: { ELEMENTARY: 'Learn how we protect communities from too much water!', MIDDLE_SCHOOL: 'Discover how cities manage flooding and protect people.', HIGH_SCHOOL: 'Explore structural and non-structural flood management approaches.', UNDERGRADUATE: 'Analyze flood hydrology, risk assessment, and mitigation strategies.', GRADUATE: 'Examine integrated flood management, climate adaptation, and resilience.', PHD: 'Research flood modeling, nature-based solutions, and managed retreat.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'flood-1', title: 'Managing Floods', content: { ELEMENTARY: '<h2>Taming Wild Water!</h2><p>Special ways keep communities safe from flooding!</p>', MIDDLE_SCHOOL: '<h2>Flood Protection</h2><p>Levees, dams, channels, detention basins, floodplains, warning systems.</p>', HIGH_SCHOOL: '<h2>Management Approaches</h2><p>Structural (levees, dams), non-structural (zoning, insurance), green infrastructure.</p>', UNDERGRADUATE: '<h2>Flood Hydrology</h2><p>Return periods, flood frequency, hydrographs, runoff models, design storms.</p>', GRADUATE: '<h2>Integrated Management</h2><p>Risk-based approaches, climate projections, ecosystem-based adaptation.</p>', PHD: '<h2>Research Frontiers</h2><p>Compound flooding, uncertainty, nature-based solutions, managed retreat.</p>' } }],
  activities: [{ id: 'flood-act-1', title: 'Flood Defense', type: 'SIMULATION', description: 'Design flood protection', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'flood-game', title: 'Flood Manager', type: 'simulation', description: 'Protect communities from floods', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'flood-q1', question: 'What is a levee?', options: ['A type of fish', 'A wall to hold back flood water', 'A water pump', 'A rain gauge'], correctAnswer: 1, explanation: 'A levee holds back flood water.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 25: Water Meters & Smart Monitoring
export const waterMetersMonitoring: Module = {
  id: 'water-meters', slug: 'water-meters-monitoring', title: 'Water Meters & Smart Monitoring',
  description: { ELEMENTARY: 'Learn how we measure water use!', MIDDLE_SCHOOL: 'Discover how water meters work and help save water.', HIGH_SCHOOL: 'Explore metering technologies, AMI systems, and data analytics.', UNDERGRADUATE: 'Analyze meter selection, accuracy, and smart metering benefits.', GRADUATE: 'Examine AMI implementation, data analytics, and demand management.', PHD: 'Research high-resolution consumption data, behavioral insights, and AI applications.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'meter-1', title: 'Measuring Water', content: { ELEMENTARY: '<h2>Counting Water Drops!</h2><p>Meters count how much water your family uses!</p>', MIDDLE_SCHOOL: '<h2>How Meters Work</h2><p>Mechanical meters spin. Smart meters send data wirelessly.</p>', HIGH_SCHOOL: '<h2>Meter Technologies</h2><p>Positive displacement, multi-jet, ultrasonic, electromagnetic. AMR vs AMI.</p>', UNDERGRADUATE: '<h2>Smart Metering</h2><p>AMI architecture, data transmission, meter data management, leak alerts.</p>', GRADUATE: '<h2>Data Analytics</h2><p>End-use disaggregation, demand forecasting, customer segmentation.</p>', PHD: '<h2>Research</h2><p>High-frequency data mining, behavioral economics, privacy considerations.</p>' } }],
  activities: [{ id: 'meter-act-1', title: 'Read Your Meter', type: 'STEP_GUIDED', description: 'Learn to read water meters', estimatedMinutes: 15, interactiveContent: {} }],
  game: { id: 'meter-game', title: 'Meter Reader', type: 'puzzle', description: 'Track water usage', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'meter-q1', question: 'What do smart water meters do?', options: ['Make water taste better', 'Record and send usage data', 'Heat water', 'Filter water'], correctAnswer: 1, explanation: 'Smart meters record and send usage data wirelessly.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 26: Spring Water & Natural Sources
export const springWaterSources: Module = {
  id: 'water-springs', slug: 'spring-water-sources', title: 'Spring Water & Natural Sources',
  description: { ELEMENTARY: 'Learn where water bubbles up from the ground!', MIDDLE_SCHOOL: 'Discover how springs form and provide natural water.', HIGH_SCHOOL: 'Explore spring hydrology, development, and protection.', UNDERGRADUATE: 'Analyze spring types, capture systems, and sustainable yield.', GRADUATE: 'Examine spring ecosystems, climate sensitivity, and conservation.', PHD: 'Research spring discharge dynamics, isotope hydrology, and ecosystem dependence.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'spring-1', title: 'Natural Springs', content: { ELEMENTARY: '<h2>Water Fountains in Nature!</h2><p>Springs are where water comes out of the ground by itself!</p>', MIDDLE_SCHOOL: '<h2>How Springs Form</h2><p>Groundwater finds a path to surface. Gravity springs, artesian springs, hot springs.</p>', HIGH_SCHOOL: '<h2>Spring Types</h2><p>Contact springs, fault springs, artesian, karst. Flow varies seasonally.</p>', UNDERGRADUATE: '<h2>Spring Development</h2><p>Spring boxes, collection galleries, contamination protection, sustainable yield.</p>', GRADUATE: '<h2>Conservation</h2><p>Springs as groundwater windows, ecosystem dependence, climate impacts.</p>', PHD: '<h2>Research Methods</h2><p>Hydrograph analysis, isotopic signatures, residence time, ecology.</p>' } }],
  activities: [{ id: 'spring-act-1', title: 'Spring Survey', type: 'SIMULATION', description: 'Find and assess natural springs', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'spring-game', title: 'Spring Finder', type: 'puzzle', description: 'Discover natural water sources', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'spring-q1', question: 'What is a spring?', options: ['A coiled metal', 'Where groundwater comes to the surface', 'A season', 'A cloud'], correctAnswer: 1, explanation: 'A spring is where groundwater flows to the surface.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 27: Water Softening
export const waterSoftening: Module = {
  id: 'water-softening', slug: 'water-softening', title: 'Water Softening & Conditioning',
  description: { ELEMENTARY: 'Learn why some water feels slippery!', MIDDLE_SCHOOL: 'Discover what makes water hard and how softeners work.', HIGH_SCHOOL: 'Explore water hardness, softening methods, and impacts.', UNDERGRADUATE: 'Analyze ion exchange, alternative softening technologies.', GRADUATE: 'Examine utility softening, environmental impacts, and alternatives.', PHD: 'Research selective ion removal, membrane softening, brine management.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'soft-1', title: 'Hard vs Soft Water', content: { ELEMENTARY: '<h2>Soap Bubbles!</h2><p>Hard water has minerals. Soft water makes more bubbles!</p>', MIDDLE_SCHOOL: '<h2>Water Hardness</h2><p>Calcium and magnesium cause hardness. Creates scale. Softeners remove them.</p>', HIGH_SCHOOL: '<h2>Softening Methods</h2><p>Ion exchange (salt-based), lime softening, reverse osmosis.</p>', UNDERGRADUATE: '<h2>Ion Exchange</h2><p>Resin beads exchange sodium for calcium/magnesium. Regeneration cycle.</p>', GRADUATE: '<h2>Utility Softening</h2><p>Lime-soda process, pellet softening, nanofiltration, environmental impacts.</p>', PHD: '<h2>Research Areas</h2><p>Selective removal, brine minimization, resource recovery, health considerations.</p>' } }],
  activities: [{ id: 'soft-act-1', title: 'Test Hardness', type: 'STEP_GUIDED', description: 'Test water hardness levels', estimatedMinutes: 15, interactiveContent: {} }],
  game: { id: 'soft-game', title: 'Water Chemist', type: 'puzzle', description: 'Balance water chemistry', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'soft-q1', question: 'What minerals cause hard water?', options: ['Iron and copper', 'Calcium and magnesium', 'Sodium and potassium', 'Lead and zinc'], correctAnswer: 1, explanation: 'Calcium and magnesium cause water hardness.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 28: Emergency Water Supply
export const emergencyWaterSupply: Module = {
  id: 'water-emergency', slug: 'emergency-water-supply', title: 'Emergency Water Supply',
  description: { ELEMENTARY: 'Learn how to have safe water during emergencies!', MIDDLE_SCHOOL: 'Discover how to prepare for and handle water emergencies.', HIGH_SCHOOL: 'Explore emergency water planning, storage, and treatment.', UNDERGRADUATE: 'Analyze utility emergency response, system resilience, and recovery.', GRADUATE: 'Examine disaster response coordination, temporary systems, and mutual aid.', PHD: 'Research infrastructure resilience, cascading failures, and recovery optimization.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 65, GRADUATE: 90, PHD: 120 },
  lessons: [{ id: 'emerg-1', title: 'Water in Emergencies', content: { ELEMENTARY: '<h2>Be Prepared!</h2><p>Keep one gallon per person per day for three days!</p>', MIDDLE_SCHOOL: '<h2>Emergency Prep</h2><p>Store water, know how to purify. Rotate stored water every 6 months.</p>', HIGH_SCHOOL: '<h2>Emergency Response</h2><p>Boil water notices, alternative supplies, emergency treatment methods.</p>', UNDERGRADUATE: '<h2>System Resilience</h2><p>Vulnerability assessment, redundancy, emergency interconnections, backup power.</p>', GRADUATE: '<h2>Disaster Response</h2><p>Emergency operations, mutual aid, temporary distribution, communication.</p>', PHD: '<h2>Resilience Research</h2><p>Network analysis, cascading failures, climate extremes, recovery modeling.</p>' } }],
  activities: [{ id: 'emerg-act-1', title: 'Emergency Plan', type: 'SCENARIO', description: 'Create a water emergency plan', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'emerg-game', title: 'Emergency Manager', type: 'simulation', description: 'Handle water emergencies', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'emerg-q1', question: 'How much emergency water per person per day?', options: ['1 cup', '1 pint', '1 gallon', '10 gallons'], correctAnswer: 2, explanation: 'Store at least 1 gallon per person per day.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 29: Water & Public Health
export const waterPublicHealth: Module = {
  id: 'water-health', slug: 'water-public-health', title: 'Water & Public Health',
  description: { ELEMENTARY: 'Learn why clean water keeps us healthy!', MIDDLE_SCHOOL: 'Discover the connection between safe water and human health.', HIGH_SCHOOL: 'Explore waterborne diseases, water quality standards, and public health.', UNDERGRADUATE: 'Analyze drinking water regulations, risk assessment, and epidemiology.', GRADUATE: 'Examine WASH in development, water security, and health outcomes.', PHD: 'Research waterborne disease dynamics, emerging pathogens, and global health.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'health-1', title: 'Healthy Water', content: { ELEMENTARY: '<h2>Clean Water = Healthy You!</h2><p>Drinking clean water keeps germs away!</p>', MIDDLE_SCHOOL: '<h2>Water & Disease</h2><p>Contaminated water carries bacteria, viruses, parasites. Treatment prevents illness.</p>', HIGH_SCHOOL: '<h2>Water Quality Standards</h2><p>EPA sets limits: MCLs for contaminants. Regular testing required.</p>', UNDERGRADUATE: '<h2>Regulatory Framework</h2><p>SDWA, primacy, MCLs vs MCLGs, health advisories, risk assessment.</p>', GRADUATE: '<h2>Global WASH</h2><p>Water, sanitation, hygiene. SDG 6 targets, health burden of unsafe water.</p>', PHD: '<h2>Research Areas</h2><p>Emerging pathogens, climate-disease links, antibiotic resistance.</p>' } }],
  activities: [{ id: 'health-act-1', title: 'Disease Detective', type: 'SCENARIO', description: 'Trace a waterborne illness', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'health-game', title: 'Health Guardian', type: 'simulation', description: 'Protect community water health', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'health-q1', question: 'What can contaminated water carry?', options: ['Only dirt', 'Germs that make you sick', 'Vitamins', 'Nothing harmful'], correctAnswer: 1, explanation: 'Contaminated water carries bacteria, viruses, and parasites.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 30: Agricultural Water Management
export const agriculturalWater: Module = {
  id: 'water-agriculture', slug: 'agricultural-water', title: 'Agricultural Water Management',
  description: { ELEMENTARY: 'Learn how farmers water crops to grow food!', MIDDLE_SCHOOL: 'Discover irrigation methods and water use in farming.', HIGH_SCHOOL: 'Explore agricultural water efficiency and sustainability.', UNDERGRADUATE: 'Analyze crop water requirements and irrigation system design.', GRADUATE: 'Examine agricultural water policy and groundwater depletion.', PHD: 'Research precision agriculture, deficit irrigation, and virtual water trade.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'agri-1', title: 'Watering Crops', content: { ELEMENTARY: '<h2>Thirsty Plants!</h2><p>Farms use 70% of all water for growing food!</p>', MIDDLE_SCHOOL: '<h2>Irrigation Methods</h2><p>Flood, furrow, sprinkler, drip. Efficiency: flood 40%, drip 90%+.</p>', HIGH_SCHOOL: '<h2>Efficient Irrigation</h2><p>Scheduling by ET, soil moisture, plant stress. Deficit irrigation.</p>', UNDERGRADUATE: '<h2>Crop Water Needs</h2><p>Evapotranspiration, crop coefficients, water balance, productivity.</p>', GRADUATE: '<h2>Agricultural Policy</h2><p>Water pricing, subsidies, groundwater management, reallocation.</p>', PHD: '<h2>Research Frontiers</h2><p>Remote sensing, virtual water, water-food-energy nexus, climate adaptation.</p>' } }],
  activities: [{ id: 'agri-act-1', title: 'Farm Irrigator', type: 'SIMULATION', description: 'Manage farm water use', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'agri-game', title: 'Farm Manager', type: 'simulation', description: 'Grow crops efficiently', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'agri-q1', question: 'What % of water goes to agriculture globally?', options: ['About 10%', 'About 30%', 'About 70%', 'About 90%'], correctAnswer: 2, explanation: 'Agriculture uses about 70% of freshwater withdrawals.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 31: Industrial Water Use
export const industrialWater: Module = {
  id: 'water-industrial', slug: 'industrial-water', title: 'Industrial Water Use',
  description: { ELEMENTARY: 'Learn how factories use and save water!', MIDDLE_SCHOOL: 'Discover how industries use water in manufacturing.', HIGH_SCHOOL: 'Explore industrial water use, cooling systems, and efficiency.', UNDERGRADUATE: 'Analyze process water, cooling towers, and industrial reuse.', GRADUATE: 'Examine zero liquid discharge, industrial symbiosis, and water stewardship.', PHD: 'Research advanced industrial treatment, circular economy, and corporate water risk.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ind-1', title: 'Factory Water', content: { ELEMENTARY: '<h2>Water at Work!</h2><p>Factories use water for cooling, cleaning, and making products!</p>', MIDDLE_SCHOOL: '<h2>Industrial Uses</h2><p>Cooling (power plants), processing (food, paper), cleaning. Industry uses ~20% of withdrawals.</p>', HIGH_SCHOOL: '<h2>Water Systems</h2><p>Once-through cooling, cooling towers, process water, boiler feed water, wastewater treatment.</p>', UNDERGRADUATE: '<h2>Efficiency</h2><p>Water audits, recycling loops, cascade use, cooling tower optimization, pretreatment.</p>', GRADUATE: '<h2>Zero Liquid Discharge</h2><p>ZLD systems, brine concentration, crystallization, industrial symbiosis, water stewardship.</p>', PHD: '<h2>Research</h2><p>Fit-for-purpose treatment, advanced oxidation, resource recovery, corporate water accounting.</p>' } }],
  activities: [{ id: 'ind-act-1', title: 'Factory Water Audit', type: 'SIMULATION', description: 'Audit industrial water use', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ind-game', title: 'Industrial Manager', type: 'simulation', description: 'Optimize factory water use', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ind-q1', question: 'What % of water withdrawals go to industry?', options: ['About 5%', 'About 20%', 'About 50%', 'About 80%'], correctAnswer: 1, explanation: 'Industry uses about 20% of freshwater withdrawals globally.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Module 32: Water Careers
export const waterCareers: Module = {
  id: 'water-careers', slug: 'water-careers', title: 'Water Careers',
  description: { ELEMENTARY: 'Learn about jobs that help keep our water clean!', MIDDLE_SCHOOL: 'Discover careers in water science and engineering.', HIGH_SCHOOL: 'Explore water sector career paths and required education.', UNDERGRADUATE: 'Analyze professional opportunities in water resources.', GRADUATE: 'Examine leadership roles and specializations in water.', PHD: 'Research academic careers, policy roles, and innovation pathways.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 15, MIDDLE_SCHOOL: 25, HIGH_SCHOOL: 40, UNDERGRADUATE: 55, GRADUATE: 75, PHD: 100 },
  lessons: [{ id: 'career-1', title: 'Water Jobs', content: { ELEMENTARY: '<h2>Water Heroes!</h2><p>Many people work to keep our water safe - scientists, engineers, and operators!</p>', MIDDLE_SCHOOL: '<h2>Water Careers</h2><p>Hydrologists, water treatment operators, environmental engineers, scientists, planners.</p>', HIGH_SCHOOL: '<h2>Career Paths</h2><p>Operators (certification), technicians (2-year), engineers (BS/MS), scientists (MS/PhD), managers.</p>', UNDERGRADUATE: '<h2>Professional Development</h2><p>PE licensure, certifications, professional societies, continuing education, specializations.</p>', GRADUATE: '<h2>Leadership Roles</h2><p>Utility management, consulting, policy, research direction, entrepreneurship.</p>', PHD: '<h2>Advanced Paths</h2><p>Academic positions, research leadership, policy advisory, international development, innovation.</p>' } }],
  activities: [{ id: 'career-act-1', title: 'Career Explorer', type: 'SCENARIO', description: 'Explore water career paths', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'career-game', title: 'Career Builder', type: 'puzzle', description: 'Build your water career path', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'career-q1', question: 'Who studies where water comes from and goes?', options: ['Hydrologist', 'Dentist', 'Chef', 'Pilot'], correctAnswer: 0, explanation: 'Hydrologists study the movement and distribution of water.', difficulty: LearningLevel.ELEMENTARY }] }
}

// Module 33: Ocean & Coastal Water
export const oceanCoastalWater: Module = {
  id: 'water-ocean', slug: 'ocean-coastal-water', title: 'Ocean & Coastal Water',
  description: { ELEMENTARY: 'Learn about the ocean and beaches where land meets sea!', MIDDLE_SCHOOL: 'Discover coastal ecosystems and ocean-freshwater connections.', HIGH_SCHOOL: 'Explore coastal water management, saltwater intrusion, and blue economy.', UNDERGRADUATE: 'Analyze coastal hydrology, estuarine dynamics, and sea level rise impacts.', GRADUATE: 'Examine integrated coastal zone management and climate adaptation.', PHD: 'Research ocean-atmosphere interactions, blue carbon, and coastal resilience.' },
  topic: 'water-systems', estimatedMinutes: { ELEMENTARY: 20, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 95, PHD: 125 },
  lessons: [{ id: 'ocean-1', title: 'Where Rivers Meet the Sea', content: { ELEMENTARY: '<h2>Ocean Adventures!</h2><p>The ocean holds most of Earth\'s water. Rivers carry freshwater to meet the salty sea!</p>', MIDDLE_SCHOOL: '<h2>Coastal Waters</h2><p>Estuaries mix fresh and salt water. Important habitats, nurseries for fish, vulnerable to pollution.</p>', HIGH_SCHOOL: '<h2>Coastal Challenges</h2><p>Saltwater intrusion, sea level rise, storm surge, coastal erosion, pollution from land.</p>', UNDERGRADUATE: '<h2>Coastal Hydrology</h2><p>Tidal dynamics, salinity gradients, submarine groundwater discharge, coastal aquifers.</p>', GRADUATE: '<h2>Integrated Management</h2><p>ICZM frameworks, managed retreat, living shorelines, ecosystem-based adaptation.</p>', PHD: '<h2>Research Frontiers</h2><p>Blue carbon quantification, ocean acidification impacts, coastal megacity resilience.</p>' } }],
  activities: [{ id: 'ocean-act-1', title: 'Coastal Explorer', type: 'SIMULATION', description: 'Explore coastal water systems', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ocean-game', title: 'Coastal Guardian', type: 'simulation', description: 'Protect coastal waters', difficulty: { ELEMENTARY: { lives: 5, timeLimit: null, hints: true }, MIDDLE_SCHOOL: { lives: 4, timeLimit: 300, hints: true }, HIGH_SCHOOL: { lives: 3, timeLimit: 240, hints: false }, UNDERGRADUATE: { lives: 3, timeLimit: 180, hints: false }, GRADUATE: { lives: 2, timeLimit: 120, hints: false }, PHD: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ocean-q1', question: 'What is an estuary?', options: ['A type of boat', 'Where rivers meet the ocean', 'An underground lake', 'A type of cloud'], correctAnswer: 1, explanation: 'An estuary is where freshwater rivers meet the salty ocean.', difficulty: LearningLevel.ELEMENTARY }] }
}

export const waterSystemsModules: Module[] = [
  greywaterSystems,
  dripIrrigation,
  wellWaterSystems,
  waterFiltration,
  stormwaterManagement,
  desalination,
  wastewaterTreatment,
  watershedProtection,
  waterQualityTesting,
  waterStorageTanks,
  fogCollection,
  wetlandsConservation,
  waterRightsPolicy,
  aquiferRecharge,
  waterEfficientLandscaping,
  waterPumpsDistribution,
  waterRecyclingReuse,
  aridClimateWater,
  waterLeakDetection,
  constructedWetlands,
  floodControl,
  waterMetersMonitoring,
  springWaterSources,
  waterSoftening,
  emergencyWaterSupply,
  waterPublicHealth,
  agriculturalWater,
  industrialWater,
  waterCareers,
  oceanCoastalWater,
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
