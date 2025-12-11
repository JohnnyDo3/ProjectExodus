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
  }
]
