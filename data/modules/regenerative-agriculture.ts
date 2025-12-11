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
  }
]
