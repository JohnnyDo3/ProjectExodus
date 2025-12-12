// Regenerative Agriculture Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const regenerativeAgricultureModules: Module[] = [
  // Module 1: Soil Health Fundamentals
  {
    id: 'regen-soil-health',
    slug: 'soil-health-fundamentals',
    title: 'Soil Health Fundamentals',
    description: {
      ELEMENTARY: 'Discover the amazing world under your feet - soil is alive!',
      MIDDLE_SCHOOL: 'Learn about the living ecosystem in healthy soil and why it matters.',
      HIGH_SCHOOL: 'Explore soil biology, chemistry, and the principles of building soil health.',
      UNDERGRADUATE: 'Analyze soil health indicators, assessment methods, and management practices.',
      GRADUATE: 'Examine soil food web dynamics, carbon cycling, and ecosystem services.',
      PHD: 'Research soil microbiome interactions, carbon sequestration potential, and soil health quantification.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL HEALTH',
    icon: 'Mountain',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ra-soil-1',
        title: 'Living Soil',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🪱 Soil is Alive!</h2><p>Under our feet is a hidden world full of tiny creatures that help plants grow!</p><h3>Who Lives in Soil?</h3><ul><li>🪱 Earthworms - nature's plows</li><li>🐜 Insects and bugs</li><li>🍄 Fungi - underground networks</li><li>🦠 Billions of bacteria (too small to see!)</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Soil Food Web</h2><h3>Life Underground</h3><p>Healthy soil teems with life! One teaspoon can contain billions of bacteria, miles of fungal threads, and thousands of protozoa.</p><h3>What They Do</h3><ul><li>Break down dead plants</li><li>Release nutrients for living plants</li><li>Create soil structure</li><li>Fight plant diseases</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Soil Biology</h2><h3>Key Organisms</h3><ul><li><strong>Bacteria:</strong> Decomposers, nitrogen fixers</li><li><strong>Fungi:</strong> Mycorrhizal networks, decomposers</li><li><strong>Protozoa:</strong> Nutrient cycling</li><li><strong>Nematodes:</strong> Various feeding groups</li></ul><h3>Soil Health Principles</h3><p>Minimize disturbance, maximize diversity, keep soil covered, maintain living roots.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Soil Health Assessment</h2><h3>Key Indicators</h3><ul><li>Soil organic matter</li><li>Aggregate stability</li><li>Water infiltration</li><li>Biological activity (respiration)</li></ul><h3>Management Practices</h3><p>Cover crops, reduced tillage, diverse rotations, organic amendments.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Ecosystem Services</h2><h3>Soil Functions</h3><ul><li>Carbon sequestration</li><li>Water filtration</li><li>Nutrient cycling</li><li>Biodiversity support</li></ul><h3>Measurement Challenges</h3><p>Spatial variability, temporal dynamics, indicator selection.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Microbiome Science</h3><ul><li>Metagenomics approaches</li><li>Functional diversity</li><li>Plant-microbe signaling</li></ul><h3>Carbon Dynamics</h3><p>Mineral-associated organic matter, microbial necromass, permanence questions.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ra-soil-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build a Soil City!',
          MIDDLE_SCHOOL: 'Food Web Explorer',
          HIGH_SCHOOL: 'Soil Health Test',
          UNDERGRADUATE: 'Assessment Design',
          GRADUATE: 'Ecosystem Modeling',
          PHD: 'Microbiome Analysis'
        },
        description: {
          ELEMENTARY: 'Create a healthy soil with all its tiny residents!',
          MIDDLE_SCHOOL: 'Explore connections in the soil food web.',
          HIGH_SCHOOL: 'Conduct virtual soil health assessments.',
          UNDERGRADUATE: 'Design a comprehensive soil health testing program.',
          GRADUATE: 'Model soil ecosystem services.',
          PHD: 'Analyze microbiome data and draw conclusions.'
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
      id: 'ra-soil-game',
      type: 'simulation',
      title: 'Soil Builder',
      description: 'Build healthy soil through good management!',
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
      id: 'ra-soil-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rsq1',
          question: {
            ELEMENTARY: 'What lives in healthy soil?',
            MIDDLE_SCHOOL: 'How many bacteria can be in one teaspoon of soil?',
            HIGH_SCHOOL: 'What are the four soil health principles?',
            UNDERGRADUATE: 'What is a key indicator of soil biological activity?',
            GRADUATE: 'What ecosystem service does soil provide for climate?',
            PHD: 'What is mineral-associated organic matter important for?'
          },
          options: {
            ELEMENTARY: ['Earthworms, fungi, and bacteria', 'Only rocks', 'Nothing', 'Just water'],
            MIDDLE_SCHOOL: ['Billions', 'Hundreds', 'A few', 'None'],
            HIGH_SCHOOL: ['Minimize disturbance, maximize diversity, keep covered, living roots', 'Plow often', 'Remove all plants', 'Add chemicals'],
            UNDERGRADUATE: ['Soil respiration rate', 'Soil color only', 'Temperature', 'Depth'],
            GRADUATE: ['Carbon sequestration', 'No climate services', 'Heat production', 'Ozone creation'],
            PHD: ['Carbon permanence and stability', 'Short-term storage', 'Instant release', 'No importance']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Healthy soil is full of life - worms, fungi, and billions of tiny bacteria!',
            MIDDLE_SCHOOL: 'One teaspoon of healthy soil can contain billions of bacteria!',
            HIGH_SCHOOL: 'The four principles: minimize disturbance, maximize diversity, keep soil covered, maintain living roots.',
            UNDERGRADUATE: 'Soil respiration measures CO2 released by microbial activity - a direct measure of biological activity.',
            GRADUATE: 'Healthy soils sequester carbon from the atmosphere, helping mitigate climate change.',
            PHD: 'Mineral-associated organic matter is more stable and persistent than free particulate organic matter.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'NRCS Soil Health', url: 'https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health', type: 'research' },
      { title: 'Rodale Institute', url: 'https://rodaleinstitute.org/', type: 'article' }
    ]
  },
  // Module 2: Cover Crops
  {
    id: 'regen-cover-crops',
    slug: 'cover-crops',
    title: 'Cover Crops',
    description: {
      ELEMENTARY: 'Learn about plants that protect the soil like a blanket!',
      MIDDLE_SCHOOL: 'Discover how farmers grow plants just to help the soil.',
      HIGH_SCHOOL: 'Explore cover crop species, benefits, and management strategies.',
      UNDERGRADUATE: 'Analyze cover crop selection, termination methods, and system integration.',
      GRADUATE: 'Examine cover crop impacts on soil health, nutrient cycling, and economics.',
      PHD: 'Research cover crop breeding, microbiome interactions, and ecosystem services.'
    },
    topic: 'regenerative-agriculture',
    category: 'COVER CROPS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ra-cover-1',
        title: 'Soil Blankets',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌱 Plant Blankets!</h2><p>Cover crops are plants that cover the soil to protect it from sun, wind, and rain!</p><h3>Why Cover the Soil?</h3><ul><li>☀️ Protects from hot sun</li><li>💨 Stops wind erosion</li><li>🌧️ Prevents rain wash-away</li><li>🪱 Feeds soil creatures</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Cover Crop Benefits</h2><h3>What They Do</h3><ul><li>Prevent erosion</li><li>Add organic matter</li><li>Fix nitrogen (legumes)</li><li>Suppress weeds</li><li>Provide wildlife habitat</li></ul><h3>Common Types</h3><p>Grasses (rye, oats), legumes (clover, vetch), brassicas (radish).</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Cover Crop Management</h2><h3>Species Selection</h3><ul><li><strong>Grasses:</strong> Carbon, erosion control, scavenge N</li><li><strong>Legumes:</strong> Fix nitrogen, protein</li><li><strong>Brassicas:</strong> Break compaction, biofumigation</li></ul><h3>Termination</h3><p>Tillage, roller-crimper, herbicide, winterkill.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Integration</h2><h3>Planning Considerations</h3><ul><li>Cash crop rotation fit</li><li>Planting and termination windows</li><li>Equipment needs</li><li>Economic analysis</li></ul><h3>Nutrient Management</h3><p>Nitrogen credits from legumes, carbon-to-nitrogen ratios, timing of release.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Cover Cropping</h2><h3>Multi-Species Mixes</h3><p>Cocktail mixes for multiple benefits. Functional group balance.</p><h3>Research Questions</h3><ul><li>Weed seed bank effects</li><li>Disease suppression</li><li>Carbon sequestration rates</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Cover Crop Research</h2><h3>Frontiers</h3><ul><li>Breeding for dual-purpose varieties</li><li>Root exudate chemistry</li><li>Microbiome recruitment</li><li>Ecosystem service quantification</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ra-cover-act-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Plant a Cover Crop!',
          MIDDLE_SCHOOL: 'Match Benefits',
          HIGH_SCHOOL: 'Design a Mix',
          UNDERGRADUATE: 'Economic Analysis',
          GRADUATE: 'System Optimization',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'Choose cover crops to protect the soil!',
          MIDDLE_SCHOOL: 'Match cover crop types to their benefits.',
          HIGH_SCHOOL: 'Design a multi-species cover crop mix.',
          UNDERGRADUATE: 'Analyze costs and benefits of cover cropping.',
          GRADUATE: 'Optimize cover crop systems for multiple goals.',
          PHD: 'Design research to test cover crop hypotheses.'
        },
        config: {
          ELEMENTARY: { items: 6, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 18, hints: false, timeLimit: 90 },
          PHD: { items: 22, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'ra-cover-game',
      type: 'simulation',
      title: 'Cover Crop Farmer',
      description: 'Manage cover crops through the seasons!',
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
      id: 'ra-cover-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rcq1',
          question: {
            ELEMENTARY: 'What do cover crops do for soil?',
            MIDDLE_SCHOOL: 'Which cover crops can add nitrogen to soil?',
            HIGH_SCHOOL: 'What is a roller-crimper used for?',
            UNDERGRADUATE: 'What affects nitrogen credit from legume cover crops?',
            GRADUATE: 'What is a cocktail mix?',
            PHD: 'What do root exudates influence?'
          },
          options: {
            ELEMENTARY: ['Protect it like a blanket', 'Make it hotter', 'Remove nutrients', 'Nothing'],
            MIDDLE_SCHOOL: ['Legumes like clover', 'Grasses only', 'Brassicas only', 'No cover crops can'],
            HIGH_SCHOOL: ['Terminating cover crops without tillage', 'Planting seeds', 'Harvesting grain', 'Watering'],
            UNDERGRADUATE: ['Biomass, termination timing, C:N ratio', 'Color of flowers', 'Seed size', 'Nothing'],
            GRADUATE: ['Multi-species cover crop blend', 'A drink recipe', 'Single species planting', 'Cash crop variety'],
            PHD: ['Soil microbiome recruitment', 'Weather patterns', 'Market prices', 'Seed color']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Cover crops protect soil from sun, wind, and rain - like a cozy blanket!',
            MIDDLE_SCHOOL: 'Legumes like clover and vetch work with bacteria to add nitrogen to soil.',
            HIGH_SCHOOL: 'A roller-crimper flattens and kills cover crops without tillage.',
            UNDERGRADUATE: 'Nitrogen credit depends on legume biomass, when terminated, and the carbon-to-nitrogen ratio.',
            GRADUATE: 'Cocktail mixes combine multiple species for diverse benefits.',
            PHD: 'Root exudates are chemicals that attract and feed specific soil microbes.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'SARE Cover Crops', url: 'https://www.sare.org/resources/cover-crops/', type: 'research' },
      { title: 'Midwest Cover Crops Council', url: 'https://mccc.msu.edu/', type: 'tool' }
    ]
  },
  // Module 3: No-Till Farming
  {
    id: 'regen-no-till',
    slug: 'no-till-farming',
    title: 'No-Till Farming',
    description: {
      ELEMENTARY: 'Learn why not digging up soil can be good for farms!',
      MIDDLE_SCHOOL: 'Discover how farmers grow crops without plowing.',
      HIGH_SCHOOL: 'Explore no-till systems, equipment, and soil health benefits.',
      UNDERGRADUATE: 'Analyze no-till transition challenges, weed management, and soil biology.',
      GRADUATE: 'Examine no-till economics, regional adaptation, and carbon implications.',
      PHD: 'Research tillage effects on soil microbiome, carbon dynamics, and long-term productivity.'
    },
    topic: 'regenerative-agriculture',
    category: 'TILLAGE',
    icon: 'Tractor',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ra-notill-1',
        title: 'Leave the Soil Alone',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🚜 Don't Dig It!</h2><p>Plowing breaks up the underground homes of helpful creatures. No-till farming leaves them in peace!</p><h3>Why No Plowing?</h3><ul><li>🪱 Worms keep their tunnels</li><li>🍄 Fungi stay connected</li><li>💧 Water soaks in better</li><li>🌍 Soil stays put</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>No-Till Benefits</h2><h3>Why Farmers Choose No-Till</h3><ul><li>Protects soil structure</li><li>Saves fuel and time</li><li>Reduces erosion dramatically</li><li>Keeps carbon in the ground</li><li>Supports soil life</li></ul><h3>The Tradeoffs</h3><p>Requires different equipment and weed strategies.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>No-Till Systems</h2><h3>How It Works</h3><p>Seeds are planted directly into residue from previous crops using specialized no-till planters.</p><h3>Key Requirements</h3><ul><li>No-till planter with coulters</li><li>Cover crop integration</li><li>Different weed management</li><li>Patience during transition</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Transition Challenges</h2><h3>The Learning Curve</h3><ul><li>3-5 year soil adjustment period</li><li>Initial yield variability</li><li>Equipment investment</li><li>New pest/weed strategies</li></ul><h3>Success Factors</h3><p>Cover crops, patience, continuous learning, peer support.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Systems Analysis</h2><h3>Regional Considerations</h3><ul><li>Climate and soil type effects</li><li>Organic vs conventional no-till</li><li>Integration with other practices</li></ul><h3>Carbon Implications</h3><p>Reduced emissions, potential sequestration, measurement challenges.</p></div>`,
          PHD: `<div class="lesson-content"><h2>No-Till Research</h2><h3>Key Questions</h3><ul><li>Nutrient stratification effects</li><li>Long-term carbon trajectories</li><li>Microbiome succession</li><li>Compaction management</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ra-notill-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Tillage Comparison',
          MIDDLE_SCHOOL: 'Farm Simulator',
          HIGH_SCHOOL: 'Equipment Selection',
          UNDERGRADUATE: 'Transition Planning',
          GRADUATE: 'Carbon Modeling',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'See the difference between tilled and no-till soil!',
          MIDDLE_SCHOOL: 'Compare tilled vs no-till farming over time.',
          HIGH_SCHOOL: 'Select equipment for a no-till system.',
          UNDERGRADUATE: 'Plan a transition to no-till farming.',
          GRADUATE: 'Model carbon dynamics under different tillage.',
          PHD: 'Design long-term tillage comparison research.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 18 },
          GRADUATE: { complexity: 'expert', variables: 25 },
          PHD: { complexity: 'research', variables: 35 }
        }
      }
    ],
    game: {
      id: 'ra-notill-game',
      type: 'simulation',
      title: 'No-Till Challenge',
      description: 'Successfully transition to no-till farming!',
      rounds: 6,
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
      id: 'ra-notill-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rntq1',
          question: {
            ELEMENTARY: 'What does no-till farming avoid doing?',
            MIDDLE_SCHOOL: 'What is a benefit of no-till farming?',
            HIGH_SCHOOL: 'What equipment is essential for no-till?',
            UNDERGRADUATE: 'How long is a typical no-till transition period?',
            GRADUATE: 'What is a challenge of organic no-till?',
            PHD: 'What happens to nutrient distribution in long-term no-till?'
          },
          options: {
            ELEMENTARY: ['Plowing the soil', 'Planting seeds', 'Growing plants', 'Harvesting'],
            MIDDLE_SCHOOL: ['Reduces erosion and saves fuel', 'Uses more fuel', 'Increases erosion', 'Kills soil life'],
            HIGH_SCHOOL: ['No-till planter with coulters', 'Regular plow', 'Hand tools only', 'Helicopter'],
            UNDERGRADUATE: ['3-5 years', '1 week', '10+ years', 'No transition needed'],
            GRADUATE: ['Weed control without herbicides', 'Too much carbon', 'Excessive yields', 'Simple implementation'],
            PHD: ['Stratification near surface', 'Even distribution', 'Movement to subsoil', 'Complete depletion']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'No-till farming means not plowing or digging up the soil!',
            MIDDLE_SCHOOL: 'No-till dramatically reduces erosion and saves fuel by eliminating tillage passes.',
            HIGH_SCHOOL: 'No-till planters have coulters to cut through residue and place seeds properly.',
            UNDERGRADUATE: 'It typically takes 3-5 years for soil biology to adjust to no-till conditions.',
            GRADUATE: 'Controlling weeds without herbicides or tillage is the main challenge of organic no-till.',
            PHD: 'Long-term no-till causes nutrients to stratify near the soil surface.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'No-Till Farmer', url: 'https://www.no-tillfarmer.com/', type: 'article' },
      { title: 'USDA NRCS No-Till', url: 'https://www.nrcs.usda.gov/', type: 'research' }
    ]
  },
  // Module 4: Composting
  {
    id: 'regen-composting',
    slug: 'composting',
    title: 'Composting',
    description: {
      ELEMENTARY: 'Learn how dead plants turn into super soil food!',
      MIDDLE_SCHOOL: 'Discover the science of decomposition and making compost.',
      HIGH_SCHOOL: 'Explore composting methods, C:N ratios, and farm-scale systems.',
      UNDERGRADUATE: 'Analyze compost chemistry, biology, and application strategies.',
      GRADUATE: 'Examine commercial composting, regulations, and compost tea.',
      PHD: 'Research compost microbiome, disease suppression, and soil amendment optimization.'
    },
    topic: 'regenerative-agriculture',
    category: 'COMPOSTING',
    icon: 'Recycle',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ra-compost-1',
        title: 'Black Gold',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🍂 Magic Transformation!</h2><p>Leaves, food scraps, and manure become dark, crumbly compost that plants love!</p><h3>What Goes In</h3><ul><li>🍂 Fallen leaves</li><li>🥕 Vegetable scraps</li><li>🐄 Animal manure</li><li>🌾 Straw and hay</li></ul><h3>What Comes Out</h3><p>Rich, dark compost - nature's best plant food!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>How Composting Works</h2><h3>The Recipe</h3><ul><li><strong>Browns (Carbon):</strong> Leaves, straw, cardboard</li><li><strong>Greens (Nitrogen):</strong> Food scraps, grass, manure</li><li><strong>Water:</strong> Keep it moist</li><li><strong>Air:</strong> Turn the pile</li></ul><h3>The Magic Ratio</h3><p>About 30 parts brown to 1 part green works best!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Composting Science</h2><h3>C:N Ratio</h3><p>Ideal: 25-30:1. Too high = slow. Too low = smelly and nitrogen loss.</p><h3>Temperature Phases</h3><ol><li>Mesophilic (20-40°C): Initial</li><li>Thermophilic (40-70°C): Hot phase, kills pathogens</li><li>Cooling and Curing: Stabilization</li></ol></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Compost Systems</h2><h3>Methods</h3><ul><li>Windrows: Large scale</li><li>Static piles: Aerated</li><li>In-vessel: Controlled</li><li>Vermicompost: Worms</li></ul><h3>Quality Testing</h3><p>Maturity, stability, nutrient content, contaminants.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Commercial Operations</h2><h3>Considerations</h3><ul><li>Feedstock sourcing</li><li>Regulatory compliance</li><li>Odor management</li><li>Market development</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Compost Research</h2><h3>Frontiers</h3><ul><li>Disease suppressive composts</li><li>Microbiome engineering</li><li>Biochar-compost combinations</li><li>Application rate optimization</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ra-compost-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Build a Compost Pile!',
          MIDDLE_SCHOOL: 'Recipe Builder',
          HIGH_SCHOOL: 'C:N Calculator',
          UNDERGRADUATE: 'System Design',
          GRADUATE: 'Quality Testing',
          PHD: 'Research Protocol'
        },
        description: {
          ELEMENTARY: 'Layer materials to make compost!',
          MIDDLE_SCHOOL: 'Create a balanced compost recipe.',
          HIGH_SCHOOL: 'Calculate C:N ratios for different materials.',
          UNDERGRADUATE: 'Design a farm-scale composting system.',
          GRADUATE: 'Develop compost quality testing protocols.',
          PHD: 'Design research on compost effects.'
        },
        config: {
          ELEMENTARY: { steps: 5, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { steps: 7, hints: true, timeLimit: 180 },
          HIGH_SCHOOL: { steps: 10, hints: false, timeLimit: 150 },
          UNDERGRADUATE: { steps: 12, hints: false, timeLimit: 180 },
          GRADUATE: { steps: 15, hints: false, timeLimit: 120 },
          PHD: { steps: 20, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'ra-compost-game',
      type: 'puzzle',
      title: 'Compost Chef',
      description: 'Mix the perfect compost recipe!',
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
      id: 'ra-compost-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rcpq1',
          question: {
            ELEMENTARY: 'What do you need to make compost?',
            MIDDLE_SCHOOL: 'What is the ideal ratio of browns to greens?',
            HIGH_SCHOOL: 'What temperature kills pathogens in compost?',
            UNDERGRADUATE: 'What is vermicomposting?',
            GRADUATE: 'What makes compost disease suppressive?',
            PHD: 'What is the role of biochar in compost?'
          },
          options: {
            ELEMENTARY: ['Browns, greens, water, and air', 'Just water', 'Only leaves', 'Chemicals'],
            MIDDLE_SCHOOL: ['About 30 browns to 1 green', '1 to 1', 'All browns', 'All greens'],
            HIGH_SCHOOL: ['40-70°C in thermophilic phase', '10°C', '100°C', 'Room temperature'],
            UNDERGRADUATE: ['Composting with worms', 'Composting with chemicals', 'Fast composting', 'Cold composting'],
            GRADUATE: ['Beneficial microbiome composition', 'High temperature only', 'Chemical additions', 'Age alone'],
            PHD: ['Increases surface area and water retention', 'Decreases quality', 'No effect', 'Adds toxins']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Good compost needs carbon (browns), nitrogen (greens), moisture, and oxygen!',
            MIDDLE_SCHOOL: 'The ideal C:N ratio is about 25-30:1, roughly 30 parts brown to 1 part green by weight.',
            HIGH_SCHOOL: 'The thermophilic phase (40-70°C) kills most pathogens and weed seeds.',
            UNDERGRADUATE: 'Vermicomposting uses worms (typically red wigglers) to process organic matter.',
            GRADUATE: 'Disease suppression comes from beneficial microorganisms that outcompete or antagonize pathogens.',
            PHD: 'Biochar increases surface area for microbes and improves water and nutrient retention.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'US Composting Council', url: 'https://www.compostingcouncil.org/', type: 'research' },
      { title: 'Cornell Composting', url: 'https://compost.css.cornell.edu/', type: 'article' }
    ]
  },
  // Module 5: Crop Rotation
  {
    id: 'regen-crop-rotation',
    slug: 'crop-rotation',
    title: 'Crop Rotation',
    description: {
      ELEMENTARY: 'Learn why farmers plant different crops in different years!',
      MIDDLE_SCHOOL: 'Discover how changing crops keeps soil and plants healthy.',
      HIGH_SCHOOL: 'Explore rotation design, pest cycles, and nutrient management.',
      UNDERGRADUATE: 'Analyze rotation economics, length effects, and system optimization.',
      GRADUATE: 'Examine complex rotations, modeling approaches, and long-term trials.',
      PHD: 'Research rotation effects on soil microbiome, disease dynamics, and productivity.'
    },
    topic: 'regenerative-agriculture',
    category: 'ROTATION',
    icon: 'RefreshCw',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'ra-rotation-1',
        title: 'Taking Turns',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'PUZZLE',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🔄 Plants Take Turns!</h2><p>Growing different crops each year keeps soil happy and pests confused!</p><h3>Why Rotate?</h3><ul><li>🐛 Pests can't find their food</li><li>🌱 Different plants feed soil differently</li><li>💪 Soil stays healthy</li><li>🌾 Better harvests!</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Why Rotate Crops?</h2><h3>Benefits</h3><ul><li>Breaks pest and disease cycles</li><li>Balances soil nutrients</li><li>Improves soil structure</li><li>Reduces weed pressure</li></ul><h3>Example</h3><p>Corn → Soybeans → Wheat → Cover crop → repeat!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Rotation Design</h2><h3>Principles</h3><ul><li>Alternate plant families</li><li>Follow heavy feeders with legumes</li><li>Vary root depths</li><li>Include cover crops</li></ul><h3>Common Rotations</h3><p>Corn-soybean (short), corn-soybean-wheat-cover (longer).</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Optimization</h2><h3>Economic Analysis</h3><ul><li>Individual crop returns</li><li>Rotation effects on yield</li><li>Risk diversification</li><li>Equipment utilization</li></ul><h3>Rotation Length</h3><p>Longer rotations generally show greater benefits.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Complex Rotations</h2><h3>Research Insights</h3><ul><li>5-7 year rotations maximize benefits</li><li>Legacy effects persist</li><li>Diversity matters</li></ul><h3>Modeling</h3><p>Predicting rotation effects on yield, soil, economics.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Rotation Research</h2><h3>Key Questions</h3><ul><li>Microbiome succession</li><li>Allelopathy effects</li><li>Disease suppression mechanisms</li><li>Long-term carbon dynamics</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'ra-rotation-act-1',
        type: 'PUZZLE',
        title: {
          ELEMENTARY: 'Plan a Garden Rotation!',
          MIDDLE_SCHOOL: 'Design a 4-Year Rotation',
          HIGH_SCHOOL: 'Optimize for Goals',
          UNDERGRADUATE: 'Economic Analysis',
          GRADUATE: 'Model Rotation Effects',
          PHD: 'Long-Term Trial Design'
        },
        description: {
          ELEMENTARY: 'Choose what plants to grow each year!',
          MIDDLE_SCHOOL: 'Create a rotation that breaks pest cycles.',
          HIGH_SCHOOL: 'Design a rotation optimized for specific goals.',
          UNDERGRADUATE: 'Analyze economics of different rotations.',
          GRADUATE: 'Model long-term rotation effects.',
          PHD: 'Design a rotation research trial.'
        },
        config: {
          ELEMENTARY: { pieces: 6, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { pieces: 10, hints: true, timeLimit: 150 },
          HIGH_SCHOOL: { pieces: 15, hints: false, timeLimit: 120 },
          UNDERGRADUATE: { pieces: 20, hints: false, timeLimit: 150 },
          GRADUATE: { pieces: 25, hints: false, timeLimit: 120 },
          PHD: { pieces: 30, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'ra-rotation-game',
      type: 'puzzle',
      title: 'Rotation Planner',
      description: 'Create balanced crop rotations!',
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
      id: 'ra-rotation-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rrtq1',
          question: {
            ELEMENTARY: 'Why do farmers rotate crops?',
            MIDDLE_SCHOOL: 'What happens when you grow the same crop every year?',
            HIGH_SCHOOL: 'Why follow heavy feeders with legumes?',
            UNDERGRADUATE: 'What is a rotation effect on yield?',
            GRADUATE: 'What is a legacy effect in rotations?',
            PHD: 'What microbiome changes occur in diverse rotations?'
          },
          options: {
            ELEMENTARY: ['To keep pests confused and soil healthy', 'For fun', 'To confuse neighbors', 'No reason'],
            MIDDLE_SCHOOL: ['Pests and diseases build up', 'Soil gets better', 'Yields increase', 'Nothing happens'],
            HIGH_SCHOOL: ['Legumes restore nitrogen used by heavy feeders', 'Legumes use more nitrogen', 'No reason', 'Legumes are easier'],
            UNDERGRADUATE: ['Yield increase beyond fertilizer explanation', 'Yield stays same', 'Yield always decreases', 'No such effect'],
            GRADUATE: ['Effects that persist after crop changes', 'Immediate effects only', 'No lasting effects', 'Market effects'],
            PHD: ['Increased diversity and beneficial taxa', 'No changes', 'Decreased diversity', 'Only pathogens increase']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Rotating crops confuses pests and helps keep soil healthy and full of nutrients!',
            MIDDLE_SCHOOL: 'Continuous cropping allows specific pests and diseases to build up over time.',
            HIGH_SCHOOL: 'Heavy feeders deplete soil nitrogen; following legumes that fix nitrogen restores it.',
            UNDERGRADUATE: 'Rotation effect is yield boost in rotated crops beyond what fertilizer inputs explain.',
            GRADUATE: 'Legacy effects are crop influences that persist for years after that crop was grown.',
            PHD: 'Diverse rotations increase microbial diversity and abundance of beneficial soil organisms.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Practical Farmers of Iowa', url: 'https://practicalfarmers.org/', type: 'research' },
      { title: 'SARE Crop Rotation', url: 'https://www.sare.org/', type: 'article' }
    ]
  },
  // Module 6: Agroforestry
  {
    id: 'regen-agroforestry',
    slug: 'agroforestry',
    title: 'Agroforestry',
    description: {
      ELEMENTARY: 'Learn how farmers grow trees and crops together!',
      MIDDLE_SCHOOL: 'Discover how combining trees with farming creates healthier land.',
      HIGH_SCHOOL: 'Explore alley cropping, silvopasture, and forest farming systems.',
      UNDERGRADUATE: 'Analyze agroforestry economics, design principles, and ecosystem services.',
      GRADUATE: 'Examine agroforestry policy, carbon markets, and landscape integration.',
      PHD: 'Research tree-crop interactions, modeling approaches, and climate adaptation.'
    },
    topic: 'regenerative-agriculture',
    category: 'AGROFORESTRY',
    icon: 'TreePine',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-af-1', title: 'Trees on Farms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farm Forests!</h2><p>Farmers can grow trees alongside their crops. Trees give shade, stop wind, and provide fruit and nuts!</p>', MIDDLE_SCHOOL: '<h2>Agroforestry Benefits</h2><p>Trees on farms provide shade for animals, windbreaks for crops, habitat for wildlife, and extra products to sell.</p>', HIGH_SCHOOL: '<h2>Agroforestry Systems</h2><p>Alley cropping (rows of trees with crops between), silvopasture (trees with livestock), and forest farming (products under tree canopy).</p>', UNDERGRADUATE: '<h2>System Design</h2><p>Species selection, spacing, orientation, and economic analysis of diverse product streams.</p>', GRADUATE: '<h2>Ecosystem Services</h2><p>Carbon sequestration, water quality improvement, biodiversity, and landscape connectivity.</p>', PHD: '<h2>Research Frontiers</h2><p>Competition and facilitation modeling, carbon certification, and climate resilience assessment.</p>' } }],
    activities: [{ id: 'ra-af-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant a Tree Farm!', MIDDLE_SCHOOL: 'Design a Silvopasture', HIGH_SCHOOL: 'Alley Cropping Layout', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'Carbon Modeling', PHD: 'System Optimization' }, description: { ELEMENTARY: 'Plant trees alongside crops!', MIDDLE_SCHOOL: 'Design a system with trees and animals together.', HIGH_SCHOOL: 'Design an alley cropping system.', UNDERGRADUATE: 'Analyze the economics of agroforestry.', GRADUATE: 'Model carbon sequestration potential.', PHD: 'Optimize multi-objective agroforestry design.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-af-game', type: 'simulation', title: 'Agroforester', description: 'Design productive tree-crop systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-af-quiz', passingScore: 80, questions: [{ id: 'rafq1', question: { ELEMENTARY: 'What is agroforestry?', MIDDLE_SCHOOL: 'What is silvopasture?', HIGH_SCHOOL: 'What is alley cropping?', UNDERGRADUATE: 'What drives agroforestry economics?', GRADUATE: 'What ecosystem service do trees provide for water?', PHD: 'What is a key modeling challenge in agroforestry?' }, options: { ELEMENTARY: ['Growing trees and crops together', 'Cutting down all trees', 'Only growing trees', 'Only growing crops'], MIDDLE_SCHOOL: ['Trees with grazing animals', 'Trees only', 'Pasture only', 'Fish farming'], HIGH_SCHOOL: ['Rows of trees with crops between', 'Only trees', 'Only crops', 'Random planting'], UNDERGRADUATE: ['Multiple product streams over time', 'Single crop only', 'No products', 'Government payments only'], GRADUATE: ['Filtering and slowing runoff', 'Increasing runoff', 'No water effects', 'Using more water'], PHD: ['Above and below ground competition dynamics', 'Too simple', 'No competition', 'Only above ground'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Agroforestry means growing trees and crops (or animals) together on the same land!', MIDDLE_SCHOOL: 'Silvopasture combines trees with grazing animals like cattle or sheep.', HIGH_SCHOOL: 'Alley cropping plants rows of trees with annual crops grown in the alleys between.', UNDERGRADUATE: 'Agroforestry economics depend on diverse products (nuts, fruit, timber, crops) over different timeframes.', GRADUATE: 'Trees filter pollutants and slow runoff, improving water quality downstream.', PHD: 'Modeling competition for light, water, and nutrients above and below ground is complex.' } }] },
    externalResources: [{ title: 'USDA Agroforestry', url: 'https://www.fs.usda.gov/nac/', type: 'research' }]
  },
  // Module 7: Holistic Grazing
  {
    id: 'regen-grazing',
    slug: 'holistic-grazing',
    title: 'Holistic Grazing',
    description: {
      ELEMENTARY: 'Learn how animals can help the land by eating grass!',
      MIDDLE_SCHOOL: 'Discover how moving animals helps grass grow better.',
      HIGH_SCHOOL: 'Explore rotational grazing, animal impact, and pasture recovery.',
      UNDERGRADUATE: 'Analyze grazing management, stocking rates, and pasture productivity.',
      GRADUATE: 'Examine adaptive multi-paddock grazing, carbon sequestration, and ranch economics.',
      PHD: 'Research grazing-soil-plant interactions, methane dynamics, and landscape-scale impacts.'
    },
    topic: 'regenerative-agriculture',
    category: 'GRAZING',
    icon: 'Beef',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-gr-1', title: 'Moving the Herd', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Happy Cows, Healthy Land!</h2><p>When cows eat grass and move to new areas, the grass grows back even better!</p>', MIDDLE_SCHOOL: '<h2>Rotational Grazing</h2><p>Moving animals frequently gives grass time to recover. Short grazing, long rest makes pastures healthier.</p>', HIGH_SCHOOL: '<h2>Holistic Planned Grazing</h2><p>High density, short duration grazing followed by long recovery. Mimics wild herds avoiding predators.</p>', UNDERGRADUATE: '<h2>Grazing Management</h2><p>Stocking rate, stock density, grazing period, recovery period, and monitoring indicators.</p>', GRADUATE: '<h2>Adaptive Management</h2><p>Adjusting plans based on plant growth, weather, and monitoring. Multi-paddock systems and infrastructure.</p>', PHD: '<h2>Research Frontiers</h2><p>Soil carbon dynamics under grazing, methane and carbon balance, and ecosystem service quantification.</p>' } }],
    activities: [{ id: 'ra-gr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Move the Cows!', MIDDLE_SCHOOL: 'Paddock Rotation', HIGH_SCHOOL: 'Grazing Plan', UNDERGRADUATE: 'Stocking Calculator', GRADUATE: 'Adaptive Management', PHD: 'Carbon Modeling' }, description: { ELEMENTARY: 'Move animals to help grass grow!', MIDDLE_SCHOOL: 'Rotate animals through paddocks.', HIGH_SCHOOL: 'Create a grazing plan for a ranch.', UNDERGRADUATE: 'Calculate optimal stocking rates.', GRADUATE: 'Develop an adaptive grazing management plan.', PHD: 'Model carbon dynamics under different grazing regimes.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-gr-game', type: 'simulation', title: 'Grazing Manager', description: 'Manage livestock for healthy pastures!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-gr-quiz', passingScore: 80, questions: [{ id: 'rgrq1', question: { ELEMENTARY: 'Why do farmers move their animals?', MIDDLE_SCHOOL: 'What does grass need after being grazed?', HIGH_SCHOOL: 'What does holistic grazing mimic?', UNDERGRADUATE: 'What is stock density?', GRADUATE: 'What is AMP grazing?', PHD: 'What complicates grazing carbon accounting?' }, options: { ELEMENTARY: ['To let grass grow back', 'For exercise', 'To confuse them', 'No reason'], MIDDLE_SCHOOL: ['Time to recover and regrow', 'More grazing immediately', 'Water only', 'Nothing'], HIGH_SCHOOL: ['Wild herds avoiding predators', 'Factory farming', 'Feedlot systems', 'Continuous grazing'], UNDERGRADUATE: ['Animals per unit area at one time', 'Total animals on ranch', 'Animal weight', 'Animal age'], GRADUATE: ['Adaptive Multi-Paddock grazing', 'All Morning Pasture', 'Animal Movement Program', 'Annual Maintenance Plan'], PHD: ['Belowground carbon dynamics and measurement', 'Too simple to measure', 'Only aboveground matters', 'No complications'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Moving animals gives grass time to grow back healthy and strong!', MIDDLE_SCHOOL: 'Grass needs a recovery period after grazing to rebuild roots and leaves.', HIGH_SCHOOL: 'Holistic grazing mimics how wild herbivores moved in tight herds to avoid predators.', UNDERGRADUATE: 'Stock density is the number of animals per unit area at a single point in time.', GRADUATE: 'AMP (Adaptive Multi-Paddock) grazing uses many paddocks with flexible management.', PHD: 'Measuring soil carbon changes and methane emissions complicates net carbon accounting.' } }] },
    externalResources: [{ title: 'Savory Institute', url: 'https://savory.global/', type: 'research' }]
  },
  // Module 8: Perennial Systems
  {
    id: 'regen-perennials',
    slug: 'perennial-systems',
    title: 'Perennial Systems',
    description: {
      ELEMENTARY: 'Learn about plants that come back year after year!',
      MIDDLE_SCHOOL: 'Discover crops that do not need replanting every year.',
      HIGH_SCHOOL: 'Explore perennial grains, polycultures, and food forests.',
      UNDERGRADUATE: 'Analyze perennial agriculture economics, breeding, and system design.',
      GRADUATE: 'Examine perennial systems for climate resilience, ecosystem services, and food security.',
      PHD: 'Research perennial crop development, root system dynamics, and land use transitions.'
    },
    topic: 'regenerative-agriculture',
    category: 'PERENNIALS',
    icon: 'TreeDeciduous',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-per-1', title: 'Plants That Stay', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plants That Keep Growing!</h2><p>Some plants come back every year without replanting. They have deep roots and protect the soil!</p>', MIDDLE_SCHOOL: '<h2>Annual vs Perennial</h2><p>Annuals die after one season (corn, wheat). Perennials live many years (apple trees, asparagus) with deeper roots.</p>', HIGH_SCHOOL: '<h2>Perennial Advantages</h2><p>No annual tillage, deeper roots, year-round cover, reduced erosion, and carbon sequestration.</p>', UNDERGRADUATE: '<h2>Perennial Agriculture</h2><p>Perennial grains (Kernza), food forests, and designed polycultures combining multiple perennial species.</p>', GRADUATE: '<h2>System Design</h2><p>Stacking functions, successional planting, and economic modeling of multi-year establishment.</p>', PHD: '<h2>Research Frontiers</h2><p>Perennial grain breeding, root carbon dynamics, and landscape-scale transitions.</p>' } }],
    activities: [{ id: 'ra-per-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Perennial Garden!', MIDDLE_SCHOOL: 'Compare Plant Types', HIGH_SCHOOL: 'Food Forest Design', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'Transition Planning', PHD: 'Breeding Priorities' }, description: { ELEMENTARY: 'Grow plants that come back every year!', MIDDLE_SCHOOL: 'Compare annual and perennial plants.', HIGH_SCHOOL: 'Design a food forest with multiple layers.', UNDERGRADUATE: 'Analyze economics of perennial systems.', GRADUATE: 'Plan a transition from annual to perennial.', PHD: 'Identify perennial grain breeding priorities.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-per-game', type: 'simulation', title: 'Perennial Farmer', description: 'Build lasting food systems!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-per-quiz', passingScore: 80, questions: [{ id: 'rperq1', question: { ELEMENTARY: 'What do perennial plants do?', MIDDLE_SCHOOL: 'How are perennial roots different?', HIGH_SCHOOL: 'What is a food forest?', UNDERGRADUATE: 'What is Kernza?', GRADUATE: 'What is a key economic challenge for perennials?', PHD: 'What trait is hardest to breed in perennial grains?' }, options: { ELEMENTARY: ['Come back every year', 'Die after one year', 'Never grow', 'Only grow in water'], MIDDLE_SCHOOL: ['Deeper and longer-lived', 'Shallower', 'Same as annuals', 'No roots'], HIGH_SCHOOL: ['Multi-layer perennial planting mimicking forest', 'Regular forest', 'Annual crop field', 'Greenhouse'], UNDERGRADUATE: ['Perennial wheat relative', 'Type of corn', 'Annual grain', 'Vegetable'], GRADUATE: ['Long establishment period before harvest', 'Too easy', 'No challenges', 'Immediate returns'], PHD: ['Seed yield while maintaining perenniality', 'Root depth', 'Disease resistance', 'Height'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Perennial plants come back every year without replanting!', MIDDLE_SCHOOL: 'Perennial roots grow much deeper and live for many years.', HIGH_SCHOOL: 'A food forest stacks multiple layers of perennial food plants mimicking a natural forest.', UNDERGRADUATE: 'Kernza is a perennial grain developed from intermediate wheatgrass.', GRADUATE: 'Perennial systems require years of establishment before generating full returns.', PHD: 'Breeding perennial grains that produce high seed yield while remaining perennial is challenging.' } }] },
    externalResources: [{ title: 'The Land Institute', url: 'https://landinstitute.org/', type: 'research' }]
  },
  // Module 9: Integrated Pest Management
  {
    id: 'regen-ipm',
    slug: 'integrated-pest-management',
    title: 'Integrated Pest Management',
    description: {
      ELEMENTARY: 'Learn how to fight pests with nature instead of chemicals!',
      MIDDLE_SCHOOL: 'Discover how farmers control pests using natural methods.',
      HIGH_SCHOOL: 'Explore IPM strategies, biological control, and monitoring.',
      UNDERGRADUATE: 'Analyze IPM decision-making, economic thresholds, and pesticide reduction.',
      GRADUATE: 'Examine area-wide IPM, climate impacts, and policy frameworks.',
      PHD: 'Research pest ecology, resistance management, and systems approaches.'
    },
    topic: 'regenerative-agriculture',
    category: 'PEST MANAGEMENT',
    icon: 'Bug',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-ipm-1', title: 'Fighting Pests Naturally', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Good Bugs vs Bad Bugs!</h2><p>Some insects eat the pests that damage crops. Ladybugs eat aphids!</p>', MIDDLE_SCHOOL: '<h2>IPM Pyramid</h2><p>Prevention first, then monitoring, then biological control, then targeted pesticides only as last resort.</p>', HIGH_SCHOOL: '<h2>IPM Strategies</h2><p>Cultural controls (rotation, sanitation), biological controls (beneficial insects), and chemical controls (targeted, last resort).</p>', UNDERGRADUATE: '<h2>Economic Thresholds</h2><p>Treat only when pest levels exceed economic injury level. Monitor, identify, decide, evaluate.</p>', GRADUATE: '<h2>Area-Wide IPM</h2><p>Coordinated management across farms and landscapes for more effective control.</p>', PHD: '<h2>Research Frontiers</h2><p>Resistance evolution, climate change impacts, and ecological network approaches.</p>' } }],
    activities: [{ id: 'ra-ipm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Release the Ladybugs!', MIDDLE_SCHOOL: 'IPM Detective', HIGH_SCHOOL: 'Threshold Calculator', UNDERGRADUATE: 'IPM Plan', GRADUATE: 'Area-Wide Program', PHD: 'Resistance Modeling' }, description: { ELEMENTARY: 'Use good bugs to fight bad bugs!', MIDDLE_SCHOOL: 'Identify pests and choose control methods.', HIGH_SCHOOL: 'Calculate economic thresholds for treatment.', UNDERGRADUATE: 'Develop an IPM plan for a farm.', GRADUATE: 'Design an area-wide IPM program.', PHD: 'Model pesticide resistance evolution.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-ipm-game', type: 'puzzle', title: 'Pest Detective', description: 'Solve pest problems without harmful chemicals!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-ipm-quiz', passingScore: 80, questions: [{ id: 'ripmq1', question: { ELEMENTARY: 'What do ladybugs eat?', MIDDLE_SCHOOL: 'What is the first step in IPM?', HIGH_SCHOOL: 'What is biological control?', UNDERGRADUATE: 'What is an economic threshold?', GRADUATE: 'What is area-wide IPM?', PHD: 'What accelerates pesticide resistance?' }, options: { ELEMENTARY: ['Aphids and other small pests', 'Leaves', 'Flowers', 'Seeds'], MIDDLE_SCHOOL: ['Prevention', 'Spraying chemicals', 'Ignoring pests', 'Removing crops'], HIGH_SCHOOL: ['Using living organisms to control pests', 'Chemical spraying', 'Removing all plants', 'Ignoring pests'], UNDERGRADUATE: ['Pest level where treatment cost equals damage cost', 'Any pest presence', 'Maximum pest level', 'Zero pests always'], GRADUATE: ['Coordinated management across multiple farms', 'Single farm only', 'One field only', 'Chemical spraying everywhere'], PHD: ['Frequent application of single mode of action', 'Never using pesticides', 'Rotating modes', 'Biological control'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Ladybugs love to eat aphids and other small pest insects!', MIDDLE_SCHOOL: 'IPM starts with prevention - making conditions unfavorable for pests.', HIGH_SCHOOL: 'Biological control uses living organisms like predators or parasites to control pests.', UNDERGRADUATE: 'Economic threshold is when pest damage cost would exceed treatment cost.', GRADUATE: 'Area-wide IPM coordinates management across landscapes for better control.', PHD: 'Repeatedly using pesticides with the same mode of action accelerates resistance evolution.' } }] },
    externalResources: [{ title: 'UC IPM', url: 'https://ipm.ucanr.edu/', type: 'research' }]
  },
  // Module 10: Soil Carbon Sequestration
  {
    id: 'regen-carbon',
    slug: 'soil-carbon-sequestration',
    title: 'Soil Carbon Sequestration',
    description: {
      ELEMENTARY: 'Learn how healthy soil captures carbon and helps our planet!',
      MIDDLE_SCHOOL: 'Discover how farming practices can store carbon underground.',
      HIGH_SCHOOL: 'Explore carbon cycling, soil organic matter, and climate mitigation.',
      UNDERGRADUATE: 'Analyze soil carbon measurement, practices, and carbon markets.',
      GRADUATE: 'Examine carbon market protocols, verification challenges, and policy.',
      PHD: 'Research soil carbon dynamics, permanence, and quantification methods.'
    },
    topic: 'regenerative-agriculture',
    category: 'CARBON',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-carb-1', title: 'Carbon in Soil', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Soil Superpower!</h2><p>Healthy soil can capture carbon from the air and store it underground, helping fight climate change!</p>', MIDDLE_SCHOOL: '<h2>Carbon Cycle in Soil</h2><p>Plants capture CO2, roots feed soil organisms, and carbon gets stored in soil organic matter.</p>', HIGH_SCHOOL: '<h2>Building Soil Carbon</h2><p>Cover crops, reduced tillage, compost, and perennials increase soil organic carbon over time.</p>', UNDERGRADUATE: '<h2>Measuring Soil Carbon</h2><p>Sampling protocols, lab analysis, remote sensing, and modeling approaches.</p>', GRADUATE: '<h2>Carbon Markets</h2><p>Agricultural carbon credits, protocols, verification requirements, and market access.</p>', PHD: '<h2>Research Frontiers</h2><p>Carbon permanence, deep carbon dynamics, and improving measurement-reporting-verification.</p>' } }],
    activities: [{ id: 'ra-carb-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Feed the Soil!', MIDDLE_SCHOOL: 'Carbon Pathway', HIGH_SCHOOL: 'Practice Comparison', UNDERGRADUATE: 'Sampling Design', GRADUATE: 'Credit Calculation', PHD: 'MRV System' }, description: { ELEMENTARY: 'Help soil capture carbon!', MIDDLE_SCHOOL: 'Follow carbon from air to soil.', HIGH_SCHOOL: 'Compare carbon sequestration of different practices.', UNDERGRADUATE: 'Design a soil carbon sampling plan.', GRADUATE: 'Calculate potential carbon credits for a farm.', PHD: 'Design a measurement-reporting-verification system.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-carb-game', type: 'simulation', title: 'Carbon Farmer', description: 'Build soil carbon and earn credits!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-carb-quiz', passingScore: 80, questions: [{ id: 'rcarbq1', question: { ELEMENTARY: 'How does soil help with climate change?', MIDDLE_SCHOOL: 'How does carbon get into soil?', HIGH_SCHOOL: 'Which practice increases soil carbon?', UNDERGRADUATE: 'Why is soil carbon sampling challenging?', GRADUATE: 'What is additionality in carbon markets?', PHD: 'What is a key permanence concern?' }, options: { ELEMENTARY: ['Stores carbon underground', 'Releases carbon', 'Has no effect', 'Makes it worse'], MIDDLE_SCHOOL: ['Plants capture CO2 and roots add carbon to soil', 'Rain adds carbon', 'Wind adds carbon', 'Carbon just appears'], HIGH_SCHOOL: ['Cover cropping', 'Intensive tillage', 'Leaving soil bare', 'Removing all plants'], UNDERGRADUATE: ['High spatial variability', 'Too easy', 'Soil is uniform', 'No challenges'], GRADUATE: ['Carbon stored beyond business as usual', 'Any carbon storage', 'Total carbon', 'Historical carbon'], PHD: ['Carbon loss if practices change', 'Carbon is always permanent', 'No concerns', 'Easy to guarantee'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Healthy soil stores carbon underground instead of letting it into the air!', MIDDLE_SCHOOL: 'Plants capture CO2 from air through photosynthesis and add carbon to soil through roots and residues.', HIGH_SCHOOL: 'Cover cropping adds organic matter and keeps living roots in soil, increasing carbon.', UNDERGRADUATE: 'Soil carbon varies greatly across fields, requiring many samples for accurate measurement.', GRADUATE: 'Additionality means the carbon would not have been stored without the incentive payment.', PHD: 'Carbon stored in soil can be released if management practices revert to tillage or bare fallows.' } }] },
    externalResources: [{ title: 'Carbon Cycle Institute', url: 'https://www.carboncycle.org/', type: 'research' }]
  },
  // Module 11: Water-Smart Agriculture
  {
    id: 'regen-water-smart',
    slug: 'water-smart-agriculture',
    title: 'Water-Smart Agriculture',
    description: {
      ELEMENTARY: 'Learn how to grow food while saving water!',
      MIDDLE_SCHOOL: 'Discover farming methods that use water wisely.',
      HIGH_SCHOOL: 'Explore drought-resistant practices, irrigation efficiency, and water harvesting.',
      UNDERGRADUATE: 'Analyze water-use efficiency, deficit irrigation, and drought adaptation.',
      GRADUATE: 'Examine water productivity, virtual water, and climate-smart water management.',
      PHD: 'Research crop water stress, precision irrigation, and water-food-energy nexus.'
    },
    topic: 'regenerative-agriculture',
    category: 'WATER',
    icon: 'Droplets',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-ws-1', title: 'Every Drop Counts', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Saving Water on Farms!</h2><p>Plants need water to grow, but we can be smart about how much we use. Mulch and healthy soil help hold water!</p>', MIDDLE_SCHOOL: '<h2>Water-Wise Farming</h2><p>Drip irrigation, mulching, and building soil organic matter all help farms use less water.</p>', HIGH_SCHOOL: '<h2>Irrigation Efficiency</h2><p>Drip vs. sprinkler vs. flood. Scheduling irrigation based on soil moisture and crop needs.</p>', UNDERGRADUATE: '<h2>Water Use Efficiency</h2><p>Crop water productivity, deficit irrigation strategies, and drought-tolerant varieties.</p>', GRADUATE: '<h2>Climate-Smart Water</h2><p>Adapting to water scarcity, rainwater harvesting, and managed aquifer recharge.</p>', PHD: '<h2>Research Frontiers</h2><p>Remote sensing for irrigation scheduling, water stress physiology, and system optimization.</p>' } }],
    activities: [{ id: 'ra-ws-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Water!', MIDDLE_SCHOOL: 'Irrigation Choice', HIGH_SCHOOL: 'Scheduling', UNDERGRADUATE: 'Efficiency Audit', GRADUATE: 'Basin Planning', PHD: 'Optimization' }, description: { ELEMENTARY: 'Help plants grow with less water!', MIDDLE_SCHOOL: 'Choose the best irrigation method.', HIGH_SCHOOL: 'Schedule irrigation using soil moisture.', UNDERGRADUATE: 'Audit farm water use efficiency.', GRADUATE: 'Plan water management for a basin.', PHD: 'Optimize precision irrigation systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-ws-game', type: 'simulation', title: 'Water Saver', description: 'Grow crops while conserving water!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-ws-quiz', passingScore: 80, questions: [{ id: 'rwsq1', question: { ELEMENTARY: 'What helps soil hold water?', MIDDLE_SCHOOL: 'Which irrigation method uses least water?', HIGH_SCHOOL: 'What is deficit irrigation?', UNDERGRADUATE: 'What is crop water productivity?', GRADUATE: 'What is managed aquifer recharge?', PHD: 'What is the water-food-energy nexus?' }, options: { ELEMENTARY: ['Mulch and organic matter', 'Bare soil', 'Concrete', 'Rocks only'], MIDDLE_SCHOOL: ['Drip irrigation', 'Flood irrigation', 'Sprinklers at noon', 'Leaving hose running'], HIGH_SCHOOL: ['Intentionally giving less water than full needs', 'Giving too much water', 'Never watering', 'Random watering'], UNDERGRADUATE: ['Yield per unit water consumed', 'Total water used', 'Rainfall only', 'Irrigation cost'], GRADUATE: ['Intentionally recharging groundwater', 'Draining aquifers', 'Ignoring groundwater', 'Pumping more'], PHD: ['Interconnections between water, food, and energy systems', 'Water only', 'Food only', 'Energy only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Mulch and organic matter in soil act like sponges to hold water!', MIDDLE_SCHOOL: 'Drip irrigation delivers water directly to plant roots with minimal waste.', HIGH_SCHOOL: 'Deficit irrigation strategically reduces water below maximum to save water with minimal yield loss.', UNDERGRADUATE: 'Crop water productivity measures how much crop is produced per unit of water consumed.', GRADUATE: 'MAR involves deliberately recharging aquifers with surface water for later use.', PHD: 'The nexus recognizes that water, food, and energy systems are interconnected and must be managed together.' } }] },
    externalResources: [{ title: 'Water-Smart Agriculture', url: 'https://www.fao.org/climate-smart-agriculture/en/', type: 'research' }]
  },
  // Module 12: Pollinator Habitat
  {
    id: 'regen-pollinators',
    slug: 'pollinator-habitat',
    title: 'Pollinator Habitat',
    description: {
      ELEMENTARY: 'Learn about bees, butterflies, and other helpful insects!',
      MIDDLE_SCHOOL: 'Discover why pollinators are essential for growing food.',
      HIGH_SCHOOL: 'Explore pollinator ecology, habitat creation, and conservation strategies.',
      UNDERGRADUATE: 'Analyze pollination services, habitat management, and farm integration.',
      GRADUATE: 'Examine pollinator decline, landscape ecology, and ecosystem services valuation.',
      PHD: 'Research pollinator networks, pesticide impacts, and restoration ecology.'
    },
    topic: 'regenerative-agriculture',
    category: 'BIODIVERSITY',
    icon: 'Flower2',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-poll-1', title: 'Helping Our Pollinators', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Busy Bees and Butterflies!</h2><p>Bees and butterflies carry pollen from flower to flower. This helps plants make fruits and seeds!</p>', MIDDLE_SCHOOL: '<h2>Why Pollinators Matter</h2><p>About one-third of our food depends on pollinators. Without them, many crops wouldnt produce.</p>', HIGH_SCHOOL: '<h2>Creating Pollinator Habitat</h2><p>Flower strips, hedgerows, and reduced pesticide use support diverse pollinator communities.</p>', UNDERGRADUATE: '<h2>Pollination Services</h2><p>Managed vs wild pollinators, habitat requirements, and integrating habitat into farms.</p>', GRADUATE: '<h2>Landscape Approaches</h2><p>Pollinator corridors, landscape composition, and coordinated conservation.</p>', PHD: '<h2>Research Frontiers</h2><p>Pollinator network analysis, multiple stressor interactions, and restoration success.</p>' } }],
    activities: [{ id: 'ra-poll-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant for Pollinators!', MIDDLE_SCHOOL: 'Garden Design', HIGH_SCHOOL: 'Habitat Planning', UNDERGRADUATE: 'Farm Integration', GRADUATE: 'Landscape Design', PHD: 'Network Analysis' }, description: { ELEMENTARY: 'Create a garden for bees and butterflies!', MIDDLE_SCHOOL: 'Design a pollinator-friendly garden.', HIGH_SCHOOL: 'Plan pollinator habitat for a farm.', UNDERGRADUATE: 'Integrate pollinator habitat into farm operations.', GRADUATE: 'Design landscape-level pollinator corridors.', PHD: 'Analyze plant-pollinator network dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-poll-game', type: 'simulation', title: 'Pollinator Paradise', description: 'Build habitat to save the pollinators!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-poll-quiz', passingScore: 80, questions: [{ id: 'rpollq1', question: { ELEMENTARY: 'What do bees carry between flowers?', MIDDLE_SCHOOL: 'How much of our food needs pollinators?', HIGH_SCHOOL: 'What is a flower strip?', UNDERGRADUATE: 'What is a pollination service?', GRADUATE: 'What is a pollinator corridor?', PHD: 'What is network nestedness?' }, options: { ELEMENTARY: ['Pollen', 'Water', 'Soil', 'Seeds'], MIDDLE_SCHOOL: ['About one-third', 'Almost none', 'Everything', 'Only honey'], HIGH_SCHOOL: ['A row of flowers planted for pollinators', 'A flower store', 'A stripe on a flower', 'A flower road'], UNDERGRADUATE: ['The benefit of pollination to crop production', 'Bee rental', 'Flower delivery', 'Garden service'], GRADUATE: ['Connected habitat allowing pollinator movement', 'A bee highway', 'A flower parade', 'A garden path'], PHD: ['Pattern where specialists interact with subsets of generalist partners', 'Random connections', 'Equal connections', 'No pattern'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Bees carry pollen on their fuzzy bodies from one flower to another!', MIDDLE_SCHOOL: 'About one-third of our food crops depend on animal pollinators like bees and butterflies.', HIGH_SCHOOL: 'Flower strips are rows of native flowers planted on farms to provide food and habitat for pollinators.', UNDERGRADUATE: 'Pollination services are the economic benefits crops receive from pollinator activity.', GRADUATE: 'Pollinator corridors connect habitat patches, allowing pollinators to move across landscapes.', PHD: 'Nestedness describes network structure where specialist species interact with subsets of partners used by generalists.' } }] },
    externalResources: [{ title: 'Pollinator Partnership', url: 'https://www.pollinator.org/', type: 'research' }]
  },
  // Module 13: Farm Diversification
  {
    id: 'regen-diversification',
    slug: 'farm-diversification',
    title: 'Farm Diversification',
    description: {
      ELEMENTARY: 'Learn why farms grow many different things!',
      MIDDLE_SCHOOL: 'Discover how variety makes farms stronger and healthier.',
      HIGH_SCHOOL: 'Explore crop diversification, enterprise stacking, and risk management.',
      UNDERGRADUATE: 'Analyze diversification economics, market strategies, and business planning.',
      GRADUATE: 'Examine agritourism, value chains, and alternative revenue streams.',
      PHD: 'Research diversification impacts on resilience, ecosystem services, and livelihoods.'
    },
    topic: 'regenerative-agriculture',
    category: 'ECONOMICS',
    icon: 'LayoutGrid',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-div-1', title: 'Many Crops, Strong Farm', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Variety is Good!</h2><p>Farms that grow many different things are healthier. If one crop fails, others still succeed!</p>', MIDDLE_SCHOOL: '<h2>Why Diversify?</h2><p>Different crops have different needs and risks. Mixing crops spreads risk and improves soil.</p>', HIGH_SCHOOL: '<h2>Enterprise Stacking</h2><p>Combining crops, livestock, and direct sales creates multiple income streams and reduces risk.</p>', UNDERGRADUATE: '<h2>Diversification Economics</h2><p>Risk-return tradeoffs, labor allocation, and market timing across diverse enterprises.</p>', GRADUATE: '<h2>Alternative Enterprises</h2><p>Agritourism, value-added products, ecosystem services payments, and renewable energy.</p>', PHD: '<h2>Research Frontiers</h2><p>Diversification effects on farm resilience, regional food systems, and livelihood stability.</p>' } }],
    activities: [{ id: 'ra-div-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plan a Diverse Farm!', MIDDLE_SCHOOL: 'Mix and Match', HIGH_SCHOOL: 'Enterprise Stack', UNDERGRADUATE: 'Business Planning', GRADUATE: 'Revenue Streams', PHD: 'Resilience Analysis' }, description: { ELEMENTARY: 'Design a farm with many different things!', MIDDLE_SCHOOL: 'Choose a good mix of crops and animals.', HIGH_SCHOOL: 'Stack multiple enterprises on one farm.', UNDERGRADUATE: 'Create a diversified farm business plan.', GRADUATE: 'Develop alternative revenue streams.', PHD: 'Analyze diversification and farm resilience.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-div-game', type: 'simulation', title: 'Diverse Farm', description: 'Build a resilient farm through diversification!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-div-quiz', passingScore: 80, questions: [{ id: 'rdivq1', question: { ELEMENTARY: 'Why is it good to grow many things?', MIDDLE_SCHOOL: 'What does diversification mean?', HIGH_SCHOOL: 'What is enterprise stacking?', UNDERGRADUATE: 'What is a risk-return tradeoff?', GRADUATE: 'What is agritourism?', PHD: 'What is livelihood resilience?' }, options: { ELEMENTARY: ['If one fails, others succeed', 'Its harder', 'No reason', 'More work only'], MIDDLE_SCHOOL: ['Growing or doing many different things', 'Growing one crop', 'Stopping farming', 'Using chemicals'], HIGH_SCHOOL: ['Multiple enterprises on one farm', 'Stacking hay', 'One big crop', 'Enterprise software'], UNDERGRADUATE: ['Higher risk may bring higher returns', 'No risk exists', 'All returns equal', 'Risk doesnt matter'], GRADUATE: ['Farm-based tourism activities', 'Agricultural tourism agency', 'Farming video games', 'Online farm store'], PHD: ['Ability to maintain wellbeing despite shocks', 'Making more money', 'Having more land', 'Growing more crops'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Growing many things means if one crop has problems, you still have others to sell and eat!', MIDDLE_SCHOOL: 'Diversification means having variety - different crops, animals, or activities on a farm.', HIGH_SCHOOL: 'Enterprise stacking combines multiple income-generating activities on the same land.', UNDERGRADUATE: 'The risk-return tradeoff means accepting higher risk may yield higher returns, or lower risk means more stability.', GRADUATE: 'Agritourism invites visitors to farms for education, recreation, and direct sales.', PHD: 'Livelihood resilience is the capacity to maintain or improve wellbeing despite disturbances.' } }] },
    externalResources: [{ title: 'Farm Diversification', url: 'https://www.sare.org/publications/diversifying-cropping-systems/', type: 'research' }]
  },
  // Module 14: Seed Saving
  {
    id: 'regen-seed-saving',
    slug: 'seed-saving',
    title: 'Seed Saving',
    description: {
      ELEMENTARY: 'Learn how to save seeds from plants to grow again!',
      MIDDLE_SCHOOL: 'Discover the art and science of keeping seeds for next year.',
      HIGH_SCHOOL: 'Explore seed biology, selection techniques, and storage methods.',
      UNDERGRADUATE: 'Analyze genetic diversity, seed systems, and germplasm conservation.',
      GRADUATE: 'Examine seed sovereignty, community seed banks, and intellectual property.',
      PHD: 'Research crop genetics, participatory plant breeding, and seed network dynamics.'
    },
    topic: 'regenerative-agriculture',
    category: 'SEEDS',
    icon: 'Sprout',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-seed-1', title: 'Seeds for Tomorrow', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Saving Seeds!</h2><p>Every plant comes from a seed. We can save seeds from the best plants to grow more next year!</p>', MIDDLE_SCHOOL: '<h2>Why Save Seeds?</h2><p>Saved seeds adapt to local conditions. Its free seed and preserves plant diversity.</p>', HIGH_SCHOOL: '<h2>Seed Saving Basics</h2><p>Open-pollinated vs hybrid varieties, isolation distances, harvesting, cleaning, and storage.</p>', UNDERGRADUATE: '<h2>Genetic Diversity</h2><p>Population genetics, selection pressure, maintaining diversity, and avoiding inbreeding.</p>', GRADUATE: '<h2>Seed Sovereignty</h2><p>Community seed banks, farmers rights, and alternative seed systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Participatory plant breeding, evolutionary populations, and seed network resilience.</p>' } }],
    activities: [{ id: 'ra-seed-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Your Seeds!', MIDDLE_SCHOOL: 'Seed Selection', HIGH_SCHOOL: 'Isolation Planning', UNDERGRADUATE: 'Diversity Analysis', GRADUATE: 'Seed Bank Design', PHD: 'Breeding Program' }, description: { ELEMENTARY: 'Learn to collect and store seeds!', MIDDLE_SCHOOL: 'Choose the best plants for seed saving.', HIGH_SCHOOL: 'Plan isolation to keep varieties pure.', UNDERGRADUATE: 'Analyze genetic diversity in seed lots.', GRADUATE: 'Design a community seed bank.', PHD: 'Design a participatory breeding program.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-seed-game', type: 'simulation', title: 'Seed Keeper', description: 'Build a diverse seed collection for the future!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-seed-quiz', passingScore: 80, questions: [{ id: 'rseedq1', question: { ELEMENTARY: 'Why do we save seeds from the best plants?', MIDDLE_SCHOOL: 'What is an open-pollinated variety?', HIGH_SCHOOL: 'Why do seeds need isolation?', UNDERGRADUATE: 'What is inbreeding depression?', GRADUATE: 'What is seed sovereignty?', PHD: 'What is participatory plant breeding?' }, options: { ELEMENTARY: ['To grow more good plants next year', 'For decoration', 'To throw away', 'No reason'], MIDDLE_SCHOOL: ['Plants whose seeds grow true to type', 'Plants needing opening', 'Hybrid plants', 'Closed plants'], HIGH_SCHOOL: ['To prevent unwanted cross-pollination', 'Seeds are lonely', 'For protection from rain', 'No reason'], UNDERGRADUATE: ['Reduced fitness from mating of relatives', 'Sadness from breeding', 'Better plants', 'More seeds'], GRADUATE: ['Farmers right to save, use, and share seeds', 'Seed royalty', 'Seed government', 'Seed kingdom'], PHD: ['Farmers and scientists breeding together', 'Participating in breeding shows', 'Watching breeding', 'Reading about breeding'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Seeds from the best plants are more likely to grow into good plants next year!', MIDDLE_SCHOOL: 'Open-pollinated varieties produce offspring similar to parents, so saved seeds grow true.', HIGH_SCHOOL: 'Isolation prevents pollen from other varieties crossing with your seed plants.', UNDERGRADUATE: 'Inbreeding depression is reduced vigor when related individuals mate.', GRADUATE: 'Seed sovereignty is the right of farmers and communities to save, use, exchange, and sell seeds.', PHD: 'Participatory plant breeding involves farmers in variety development to meet local needs.' } }] },
    externalResources: [{ title: 'Seed Savers Exchange', url: 'https://www.seedsavers.org/', type: 'research' }]
  },
  // Module 15: Livestock Integration
  {
    id: 'regen-livestock',
    slug: 'livestock-integration',
    title: 'Livestock Integration',
    description: {
      ELEMENTARY: 'Learn how animals help farms grow better food!',
      MIDDLE_SCHOOL: 'Discover how animals and plants work together on farms.',
      HIGH_SCHOOL: 'Explore integrated crop-livestock systems, nutrient cycling, and grazing.',
      UNDERGRADUATE: 'Analyze livestock enterprise economics, feed systems, and environmental impacts.',
      GRADUATE: 'Examine multi-species grazing, silvopasture, and lifecycle assessment.',
      PHD: 'Research animal welfare, methane mitigation, and systems optimization.'
    },
    topic: 'regenerative-agriculture',
    category: 'LIVESTOCK',
    icon: 'Beef',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-live-1', title: 'Animals on the Farm', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Helpful Farm Animals!</h2><p>Cows, chickens, and sheep help farms! They eat plants and make fertilizer for crops.</p>', MIDDLE_SCHOOL: '<h2>The Animal-Plant Connection</h2><p>Animals graze cover crops, add manure, and create a cycle that benefits both crops and livestock.</p>', HIGH_SCHOOL: '<h2>Integrated Systems</h2><p>Crop-livestock integration creates nutrient cycles, diversifies income, and manages cover crops.</p>', UNDERGRADUATE: '<h2>Enterprise Economics</h2><p>Feed costs, market timing, infrastructure needs, and integration with crop rotations.</p>', GRADUATE: '<h2>Multi-Species Systems</h2><p>Combining cattle, sheep, poultry, and other species for complementary grazing and pest control.</p>', PHD: '<h2>Research Frontiers</h2><p>Enteric methane reduction, welfare assessment, and whole-farm optimization.</p>' } }],
    activities: [{ id: 'ra-live-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Farm Animals Help!', MIDDLE_SCHOOL: 'Nutrient Cycle', HIGH_SCHOOL: 'Integration Plan', UNDERGRADUATE: 'Enterprise Analysis', GRADUATE: 'Multi-Species Design', PHD: 'System Optimization' }, description: { ELEMENTARY: 'See how animals help grow food!', MIDDLE_SCHOOL: 'Follow nutrients from animal to plant.', HIGH_SCHOOL: 'Plan livestock integration on a farm.', UNDERGRADUATE: 'Analyze livestock enterprise economics.', GRADUATE: 'Design a multi-species grazing system.', PHD: 'Optimize integrated crop-livestock systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-live-game', type: 'simulation', title: 'Integrated Farmer', description: 'Combine crops and livestock for a thriving farm!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-live-quiz', passingScore: 80, questions: [{ id: 'rliveq1', question: { ELEMENTARY: 'How do farm animals help plants?', MIDDLE_SCHOOL: 'What is nutrient cycling?', HIGH_SCHOOL: 'What is crop-livestock integration?', UNDERGRADUATE: 'What are feed costs?', GRADUATE: 'What is multi-species grazing?', PHD: 'What is enteric methane?' }, options: { ELEMENTARY: ['They make fertilizer', 'They eat all the plants', 'They dont help', 'They plant seeds'], MIDDLE_SCHOOL: ['Nutrients moving from animals to soil to plants', 'Riding bikes', 'Recycling cans', 'Washing dishes'], HIGH_SCHOOL: ['Combining animals and crops on one farm', 'Separate farms only', 'Only crops', 'Only animals'], UNDERGRADUATE: ['Cost of feeding livestock', 'Feed the farmer cost', 'Free feeding', 'No feed needed'], GRADUATE: ['Different animal species grazing together', 'One species only', 'No grazing', 'Indoor farming'], PHD: ['Methane produced in ruminant digestion', 'Entry methane', 'External methane', 'Electric methane'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Animal manure adds nutrients to soil that help plants grow!', MIDDLE_SCHOOL: 'Nutrient cycling moves nutrients from animal waste to soil to plants and back through animals.', HIGH_SCHOOL: 'Crop-livestock integration combines animal and plant production for mutual benefits.', UNDERGRADUATE: 'Feed costs are typically the largest expense in livestock enterprises.', GRADUATE: 'Multi-species grazing uses different animals that eat different plants for more complete utilization.', PHD: 'Enteric methane is produced by microbes in ruminant stomachs during digestion.' } }] },
    externalResources: [{ title: 'Integrated Farming', url: 'https://www.sare.org/publications/crop-livestock-integration/', type: 'research' }]
  },
  {
    id: 'ra-biochar',
    slug: 'biochar',
    title: 'Biochar Applications',
    description: {
      ELEMENTARY: 'Learn about special charcoal that helps plants grow and keeps carbon in the soil!',
      MIDDLE_SCHOOL: 'Discover how biochar is made and how it improves soil health for farming.',
      HIGH_SCHOOL: 'Explore biochar production methods, soil amendment benefits, and carbon sequestration.',
      UNDERGRADUATE: 'Analyze biochar feedstocks, pyrolysis processes, and soil-plant interactions.',
      GRADUATE: 'Examine biochar characterization, application rates, and lifecycle carbon analysis.',
      PHD: 'Research biochar surface chemistry, microbial interactions, and carbon permanence.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL_HEALTH',
    icon: 'Flame',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-bio-1', title: 'Magic Charcoal', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Super Charcoal for Soil!</h2><p>Biochar is special charcoal made from plants. When we put it in soil, it helps plants grow bigger and stronger!</p>', MIDDLE_SCHOOL: '<h2>What is Biochar?</h2><p>Biochar is created by heating plant material without oxygen. This process, called pyrolysis, creates a stable form of carbon that lasts for centuries in soil.</p>', HIGH_SCHOOL: '<h2>Biochar Science</h2><p>Pyrolysis temperatures affect biochar properties. Higher temperatures create more stable carbon but may reduce nutrient availability. Application rates depend on soil type and crop needs.</p>', UNDERGRADUATE: '<h2>Production Systems</h2><p>Feedstock selection, pyrolysis parameters, and post-processing affect biochar quality. Economic viability depends on feedstock costs and co-product value.</p>', GRADUATE: '<h2>Advanced Applications</h2><p>Biochar characterization methods, optimal application strategies, and integration with other amendments for synergistic effects.</p>', PHD: '<h2>Research Frontiers</h2><p>Surface functional groups, biochar-microbiome interactions, and long-term carbon stability under varying environmental conditions.</p>' } }],
    activities: [{ id: 'ra-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Make Biochar!', MIDDLE_SCHOOL: 'Pyrolysis Lab', HIGH_SCHOOL: 'Production System', UNDERGRADUATE: 'Process Design', GRADUATE: 'Application Trials', PHD: 'Research Design' }, description: { ELEMENTARY: 'See how plants become super soil helper!', MIDDLE_SCHOOL: 'Watch the biochar production process.', HIGH_SCHOOL: 'Design a biochar production system.', UNDERGRADUATE: 'Optimize pyrolysis parameters.', GRADUATE: 'Plan biochar field trials.', PHD: 'Design research protocols for biochar.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-bio-game', type: 'simulation', title: 'Biochar Builder', description: 'Create biochar and improve soil health!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-bio-quiz', passingScore: 80, questions: [{ id: 'rbioq1', question: { ELEMENTARY: 'What is biochar made from?', MIDDLE_SCHOOL: 'What is pyrolysis?', HIGH_SCHOOL: 'Why is biochar stable?', UNDERGRADUATE: 'What affects biochar quality?', GRADUATE: 'How do you characterize biochar?', PHD: 'What determines carbon permanence?' }, options: { ELEMENTARY: ['Plants', 'Rocks', 'Water', 'Metal'], MIDDLE_SCHOOL: ['Heating without oxygen', 'Burning with fire', 'Freezing plants', 'Adding water'], HIGH_SCHOOL: ['Carbon structure resists decomposition', 'It dissolves quickly', 'Microbes eat it fast', 'It evaporates'], UNDERGRADUATE: ['Feedstock and pyrolysis conditions', 'Only the color', 'Weather', 'Time of day'], GRADUATE: ['Surface area, pH, carbon content', 'Only color', 'Smell test', 'Taste test'], PHD: ['Aromatic carbon structure and soil conditions', 'Random chance', 'Air temperature only', 'Moon phase'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Biochar is made from plant materials like wood, straw, and crop residues!', MIDDLE_SCHOOL: 'Pyrolysis heats materials without oxygen, preventing burning and creating stable carbon.', HIGH_SCHOOL: 'Biochars aromatic carbon ring structure resists microbial decomposition.', UNDERGRADUATE: 'Feedstock type and pyrolysis temperature, time, and atmosphere determine biochar properties.', GRADUATE: 'Characterization includes BET surface area, pH, CEC, carbon fractions, and ash content.', PHD: 'Aromatic condensation degree and environmental factors determine long-term stability.' } }] },
    externalResources: [{ title: 'Biochar Research', url: 'https://biochar-international.org/', type: 'research' }]
  },
  {
    id: 'ra-mycorrhizae',
    slug: 'mycorrhizal-fungi',
    title: 'Mycorrhizal Fungi',
    description: {
      ELEMENTARY: 'Discover the amazing underground network of friendly fungi that help plants share food!',
      MIDDLE_SCHOOL: 'Learn how mycorrhizal fungi form partnerships with plant roots to exchange nutrients.',
      HIGH_SCHOOL: 'Explore mycorrhizal associations, nutrient transfer mechanisms, and soil ecology.',
      UNDERGRADUATE: 'Analyze mycorrhizal diversity, inoculation strategies, and agricultural applications.',
      GRADUATE: 'Examine mycorrhizal network dynamics, carbon allocation, and ecosystem functions.',
      PHD: 'Research common mycorrhizal networks, signaling pathways, and climate change responses.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL_HEALTH',
    icon: 'Network',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-myc-1', title: 'Underground Friends', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>The Wood Wide Web!</h2><p>Tiny fungi grow on plant roots and help them share food and water. Its like an underground internet for plants!</p>', MIDDLE_SCHOOL: '<h2>Plant-Fungi Partnership</h2><p>Mycorrhizal fungi extend plant root systems by hundreds of times, trading soil nutrients for plant sugars in a mutually beneficial relationship.</p>', HIGH_SCHOOL: '<h2>Mycorrhizal Types</h2><p>Arbuscular mycorrhizae penetrate root cells while ectomycorrhizae surround roots. Different crops form different associations based on plant family.</p>', UNDERGRADUATE: '<h2>Management for Mycorrhizae</h2><p>Tillage, fertilization, and crop rotation affect mycorrhizal populations. Inoculation can boost colonization in degraded soils.</p>', GRADUATE: '<h2>Network Ecology</h2><p>Common mycorrhizal networks connect plants, enabling resource sharing and communication between individuals and species.</p>', PHD: '<h2>Research Frontiers</h2><p>Molecular mechanisms of nutrient exchange, network architecture, and mycorrhizal responses to global change.</p>' } }],
    activities: [{ id: 'ra-myc-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Fungi Friends!', MIDDLE_SCHOOL: 'Root Network', HIGH_SCHOOL: 'Mycorrhizal Map', UNDERGRADUATE: 'Inoculation Trial', GRADUATE: 'Network Analysis', PHD: 'Molecular Research' }, description: { ELEMENTARY: 'Watch fungi help plants share!', MIDDLE_SCHOOL: 'Build a mycorrhizal network.', HIGH_SCHOOL: 'Map mycorrhizal associations.', UNDERGRADUATE: 'Design an inoculation experiment.', GRADUATE: 'Analyze network carbon flows.', PHD: 'Study molecular signaling.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-myc-game', type: 'simulation', title: 'Network Builder', description: 'Connect plants with mycorrhizal fungi!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-myc-quiz', passingScore: 80, questions: [{ id: 'rmycq1', question: { ELEMENTARY: 'What do mycorrhizal fungi help plants do?', MIDDLE_SCHOOL: 'What do plants give fungi?', HIGH_SCHOOL: 'What is arbuscular mycorrhiza?', UNDERGRADUATE: 'What harms mycorrhizae?', GRADUATE: 'What is a common mycorrhizal network?', PHD: 'How do mycorrhizae transfer nutrients?' }, options: { ELEMENTARY: ['Share food and water', 'Grow taller', 'Make flowers', 'Sing songs'], MIDDLE_SCHOOL: ['Sugars from photosynthesis', 'Water', 'Soil', 'Rocks'], HIGH_SCHOOL: ['Fungi that penetrate root cells', 'Fungi on leaves', 'Bacteria', 'Insects'], UNDERGRADUATE: ['Tillage and high fertilizer', 'Water', 'Sunlight', 'Good soil'], GRADUATE: ['Fungi connecting multiple plants', 'One plant only', 'No connection', 'Air network'], PHD: ['Membrane transporters and vesicles', 'Diffusion only', 'Magic', 'Wind transport'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Mycorrhizal fungi help plants share food and water through their underground network!', MIDDLE_SCHOOL: 'Plants trade sugars made through photosynthesis for nutrients fungi collect from soil.', HIGH_SCHOOL: 'Arbuscular mycorrhizae form specialized structures inside root cells for nutrient exchange.', UNDERGRADUATE: 'Tillage breaks fungal networks and high phosphorus reduces plant dependence on fungi.', GRADUATE: 'CMNs connect plants through shared fungal networks enabling resource and signal transfer.', PHD: 'Specialized membrane transporters and vesicular structures facilitate bidirectional nutrient transfer.' } }] },
    externalResources: [{ title: 'Mycorrhizal Ecology', url: 'https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/mycorrhizal-fungi', type: 'research' }]
  },
  {
    id: 'ra-notill',
    slug: 'no-till-farming',
    title: 'No-Till Farming',
    description: {
      ELEMENTARY: 'Learn why some farmers dont dig up the soil and how this helps earthworms and plants!',
      MIDDLE_SCHOOL: 'Discover how no-till farming protects soil structure and builds organic matter.',
      HIGH_SCHOOL: 'Explore no-till systems, cover crop integration, and soil health improvements.',
      UNDERGRADUATE: 'Analyze no-till equipment, transition management, and economic considerations.',
      GRADUATE: 'Examine long-term soil carbon dynamics, weed ecology, and system optimization.',
      PHD: 'Research no-till effects on soil biology, greenhouse gas fluxes, and global applicability.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL_MANAGEMENT',
    icon: 'Leaf',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-nt-1', title: 'No Digging Needed', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Happy Soil, Happy Worms!</h2><p>When farmers dont plow, earthworms and tiny soil creatures can build their homes. The soil stays fluffy and healthy!</p>', MIDDLE_SCHOOL: '<h2>Why No-Till?</h2><p>Tillage disrupts soil structure, kills organisms, and releases carbon. No-till protects soil aggregates and allows natural processes to improve soil health.</p>', HIGH_SCHOOL: '<h2>No-Till Systems</h2><p>Successful no-till requires careful residue management, cover crops, and often different planting equipment. Benefits increase over time as soil biology recovers.</p>', UNDERGRADUATE: '<h2>Transition Challenges</h2><p>Moving to no-till involves equipment investments, new weed management strategies, and often a transition period before yields recover.</p>', GRADUATE: '<h2>System Optimization</h2><p>Integrating no-till with cover crops, diverse rotations, and precision management maximizes benefits while addressing challenges.</p>', PHD: '<h2>Research Questions</h2><p>Soil carbon accumulation rates, N2O emissions tradeoffs, and adaptation of no-till principles across climates and soil types.</p>' } }],
    activities: [{ id: 'ra-nt-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Soil Life Tour', MIDDLE_SCHOOL: 'Soil Structure', HIGH_SCHOOL: 'Farm Transition', UNDERGRADUATE: 'Equipment Analysis', GRADUATE: 'System Design', PHD: 'Carbon Modeling' }, description: { ELEMENTARY: 'See creatures living in healthy soil!', MIDDLE_SCHOOL: 'Compare tilled vs no-till soil.', HIGH_SCHOOL: 'Plan a transition to no-till.', UNDERGRADUATE: 'Evaluate no-till equipment options.', GRADUATE: 'Optimize a no-till system.', PHD: 'Model soil carbon dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-nt-game', type: 'simulation', title: 'No-Till Farmer', description: 'Build soil health without tillage!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-nt-quiz', passingScore: 80, questions: [{ id: 'rntq1', question: { ELEMENTARY: 'Why is no-till good for earthworms?', MIDDLE_SCHOOL: 'What does tillage destroy?', HIGH_SCHOOL: 'What helps no-till succeed?', UNDERGRADUATE: 'What is a transition challenge?', GRADUATE: 'How optimize no-till?', PHD: 'What is the N2O tradeoff?' }, options: { ELEMENTARY: ['Keeps their homes safe', 'Makes them fly', 'Gives them hats', 'Paints them blue'], MIDDLE_SCHOOL: ['Soil structure and organisms', 'Weeds only', 'Rocks', 'Nothing'], HIGH_SCHOOL: ['Cover crops and good equipment', 'More plowing', 'No plants', 'Bare soil'], UNDERGRADUATE: ['Weed management changes', 'Too easy', 'No challenges', 'More profit immediately'], GRADUATE: ['Diverse rotations and covers', 'More tillage', 'Monoculture', 'No management'], PHD: ['Reduced tillage CO2 vs possible N2O increase', 'No tradeoff', 'Only benefits', 'Only problems'] }, correctIndex: 0, explanation: { ELEMENTARY: 'No-till keeps earthworm tunnels and homes intact so they can keep helping the soil!', MIDDLE_SCHOOL: 'Tillage breaks up soil aggregates and harms fungi, bacteria, and other soil organisms.', HIGH_SCHOOL: 'Cover crops suppress weeds, add organic matter, and help manage residue in no-till systems.', UNDERGRADUATE: 'Without tillage for weed control, farmers need new strategies like cover crops and targeted herbicides.', GRADUATE: 'Combining no-till with diverse rotations, multiple cover crops, and precision tools maximizes benefits.', PHD: 'No-till reduces CO2 from decomposition but may increase N2O in some conditions, requiring systems analysis.' } }] },
    externalResources: [{ title: 'No-Till Research', url: 'https://www.sare.org/publications/building-soils-for-better-crops/', type: 'research' }]
  },
  {
    id: 'ra-economics',
    slug: 'farm-economics',
    title: 'Regenerative Farm Economics',
    description: {
      ELEMENTARY: 'Learn how farmers make money while taking care of the Earth!',
      MIDDLE_SCHOOL: 'Discover how regenerative practices can save money and earn premium prices.',
      HIGH_SCHOOL: 'Explore the economics of regenerative agriculture including costs, revenues, and profitability.',
      UNDERGRADUATE: 'Analyze enterprise budgets, transition costs, and market opportunities for regenerative products.',
      GRADUATE: 'Examine ecosystem service payments, certification economics, and supply chain value capture.',
      PHD: 'Research total cost accounting, natural capital valuation, and regenerative economy models.'
    },
    topic: 'regenerative-agriculture',
    category: 'ECONOMICS',
    icon: 'DollarSign',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-econ-1', title: 'Farming for Profit and Planet', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Good for Earth, Good for Farmers!</h2><p>When farmers take care of the soil, they spend less on fertilizer and can sell special healthy food for more money!</p>', MIDDLE_SCHOOL: '<h2>Saving and Earning</h2><p>Regenerative farmers reduce input costs by building soil fertility naturally while often earning premium prices for sustainably produced food.</p>', HIGH_SCHOOL: '<h2>Farm Economics</h2><p>Regenerative systems may have lower input costs but require management skill. Premium markets, reduced risk, and ecosystem payments can improve profitability.</p>', UNDERGRADUATE: '<h2>Enterprise Analysis</h2><p>Transition periods may reduce yields before soil health improves. Enterprise budgets must account for input savings, yield changes, and market premiums.</p>', GRADUATE: '<h2>Value Capture</h2><p>Ecosystem service markets, certification premiums, and direct marketing allow farmers to capture more value from regenerative practices.</p>', PHD: '<h2>Economic Research</h2><p>True cost accounting internalizes externalities, revealing regenerative agricultures economic advantages over conventional systems.</p>' } }],
    activities: [{ id: 'ra-econ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Farm Shop!', MIDDLE_SCHOOL: 'Budget Builder', HIGH_SCHOOL: 'Farm Calculator', UNDERGRADUATE: 'Enterprise Budget', GRADUATE: 'Value Chain', PHD: 'True Cost Model' }, description: { ELEMENTARY: 'Run a farm stand and count earnings!', MIDDLE_SCHOOL: 'Balance farm income and expenses.', HIGH_SCHOOL: 'Calculate farm profitability.', UNDERGRADUATE: 'Build an enterprise budget.', GRADUATE: 'Analyze value chain economics.', PHD: 'Model true cost accounting.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-econ-game', type: 'simulation', title: 'Regen Farm Business', description: 'Build a profitable regenerative farm!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-econ-quiz', passingScore: 80, questions: [{ id: 'reconq1', question: { ELEMENTARY: 'How do regenerative farmers save money?', MIDDLE_SCHOOL: 'What is a premium price?', HIGH_SCHOOL: 'What affects farm profitability?', UNDERGRADUATE: 'What is enterprise budgeting?', GRADUATE: 'What are ecosystem service payments?', PHD: 'What is true cost accounting?' }, options: { ELEMENTARY: ['Using less fertilizer', 'Buying more machines', 'Using more chemicals', 'Hiring more workers'], MIDDLE_SCHOOL: ['Extra money for special products', 'Lower prices', 'Free products', 'Discount prices'], HIGH_SCHOOL: ['Costs, yields, and prices', 'Only weather', 'Only luck', 'Only location'], UNDERGRADUATE: ['Detailed income and expense analysis', 'Just guessing', 'Only counting sales', 'Ignoring costs'], GRADUATE: ['Payments for environmental benefits', 'Government subsidies only', 'Free money', 'Charity'], PHD: ['Including externalized costs in prices', 'Ignoring environment', 'Only direct costs', 'Simplified accounting'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Regenerative farmers build healthy soil that grows food without needing expensive fertilizers!', MIDDLE_SCHOOL: 'Premium prices are extra money buyers pay for food grown in special sustainable ways.', HIGH_SCHOOL: 'Profitability depends on managing input costs, achieving good yields, and accessing premium markets.', UNDERGRADUATE: 'Enterprise budgeting analyzes all costs and revenues to understand true profitability of farm enterprises.', GRADUATE: 'Ecosystem service payments compensate farmers for environmental benefits like carbon sequestration and water quality.', PHD: 'True cost accounting reveals hidden costs of conventional agriculture by including environmental and social externalities.' } }] },
    externalResources: [{ title: 'Farm Economics Research', url: 'https://rodaleinstitute.org/science/farming-systems-trial/', type: 'research' }]
  },
  {
    id: 'ra-carbon',
    slug: 'carbon-markets',
    title: 'Agricultural Carbon Markets',
    description: {
      ELEMENTARY: 'Learn how farmers can get paid for storing carbon in their soil like a piggy bank!',
      MIDDLE_SCHOOL: 'Discover how carbon markets reward farmers for practices that capture carbon dioxide.',
      HIGH_SCHOOL: 'Explore agricultural carbon credit systems, measurement methods, and market participation.',
      UNDERGRADUATE: 'Analyze carbon market mechanisms, verification protocols, and farmer decision-making.',
      GRADUATE: 'Examine carbon credit integrity, additionality requirements, and market design principles.',
      PHD: 'Research soil carbon measurement uncertainty, permanence risk, and market effectiveness.'
    },
    topic: 'regenerative-agriculture',
    category: 'ECONOMICS',
    icon: 'Coins',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-carb-1', title: 'Carbon Piggy Bank', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Saving Carbon in Soil!</h2><p>Plants take carbon from the air and put it in soil. Farmers who do this well can earn money for helping the planet!</p>', MIDDLE_SCHOOL: '<h2>Carbon Credits</h2><p>Carbon markets let companies pay farmers for storing carbon in soil. Each credit represents one ton of CO2 captured.</p>', HIGH_SCHOOL: '<h2>How Carbon Markets Work</h2><p>Farmers adopt regenerative practices, measure carbon increases, get verified by third parties, and sell credits to companies offsetting emissions.</p>', UNDERGRADUATE: '<h2>Market Participation</h2><p>Farmers must understand contracts, measurement requirements, payment timing, and risk allocation before entering carbon markets.</p>', GRADUATE: '<h2>Credit Integrity</h2><p>Quality credits require additionality (beyond business as usual), accurate measurement, and permanence guarantees.</p>', PHD: '<h2>Research Challenges</h2><p>Soil carbon measurement variability, reversal risk management, and designing markets that drive real climate benefits.</p>' } }],
    activities: [{ id: 'ra-carb-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Carbon Savings!', MIDDLE_SCHOOL: 'Credit Calculator', HIGH_SCHOOL: 'Market Simulator', UNDERGRADUATE: 'Contract Analysis', GRADUATE: 'Verification Design', PHD: 'Market Modeling' }, description: { ELEMENTARY: 'Save carbon and earn rewards!', MIDDLE_SCHOOL: 'Calculate carbon credits earned.', HIGH_SCHOOL: 'Simulate carbon market participation.', UNDERGRADUATE: 'Analyze carbon contract terms.', GRADUATE: 'Design verification protocols.', PHD: 'Model market effectiveness.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-carb-game', type: 'simulation', title: 'Carbon Trader', description: 'Build soil carbon and earn credits!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-carb-quiz', passingScore: 80, questions: [{ id: 'rcarbq1', question: { ELEMENTARY: 'Where do plants put the carbon they capture?', MIDDLE_SCHOOL: 'What is a carbon credit?', HIGH_SCHOOL: 'Who buys carbon credits?', UNDERGRADUATE: 'What is additionality?', GRADUATE: 'What is permanence risk?', PHD: 'Why is soil carbon measurement challenging?' }, options: { ELEMENTARY: ['In the soil', 'In the sky', 'In the ocean', 'In rocks'], MIDDLE_SCHOOL: ['One ton of CO2 stored', 'A credit card', 'Free money', 'A receipt'], HIGH_SCHOOL: ['Companies offsetting emissions', 'Nobody', 'Only farmers', 'Only governments'], UNDERGRADUATE: ['Beyond what would happen anyway', 'Any change', 'No requirements', 'Random selection'], GRADUATE: ['Risk that stored carbon is released', 'No risk exists', 'Only financial risk', 'Weather risk only'], PHD: ['Spatial variability and detection limits', 'Its easy to measure', 'One sample is enough', 'No challenges'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Plants capture carbon dioxide from air and store it in the soil through their roots!', MIDDLE_SCHOOL: 'A carbon credit represents one metric ton of CO2 equivalent captured or prevented from emission.', HIGH_SCHOOL: 'Companies buy credits to offset their own emissions as part of climate commitments.', UNDERGRADUATE: 'Additionality means the carbon storage would not have happened without the market incentive.', GRADUATE: 'Permanence risk is the chance that stored carbon could be released back to atmosphere.', PHD: 'High spatial variability in soil carbon requires intensive sampling to detect changes above measurement uncertainty.' } }] },
    externalResources: [{ title: 'Carbon Market Guide', url: 'https://www.farmers.gov/conservation/carbon', type: 'article' }]
  },
  {
    id: 'ra-perennial',
    slug: 'perennial-grains',
    title: 'Perennial Grains and Crops',
    description: {
      ELEMENTARY: 'Learn about crops that come back year after year without replanting!',
      MIDDLE_SCHOOL: 'Discover perennial crops that protect soil and reduce farm work.',
      HIGH_SCHOOL: 'Explore perennial grain development, benefits, and agricultural potential.',
      UNDERGRADUATE: 'Analyze perennial crop breeding, ecosystem services, and farming systems.',
      GRADUATE: 'Examine perennial agriculture economics, policy support, and landscape integration.',
      PHD: 'Research perennial grain genetics, yield improvement, and system sustainability.'
    },
    topic: 'regenerative-agriculture',
    category: 'PERENNIAL',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-per-1', title: 'Crops That Come Back', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plants That Keep Growing!</h2><p>Most crops die after harvest, but perennial crops come back year after year like a tree!</p>', MIDDLE_SCHOOL: '<h2>Perennial Benefits</h2><p>Perennial crops have deep roots that hold soil, store carbon, and dont need replanting each year.</p>', HIGH_SCHOOL: '<h2>Perennial Revolution</h2><p>Scientists are developing perennial versions of wheat, rice, and other grains that could transform agriculture.</p>', UNDERGRADUATE: '<h2>Breeding Perennials</h2><p>Hybridizing annuals with wild perennial relatives to create productive, long-lived crops.</p>', GRADUATE: '<h2>System Integration</h2><p>Integrating perennials into farm landscapes for ecosystem services while maintaining productivity.</p>', PHD: '<h2>Research Frontiers</h2><p>Yield improvement, seed size, disease resistance, and long-term sustainability.</p>' } }],
    activities: [{ id: 'ra-per-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Plant Once, Harvest Forever!', MIDDLE_SCHOOL: 'Deep Roots', HIGH_SCHOOL: 'Breeding Program', UNDERGRADUATE: 'System Design', GRADUATE: 'Landscape Plan', PHD: 'Genetic Research' }, description: { ELEMENTARY: 'Grow plants that keep coming back!', MIDDLE_SCHOOL: 'Compare annual and perennial roots.', HIGH_SCHOOL: 'Design a perennial breeding program.', UNDERGRADUATE: 'Design a perennial cropping system.', GRADUATE: 'Plan perennial landscape integration.', PHD: 'Research perennial grain genetics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-per-game', type: 'simulation', title: 'Perennial Pioneer', description: 'Build a farm with crops that last!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-per-quiz', passingScore: 80, questions: [{ id: 'rperq1', question: { ELEMENTARY: 'What do perennial crops do?', MIDDLE_SCHOOL: 'Why are deep roots good?', HIGH_SCHOOL: 'What is Kernza?', UNDERGRADUATE: 'How are perennial grains bred?', GRADUATE: 'What are perennial ecosystem services?', PHD: 'What limits perennial grain yield?' }, options: { ELEMENTARY: ['Come back year after year', 'Die every year', 'Grow only once', 'Need replanting always'], MIDDLE_SCHOOL: ['They hold soil and store carbon', 'They use more water', 'They are weaker', 'They are shorter'], HIGH_SCHOOL: ['A perennial wheat relative', 'A type of corn', 'An annual grain', 'A vegetable'], UNDERGRADUATE: ['Crossing annuals with wild perennials', 'Only selecting annuals', 'No breeding needed', 'Random mutations'], GRADUATE: ['Carbon storage, erosion control, water quality', 'Only food production', 'No services', 'Only aesthetic value'], PHD: ['Energy trade-off between grain and perennial growth', 'No limits', 'Too much yield', 'Perfect already'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Perennial crops come back year after year without needing to be replanted!', MIDDLE_SCHOOL: 'Deep perennial roots hold soil in place, store carbon, and access water during droughts.', HIGH_SCHOOL: 'Kernza is a domesticated perennial wheatgrass developed by The Land Institute.', UNDERGRADUATE: 'Perennial grains are bred by crossing high-yielding annuals with perennial wild relatives.', GRADUATE: 'Perennials provide carbon sequestration, erosion control, water filtration, and habitat.', PHD: 'Plants face trade-offs between investing energy in seeds vs maintaining perennial root systems.' } }] },
    externalResources: [{ title: 'Perennial Grains', url: 'https://landinstitute.org/our-work/perennial-crops/', type: 'research' }]
  },
  {
    id: 'ra-agroecology',
    slug: 'agroecology',
    title: 'Agroecology Principles',
    description: {
      ELEMENTARY: 'Learn how farming can work like nature, with everything helping everything else!',
      MIDDLE_SCHOOL: 'Discover how agroecology applies nature principles to farming.',
      HIGH_SCHOOL: 'Explore agroecological principles, practices, and movement history.',
      UNDERGRADUATE: 'Analyze agroecology science, social movements, and policy frameworks.',
      GRADUATE: 'Examine agroecological transitions, food sovereignty, and scaling strategies.',
      PHD: 'Research agroecology metrics, transformation theory, and political ecology.'
    },
    topic: 'regenerative-agriculture',
    category: 'SYSTEMS',
    icon: 'GitBranch',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-agro-1', title: 'Farming Like Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Nature Knows Best!</h2><p>Agroecology means farming like nature - with lots of different plants, animals, and insects all helping each other!</p>', MIDDLE_SCHOOL: '<h2>Natures Lessons</h2><p>Natural ecosystems recycle nutrients, control pests, and maintain fertility. Agroecology applies these lessons to farms.</p>', HIGH_SCHOOL: '<h2>Agroecology Principles</h2><p>Diversity, synergies, recycling, efficiency, and co-creation of knowledge with farmers.</p>', UNDERGRADUATE: '<h2>Science and Movement</h2><p>Agroecology combines ecological science with social movements for food sovereignty and justice.</p>', GRADUATE: '<h2>Scaling Agroecology</h2><p>Territorial approaches, policy support, and farmer networks for scaling agroecological transitions.</p>', PHD: '<h2>Research Frontiers</h2><p>Performance metrics, transformation pathways, and political ecology of food systems.</p>' } }],
    activities: [{ id: 'ra-agro-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Nature Farm!', MIDDLE_SCHOOL: 'Ecosystem Farm', HIGH_SCHOOL: 'Principle Application', UNDERGRADUATE: 'Movement Analysis', GRADUATE: 'Transition Planning', PHD: 'Research Design' }, description: { ELEMENTARY: 'Design a farm that works like nature!', MIDDLE_SCHOOL: 'Apply ecosystem principles to farming.', HIGH_SCHOOL: 'Apply agroecology principles.', UNDERGRADUATE: 'Analyze the agroecology movement.', GRADUATE: 'Plan an agroecological transition.', PHD: 'Design agroecology research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-agro-game', type: 'simulation', title: 'Agroecologist', description: 'Farm in harmony with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-agro-quiz', passingScore: 80, questions: [{ id: 'ragroq1', question: { ELEMENTARY: 'What does agroecology copy?', MIDDLE_SCHOOL: 'How does nature control pests?', HIGH_SCHOOL: 'What is co-creation of knowledge?', UNDERGRADUATE: 'How is agroecology different from organic?', GRADUATE: 'What is food sovereignty?', PHD: 'What is political ecology?' }, options: { ELEMENTARY: ['How nature works', 'Factories', 'Machines', 'Nothing'], MIDDLE_SCHOOL: ['Predators eat pests', 'Chemicals', 'Magic', 'Fences'], HIGH_SCHOOL: ['Farmers and scientists learning together', 'Scientists alone', 'No knowledge', 'Books only'], UNDERGRADUATE: ['Includes social justice and farmer autonomy', 'Same thing', 'Less strict', 'Only organic'], GRADUATE: ['Peoples right to define their food system', 'Food stamps', 'Government control', 'Corporate food'], PHD: ['Study of power in human-environment relations', 'Only politics', 'Only ecology', 'No power'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Agroecology copies how nature works, with many plants and animals helping each other!', MIDDLE_SCHOOL: 'Nature controls pests by having predators like ladybugs eat harmful insects.', HIGH_SCHOOL: 'Co-creation means farmers and scientists work together as equals to create knowledge.', UNDERGRADUATE: 'Agroecology goes beyond organic certification to include social justice and farmer autonomy.', GRADUATE: 'Food sovereignty is peoples right to healthy, culturally appropriate food and to define their food systems.', PHD: 'Political ecology examines how power relations shape human-environment interactions in food systems.' } }] },
    externalResources: [{ title: 'Agroecology', url: 'https://www.fao.org/agroecology/home/en/', type: 'research' }]
  },
  {
    id: 'ra-networks',
    slug: 'farmer-networks',
    title: 'Farmer Networks and Knowledge Sharing',
    description: {
      ELEMENTARY: 'Learn how farmers help each other learn and solve problems together!',
      MIDDLE_SCHOOL: 'Discover how farmers share knowledge and support each other.',
      HIGH_SCHOOL: 'Explore farmer networks, peer learning, and knowledge exchange.',
      UNDERGRADUATE: 'Analyze extension models, farmer-to-farmer learning, and innovation systems.',
      GRADUATE: 'Examine network theory, social capital, and participatory research approaches.',
      PHD: 'Research knowledge system transformation, scaling mechanisms, and network dynamics.'
    },
    topic: 'regenerative-agriculture',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-net-1', title: 'Farmers Helping Farmers', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Learning from Each Other!</h2><p>Farmers are great teachers! They share what works on their farms to help other farmers succeed.</p>', MIDDLE_SCHOOL: '<h2>Farmer Networks</h2><p>Farmers learn best from other farmers. Networks, field days, and mentor programs spread successful practices.</p>', HIGH_SCHOOL: '<h2>Peer Learning</h2><p>Farmer-to-farmer learning is often more effective than traditional extension because farmers trust experienced peers.</p>', UNDERGRADUATE: '<h2>Innovation Systems</h2><p>Agricultural innovation involves farmers, researchers, advisors, and markets interacting and learning together.</p>', GRADUATE: '<h2>Social Capital</h2><p>Networks build trust and social capital that enables collective action and risk-taking on new practices.</p>', PHD: '<h2>Research Frontiers</h2><p>Network analysis, diffusion of innovations, and designing effective knowledge sharing systems.</p>' } }],
    activities: [{ id: 'ra-net-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Farm Friends!', MIDDLE_SCHOOL: 'Field Day', HIGH_SCHOOL: 'Network Building', UNDERGRADUATE: 'System Mapping', GRADUATE: 'Social Capital', PHD: 'Network Analysis' }, description: { ELEMENTARY: 'Help farmers share their ideas!', MIDDLE_SCHOOL: 'Organize a farm field day.', HIGH_SCHOOL: 'Build a farmer network.', UNDERGRADUATE: 'Map an innovation system.', GRADUATE: 'Analyze network social capital.', PHD: 'Conduct network analysis.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-net-game', type: 'simulation', title: 'Network Builder', description: 'Connect farmers to share knowledge!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-net-quiz', passingScore: 80, questions: [{ id: 'rnetq1', question: { ELEMENTARY: 'Who can teach farmers?', MIDDLE_SCHOOL: 'What is a field day?', HIGH_SCHOOL: 'Why do farmers trust peer learning?', UNDERGRADUATE: 'What is an innovation system?', GRADUATE: 'What is social capital?', PHD: 'What is diffusion of innovations?' }, options: { ELEMENTARY: ['Other farmers', 'Only books', 'Nobody', 'Only videos'], MIDDLE_SCHOOL: ['Event where farmers share and learn', 'Working in fields', 'A holiday', 'A farming competition'], HIGH_SCHOOL: ['Peers face similar conditions and have credibility', 'They do not trust it', 'Scientists know better', 'Books are better'], UNDERGRADUATE: ['Interacting actors who create and use knowledge', 'Only research', 'Only extension', 'Only markets'], GRADUATE: ['Trust and relationships enabling collective action', 'Money only', 'Buildings', 'Equipment'], PHD: ['How innovations spread through social systems', 'Spreading seeds', 'Water movement', 'No diffusion'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Other farmers are great teachers because they know what really works on farms!', MIDDLE_SCHOOL: 'Field days are events where farmers visit other farms to see practices and share ideas.', HIGH_SCHOOL: 'Farmers trust peers who face similar conditions and have proven success with practices.', UNDERGRADUATE: 'Innovation systems include farmers, researchers, advisors, and markets learning together.', GRADUATE: 'Social capital is the trust and relationships that enable groups to work together effectively.', PHD: 'Diffusion of innovations studies how new practices spread through social networks over time.' } }] },
    externalResources: [{ title: 'Farmer Networks', url: 'https://practicalfarmers.org/', type: 'research' }]
  },
  {
    id: 'ra-testing',
    slug: 'soil-testing',
    title: 'Soil Testing and Assessment',
    description: {
      ELEMENTARY: 'Learn how farmers check if their soil is healthy and happy!',
      MIDDLE_SCHOOL: 'Discover how to test soil for nutrients and health.',
      HIGH_SCHOOL: 'Explore soil testing methods, interpretation, and management decisions.',
      UNDERGRADUATE: 'Analyze soil test methodologies, biological assessments, and precision agriculture.',
      GRADUATE: 'Examine soil health metrics, indicator selection, and adaptive management.',
      PHD: 'Research soil health measurement science, index development, and monitoring systems.'
    },
    topic: 'regenerative-agriculture',
    category: 'MONITORING',
    icon: 'TestTube',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-test-1', title: 'Checking Soil Health', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Is Your Soil Happy?</h2><p>Farmers test their soil to see if it has enough food for plants and if its full of life!</p>', MIDDLE_SCHOOL: '<h2>Soil Tests</h2><p>Testing tells you about nutrients like nitrogen and phosphorus, plus pH and organic matter.</p>', HIGH_SCHOOL: '<h2>Beyond Nutrients</h2><p>Soil health tests measure biological activity, structure, and water holding in addition to chemistry.</p>', UNDERGRADUATE: '<h2>Test Methods</h2><p>Chemical extraction, biological assays, physical measurements, and field observations.</p>', GRADUATE: '<h2>Soil Health Metrics</h2><p>Selecting meaningful indicators, interpreting results, and adapting management based on data.</p>', PHD: '<h2>Research Frontiers</h2><p>Developing better soil health tests, integrating multiple indicators, and sensor technology.</p>' } }],
    activities: [{ id: 'ra-test-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Test Your Soil!', MIDDLE_SCHOOL: 'Lab Analysis', HIGH_SCHOOL: 'Health Assessment', UNDERGRADUATE: 'Method Comparison', GRADUATE: 'Indicator Selection', PHD: 'Index Development' }, description: { ELEMENTARY: 'Check if soil is healthy!', MIDDLE_SCHOOL: 'Analyze a soil sample.', HIGH_SCHOOL: 'Conduct a full soil health assessment.', UNDERGRADUATE: 'Compare testing methodologies.', GRADUATE: 'Select soil health indicators.', PHD: 'Develop a soil health index.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-test-game', type: 'simulation', title: 'Soil Scientist', description: 'Test and improve soil health!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-test-quiz', passingScore: 80, questions: [{ id: 'rtestq1', question: { ELEMENTARY: 'Why do farmers test soil?', MIDDLE_SCHOOL: 'What does pH measure?', HIGH_SCHOOL: 'What is organic matter?', UNDERGRADUATE: 'What is a biological assay?', GRADUATE: 'What is a soil health indicator?', PHD: 'Why are soil health tests difficult?' }, options: { ELEMENTARY: ['To see if it is healthy', 'For fun', 'To make it wet', 'To paint it'], MIDDLE_SCHOOL: ['How acidic or basic soil is', 'Soil color', 'Soil weight', 'Soil temperature'], HIGH_SCHOOL: ['Decomposed plant and animal material', 'Rocks', 'Sand', 'Water'], UNDERGRADUATE: ['Test measuring biological activity', 'Chemical test only', 'Physical measurement', 'No measurement'], GRADUATE: ['Measurable property showing soil health', 'Random number', 'Guess', 'No indicators exist'], PHD: ['Spatial variability and complex interactions', 'Its easy', 'One test works', 'No challenges'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Farmers test soil to make sure it has the right nutrients and is healthy for plants!', MIDDLE_SCHOOL: 'pH measures how acidic or alkaline soil is, which affects nutrient availability.', HIGH_SCHOOL: 'Organic matter is decomposed plants and animals that feed soil life and improve structure.', UNDERGRADUATE: 'Biological assays measure the activity of soil organisms like microbes and enzymes.', GRADUATE: 'Soil health indicators are properties we can measure that tell us about overall soil function.', PHD: 'Soil varies greatly over small distances and has complex biological-chemical-physical interactions.' } }] },
    externalResources: [{ title: 'Soil Testing', url: 'https://www.nrcs.usda.gov/wps/portal/nrcs/main/soils/health/assessment/', type: 'research' }]
  },
  {
    id: 'ra-climate',
    slug: 'climate-smart-farming',
    title: 'Climate-Smart Farming',
    description: {
      ELEMENTARY: 'Learn how farmers can help fight climate change and handle weird weather!',
      MIDDLE_SCHOOL: 'Discover how farms can adapt to climate change and reduce emissions.',
      HIGH_SCHOOL: 'Explore climate-smart agriculture practices, mitigation, and adaptation.',
      UNDERGRADUATE: 'Analyze farm-level climate strategies, carbon footprints, and resilience planning.',
      GRADUATE: 'Examine climate policy for agriculture, landscape approaches, and just transitions.',
      PHD: 'Research agricultural climate modeling, mitigation potential, and transformation pathways.'
    },
    topic: 'regenerative-agriculture',
    category: 'CLIMATE',
    icon: 'CloudSun',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'ra-clim-1', title: 'Farms and Climate', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farming for the Future!</h2><p>Weather is getting weirder, but smart farmers are learning to handle droughts, floods, and heat!</p>', MIDDLE_SCHOOL: '<h2>Climate-Smart Agriculture</h2><p>CSA helps farms produce food, adapt to climate change, and reduce greenhouse gas emissions.</p>', HIGH_SCHOOL: '<h2>Triple Win</h2><p>Climate-smart practices increase productivity, build resilience to climate impacts, and sequester carbon.</p>', UNDERGRADUATE: '<h2>Farm Climate Action</h2><p>Carbon footprinting, practice adoption, and planning for climate resilience at the farm level.</p>', GRADUATE: '<h2>Policy and Scale</h2><p>Agricultural climate policy, landscape-level coordination, and ensuring just transitions.</p>', PHD: '<h2>Research Frontiers</h2><p>Modeling agricultural emissions and mitigation, climate scenarios, and transformation pathways.</p>' } }],
    activities: [{ id: 'ra-clim-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Weather Ready Farm!', MIDDLE_SCHOOL: 'Climate Practices', HIGH_SCHOOL: 'Carbon Footprint', UNDERGRADUATE: 'Resilience Plan', GRADUATE: 'Policy Analysis', PHD: 'Climate Modeling' }, description: { ELEMENTARY: 'Prepare your farm for any weather!', MIDDLE_SCHOOL: 'Choose climate-smart practices.', HIGH_SCHOOL: 'Calculate farm carbon footprint.', UNDERGRADUATE: 'Develop a farm resilience plan.', GRADUATE: 'Analyze agricultural climate policy.', PHD: 'Model agricultural climate impacts.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'ra-clim-game', type: 'simulation', title: 'Climate Champion', description: 'Build a climate-resilient farm!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'ra-clim-quiz', passingScore: 80, questions: [{ id: 'rclimq1', question: { ELEMENTARY: 'What is climate-smart farming?', MIDDLE_SCHOOL: 'What are the three CSA goals?', HIGH_SCHOOL: 'How do farms emit greenhouse gases?', UNDERGRADUATE: 'What is a carbon footprint?', GRADUATE: 'What is a just transition?', PHD: 'What is agricultural modeling?' }, options: { ELEMENTARY: ['Farming that handles climate change', 'Regular farming', 'No farming', 'Indoor only farming'], MIDDLE_SCHOOL: ['Productivity, adaptation, mitigation', 'Only more food', 'Only less emissions', 'Only resilience'], HIGH_SCHOOL: ['Livestock, fertilizer, fuel, and soil disturbance', 'No emissions', 'Only animals', 'Only tractors'], UNDERGRADUATE: ['Total greenhouse gas emissions from an activity', 'Foot size', 'Carbon paper', 'Walking measure'], GRADUATE: ['Fair transition protecting vulnerable people', 'Unjust change', 'Quick change', 'No transition'], PHD: ['Simulating agricultural systems with computers', 'Building models', 'Taking photos', 'No modeling'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Climate-smart farming helps farms succeed even as weather gets weirder due to climate change!', MIDDLE_SCHOOL: 'CSA aims to increase productivity, help farms adapt to change, and reduce emissions.', HIGH_SCHOOL: 'Farms emit GHGs from livestock digestion, fertilizer use, fuel combustion, and soil disturbance.', UNDERGRADUATE: 'A carbon footprint is the total greenhouse gas emissions caused by an activity or entity.', GRADUATE: 'Just transitions ensure vulnerable farmers and workers are supported through agricultural changes.', PHD: 'Agricultural modeling simulates crop growth, emissions, and management to project climate impacts.' } }] },
    externalResources: [{ title: 'Climate-Smart Agriculture', url: 'https://www.fao.org/climate-smart-agriculture/en/', type: 'research' }]
  }
]
