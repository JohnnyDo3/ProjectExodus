// Regenerative Agriculture Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const regenerativeAgricultureModules: Module[] = [
  // Module 1: Regenerative Principles
  {
    id: 'regen-principles',
    slug: 'regenerative-principles',
    title: 'Regenerative Agriculture Principles',
    description: {
      ELEMENTARY: 'Learn how farmers can help the Earth heal by growing food in special ways!',
      MIDDLE_SCHOOL: 'Discover farming practices that restore soil health and help fight climate change.',
      HIGH_SCHOOL: 'Understand the science behind regenerative agriculture and its environmental benefits.',
      UNDERGRADUATE: 'Analyze regenerative farming systems, soil carbon dynamics, and ecosystem services.',
      GRADUATE: 'Evaluate regenerative agriculture as climate mitigation strategy and food system transformation.',
      PHD: 'Research soil-plant-atmosphere interactions, carbon sequestration measurement, and scaling challenges.'
    },
    topic: 'regenerative-agriculture',
    category: 'FUNDAMENTALS',
    icon: 'Sprout',
    color: 'terra',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'regen-lesson-1',
        title: 'What is Regenerative Agriculture?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌱 Farming That Heals the Earth!</h2><div class="intro-box"><p>Regular farming can sometimes hurt the soil. But <strong>regenerative farming</strong> actually makes the soil better and healthier!</p></div><h3>The Magic of Healthy Soil</h3><p>Healthy soil is alive! It's full of tiny creatures like:</p><div class="creature-cards"><div class="card"><span>🐛</span><p>Earthworms</p></div><div class="card"><span>🦠</span><p>Tiny bacteria</p></div><div class="card"><span>🍄</span><p>Fungi</p></div></div><div class="fun-fact"><p>One teaspoon of healthy soil has more living things than there are people on Earth!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Regenerative Agriculture</h2><h3>Core Principles</h3><ol><li><strong>Minimize soil disturbance:</strong> Less tilling means healthier soil</li><li><strong>Keep soil covered:</strong> Mulch and cover crops protect soil</li><li><strong>Maintain living roots:</strong> Plants feed soil life year-round</li><li><strong>Maximize diversity:</strong> Many plant types support ecosystem health</li><li><strong>Integrate animals:</strong> Grazing mimics natural systems</li></ol><h3>Why It Matters</h3><p>Regenerative practices can rebuild topsoil, increase biodiversity, and capture carbon from the atmosphere.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>The Science of Regeneration</h2><h3>Soil Carbon Cycle</h3><p>Plants capture CO₂ through photosynthesis and transfer carbon to soil through root exudates and decomposition. Healthy soils can store 2-3x more carbon than the atmosphere.</p><h3>Soil Food Web</h3><ul><li><strong>Primary producers:</strong> Plants, algae</li><li><strong>Primary decomposers:</strong> Bacteria, fungi</li><li><strong>Secondary consumers:</strong> Protozoa, nematodes</li><li><strong>Higher predators:</strong> Arthropods, earthworms</li></ul><h3>Ecosystem Services</h3><ul><li>Carbon sequestration: 0.4-1.2 tons C/ha/year</li><li>Water infiltration: 10-100x improvement</li><li>Reduced erosion: Up to 90% reduction</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Regenerative Systems Analysis</h2><h3>Soil Organic Matter Dynamics</h3><p>SOM consists of living biomass (5%), fresh residues (10%), and humus (85%). Regenerative practices target all three pools:</p><ul><li>Particulate organic matter (fast cycling)</li><li>Mineral-associated organic matter (stable)</li><li>Pyrogenic carbon (very stable)</li></ul><h3>Carbon Sequestration Potential</h3><p>Meta-analyses suggest 0.4-1.2 Mg C/ha/year with large variability based on climate, soil type, and management intensity.</p><h3>Economic Considerations</h3><ul><li>Transition costs and timeline (3-5 years)</li><li>Yield impacts during transition</li><li>Premium market access</li><li>Ecosystem service payments</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Regenerative Agriculture in Climate Strategy</h2><h3>Mitigation Potential</h3><p>Global technical potential: 2-5 Gt CO₂e/year, but economic and adoption constraints reduce realizable potential significantly.</p><h3>Additionality and Permanence</h3><ul><li>Baseline definition challenges</li><li>Reversal risk with land use change</li><li>Saturation of soil carbon stocks</li><li>MRV (Measurement, Reporting, Verification) costs</li></ul><h3>Policy Landscape</h3><ul><li>USDA Climate-Smart Commodities</li><li>EU Carbon Farming Initiative</li><li>Voluntary carbon markets</li><li>Conservation program integration</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers in Regenerative Agriculture</h2><h3>Measurement Challenges</h3><ul><li>Spatial heterogeneity of soil carbon</li><li>Detection of change vs. natural variability</li><li>Cost-effective MRV approaches</li><li>Remote sensing and modeling integration</li></ul><h3>Mechanistic Understanding</h3><ul><li>Root exudate-microbiome interactions</li><li>Mycorrhizal carbon transfer pathways</li><li>Aggregate formation and protection</li><li>Priming effects and SOM persistence</li></ul><h3>Scaling Questions</h3><ul><li>Knowledge transfer and extension</li><li>Financial mechanism design</li><li>Supply chain transformation</li><li>Just transition considerations</li></ul></div>`
        }
      },
      {
        id: 'regen-lesson-2',
        title: 'Building Healthy Soil',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏗️ Building Super Soil!</h2><h3>Ingredients for Amazing Soil</h3><div class="ingredients"><div class="item"><span>🪨</span><p>Minerals from rocks</p></div><div class="item"><span>🍂</span><p>Dead leaves and plants</p></div><div class="item"><span>💧</span><p>Water</p></div><div class="item"><span>🌬️</span><p>Air</p></div><div class="item"><span>🐛</span><p>Living creatures</p></div></div><h3>The Soil Recipe</h3><p>Mix together with time and you get rich, dark, healthy soil that grows amazing plants!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Soil Health Practices</h2><h3>Cover Crops</h3><p>Plants grown between main crops to protect and feed the soil. Examples: clover, rye, vetch.</p><h3>No-Till Farming</h3><p>Planting without plowing preserves soil structure and life.</p><h3>Composting</h3><p>Adding organic matter returns nutrients and builds soil carbon.</p><h3>Crop Rotation</h3><p>Changing crops each season prevents pest buildup and balances soil nutrients.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Soil Biology and Structure</h2><h3>Soil Aggregation</h3><p>Soil particles bind together into aggregates through:</p><ul><li>Fungal hyphae (physical binding)</li><li>Bacterial polysaccharides (glue)</li><li>Root exudates (carbon source)</li><li>Earthworm activity (mixing)</li></ul><h3>Benefits of Good Structure</h3><ul><li>Water infiltration and retention</li><li>Aeration for roots and microbes</li><li>Erosion resistance</li><li>Carbon protection in aggregates</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Soil Biological Engineering</h2><h3>Rhizosphere Interactions</h3><p>Root exudates (sugars, organic acids, amino acids) fuel microbial activity, with plants allocating 20-40% of photosynthate belowground.</p><h3>Mycorrhizal Networks</h3><p>Arbuscular mycorrhizal fungi extend root surface area 100x, improving nutrient uptake and carbon transfer to soil.</p><h3>Management for Biology</h3><ul><li>Diverse rotations for diverse microbiomes</li><li>Reduced chemical inputs</li><li>Living roots as long as possible</li><li>Organic matter additions</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Soil Science</h2><h3>Carbon Stabilization Mechanisms</h3><ul><li>Physical protection in aggregates</li><li>Chemical bonding to minerals (MAOM)</li><li>Biochemical recalcitrance</li></ul><h3>Priming Effects</h3><p>Fresh carbon inputs can stimulate decomposition of existing SOM (positive priming) or suppress it (negative priming).</p><h3>Soil Health Assessment</h3><ul><li>Physical: Aggregate stability, infiltration, compaction</li><li>Chemical: pH, nutrients, CEC, SOM</li><li>Biological: Respiration, enzyme activity, microbial biomass</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Soil Carbon Research</h2><h3>Measurement Methods</h3><ul><li>Direct sampling and analysis (dry combustion)</li><li>Spectroscopic methods (FTIR, NMR)</li><li>Remote sensing (hyperspectral)</li><li>Eddy covariance flux towers</li></ul><h3>Modeling Approaches</h3><ul><li>Process-based models (Century, RothC)</li><li>Machine learning predictions</li><li>Digital soil mapping</li></ul><h3>Emerging Questions</h3><ul><li>Deep soil carbon dynamics</li><li>Microbial carbon use efficiency</li><li>Climate feedbacks from soil C</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'regen-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Build a Healthy Soil!',
          MIDDLE_SCHOOL: 'Match Practices to Benefits',
          HIGH_SCHOOL: 'Soil Food Web Connections',
          UNDERGRADUATE: 'Carbon Flow Diagram',
          GRADUATE: 'Management System Design',
          PHD: 'MRV Protocol Design'
        },
        description: {
          ELEMENTARY: 'Drag ingredients to make healthy soil!',
          MIDDLE_SCHOOL: 'Connect regenerative practices with their benefits.',
          HIGH_SCHOOL: 'Build the soil food web by connecting organisms.',
          UNDERGRADUATE: 'Map carbon flows through the agricultural system.',
          GRADUATE: 'Design a regenerative management system.',
          PHD: 'Design a measurement and verification protocol.'
        },
        config: {
          ELEMENTARY: { items: 5, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 20, hints: false, timeLimit: 90 },
          PHD: { items: 25, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'regen-game',
      type: 'matching',
      title: 'Regenerative Farming Challenge',
      description: 'Match practices, benefits, and soil organisms!',
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
      id: 'regen-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'rgq1',
          question: {
            ELEMENTARY: 'What makes soil healthy?',
            MIDDLE_SCHOOL: 'What is a core principle of regenerative agriculture?',
            HIGH_SCHOOL: 'How much carbon can regenerative practices sequester annually?',
            UNDERGRADUATE: 'What percentage of photosynthate do plants typically allocate belowground?',
            GRADUATE: 'What is the primary challenge for soil carbon credits?',
            PHD: 'What stabilization mechanism provides the most persistent soil carbon storage?'
          },
          options: {
            ELEMENTARY: ['Living things like worms and bacteria', 'Lots of rocks', 'Plastic pieces', 'Only water'],
            MIDDLE_SCHOOL: ['Minimize soil disturbance', 'Plow as much as possible', 'Remove all plants', 'Use only chemicals'],
            HIGH_SCHOOL: ['0.4-1.2 tons C/ha/year', '10-20 tons C/ha/year', '0.01 tons C/ha/year', '100 tons C/ha/year'],
            UNDERGRADUATE: ['20-40%', '1-5%', '80-90%', '50-60%'],
            GRADUATE: ['Permanence and reversal risk', 'Too much carbon stored', 'Practices too easy', 'No interest from farmers'],
            PHD: ['Mineral-associated organic matter (MAOM)', 'Particulate organic matter', 'Fresh residues', 'Dissolved organic carbon']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Healthy soil is full of living things that help plants grow!',
            MIDDLE_SCHOOL: 'Minimizing disturbance protects soil structure and the organisms living in it.',
            HIGH_SCHOOL: 'Research shows regenerative practices can sequester 0.4-1.2 tons of carbon per hectare per year.',
            UNDERGRADUATE: 'Plants allocate 20-40% of photosynthate belowground through root exudates and turnover.',
            GRADUATE: 'Carbon stored in soil can be released if management changes, creating permanence risk.',
            PHD: 'MAOM (carbon bonded to mineral surfaces) provides the most stable, long-term storage.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Rodale Institute', url: 'https://rodaleinstitute.org/', type: 'research' },
      { title: 'Regeneration International', url: 'https://regenerationinternational.org/', type: 'article' }
    ]
  },
  // Module 2: Soil Health & Microbiome
  {
    id: 'regen-soil-health',
    slug: 'soil-health-microbiome',
    title: 'Soil Health & Microbiome',
    description: {
      ELEMENTARY: 'Meet the tiny creatures that live underground and help plants grow!',
      MIDDLE_SCHOOL: 'Explore the invisible world of soil bacteria, fungi, and other organisms.',
      HIGH_SCHOOL: 'Understand soil biology, the rhizosphere, and plant-microbe interactions.',
      UNDERGRADUATE: 'Analyze soil microbiome composition, function, and management implications.',
      GRADUATE: 'Evaluate microbiome engineering approaches and soil biological indicators.',
      PHD: 'Research metagenomics, functional ecology, and synthetic community approaches.'
    },
    topic: 'regenerative-agriculture',
    category: 'SOIL BIOLOGY',
    icon: 'Bug',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'soil-health-1',
        title: 'The Underground World',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'PUZZLE',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🔬 Tiny Helpers Underground!</h2><p>Under our feet is a whole world of tiny creatures we can't see!</p><h3>Meet the Soil Team</h3><div class="creature-profiles"><div class="profile"><span>🦠</span><h4>Bacteria</h4><p>Super tiny! Break down dead stuff into plant food</p></div><div class="profile"><span>🍄</span><h4>Fungi</h4><p>Make underground highways that share food between plants</p></div><div class="profile"><span>🐛</span><h4>Worms</h4><p>Mix and aerate the soil, make tunnels for water</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Soil Organisms and Their Roles</h2><h3>Bacteria</h3><p>Most numerous - billions per gram of soil. Decompose organic matter, cycle nutrients, some fix nitrogen.</p><h3>Fungi</h3><p>Form networks through soil. Mycorrhizae partner with plant roots. Decompose tough materials like lignin.</p><h3>Protozoa</h3><p>Single-celled organisms that eat bacteria, releasing nutrients in plant-available forms.</p><h3>Nematodes</h3><p>Microscopic worms - some beneficial (eat pests), some problematic (attack roots).</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Rhizosphere Biology</h2><h3>The Rhizosphere Effect</h3><p>The zone around roots has 10-1000x more microbial activity than bulk soil due to root exudates.</p><h3>Plant-Microbe Signaling</h3><ul><li>Plants release compounds that attract beneficial microbes</li><li>Microbes produce hormones affecting plant growth</li><li>Chemical communication establishes symbioses</li></ul><h3>Mycorrhizal Symbiosis</h3><p>~80% of plant species form mycorrhizal associations, trading carbon for phosphorus and other nutrients.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Soil Microbiome Analysis</h2><h3>Methods</h3><ul><li>16S rRNA sequencing (bacteria/archaea)</li><li>ITS sequencing (fungi)</li><li>Metagenomics (whole community function)</li><li>Metatranscriptomics (active functions)</li></ul><h3>Functional Groups</h3><ul><li>Decomposers (carbon cycling)</li><li>Nitrogen cyclers (N-fixers, nitrifiers, denitrifiers)</li><li>Plant growth promoters (PGPR)</li><li>Disease suppressors</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Microbiome Management</h2><h3>Indicators of Soil Health</h3><ul><li>Microbial biomass carbon</li><li>Fungal:bacterial ratios</li><li>Enzyme activities</li><li>Microbial diversity indices</li></ul><h3>Management Impacts</h3><p>Tillage, fertilizers, pesticides, and crop diversity all shape microbiome composition and function.</p><h3>Biocontrol and Biofertilization</h3><p>Harnessing beneficial microbes for pest suppression and nutrient provision.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Microbiome Research Frontiers</h2><h3>Synthetic Communities</h3><p>Designing simplified microbial communities to study interactions and functions.</p><h3>Functional Metagenomics</h3><p>Linking genes to functions across complex communities.</p><h3>Microbiome Engineering</h3><ul><li>Soil probiotics and inoculants</li><li>Phage therapy for pathogens</li><li>CRISPR-based approaches</li></ul><h3>Open Questions</h3><ul><li>Predictability of microbiome responses</li><li>Persistence of introduced organisms</li><li>Scaling from lab to field</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'soil-health-activity-1',
        type: 'PUZZLE',
        title: {
          ELEMENTARY: 'Build the Soil Food Web!',
          MIDDLE_SCHOOL: 'Who Eats Whom?',
          HIGH_SCHOOL: 'Rhizosphere Interactions',
          UNDERGRADUATE: 'Microbiome Analysis',
          GRADUATE: 'Health Indicator Dashboard',
          PHD: 'Functional Gene Mapping'
        },
        description: {
          ELEMENTARY: 'Connect soil creatures in a food web puzzle!',
          MIDDLE_SCHOOL: 'Build the soil food web by connecting who eats whom.',
          HIGH_SCHOOL: 'Map interactions between roots and microbes.',
          UNDERGRADUATE: 'Analyze microbiome data and interpret diversity metrics.',
          GRADUATE: 'Build a soil health indicator dashboard.',
          PHD: 'Map functional genes to ecosystem processes.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', pieces: 8 },
          MIDDLE_SCHOOL: { complexity: 'simple', pieces: 12 },
          HIGH_SCHOOL: { complexity: 'intermediate', pieces: 16 },
          UNDERGRADUATE: { complexity: 'advanced', pieces: 20 },
          GRADUATE: { complexity: 'expert', pieces: 25 },
          PHD: { complexity: 'research', pieces: 30 }
        }
      }
    ],
    game: {
      id: 'soil-health-game',
      type: 'matching',
      title: 'Microbe Match',
      description: 'Match organisms with their functions!',
      rounds: 5,
      timeLimit: 25,
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
      id: 'soil-health-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'shq1',
          question: {
            ELEMENTARY: 'Which soil creature makes tunnels for water?',
            MIDDLE_SCHOOL: 'What do mycorrhizal fungi do for plants?',
            HIGH_SCHOOL: 'What percentage of plant species form mycorrhizal associations?',
            UNDERGRADUATE: 'What sequencing method targets bacterial diversity?',
            GRADUATE: 'What does a high fungal:bacterial ratio typically indicate?',
            PHD: 'What is the primary challenge in soil microbiome engineering?'
          },
          options: {
            ELEMENTARY: ['Earthworms', 'Bacteria', 'Seeds', 'Rocks'],
            MIDDLE_SCHOOL: ['Help them get nutrients', 'Eat their roots', 'Block water', 'Nothing'],
            HIGH_SCHOOL: ['About 80%', 'About 10%', 'About 50%', 'About 1%'],
            UNDERGRADUATE: ['16S rRNA sequencing', 'ITS sequencing', 'Whole genome sequencing', 'RNA-seq'],
            GRADUATE: ['Less disturbed, more fungal-dominated system', 'Degraded soil', 'Very wet conditions', 'High nitrogen'],
            PHD: ['Persistence and establishment in field conditions', 'Finding beneficial organisms', 'Lab cultivation', 'Cost of sequencing']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Earthworms dig tunnels that help water soak into the soil!',
            MIDDLE_SCHOOL: 'Mycorrhizal fungi extend root reach and help plants absorb nutrients, especially phosphorus.',
            HIGH_SCHOOL: 'About 80% of all plant species form mycorrhizal associations.',
            UNDERGRADUATE: '16S rRNA gene sequencing is the standard for bacterial/archaeal community profiling.',
            GRADUATE: 'Fungal-dominated soils typically indicate less disturbance and more perennial/woody vegetation.',
            PHD: 'Introduced organisms often fail to persist in complex field communities.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Soil Health Institute', url: 'https://soilhealthinstitute.org/', type: 'research' }
    ]
  },
  // MASTERCLASS: Complete Regenerative Farm Design
  {
    id: 'regen-masterclass',
    slug: 'regenerative-farm-masterclass',
    title: 'Regenerative Farm Design Masterclass',
    description: {
      ELEMENTARY: 'Design your own dream farm that helps nature!',
      MIDDLE_SCHOOL: 'Learn to plan a farm that grows food while healing the land.',
      HIGH_SCHOOL: 'Comprehensive study of regenerative farm system design and management.',
      UNDERGRADUATE: 'Advanced whole-farm planning integrating crops, livestock, and ecosystems.',
      GRADUATE: 'Expert-level farm system optimization, economics, and transition planning.',
      PHD: 'Research synthesis of regenerative systems, landscape ecology, and transformation pathways.'
    },
    topic: 'regenerative-agriculture',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'terra',
    duration: { ELEMENTARY: 45, MIDDLE_SCHOOL: 60, HIGH_SCHOOL: 90, UNDERGRADUATE: 120, GRADUATE: 150, PHD: 180 },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-regen-1',
        title: 'Whole Farm Systems',
        order: 1,
        duration: 25,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌾 Planning Your Dream Farm!</h2><p>A regenerative farm has many parts working together like a team!</p><h3>Farm Parts</h3><div class="farm-parts"><div class="part"><span>🌽</span><p>Crops</p></div><div class="part"><span>🐄</span><p>Animals</p></div><div class="part"><span>🌳</span><p>Trees</p></div><div class="part"><span>💧</span><p>Water</p></div><div class="part"><span>🏠</span><p>Buildings</p></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Integrated Farm Design</h2><h3>Key Elements</h3><ul><li><strong>Diverse crops:</strong> Rotations and polycultures</li><li><strong>Livestock integration:</strong> Grazing in crop rotations</li><li><strong>Perennial systems:</strong> Orchards, silvopasture, alley cropping</li><li><strong>Water management:</strong> Ponds, swales, irrigation</li><li><strong>Habitat areas:</strong> Hedgerows, wetlands, wildlife corridors</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Farm System Design Principles</h2><h3>Permaculture Zones</h3><p>Organizing the farm by frequency of use and management intensity.</p><h3>Keyline Design</h3><p>Water management following landscape contours for optimal distribution.</p><h3>Enterprise Stacking</h3><p>Multiple products from the same land area (e.g., silvopasture = trees + livestock + understory).</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Whole-Farm Planning</h2><h3>Assessment Phase</h3><ul><li>Resource inventory (soil, water, climate)</li><li>Market analysis</li><li>Infrastructure evaluation</li><li>Ecological baseline</li></ul><h3>Design Phase</h3><ul><li>Enterprise selection and integration</li><li>Spatial layout optimization</li><li>Temporal sequencing (rotations, transitions)</li><li>Financial modeling</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Advanced Farm System Optimization</h2><h3>Multi-Objective Optimization</h3><p>Balancing productivity, profitability, and ecosystem services.</p><h3>Transition Economics</h3><ul><li>Transition cost modeling</li><li>Risk management strategies</li><li>Diversified revenue streams</li><li>Ecosystem service payments</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Regenerative Systems Research</h2><h3>Landscape-Scale Integration</h3><p>Coordinating practices across farms and watersheds.</p><h3>Transformation Pathways</h3><ul><li>Socio-technical transition frameworks</li><li>Innovation system approaches</li><li>Policy and market co-evolution</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-regen-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Build Your Farm!',
          MIDDLE_SCHOOL: 'Farm Planner',
          HIGH_SCHOOL: 'Rotation Designer',
          UNDERGRADUATE: 'Whole-Farm Optimizer',
          GRADUATE: 'Transition Simulator',
          PHD: 'Landscape Modeler'
        },
        description: {
          ELEMENTARY: 'Place animals, crops, and trees on your farm!',
          MIDDLE_SCHOOL: 'Design a balanced farm with multiple elements.',
          HIGH_SCHOOL: 'Create a multi-year crop rotation plan.',
          UNDERGRADUATE: 'Optimize a whole-farm system for multiple goals.',
          GRADUATE: 'Simulate a transition from conventional to regenerative.',
          PHD: 'Model landscape-scale regenerative transformation.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 8 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 20 },
          GRADUATE: { complexity: 'expert', variables: 30 },
          PHD: { complexity: 'research', variables: 45 }
        }
      }
    ],
    game: {
      id: 'master-regen-game',
      type: 'timed_challenge',
      title: 'Farm Design Master Challenge',
      description: 'Test your regenerative farming knowledge!',
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
      id: 'master-regen-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mrgq1',
          question: {
            ELEMENTARY: 'What animals can help on a regenerative farm?',
            MIDDLE_SCHOOL: 'What is silvopasture?',
            HIGH_SCHOOL: 'What is keyline design used for?',
            UNDERGRADUATE: 'What is enterprise stacking?',
            GRADUATE: 'What is the primary financial challenge in regenerative transition?',
            PHD: 'What framework best describes food system transformation?'
          },
          options: {
            ELEMENTARY: ['Cows, chickens, and sheep', 'Only robots', 'No animals', 'Just fish'],
            MIDDLE_SCHOOL: ['Trees with grazing animals', 'Only silver-colored pastures', 'Indoor farming', 'Concrete pastures'],
            HIGH_SCHOOL: ['Water management following contours', 'Drawing keys on land', 'Making straight lines', 'Removing trees'],
            UNDERGRADUATE: ['Multiple enterprises on same land', 'Stacking hay bales', 'Single crop focus', 'Vertical farming'],
            GRADUATE: ['Cash flow during transition period', 'Too much profit', 'No market demand', 'Excessive labor availability'],
            PHD: ['Socio-technical transitions', 'Simple technology adoption', 'Market forces alone', 'Top-down policy']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Many animals like cows, chickens, and sheep can help by eating weeds and fertilizing soil!',
            MIDDLE_SCHOOL: 'Silvopasture combines trees with livestock grazing for multiple benefits.',
            HIGH_SCHOOL: 'Keyline design manages water by following the natural contours of the landscape.',
            UNDERGRADUATE: 'Enterprise stacking generates multiple revenue streams from the same land area.',
            GRADUATE: 'The transition period typically involves reduced yields before regenerative benefits emerge.',
            PHD: 'Socio-technical transitions capture the co-evolution of technology, practices, and institutions.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Savory Institute', url: 'https://savory.global/', type: 'research' },
      { title: 'NRCS Conservation Practice Standards', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/conservation-practice-standards', type: 'tool' }
    ]
  }
]
