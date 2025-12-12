// Water Systems Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const waterSystemsModules: Module[] = [
  // Module 1: Rainwater Harvesting
  {
    id: 'water-rainwater',
    slug: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: {
      ELEMENTARY: 'Learn how to catch rain and save it for later!',
      MIDDLE_SCHOOL: 'Discover systems to collect and store rainwater for home use.',
      HIGH_SCHOOL: 'Explore rainwater collection, storage, filtration, and uses.',
      UNDERGRADUATE: 'Analyze rainwater harvesting system design, sizing, and water quality.',
      GRADUATE: 'Examine policy frameworks, large-scale systems, and climate resilience.',
      PHD: 'Research optimal harvesting strategies, water quality modeling, and integrated systems.'
    },
    topic: 'water-systems',
    category: 'COLLECTION',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-rain-1',
        title: 'Catching the Rain',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌧️ Free Water from the Sky!</h2><p>When it rains, all that water can be collected and saved!</p><h3>How We Catch Rain</h3><ul><li>☔ Rain falls on roofs</li><li>🏠 Gutters channel the water</li><li>🪣 Barrels store the water</li><li>🌱 Plants get watered!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Rainwater Collection Systems</h2><h3>Basic Components</h3><ul><li><strong>Catchment:</strong> Roof surface</li><li><strong>Conveyance:</strong> Gutters and downspouts</li><li><strong>First flush:</strong> Diverts dirty first rain</li><li><strong>Storage:</strong> Tanks or cisterns</li><li><strong>Distribution:</strong> Pumps and pipes</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>System Design</h2><h3>Calculating Potential</h3><p>Harvest = Rainfall × Roof Area × Collection Efficiency (typically 0.75-0.85)</p><h3>Water Quality</h3><ul><li>Roof material matters</li><li>First flush diversion essential</li><li>Filtration and treatment options</li><li>End use determines treatment level</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Engineering Considerations</h2><h3>System Sizing</h3><ul><li>Supply-demand analysis</li><li>Dry period bridging</li><li>Tank optimization</li><li>Cost-benefit analysis</li></ul><h3>Treatment Trains</h3><p>Sediment → Carbon → UV/Chlorine for potable use.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Policy and Scale</h2><h3>Regulatory Landscape</h3><ul><li>Incentive programs</li><li>Building code integration</li><li>Water rights issues</li></ul><h3>Community Systems</h3><p>Shared catchment, distributed storage, and stormwater integration.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Climate change impacts on reliability</li><li>Emerging contaminants</li><li>Smart system optimization</li><li>Life cycle assessment</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-rain-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Rain Barrel!',
          MIDDLE_SCHOOL: 'Design Your System',
          HIGH_SCHOOL: 'Calculate Collection',
          UNDERGRADUATE: 'System Optimization',
          GRADUATE: 'Policy Analysis',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'Set up a rain barrel to collect water!',
          MIDDLE_SCHOOL: 'Design a complete rainwater collection system.',
          HIGH_SCHOOL: 'Calculate potential harvest for your location.',
          UNDERGRADUATE: 'Optimize system sizing for reliability.',
          GRADUATE: 'Analyze policy options for rainwater incentives.',
          PHD: 'Design research on system performance.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-rain-game',
      type: 'simulation',
      title: 'Rain Catcher',
      description: 'Design and manage rainwater harvesting systems!',
      rounds: 5,
      timeLimit: 40,
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
      id: 'ws-rain-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wrq1',
          question: {
            ELEMENTARY: 'Where does rainwater get collected from?',
            MIDDLE_SCHOOL: 'What does first flush diversion do?',
            HIGH_SCHOOL: 'What affects collection efficiency?',
            UNDERGRADUATE: 'What is supply-demand analysis for?',
            GRADUATE: 'What policy challenge exists for rainwater harvesting?',
            PHD: 'How does climate change affect rainwater harvesting?'
          },
          options: {
            ELEMENTARY: ['Rooftops', 'Underground', 'Lakes', 'Oceans'],
            MIDDLE_SCHOOL: ['Removes dirty first rain', 'Collects more water', 'Heats the water', 'Filters air'],
            HIGH_SCHOOL: ['Roof material, gutters, first flush', 'Color of house', 'Time of year only', 'Nothing'],
            UNDERGRADUATE: ['Tank sizing optimization', 'Choosing roof color', 'Selecting plants', 'Weather prediction'],
            GRADUATE: ['Water rights in some jurisdictions', 'Always encouraged', 'No challenges exist', 'Too expensive everywhere'],
            PHD: ['Changes rainfall patterns and reliability', 'No effect', 'Only positive effects', 'Eliminates need for systems']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Rain falls on rooftops and we collect it through gutters!',
            MIDDLE_SCHOOL: 'First flush diverts the initial dirty rainwater away from storage.',
            HIGH_SCHOOL: 'Collection efficiency depends on roof material, gutter design, and first flush systems.',
            UNDERGRADUATE: 'Supply-demand analysis matches storage size to rainfall patterns and water needs.',
            GRADUATE: 'Some areas have water rights laws that complicate rainwater collection.',
            PHD: 'Climate change alters precipitation patterns, affecting system reliability and design.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Rainwater Catchment Association', url: 'https://www.arcsa.org/', type: 'research' },
      { title: 'EPA Rainwater Harvesting', url: 'https://www.epa.gov/watersense', type: 'article' }
    ]
  },
  // Module 2: Greywater Systems
  {
    id: 'water-greywater',
    slug: 'greywater-systems',
    title: 'Greywater Systems',
    description: {
      ELEMENTARY: 'Learn how to reuse water from sinks and showers to water plants!',
      MIDDLE_SCHOOL: 'Discover how greywater recycling works in homes and buildings.',
      HIGH_SCHOOL: 'Explore greywater treatment, regulations, and landscape irrigation.',
      UNDERGRADUATE: 'Analyze greywater system design, treatment options, and health considerations.',
      GRADUATE: 'Examine greywater policy, public acceptance, and integrated reuse strategies.',
      PHD: 'Research advanced greywater treatment, pathogen risk assessment, and water quality modeling.'
    },
    topic: 'water-systems',
    category: 'REUSE',
    icon: 'Recycle',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-grey-1',
        title: 'Water Gets a Second Life',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🚿 Water's Second Chance!</h2><p>Water from your shower can water your garden instead of going down the drain!</p><h3>Which Water Can We Reuse?</h3><ul><li>🚿 Shower and bath water</li><li>🧼 Sink water</li><li>👕 Laundry water</li><li>❌ NOT toilet water!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>What is Greywater?</h2><h3>Greywater vs Blackwater</h3><ul><li><strong>Greywater:</strong> From sinks, showers, laundry</li><li><strong>Blackwater:</strong> From toilets (needs special treatment)</li></ul><h3>Simple Uses</h3><p>Irrigating trees, gardens, and lawns. Must use plant-safe soaps!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Greywater Systems</h2><h3>System Types</h3><ul><li><strong>Laundry to landscape:</strong> Simplest, direct to mulch basins</li><li><strong>Branched drain:</strong> Gravity-fed distribution</li><li><strong>Treatment systems:</strong> For above-ground irrigation</li></ul><h3>Regulations</h3><p>Vary widely by location. Some areas encourage, others restrict.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Design</h2><h3>Key Components</h3><ul><li>Surge tank</li><li>Filtration (mesh, sand, membrane)</li><li>Optional disinfection</li><li>Distribution system</li></ul><h3>Sizing</h3><p>Balance generation rate with irrigation demand and storage.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Policy and Acceptance</h2><h3>Regulatory Approaches</h3><ul><li>Prohibition vs permitting vs exemption</li><li>Treatment requirements by end use</li><li>Public health safeguards</li></ul><h3>Social Factors</h3><p>Perception of "used" water, education needs, behavioral aspects.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Advanced Topics</h3><ul><li>Quantitative microbial risk assessment</li><li>Emerging contaminants (pharmaceuticals)</li><li>Treatment technology optimization</li><li>Integrated water management modeling</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-grey-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Save Shower Water!',
          MIDDLE_SCHOOL: 'Plan Greywater Reuse',
          HIGH_SCHOOL: 'System Selection',
          UNDERGRADUATE: 'Treatment Design',
          GRADUATE: 'Policy Development',
          PHD: 'Risk Assessment'
        },
        description: {
          ELEMENTARY: 'See how shower water can help your garden!',
          MIDDLE_SCHOOL: 'Plan how to reuse household greywater.',
          HIGH_SCHOOL: 'Select appropriate greywater systems for different homes.',
          UNDERGRADUATE: 'Design a greywater treatment system.',
          GRADUATE: 'Develop greywater policy recommendations.',
          PHD: 'Conduct microbial risk assessment.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-grey-game',
      type: 'simulation',
      title: 'Water Recycler',
      description: 'Design and manage greywater reuse systems!',
      rounds: 5,
      timeLimit: 40,
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
      id: 'ws-grey-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wgq1',
          question: {
            ELEMENTARY: 'What is NOT greywater?',
            MIDDLE_SCHOOL: 'What must you use with greywater for irrigation?',
            HIGH_SCHOOL: 'What is the simplest greywater system?',
            UNDERGRADUATE: 'What is a surge tank for?',
            GRADUATE: 'What social factor affects greywater adoption?',
            PHD: 'What is QMRA used for in greywater research?'
          },
          options: {
            ELEMENTARY: ['Toilet water', 'Shower water', 'Sink water', 'Laundry water'],
            MIDDLE_SCHOOL: ['Plant-safe soaps', 'Any soap', 'Bleach', 'Nothing special'],
            HIGH_SCHOOL: ['Laundry to landscape', 'Full treatment plant', 'Bottling system', 'Reverse osmosis'],
            UNDERGRADUATE: ['Temporary storage of variable flows', 'Heating water', 'Adding chemicals', 'Filtration'],
            GRADUATE: ['Perception of used water', 'Cost only', 'Availability only', 'No social factors exist'],
            PHD: ['Quantitative microbial risk assessment', 'Quality material review analysis', 'Quick monitoring rapid assessment', 'None of these']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Toilet water is called blackwater, not greywater - it needs special treatment!',
            MIDDLE_SCHOOL: 'Plant-safe soaps without harsh chemicals are needed for greywater irrigation.',
            HIGH_SCHOOL: 'Laundry to landscape is the simplest - direct from washer to mulch basins.',
            UNDERGRADUATE: 'Surge tanks handle variable greywater generation throughout the day.',
            GRADUATE: 'Public perception of "used" water significantly affects adoption rates.',
            PHD: 'QMRA (Quantitative Microbial Risk Assessment) evaluates pathogen exposure risks.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Greywater Action', url: 'https://greywateraction.org/', type: 'research' },
      { title: 'EPA Water Reuse', url: 'https://www.epa.gov/waterreuse', type: 'article' }
    ]
  },
  // Module 3: Drip Irrigation
  {
    id: 'water-drip',
    slug: 'drip-irrigation',
    title: 'Drip Irrigation',
    description: {
      ELEMENTARY: 'Learn about watering plants one drop at a time!',
      MIDDLE_SCHOOL: 'Discover efficient irrigation that saves water for farms and gardens.',
      HIGH_SCHOOL: 'Explore drip system design, components, and water savings.',
      UNDERGRADUATE: 'Analyze emitter hydraulics, scheduling, and system optimization.',
      GRADUATE: 'Examine precision irrigation, sensor integration, and deficit irrigation strategies.',
      PHD: 'Research variable rate irrigation, crop modeling, and climate-adaptive systems.'
    },
    topic: 'water-systems',
    category: 'IRRIGATION',
    icon: 'Droplets',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-drip-1',
        title: 'One Drop at a Time',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 Slow and Steady!</h2><p>Drip irrigation gives plants exactly what they need - one drop at a time!</p><h3>Why Drip?</h3><ul><li>💧 Saves water - no waste!</li><li>🌱 Water goes right to roots</li><li>🚫 No wet leaves (less disease)</li><li>😊 Happy, healthy plants!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Drip Irrigation Basics</h2><h3>How It Works</h3><p>Water flows through tubes with small holes (emitters) that drip water slowly right at plant roots.</p><h3>Water Savings</h3><p>Uses 30-50% less water than sprinklers because water goes directly to plants, not into the air or onto paths.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Drip System Components</h2><h3>Key Parts</h3><ul><li><strong>Main line:</strong> Brings water from source</li><li><strong>Sub-main:</strong> Distribution to zones</li><li><strong>Drip tubing:</strong> With inline emitters</li><li><strong>Emitters:</strong> Control flow rate (GPH)</li><li><strong>Filter:</strong> Prevents clogging</li><li><strong>Pressure regulator:</strong> Correct PSI</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Hydraulics</h2><h3>Design Considerations</h3><ul><li>Emitter uniformity</li><li>Pressure compensation</li><li>Friction loss calculations</li><li>Zone sizing</li></ul><h3>Scheduling</h3><p>Based on crop ET, soil type, and root zone depth.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Precision Irrigation</h2><h3>Advanced Technologies</h3><ul><li>Soil moisture sensors</li><li>Weather-based controllers</li><li>Variable rate irrigation</li><li>Deficit irrigation strategies</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Crop modeling integration</li><li>Climate adaptation strategies</li><li>Water-nutrient interactions</li><li>Precision ag integration</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-drip-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Water the Garden!',
          MIDDLE_SCHOOL: 'Design a Drip System',
          HIGH_SCHOOL: 'Calculate Water Needs',
          UNDERGRADUATE: 'Hydraulic Design',
          GRADUATE: 'Sensor Integration',
          PHD: 'Optimization Model'
        },
        description: {
          ELEMENTARY: 'Place drip lines to water all the plants!',
          MIDDLE_SCHOOL: 'Design a simple drip system for a garden.',
          HIGH_SCHOOL: 'Calculate emitter spacing and flow rates.',
          UNDERGRADUATE: 'Design system hydraulics for uniform distribution.',
          GRADUATE: 'Integrate sensors for automated scheduling.',
          PHD: 'Develop optimization model for water productivity.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-drip-game',
      type: 'simulation',
      title: 'Drip Designer',
      description: 'Design efficient drip irrigation systems!',
      rounds: 5,
      timeLimit: 40,
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
      id: 'ws-drip-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wdq1',
          question: {
            ELEMENTARY: 'How does drip irrigation water plants?',
            MIDDLE_SCHOOL: 'How much water can drip save vs sprinklers?',
            HIGH_SCHOOL: 'What prevents emitter clogging?',
            UNDERGRADUATE: 'What ensures even water distribution in drip?',
            GRADUATE: 'What is deficit irrigation?',
            PHD: 'What does variable rate irrigation optimize?'
          },
          options: {
            ELEMENTARY: ['One drop at a time to the roots', 'Big sprays in the air', 'Flooding the whole area', 'Only when it rains'],
            MIDDLE_SCHOOL: ['30-50% less water', 'Same amount', 'More water', '10% less'],
            HIGH_SCHOOL: ['A filter', 'Nothing', 'Hot water', 'Fast flow'],
            UNDERGRADUATE: ['Pressure compensation and uniform emitters', 'Long tubing only', 'No design needed', 'High pressure only'],
            GRADUATE: ['Purposely applying less than full crop water needs', 'Giving extra water', 'No irrigation', 'Flood irrigation'],
            PHD: ['Water application matching spatial crop needs', 'Uniform application everywhere', 'Random application', 'Manual scheduling only']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Drip irrigation slowly drips water right at plant roots!',
            MIDDLE_SCHOOL: 'Drip irrigation uses 30-50% less water than sprinklers.',
            HIGH_SCHOOL: 'Filters remove particles that could clog small emitter openings.',
            UNDERGRADUATE: 'Pressure-compensating emitters ensure uniform flow despite pressure changes.',
            GRADUATE: 'Deficit irrigation strategically under-waters to improve water productivity.',
            PHD: 'Variable rate irrigation optimizes application based on spatial variability in crop needs.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Irrigation Association', url: 'https://www.irrigation.org/', type: 'research' },
      { title: 'USDA NRCS Irrigation', url: 'https://www.nrcs.usda.gov/', type: 'article' }
    ]
  },
  // Module 4: Wetland Restoration
  {
    id: 'water-wetlands',
    slug: 'wetland-restoration',
    title: 'Wetland Restoration',
    description: {
      ELEMENTARY: 'Discover amazing wetland ecosystems that clean water naturally!',
      MIDDLE_SCHOOL: 'Learn how wetlands filter water and provide wildlife habitat.',
      HIGH_SCHOOL: 'Explore wetland ecology, ecosystem services, and restoration techniques.',
      UNDERGRADUATE: 'Analyze wetland hydrology, biogeochemistry, and restoration design.',
      GRADUATE: 'Examine constructed wetlands, mitigation banking, and policy frameworks.',
      PHD: 'Research wetland carbon dynamics, long-term restoration trajectories, and climate adaptation.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-wet-1',
        title: 'Nature\'s Sponges',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🐸 Wonderful Wetlands!</h2><p>Wetlands are like giant sponges that clean water and provide homes for wildlife!</p><h3>What Wetlands Do</h3><ul><li>🧹 Clean dirty water</li><li>🐸 Home for frogs and birds</li><li>🌊 Stop floods</li><li>🌿 Grow amazing plants</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Wetland Ecosystem Services</h2><h3>Water Quality</h3><p>Wetlands filter pollutants, trap sediments, and transform nutrients through natural processes.</p><h3>Other Benefits</h3><ul><li>Flood control and storage</li><li>Groundwater recharge</li><li>Wildlife habitat</li><li>Carbon storage</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Wetland Ecology</h2><h3>Types of Wetlands</h3><ul><li><strong>Marshes:</strong> Herbaceous plants, standing water</li><li><strong>Swamps:</strong> Tree-dominated</li><li><strong>Bogs:</strong> Acidic, peat-forming</li><li><strong>Fens:</strong> Groundwater-fed</li></ul><h3>Restoration</h3><p>Reconnecting hydrology, planting natives, removing invasives.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Wetland Science</h2><h3>Hydrology</h3><ul><li>Hydroperiod (timing and duration)</li><li>Water sources and sinks</li><li>Hydrologic restoration</li></ul><h3>Biogeochemistry</h3><p>Nutrient cycling, denitrification, carbon sequestration.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Constructed Wetlands</h2><h3>Treatment Wetlands</h3><ul><li>Free water surface</li><li>Subsurface flow</li><li>Hybrid systems</li></ul><h3>Mitigation Banking</h3><p>Credit systems for wetland protection and restoration.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Long-term restoration trajectories</li><li>Carbon and greenhouse gases</li><li>Climate change impacts</li><li>Restoration outcome prediction</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-wet-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Wetland!',
          MIDDLE_SCHOOL: 'Ecosystem Explorer',
          HIGH_SCHOOL: 'Restoration Planning',
          UNDERGRADUATE: 'Hydrologic Design',
          GRADUATE: 'Treatment System',
          PHD: 'Carbon Modeling'
        },
        description: {
          ELEMENTARY: 'Create a wetland habitat for wildlife!',
          MIDDLE_SCHOOL: 'Explore wetland ecosystems and their services.',
          HIGH_SCHOOL: 'Plan a wetland restoration project.',
          UNDERGRADUATE: 'Design wetland hydrology for restoration.',
          GRADUATE: 'Design a constructed treatment wetland.',
          PHD: 'Model wetland carbon dynamics.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ws-wet-game',
      type: 'simulation',
      title: 'Wetland Builder',
      description: 'Restore and manage healthy wetland ecosystems!',
      rounds: 5,
      timeLimit: 40,
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
      id: 'ws-wet-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wwq1',
          question: {
            ELEMENTARY: 'What do wetlands do for water?',
            MIDDLE_SCHOOL: 'What ecosystem service do wetlands provide for climate?',
            HIGH_SCHOOL: 'What is a marsh?',
            UNDERGRADUATE: 'What is hydroperiod?',
            GRADUATE: 'What is mitigation banking?',
            PHD: 'What greenhouse gas concern exists for wetlands?'
          },
          options: {
            ELEMENTARY: ['Clean it like a filter', 'Make it dirty', 'Heat it up', 'Freeze it'],
            MIDDLE_SCHOOL: ['Carbon storage', 'Heat production', 'Ozone creation', 'No climate services'],
            HIGH_SCHOOL: ['Herbaceous plants with standing water', 'Desert ecosystem', 'Mountain top', 'Ocean'],
            UNDERGRADUATE: ['Timing and duration of flooding', 'Water temperature', 'Water color', 'Fish population'],
            GRADUATE: ['Credit system for wetland protection', 'Bank near wetlands', 'Water storage', 'Fish farming'],
            PHD: ['Methane emissions from anaerobic conditions', 'Too much oxygen', 'No concerns', 'Only CO2 uptake']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Wetlands clean water by filtering out dirt and pollution naturally!',
            MIDDLE_SCHOOL: 'Wetlands store large amounts of carbon in their soils and plants.',
            HIGH_SCHOOL: 'Marshes are wetlands dominated by herbaceous plants with standing water.',
            UNDERGRADUATE: 'Hydroperiod describes when and how long a wetland is flooded.',
            GRADUATE: 'Mitigation banking creates credits for wetland restoration to offset impacts elsewhere.',
            PHD: 'Wetlands can emit methane under anaerobic conditions, complicating carbon benefits.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Society of Wetland Scientists', url: 'https://www.sws.org/', type: 'research' },
      { title: 'EPA Wetlands', url: 'https://www.epa.gov/wetlands', type: 'article' }
    ]
  },
  // Module 5: Water Conservation
  {
    id: 'water-conservation',
    slug: 'water-conservation',
    title: 'Water Conservation',
    description: {
      ELEMENTARY: 'Learn simple ways to save water every day!',
      MIDDLE_SCHOOL: 'Discover household and community water conservation strategies.',
      HIGH_SCHOOL: 'Explore water efficiency, demand management, and conservation technologies.',
      UNDERGRADUATE: 'Analyze water use efficiency, pricing, and conservation program design.',
      GRADUATE: 'Examine water demand management, behavioral economics, and policy tools.',
      PHD: 'Research conservation effectiveness, long-term behavioral change, and system optimization.'
    },
    topic: 'water-systems',
    category: 'CONSERVATION',
    icon: 'Shield',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ws-cons-1',
        title: 'Every Drop Counts',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>💧 Save Water!</h2><p>Water is precious! Here's how to save it every day.</p><h3>Easy Ways to Save</h3><ul><li>🚿 Short showers</li><li>🦷 Turn off while brushing</li><li>🚽 Don't flush unnecessarily</li><li>🌧️ Catch rain for plants</li><li>🚰 Fix leaky faucets</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Water Conservation at Home</h2><h3>Indoor Savings</h3><ul><li>Low-flow showerheads</li><li>Efficient toilets</li><li>Full loads only (washer, dishwasher)</li><li>Fix leaks promptly</li></ul><h3>Outdoor Savings</h3><ul><li>Water early morning</li><li>Mulch gardens</li><li>Choose native plants</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Conservation Technologies</h2><h3>Efficient Fixtures</h3><ul><li>WaterSense certification</li><li>1.28 GPF toilets (vs 3.5 GPF old)</li><li>1.5 GPM faucet aerators</li></ul><h3>Smart Systems</h3><ul><li>Leak detection sensors</li><li>Smart irrigation controllers</li><li>Real-time monitoring</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Conservation Economics</h2><h3>Pricing Strategies</h3><ul><li>Tiered/block pricing</li><li>Seasonal pricing</li><li>Water budgets</li></ul><h3>Program Design</h3><p>Rebates, audits, education, regulations.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Demand Management</h2><h3>Behavioral Approaches</h3><ul><li>Social norms messaging</li><li>Real-time feedback</li><li>Gamification</li></ul><h3>Policy Integration</h3><p>Building codes, landscaping ordinances, utility programs.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Key Questions</h3><ul><li>Long-term behavior persistence</li><li>Conservation vs. efficiency rebound</li><li>Equity implications</li><li>Climate adaptation integration</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ws-cons-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Water Saving Challenge!',
          MIDDLE_SCHOOL: 'Home Water Audit',
          HIGH_SCHOOL: 'Efficiency Calculator',
          UNDERGRADUATE: 'Program Design',
          GRADUATE: 'Behavioral Study',
          PHD: 'Impact Assessment'
        },
        description: {
          ELEMENTARY: 'Find ways to save water around your home!',
          MIDDLE_SCHOOL: 'Conduct a water audit of your household.',
          HIGH_SCHOOL: 'Calculate savings from efficiency upgrades.',
          UNDERGRADUATE: 'Design a water conservation program.',
          GRADUATE: 'Design a behavioral conservation study.',
          PHD: 'Assess long-term conservation program impact.'
        },
        config: {
          ELEMENTARY: { steps: 5, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { steps: 8, hints: true, timeLimit: 180 },
          HIGH_SCHOOL: { steps: 10, hints: false, timeLimit: 150 },
          UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 },
          GRADUATE: { steps: 15, hints: false, timeLimit: 120 },
          PHD: { steps: 20, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'ws-cons-game',
      type: 'puzzle',
      title: 'Water Saver',
      description: 'Find all the ways to conserve water!',
      rounds: 5,
      timeLimit: 35,
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
      id: 'ws-cons-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'wcq1',
          question: {
            ELEMENTARY: 'What is an easy way to save water?',
            MIDDLE_SCHOOL: 'What does low-flow mean for showerheads?',
            HIGH_SCHOOL: 'What certification indicates water-efficient fixtures?',
            UNDERGRADUATE: 'What is tiered water pricing?',
            GRADUATE: 'What behavioral technique uses peer comparison?',
            PHD: 'What is the efficiency rebound effect?'
          },
          options: {
            ELEMENTARY: ['Turn off tap while brushing teeth', 'Leave water running always', 'Take hour-long showers', 'Water grass at noon'],
            MIDDLE_SCHOOL: ['Uses less water per minute', 'Uses more water', 'Hot water only', 'No difference'],
            HIGH_SCHOOL: ['WaterSense', 'EnergyStar', 'USDA Organic', 'Fair Trade'],
            UNDERGRADUATE: ['Higher prices for more use', 'Same price for all', 'Lower prices for more use', 'Free water'],
            GRADUATE: ['Social norms messaging', 'No peer information', 'Price only', 'Random feedback'],
            PHD: ['Savings offset by increased use', 'No change', 'Always more savings', 'Immediate success']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Turning off the tap while brushing saves gallons every day!',
            MIDDLE_SCHOOL: 'Low-flow showerheads use fewer gallons per minute while maintaining pressure.',
            HIGH_SCHOOL: 'WaterSense is the EPA program certifying water-efficient fixtures.',
            UNDERGRADUATE: 'Tiered pricing charges higher rates as usage increases, encouraging conservation.',
            GRADUATE: 'Social norms messaging shows how your use compares to neighbors.',
            PHD: 'Efficiency rebound occurs when savings from efficiency are offset by increased consumption.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'EPA WaterSense', url: 'https://www.epa.gov/watersense', type: 'research' },
      { title: 'Alliance for Water Efficiency', url: 'https://www.allianceforwaterefficiency.org/', type: 'article' }
    ]
  },
  // Module 6: Groundwater Management
  {
    id: 'water-groundwater',
    slug: 'groundwater-management',
    title: 'Groundwater Management',
    description: {
      ELEMENTARY: 'Discover the hidden water underground that we drink!',
      MIDDLE_SCHOOL: 'Learn about aquifers and how we use groundwater sustainably.',
      HIGH_SCHOOL: 'Explore groundwater hydrology, wells, and aquifer management.',
      UNDERGRADUATE: 'Analyze groundwater modeling, sustainable yield, and contamination.',
      GRADUATE: 'Examine conjunctive use, managed aquifer recharge, and governance.',
      PHD: 'Research groundwater-surface water interactions, modeling uncertainty, and policy.'
    },
    topic: 'water-systems',
    category: 'GROUNDWATER',
    icon: 'Layers',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-gw-1', title: 'Water Underground', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Hidden Water!</h2><p>Under the ground, there is water hiding in rocks and sand called groundwater!</p>', MIDDLE_SCHOOL: '<h2>What is Groundwater?</h2><p>Water that fills spaces between underground rocks is called groundwater. Aquifers are layers that hold lots of this water.</p>', HIGH_SCHOOL: '<h2>Groundwater Hydrology</h2><p>Aquifers, water tables, recharge zones, and flow paths. Wells tap into this underground resource.</p>', UNDERGRADUATE: '<h2>Aquifer Management</h2><p>Sustainable yield, pumping tests, drawdown analysis, and contamination risk assessment.</p>', GRADUATE: '<h2>Managed Aquifer Recharge</h2><p>Intentionally recharging aquifers with surface water or treated wastewater for storage.</p>', PHD: '<h2>Research Frontiers</h2><p>Groundwater-surface water interactions, transboundary aquifers, and climate impacts.</p>' } }],
    activities: [{ id: 'ws-gw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Dig a Well!', MIDDLE_SCHOOL: 'Explore Aquifers', HIGH_SCHOOL: 'Well Design', UNDERGRADUATE: 'Yield Analysis', GRADUATE: 'Recharge Planning', PHD: 'Model Development' }, description: { ELEMENTARY: 'Find water underground!', MIDDLE_SCHOOL: 'Explore how aquifers store and move water.', HIGH_SCHOOL: 'Design a well for a community.', UNDERGRADUATE: 'Analyze sustainable pumping rates.', GRADUATE: 'Plan a managed aquifer recharge project.', PHD: 'Develop a groundwater flow model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-gw-game', type: 'simulation', title: 'Aquifer Manager', description: 'Manage groundwater sustainably!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-gw-quiz', passingScore: 80, questions: [{ id: 'wgwq1', question: { ELEMENTARY: 'Where is groundwater found?', MIDDLE_SCHOOL: 'What is an aquifer?', HIGH_SCHOOL: 'What is the water table?', UNDERGRADUATE: 'What is sustainable yield?', GRADUATE: 'What is MAR?', PHD: 'What complicates groundwater modeling?' }, options: { ELEMENTARY: ['Underground in rocks and sand', 'In clouds', 'On top of mountains', 'In the ocean only'], MIDDLE_SCHOOL: ['An underground layer holding water', 'A type of fish', 'A water tank', 'A river'], HIGH_SCHOOL: ['Top of saturated zone', 'Bottom of ocean', 'Surface of lakes', 'Cloud level'], UNDERGRADUATE: ['Pumping rate aquifer can sustain', 'Maximum possible pumping', 'Zero pumping', 'Unlimited pumping'], GRADUATE: ['Managed Aquifer Recharge', 'Maximum Annual Rainfall', 'Minimum Aquifer Recovery', 'Major Aquifer Region'], PHD: ['Heterogeneity and data uncertainty', 'Too simple', 'Perfect data available', 'No complications'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Groundwater is found underground in spaces between rocks, sand, and soil!', MIDDLE_SCHOOL: 'An aquifer is an underground layer of rock or sediment that holds water.', HIGH_SCHOOL: 'The water table is the top of the saturated zone where all pores are filled with water.', UNDERGRADUATE: 'Sustainable yield is the pumping rate an aquifer can support without long-term depletion.', GRADUATE: 'MAR (Managed Aquifer Recharge) intentionally stores water underground for later use.', PHD: 'Aquifer heterogeneity and limited subsurface data create significant modeling uncertainty.' } }] },
    externalResources: [{ title: 'USGS Groundwater', url: 'https://www.usgs.gov/mission-areas/water-resources', type: 'research' }]
  },
  // Module 7: Stormwater Management
  {
    id: 'water-stormwater',
    slug: 'stormwater-management',
    title: 'Stormwater Management',
    description: {
      ELEMENTARY: 'Learn what happens to rain when it lands on streets and parking lots!',
      MIDDLE_SCHOOL: 'Discover how cities manage rainwater runoff to prevent pollution and flooding.',
      HIGH_SCHOOL: 'Explore green infrastructure, detention systems, and low impact development.',
      UNDERGRADUATE: 'Analyze stormwater modeling, BMP design, and regulatory compliance.',
      GRADUATE: 'Examine integrated stormwater management, MS4 permits, and green-gray integration.',
      PHD: 'Research urban hydrology, climate adaptation, and multi-objective optimization.'
    },
    topic: 'water-systems',
    category: 'STORMWATER',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-sw-1', title: 'Where Rain Goes', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Rain in the City!</h2><p>In cities, rain lands on hard surfaces like roads and parking lots and has to go somewhere!</p>', MIDDLE_SCHOOL: '<h2>Stormwater Runoff</h2><p>Hard surfaces prevent rain from soaking in. It runs off, picking up pollutants and causing flooding.</p>', HIGH_SCHOOL: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, permeable pavement, and green roofs slow and filter stormwater naturally.</p>', UNDERGRADUATE: '<h2>BMP Design</h2><p>Best Management Practices sized for storm events, soil conditions, and pollutant removal targets.</p>', GRADUATE: '<h2>Integrated Management</h2><p>Combining green and gray infrastructure, regulatory requirements, and urban planning.</p>', PHD: '<h2>Research Frontiers</h2><p>Urban hydrology modeling, climate change adaptation, and ecosystem services valuation.</p>' } }],
    activities: [{ id: 'ws-sw-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Stop the Flood!', MIDDLE_SCHOOL: 'Design a Rain Garden', HIGH_SCHOOL: 'BMP Selection', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Permit Compliance', PHD: 'Multi-Objective Design' }, description: { ELEMENTARY: 'Help rain soak into the ground instead of flooding!', MIDDLE_SCHOOL: 'Design a rain garden to capture runoff.', HIGH_SCHOOL: 'Select BMPs for a development site.', UNDERGRADUATE: 'Size a stormwater system for design storms.', GRADUATE: 'Develop a stormwater management program for compliance.', PHD: 'Optimize green infrastructure for multiple objectives.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-sw-game', type: 'simulation', title: 'Stormwater Engineer', description: 'Design systems to manage urban runoff!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-sw-quiz', passingScore: 80, questions: [{ id: 'wswq1', question: { ELEMENTARY: 'Why does rain cause problems in cities?', MIDDLE_SCHOOL: 'What is a rain garden?', HIGH_SCHOOL: 'What does permeable pavement do?', UNDERGRADUATE: 'What does BMP stand for?', GRADUATE: 'What is an MS4 permit?', PHD: 'What is LID?' }, options: { ELEMENTARY: ['Hard surfaces prevent it from soaking in', 'Rain is always bad', 'Cities have no rain', 'Rain only falls on grass'], MIDDLE_SCHOOL: ['A planted area that collects and filters runoff', 'A flower garden', 'An indoor garden', 'A vegetable garden'], HIGH_SCHOOL: ['Allows water to soak through', 'Blocks all water', 'Heats up water', 'Only for cars'], UNDERGRADUATE: ['Best Management Practice', 'Big Management Project', 'Building Material Permit', 'Basic Monitoring Plan'], GRADUATE: ['Municipal Separate Storm Sewer permit', 'Main Street 4 permit', 'Monitoring System 4', 'Maximum Storm 4'], PHD: ['Low Impact Development', 'Large Industrial Design', 'Limited Interior Drainage', 'Local Improvement District'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Rain causes problems because hard surfaces like roads prevent it from soaking into the ground!', MIDDLE_SCHOOL: 'Rain gardens are planted depressions that collect runoff and let it soak in slowly while filtering pollutants.', HIGH_SCHOOL: 'Permeable pavement has gaps that allow water to pass through and infiltrate into the ground.', UNDERGRADUATE: 'BMP stands for Best Management Practice - techniques to manage stormwater quantity and quality.', GRADUATE: 'MS4 (Municipal Separate Storm Sewer System) permits regulate stormwater discharges from cities.', PHD: 'LID (Low Impact Development) mimics natural hydrology to manage stormwater at its source.' } }] },
    externalResources: [{ title: 'EPA Stormwater', url: 'https://www.epa.gov/npdes/stormwater-discharges-municipal-sources', type: 'research' }]
  },
  // Module 8: Water Quality Monitoring
  {
    id: 'water-quality',
    slug: 'water-quality-monitoring',
    title: 'Water Quality Monitoring',
    description: {
      ELEMENTARY: 'Learn how scientists check if water is clean and safe!',
      MIDDLE_SCHOOL: 'Discover the tests used to measure water quality in streams and lakes.',
      HIGH_SCHOOL: 'Explore water quality parameters, testing methods, and indicator species.',
      UNDERGRADUATE: 'Analyze monitoring program design, QA/QC, and data interpretation.',
      GRADUATE: 'Examine regulatory standards, TMDL development, and adaptive management.',
      PHD: 'Research sensor networks, real-time monitoring, and predictive modeling.'
    },
    topic: 'water-systems',
    category: 'MONITORING',
    icon: 'TestTube',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-wq-1', title: 'Is the Water Clean?', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Detectives!</h2><p>Scientists test water to make sure it is safe for drinking, swimming, and fish!</p>', MIDDLE_SCHOOL: '<h2>Testing Water Quality</h2><p>pH, dissolved oxygen, temperature, turbidity, and nutrients tell us about water health.</p>', HIGH_SCHOOL: '<h2>Water Quality Parameters</h2><p>Physical (temp, turbidity), chemical (pH, DO, nutrients), and biological (bacteria, macroinvertebrates) indicators.</p>', UNDERGRADUATE: '<h2>Monitoring Programs</h2><p>Sampling design, QA/QC protocols, chain of custody, and data management.</p>', GRADUATE: '<h2>Regulatory Framework</h2><p>Water quality standards, designated uses, TMDLs, and impaired waters listings.</p>', PHD: '<h2>Research Frontiers</h2><p>Real-time sensor networks, machine learning for prediction, and emerging contaminants.</p>' } }],
    activities: [{ id: 'ws-wq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Water!', MIDDLE_SCHOOL: 'Stream Survey', HIGH_SCHOOL: 'Parameter Analysis', UNDERGRADUATE: 'Program Design', GRADUATE: 'TMDL Development', PHD: 'Sensor Network' }, description: { ELEMENTARY: 'Test water samples to see if they are clean!', MIDDLE_SCHOOL: 'Conduct a stream water quality survey.', HIGH_SCHOOL: 'Analyze multiple water quality parameters.', UNDERGRADUATE: 'Design a monitoring program for a watershed.', GRADUATE: 'Develop a TMDL for an impaired stream.', PHD: 'Design a real-time water quality sensor network.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-wq-game', type: 'puzzle', title: 'Water Detective', description: 'Solve water quality mysteries!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-wq-quiz', passingScore: 80, questions: [{ id: 'wwqq1', question: { ELEMENTARY: 'Why do we test water?', MIDDLE_SCHOOL: 'What does dissolved oxygen tell us?', HIGH_SCHOOL: 'What are macroinvertebrates used for?', UNDERGRADUATE: 'What is QA/QC in monitoring?', GRADUATE: 'What is a TMDL?', PHD: 'What is a key challenge for real-time monitoring?' }, options: { ELEMENTARY: ['To make sure it is safe', 'For fun', 'To make it blue', 'To heat it up'], MIDDLE_SCHOOL: ['How much oxygen fish can breathe', 'Water color', 'Water taste', 'Water weight'], HIGH_SCHOOL: ['Biological indicators of water quality', 'Food for fish only', 'Decoration', 'Not used'], UNDERGRADUATE: ['Quality assurance and control', 'Questions and answers', 'Quick and quiet', 'Quantity and quality'], GRADUATE: ['Total Maximum Daily Load for pollutants', 'Temperature Maximum Daily Limit', 'Total Minimum Drainage Level', 'Test Method Development Lab'], PHD: ['Sensor fouling and calibration', 'Too easy', 'No power needed', 'Perfect accuracy always'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We test water to make sure it is safe for people, animals, and plants!', MIDDLE_SCHOOL: 'Dissolved oxygen tells us how much oxygen is available for fish and other aquatic life.', HIGH_SCHOOL: 'Macroinvertebrates like insects and snails indicate long-term water quality conditions.', UNDERGRADUATE: 'QA/QC ensures data quality through protocols, calibration, and verification.', GRADUATE: 'A TMDL sets the maximum amount of a pollutant a water body can receive and still meet standards.', PHD: 'Sensor fouling from biofouling and sediment requires frequent maintenance and calibration.' } }] },
    externalResources: [{ title: 'EPA Water Quality Standards', url: 'https://www.epa.gov/wqs-tech', type: 'research' }]
  },
  // Module 9: Aquaponics
  {
    id: 'water-aquaponics',
    slug: 'aquaponics-systems',
    title: 'Aquaponics Systems',
    description: {
      ELEMENTARY: 'Discover how fish and plants can grow together in one system!',
      MIDDLE_SCHOOL: 'Learn how aquaponics combines fish farming and plant growing.',
      HIGH_SCHOOL: 'Explore the nitrogen cycle, system types, and water chemistry in aquaponics.',
      UNDERGRADUATE: 'Analyze aquaponic system design, fish-plant ratios, and economic viability.',
      GRADUATE: 'Examine commercial aquaponics, food safety, and integrated production systems.',
      PHD: 'Research nutrient dynamics, microbial communities, and system optimization.'
    },
    topic: 'water-systems',
    category: 'AQUACULTURE',
    icon: 'Fish',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-ap-1', title: 'Fish Feed Plants!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Fish and Plants Together!</h2><p>In aquaponics, fish waste feeds plants, and plants clean the water for fish!</p>', MIDDLE_SCHOOL: '<h2>How Aquaponics Works</h2><p>Fish produce ammonia waste. Bacteria convert it to nitrates. Plants absorb nitrates as food. Clean water returns to fish.</p>', HIGH_SCHOOL: '<h2>The Nitrogen Cycle</h2><p>Ammonia → Nitrite → Nitrate through nitrifying bacteria. This cycle is the heart of aquaponics.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Fish tank sizing, biofilter capacity, grow bed ratios, and water flow calculations.</p>', GRADUATE: '<h2>Commercial Systems</h2><p>Scale-up challenges, food safety regulations, and economic feasibility analysis.</p>', PHD: '<h2>Research Frontiers</h2><p>Microbial ecology, nutrient optimization, and coupled system modeling.</p>' } }],
    activities: [{ id: 'ws-ap-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Fish Garden!', MIDDLE_SCHOOL: 'Balance the System', HIGH_SCHOOL: 'Nitrogen Cycle', UNDERGRADUATE: 'System Sizing', GRADUATE: 'Business Planning', PHD: 'Nutrient Modeling' }, description: { ELEMENTARY: 'Create an aquaponics system with fish and plants!', MIDDLE_SCHOOL: 'Balance fish and plants in an aquaponic system.', HIGH_SCHOOL: 'Manage the nitrogen cycle in aquaponics.', UNDERGRADUATE: 'Size an aquaponic system for a school.', GRADUATE: 'Develop a business plan for commercial aquaponics.', PHD: 'Model nutrient dynamics in coupled systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-ap-game', type: 'simulation', title: 'Aquaponics Farmer', description: 'Manage a thriving aquaponics system!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-ap-quiz', passingScore: 80, questions: [{ id: 'wapq1', question: { ELEMENTARY: 'What do fish provide for plants in aquaponics?', MIDDLE_SCHOOL: 'What bacteria are essential in aquaponics?', HIGH_SCHOOL: 'What is the final form of nitrogen plants absorb?', UNDERGRADUATE: 'What determines fish tank to grow bed ratio?', GRADUATE: 'What is a key commercial challenge?', PHD: 'What microbial group converts ammonia?' }, options: { ELEMENTARY: ['Nutrients from their waste', 'Sunlight', 'Soil', 'Seeds'], MIDDLE_SCHOOL: ['Nitrifying bacteria', 'Harmful bacteria', 'No bacteria needed', 'Yeast'], HIGH_SCHOOL: ['Nitrate', 'Ammonia', 'Nitrogen gas', 'Protein'], UNDERGRADUATE: ['Fish feeding rate and plant uptake', 'Random selection', 'Tank color', 'Fish species only'], GRADUATE: ['Achieving consistent profitability', 'Too much demand', 'Too easy', 'No regulations'], PHD: ['Nitrosomonas and Nitrobacter', 'E. coli', 'Yeast', 'Algae only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fish waste contains nutrients that plants use as food to grow!', MIDDLE_SCHOOL: 'Nitrifying bacteria convert toxic ammonia into plant-usable nitrates.', HIGH_SCHOOL: 'Plants absorb nitrogen as nitrate (NO3-) through their roots.', UNDERGRADUATE: 'The ratio balances fish waste production with plant nutrient uptake capacity.', GRADUATE: 'Consistent profitability is challenging due to energy costs and market access.', PHD: 'Nitrosomonas converts ammonia to nitrite; Nitrobacter converts nitrite to nitrate.' } }] },
    externalResources: [{ title: 'Aquaponics Association', url: 'https://aquaponicsassociation.org/', type: 'research' }]
  },
  // Module 10: Desalination
  {
    id: 'water-desalination',
    slug: 'desalination',
    title: 'Desalination',
    description: {
      ELEMENTARY: 'Learn how we turn salty ocean water into fresh drinking water!',
      MIDDLE_SCHOOL: 'Discover the technologies that remove salt from seawater.',
      HIGH_SCHOOL: 'Explore reverse osmosis, thermal desalination, and energy requirements.',
      UNDERGRADUATE: 'Analyze desalination plant design, energy optimization, and brine management.',
      GRADUATE: 'Examine desalination policy, environmental impacts, and integration strategies.',
      PHD: 'Research novel membranes, renewable energy integration, and zero liquid discharge.'
    },
    topic: 'water-systems',
    category: 'TREATMENT',
    icon: 'Waves',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-desal-1', title: 'Fresh from Salt', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Fresh Water!</h2><p>The ocean is salty, but we can remove the salt to make water we can drink!</p>', MIDDLE_SCHOOL: '<h2>Desalination Methods</h2><p>Boiling water and collecting steam (thermal) or pushing water through special filters (reverse osmosis).</p>', HIGH_SCHOOL: '<h2>Reverse Osmosis</h2><p>High pressure forces water through membranes that block salt. Energy intensive but most common method today.</p>', UNDERGRADUATE: '<h2>Plant Design</h2><p>Pretreatment, RO arrays, energy recovery devices, and post-treatment for distribution.</p>', GRADUATE: '<h2>Sustainability Challenges</h2><p>Energy consumption, brine disposal, intake impacts, and cost relative to other supplies.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene membranes, forward osmosis, and renewable energy powered systems.</p>' } }],
    activities: [{ id: 'ws-desal-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Remove the Salt!', MIDDLE_SCHOOL: 'Compare Methods', HIGH_SCHOOL: 'RO System', UNDERGRADUATE: 'Plant Design', GRADUATE: 'Impact Assessment', PHD: 'Innovation Analysis' }, description: { ELEMENTARY: 'See how salt gets removed from ocean water!', MIDDLE_SCHOOL: 'Compare different desalination technologies.', HIGH_SCHOOL: 'Design a reverse osmosis system.', UNDERGRADUATE: 'Design a desalination plant for a coastal city.', GRADUATE: 'Assess environmental impacts of desalination.', PHD: 'Analyze emerging desalination technologies.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-desal-game', type: 'simulation', title: 'Desalination Engineer', description: 'Design and operate desalination plants!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-desal-quiz', passingScore: 80, questions: [{ id: 'wdslq1', question: { ELEMENTARY: 'What does desalination remove from water?', MIDDLE_SCHOOL: 'What are the two main desalination methods?', HIGH_SCHOOL: 'What does reverse osmosis use to separate salt?', UNDERGRADUATE: 'What recovers energy in RO plants?', GRADUATE: 'What is brine?', PHD: 'What emerging membrane material shows promise?' }, options: { ELEMENTARY: ['Salt', 'Fish', 'Sand', 'Color'], MIDDLE_SCHOOL: ['Thermal and membrane (RO)', 'Freezing and heating', 'Mixing and settling', 'Filtering and boiling only'], HIGH_SCHOOL: ['Pressure and membranes', 'Chemicals only', 'Magnets', 'Electricity only'], UNDERGRADUATE: ['Energy recovery devices (pressure exchangers)', 'Nothing - energy is lost', 'Solar panels', 'Wind turbines'], GRADUATE: ['Concentrated salt waste stream', 'Fresh water output', 'Clean air', 'Fish food'], PHD: ['Graphene', 'Paper', 'Cotton', 'Glass'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Desalination removes salt from ocean water to make it drinkable!', MIDDLE_SCHOOL: 'The two main methods are thermal (boiling) and membrane (reverse osmosis).', HIGH_SCHOOL: 'RO uses high pressure to force water through semi-permeable membranes that block salt.', UNDERGRADUATE: 'Pressure exchangers and other ERDs recover energy from the high-pressure brine stream.', GRADUATE: 'Brine is the concentrated salt waste that must be carefully disposed of.', PHD: 'Graphene membranes promise higher flux and lower energy requirements.' } }] },
    externalResources: [{ title: 'International Desalination Association', url: 'https://idadesal.org/', type: 'research' }]
  },
  // Module 11: Fog Harvesting
  {
    id: 'water-fog-harvesting',
    slug: 'fog-harvesting',
    title: 'Fog Harvesting',
    description: {
      ELEMENTARY: 'Learn how people catch water from clouds and fog!',
      MIDDLE_SCHOOL: 'Discover how special nets collect water from foggy air.',
      HIGH_SCHOOL: 'Explore fog collection technology, site selection, and water yields.',
      UNDERGRADUATE: 'Analyze fog harvesting systems, mesh optimization, and community implementation.',
      GRADUATE: 'Examine fog water potential, climate factors, and integrated water management.',
      PHD: 'Research biomimetic collectors, atmospheric water dynamics, and scaling challenges.'
    },
    topic: 'water-systems',
    category: 'COLLECTION',
    icon: 'Cloud',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-fog-1', title: 'Catching Clouds', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water from Air!</h2><p>In foggy places, special nets can catch tiny water drops from the air to give people drinking water!</p>', MIDDLE_SCHOOL: '<h2>How Fog Harvesting Works</h2><p>Mesh nets stretched on frames catch fog droplets. The water drips down into collection troughs and storage tanks.</p>', HIGH_SCHOOL: '<h2>Fog Collection Systems</h2><p>Location selection based on fog frequency, wind patterns, and topography. Mesh density and materials affect yield.</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Standard Fog Collectors (SFC), Large Fog Collectors (LFC), mesh materials, and water quality considerations.</p>', GRADUATE: '<h2>Implementation</h2><p>Community engagement, maintenance requirements, integration with other water sources, and sustainability.</p>', PHD: '<h2>Research Frontiers</h2><p>Biomimetic surfaces inspired by desert beetles and spider webs, atmospheric modeling, and hybrid systems.</p>' } }],
    activities: [{ id: 'ws-fog-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Catch the Fog!', MIDDLE_SCHOOL: 'Build a Fog Net', HIGH_SCHOOL: 'Site Selection', UNDERGRADUATE: 'System Design', GRADUATE: 'Community Project', PHD: 'Biomimetic Design' }, description: { ELEMENTARY: 'See how fog turns into drinking water!', MIDDLE_SCHOOL: 'Design a fog collecting net.', HIGH_SCHOOL: 'Find the best location for fog harvesting.', UNDERGRADUATE: 'Design a fog collection system for a village.', GRADUATE: 'Plan a community fog harvesting project.', PHD: 'Design biomimetic fog collection surfaces.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-fog-game', type: 'simulation', title: 'Fog Catcher', description: 'Harvest water from fog to supply a village!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-fog-quiz', passingScore: 80, questions: [{ id: 'wfogq1', question: { ELEMENTARY: 'What does fog harvesting catch?', MIDDLE_SCHOOL: 'What material catches fog?', HIGH_SCHOOL: 'What factors affect fog harvesting success?', UNDERGRADUATE: 'What is an SFC?', GRADUATE: 'Why is community engagement important?', PHD: 'What organism inspires biomimetic fog collectors?' }, options: { ELEMENTARY: ['Water droplets from the air', 'Rain from clouds', 'Snow', 'Dust'], MIDDLE_SCHOOL: ['Mesh or net material', 'Solid walls', 'Glass', 'Plastic sheets'], HIGH_SCHOOL: ['Fog frequency, wind, and topography', 'Only temperature', 'Only altitude', 'Only rainfall'], UNDERGRADUATE: ['Standard Fog Collector', 'Special Fog Container', 'Super Fog Catcher', 'Small Fan Cooler'], GRADUATE: ['For maintenance and long-term success', 'Not important', 'Only for funding', 'For decoration'], PHD: ['Namib desert beetle', 'Polar bear', 'Camel', 'Cactus flower'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Fog harvesters catch tiny water droplets floating in the foggy air!', MIDDLE_SCHOOL: 'Special mesh nets have small holes that catch fog droplets as they blow through.', HIGH_SCHOOL: 'Frequent fog, consistent wind direction, and elevation on ridgelines maximize collection.', UNDERGRADUATE: 'Standard Fog Collector (SFC) is a 1m² test unit used to measure fog water potential.', GRADUATE: 'Community ownership ensures maintenance and protects against vandalism for long-term success.', PHD: 'The Namib desert beetle has bumps and grooves that efficiently capture and channel fog water.' } }] },
    externalResources: [{ title: 'FogQuest', url: 'https://fogquest.org/', type: 'research' }]
  },
  // Module 12: Wetland Conservation
  {
    id: 'water-wetlands',
    slug: 'wetland-conservation',
    title: 'Wetland Conservation',
    description: {
      ELEMENTARY: 'Learn about special places where water and land meet!',
      MIDDLE_SCHOOL: 'Discover why wetlands are so important for water and wildlife.',
      HIGH_SCHOOL: 'Explore wetland ecosystem services, threats, and restoration methods.',
      UNDERGRADUATE: 'Analyze wetland hydrology, ecology, and regulatory frameworks.',
      GRADUATE: 'Examine wetland policy, mitigation banking, and ecosystem valuation.',
      PHD: 'Research wetland carbon dynamics, restoration ecology, and climate resilience.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-wet-1', title: 'Water Wonderlands', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Magical Wetlands!</h2><p>Wetlands are where water meets land. They are home to frogs, birds, and fish, and they help clean our water!</p>', MIDDLE_SCHOOL: '<h2>Wetland Types</h2><p>Marshes, swamps, bogs, and fens. Each has different plants, water sources, and wildlife.</p>', HIGH_SCHOOL: '<h2>Ecosystem Services</h2><p>Wetlands filter water, store floods, sequester carbon, provide habitat, and support fisheries.</p>', UNDERGRADUATE: '<h2>Wetland Science</h2><p>Hydrology, biogeochemistry, and ecology interact to create wetland functions.</p>', GRADUATE: '<h2>Policy and Management</h2><p>Clean Water Act protections, mitigation requirements, and ecosystem service valuation.</p>', PHD: '<h2>Research Frontiers</h2><p>Blue carbon, restoration success metrics, and climate adaptation role of wetlands.</p>' } }],
    activities: [{ id: 'ws-wet-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Explore a Wetland!', MIDDLE_SCHOOL: 'Wetland Types', HIGH_SCHOOL: 'Service Valuation', UNDERGRADUATE: 'Restoration Plan', GRADUATE: 'Mitigation Banking', PHD: 'Carbon Accounting' }, description: { ELEMENTARY: 'Visit a virtual wetland and meet its creatures!', MIDDLE_SCHOOL: 'Identify different types of wetlands.', HIGH_SCHOOL: 'Calculate the value of wetland services.', UNDERGRADUATE: 'Design a wetland restoration project.', GRADUATE: 'Set up a wetland mitigation bank.', PHD: 'Account for wetland carbon sequestration.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-wet-game', type: 'simulation', title: 'Wetland Guardian', description: 'Protect and restore wetland ecosystems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-wet-quiz', passingScore: 80, questions: [{ id: 'wwetq1', question: { ELEMENTARY: 'What do wetlands help clean?', MIDDLE_SCHOOL: 'Name a type of wetland.', HIGH_SCHOOL: 'How do wetlands reduce flooding?', UNDERGRADUATE: 'What law protects US wetlands?', GRADUATE: 'What is mitigation banking?', PHD: 'What is blue carbon?' }, options: { ELEMENTARY: ['Water', 'Air only', 'Clothes', 'Cars'], MIDDLE_SCHOOL: ['Marsh, swamp, or bog', 'Desert', 'Mountain', 'Ocean'], HIGH_SCHOOL: ['They absorb and slowly release water', 'They block water', 'They evaporate water', 'They freeze water'], UNDERGRADUATE: ['Clean Water Act', 'Clean Air Act', 'Wetland Law', 'Water Rights Act'], GRADUATE: ['Trading credits for wetland protection', 'Banking fish', 'Water savings accounts', 'Mud collection'], PHD: ['Carbon stored in coastal/marine ecosystems', 'Blue-colored carbon', 'Ocean pollution', 'Sky carbon'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wetlands act like natural filters, cleaning water as it flows through!', MIDDLE_SCHOOL: 'Wetland types include marshes (grassy), swamps (trees), bogs (peat), and fens (groundwater-fed).', HIGH_SCHOOL: 'Wetlands act as sponges, absorbing floodwaters and releasing them slowly.', UNDERGRADUATE: 'The Clean Water Act Section 404 regulates activities that affect wetlands.', GRADUATE: 'Mitigation banking allows developers to purchase credits from restored wetlands elsewhere.', PHD: 'Blue carbon is carbon captured by coastal ecosystems like salt marshes and mangroves.' } }] },
    externalResources: [{ title: 'Ramsar Convention', url: 'https://www.ramsar.org/', type: 'research' }]
  },
  // Module 13: Water Pricing and Economics
  {
    id: 'water-economics',
    slug: 'water-economics',
    title: 'Water Pricing and Economics',
    description: {
      ELEMENTARY: 'Learn why water costs money and how to use it wisely!',
      MIDDLE_SCHOOL: 'Discover how water prices encourage conservation.',
      HIGH_SCHOOL: 'Explore water rate structures, affordability, and conservation pricing.',
      UNDERGRADUATE: 'Analyze water utility finance, rate design, and economic efficiency.',
      GRADUATE: 'Examine water markets, pricing theory, and equity considerations.',
      PHD: 'Research optimal pricing, behavioral economics, and water market design.'
    },
    topic: 'water-systems',
    category: 'ECONOMICS',
    icon: 'DollarSign',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-econ-1', title: 'Water Has Value', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Costs Money!</h2><p>It takes work to clean water and bring it to your home. Thats why we pay for water and should not waste it!</p>', MIDDLE_SCHOOL: '<h2>Why Price Water?</h2><p>Water prices cover treatment, pipes, and pumping. Higher prices for more use encourage conservation.</p>', HIGH_SCHOOL: '<h2>Rate Structures</h2><p>Flat rates, uniform volumetric, increasing block rates, and seasonal pricing each have different effects.</p>', UNDERGRADUATE: '<h2>Utility Finance</h2><p>Revenue requirements, cost of service, rate design, and balancing objectives.</p>', GRADUATE: '<h2>Water Markets</h2><p>Water rights trading, scarcity pricing, and market-based allocation mechanisms.</p>', PHD: '<h2>Research Frontiers</h2><p>Behavioral responses to pricing, optimal tariff design, and equity-efficiency tradeoffs.</p>' } }],
    activities: [{ id: 'ws-econ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Water, Save Money!', MIDDLE_SCHOOL: 'Read Your Bill', HIGH_SCHOOL: 'Design Rates', UNDERGRADUATE: 'Utility Budget', GRADUATE: 'Water Market', PHD: 'Optimal Pricing' }, description: { ELEMENTARY: 'See how saving water saves money!', MIDDLE_SCHOOL: 'Understand a water bill.', HIGH_SCHOOL: 'Design a water rate structure.', UNDERGRADUATE: 'Balance a water utility budget.', GRADUATE: 'Simulate a water market.', PHD: 'Design optimal water pricing.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-econ-game', type: 'simulation', title: 'Water Economist', description: 'Set water prices to balance conservation and affordability!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-econ-quiz', passingScore: 80, questions: [{ id: 'weconq1', question: { ELEMENTARY: 'Why do we pay for water?', MIDDLE_SCHOOL: 'What happens when water costs more?', HIGH_SCHOOL: 'What are increasing block rates?', UNDERGRADUATE: 'What is cost of service?', GRADUATE: 'What are water markets?', PHD: 'What is the equity-efficiency tradeoff?' }, options: { ELEMENTARY: ['To pay for cleaning and delivering it', 'Because water is rare', 'For fun', 'No reason'], MIDDLE_SCHOOL: ['People tend to use less', 'People use more', 'No change', 'People get angry'], HIGH_SCHOOL: ['Higher prices for higher use levels', 'Lower prices for more use', 'Same price always', 'Random prices'], UNDERGRADUATE: ['Calculating what utility services cost', 'Free service', 'No cost tracking', 'Customer surveys'], GRADUATE: ['Systems for trading water rights', 'Fish markets', 'Bottled water stores', 'Swimming pools'], PHD: ['Balancing fairness and economic efficiency', 'No tradeoff exists', 'Only efficiency matters', 'Only equity matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We pay for water because it costs money to clean it and pump it through pipes to our homes!', MIDDLE_SCHOOL: 'When water costs more, people are more careful about how much they use.', HIGH_SCHOOL: 'Increasing block rates charge more per gallon as usage increases, encouraging conservation.', UNDERGRADUATE: 'Cost of service analysis determines what it actually costs to provide water to different customers.', GRADUATE: 'Water markets allow trading of water rights between users, allocating water to highest-value uses.', PHD: 'Efficient pricing may burden low-income households; lifeline rates and assistance programs address equity.' } }] },
    externalResources: [{ title: 'AWWA Water Rates', url: 'https://www.awwa.org/Resources-Tools/Resource-Topics/Rates-Charges', type: 'research' }]
  },
  // Module 14: Water Rights and Law
  {
    id: 'water-law',
    slug: 'water-rights-law',
    title: 'Water Rights and Law',
    description: {
      ELEMENTARY: 'Learn about rules that help people share water fairly!',
      MIDDLE_SCHOOL: 'Discover how laws decide who can use water.',
      HIGH_SCHOOL: 'Explore water rights doctrines, permits, and interstate compacts.',
      UNDERGRADUATE: 'Analyze riparian and prior appropriation systems, water law evolution.',
      GRADUATE: 'Examine international water law, transboundary disputes, and reform efforts.',
      PHD: 'Research water governance, institutional design, and adaptive management.'
    },
    topic: 'water-systems',
    category: 'GOVERNANCE',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-law-1', title: 'Sharing Water Fairly', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Rules!</h2><p>When many people want the same water, we need fair rules so everyone can share!</p>', MIDDLE_SCHOOL: '<h2>Water Rights Basics</h2><p>Laws determine who can take water from rivers and groundwater. Rights can be based on land ownership or first use.</p>', HIGH_SCHOOL: '<h2>Water Law Doctrines</h2><p>Riparian rights (eastern US) vs. prior appropriation (western US). First in time, first in right.</p>', UNDERGRADUATE: '<h2>Legal Frameworks</h2><p>Permits, beneficial use, transfers, and the public trust doctrine.</p>', GRADUATE: '<h2>Transboundary Water</h2><p>Interstate compacts, international treaties, and dispute resolution mechanisms.</p>', PHD: '<h2>Research Frontiers</h2><p>Adaptive governance, climate adaptation in water law, and indigenous water rights.</p>' } }],
    activities: [{ id: 'ws-law-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Share the River!', MIDDLE_SCHOOL: 'Who Gets Water?', HIGH_SCHOOL: 'Water Court', UNDERGRADUATE: 'Rights Analysis', GRADUATE: 'Treaty Negotiation', PHD: 'Governance Design' }, description: { ELEMENTARY: 'Help neighbors share water from a river!', MIDDLE_SCHOOL: 'Decide who has rights to use water.', HIGH_SCHOOL: 'Simulate a water rights case.', UNDERGRADUATE: 'Analyze water rights in a basin.', GRADUATE: 'Negotiate a transboundary water treaty.', PHD: 'Design adaptive water governance.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-law-game', type: 'simulation', title: 'Water Judge', description: 'Resolve water disputes and allocate rights fairly!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-law-quiz', passingScore: 80, questions: [{ id: 'wlawq1', question: { ELEMENTARY: 'Why do we need water rules?', MIDDLE_SCHOOL: 'What are water rights?', HIGH_SCHOOL: 'What does first in time, first in right mean?', UNDERGRADUATE: 'What is beneficial use?', GRADUATE: 'What is an interstate compact?', PHD: 'What is adaptive governance?' }, options: { ELEMENTARY: ['To share water fairly', 'For fun', 'To make water blue', 'No reason'], MIDDLE_SCHOOL: ['Legal permission to use water', 'Water opinions', 'Water facts', 'Water wishes'], HIGH_SCHOOL: ['Earlier users have priority', 'Fastest user wins', 'Biggest user wins', 'Random selection'], UNDERGRADUATE: ['Water must be used for approved purposes', 'Any use is fine', 'Wasteful use allowed', 'No rules'], GRADUATE: ['Agreement between states on shared water', 'Company contract', 'Personal promise', 'City law'], PHD: ['Governance that evolves with conditions', 'Fixed rules forever', 'No rules', 'Random changes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Water rules help everyone share water fairly so no one takes too much!', MIDDLE_SCHOOL: 'Water rights are legal permissions that say who can use water and how much.', HIGH_SCHOOL: 'Prior appropriation gives older water rights priority over newer ones during shortages.', UNDERGRADUATE: 'Beneficial use requires water to be used for recognized purposes, not wasted.', GRADUATE: 'Interstate compacts are binding agreements between states for managing shared water resources.', PHD: 'Adaptive governance allows institutions to learn and adjust as conditions and knowledge change.' } }] },
    externalResources: [{ title: 'Water Law Overview', url: 'https://www.americanbar.org/groups/environment_energy_resources/publications/', type: 'research' }]
  },
  // Module 15: Climate Adaptation for Water
  {
    id: 'water-climate-adaptation',
    slug: 'climate-adaptation-water',
    title: 'Climate Adaptation for Water',
    description: {
      ELEMENTARY: 'Learn how to prepare for changes in rain and weather!',
      MIDDLE_SCHOOL: 'Discover how communities adapt their water systems to climate change.',
      HIGH_SCHOOL: 'Explore climate impacts on water resources and adaptation strategies.',
      UNDERGRADUATE: 'Analyze vulnerability assessments, adaptation planning, and resilience measures.',
      GRADUATE: 'Examine integrated water resources management under climate uncertainty.',
      PHD: 'Research climate modeling for water, decision making under uncertainty, and transformation.'
    },
    topic: 'water-systems',
    category: 'RESILIENCE',
    icon: 'CloudRain',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-clim-1', title: 'Weather is Changing', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Preparing for Change!</h2><p>The weather is changing. Some places get more floods, others get more droughts. We need to be ready!</p>', MIDDLE_SCHOOL: '<h2>Climate and Water</h2><p>Climate change affects rainfall, snowpack, sea level, and extreme events. Water systems must adapt.</p>', HIGH_SCHOOL: '<h2>Climate Impacts</h2><p>More intense storms, changing precipitation patterns, earlier snowmelt, sea level rise, and increased droughts.</p>', UNDERGRADUATE: '<h2>Vulnerability Assessment</h2><p>Exposure, sensitivity, and adaptive capacity determine system vulnerability to climate impacts.</p>', GRADUATE: '<h2>Adaptation Planning</h2><p>No-regrets strategies, flexible pathways, and decision making under deep uncertainty.</p>', PHD: '<h2>Research Frontiers</h2><p>Downscaled climate projections, robust decision making, and transformative adaptation.</p>' } }],
    activities: [{ id: 'ws-clim-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Get Ready!', MIDDLE_SCHOOL: 'Plan Ahead', HIGH_SCHOOL: 'Assess Risks', UNDERGRADUATE: 'Vulnerability Analysis', GRADUATE: 'Adaptation Pathways', PHD: 'Scenario Planning' }, description: { ELEMENTARY: 'Prepare your town for weather changes!', MIDDLE_SCHOOL: 'Plan how to adapt to climate change.', HIGH_SCHOOL: 'Assess climate risks to water supply.', UNDERGRADUATE: 'Conduct a climate vulnerability assessment.', GRADUATE: 'Develop climate adaptation pathways.', PHD: 'Plan under deep climate uncertainty.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-clim-game', type: 'simulation', title: 'Climate Adapter', description: 'Prepare water systems for a changing climate!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-clim-quiz', passingScore: 80, questions: [{ id: 'wclimq1', question: { ELEMENTARY: 'What should we do about weather changes?', MIDDLE_SCHOOL: 'What does climate adaptation mean?', HIGH_SCHOOL: 'What is a climate vulnerability?', UNDERGRADUATE: 'What is adaptive capacity?', GRADUATE: 'What is a no-regrets strategy?', PHD: 'What is deep uncertainty?' }, options: { ELEMENTARY: ['Prepare and adapt', 'Ignore it', 'Stop drinking water', 'Move to space'], MIDDLE_SCHOOL: ['Changing to handle new climate conditions', 'Stopping climate', 'Predicting weather', 'Making rain'], HIGH_SCHOOL: ['Susceptibility to climate harm', 'Weather forecast', 'Climate prediction', 'Temperature reading'], UNDERGRADUATE: ['Ability to adjust to changes', 'Ignoring problems', 'Moving away', 'Building walls'], GRADUATE: ['Actions beneficial regardless of climate outcome', 'Risky investments', 'Doing nothing', 'Hoping for best'], PHD: ['Uncertainty where probabilities are unknown', 'Small uncertainty', 'No uncertainty', 'Certain outcomes'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We need to prepare our water systems to handle different weather patterns!', MIDDLE_SCHOOL: 'Climate adaptation means changing how we manage water to handle new climate conditions.', HIGH_SCHOOL: 'Vulnerability is how likely a system is to be harmed by climate impacts.', UNDERGRADUATE: 'Adaptive capacity is the ability of systems to adjust to change and cope with variability.', GRADUATE: 'No-regrets strategies provide benefits under any climate scenario, like improving efficiency.', PHD: 'Deep uncertainty means we cannot reliably assign probabilities to future outcomes.' } }] },
    externalResources: [{ title: 'Climate Adaptation', url: 'https://www.epa.gov/climate-adaptation', type: 'research' }]
  },
  // Module 16: Water Conservation
  {
    id: 'water-conservation',
    slug: 'water-conservation',
    title: 'Water Conservation',
    description: {
      ELEMENTARY: 'Learn easy ways to save water every day!',
      MIDDLE_SCHOOL: 'Discover how to use less water at home and school.',
      HIGH_SCHOOL: 'Explore indoor and outdoor conservation strategies and technologies.',
      UNDERGRADUATE: 'Analyze conservation program design, behavior change, and water-use efficiency.',
      GRADUATE: 'Examine conservation pricing, demand management, and long-term savings.',
      PHD: 'Research conservation potential, price elasticity, and behavioral interventions.'
    },
    topic: 'water-systems',
    category: 'CONSERVATION',
    icon: 'Droplet',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-cons-1', title: 'Saving Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Save Every Drop!</h2><p>Turn off the tap while brushing, take shorter showers, and fix leaky faucets to save water!</p>', MIDDLE_SCHOOL: '<h2>Water-Saving Habits</h2><p>Low-flow fixtures, efficient appliances, and smart irrigation can cut water use dramatically.</p>', HIGH_SCHOOL: '<h2>Conservation Technology</h2><p>High-efficiency toilets, smart irrigation controllers, and water audits identify savings.</p>', UNDERGRADUATE: '<h2>Program Design</h2><p>Rebates, education, pricing, and regulations drive conservation adoption.</p>', GRADUATE: '<h2>Demand Management</h2><p>Long-term conservation vs. short-term curtailment. Price signals and behavioral approaches.</p>', PHD: '<h2>Research Frontiers</h2><p>Conservation potential studies, behavioral economics, and persistent savings.</p>' } }],
    activities: [{ id: 'ws-cons-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Water Saver Hero!', MIDDLE_SCHOOL: 'Home Water Audit', HIGH_SCHOOL: 'Conservation Plan', UNDERGRADUATE: 'Program Design', GRADUATE: 'Demand Modeling', PHD: 'Behavioral Study' }, description: { ELEMENTARY: 'Find ways to save water at home!', MIDDLE_SCHOOL: 'Audit water use in a home.', HIGH_SCHOOL: 'Design a water conservation plan.', UNDERGRADUATE: 'Design a conservation program.', GRADUATE: 'Model water demand management.', PHD: 'Design a conservation behavior study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-cons-game', type: 'simulation', title: 'Conservation Champion', description: 'Save water and protect resources!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-cons-quiz', passingScore: 80, questions: [{ id: 'wconsq1', question: { ELEMENTARY: 'How can you save water when brushing teeth?', MIDDLE_SCHOOL: 'What is a low-flow fixture?', HIGH_SCHOOL: 'What does a water audit find?', UNDERGRADUATE: 'What drives conservation adoption?', GRADUATE: 'What is demand management?', PHD: 'What is price elasticity of water demand?' }, options: { ELEMENTARY: ['Turn off the tap while brushing', 'Leave tap running', 'Use more water', 'Brush longer'], MIDDLE_SCHOOL: ['A faucet or showerhead using less water', 'A slow drain', 'A water fountain', 'A swimming pool'], HIGH_SCHOOL: ['Where water is being used and wasted', 'Financial records', 'Customer names', 'Water sources only'], UNDERGRADUATE: ['Rebates, education, pricing, and rules', 'Nothing works', 'Only rules', 'Only price'], GRADUATE: ['Strategies to reduce water demand', 'Increasing supply', 'Ignoring use', 'Adding more pipes'], PHD: ['How much demand changes with price', 'Fixed demand', 'Elastic bands', 'Water pressure'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Turning off the tap while brushing saves gallons of water every day!', MIDDLE_SCHOOL: 'Low-flow fixtures deliver less water per minute while still working well.', HIGH_SCHOOL: 'Water audits identify where water is being used and opportunities for savings.', UNDERGRADUATE: 'Conservation programs use incentives, education, pricing, and regulations to drive adoption.', GRADUATE: 'Demand management includes strategies to reduce or shift water demand over time.', PHD: 'Price elasticity measures how much water demand decreases when prices increase.' } }] },
    externalResources: [{ title: 'WaterSense', url: 'https://www.epa.gov/watersense', type: 'research' }]
  },
  // Module 17: Water Reuse and Recycling
  {
    id: 'water-reuse',
    slug: 'water-reuse-recycling',
    title: 'Water Reuse and Recycling',
    description: {
      ELEMENTARY: 'Learn how we can use water more than once!',
      MIDDLE_SCHOOL: 'Discover how treated wastewater becomes a resource.',
      HIGH_SCHOOL: 'Explore water recycling, reuse applications, and treatment requirements.',
      UNDERGRADUATE: 'Analyze direct and indirect potable reuse, regulations, and public acceptance.',
      GRADUATE: 'Examine advanced treatment, one water planning, and reuse economics.',
      PHD: 'Research emerging contaminants, risk assessment, and fit-for-purpose treatment.'
    },
    topic: 'water-systems',
    category: 'REUSE',
    icon: 'RefreshCcw',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-reuse-1', title: 'Using Water Again', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Goes Round!</h2><p>After we use water, it can be cleaned and used again! This helps when fresh water is scarce.</p>', MIDDLE_SCHOOL: '<h2>Recycled Water</h2><p>Treated wastewater can irrigate parks, cool power plants, or even become drinking water with advanced treatment.</p>', HIGH_SCHOOL: '<h2>Reuse Types</h2><p>Non-potable reuse (irrigation, industrial), indirect potable reuse (aquifer recharge), and direct potable reuse.</p>', UNDERGRADUATE: '<h2>Treatment Requirements</h2><p>Multiple barriers, advanced oxidation, and monitoring for different reuse applications.</p>', GRADUATE: '<h2>One Water Approach</h2><p>Integrating all water sources - fresh, recycled, storm - into unified management.</p>', PHD: '<h2>Research Frontiers</h2><p>Emerging contaminants, CECs, and fit-for-purpose treatment optimization.</p>' } }],
    activities: [{ id: 'ws-reuse-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Clean and Reuse!', MIDDLE_SCHOOL: 'Reuse Matching', HIGH_SCHOOL: 'Treatment Train', UNDERGRADUATE: 'Reuse Planning', GRADUATE: 'One Water Design', PHD: 'Risk Assessment' }, description: { ELEMENTARY: 'See how water gets cleaned and reused!', MIDDLE_SCHOOL: 'Match reuse water to appropriate uses.', HIGH_SCHOOL: 'Design a treatment train for reuse.', UNDERGRADUATE: 'Plan a water reuse program.', GRADUATE: 'Design a one water system.', PHD: 'Assess health risks for reuse.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-reuse-game', type: 'simulation', title: 'Reuse Master', description: 'Turn wastewater into a valuable resource!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-reuse-quiz', passingScore: 80, questions: [{ id: 'wreuseq1', question: { ELEMENTARY: 'Can we use water more than once?', MIDDLE_SCHOOL: 'What can recycled water be used for?', HIGH_SCHOOL: 'What is indirect potable reuse?', UNDERGRADUATE: 'What is a multiple barrier approach?', GRADUATE: 'What is one water?', PHD: 'What are CECs?' }, options: { ELEMENTARY: ['Yes, after cleaning it', 'No, never', 'Only once', 'Water disappears'], MIDDLE_SCHOOL: ['Irrigation, cooling, or even drinking', 'Nothing', 'Only drinking', 'Only for fish'], HIGH_SCHOOL: ['Adding treated water to natural buffer before drinking', 'Drinking directly', 'No reuse', 'Ocean discharge'], UNDERGRADUATE: ['Multiple treatment steps ensuring safety', 'Single treatment', 'No barriers', 'Physical barriers only'], GRADUATE: ['Integrated management of all water sources', 'Only fresh water', 'Only wastewater', 'One water bottle'], PHD: ['Contaminants of Emerging Concern', 'Customer Experience Centers', 'Clean Energy Credits', 'Carbon Emission Controls'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Water can be cleaned and used again and again!', MIDDLE_SCHOOL: 'Recycled water can irrigate landscapes, cool power plants, or become drinking water with treatment.', HIGH_SCHOOL: 'Indirect potable reuse puts treated water into an aquifer or reservoir before drinking water treatment.', UNDERGRADUATE: 'Multiple barriers use several treatment steps so no single failure compromises safety.', GRADUATE: 'One water integrates freshwater, recycled water, and stormwater into unified resource management.', PHD: 'CECs (Contaminants of Emerging Concern) include pharmaceuticals and personal care products in wastewater.' } }] },
    externalResources: [{ title: 'Water Reuse', url: 'https://www.epa.gov/waterreuse', type: 'research' }]
  },
  // Module 18: Green Infrastructure
  {
    id: 'water-green-infrastructure',
    slug: 'green-infrastructure',
    title: 'Green Infrastructure',
    description: {
      ELEMENTARY: 'Learn how plants and nature help manage water!',
      MIDDLE_SCHOOL: 'Discover rain gardens, green roofs, and natural water management.',
      HIGH_SCHOOL: 'Explore green infrastructure design, performance, and maintenance.',
      UNDERGRADUATE: 'Analyze green infrastructure economics, modeling, and co-benefits.',
      GRADUATE: 'Examine green infrastructure policy, financing, and program implementation.',
      PHD: 'Research green infrastructure performance, optimization, and climate resilience.'
    },
    topic: 'water-systems',
    category: 'GREEN',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-gi-1', title: 'Nature Helps!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plants Clean Water!</h2><p>Gardens and trees soak up rain and help clean water naturally!</p>', MIDDLE_SCHOOL: '<h2>Green Infrastructure</h2><p>Rain gardens, bioswales, green roofs, and permeable pavement manage stormwater naturally.</p>', HIGH_SCHOOL: '<h2>GI Design</h2><p>Sizing, plant selection, soil media, and maintenance for rain gardens and bioretention.</p>', UNDERGRADUATE: '<h2>GI Analysis</h2><p>Hydrologic modeling, volume reduction, pollutant removal, and lifecycle costs.</p>', GRADUATE: '<h2>GI Implementation</h2><p>Policies, incentives, maintenance agreements, and tracking performance.</p>', PHD: '<h2>Research Frontiers</h2><p>Long-term performance, climate resilience, and optimization under uncertainty.</p>' } }],
    activities: [{ id: 'ws-gi-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Rain Garden!', MIDDLE_SCHOOL: 'GI Types', HIGH_SCHOOL: 'Design Practice', UNDERGRADUATE: 'Model Performance', GRADUATE: 'Program Design', PHD: 'Optimization' }, description: { ELEMENTARY: 'Create a garden that catches rain!', MIDDLE_SCHOOL: 'Learn about different green infrastructure types.', HIGH_SCHOOL: 'Design a green infrastructure practice.', UNDERGRADUATE: 'Model green infrastructure performance.', GRADUATE: 'Design a green infrastructure program.', PHD: 'Optimize green infrastructure networks.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-gi-game', type: 'simulation', title: 'Green Builder', description: 'Design green infrastructure to manage stormwater!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-gi-quiz', passingScore: 80, questions: [{ id: 'wgiq1', question: { ELEMENTARY: 'What can a rain garden do?', MIDDLE_SCHOOL: 'What is a bioswale?', HIGH_SCHOOL: 'What is bioretention?', UNDERGRADUATE: 'What are GI co-benefits?', GRADUATE: 'What is a common GI barrier?', PHD: 'What is stormwater performance uncertainty?' }, options: { ELEMENTARY: ['Soak up rain and filter water', 'Make more rain', 'Stop all water', 'Nothing'], MIDDLE_SCHOOL: ['A vegetated channel that filters runoff', 'A type of plant', 'A rain barrel', 'A pond'], HIGH_SCHOOL: ['A practice using soil and plants to filter runoff', 'Water retention only', 'No filtration', 'Concrete structure'], UNDERGRADUATE: ['Heat reduction, habitat, and aesthetics', 'No other benefits', 'Only water', 'Only cost'], GRADUATE: ['Long-term maintenance responsibility', 'No barriers', 'Too easy', 'Perfect technology'], PHD: ['Variability in how practices perform over time', 'Perfect prediction', 'No uncertainty', 'Certain performance'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Rain gardens soak up rainwater and filter out pollution naturally!', MIDDLE_SCHOOL: 'A bioswale is a vegetated channel that slows and filters stormwater runoff.', HIGH_SCHOOL: 'Bioretention uses engineered soil media and plants to capture and treat stormwater.', UNDERGRADUATE: 'GI provides co-benefits including urban heat reduction, habitat, air quality, and aesthetics.', GRADUATE: 'Ensuring long-term maintenance is a common barrier to green infrastructure success.', PHD: 'GI performance varies with soil conditions, weather patterns, and maintenance quality.' } }] },
    externalResources: [{ title: 'Green Infrastructure', url: 'https://www.epa.gov/green-infrastructure', type: 'research' }]
  },
  // Module 19: Water Security
  {
    id: 'water-security',
    slug: 'water-security',
    title: 'Water Security',
    description: {
      ELEMENTARY: 'Learn why clean water for everyone is important!',
      MIDDLE_SCHOOL: 'Discover challenges to water access around the world.',
      HIGH_SCHOOL: 'Explore water security dimensions, threats, and solutions.',
      UNDERGRADUATE: 'Analyze water security frameworks, indicators, and assessment methods.',
      GRADUATE: 'Examine water security policy, conflict, and governance.',
      PHD: 'Research water security measurement, transboundary challenges, and future scenarios.'
    },
    topic: 'water-systems',
    category: 'SECURITY',
    icon: 'Shield',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-sec-1', title: 'Safe Water for All', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Everyone Needs Water!</h2><p>Clean, safe water is something everyone needs. We must protect water for all people!</p>', MIDDLE_SCHOOL: '<h2>Global Water Challenges</h2><p>Billions lack safe water. Climate change, pollution, and growing populations increase pressure.</p>', HIGH_SCHOOL: '<h2>Water Security</h2><p>Having reliable access to adequate water of acceptable quality for health, livelihoods, and ecosystems.</p>', UNDERGRADUATE: '<h2>Security Framework</h2><p>Availability, access, quality, and stability. Physical, economic, and institutional dimensions.</p>', GRADUATE: '<h2>Water Conflict</h2><p>Water scarcity can cause conflict, but more often cooperation. Transboundary water management.</p>', PHD: '<h2>Research Frontiers</h2><p>Water security indices, scenario planning, and transboundary water governance.</p>' } }],
    activities: [{ id: 'ws-sec-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Water for Everyone!', MIDDLE_SCHOOL: 'Global Challenges', HIGH_SCHOOL: 'Security Assessment', UNDERGRADUATE: 'Framework Analysis', GRADUATE: 'Conflict Scenario', PHD: 'Index Development' }, description: { ELEMENTARY: 'Help bring water to those who need it!', MIDDLE_SCHOOL: 'Explore global water challenges.', HIGH_SCHOOL: 'Assess water security in a region.', UNDERGRADUATE: 'Apply a water security framework.', GRADUATE: 'Analyze a transboundary water conflict.', PHD: 'Develop a water security index.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-sec-game', type: 'simulation', title: 'Water Guardian', description: 'Ensure water security for all!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-sec-quiz', passingScore: 80, questions: [{ id: 'wsecq1', question: { ELEMENTARY: 'Does everyone have clean water?', MIDDLE_SCHOOL: 'How many people lack safe water?', HIGH_SCHOOL: 'What is water security?', UNDERGRADUATE: 'What are water security dimensions?', GRADUATE: 'Does water scarcity cause wars?', PHD: 'What is a water security index?' }, options: { ELEMENTARY: ['No, many people need help getting clean water', 'Yes, everyone does', 'Water doesnt matter', 'Only rich people need water'], MIDDLE_SCHOOL: ['Billions of people', 'Nobody', 'Only ten people', 'Everyone has water'], HIGH_SCHOOL: ['Reliable access to adequate quality water', 'Locked water', 'Private water', 'Water guards'], UNDERGRADUATE: ['Availability, access, quality, stability', 'Only amount', 'Only quality', 'Only access'], GRADUATE: ['More often cooperation than conflict', 'Always war', 'Never conflict', 'No relationship'], PHD: ['A measure combining water security indicators', 'A simple count', 'A water list', 'A security camera'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Many people around the world dont have access to clean, safe water.', MIDDLE_SCHOOL: 'About 2 billion people lack access to safely managed drinking water.', HIGH_SCHOOL: 'Water security means having reliable access to enough water of acceptable quality.', UNDERGRADUATE: 'Water security has physical, economic, and institutional dimensions affecting availability, access, quality, and stability.', GRADUATE: 'Shared water resources more often lead to cooperation and treaties than armed conflict.', PHD: 'Water security indices combine multiple indicators into aggregate measures for comparison.' } }] },
    externalResources: [{ title: 'UN Water Security', url: 'https://www.unwater.org/water-facts/water-security', type: 'research' }]
  },
  // Module 20: Integrated Water Management
  {
    id: 'water-integrated',
    slug: 'integrated-water-management',
    title: 'Integrated Water Management',
    description: {
      ELEMENTARY: 'Learn how we manage all types of water together!',
      MIDDLE_SCHOOL: 'Discover how cities connect water, wastewater, and stormwater.',
      HIGH_SCHOOL: 'Explore integrated water resources management principles and practice.',
      UNDERGRADUATE: 'Analyze IWRM frameworks, stakeholder engagement, and implementation.',
      GRADUATE: 'Examine water governance, basin planning, and institutional coordination.',
      PHD: 'Research integrated water modeling, adaptive management, and system transformation.'
    },
    topic: 'water-systems',
    category: 'INTEGRATED',
    icon: 'GitMerge',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-iwm-1', title: 'All Water Together', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Works Together!</h2><p>All water is connected - rain, rivers, drinking water, and wastewater. We manage them all together!</p>', MIDDLE_SCHOOL: '<h2>Connected Water</h2><p>Cities manage drinking water, wastewater, and stormwater. Smart cities connect these systems.</p>', HIGH_SCHOOL: '<h2>IWRM Principles</h2><p>Coordinated development of water, land, and resources. Maximizing welfare without compromising sustainability.</p>', UNDERGRADUATE: '<h2>IWRM Implementation</h2><p>Stakeholder participation, basin planning, and balancing competing uses.</p>', GRADUATE: '<h2>Water Governance</h2><p>Institutions, policies, and coordination mechanisms for integrated management.</p>', PHD: '<h2>Research Frontiers</h2><p>Integrated modeling, adaptive governance, and socio-hydrological systems.</p>' } }],
    activities: [{ id: 'ws-iwm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Connect the Water!', MIDDLE_SCHOOL: 'System Links', HIGH_SCHOOL: 'Basin Planning', UNDERGRADUATE: 'Stakeholder Balance', GRADUATE: 'Governance Design', PHD: 'Integrated Model' }, description: { ELEMENTARY: 'See how all water connects together!', MIDDLE_SCHOOL: 'Find connections between water systems.', HIGH_SCHOOL: 'Develop an integrated basin plan.', UNDERGRADUATE: 'Balance stakeholder water interests.', GRADUATE: 'Design water governance structure.', PHD: 'Build an integrated water model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-iwm-game', type: 'simulation', title: 'Water Integrator', description: 'Manage all water resources together!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-iwm-quiz', passingScore: 80, questions: [{ id: 'wiwmq1', question: { ELEMENTARY: 'Are different types of water connected?', MIDDLE_SCHOOL: 'What systems do cities manage together?', HIGH_SCHOOL: 'What is IWRM?', UNDERGRADUATE: 'Why is stakeholder participation important?', GRADUATE: 'What is water governance?', PHD: 'What is a socio-hydrological system?' }, options: { ELEMENTARY: ['Yes, all water is connected', 'No, water is separate', 'Only rivers', 'Only rain'], MIDDLE_SCHOOL: ['Drinking water, wastewater, and stormwater', 'Only drinking water', 'Only rain', 'Nothing'], HIGH_SCHOOL: ['Integrated Water Resources Management', 'International Water Rules Meeting', 'Indoor Water Recycling Method', 'Irrigation Water Regulation Ministry'], UNDERGRADUATE: ['Different users have competing needs and knowledge', 'Not important', 'Only experts matter', 'No participation needed'], GRADUATE: ['Rules and institutions for managing water', 'Water police', 'Water companies only', 'No governance exists'], PHD: ['Coupled human-water systems with feedback', 'Only water models', 'Only social models', 'Separate systems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Yes! Rain becomes river water, drinking water, wastewater, and back again - all connected!', MIDDLE_SCHOOL: 'Smart cities integrate drinking water supply, wastewater treatment, and stormwater management.', HIGH_SCHOOL: 'IWRM coordinates development of water, land, and resources to maximize welfare sustainably.', UNDERGRADUATE: 'Stakeholders have different needs and local knowledge essential for effective water management.', GRADUATE: 'Water governance includes the rules, institutions, and processes for making water decisions.', PHD: 'Socio-hydrological systems model coupled feedbacks between human behavior and water systems.' } }] },
    externalResources: [{ title: 'IWRM', url: 'https://www.gwp.org/en/learn/iwrm/', type: 'research' }]
  },
  {
    id: 'water-desalination',
    slug: 'desalination',
    title: 'Desalination Technology',
    description: {
      ELEMENTARY: 'Learn how we can turn salty ocean water into fresh drinking water!',
      MIDDLE_SCHOOL: 'Discover how desalination removes salt from seawater for drinking.',
      HIGH_SCHOOL: 'Explore desalination technologies, energy requirements, and environmental impacts.',
      UNDERGRADUATE: 'Analyze reverse osmosis, thermal processes, and desalination economics.',
      GRADUATE: 'Examine desalination sustainability, brine management, and renewable integration.',
      PHD: 'Research advanced membranes, energy recovery, and desalination system optimization.'
    },
    topic: 'water-systems',
    category: 'TECHNOLOGY',
    icon: 'Flask',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-desal-1', title: 'Fresh from Salt', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Making Seawater Drinkable!</h2><p>We can remove the salt from ocean water to make fresh water for people to drink!</p>', MIDDLE_SCHOOL: '<h2>How Desalination Works</h2><p>Desalination removes dissolved salts from seawater using membranes or evaporation to create fresh water.</p>', HIGH_SCHOOL: '<h2>Desalination Methods</h2><p>Reverse osmosis pushes water through membranes. Thermal methods evaporate and condense water.</p>', UNDERGRADUATE: '<h2>System Engineering</h2><p>Pretreatment, membrane arrays, energy recovery, and post-treatment for desalination plants.</p>', GRADUATE: '<h2>Sustainability Challenges</h2><p>Energy intensity, brine disposal, marine impacts, and renewable energy integration.</p>', PHD: '<h2>Research Frontiers</h2><p>Graphene membranes, forward osmosis, and solar-powered desalination.</p>' } }],
    activities: [{ id: 'ws-desal-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Remove the Salt!', MIDDLE_SCHOOL: 'Desalination Lab', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Plant Design', GRADUATE: 'Sustainability Analysis', PHD: 'Membrane Research' }, description: { ELEMENTARY: 'Turn salty water into fresh water!', MIDDLE_SCHOOL: 'Test desalination methods.', HIGH_SCHOOL: 'Compare RO and thermal systems.', UNDERGRADUATE: 'Design a desalination plant.', GRADUATE: 'Analyze sustainability tradeoffs.', PHD: 'Research advanced membranes.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-desal-game', type: 'simulation', title: 'Desalination Engineer', description: 'Turn seawater into fresh water!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-desal-quiz', passingScore: 80, questions: [{ id: 'wdesalq1', question: { ELEMENTARY: 'What does desalination remove?', MIDDLE_SCHOOL: 'What is reverse osmosis?', HIGH_SCHOOL: 'Why is desalination energy-intensive?', UNDERGRADUATE: 'What is energy recovery?', GRADUATE: 'What is brine?', PHD: 'What is forward osmosis?' }, options: { ELEMENTARY: ['Salt from seawater', 'Dirt from rivers', 'Fish from oceans', 'Sand from beaches'], MIDDLE_SCHOOL: ['Pushing water through special filters', 'Reversing water flow', 'Cleaning fish', 'Boiling water'], HIGH_SCHOOL: ['Overcoming osmotic pressure requires energy', 'Its not energy intensive', 'Salt is heavy', 'Machines are inefficient'], UNDERGRADUATE: ['Recapturing pressure from brine stream', 'Recovering lost water', 'Energy storage', 'Power generation'], GRADUATE: ['Concentrated salt water discharge', 'Fish brine', 'Pickled water', 'Fresh water'], PHD: ['Natural osmotic flow through membranes', 'Backward osmosis', 'Side osmosis', 'No such thing'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Desalination removes salt from seawater to make fresh water we can drink!', MIDDLE_SCHOOL: 'Reverse osmosis pushes water through membranes that let water through but block salt.', HIGH_SCHOOL: 'Significant energy is needed to overcome the natural osmotic pressure of salty water.', UNDERGRADUATE: 'Energy recovery devices capture pressure from concentrated brine to reduce energy needs.', GRADUATE: 'Brine is the concentrated salt water left after freshwater is extracted.', PHD: 'Forward osmosis uses natural osmotic gradients to draw water through membranes.' } }] },
    externalResources: [{ title: 'Desalination', url: 'https://www.water.usgs.gov/ogw/gwrp/desalination/', type: 'research' }]
  },
  {
    id: 'water-monitoring',
    slug: 'water-quality-monitoring',
    title: 'Water Quality Monitoring',
    description: {
      ELEMENTARY: 'Learn how scientists test water to make sure it is safe and clean!',
      MIDDLE_SCHOOL: 'Discover how water quality is measured and monitored.',
      HIGH_SCHOOL: 'Explore water quality parameters, testing methods, and monitoring systems.',
      UNDERGRADUATE: 'Analyze monitoring networks, data management, and regulatory compliance.',
      GRADUATE: 'Examine real-time monitoring, sensor networks, and early warning systems.',
      PHD: 'Research remote sensing, machine learning for water quality, and citizen science.'
    },
    topic: 'water-systems',
    category: 'MONITORING',
    icon: 'Search',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-mon-1', title: 'Testing the Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Is the Water Safe?</h2><p>Scientists test water to check for germs, chemicals, and other things that could make people sick.</p>', MIDDLE_SCHOOL: '<h2>Water Quality Tests</h2><p>Testing measures temperature, pH, dissolved oxygen, bacteria, and pollutants.</p>', HIGH_SCHOOL: '<h2>Monitoring Systems</h2><p>Regular sampling, continuous sensors, and biological indicators track water quality over time.</p>', UNDERGRADUATE: '<h2>Monitoring Networks</h2><p>Sampling design, laboratory analysis, QA/QC, and database management.</p>', GRADUATE: '<h2>Real-Time Systems</h2><p>Sensor networks, SCADA integration, and automated response to quality events.</p>', PHD: '<h2>Research Frontiers</h2><p>Satellite monitoring, AI-powered analysis, and participatory monitoring.</p>' } }],
    activities: [{ id: 'ws-mon-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test the Water!', MIDDLE_SCHOOL: 'Quality Lab', HIGH_SCHOOL: 'Monitoring Design', UNDERGRADUATE: 'Network Plan', GRADUATE: 'Real-Time System', PHD: 'AI Analysis' }, description: { ELEMENTARY: 'Test water samples for safety!', MIDDLE_SCHOOL: 'Measure water quality parameters.', HIGH_SCHOOL: 'Design a monitoring program.', UNDERGRADUATE: 'Plan a monitoring network.', GRADUATE: 'Design real-time monitoring.', PHD: 'Apply AI to water quality data.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-mon-game', type: 'simulation', title: 'Water Quality Detective', description: 'Monitor and protect water quality!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-mon-quiz', passingScore: 80, questions: [{ id: 'wmonq1', question: { ELEMENTARY: 'Why do we test water?', MIDDLE_SCHOOL: 'What does pH measure?', HIGH_SCHOOL: 'What are biological indicators?', UNDERGRADUATE: 'What is QA/QC?', GRADUATE: 'What is SCADA?', PHD: 'How can satellites monitor water?' }, options: { ELEMENTARY: ['To make sure it is safe', 'For fun', 'Water doesnt need testing', 'To make it wet'], MIDDLE_SCHOOL: ['How acidic or basic water is', 'Water temperature', 'Water color', 'Water taste'], HIGH_SCHOOL: ['Organisms showing water quality', 'Biological studies', 'Lab biology', 'No indicators'], UNDERGRADUATE: ['Quality Assurance / Quality Control', 'Questions and Answers', 'Quick and Cheap', 'Quantity Check'], GRADUATE: ['Supervisory Control and Data Acquisition', 'Science Control', 'System Check', 'Safety Control'], PHD: ['Detecting color, temperature, and chlorophyll from space', 'They cannot', 'Taking samples', 'Sending divers'] }, correctIndex: 0, explanation: { ELEMENTARY: 'We test water to make sure it is safe and does not have things that could make people sick!', MIDDLE_SCHOOL: 'pH measures how acidic or basic (alkaline) the water is on a scale from 0 to 14.', HIGH_SCHOOL: 'Biological indicators are organisms whose presence or absence indicates water quality conditions.', UNDERGRADUATE: 'QA/QC procedures ensure monitoring data is accurate and reliable.', GRADUATE: 'SCADA systems collect and display real-time data from sensors for system control.', PHD: 'Satellites detect water color, temperature, and algae to indicate water quality from space.' } }] },
    externalResources: [{ title: 'Water Quality', url: 'https://www.epa.gov/national-aquatic-resource-surveys', type: 'research' }]
  },
  {
    id: 'water-aquifer',
    slug: 'aquifer-management',
    title: 'Aquifer and Groundwater Management',
    description: {
      ELEMENTARY: 'Learn about the underground lakes and rivers that hold our water!',
      MIDDLE_SCHOOL: 'Discover how groundwater forms and why we need to protect it.',
      HIGH_SCHOOL: 'Explore aquifer types, recharge, and sustainable groundwater management.',
      UNDERGRADUATE: 'Analyze groundwater hydrology, pumping impacts, and management strategies.',
      GRADUATE: 'Examine aquifer governance, conjunctive use, and managed aquifer recharge.',
      PHD: 'Research groundwater modeling, contamination remediation, and transboundary aquifers.'
    },
    topic: 'water-systems',
    category: 'GROUNDWATER',
    icon: 'Layers',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-aq-1', title: 'Underground Water', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Under the Ground!</h2><p>There is lots of water stored underground in rocks and soil. We pump it up through wells!</p>', MIDDLE_SCHOOL: '<h2>Aquifers</h2><p>Aquifers are underground layers of rock and sediment that hold groundwater. Rain soaks down to recharge them.</p>', HIGH_SCHOOL: '<h2>Groundwater Management</h2><p>Sustainable pumping must not exceed recharge. Over-pumping causes land subsidence and saltwater intrusion.</p>', UNDERGRADUATE: '<h2>Groundwater Hydrology</h2><p>Flow dynamics, well hydraulics, aquifer testing, and safe yield estimation.</p>', GRADUATE: '<h2>Aquifer Governance</h2><p>Rights systems, pumping regulations, groundwater markets, and conjunctive surface-groundwater use.</p>', PHD: '<h2>Research Frontiers</h2><p>Numerical modeling, contamination transport, and transboundary aquifer management.</p>' } }],
    activities: [{ id: 'ws-aq-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Pump the Well!', MIDDLE_SCHOOL: 'Aquifer Model', HIGH_SCHOOL: 'Balance Pumping', UNDERGRADUATE: 'Well Design', GRADUATE: 'Governance Plan', PHD: 'Groundwater Model' }, description: { ELEMENTARY: 'See how we get water from underground!', MIDDLE_SCHOOL: 'Build a model aquifer.', HIGH_SCHOOL: 'Balance pumping with recharge.', UNDERGRADUATE: 'Design a pumping well.', GRADUATE: 'Design aquifer governance.', PHD: 'Build a groundwater flow model.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-aq-game', type: 'simulation', title: 'Aquifer Guardian', description: 'Protect and manage groundwater sustainably!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-aq-quiz', passingScore: 80, questions: [{ id: 'waqq1', question: { ELEMENTARY: 'Where is groundwater?', MIDDLE_SCHOOL: 'What is an aquifer?', HIGH_SCHOOL: 'What is over-pumping?', UNDERGRADUATE: 'What is safe yield?', GRADUATE: 'What is conjunctive use?', PHD: 'What is saltwater intrusion?' }, options: { ELEMENTARY: ['Underground in rocks and soil', 'In the sky', 'Only in lakes', 'On mountains'], MIDDLE_SCHOOL: ['Underground layer holding water', 'A fish tank', 'A water bottle', 'A swimming pool'], HIGH_SCHOOL: ['Pumping more than natural recharge', 'Pumping enough', 'Not pumping', 'Over exercising'], UNDERGRADUATE: ['Maximum sustainable pumping rate', 'Unsafe amount', 'No pumping', 'Random rate'], GRADUATE: ['Coordinated surface and groundwater use', 'Only groundwater', 'Only surface water', 'No coordination'], PHD: ['Saltwater moving into freshwater aquifers', 'Fresh water becoming salty magically', 'Ocean overflow', 'Salt deposits'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Groundwater is stored underground in spaces between rocks and in soil!', MIDDLE_SCHOOL: 'An aquifer is an underground layer of rock or sediment that holds and transmits groundwater.', HIGH_SCHOOL: 'Over-pumping extracts groundwater faster than it can be recharged, depleting the aquifer.', UNDERGRADUATE: 'Safe yield is the maximum pumping rate that can be sustained without depleting the aquifer.', GRADUATE: 'Conjunctive use coordinates surface water and groundwater to optimize overall water supply.', PHD: 'Saltwater intrusion occurs when over-pumping near coasts draws seawater into freshwater aquifers.' } }] },
    externalResources: [{ title: 'Groundwater', url: 'https://www.usgs.gov/special-topic/water-science-school/science/groundwater', type: 'research' }]
  },
  {
    id: 'water-watershed',
    slug: 'watershed-protection',
    title: 'Watershed Protection',
    description: {
      ELEMENTARY: 'Learn about the land areas that collect water for rivers and lakes!',
      MIDDLE_SCHOOL: 'Discover how everything in a watershed affects water quality downstream.',
      HIGH_SCHOOL: 'Explore watershed management, land use impacts, and protection strategies.',
      UNDERGRADUATE: 'Analyze watershed hydrology, BMPs, and nonpoint source pollution control.',
      GRADUATE: 'Examine watershed planning, stakeholder coordination, and funding mechanisms.',
      PHD: 'Research watershed modeling, ecosystem services, and payments for watershed services.'
    },
    topic: 'water-systems',
    category: 'ECOSYSTEMS',
    icon: 'Mountain',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-shed-1', title: 'Our Watersheds', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Water Catchers!</h2><p>A watershed is all the land that catches rain and sends it to one stream or lake. We all live in a watershed!</p>', MIDDLE_SCHOOL: '<h2>Watershed Systems</h2><p>Everything on the land - farms, cities, forests - affects the water flowing through the watershed.</p>', HIGH_SCHOOL: '<h2>Watershed Management</h2><p>Protecting forests, managing farms, and controlling development keeps watershed water clean.</p>', UNDERGRADUATE: '<h2>Best Management Practices</h2><p>Buffer strips, cover crops, detention ponds, and erosion control reduce nonpoint source pollution.</p>', GRADUATE: '<h2>Watershed Planning</h2><p>Multi-stakeholder planning, TMDL development, and financing watershed protection.</p>', PHD: '<h2>Research Frontiers</h2><p>Watershed modeling, ecosystem service valuation, and payments for watershed services.</p>' } }],
    activities: [{ id: 'ws-shed-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Watershed!', MIDDLE_SCHOOL: 'Pollution Path', HIGH_SCHOOL: 'Protection Plan', UNDERGRADUATE: 'BMP Selection', GRADUATE: 'Watershed Plan', PHD: 'Service Valuation' }, description: { ELEMENTARY: 'See how rain flows through your watershed!', MIDDLE_SCHOOL: 'Track how pollution moves through watersheds.', HIGH_SCHOOL: 'Design a watershed protection plan.', UNDERGRADUATE: 'Select BMPs for pollution control.', GRADUATE: 'Develop a watershed management plan.', PHD: 'Value watershed ecosystem services.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-shed-game', type: 'simulation', title: 'Watershed Protector', description: 'Keep your watershed healthy and clean!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-shed-quiz', passingScore: 80, questions: [{ id: 'wshedq1', question: { ELEMENTARY: 'What is a watershed?', MIDDLE_SCHOOL: 'How does land affect water?', HIGH_SCHOOL: 'What is nonpoint source pollution?', UNDERGRADUATE: 'What is a buffer strip?', GRADUATE: 'What is a TMDL?', PHD: 'What are payments for watershed services?' }, options: { ELEMENTARY: ['Land that sends rain to one stream', 'A water storage shed', 'A place to wash', 'A water store'], MIDDLE_SCHOOL: ['Pollution and soil wash into streams', 'Land does not affect water', 'Only rain matters', 'Water affects land only'], HIGH_SCHOOL: ['Pollution from many diffuse sources', 'Pollution from one pipe', 'No pollution', 'Point source pollution'], UNDERGRADUATE: ['Vegetated strip between fields and water', 'A buffer zone', 'A strip mall', 'A paper strip'], GRADUATE: ['Total Maximum Daily Load - pollution limit', 'Too Many Dirty Lakes', 'Total Measurement', 'No meaning'], PHD: ['Paying landowners for watershed protection', 'Water bills', 'Tax payments', 'No such payments'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A watershed is all the land that catches rain and sends it to one stream, river, or lake!', MIDDLE_SCHOOL: 'Pollution, fertilizers, and soil from the land wash into streams, affecting water quality.', HIGH_SCHOOL: 'Nonpoint source pollution comes from many diffuse sources across the landscape, not one pipe.', UNDERGRADUATE: 'Buffer strips are vegetated areas along waterways that filter pollutants from runoff.', GRADUATE: 'TMDL sets the maximum amount of a pollutant a water body can receive and still meet standards.', PHD: 'PES programs compensate upstream landowners for practices that protect downstream water quality.' } }] },
    externalResources: [{ title: 'Watershed Protection', url: 'https://www.epa.gov/hwp', type: 'research' }]
  },
  {
    id: 'water-traditional',
    slug: 'traditional-water-harvesting',
    title: 'Traditional Water Harvesting',
    description: {
      ELEMENTARY: 'Learn about ancient ways people collected and saved water!',
      MIDDLE_SCHOOL: 'Discover traditional water harvesting techniques from around the world.',
      HIGH_SCHOOL: 'Explore qanats, johads, and other indigenous water management systems.',
      UNDERGRADUATE: 'Analyze traditional water systems, modern adaptations, and cultural contexts.',
      GRADUATE: 'Examine indigenous water rights, traditional ecological knowledge, and revitalization.',
      PHD: 'Research traditional system hydrology, integration with modern infrastructure, and governance.'
    },
    topic: 'water-systems',
    category: 'TRADITIONAL',
    icon: 'History',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ws-trad-1', title: 'Ancient Water Wisdom', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Old Ways of Getting Water!</h2><p>Long ago, people invented clever ways to collect rain, find underground water, and share it fairly!</p>', MIDDLE_SCHOOL: '<h2>Traditional Systems</h2><p>Qanats in Persia, johads in India, and acequias in the Americas - ancient technologies that still work today.</p>', HIGH_SCHOOL: '<h2>Indigenous Water Management</h2><p>Traditional systems combined engineering with social organization for equitable, sustainable water use.</p>', UNDERGRADUATE: '<h2>System Analysis</h2><p>Hydrology of traditional systems, community management, and opportunities for revival and adaptation.</p>', GRADUATE: '<h2>Indigenous Rights</h2><p>Legal recognition of traditional water rights, knowledge integration, and co-management.</p>', PHD: '<h2>Research Frontiers</h2><p>Documenting traditional knowledge, hybrid system design, and governance lessons.</p>' } }],
    activities: [{ id: 'ws-trad-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Ancient Water Ways!', MIDDLE_SCHOOL: 'Build a Qanat', HIGH_SCHOOL: 'System Comparison', UNDERGRADUATE: 'Adaptation Plan', GRADUATE: 'Rights Analysis', PHD: 'Knowledge Documentation' }, description: { ELEMENTARY: 'Try ancient water collection methods!', MIDDLE_SCHOOL: 'Design a traditional water system.', HIGH_SCHOOL: 'Compare traditional and modern systems.', UNDERGRADUATE: 'Plan traditional system adaptation.', GRADUATE: 'Analyze indigenous water rights.', PHD: 'Document traditional water knowledge.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ws-trad-game', type: 'simulation', title: 'Water Heritage', description: 'Learn from ancient water wisdom!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ws-trad-quiz', passingScore: 80, questions: [{ id: 'wtradq1', question: { ELEMENTARY: 'Did ancient people know about water?', MIDDLE_SCHOOL: 'What is a qanat?', HIGH_SCHOOL: 'What is an acequia?', UNDERGRADUATE: 'Why revive traditional systems?', GRADUATE: 'What are indigenous water rights?', PHD: 'What is traditional ecological knowledge?' }, options: { ELEMENTARY: ['Yes, they were very clever with water', 'No, they had no water', 'Water was invented recently', 'Only we know about water'], MIDDLE_SCHOOL: ['Underground tunnel bringing mountain water', 'A type of boat', 'A water bottle', 'A swimming pool'], HIGH_SCHOOL: ['Community-managed irrigation ditch system', 'A river', 'A modern pipe', 'A water fountain'], UNDERGRADUATE: ['Sustainable, locally appropriate, and community-based', 'Just for history', 'They do not work', 'No reason'], GRADUATE: ['Legal recognition of traditional water use', 'No such rights', 'Only modern rights', 'Government rights'], PHD: ['Indigenous understanding of ecosystems and resources', 'Book knowledge', 'No knowledge', 'Only modern science'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Ancient people invented amazing ways to find, collect, store, and share water!', MIDDLE_SCHOOL: 'Qanats are underground tunnels that bring groundwater from mountains to dry areas.', HIGH_SCHOOL: 'Acequias are community-managed irrigation systems brought to the Americas from Spain.', UNDERGRADUATE: 'Traditional systems are sustainable, culturally appropriate, and managed by communities.', GRADUATE: 'Indigenous water rights recognize traditional uses that predate modern water law.', PHD: 'TEK is accumulated knowledge about ecosystems held by indigenous and local communities.' } }] },
    externalResources: [{ title: 'Traditional Water', url: 'https://www.unesco.org/en/articles/traditional-water-knowledge', type: 'research' }]
  }
]
