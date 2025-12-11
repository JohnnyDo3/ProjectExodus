// Food Sovereignty Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const foodSovereigntyModules: Module[] = [
  // Module 1: Introduction to Food Sovereignty
  {
    id: 'food-sov-intro',
    slug: 'introduction-to-food-sovereignty',
    title: 'Introduction to Food Sovereignty',
    description: {
      ELEMENTARY: 'Learn how communities grow their own food and why it matters!',
      MIDDLE_SCHOOL: 'Discover how communities take control of their food systems and why food independence is important.',
      HIGH_SCHOOL: 'Explore the concept of food sovereignty and how communities worldwide are reclaiming control over their food systems.',
      UNDERGRADUATE: 'Analyze the political, economic, and social dimensions of food sovereignty movements globally.',
      GRADUATE: 'Critically examine food sovereignty as a framework for agrarian reform and alternatives to industrial food systems.',
      PHD: 'Investigate the theoretical foundations and policy implications of food sovereignty within global governance structures.'
    },
    topic: 'food-sovereignty',
    category: 'FOUNDATIONS',
    icon: 'Sprout',
    color: 'moss',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-intro-1',
        title: 'What is Food Sovereignty?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌽 Food Sovereignty: Communities Growing Together!</h2><p>Have you ever grown a tomato or helped in a garden? When communities grow their own food, something magical happens!</p><h3>What is Food Sovereignty?</h3><p><strong>Food sovereignty</strong> means communities get to decide what food they grow and eat.</p><h3>Why Does It Matter?</h3><ul><li>🥕 Fresh vegetables taste better!</li><li>🤝 Neighbors help each other</li><li>🌍 It's good for the Earth</li><li>💪 Communities become stronger</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Understanding Food Sovereignty</h2><p>Food sovereignty is the right of peoples to healthy and culturally appropriate food produced through ecologically sound methods.</p><h3>The Seven Pillars</h3><ol><li><strong>Food for People</strong> - Food is a basic human right</li><li><strong>Values Food Providers</strong> - Respects farmers and food workers</li><li><strong>Localizes Food Systems</strong> - Keeps food production close to consumers</li><li><strong>Local Control</strong> - Communities make their own decisions</li><li><strong>Builds Knowledge</strong> - Passes down farming traditions</li><li><strong>Works with Nature</strong> - Uses sustainable practices</li><li><strong>Food is Sacred</strong> - Rejects treating food as just a commodity</li></ol></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Food Sovereignty: A Global Movement</h2><p>Food sovereignty emerged in 1996 when La Vía Campesina introduced it at the World Food Summit as an alternative to the dominant neoliberal food system.</p><h3>Food Sovereignty vs. Food Security</h3><table><tr><th>Food Security</th><th>Food Sovereignty</th></tr><tr><td>Access to sufficient food</td><td>Control over food systems</td></tr><tr><td>Can rely on imports</td><td>Prioritizes local production</td></tr><tr><td>Quantity-focused</td><td>Quality and culture-focused</td></tr></table></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Theoretical Foundations</h2><p>Food sovereignty represents a paradigm shift from market-oriented food security to a rights-based approach centering producer and consumer agency.</p><h3>Conceptual Framework</h3><ul><li><strong>Market Fundamentalism:</strong> Questions whether free markets efficiently allocate food resources</li><li><strong>Comparative Advantage:</strong> Critiques specialization over diverse food production</li><li><strong>Technological Determinism:</strong> Challenges industrial technology as the only path</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Critical Analysis of Food Sovereignty</h2><h3>Epistemological Foundations</h3><ul><li><strong>Indigenous Knowledge Systems:</strong> Recognizing traditional ecological knowledge</li><li><strong>Feminist Political Ecology:</strong> Analyzing gendered dimensions of food production</li><li><strong>Decolonial Theory:</strong> Interrogating colonial legacies in food regimes</li></ul><h3>The Scale Question</h3><p>Central tensions concern how local food movements interface with global capital flows and transnational governance.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Ontological Politics and Counter-Hegemonic Praxis</h2><h3>Theoretical Interventions</h3><p>Drawing on Latour's actor-network theory and Haraway's naturecultures, we analyze how food sovereignty movements perform alternative ontologies.</p><h3>Gramscian Analysis</h3><p>Food sovereignty as counter-hegemonic project challenging neoliberal food governance "common sense."</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-intro-act-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Map Your Food Journey!',
          MIDDLE_SCHOOL: 'Sort Local vs Global Foods',
          HIGH_SCHOOL: 'Analyze Food Systems',
          UNDERGRADUATE: 'Policy Framework Analysis',
          GRADUATE: 'Case Study Comparison',
          PHD: 'Theoretical Framework Mapping'
        },
        description: {
          ELEMENTARY: 'Trace where your food comes from and find local alternatives!',
          MIDDLE_SCHOOL: 'Categorize foods by their origin and production method.',
          HIGH_SCHOOL: 'Compare industrial and sovereign food system characteristics.',
          UNDERGRADUATE: 'Analyze policies supporting or hindering food sovereignty.',
          GRADUATE: 'Compare food sovereignty implementations across regions.',
          PHD: 'Map theoretical frameworks to empirical case studies.'
        },
        config: {
          ELEMENTARY: { items: 8, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 10, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 },
          GRADUATE: { items: 18, hints: false, timeLimit: 90 },
          PHD: { items: 22, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'fs-intro-game',
      type: 'simulation',
      title: 'Food Sovereignty Builder',
      description: 'Build a food sovereign community by making strategic decisions!',
      rounds: 5,
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
      id: 'fs-intro-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fsq1',
          question: {
            ELEMENTARY: 'What does food sovereignty mean?',
            MIDDLE_SCHOOL: 'Which is a pillar of food sovereignty?',
            HIGH_SCHOOL: 'When was food sovereignty first introduced internationally?',
            UNDERGRADUATE: 'What does food sovereignty critique about comparative advantage?',
            GRADUATE: 'Which theoretical framework emphasizes gendered food production?',
            PHD: 'What Gramscian concept applies to food sovereignty movements?'
          },
          options: {
            ELEMENTARY: ['Communities decide what food to grow', 'Buying food from far away', 'Only eating fast food', 'Not growing any food'],
            MIDDLE_SCHOOL: ['Localizes Food Systems', 'Import Everything', 'Ignore Farmers', 'Only Profit Matters'],
            HIGH_SCHOOL: ['1996 at World Food Summit', '1776', '2020', '1850'],
            UNDERGRADUATE: ['Push for specialization over diversity', 'Support for local markets', 'Protection of small farms', 'Food quality standards'],
            GRADUATE: ['Feminist Political Ecology', 'Classical Economics', 'Rational Choice Theory', 'Behaviorism'],
            PHD: ['Counter-hegemony', 'Laissez-faire', 'Mercantilism', 'Monetarism']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Food sovereignty means communities get to decide what food they grow and eat!',
            MIDDLE_SCHOOL: 'Localizing food systems keeps food production close to where people live.',
            HIGH_SCHOOL: 'La Vía Campesina introduced food sovereignty at the 1996 World Food Summit.',
            UNDERGRADUATE: 'Food sovereignty critiques the push for countries to specialize rather than maintain diverse food production.',
            GRADUATE: 'Feminist Political Ecology analyzes the gendered dimensions of food production.',
            PHD: 'Gramscian counter-hegemony describes how movements challenge dominant ideologies.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'La Via Campesina', url: 'https://viacampesina.org/', type: 'research' },
      { title: 'Food Sovereignty Alliance', url: 'https://usfoodsovereigntyalliance.org/', type: 'article' }
    ]
  },
  // Module 2: Community Gardens
  {
    id: 'food-sov-community-gardens',
    slug: 'community-gardens',
    title: 'Community Gardens',
    description: {
      ELEMENTARY: 'Discover the magic of gardens where neighbors grow food together!',
      MIDDLE_SCHOOL: 'Learn how community gardens bring people together and provide fresh food.',
      HIGH_SCHOOL: 'Explore the social, environmental, and health benefits of community gardening.',
      UNDERGRADUATE: 'Analyze community garden models, governance, and urban food security impacts.',
      GRADUATE: 'Examine community gardens as sites of food justice and urban transformation.',
      PHD: 'Research community garden effectiveness, scaling challenges, and policy integration.'
    },
    topic: 'food-sovereignty',
    category: 'URBAN AGRICULTURE',
    icon: 'Users',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-garden-1',
        title: 'Growing Together',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌻 Gardens for Everyone!</h2><p>A community garden is a special place where neighbors share land to grow vegetables, fruits, and flowers together!</p><h3>What Happens in Community Gardens?</h3><ul><li>🥬 People grow their own vegetables</li><li>👨‍👩‍👧‍👦 Families work together</li><li>🐝 Bees and butterflies visit</li><li>🤝 Neighbors become friends</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Community Garden Benefits</h2><h3>For People</h3><ul><li>Fresh, healthy food access</li><li>Physical activity and exercise</li><li>Mental health and stress relief</li><li>Social connections</li></ul><h3>For the Environment</h3><ul><li>Green spaces in cities</li><li>Habitat for pollinators</li><li>Reduced food transportation</li><li>Composting and recycling</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Community Garden Models</h2><h3>Types of Gardens</h3><ul><li><strong>Allotment:</strong> Individual plots for families</li><li><strong>Collective:</strong> Shared cultivation and harvest</li><li><strong>School:</strong> Educational focus for students</li><li><strong>Therapeutic:</strong> Healing and rehabilitation</li></ul><h3>Challenges</h3><p>Land tenure, water access, volunteer management, and equitable access.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Urban Food Security</h2><h3>Community Gardens and Food Access</h3><p>Research shows community gardens can significantly improve household food security, particularly in food deserts.</p><h3>Governance Models</h3><ul><li>Non-profit management</li><li>Municipal programs</li><li>Land trust models</li><li>Cooperative structures</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Food Justice in Urban Spaces</h2><h3>Critical Perspectives</h3><p>Community gardens can either reinforce or challenge existing inequalities depending on access, governance, and integration with broader movements.</p><h3>Gentrification Concerns</h3><p>Green amenities can increase property values and displace the communities they were meant to serve.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Measuring Impact</h3><ul><li>Food production quantification</li><li>Social capital metrics</li><li>Health outcome studies</li><li>Environmental services valuation</li></ul><h3>Policy Integration</h3><p>Integrating community gardens into comprehensive urban food system planning.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-garden-act-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Plan Your Garden Plot!',
          MIDDLE_SCHOOL: 'Design a Community Garden',
          HIGH_SCHOOL: 'Garden Management Simulation',
          UNDERGRADUATE: 'Governance Model Analysis',
          GRADUATE: 'Equity Assessment Tool',
          PHD: 'Impact Measurement Design'
        },
        description: {
          ELEMENTARY: 'Choose what vegetables to plant in your garden space!',
          MIDDLE_SCHOOL: 'Layout a community garden with different zones.',
          HIGH_SCHOOL: 'Manage resources, volunteers, and growing seasons.',
          UNDERGRADUATE: 'Compare different governance and funding models.',
          GRADUATE: 'Assess equity dimensions of garden access and benefits.',
          PHD: 'Design a comprehensive impact measurement framework.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 4 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 15 },
          GRADUATE: { complexity: 'expert', variables: 20 },
          PHD: { complexity: 'research', variables: 28 }
        }
      }
    ],
    game: {
      id: 'fs-garden-game',
      type: 'simulation',
      title: 'Community Garden Manager',
      description: 'Build and manage a thriving community garden!',
      rounds: 6,
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
      id: 'fs-garden-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fgq1',
          question: {
            ELEMENTARY: 'What do people do in community gardens?',
            MIDDLE_SCHOOL: 'What is a benefit of community gardens for the environment?',
            HIGH_SCHOOL: 'What is an allotment-style community garden?',
            UNDERGRADUATE: 'Which governance model gives long-term land security?',
            GRADUATE: 'What concern exists about gardens and gentrification?',
            PHD: 'What is challenging about measuring garden social impact?'
          },
          options: {
            ELEMENTARY: ['Grow food together with neighbors', 'Watch TV', 'Play video games', 'Sleep'],
            MIDDLE_SCHOOL: ['Provides habitat for pollinators', 'Creates more pollution', 'Uses more water', 'Increases traffic'],
            HIGH_SCHOOL: ['Individual plots for families', 'One big shared plot', 'Only flowers allowed', 'No rules at all'],
            UNDERGRADUATE: ['Community land trust', 'Annual lease', 'Informal agreement', 'No governance'],
            GRADUATE: ['Can increase property values and displacement', 'Always prevents gentrification', 'Has no effect on housing', 'Decreases neighborhood value'],
            PHD: ['Attributing outcomes to garden participation', 'Counting vegetables', 'Measuring plot size', 'Counting visitors']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Community gardens are places where neighbors grow food together!',
            MIDDLE_SCHOOL: 'Gardens provide flowers for bees and butterflies to visit.',
            HIGH_SCHOOL: 'Allotment gardens give individual families their own plot to manage.',
            UNDERGRADUATE: 'Community land trusts provide permanent protection for garden land.',
            GRADUATE: 'Green amenities can raise property values and potentially displace residents.',
            PHD: 'Isolating the effect of garden participation from other factors is methodologically challenging.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'American Community Gardening Association', url: 'https://www.communitygarden.org/', type: 'research' },
      { title: 'Community Garden Guide', url: 'https://www.nal.usda.gov/legacy/afsic/community-gardening', type: 'article' }
    ]
  },
  // Module 3: Seed Saving
  {
    id: 'food-sov-seed-saving',
    slug: 'seed-saving',
    title: 'Seed Saving',
    description: {
      ELEMENTARY: 'Learn how to save seeds from plants to grow more next year!',
      MIDDLE_SCHOOL: 'Discover the ancient art of seed saving and why it matters for our food future.',
      HIGH_SCHOOL: 'Explore seed saving techniques, genetic diversity, and seed sovereignty movements.',
      UNDERGRADUATE: 'Analyze seed systems, intellectual property issues, and farmer seed networks.',
      GRADUATE: 'Examine seed sovereignty as resistance to corporate seed control and GMO patents.',
      PHD: 'Research in-situ conservation, participatory plant breeding, and seed system resilience.'
    },
    topic: 'food-sovereignty',
    category: 'SEED SYSTEMS',
    icon: 'Flower',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-seed-1',
        title: 'Seeds are Treasures',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌱 Magical Seeds!</h2><p>Every plant starts as a tiny seed. When we save seeds, we can grow plants again and again!</p><h3>How to Save Seeds</h3><ol><li>Let the plant grow big and strong</li><li>Wait for seeds to form</li><li>Collect the dry seeds</li><li>Store them in a cool, dry place</li><li>Plant them next year!</li></ol></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Art of Seed Saving</h2><h3>Why Save Seeds?</h3><ul><li>Free seeds for next year</li><li>Plants adapt to your local conditions</li><li>Preserve rare varieties</li><li>Independence from seed companies</li></ul><h3>Easy Seeds to Save</h3><p>Tomatoes, peppers, beans, peas, and lettuce are great for beginners!</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Seed Science</h2><h3>Open-Pollinated vs Hybrid</h3><ul><li><strong>Open-pollinated:</strong> Seeds grow true to parent, can save</li><li><strong>Hybrid (F1):</strong> Seeds won't match parent, need to rebuy</li></ul><h3>Genetic Diversity</h3><p>Saving seeds from many plants maintains genetic diversity and resilience.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Seed Systems Analysis</h2><h3>Formal vs Informal Systems</h3><ul><li>Commercial seed industry</li><li>Farmer-saved seed networks</li><li>Community seed banks</li><li>Gene banks and ex-situ conservation</li></ul><h3>Intellectual Property</h3><p>Plant variety protection, patents, and their impact on farmer seed saving rights.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Seed Sovereignty</h2><h3>Corporate Concentration</h3><p>Four companies control over 60% of global seed sales, raising concerns about farmer autonomy and crop diversity.</p><h3>Resistance Movements</h3><p>Seed swaps, community seed libraries, and open-source seed initiatives challenge corporate control.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Participatory Plant Breeding</h3><p>Farmer-scientist collaborations developing locally adapted varieties.</p><h3>Seed System Resilience</h3><p>How diverse, decentralized seed systems withstand shocks better than centralized systems.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-seed-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Save Tomato Seeds!',
          MIDDLE_SCHOOL: 'Seed Saving Guide',
          HIGH_SCHOOL: 'Isolation Distances',
          UNDERGRADUATE: 'Seed System Mapping',
          GRADUATE: 'Policy Analysis',
          PHD: 'Conservation Strategy'
        },
        description: {
          ELEMENTARY: 'Learn step-by-step how to save seeds from a tomato!',
          MIDDLE_SCHOOL: 'Follow guides for saving different types of seeds.',
          HIGH_SCHOOL: 'Calculate isolation distances to maintain variety purity.',
          UNDERGRADUATE: 'Map formal and informal seed sources in a region.',
          GRADUATE: 'Analyze policies affecting farmer seed saving rights.',
          PHD: 'Design an integrated seed conservation strategy.'
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
      id: 'fs-seed-game',
      type: 'matching',
      title: 'Seed Saver',
      description: 'Match seeds to plants and learn saving techniques!',
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
      id: 'fs-seed-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fseed1',
          question: {
            ELEMENTARY: 'What do seeds need to be stored properly?',
            MIDDLE_SCHOOL: 'Why is saving seeds important?',
            HIGH_SCHOOL: 'What is the difference between open-pollinated and hybrid seeds?',
            UNDERGRADUATE: 'What percentage of global seed sales do top 4 companies control?',
            GRADUATE: 'What is a community seed library?',
            PHD: 'What is participatory plant breeding?'
          },
          options: {
            ELEMENTARY: ['Cool and dry place', 'Hot and wet place', 'Bright sunlight', 'In water'],
            MIDDLE_SCHOOL: ['Preserves varieties and saves money', 'Takes too much time', 'Seeds go bad anyway', 'Not important'],
            HIGH_SCHOOL: ['OP seeds grow true, hybrids do not', 'They are the same', 'Hybrids are better', 'OP seeds are illegal'],
            UNDERGRADUATE: ['Over 60%', '10%', '25%', '90%'],
            GRADUATE: ['Place to borrow and share seeds', 'Commercial seed store', 'Gene bank', 'Seed factory'],
            PHD: ['Farmer-scientist collaboration for local varieties', 'Lab-only breeding', 'Corporate breeding', 'Random selection']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Seeds stay healthy longest when kept cool and dry!',
            MIDDLE_SCHOOL: 'Seed saving preserves plant varieties and gives farmers independence.',
            HIGH_SCHOOL: 'Open-pollinated seeds produce plants like their parents; hybrids do not.',
            UNDERGRADUATE: 'Just four companies control over 60% of the global commercial seed market.',
            GRADUATE: 'Seed libraries allow community members to borrow and return seeds.',
            PHD: 'PPB involves farmers and scientists collaborating to breed locally-adapted varieties.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Seed Savers Exchange', url: 'https://www.seedsavers.org/', type: 'research' },
      { title: 'Open Source Seed Initiative', url: 'https://osseeds.org/', type: 'article' }
    ]
  },
  // Module 4: Farmers Markets
  {
    id: 'food-sov-farmers-markets',
    slug: 'farmers-markets',
    title: 'Farmers Markets',
    description: {
      ELEMENTARY: 'Visit the farmers market where you can meet the people who grow your food!',
      MIDDLE_SCHOOL: 'Learn how farmers markets connect local farmers directly with communities.',
      HIGH_SCHOOL: 'Explore the economics, social benefits, and challenges of direct-to-consumer marketing.',
      UNDERGRADUATE: 'Analyze farmers market impacts on local food systems, farm viability, and food access.',
      GRADUATE: 'Examine farmers markets as alternative food networks challenging conventional distribution.',
      PHD: 'Research farmers market effectiveness, scaling limitations, and institutional embeddedness.'
    },
    topic: 'food-sovereignty',
    category: 'LOCAL MARKETS',
    icon: 'ShoppingBag',
    color: 'ocean',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-market-1',
        title: 'Meet Your Farmer',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🧺 The Farmers Market!</h2><p>At a farmers market, you can buy food directly from the people who grew it!</p><h3>What You'll Find</h3><ul><li>🍅 Fresh vegetables and fruits</li><li>🥚 Farm fresh eggs</li><li>🍯 Local honey</li><li>🧀 Homemade cheese</li><li>🌸 Beautiful flowers</li></ul><h3>Why It's Special</h3><p>You can ask farmers how they grow their food!</p></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Direct Farm-to-Consumer</h2><h3>Benefits for Farmers</h3><ul><li>Keep more money (no middleman)</li><li>Direct customer feedback</li><li>Sell imperfect produce</li></ul><h3>Benefits for Shoppers</h3><ul><li>Fresher food (picked yesterday!)</li><li>Know where food comes from</li><li>Support local economy</li><li>Discover new varieties</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Farmers Market Economics</h2><h3>Value Chain Comparison</h3><p>Farmers typically receive 15-20% of retail price through conventional channels, but 80-100% at farmers markets.</p><h3>Challenges</h3><ul><li>Weather dependence</li><li>Time commitment for farmers</li><li>Limited operating hours</li><li>Price perception issues</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Market Impact Analysis</h2><h3>Economic Impacts</h3><ul><li>Local economic multiplier effects</li><li>Farm viability and diversification</li><li>Job creation in local food systems</li></ul><h3>Food Access</h3><p>SNAP/EBT acceptance and matching programs improve access for low-income shoppers.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Alternative Food Networks</h2><h3>Embeddedness Theory</h3><p>Farmers markets create social embeddedness that conventional markets lack.</p><h3>Critiques</h3><ul><li>Who has access?</li><li>Romanticization of small farms</li><li>Scalability limitations</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Research Questions</h2><h3>Measuring Impact</h3><ul><li>Attribution challenges</li><li>Spillover effects</li><li>Long-term farm viability</li></ul><h3>Institutional Analysis</h3><p>How markets become embedded in local food system infrastructure.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-market-act-1',
        type: 'SCENARIO',
        title: {
          ELEMENTARY: 'Shop at the Market!',
          MIDDLE_SCHOOL: 'Compare Prices',
          HIGH_SCHOOL: 'Market Economics',
          UNDERGRADUATE: 'Impact Assessment',
          GRADUATE: 'Access Analysis',
          PHD: 'Research Design'
        },
        description: {
          ELEMENTARY: 'Choose healthy foods from different vendors!',
          MIDDLE_SCHOOL: 'Compare farmers market prices to supermarket prices.',
          HIGH_SCHOOL: 'Calculate farmer revenue under different sales channels.',
          UNDERGRADUATE: 'Assess the economic impact of a farmers market.',
          GRADUATE: 'Analyze who benefits from and has access to farmers markets.',
          PHD: 'Design research to measure market effectiveness.'
        },
        config: {
          ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 },
          GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 },
          PHD: { scenarios: 8, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'fs-market-game',
      type: 'simulation',
      title: 'Market Manager',
      description: 'Run a successful farmers market!',
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
      id: 'fs-market-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fmq1',
          question: {
            ELEMENTARY: 'Who sells food at a farmers market?',
            MIDDLE_SCHOOL: 'Why do farmers earn more at farmers markets?',
            HIGH_SCHOOL: 'What percentage do farmers typically get through conventional channels?',
            UNDERGRADUATE: 'What programs help low-income shoppers at farmers markets?',
            GRADUATE: 'What does embeddedness mean in market contexts?',
            PHD: 'What is a key challenge in measuring farmers market impact?'
          },
          options: {
            ELEMENTARY: ['Farmers who grew the food', 'Robots', 'Strangers from far away', 'Nobody knows'],
            MIDDLE_SCHOOL: ['No middleman takes a cut', 'Markets charge more', 'Food is worse quality', 'Less work involved'],
            HIGH_SCHOOL: ['15-20%', '80-100%', '50%', '5%'],
            UNDERGRADUATE: ['SNAP/EBT matching programs', 'No programs exist', 'Only cash accepted', 'Credit cards only'],
            GRADUATE: ['Social relationships in economic exchange', 'Physical location only', 'Embedding ads', 'Underground markets'],
            PHD: ['Attribution of effects to market participation', 'Counting vendors', 'Measuring plot size', 'Counting customers']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Farmers sell the food they grew themselves at farmers markets!',
            MIDDLE_SCHOOL: 'Selling directly means no middlemen take a portion of the price.',
            HIGH_SCHOOL: 'Farmers typically receive only 15-20% of retail price through conventional supply chains.',
            UNDERGRADUATE: 'SNAP/EBT matching programs double purchasing power for low-income shoppers.',
            GRADUATE: 'Embeddedness refers to how economic transactions are shaped by social relationships.',
            PHD: 'Isolating the specific impact of market participation from other factors is methodologically challenging.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Farmers Market Coalition', url: 'https://farmersmarketcoalition.org/', type: 'research' },
      { title: 'USDA Farmers Markets', url: 'https://www.ams.usda.gov/local-food-directories/farmersmarkets', type: 'tool' }
    ]
  },
  // Module 5: Food Preservation
  {
    id: 'food-sov-preservation',
    slug: 'food-preservation',
    title: 'Food Preservation',
    description: {
      ELEMENTARY: 'Learn how to make food last longer so nothing goes to waste!',
      MIDDLE_SCHOOL: 'Discover traditional methods for preserving fruits, vegetables, and more.',
      HIGH_SCHOOL: 'Explore the science of food preservation including canning, fermenting, and drying.',
      UNDERGRADUATE: 'Analyze preservation methods, food safety, and role in food security.',
      GRADUATE: 'Examine preservation as cultural practice, food sovereignty tool, and business opportunity.',
      PHD: 'Research preservation efficacy, traditional knowledge documentation, and innovation.'
    },
    topic: 'food-sovereignty',
    category: 'PRESERVATION',
    icon: 'Archive',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'fs-preserve-1',
        title: 'Making Food Last',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🥫 Keep Food Fresh!</h2><p>Long ago, people learned to save food for winter. We can do it too!</p><h3>Ways to Preserve Food</h3><ul><li>🧊 Freezing - makes food super cold</li><li>☀️ Drying - removes all the water</li><li>🥒 Pickling - uses vinegar</li><li>🍯 Jamming - adds lots of sugar</li></ul></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Preservation Methods</h2><h3>How They Work</h3><ul><li><strong>Freezing:</strong> Stops bacteria by cold</li><li><strong>Drying:</strong> Removes water bacteria need</li><li><strong>Canning:</strong> Heat kills bacteria, seal keeps them out</li><li><strong>Fermenting:</strong> Good bacteria crowd out bad</li><li><strong>Salting:</strong> Salt draws out water</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Food Preservation Science</h2><h3>Factors Affecting Spoilage</h3><ul><li>Water activity (aw)</li><li>pH level</li><li>Temperature</li><li>Oxygen availability</li></ul><h3>Safety Considerations</h3><p>Botulism risk in improper canning; follow tested recipes.</p></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Preservation Systems</h2><h3>Food Security Role</h3><p>Preservation extends seasonal abundance through lean months, critical for food sovereignty.</p><h3>Commercial vs Home Scale</h3><ul><li>Equipment and technique differences</li><li>Regulatory requirements</li><li>Value-added opportunities</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Cultural and Economic Dimensions</h2><h3>Traditional Knowledge</h3><p>Preservation methods carry cultural meaning and connect generations.</p><h3>Economic Opportunity</h3><p>Value-added processing can improve farm viability and market access.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Research Frontiers</h2><h3>Traditional Method Documentation</h3><p>Recording and validating traditional preservation techniques.</p><h3>Innovation</h3><p>Combining traditional methods with modern food safety science.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'fs-preserve-act-1',
        type: 'STEP_GUIDED',
        title: {
          ELEMENTARY: 'Make Sun-Dried Tomatoes!',
          MIDDLE_SCHOOL: 'Pickle Vegetables',
          HIGH_SCHOOL: 'Safe Canning Practice',
          UNDERGRADUATE: 'Preservation Planning',
          GRADUATE: 'Value Chain Analysis',
          PHD: 'Method Validation'
        },
        description: {
          ELEMENTARY: 'Learn to dry tomatoes in the sun!',
          MIDDLE_SCHOOL: 'Follow steps to pickle cucumbers safely.',
          HIGH_SCHOOL: 'Practice safe water bath canning techniques.',
          UNDERGRADUATE: 'Plan preservation for a seasonal harvest.',
          GRADUATE: 'Analyze value addition through preservation.',
          PHD: 'Design validation study for traditional method.'
        },
        config: {
          ELEMENTARY: { steps: 4, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { steps: 6, hints: true, timeLimit: 180 },
          HIGH_SCHOOL: { steps: 8, hints: false, timeLimit: 150 },
          UNDERGRADUATE: { steps: 10, hints: false, timeLimit: 180 },
          GRADUATE: { steps: 12, hints: false, timeLimit: 120 },
          PHD: { steps: 15, hints: false, timeLimit: 90 }
        }
      }
    ],
    game: {
      id: 'fs-preserve-game',
      type: 'sorting',
      title: 'Preservation Pro',
      description: 'Match foods to the best preservation methods!',
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
      id: 'fs-preserve-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'fpq1',
          question: {
            ELEMENTARY: 'What does drying food do?',
            MIDDLE_SCHOOL: 'How does fermenting preserve food?',
            HIGH_SCHOOL: 'What is the main safety risk in home canning?',
            UNDERGRADUATE: 'How does preservation support food sovereignty?',
            GRADUATE: 'Why is traditional preservation knowledge valuable?',
            PHD: 'What challenge exists in validating traditional methods?'
          },
          options: {
            ELEMENTARY: ['Removes water so it lasts longer', 'Makes it wet', 'Adds sugar', 'Freezes it'],
            MIDDLE_SCHOOL: ['Good bacteria crowd out bad bacteria', 'Heat kills everything', 'It does not preserve', 'Magic'],
            HIGH_SCHOOL: ['Botulism from improper canning', 'Too much flavor', 'Food gets too dry', 'Colors change'],
            UNDERGRADUATE: ['Extends seasonal abundance year-round', 'Increases imports', 'Reduces local production', 'Only helps corporations'],
            GRADUATE: ['Carries cultural meaning and proven efficacy', 'Has no modern relevance', 'Is always unsafe', 'Cannot be documented'],
            PHD: ['Standardizing without losing traditional character', 'Too simple to study', 'No funding available', 'Already fully documented']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Removing water keeps bacteria from growing so food lasts longer!',
            MIDDLE_SCHOOL: 'Beneficial bacteria in fermentation outcompete harmful bacteria.',
            HIGH_SCHOOL: 'Clostridium botulinum can grow in improperly canned low-acid foods.',
            UNDERGRADUATE: 'Preservation allows communities to store local abundance for year-round food security.',
            GRADUATE: 'Traditional knowledge represents generations of practical experimentation and cultural heritage.',
            PHD: 'Standardizing methods for food safety while preserving traditional characteristics is complex.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'NCHFP Home Food Preservation', url: 'https://nchfp.uga.edu/', type: 'research' },
      { title: 'Ball Canning', url: 'https://www.freshpreserving.com/', type: 'article' }
    ]
  }
]
