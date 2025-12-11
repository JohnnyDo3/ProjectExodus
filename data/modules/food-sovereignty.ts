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
  },
  // Module 6: Urban Farming
  {
    id: 'food-sov-urban-farming',
    slug: 'urban-farming',
    title: 'Urban Farming',
    description: {
      ELEMENTARY: 'Grow food in the city - even on rooftops and balconies!',
      MIDDLE_SCHOOL: 'Learn how cities can produce their own food in surprising places.',
      HIGH_SCHOOL: 'Explore urban agriculture techniques, vertical farming, and city food systems.',
      UNDERGRADUATE: 'Analyze urban farm economics, policy support, and integration with city planning.',
      GRADUATE: 'Examine urban agriculture as food justice strategy and community development tool.',
      PHD: 'Research urban farm productivity, environmental services, and policy effectiveness.'
    },
    topic: 'food-sovereignty',
    category: 'URBAN AGRICULTURE',
    icon: 'Building2',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-urban-1', title: 'City Farms', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Farms in the City!</h2><p>You can grow food anywhere - rooftops, balconies, even old parking lots!</p>', MIDDLE_SCHOOL: '<h2>Urban Agriculture</h2><p>Cities are finding creative spaces for food production: vacant lots, rooftops, vertical farms.</p>', HIGH_SCHOOL: '<h2>Urban Farming Methods</h2><p>Container gardening, rooftop farms, vertical farms, aquaponics, and community gardens transform cities.</p>', UNDERGRADUATE: '<h2>Urban Farm Economics</h2><p>Land costs, labor, market access, and policy support shape urban farm viability.</p>', GRADUATE: '<h2>Food Justice Applications</h2><p>Urban farms address food deserts, provide jobs, and build community resilience.</p>', PHD: '<h2>Research Questions</h2><p>Productivity optimization, environmental benefits, and policy evaluation methods.</p>' } }],
    activities: [{ id: 'fs-urban-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Rooftop Garden!', MIDDLE_SCHOOL: 'Plan an Urban Farm', HIGH_SCHOOL: 'Site Assessment', UNDERGRADUATE: 'Business Planning', GRADUATE: 'Impact Assessment', PHD: 'Research Design' }, description: { ELEMENTARY: 'Create a garden on top of a building!', MIDDLE_SCHOOL: 'Plan how to transform an empty lot into a farm.', HIGH_SCHOOL: 'Assess a site for urban farming potential.', UNDERGRADUATE: 'Develop a business plan for an urban farm.', GRADUATE: 'Assess community impacts of urban farming.', PHD: 'Design research on urban agriculture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 15 }, GRADUATE: { complexity: 'expert', variables: 20 }, PHD: { complexity: 'research', variables: 28 } } }],
    game: { id: 'fs-urban-game', type: 'simulation', title: 'City Farmer', description: 'Build and manage an urban farm!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-urban-quiz', passingScore: 80, questions: [{ id: 'fuq1', question: { ELEMENTARY: 'Where can you grow food in a city?', MIDDLE_SCHOOL: 'What is vertical farming?', HIGH_SCHOOL: 'What challenge do urban farms face?', UNDERGRADUATE: 'What policy supports urban farming?', GRADUATE: 'How do urban farms address food deserts?', PHD: 'What is a key research gap in urban agriculture?' }, options: { ELEMENTARY: ['Rooftops, balconies, empty lots', 'Only in the country', 'Nowhere', 'Underground'], MIDDLE_SCHOOL: ['Growing food in stacked layers', 'Farming on hills', 'Mountain farming', 'Deep farming'], HIGH_SCHOOL: ['Land costs and access', 'Too much rain', 'Too much space', 'No challenges'], UNDERGRADUATE: ['Zoning changes and incentives', 'No policy support exists', 'Only federal programs', 'Banning farming'], GRADUATE: ['Providing local fresh food access', 'Making food more expensive', 'Reducing jobs', 'Increasing transportation'], PHD: ['Long-term productivity data', 'How to plant seeds', 'Basic farming', 'Soil color'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Cities have lots of spaces for growing food - rooftops, balconies, and empty lots!', MIDDLE_SCHOOL: 'Vertical farming grows food in stacked layers, often indoors with LED lights.', HIGH_SCHOOL: 'Urban farms face high land costs and competition for space.', UNDERGRADUATE: 'Zoning changes and incentives help urban farms get started and stay viable.', GRADUATE: 'Urban farms bring fresh, affordable produce to neighborhoods lacking grocery stores.', PHD: 'Long-term data on urban farm productivity and sustainability is limited.' } }] },
    externalResources: [{ title: 'Urban Farming Institute', url: 'https://urbanfarminginstitute.org/', type: 'research' }]
  },
  // Module 7: Food Cooperatives
  {
    id: 'food-sov-cooperatives',
    slug: 'food-cooperatives',
    title: 'Food Cooperatives',
    description: {
      ELEMENTARY: 'Learn about stores owned by the community!',
      MIDDLE_SCHOOL: 'Discover how food co-ops work and why people start them.',
      HIGH_SCHOOL: 'Explore cooperative business models, governance, and community benefits.',
      UNDERGRADUATE: 'Analyze co-op economics, membership structures, and market positioning.',
      GRADUATE: 'Examine cooperatives as alternative food system institutions and movement building.',
      PHD: 'Research cooperative effectiveness, scale challenges, and systemic change potential.'
    },
    topic: 'food-sovereignty',
    category: 'COOPERATIVES',
    icon: 'Users',
    color: 'ocean',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [{ id: 'fs-coop-1', title: 'People-Owned Stores', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Our Store!</h2><p>A co-op is a store owned by the people who shop there!</p>', MIDDLE_SCHOOL: '<h2>What is a Food Co-op?</h2><p>Members own the store together, share decisions, and often get discounts.</p>', HIGH_SCHOOL: '<h2>Cooperative Principles</h2><p>Open membership, democratic control, member economic participation, autonomy, education, cooperation, community concern.</p>', UNDERGRADUATE: '<h2>Co-op Business Models</h2><p>Consumer, producer, and worker cooperatives each serve different needs.</p>', GRADUATE: '<h2>Co-ops as Alternatives</h2><p>Cooperatives challenge corporate food retail and build community power.</p>', PHD: '<h2>Research Questions</h2><p>Scale vs values, competitive positioning, and systemic impact.</p>' } }],
    activities: [{ id: 'fs-coop-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Start a Co-op!', MIDDLE_SCHOOL: 'Member Meeting', HIGH_SCHOOL: 'Governance Design', UNDERGRADUATE: 'Business Analysis', GRADUATE: 'Movement Building', PHD: 'Impact Research' }, description: { ELEMENTARY: 'Imagine starting a store with your neighbors!', MIDDLE_SCHOOL: 'Practice making decisions together as co-op members.', HIGH_SCHOOL: 'Design governance for a food cooperative.', UNDERGRADUATE: 'Analyze co-op business model viability.', GRADUATE: 'Explore how co-ops build food movement power.', PHD: 'Design research on cooperative impact.' }, config: { ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 }, PHD: { scenarios: 8, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-coop-game', type: 'simulation', title: 'Co-op Manager', description: 'Run a successful food cooperative!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-coop-quiz', passingScore: 80, questions: [{ id: 'fcq1', question: { ELEMENTARY: 'Who owns a food co-op?', MIDDLE_SCHOOL: 'How do co-op members make decisions?', HIGH_SCHOOL: 'What is one cooperative principle?', UNDERGRADUATE: 'What is a consumer cooperative?', GRADUATE: 'How do co-ops challenge corporate food?', PHD: 'What tension exists as co-ops grow?' }, options: { ELEMENTARY: ['The members who shop there', 'One rich person', 'The government', 'Nobody'], MIDDLE_SCHOOL: ['Democratically - each member gets a vote', 'The manager decides everything', 'Random selection', 'No decisions needed'], HIGH_SCHOOL: ['Democratic member control', 'Maximum profit', 'Owner control', 'Government control'], UNDERGRADUATE: ['Owned by the customers who shop there', 'Owned by investors', 'Owned by workers only', 'Owned by suppliers'], GRADUATE: ['Community ownership vs corporate profit', 'They support corporations', 'No challenge', 'Same as regular stores'], PHD: ['Maintaining values while scaling', 'Too many customers', 'Too much profit', 'No tensions exist'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Food co-ops are owned by the members - the people who shop there!', MIDDLE_SCHOOL: 'In a co-op, each member gets one vote, regardless of how much they buy.', HIGH_SCHOOL: 'Democratic member control means members make decisions together.', UNDERGRADUATE: 'Consumer cooperatives are owned by and serve their customer-members.', GRADUATE: 'Co-ops offer community-controlled alternatives to profit-driven corporate retailers.', PHD: 'Growing co-ops often struggle to maintain democratic values and mission focus.' } }] },
    externalResources: [{ title: 'National Co-op Grocers', url: 'https://www.ncg.coop/', type: 'research' }]
  },
  // Module 8: Indigenous Food Systems
  {
    id: 'food-sov-indigenous',
    slug: 'indigenous-food-systems',
    title: 'Indigenous Food Systems',
    description: {
      ELEMENTARY: 'Learn about traditional foods and farming from indigenous peoples!',
      MIDDLE_SCHOOL: 'Discover how indigenous communities have grown food for thousands of years.',
      HIGH_SCHOOL: 'Explore traditional ecological knowledge, heritage crops, and food sovereignty movements.',
      UNDERGRADUATE: 'Analyze indigenous food systems, colonization impacts, and revitalization efforts.',
      GRADUATE: 'Examine indigenous food sovereignty as decolonization and self-determination.',
      PHD: 'Research traditional knowledge systems, co-management, and indigenous research methodologies.'
    },
    topic: 'food-sovereignty',
    category: 'INDIGENOUS SYSTEMS',
    icon: 'Leaf',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-indig-1', title: 'Traditional Ways', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Ancient Wisdom!</h2><p>Indigenous peoples have grown food in harmony with nature for thousands of years.</p>', MIDDLE_SCHOOL: '<h2>Traditional Knowledge</h2><p>The Three Sisters (corn, beans, squash) is one example of indigenous agricultural genius.</p>', HIGH_SCHOOL: '<h2>Indigenous Food Sovereignty</h2><p>Reclaiming traditional foods, seeds, and land is central to indigenous self-determination.</p>', UNDERGRADUATE: '<h2>Colonization Impacts</h2><p>Food system disruption was a tool of colonization. Revitalization restores health and culture.</p>', GRADUATE: '<h2>Decolonizing Food</h2><p>Indigenous food sovereignty challenges colonial food systems and asserts self-determination.</p>', PHD: '<h2>Research Ethics</h2><p>Indigenous research methodologies center community benefit and sovereignty.</p>' } }],
    activities: [{ id: 'fs-indig-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Three Sisters Garden!', MIDDLE_SCHOOL: 'Traditional Foods', HIGH_SCHOOL: 'Heritage Seeds', UNDERGRADUATE: 'System Analysis', GRADUATE: 'Sovereignty Framework', PHD: 'Ethical Research' }, description: { ELEMENTARY: 'Plant corn, beans, and squash together!', MIDDLE_SCHOOL: 'Match traditional foods to their origins.', HIGH_SCHOOL: 'Explore heritage seed varieties and their significance.', UNDERGRADUATE: 'Analyze indigenous food system disruption and revitalization.', GRADUATE: 'Apply indigenous food sovereignty frameworks.', PHD: 'Design community-centered research.' }, config: { ELEMENTARY: { items: 6, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 8, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 12, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 15, hints: false, timeLimit: 120 }, GRADUATE: { items: 18, hints: false, timeLimit: 90 }, PHD: { items: 22, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-indig-game', type: 'matching', title: 'Traditional Knowledge', description: 'Learn about indigenous food traditions!', rounds: 5, timeLimit: 35, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-indig-quiz', passingScore: 80, questions: [{ id: 'fiq1', question: { ELEMENTARY: 'What are the Three Sisters?', MIDDLE_SCHOOL: 'How do the Three Sisters help each other?', HIGH_SCHOOL: 'What is traditional ecological knowledge?', UNDERGRADUATE: 'How did colonization affect indigenous food systems?', GRADUATE: 'What does indigenous food sovereignty assert?', PHD: 'What is CBPR in indigenous research?' }, options: { ELEMENTARY: ['Corn, beans, and squash', 'Three actual sisters', 'Three rivers', 'Three mountains'], MIDDLE_SCHOOL: ['Corn supports beans, beans add nitrogen, squash shades soil', 'They do not help each other', 'They fight for space', 'They are planted separately'], HIGH_SCHOOL: ['Knowledge passed down about living with nature', 'Only book learning', 'Modern science only', 'No such thing'], UNDERGRADUATE: ['Disrupted food access, seeds, and practices', 'Improved everything', 'No impact', 'Only positive changes'], GRADUATE: ['Self-determination over food systems', 'Government control', 'Corporate ownership', 'Individual choice only'], PHD: ['Community-Based Participatory Research', 'Corporate Business Planning Research', 'Centralized Based Processing Research', 'None of these'] }, correctIndex: 0, explanation: { ELEMENTARY: 'The Three Sisters are corn, beans, and squash - planted together!', MIDDLE_SCHOOL: 'Corn gives beans a pole to climb, beans add nitrogen, squash leaves shade soil and prevent weeds.', HIGH_SCHOOL: 'Traditional ecological knowledge is wisdom about ecosystems passed down through generations.', UNDERGRADUATE: 'Colonization systematically disrupted indigenous food access, seed sovereignty, and traditional practices.', GRADUATE: 'Indigenous food sovereignty asserts the right to define and control food systems.', PHD: 'CBPR (Community-Based Participatory Research) centers community needs and governance.' } }] },
    externalResources: [{ title: 'First Nations Development Institute', url: 'https://www.firstnations.org/', type: 'research' }]
  },
  // Module 9: Agroecology
  {
    id: 'food-sov-agroecology',
    slug: 'agroecology',
    title: 'Agroecology',
    description: {
      ELEMENTARY: 'Learn how farms can work like nature!',
      MIDDLE_SCHOOL: 'Discover farming that copies nature\'s patterns and systems.',
      HIGH_SCHOOL: 'Explore agroecological principles, practices, and transitions.',
      UNDERGRADUATE: 'Analyze agroecology as science, practice, and social movement.',
      GRADUATE: 'Examine agroecology in policy, research, and food system transformation.',
      PHD: 'Research agroecological transitions, metrics, and political ecology.'
    },
    topic: 'food-sovereignty',
    category: 'AGROECOLOGY',
    icon: 'TreePine',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [{ id: 'fs-agro-1', title: 'Farming Like Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Nature\'s Farm!</h2><p>In nature, plants and animals help each other. Agroecology copies this!</p>', MIDDLE_SCHOOL: '<h2>What is Agroecology?</h2><p>Farming that uses ecological principles - diversity, natural pest control, healthy soil.</p>', HIGH_SCHOOL: '<h2>Agroecological Principles</h2><p>Enhance biodiversity, recycle nutrients, build soil, integrate crops and animals, reduce external inputs.</p>', UNDERGRADUATE: '<h2>Three Faces of Agroecology</h2><p>Scientific discipline, set of practices, and social movement for food system change.</p>', GRADUATE: '<h2>Agroecology in Policy</h2><p>FAO, IAASTD, and civil society promote agroecology for sustainable food systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Transition pathways, territorial approaches, and political economy of agroecology.</p>' } }],
    activities: [{ id: 'fs-agro-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design an Eco-Farm!', MIDDLE_SCHOOL: 'Natural Pest Control', HIGH_SCHOOL: 'System Design', UNDERGRADUATE: 'Transition Planning', GRADUATE: 'Policy Analysis', PHD: 'Research Methods' }, description: { ELEMENTARY: 'Create a farm where plants help each other!', MIDDLE_SCHOOL: 'Use beneficial insects instead of pesticides.', HIGH_SCHOOL: 'Design an agroecological farm system.', UNDERGRADUATE: 'Plan a farm transition to agroecology.', GRADUATE: 'Analyze policies supporting agroecology.', PHD: 'Design participatory agroecology research.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 15 }, GRADUATE: { complexity: 'expert', variables: 20 }, PHD: { complexity: 'research', variables: 28 } } }],
    game: { id: 'fs-agro-game', type: 'simulation', title: 'Agroecology Farmer', description: 'Build a farm that works with nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-agro-quiz', passingScore: 80, questions: [{ id: 'faq1', question: { ELEMENTARY: 'What does agroecology copy?', MIDDLE_SCHOOL: 'How does agroecology control pests?', HIGH_SCHOOL: 'What is one agroecological principle?', UNDERGRADUATE: 'What are the three faces of agroecology?', GRADUATE: 'What international body promotes agroecology?', PHD: 'What is a territorial approach to agroecology?' }, options: { ELEMENTARY: ['Nature\'s patterns', 'Factories', 'Cities', 'Nothing'], MIDDLE_SCHOOL: ['Beneficial insects and diversity', 'More pesticides', 'Ignoring pests', 'Removing all insects'], HIGH_SCHOOL: ['Enhance biodiversity', 'Maximize monoculture', 'Use more chemicals', 'Remove all animals'], UNDERGRADUATE: ['Science, practice, and social movement', 'Only science', 'Only farming', 'Only politics'], GRADUATE: ['FAO', 'WTO', 'IMF', 'World Bank only'], PHD: ['Landscape-scale coordinated transitions', 'Individual farm only', 'Single crop focus', 'Export orientation'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Agroecology copies nature\'s patterns - how plants and animals help each other!', MIDDLE_SCHOOL: 'Agroecology uses beneficial insects, habitat diversity, and natural predators.', HIGH_SCHOOL: 'Enhancing biodiversity is a core agroecological principle.', UNDERGRADUATE: 'Agroecology encompasses scientific research, farming practices, and social movements.', GRADUATE: 'The FAO (UN Food and Agriculture Organization) has adopted agroecology.', PHD: 'Territorial approaches coordinate agroecological transitions across landscapes.' } }] },
    externalResources: [{ title: 'Agroecology Fund', url: 'https://www.agroecologyfund.org/', type: 'research' }]
  },
  // Module 10: Food Justice
  {
    id: 'food-sov-food-justice',
    slug: 'food-justice',
    title: 'Food Justice',
    description: {
      ELEMENTARY: 'Learn why everyone deserves good food!',
      MIDDLE_SCHOOL: 'Discover why some neighborhoods lack access to healthy food.',
      HIGH_SCHOOL: 'Explore food deserts, food access inequities, and community solutions.',
      UNDERGRADUATE: 'Analyze structural racism in food systems and food justice movements.',
      GRADUATE: 'Examine food justice frameworks, organizing strategies, and policy change.',
      PHD: 'Research food justice outcomes, intersectionality, and transformative approaches.'
    },
    topic: 'food-sovereignty',
    category: 'FOOD JUSTICE',
    icon: 'Scale',
    color: 'terra',
    duration: { ELEMENTARY: 20, MIDDLE_SCHOOL: 30, HIGH_SCHOOL: 45, UNDERGRADUATE: 60, GRADUATE: 80, PHD: 105 },
    isMasterclass: false,
    lessons: [{ id: 'fs-justice-1', title: 'Fair Food for All', order: 1, duration: 15, hasActivity: true, activityType: 'SCENARIO', content: { ELEMENTARY: '<h2>Food for Everyone!</h2><p>Everyone deserves healthy, tasty food - but not everyone can get it easily.</p>', MIDDLE_SCHOOL: '<h2>What is a Food Desert?</h2><p>Areas where fresh, healthy food is hard to find - often low-income neighborhoods.</p>', HIGH_SCHOOL: '<h2>Food Access Inequities</h2><p>Grocery store locations, transportation, income, and racism all affect food access.</p>', UNDERGRADUATE: '<h2>Structural Racism</h2><p>Redlining, disinvestment, and discrimination created many food deserts.</p>', GRADUATE: '<h2>Food Justice Movement</h2><p>Community-led organizing for equitable, sustainable, local food systems.</p>', PHD: '<h2>Research Approaches</h2><p>Participatory methods, intersectionality, and measuring justice outcomes.</p>' } }],
    activities: [{ id: 'fs-justice-act-1', type: 'SCENARIO', title: { ELEMENTARY: 'Find the Food!', MIDDLE_SCHOOL: 'Map Food Access', HIGH_SCHOOL: 'Identify Barriers', UNDERGRADUATE: 'Analyze Causes', GRADUATE: 'Organizing Strategy', PHD: 'Justice Metrics' }, description: { ELEMENTARY: 'Help families find healthy food in their neighborhood!', MIDDLE_SCHOOL: 'Map where food is easy and hard to get.', HIGH_SCHOOL: 'Identify barriers to food access in a community.', UNDERGRADUATE: 'Analyze structural causes of food inequity.', GRADUATE: 'Develop a food justice organizing strategy.', PHD: 'Design food justice outcome measurement.' }, config: { ELEMENTARY: { scenarios: 3, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { scenarios: 4, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { scenarios: 5, hints: false, timeLimit: 90 }, UNDERGRADUATE: { scenarios: 6, hints: false, timeLimit: 120 }, GRADUATE: { scenarios: 7, hints: false, timeLimit: 90 }, PHD: { scenarios: 8, hints: false, timeLimit: 60 } } }],
    game: { id: 'fs-justice-game', type: 'simulation', title: 'Food Justice Hero', description: 'Help communities get fair food access!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'fs-justice-quiz', passingScore: 80, questions: [{ id: 'fjq1', question: { ELEMENTARY: 'What does everyone deserve?', MIDDLE_SCHOOL: 'What is a food desert?', HIGH_SCHOOL: 'What affects food access?', UNDERGRADUATE: 'What created many food deserts?', GRADUATE: 'What is food justice organizing?', PHD: 'What is intersectionality in food justice?' }, options: { ELEMENTARY: ['Access to healthy food', 'Only fast food', 'No food', 'Expensive food'], MIDDLE_SCHOOL: ['An area with little access to healthy food', 'An actual desert', 'A food museum', 'A food festival'], HIGH_SCHOOL: ['Store locations, transportation, income, racism', 'Only personal choice', 'Weather only', 'Nothing affects it'], UNDERGRADUATE: ['Redlining, disinvestment, discrimination', 'Natural processes', 'Random chance', 'Personal choices only'], GRADUATE: ['Community-led work for equitable food systems', 'Corporate campaigns', 'Government only', 'Individual action only'], PHD: ['How multiple identities affect food access', 'Single factor analysis', 'No identity factors', 'Only income matters'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Everyone deserves access to healthy, affordable, culturally appropriate food!', MIDDLE_SCHOOL: 'Food deserts are areas - often low-income - with little access to healthy food.', HIGH_SCHOOL: 'Food access is shaped by store locations, transportation, income, and systemic racism.', UNDERGRADUATE: 'Historical redlining and disinvestment created many of today\'s food deserts.', GRADUATE: 'Food justice organizing builds community power for equitable, sustainable food systems.', PHD: 'Intersectionality examines how race, class, gender, and other factors combine to affect food access.' } }] },
    externalResources: [{ title: 'Food Research & Action Center', url: 'https://frac.org/', type: 'research' }]
  }
]
