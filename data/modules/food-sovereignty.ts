import { Module, LearningLevel } from './index'

// Food Sovereignty Modules - Building toward 33 total

export const introToFoodSovereignty: Module = {
  id: 'food-sov-intro',
  slug: 'introduction-to-food-sovereignty',
  title: 'Introduction to Food Sovereignty',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how communities grow their own food and why it matters!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how communities take control of their food systems and why food independence is important.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the concept of food sovereignty and how communities worldwide are reclaiming control over their food systems.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze the political, economic, and social dimensions of food sovereignty movements globally.',
    [LearningLevel.GRADUATE]: 'Critically examine food sovereignty as a framework for agrarian reform and alternatives to industrial food systems.',
    [LearningLevel.PHD]: 'Investigate the theoretical foundations and policy implications of food sovereignty within global governance structures.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 30,
    [LearningLevel.HIGH_SCHOOL]: 45,
    [LearningLevel.UNDERGRADUATE]: 60,
    [LearningLevel.GRADUATE]: 90,
    [LearningLevel.PHD]: 120
  },
  lessons: [
    {
      id: 'fs-intro-1',
      title: 'What is Food Sovereignty?',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌽 Food Sovereignty: Communities Growing Together!</h2>
          <p>Have you ever grown a tomato or helped in a garden? When communities grow their own food, something magical happens!</p>
          <div class="key-concept">
            <h3>What is Food Sovereignty?</h3>
            <p><strong>Food sovereignty</strong> means communities get to decide what food they grow and eat. It's like being the chef of your own kitchen, but for a whole neighborhood!</p>
          </div>
          <div class="fun-fact">
            <h4>🌟 Fun Fact!</h4>
            <p>The word "sovereignty" means having control. So food sovereignty = having control over your food!</p>
          </div>
          <h3>Why Does It Matter?</h3>
          <ul>
            <li>🥕 Fresh vegetables taste better!</li>
            <li>🤝 Neighbors help each other</li>
            <li>🌍 It's good for the Earth</li>
            <li>💪 Communities become stronger</li>
          </ul>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Food Sovereignty</h2>
          <p>Food sovereignty is the right of peoples to healthy and culturally appropriate food produced through ecologically sound methods, and their right to define their own food and agriculture systems.</p>
          <div class="definition-box">
            <h3>Key Definition</h3>
            <p><strong>Food Sovereignty:</strong> The right of communities to control their own food systems, including how food is produced, distributed, and consumed.</p>
          </div>
          <h3>The Seven Pillars of Food Sovereignty</h3>
          <ol>
            <li><strong>Food for People</strong> - Food is a basic human right</li>
            <li><strong>Values Food Providers</strong> - Respects farmers and food workers</li>
            <li><strong>Localizes Food Systems</strong> - Keeps food production close to consumers</li>
            <li><strong>Local Control</strong> - Communities make their own decisions</li>
            <li><strong>Builds Knowledge & Skills</strong> - Passes down farming traditions</li>
            <li><strong>Works with Nature</strong> - Uses sustainable practices</li>
            <li><strong>Food is Sacred</strong> - Rejects treating food as just a commodity</li>
          </ol>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Food Sovereignty: A Global Movement</h2>
          <p>Food sovereignty emerged as a concept in 1996 when La Vía Campesina, an international peasant movement, introduced it at the World Food Summit. It represents an alternative to the dominant neoliberal food system.</p>
          <div class="historical-context">
            <h3>Historical Context</h3>
            <p>The concept arose in response to:</p>
            <ul>
              <li>Increasing corporate control of food systems</li>
              <li>Trade policies that harm small farmers</li>
              <li>Loss of traditional farming knowledge</li>
              <li>Environmental degradation from industrial agriculture</li>
            </ul>
          </div>
          <h3>Food Sovereignty vs. Food Security</h3>
          <table class="comparison-table">
            <tr>
              <th>Food Security</th>
              <th>Food Sovereignty</th>
            </tr>
            <tr>
              <td>Access to sufficient food</td>
              <td>Control over food systems</td>
            </tr>
            <tr>
              <td>Can rely on imports</td>
              <td>Prioritizes local production</td>
            </tr>
            <tr>
              <td>Quantity-focused</td>
              <td>Quality and culture-focused</td>
            </tr>
          </table>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Theoretical Foundations of Food Sovereignty</h2>
          <p>Food sovereignty represents a paradigm shift in how we conceptualize food systems, moving beyond the market-oriented framework of food security to embrace a rights-based approach that centers the agency of food producers and consumers.</p>
          <h3>Conceptual Framework</h3>
          <p>The food sovereignty framework challenges several assumptions of the dominant food regime:</p>
          <ul>
            <li><strong>Market Fundamentalism:</strong> Questions whether free markets efficiently allocate food resources</li>
            <li><strong>Comparative Advantage:</strong> Critiques the push for countries to specialize rather than maintain diverse food production</li>
            <li><strong>Technological Determinism:</strong> Challenges the assumption that industrial technology is the only path to food system development</li>
          </ul>
          <h3>Key Theoretical Influences</h3>
          <div class="theory-section">
            <h4>Agrarian Political Economy</h4>
            <p>Drawing from Chayanov's work on peasant economies and more recent scholars like Henry Bernstein and Philip McMichael, food sovereignty analyzes power relations in agriculture.</p>
            <h4>Post-Development Theory</h4>
            <p>Influenced by Arturo Escobar and others who critique Western development models, food sovereignty proposes alternatives rooted in local knowledge systems.</p>
          </div>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Critical Analysis of Food Sovereignty Discourse</h2>
          <p>This module examines food sovereignty through multiple analytical lenses, exploring its theoretical coherence, practical implementation challenges, and transformative potential within contemporary political economy.</p>
          <h3>Epistemological Foundations</h3>
          <p>Food sovereignty draws from diverse epistemological traditions:</p>
          <ul>
            <li><strong>Indigenous Knowledge Systems:</strong> Recognizing the validity of traditional ecological knowledge (TEK) and its integration with scientific approaches</li>
            <li><strong>Feminist Political Ecology:</strong> Analyzing gendered dimensions of food production and the invisible labor in food systems</li>
            <li><strong>Decolonial Theory:</strong> Interrogating how colonial legacies shape contemporary food regimes</li>
          </ul>
          <h3>The Scale Question</h3>
          <p>A central tension in food sovereignty scholarship concerns scale. Scholars like Madeleine Fairbairn and Joshua Sbicca examine how local food movements interface with global capital flows and transnational governance structures.</p>
          <div class="research-question">
            <h4>Key Research Questions</h4>
            <ul>
              <li>How do food sovereignty movements navigate the local-global dialectic?</li>
              <li>What institutional arrangements best support food sovereignty at different scales?</li>
              <li>How can food sovereignty address urban food access while maintaining its agrarian roots?</li>
            </ul>
          </div>
        `,
        [LearningLevel.PHD]: `
          <h2>Food Sovereignty: Ontological Politics and Counter-Hegemonic Praxis</h2>
          <p>This doctoral-level examination situates food sovereignty within broader debates on ontological politics, examining how the movement constitutes alternative world-making practices that challenge the ontological assumptions underlying industrial food systems.</p>
          <h3>Theoretical Interventions</h3>
          <h4>Beyond the Nature/Culture Binary</h4>
          <p>Drawing on Bruno Latour's actor-network theory and Donna Haraway's concept of naturecultures, we analyze how food sovereignty movements perform alternative ontologies that refuse the separation of humans from their ecological contexts.</p>
          <h4>Gramsci and Counter-Hegemony</h4>
          <p>Applying Gramscian analysis, food sovereignty can be understood as a counter-hegemonic project that challenges not merely policies but the "common sense" of neoliberal food governance. The movement constructs alternative hegemonic blocs linking peasant movements, urban food justice organizations, environmental groups, and allied intellectuals.</p>
          <h3>Methodological Considerations</h3>
          <div class="methodology-section">
            <h4>Militant Research Approaches</h4>
            <p>Following the tradition of action research and militant investigation (conricerca), researchers in food sovereignty studies increasingly adopt participatory methodologies that blur the distinction between researcher and researched, producing knowledge co-constituted with movement actors.</p>
            <h4>Multi-Sited Ethnography</h4>
            <p>George Marcus's multi-sited ethnographic approach enables tracing connections across the dispersed sites of food sovereignty activism, from peasant fields to international policy forums.</p>
          </div>
        `
      }
    }
  ],
  activities: [
    {
      id: 'fs-intro-act-1',
      title: 'Map Your Food Journey',
      type: 'DRAG_DROP',
      description: 'Trace where your food comes from and identify local alternatives',
      estimatedMinutes: 15,
      interactiveContent: {
        items: ['Supermarket Apple', 'Farmers Market Tomato', 'Backyard Herbs', 'Imported Banana', 'Community Garden Squash'],
        dropZones: ['Local (under 50 miles)', 'Regional (50-200 miles)', 'National', 'International'],
        correctPlacements: {
          'Farmers Market Tomato': 'Local (under 50 miles)',
          'Backyard Herbs': 'Local (under 50 miles)',
          'Community Garden Squash': 'Local (under 50 miles)',
          'Supermarket Apple': 'Regional (50-200 miles)',
          'Imported Banana': 'International'
        }
      }
    }
  ],
  game: {
    id: 'fs-intro-game',
    title: 'Food Sovereignty Builder',
    type: 'simulation',
    description: 'Build a food sovereign community by making strategic decisions',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'fs-intro-q1',
        question: 'What does food sovereignty primarily emphasize?',
        options: [
          'Maximizing food production through technology',
          'Community control over food systems',
          'Importing food from the cheapest sources',
          'Eliminating all traditional farming methods'
        ],
        correctAnswer: 1,
        explanation: 'Food sovereignty emphasizes the right of communities to define and control their own food systems.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      },
      {
        id: 'fs-intro-q2',
        question: 'Which organization introduced the concept of food sovereignty in 1996?',
        options: ['United Nations', 'World Trade Organization', 'La Vía Campesina', 'World Bank'],
        correctAnswer: 2,
        explanation: 'La Vía Campesina, an international peasant movement, introduced food sovereignty at the 1996 World Food Summit.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const seedSavingFundamentals: Module = {
  id: 'food-sov-seeds',
  slug: 'seed-saving-fundamentals',
  title: 'Seed Saving Fundamentals',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how to save seeds from your favorite fruits and vegetables!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover the art and science of saving seeds to grow plants year after year.',
    [LearningLevel.HIGH_SCHOOL]: 'Master seed saving techniques and understand the importance of seed biodiversity.',
    [LearningLevel.UNDERGRADUATE]: 'Explore seed biology, preservation methods, and the political economy of seeds.',
    [LearningLevel.GRADUATE]: 'Analyze seed systems, intellectual property frameworks, and seed sovereignty movements.',
    [LearningLevel.PHD]: 'Investigate seed governance, biopolitics, and the co-evolution of seeds and societies.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'seeds-1',
      title: 'The Magic of Seeds',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌱 Seeds Are Amazing!</h2>
          <p>Every giant tree, every yummy tomato, and every beautiful flower started as a tiny seed!</p>
          <div class="activity-box">
            <h3>Think About It!</h3>
            <p>Have you ever eaten a watermelon? Those black things inside are seeds! Each one could grow into a whole new watermelon plant!</p>
          </div>
          <h3>Why Save Seeds?</h3>
          <ul>
            <li>🌻 Grow the same plants next year for FREE</li>
            <li>💝 Share with friends and family</li>
            <li>🦋 Help butterflies and bees</li>
            <li>🏆 Keep special plant varieties alive</li>
          </ul>
          <div class="hands-on">
            <h3>Easy Seeds to Save</h3>
            <p>These seeds are perfect for beginners:</p>
            <ul>
              <li>Beans and Peas - just let them dry on the plant!</li>
              <li>Tomatoes - scoop them out and dry them</li>
              <li>Sunflowers - birds love to help with this one!</li>
            </ul>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Seed Biology</h2>
          <p>Seeds are nature's time capsules, containing everything needed to create a new plant. Understanding how seeds work helps us save them successfully.</p>
          <h3>Parts of a Seed</h3>
          <div class="diagram-section">
            <ul>
              <li><strong>Seed Coat:</strong> The protective outer layer</li>
              <li><strong>Embryo:</strong> The baby plant inside</li>
              <li><strong>Endosperm:</strong> Food storage for the embryo</li>
              <li><strong>Cotyledons:</strong> Seed leaves that provide initial nutrition</li>
            </ul>
          </div>
          <h3>Types of Seeds</h3>
          <table>
            <tr><th>Type</th><th>Examples</th><th>Saving Difficulty</th></tr>
            <tr><td>Dry Seeds</td><td>Beans, lettuce, sunflower</td><td>Easy</td></tr>
            <tr><td>Wet Seeds</td><td>Tomato, cucumber, squash</td><td>Medium</td></tr>
            <tr><td>Biennial Seeds</td><td>Carrot, onion, beet</td><td>Advanced</td></tr>
          </table>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Seed Saving Science and Techniques</h2>
          <p>Successful seed saving requires understanding plant reproduction, genetics, and proper storage conditions.</p>
          <h3>Open-Pollinated vs. Hybrid Seeds</h3>
          <div class="comparison">
            <div class="column">
              <h4>Open-Pollinated (OP)</h4>
              <ul>
                <li>Plants breed true from seed</li>
                <li>Can be saved year after year</li>
                <li>Include heirloom varieties</li>
                <li>Maintain genetic diversity</li>
              </ul>
            </div>
            <div class="column">
              <h4>Hybrid (F1)</h4>
              <ul>
                <li>Cross between two different parent lines</li>
                <li>Seeds don't breed true</li>
                <li>Must be purchased annually</li>
                <li>Often have specific traits (disease resistance, uniformity)</li>
              </ul>
            </div>
          </div>
          <h3>Preventing Cross-Pollination</h3>
          <p>To maintain variety purity, prevent cross-pollination through:</p>
          <ul>
            <li><strong>Isolation Distance:</strong> Plant varieties far apart (50-1000+ feet depending on crop)</li>
            <li><strong>Time Isolation:</strong> Stagger planting so varieties flower at different times</li>
            <li><strong>Physical Barriers:</strong> Use bags or cages to prevent pollen transfer</li>
            <li><strong>Hand Pollination:</strong> Manually transfer pollen and protect flowers</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Seed Systems and Agrobiodiversity</h2>
          <p>This module examines seeds as both biological entities and social artifacts, exploring how seed systems shape and are shaped by political, economic, and cultural forces.</p>
          <h3>The Political Economy of Seeds</h3>
          <p>The twentieth century witnessed a dramatic transformation in seed systems:</p>
          <ul>
            <li><strong>1930s-1960s:</strong> Public plant breeding programs and the Green Revolution</li>
            <li><strong>1970s-1980s:</strong> Rise of private seed companies and intellectual property protections</li>
            <li><strong>1990s-Present:</strong> Consolidation, GMO introduction, and seed sovereignty movements</li>
          </ul>
          <h3>Intellectual Property and Seeds</h3>
          <div class="legal-framework">
            <h4>Key Legal Mechanisms</h4>
            <ul>
              <li><strong>Plant Variety Protection (PVP):</strong> Grants breeders rights while allowing farmer seed saving</li>
              <li><strong>Utility Patents:</strong> Stronger protection, restricts all reproduction</li>
              <li><strong>Trade Secrets:</strong> Protect parent lines of hybrids</li>
              <li><strong>Contracts:</strong> Technology use agreements limiting farmer practices</li>
            </ul>
          </div>
          <h3>Seed Sovereignty Movements</h3>
          <p>In response to corporate concentration, diverse movements have emerged advocating for farmer rights to save, exchange, and sell seeds. Key organizations include Navdanya (India), Seed Savers Exchange (USA), and the global Seed Freedom movement.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Critical Seed Studies</h2>
          <p>This graduate seminar situates seeds within broader debates on biopolitics, commons governance, and post-capitalist transitions.</p>
          <h3>Seeds as Commons</h3>
          <p>Drawing on Ostrom's work on common pool resources and subsequent scholarship on knowledge commons, we examine how seed systems can be governed as commons rather than private property or open access regimes.</p>
          <div class="theoretical-framework">
            <h4>Open Source Seed Initiative (OSSI)</h4>
            <p>The OSSI applies open-source principles to seeds, using a "pledge" that keeps seeds free for future use, modification, and sharing. This raises questions about:</p>
            <ul>
              <li>Can legal mechanisms designed for software translate to biological entities?</li>
              <li>How do open-source seeds interact with patent regimes?</li>
              <li>What are the limits of legal strategies for seed liberation?</li>
            </ul>
          </div>
          <h3>Seed Banks and Ex Situ Conservation</h3>
          <p>Critically analyze the role of gene banks (e.g., Svalbard Global Seed Vault) in agrobiodiversity conservation, examining debates about access, benefit-sharing, and the relationship between ex situ and in situ conservation.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Seed Ontologies and Biopolitical Futures</h2>
          <p>This doctoral seminar explores seeds as sites where biological, legal, economic, and political forces intersect, examining how different "seed ontologies" produce different socio-ecological futures.</p>
          <h3>Seeds and Biopolitics</h3>
          <p>Following Foucault and subsequent scholars, we analyze how seeds have become objects of biopower:</p>
          <ul>
            <li><strong>Disciplinary Power:</strong> Standardization of varieties, certification systems, and "improved" seed promotion</li>
            <li><strong>Biopolitics of Population:</strong> How seed regulations govern not just plants but farmer populations and practices</li>
            <li><strong>Necropolitics:</strong> Achille Mbembe's framework applied to seed systems—how some varieties and associated lifeways are allowed to die</li>
          </ul>
          <h3>Multispecies Ethnography and Seeds</h3>
          <p>Drawing on Anna Tsing, Donna Haraway, and multispecies studies, examine seeds as more-than-human actors in complex ecological and social assemblages.</p>
          <div class="research-directions">
            <h4>Emerging Research Questions</h4>
            <ul>
              <li>How do gene editing technologies (CRISPR) reconfigure seed governance debates?</li>
              <li>What role can seeds play in climate adaptation and resilience?</li>
              <li>How are indigenous seed keepers articulating seed sovereignty with broader self-determination struggles?</li>
            </ul>
          </div>
        `
      }
    }
  ],
  activities: [
    {
      id: 'seeds-act-1',
      title: 'Seed Identification Challenge',
      type: 'DRAG_DROP',
      description: 'Match seeds to their plants and categorize by saving difficulty',
      estimatedMinutes: 15,
      interactiveContent: {
        items: ['Tomato Seeds', 'Bean Seeds', 'Carrot Seeds', 'Lettuce Seeds', 'Squash Seeds'],
        dropZones: ['Easy to Save', 'Medium Difficulty', 'Advanced'],
        correctPlacements: {
          'Bean Seeds': 'Easy to Save',
          'Lettuce Seeds': 'Easy to Save',
          'Tomato Seeds': 'Medium Difficulty',
          'Squash Seeds': 'Medium Difficulty',
          'Carrot Seeds': 'Advanced'
        }
      }
    }
  ],
  game: {
    id: 'seeds-game',
    title: 'Seed Saver Quest',
    type: 'simulation',
    description: 'Manage a seed library and preserve heirloom varieties',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'seeds-q1',
        question: 'Why can\'t you reliably save seeds from hybrid (F1) plants?',
        options: [
          'The seeds are sterile',
          'The seeds don\'t breed true - offspring vary unpredictably',
          'It\'s illegal to save hybrid seeds',
          'Hybrid seeds only last one season'
        ],
        correctAnswer: 1,
        explanation: 'Hybrid seeds don\'t breed true because they result from crossing two different parent lines. The offspring segregate and show variable traits.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const communityGardens: Module = {
  id: 'food-sov-community-gardens',
  slug: 'community-gardens',
  title: 'Community Gardens',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover how neighbors work together to grow food in shared gardens!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn how community gardens bring people together and provide fresh food for neighborhoods.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the social, environmental, and economic benefits of community gardening programs.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze community gardens as sites of urban agriculture, social capital formation, and food justice.',
    [LearningLevel.GRADUATE]: 'Examine community gardens through lenses of urban political ecology, commons governance, and spatial justice.',
    [LearningLevel.PHD]: 'Investigate community gardens as laboratories for alternative urban futures and post-capitalist food provisioning.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 30,
    [LearningLevel.HIGH_SCHOOL]: 45,
    [LearningLevel.UNDERGRADUATE]: 60,
    [LearningLevel.GRADUATE]: 90,
    [LearningLevel.PHD]: 120
  },
  lessons: [
    {
      id: 'cg-1',
      title: 'What is a Community Garden?',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌻 Gardens Where Everyone Helps!</h2>
          <p>Imagine a big garden where all your neighbors come together to grow vegetables, fruits, and flowers. That's a community garden!</p>
          <div class="fun-activity">
            <h3>What Happens in Community Gardens?</h3>
            <ul>
              <li>🥕 People grow their own vegetables</li>
              <li>👨‍👩‍👧‍👦 Families work together</li>
              <li>🤝 Neighbors become friends</li>
              <li>🦋 Butterflies and bees visit</li>
              <li>📚 Kids learn about nature</li>
            </ul>
          </div>
          <div class="did-you-know">
            <h3>Did You Know?</h3>
            <p>Some community gardens are on rooftops! Others are in empty lots that used to have nothing growing.</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Community Gardens: Growing Together</h2>
          <p>Community gardens are shared spaces where people come together to grow food, flowers, and friendships. They transform unused land into productive green spaces.</p>
          <h3>Types of Community Gardens</h3>
          <ul>
            <li><strong>Allotment Gardens:</strong> Divided into individual plots for families</li>
            <li><strong>Collective Gardens:</strong> Everyone works together on shared beds</li>
            <li><strong>School Gardens:</strong> Educational spaces for students</li>
            <li><strong>Therapeutic Gardens:</strong> Designed for healing and wellness</li>
          </ul>
          <h3>Benefits of Community Gardens</h3>
          <table>
            <tr><th>Category</th><th>Benefits</th></tr>
            <tr><td>Health</td><td>Fresh food, exercise, stress relief</td></tr>
            <tr><td>Social</td><td>Meeting neighbors, building community</td></tr>
            <tr><td>Environmental</td><td>Green space, wildlife habitat, less food miles</td></tr>
            <tr><td>Economic</td><td>Lower food costs, property values increase</td></tr>
          </table>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Community Gardens: Social Infrastructure</h2>
          <p>Community gardens serve as vital social infrastructure in urban environments, providing far more than just food production.</p>
          <h3>Historical Context</h3>
          <p>Community gardening has deep roots:</p>
          <ul>
            <li><strong>Victory Gardens (1940s):</strong> 20 million Americans grew food during WWII</li>
            <li><strong>1970s Revival:</strong> Urban decay led to reclaiming vacant lots</li>
            <li><strong>Today:</strong> Over 18,000 community gardens in the US alone</li>
          </ul>
          <h3>Starting a Community Garden</h3>
          <ol>
            <li>Form a planning committee</li>
            <li>Identify potential sites and secure land access</li>
            <li>Test soil for contamination</li>
            <li>Design the layout with community input</li>
            <li>Establish governance rules</li>
            <li>Secure water access and tools</li>
            <li>Recruit gardeners and assign plots</li>
          </ol>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Community Gardens and Urban Food Systems</h2>
          <p>This module examines community gardens as multifunctional spaces that intersect with urban planning, public health, environmental justice, and community development.</p>
          <h3>Theoretical Frameworks</h3>
          <h4>Social Capital Theory</h4>
          <p>Following Putnam and others, community gardens can be analyzed as generators of bonding social capital (within communities) and bridging social capital (across different groups).</p>
          <h4>Urban Political Ecology</h4>
          <p>Drawing on Swyngedouw and Heynen, we examine how community gardens reshape urban metabolisms and contest dominant patterns of urban nature production.</p>
          <h3>Food Justice Dimensions</h3>
          <p>Community gardens often emerge in "food deserts" - areas lacking access to fresh, affordable food. They represent grassroots responses to food system inequities, though scholars debate whether they address root causes or merely symptoms.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Critical Perspectives on Community Gardens</h2>
          <p>This seminar applies critical urban theory to examine community gardens, exploring tensions between their emancipatory potential and their possible roles in gentrification and neoliberal urbanism.</p>
          <h3>The Gentrification Debate</h3>
          <p>Scholars like Nathan McClintock have documented how community gardens can contribute to "environmental gentrification" - improving neighborhoods in ways that increase property values and displace long-term residents.</p>
          <h3>Governance and the Commons</h3>
          <p>Community gardens represent urban commons that must negotiate with state and market forces. Key questions include:</p>
          <ul>
            <li>How do gardens maintain autonomy while securing land tenure?</li>
            <li>What governance structures best balance individual and collective needs?</li>
            <li>How do gardens navigate municipal regulations and liability concerns?</li>
          </ul>
        `,
        [LearningLevel.PHD]: `
          <h2>Community Gardens as Prefigurative Politics</h2>
          <p>This doctoral seminar examines community gardens through the lens of prefigurative politics - practices that embody the social relations of a desired future society within present-day organizing.</p>
          <h3>Theoretical Approaches</h3>
          <h4>Right to the City</h4>
          <p>Drawing on Lefebvre and Harvey, community gardens can be understood as assertions of the right to the city - claims to participate in shaping urban space rather than merely consuming it.</p>
          <h4>Assemblage Theory</h4>
          <p>Following DeLanda and others, we analyze community gardens as socio-material assemblages where human and non-human actors interact to produce emergent properties and capacities.</p>
          <h3>Methodological Innovations</h3>
          <p>Research on community gardens has pioneered participatory and arts-based methods including photovoice, community mapping, and collaborative ethnography.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'cg-act-1',
      title: 'Design Your Community Garden',
      type: 'SIMULATION',
      description: 'Plan and design a community garden layout for your neighborhood',
      estimatedMinutes: 20,
      interactiveContent: {
        scenario: 'You have a 50x100 foot vacant lot. Design a community garden that includes vegetable plots, a gathering space, composting area, and tool shed.',
        elements: ['Raised Beds', 'Pathways', 'Compost Bins', 'Tool Shed', 'Seating Area', 'Water Source', 'Signage', 'Fence'],
        constraints: { budget: 5000, plotCount: 20 }
      }
    }
  ],
  game: {
    id: 'cg-game',
    title: 'Garden Community Builder',
    type: 'simulation',
    description: 'Manage a community garden through the seasons',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'cg-q1',
        question: 'What are Victory Gardens?',
        options: [
          'Gardens that won competitions',
          'Gardens planted during WWII to supplement food supplies',
          'Gardens only for military veterans',
          'Gardens with victory flags'
        ],
        correctAnswer: 1,
        explanation: 'Victory Gardens were planted during World War II by citizens to supplement food supplies and boost morale.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const urbanFarming: Module = {
  id: 'food-sov-urban-farming',
  slug: 'urban-farming-basics',
  title: 'Urban Farming Basics',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how people grow food in cities - even on rooftops and walls!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover innovative ways cities are becoming food producers through urban agriculture.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore urban farming techniques, from rooftop gardens to vertical farms and aquaponics.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze urban agriculture systems, their economic viability, and role in urban food security.',
    [LearningLevel.GRADUATE]: 'Examine urban farming through food systems analysis, urban metabolism, and sustainability transitions.',
    [LearningLevel.PHD]: 'Investigate urban agriculture as socio-technical innovation and its implications for urban futures.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'uf-1',
      title: 'Farming in the City',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🏙️ Farms in Surprising Places!</h2>
          <p>Did you know you can grow food in a city? People are growing vegetables in amazing places!</p>
          <h3>Where Can City Farms Be?</h3>
          <ul>
            <li>🏢 On rooftops of buildings</li>
            <li>🧱 On walls going up and up</li>
            <li>📦 In shipping containers</li>
            <li>🏠 In backyards and balconies</li>
            <li>🅿️ In old parking lots</li>
          </ul>
          <div class="cool-fact">
            <h3>Cool Fact!</h3>
            <p>Some restaurants grow their vegetables on their own rooftop! The chef can pick fresh tomatoes right before cooking!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Urban Agriculture: Growing Food in Cities</h2>
          <p>Urban farming is the practice of growing food within cities. As cities grow and concerns about food systems increase, urban agriculture is becoming more important.</p>
          <h3>Types of Urban Farming</h3>
          <ul>
            <li><strong>Rooftop Farms:</strong> Converting flat roofs into productive gardens</li>
            <li><strong>Vertical Farms:</strong> Growing crops in stacked layers, often indoors</li>
            <li><strong>Container Farms:</strong> Shipping containers converted to grow rooms</li>
            <li><strong>Aquaponics:</strong> Combining fish farming with plant growing</li>
            <li><strong>Hydroponics:</strong> Growing plants in water without soil</li>
          </ul>
          <h3>Benefits of Urban Farming</h3>
          <ul>
            <li>Reduces food transportation ("food miles")</li>
            <li>Provides fresh produce to urban residents</li>
            <li>Creates green jobs in cities</li>
            <li>Reduces urban heat island effect</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Urban Agriculture Systems</h2>
          <p>Modern urban farming uses innovative technologies to maximize production in limited spaces.</p>
          <h3>Controlled Environment Agriculture (CEA)</h3>
          <p>CEA encompasses technologies that control growing conditions:</p>
          <ul>
            <li><strong>LED Lighting:</strong> Tuned to specific wavelengths for optimal plant growth</li>
            <li><strong>Climate Control:</strong> Temperature, humidity, and CO2 management</li>
            <li><strong>Automated Systems:</strong> Nutrient delivery, irrigation, and monitoring</li>
          </ul>
          <h3>Comparing Urban Farming Methods</h3>
          <table>
            <tr><th>Method</th><th>Space Efficiency</th><th>Water Use</th><th>Startup Cost</th></tr>
            <tr><td>Rooftop Soil</td><td>Low</td><td>Medium</td><td>Low</td></tr>
            <tr><td>Hydroponics</td><td>High</td><td>Low</td><td>Medium</td></tr>
            <tr><td>Vertical Farm</td><td>Very High</td><td>Very Low</td><td>High</td></tr>
            <tr><td>Aquaponics</td><td>Medium</td><td>Very Low</td><td>Medium</td></tr>
          </table>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Urban Agriculture Economics and Policy</h2>
          <p>This module examines the economic viability of urban farming operations and the policy frameworks that support or hinder urban agriculture development.</p>
          <h3>Economic Analysis</h3>
          <p>Urban farms face unique economic conditions:</p>
          <ul>
            <li><strong>High Land Costs:</strong> Urban real estate prices challenge profitability</li>
            <li><strong>Premium Markets:</strong> Access to restaurants, farmers markets, and CSAs</li>
            <li><strong>Value-Added Products:</strong> Processing increases revenue per square foot</li>
            <li><strong>Ecosystem Services:</strong> Stormwater management, cooling, and biodiversity benefits often uncompensated</li>
          </ul>
          <h3>Policy Landscape</h3>
          <p>Urban agriculture intersects multiple policy domains:</p>
          <ul>
            <li>Zoning and land use regulations</li>
            <li>Food safety and licensing requirements</li>
            <li>Water rights and access</li>
            <li>Tax incentives and subsidies</li>
          </ul>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Urban Food Systems and Sustainability Transitions</h2>
          <p>This seminar situates urban agriculture within broader frameworks of sustainability transitions and urban metabolism.</p>
          <h3>Multi-Level Perspective</h3>
          <p>Applying Geels' multi-level perspective, urban agriculture represents a niche innovation challenging the dominant regime of industrial food production. Analysis considers:</p>
          <ul>
            <li>How urban ag niches develop and scale</li>
            <li>Regime resistance and co-optation</li>
            <li>Landscape pressures enabling transition</li>
          </ul>
          <h3>Urban Metabolism</h3>
          <p>Urban agriculture can be analyzed as an intervention in urban metabolism - the flows of materials and energy through cities. Questions include how urban ag affects nutrient cycling, waste streams, and energy use.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Urban Agriculture Futures</h2>
          <p>This doctoral seminar examines divergent trajectories for urban agriculture development and their implications for urban sustainability and justice.</p>
          <h3>Competing Visions</h3>
          <h4>High-Tech Vertical Farming</h4>
          <p>Capital-intensive, controlled environment production promising massive yields but raising questions about energy use, corporate control, and labor conditions.</p>
          <h4>Agroecological Urban Farming</h4>
          <p>Low-input, knowledge-intensive approaches emphasizing ecological principles, community control, and traditional knowledge.</p>
          <h3>Critical Questions</h3>
          <ul>
            <li>Can urban agriculture meaningfully contribute to urban food security at scale?</li>
            <li>How do different urban ag models distribute benefits and risks?</li>
            <li>What governance arrangements best support equitable urban food systems?</li>
          </ul>
        `
      }
    }
  ],
  activities: [
    {
      id: 'uf-act-1',
      title: 'Urban Farm Business Plan',
      type: 'SCENARIO',
      description: 'Develop a business plan for an urban farming operation',
      estimatedMinutes: 25,
      interactiveContent: {
        scenario: 'You have access to a 10,000 sq ft warehouse in a food desert neighborhood. Design an urban farm operation.',
        decisions: ['Growing Method', 'Crop Selection', 'Market Strategy', 'Staffing', 'Community Programs']
      }
    }
  ],
  game: {
    id: 'uf-game',
    title: 'Urban Farm Tycoon',
    type: 'simulation',
    description: 'Build and manage your urban farming empire',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'uf-q1',
        question: 'What is aquaponics?',
        options: [
          'Growing plants in water only',
          'A system combining fish farming with plant growing',
          'Underwater gardening',
          'Using aquariums for decoration'
        ],
        correctAnswer: 1,
        explanation: 'Aquaponics combines aquaculture (fish farming) with hydroponics. Fish waste provides nutrients for plants, and plants filter water for fish.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const foodPreservation: Module = {
  id: 'food-sov-preservation',
  slug: 'food-preservation-techniques',
  title: 'Food Preservation Techniques',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn fun ways to make food last longer - like making pickles and jam!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover the science behind food preservation methods used for thousands of years.',
    [LearningLevel.HIGH_SCHOOL]: 'Master various food preservation techniques and understand the biology behind them.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze food preservation through food science, cultural practices, and food security lenses.',
    [LearningLevel.GRADUATE]: 'Examine food preservation as technology, tradition, and resistance to industrial food systems.',
    [LearningLevel.PHD]: 'Investigate food preservation as material culture and its role in food sovereignty movements.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'fp-1',
      title: 'Keeping Food Fresh',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🥒 Making Food Last!</h2>
          <p>Have you ever wondered how we can eat strawberry jam in winter when strawberries only grow in summer? That's food preservation!</p>
          <h3>Ways to Keep Food</h3>
          <ul>
            <li>❄️ <strong>Freezing:</strong> Making food super cold</li>
            <li>☀️ <strong>Drying:</strong> Taking water out (like raisins!)</li>
            <li>🥒 <strong>Pickling:</strong> Using vinegar to keep vegetables crunchy</li>
            <li>🍯 <strong>Jamming:</strong> Cooking fruit with sugar</li>
            <li>🧂 <strong>Salting:</strong> Salt keeps food safe</li>
          </ul>
          <div class="try-this">
            <h3>Try This!</h3>
            <p>Put a grape in the freezer and another in the sun for a few days. What happens to each one?</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>The Science of Food Preservation</h2>
          <p>Food spoils because of microorganisms (bacteria, mold, yeast) and enzymes. Preservation methods stop or slow these processes.</p>
          <h3>How Preservation Works</h3>
          <table>
            <tr><th>Method</th><th>How It Works</th><th>Examples</th></tr>
            <tr><td>Freezing</td><td>Slows microbe growth</td><td>Frozen vegetables, ice cream</td></tr>
            <tr><td>Drying</td><td>Removes water microbes need</td><td>Jerky, dried fruit, herbs</td></tr>
            <tr><td>Canning</td><td>Heat kills microbes, seal keeps them out</td><td>Tomato sauce, beans</td></tr>
            <tr><td>Pickling</td><td>Acid prevents growth</td><td>Pickles, sauerkraut</td></tr>
            <tr><td>Fermentation</td><td>Good bacteria outcompete bad ones</td><td>Yogurt, kimchi</td></tr>
          </table>
          <h3>Why pH Matters</h3>
          <p>Acidity (measured by pH) is crucial in preservation. Most harmful bacteria can't survive below pH 4.6, which is why pickles and fermented foods are safe.</p>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Food Preservation Science and Safety</h2>
          <p>Understanding the science behind preservation is essential for food safety and quality.</p>
          <h3>Water Activity (aw)</h3>
          <p>Water activity measures available water for microbial growth. Most bacteria need aw > 0.91:</p>
          <ul>
            <li>Fresh foods: 0.95-1.00</li>
            <li>Jam: 0.80-0.85</li>
            <li>Dried fruit: 0.60-0.70</li>
            <li>Crackers: 0.30-0.40</li>
          </ul>
          <h3>Canning Safety</h3>
          <p>Botulism is the main concern with home canning. The bacterium Clostridium botulinum produces deadly toxin in low-oxygen, low-acid environments.</p>
          <ul>
            <li><strong>High-acid foods (pH < 4.6):</strong> Water bath canning is safe</li>
            <li><strong>Low-acid foods (pH > 4.6):</strong> Must use pressure canning at 240°F</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Food Preservation: Science, Culture, and Security</h2>
          <p>This module examines food preservation as both technical practice and cultural tradition, exploring its role in food security and sovereignty.</p>
          <h3>Historical Significance</h3>
          <p>Preservation technologies shaped human civilization:</p>
          <ul>
            <li>Enabled settlement and urbanization</li>
            <li>Facilitated trade and exploration</li>
            <li>Created seasonal food security</li>
            <li>Developed distinct culinary traditions</li>
          </ul>
          <h3>Industrial vs. Traditional Preservation</h3>
          <p>The industrialization of food preservation transformed food systems through:</p>
          <ul>
            <li>Standardization and scale</li>
            <li>Loss of traditional knowledge</li>
            <li>Shift from preservation to processing</li>
            <li>Introduction of chemical preservatives</li>
          </ul>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Food Preservation as Resistance</h2>
          <p>This seminar examines the revival of traditional food preservation as a form of resistance to industrial food systems and an assertion of food sovereignty.</p>
          <h3>Fermentation Revival</h3>
          <p>The contemporary fermentation movement (Sandor Katz, etc.) can be analyzed as:</p>
          <ul>
            <li>Reclaiming traditional knowledge</li>
            <li>Challenging industrial food safety regimes</li>
            <li>Creating alternative food networks</li>
            <li>Connecting to gut microbiome health discourse</li>
          </ul>
          <h3>Regulatory Tensions</h3>
          <p>Traditional preservation practices often conflict with food safety regulations designed for industrial production, raising questions about whose knowledge counts.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Preservation, Temporality, and Food Futures</h2>
          <p>This doctoral seminar examines food preservation through lenses of temporality, material culture, and anticipatory governance.</p>
          <h3>Temporal Politics of Food</h3>
          <p>Preservation practices embody particular orientations toward time:</p>
          <ul>
            <li>Industrial preservation: extending shelf life for supply chain logistics</li>
            <li>Traditional preservation: seasonal rhythms and intergenerational knowledge</li>
            <li>Prepper preservation: apocalyptic anticipation and survival</li>
          </ul>
          <h3>Material Culture Approaches</h3>
          <p>Following scholars like Susanne Freidberg, we examine how preservation technologies (canning jars, root cellars, freezers) shape social relations and food cultures.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'fp-act-1',
      title: 'Preservation Method Matcher',
      type: 'DRAG_DROP',
      description: 'Match foods to their best preservation methods',
      estimatedMinutes: 15,
      interactiveContent: {
        items: ['Fresh Tomatoes', 'Cucumbers', 'Berries', 'Herbs', 'Cabbage', 'Apples'],
        dropZones: ['Canning', 'Pickling', 'Freezing', 'Drying', 'Fermenting', 'Root Cellar'],
        correctPlacements: {
          'Fresh Tomatoes': 'Canning',
          'Cucumbers': 'Pickling',
          'Berries': 'Freezing',
          'Herbs': 'Drying',
          'Cabbage': 'Fermenting',
          'Apples': 'Root Cellar'
        }
      }
    }
  ],
  game: {
    id: 'fp-game',
    title: 'Preservation Challenge',
    type: 'timed_challenge',
    description: 'Preserve your harvest before it spoils!',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'fp-q1',
        question: 'Why is pH important in food preservation?',
        options: [
          'It affects the color of food',
          'Most harmful bacteria cannot survive in acidic (low pH) environments',
          'It makes food taste better',
          'It determines how long to cook food'
        ],
        correctAnswer: 1,
        explanation: 'Acidity is crucial for food safety. Most pathogenic bacteria, including Clostridium botulinum, cannot grow below pH 4.6.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const fermentationCulturedFoods: Module = {
  id: 'food-sov-fermentation',
  slug: 'fermentation-cultured-foods',
  title: 'Fermentation & Cultured Foods',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover how tiny helpers called bacteria make yummy foods like yogurt and pickles!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn the science of fermentation and how to make your own cultured foods at home.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the microbiology of fermentation and master traditional fermentation techniques.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze fermentation science, health implications, and cultural significance of fermented foods.',
    [LearningLevel.GRADUATE]: 'Examine fermentation through lenses of food microbiology, traditional knowledge, and food sovereignty.',
    [LearningLevel.PHD]: 'Investigate fermentation as biocultural practice and its role in decolonizing food systems.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 40,
    [LearningLevel.HIGH_SCHOOL]: 55,
    [LearningLevel.UNDERGRADUATE]: 75,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'ferm-1',
      title: 'The Magic of Fermentation',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🦠 Tiny Helpers Making Yummy Food!</h2>
          <p>Did you know there are tiny living things called bacteria that help make some of your favorite foods? They're so small you can't see them!</p>
          <h3>Foods Made by Tiny Helpers</h3>
          <ul>
            <li>🥛 <strong>Yogurt:</strong> Bacteria make milk thick and tangy</li>
            <li>🥒 <strong>Pickles:</strong> Cucumbers get crunchy and sour</li>
            <li>🧀 <strong>Cheese:</strong> Milk becomes solid and delicious</li>
            <li>🍞 <strong>Bread:</strong> Yeast makes it fluffy with bubbles</li>
            <li>🥬 <strong>Kimchi:</strong> Spicy Korean vegetables</li>
          </ul>
          <div class="fun-experiment">
            <h3>Watch It Bubble!</h3>
            <p>Mix warm water, sugar, and a packet of yeast. Watch the bubbles appear - that's the yeast eating sugar and burping out gas!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Fermentation</h2>
          <p>Fermentation is an ancient food preservation method where microorganisms (bacteria, yeast, or mold) transform food, creating new flavors and extending shelf life.</p>
          <h3>Types of Fermentation</h3>
          <ul>
            <li><strong>Lactic Acid Fermentation:</strong> Bacteria convert sugars to lactic acid (yogurt, sauerkraut, kimchi)</li>
            <li><strong>Alcoholic Fermentation:</strong> Yeast converts sugars to alcohol and CO2 (bread, beer, wine)</li>
            <li><strong>Acetic Acid Fermentation:</strong> Bacteria convert alcohol to vinegar</li>
          </ul>
          <h3>Why Fermented Foods Are Safe</h3>
          <p>The good bacteria in fermentation:</p>
          <ul>
            <li>Produce acids that prevent harmful bacteria growth</li>
            <li>Outcompete pathogens for nutrients</li>
            <li>Create an environment too acidic for spoilage</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Fermentation Microbiology</h2>
          <p>Understanding the microorganisms involved in fermentation enables safe and successful fermentation practice.</p>
          <h3>Key Microorganisms</h3>
          <table>
            <tr><th>Organism</th><th>Type</th><th>Products</th></tr>
            <tr><td>Lactobacillus</td><td>Bacteria</td><td>Yogurt, sauerkraut, pickles</td></tr>
            <tr><td>Saccharomyces cerevisiae</td><td>Yeast</td><td>Bread, beer, wine</td></tr>
            <tr><td>Acetobacter</td><td>Bacteria</td><td>Vinegar, kombucha</td></tr>
            <tr><td>Aspergillus</td><td>Mold</td><td>Soy sauce, miso, sake</td></tr>
          </table>
          <h3>Controlling Fermentation</h3>
          <ul>
            <li><strong>Salt:</strong> Controls which bacteria can grow (2-3% for vegetables)</li>
            <li><strong>Temperature:</strong> Affects speed and flavor development</li>
            <li><strong>Oxygen:</strong> Most ferments are anaerobic (no oxygen)</li>
            <li><strong>Time:</strong> Longer fermentation = stronger flavors</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Fermentation Science and Health</h2>
          <p>This module examines the biochemistry of fermentation, its health implications, and its role in traditional food systems.</p>
          <h3>Biochemistry of Lactic Acid Fermentation</h3>
          <p>In lactic acid fermentation, Lactobacillus bacteria convert glucose to lactic acid via the glycolysis pathway, producing 2 ATP per glucose molecule without oxygen.</p>
          <h3>Health Implications</h3>
          <ul>
            <li><strong>Probiotics:</strong> Live beneficial bacteria supporting gut microbiome</li>
            <li><strong>Nutrient Bioavailability:</strong> Fermentation can increase absorption of minerals</li>
            <li><strong>Reduced Antinutrients:</strong> Fermentation breaks down phytic acid and other compounds</li>
            <li><strong>Immune Function:</strong> Gut bacteria influence systemic immunity</li>
          </ul>
          <h3>Cultural Significance</h3>
          <p>Nearly every culture has traditional fermented foods, representing accumulated knowledge about local ingredients, climates, and microbial communities.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Fermentation, Knowledge, and Power</h2>
          <p>This seminar examines fermentation through the lens of knowledge production, examining tensions between traditional practices and industrial food science.</p>
          <h3>Epistemological Questions</h3>
          <p>Fermentation raises questions about what counts as knowledge:</p>
          <ul>
            <li>Traditional fermenters work with complex microbial communities they may not name scientifically</li>
            <li>Scientific approaches isolate single strains and control variables</li>
            <li>Both produce successful ferments through different epistemologies</li>
          </ul>
          <h3>Regulation and Traditional Foods</h3>
          <p>Food safety regulations often conflict with traditional fermentation practices, privileging industrial production models and potentially threatening food sovereignty.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Fermentation as Biocultural Practice</h2>
          <p>This doctoral seminar examines fermentation as a site where biology, culture, and politics intersect, drawing on multispecies studies and food sovereignty frameworks.</p>
          <h3>Multispecies Relations</h3>
          <p>Following Haraway and Tsing, fermentation can be understood as collaborative survival across species boundaries. Humans, bacteria, and yeasts co-constitute fermentation assemblages through mutual transformation.</p>
          <h3>Decolonizing Fermentation</h3>
          <p>The contemporary fermentation revival raises questions about appropriation and authenticity. How do we honor traditional knowledge holders while making fermentation accessible? What are the politics of who teaches and profits from fermentation?</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'ferm-act-1',
      title: 'Fermentation Lab',
      type: 'STEP_GUIDED',
      description: 'Follow step-by-step instructions to start your own fermentation project',
      estimatedMinutes: 30,
      interactiveContent: {
        steps: [
          'Choose your fermentation project (sauerkraut, pickles, or yogurt)',
          'Gather ingredients and equipment',
          'Prepare vegetables or milk',
          'Add salt or starter culture',
          'Create anaerobic environment',
          'Monitor daily and record observations'
        ]
      }
    }
  ],
  game: {
    id: 'ferm-game',
    title: 'Fermentation Station',
    type: 'simulation',
    description: 'Manage a fermentation kitchen and create perfect batches',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'ferm-q1',
        question: 'What type of fermentation produces lactic acid?',
        options: [
          'Alcoholic fermentation by yeast',
          'Lactic acid fermentation by Lactobacillus bacteria',
          'Acetic acid fermentation',
          'Mold fermentation'
        ],
        correctAnswer: 1,
        explanation: 'Lactobacillus bacteria perform lactic acid fermentation, converting sugars to lactic acid. This process makes yogurt, sauerkraut, and kimchi.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const localFoodNetworks: Module = {
  id: 'food-sov-local-networks',
  slug: 'local-food-networks',
  title: 'Local Food Networks',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how farmers and neighbors share food in your community!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how local food systems connect farmers directly with people who eat their food.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore alternative food networks including CSAs, farmers markets, and food hubs.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze local food systems through supply chain, economic, and social movement lenses.',
    [LearningLevel.GRADUATE]: 'Examine alternative food networks as sites of contestation within dominant food regimes.',
    [LearningLevel.PHD]: 'Investigate the scalar politics of local food and its relationship to food sovereignty.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 30,
    [LearningLevel.HIGH_SCHOOL]: 45,
    [LearningLevel.UNDERGRADUATE]: 65,
    [LearningLevel.GRADUATE]: 90,
    [LearningLevel.PHD]: 120
  },
  lessons: [
    {
      id: 'lfn-1',
      title: 'Connecting Farms to Families',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🚜 From Farm to Your Table!</h2>
          <p>Have you ever wondered where your food comes from? Sometimes it travels thousands of miles! But there are ways to get food from farms near you.</p>
          <h3>Ways to Get Local Food</h3>
          <ul>
            <li>🧺 <strong>Farmers Markets:</strong> Farmers bring their food to sell in your town</li>
            <li>📦 <strong>Farm Boxes:</strong> A box of fresh veggies delivered to your door</li>
            <li>🏫 <strong>Farm Visits:</strong> Go see where food grows!</li>
            <li>🍎 <strong>Pick Your Own:</strong> Pick apples, berries, or pumpkins yourself</li>
          </ul>
          <div class="fun-fact">
            <h3>Did You Know?</h3>
            <p>When you buy from a farmer at a market, they get to keep more money than when they sell to a big store!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Local Food Systems</h2>
          <p>Local food systems are networks that connect food producers directly with consumers in a geographic region, typically defined as within 100-400 miles.</p>
          <h3>Types of Direct-to-Consumer Sales</h3>
          <ul>
            <li><strong>Farmers Markets:</strong> Regular markets where multiple farmers sell directly</li>
            <li><strong>Community Supported Agriculture (CSA):</strong> Customers buy a "share" of a farm's harvest</li>
            <li><strong>Farm Stands:</strong> On-farm retail sales</li>
            <li><strong>U-Pick Operations:</strong> Customers harvest their own produce</li>
          </ul>
          <h3>Benefits of Local Food</h3>
          <table>
            <tr><th>Benefit</th><th>How It Works</th></tr>
            <tr><td>Fresher Food</td><td>Less time between harvest and eating</td></tr>
            <tr><td>Supports Local Economy</td><td>Money stays in the community</td></tr>
            <tr><td>Lower Carbon Footprint</td><td>Less transportation needed</td></tr>
            <tr><td>Builds Relationships</td><td>Know who grows your food</td></tr>
          </table>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Alternative Food Networks</h2>
          <p>Alternative food networks (AFNs) represent efforts to create food systems outside the dominant industrial model.</p>
          <h3>Food Hub Models</h3>
          <p>Food hubs aggregate, distribute, and market local food from multiple producers:</p>
          <ul>
            <li><strong>Aggregation:</strong> Combine products from many small farms</li>
            <li><strong>Distribution:</strong> Efficient delivery to multiple buyers</li>
            <li><strong>Marketing:</strong> Brand and sell local food collectively</li>
          </ul>
          <h3>Institutional Procurement</h3>
          <p>Farm-to-school and farm-to-institution programs connect local farmers with:</p>
          <ul>
            <li>Schools and universities</li>
            <li>Hospitals and healthcare facilities</li>
            <li>Corporate cafeterias</li>
            <li>Government facilities</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Economics of Local Food Systems</h2>
          <p>This module analyzes the economic dynamics of local food systems, examining their viability, impacts, and scalability.</p>
          <h3>Economic Analysis</h3>
          <p>Local food systems face distinct economic conditions:</p>
          <ul>
            <li><strong>Price Premiums:</strong> Consumers often pay more for local food</li>
            <li><strong>Transaction Costs:</strong> Direct sales require more farmer time</li>
            <li><strong>Value Retention:</strong> Farmers capture larger share of food dollar</li>
            <li><strong>Multiplier Effects:</strong> Local spending recirculates in community</li>
          </ul>
          <h3>Scale and Efficiency Debates</h3>
          <p>Critics argue local food is less efficient than global supply chains. Defenders point to externalities not captured in price and non-economic values of local food systems.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Critical Perspectives on Local Food</h2>
          <p>This seminar examines critiques of local food movements and their relationship to broader food system transformation.</p>
          <h3>The "Local Trap"</h3>
          <p>Scholars like Born and Purcell warn against assuming local food is inherently more just or sustainable. "Local" is a scale, not a set of values. Key questions:</p>
          <ul>
            <li>Who defines "local" and who is excluded?</li>
            <li>Can local food address structural inequities or does it mainly serve privileged consumers?</li>
            <li>Does local food activism divert energy from systemic change?</li>
          </ul>
          <h3>Food Justice Critiques</h3>
          <p>Food justice scholars examine how local food movements often reproduce race and class exclusions, centering white, middle-class practices and aesthetics.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Scalar Politics of Food</h2>
          <p>This doctoral seminar examines how scale is produced and contested in food system politics, moving beyond local/global binaries.</p>
          <h3>Scale as Social Construction</h3>
          <p>Following critical geographers, we analyze scale not as pre-given spatial containers but as produced through social practices and power relations. Local food movements engage in "scale-making" projects.</p>
          <h3>Local Food and Food Sovereignty</h3>
          <p>How does "local food" relate to food sovereignty? Key tensions:</p>
          <ul>
            <li>Food sovereignty emphasizes peoples' rights, not geographic proximity</li>
            <li>Some local food networks reproduce market logics food sovereignty critiques</li>
            <li>Yet local food can support food sovereignty goals of shortened supply chains and producer-consumer relationships</li>
          </ul>
        `
      }
    }
  ],
  activities: [
    {
      id: 'lfn-act-1',
      title: 'Map Your Local Food System',
      type: 'SIMULATION',
      description: 'Create a map of local food resources in your community',
      estimatedMinutes: 25,
      interactiveContent: {
        tasks: [
          'Identify farmers markets within 25 miles',
          'Find CSA programs serving your area',
          'Locate farm stands and U-pick operations',
          'Research food hubs and cooperatives',
          'Map food deserts and access gaps'
        ]
      }
    }
  ],
  game: {
    id: 'lfn-game',
    title: 'Local Food Network Builder',
    type: 'simulation',
    description: 'Build connections between farms and communities',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'lfn-q1',
        question: 'What is a CSA?',
        options: [
          'Corporate Supermarket Alliance',
          'Community Supported Agriculture - buying a share of farm harvest',
          'Certified Sustainable Agriculture',
          'Central Shopping Area'
        ],
        correctAnswer: 1,
        explanation: 'CSA stands for Community Supported Agriculture. Members pay upfront for a share of a farm\'s harvest, sharing both the risks and rewards with the farmer.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const foodPolicyAdvocacy: Module = {
  id: 'food-sov-policy',
  slug: 'food-policy-advocacy',
  title: 'Food Policy & Advocacy',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how rules about food are made and how you can help make them better!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how laws and policies shape our food system and how citizens can influence them.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore food policy at local, national, and international levels and strategies for food system advocacy.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze food policy frameworks, stakeholder dynamics, and advocacy strategies for food system change.',
    [LearningLevel.GRADUATE]: 'Examine food governance through policy analysis, political economy, and social movement theory.',
    [LearningLevel.PHD]: 'Investigate the politics of food policy-making and the role of civil society in food system governance.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [
    {
      id: 'fpa-1',
      title: 'Food Rules and How They\'re Made',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>📜 Rules About Food</h2>
          <p>Just like your school has rules, there are rules about food too! These rules help keep food safe and make sure everyone can get food.</p>
          <h3>Some Food Rules</h3>
          <ul>
            <li>🏷️ Labels must tell you what's in your food</li>
            <li>🧼 Restaurants must keep kitchens clean</li>
            <li>🥗 Schools must serve healthy lunches</li>
            <li>🌾 Farmers get help when weather ruins crops</li>
          </ul>
          <div class="activity">
            <h3>You Can Help!</h3>
            <p>Kids can share their ideas too! You could:</p>
            <ul>
              <li>Write a letter about school lunch</li>
              <li>Start a garden club</li>
              <li>Tell adults what healthy foods you like</li>
            </ul>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Food Policy</h2>
          <p>Food policy includes all the laws, regulations, and government programs that affect how food is produced, distributed, and consumed.</p>
          <h3>Types of Food Policy</h3>
          <ul>
            <li><strong>Agricultural Policy:</strong> Farm subsidies, crop insurance, conservation programs</li>
            <li><strong>Nutrition Policy:</strong> School meals, SNAP/food stamps, dietary guidelines</li>
            <li><strong>Food Safety:</strong> Inspection, labeling requirements, recalls</li>
            <li><strong>Trade Policy:</strong> Tariffs, imports/exports, international agreements</li>
          </ul>
          <h3>Who Makes Food Policy?</h3>
          <ul>
            <li>Congress passes laws (Farm Bill)</li>
            <li>USDA and FDA write regulations</li>
            <li>State and local governments add rules</li>
            <li>International bodies set standards</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Food Policy and Politics</h2>
          <p>Food policy reflects political choices about who benefits from the food system and how resources are distributed.</p>
          <h3>The Farm Bill</h3>
          <p>The Farm Bill is the main U.S. food policy legislation, renewed approximately every five years. Key titles include:</p>
          <ul>
            <li><strong>Commodities:</strong> Price supports and income support for farmers</li>
            <li><strong>Conservation:</strong> Programs to protect land and water</li>
            <li><strong>Nutrition:</strong> SNAP, school meals, and food assistance</li>
            <li><strong>Specialty Crops:</strong> Support for fruits, vegetables, and organic</li>
          </ul>
          <h3>Advocacy Strategies</h3>
          <ul>
            <li>Lobbying elected officials</li>
            <li>Public comment on regulations</li>
            <li>Coalition building</li>
            <li>Media campaigns</li>
            <li>Grassroots organizing</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Food Policy Analysis</h2>
          <p>This module provides frameworks for analyzing food policy, examining stakeholders, policy instruments, and outcomes.</p>
          <h3>Policy Analysis Framework</h3>
          <ul>
            <li><strong>Problem Definition:</strong> How is the issue framed? By whom?</li>
            <li><strong>Stakeholder Analysis:</strong> Who has interests? Who has power?</li>
            <li><strong>Policy Options:</strong> What alternatives exist?</li>
            <li><strong>Implementation:</strong> How is policy carried out?</li>
            <li><strong>Evaluation:</strong> Does it achieve stated goals? What are unintended consequences?</li>
          </ul>
          <h3>Power in Food Policy</h3>
          <p>Corporate concentration in food and agriculture creates power imbalances in policy-making. The concept of "regulatory capture" describes how regulated industries can come to dominate their regulators.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Food Governance and Political Economy</h2>
          <p>This seminar examines food policy through political economy frameworks, analyzing how power shapes food governance at multiple scales.</p>
          <h3>Food Regime Theory</h3>
          <p>Following Harriet Friedmann and Philip McMichael, food regime analysis examines how international food relations are organized in different historical periods and how they relate to capital accumulation and state power.</p>
          <h3>Multi-Level Governance</h3>
          <p>Food governance operates across scales:</p>
          <ul>
            <li>International (WTO, FAO, Codex Alimentarius)</li>
            <li>National (Farm Bills, regulatory agencies)</li>
            <li>State/Provincial</li>
            <li>Local (food policy councils, zoning)</li>
          </ul>
        `,
        [LearningLevel.PHD]: `
          <h2>The Politics of Food Policy-Making</h2>
          <p>This doctoral seminar examines how food policy is produced through political contestation, examining the role of social movements, policy entrepreneurs, and discursive politics.</p>
          <h3>Discourse and Food Policy</h3>
          <p>How problems are framed shapes policy responses. Food policy discourse analysis examines how certain framings become dominant while alternatives are marginalized.</p>
          <h3>Social Movements and Policy Change</h3>
          <p>When and how do food movements achieve policy change? Theoretical approaches include:</p>
          <ul>
            <li>Political opportunity structures</li>
            <li>Resource mobilization</li>
            <li>Framing and cultural resonance</li>
            <li>Insider/outsider strategies</li>
          </ul>
        `
      }
    }
  ],
  activities: [
    {
      id: 'fpa-act-1',
      title: 'Policy Brief Workshop',
      type: 'SCENARIO',
      description: 'Draft a policy brief on a food system issue',
      estimatedMinutes: 30,
      interactiveContent: {
        steps: [
          'Choose a food policy issue',
          'Research current policies',
          'Identify stakeholders',
          'Develop recommendations',
          'Write executive summary'
        ]
      }
    }
  ],
  game: {
    id: 'fpa-game',
    title: 'Food Policy Simulator',
    type: 'simulation',
    description: 'Navigate the policy-making process to pass food legislation',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'fpa-q1',
        question: 'What is the Farm Bill?',
        options: [
          'A bill farmers pay for seeds',
          'The main U.S. legislation governing agricultural and food policy',
          'A receipt from a farm stand',
          'A law that only affects organic farms'
        ],
        correctAnswer: 1,
        explanation: 'The Farm Bill is comprehensive legislation renewed every 5 years that covers agricultural subsidies, nutrition programs, conservation, and more.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const landAccessRights: Module = {
  id: 'food-sov-land-access',
  slug: 'land-access-rights',
  title: 'Land Access & Rights',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn why having land to grow food is so important for communities!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover the challenges farmers face getting land and why land rights matter for food security.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore land tenure systems, barriers to land access, and movements for land reform.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze land tenure, property rights, and their relationship to food sovereignty and agrarian justice.',
    [LearningLevel.GRADUATE]: 'Examine land governance through political ecology, examining dispossession, enclosure, and resistance.',
    [LearningLevel.PHD]: 'Investigate land as contested terrain where questions of sovereignty, territory, and belonging intersect.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'lar-1',
      title: 'Land for Growing Food',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌍 Why Land Matters</h2>
          <p>To grow food, you need land! But not everyone has land to grow food on. Let's learn why this is important.</p>
          <h3>What Land Gives Us</h3>
          <ul>
            <li>🥕 A place to grow vegetables</li>
            <li>🐄 Space for animals</li>
            <li>🌳 Trees for fruit and shade</li>
            <li>💧 Access to water</li>
            <li>🏠 A place to call home</li>
          </ul>
          <div class="think-about">
            <h3>Think About It</h3>
            <p>What if you wanted to grow a garden but had no yard? Where could you grow food?</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Land Access Challenges</h2>
          <p>Farmers need land to grow food, but getting land is becoming harder for many people, especially young and beginning farmers.</p>
          <h3>Barriers to Land Access</h3>
          <ul>
            <li><strong>High Prices:</strong> Farmland costs have risen dramatically</li>
            <li><strong>Competition:</strong> Developers and investors buy farmland</li>
            <li><strong>Consolidation:</strong> Farms are getting bigger and fewer</li>
            <li><strong>Discrimination:</strong> Some groups have been denied land access historically</li>
          </ul>
          <h3>Creative Solutions</h3>
          <ul>
            <li>Land trusts that keep farmland affordable</li>
            <li>Incubator farms for new farmers</li>
            <li>Land-linking programs connecting farmers with landowners</li>
            <li>Urban land access programs</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Land Tenure and Food Systems</h2>
          <p>Land tenure - the rules governing land ownership and use - fundamentally shapes food systems and who can participate in them.</p>
          <h3>Types of Land Tenure</h3>
          <ul>
            <li><strong>Private Ownership:</strong> Individual or corporate fee simple ownership</li>
            <li><strong>Leasing/Renting:</strong> Temporary use rights</li>
            <li><strong>Communal Tenure:</strong> Community-controlled land</li>
            <li><strong>Public Land:</strong> Government-owned land</li>
          </ul>
          <h3>Historical Context in the U.S.</h3>
          <ul>
            <li>Indigenous land dispossession</li>
            <li>Homestead Act (1862) - free land for white settlers</li>
            <li>Exclusion of Black farmers from land programs</li>
            <li>Heirs' property and land loss</li>
            <li>Japanese American land confiscation</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Land Rights and Agrarian Justice</h2>
          <p>This module examines land tenure through agrarian political economy, exploring how property relations shape rural livelihoods and food system outcomes.</p>
          <h3>Property Rights Theory</h3>
          <p>Different theoretical perspectives on property:</p>
          <ul>
            <li><strong>Liberal:</strong> Property as natural right and basis for freedom</li>
            <li><strong>Marxist:</strong> Property as social relation enabling exploitation</li>
            <li><strong>Commons:</strong> Resources managed collectively outside state/market</li>
            <li><strong>Indigenous:</strong> Relational approaches to land beyond ownership</li>
          </ul>
          <h3>Discrimination and Land Loss</h3>
          <p>Systematic discrimination has dispossessed communities of color from land in the U.S., including USDA discrimination documented in the Pigford cases.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Political Ecology of Land</h2>
          <p>This seminar applies political ecology frameworks to examine land access, use, and governance, with attention to power, scale, and environmental change.</p>
          <h3>Accumulation by Dispossession</h3>
          <p>Following David Harvey, we examine how capital accumulation continues to depend on enclosing commons and dispossessing people from land - what Marx called "primitive accumulation" continuing in new forms.</p>
          <h3>Land Grabbing</h3>
          <p>Contemporary "land grabs" - large-scale land acquisitions by corporations, governments, and investors - represent a new wave of enclosure with implications for food sovereignty globally.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Territory, Sovereignty, and Land</h2>
          <p>This doctoral seminar examines land through the lens of territory and sovereignty, exploring how control over land intersects with questions of political authority and belonging.</p>
          <h3>Indigenous Land and Food Sovereignty</h3>
          <p>Indigenous food sovereignty movements foreground land as the foundation of food systems, challenging settler-colonial property regimes and asserting inherent rights to traditional territories.</p>
          <h3>Relational Approaches to Land</h3>
          <p>Moving beyond property frameworks, scholars explore relational ontologies of land that understand humans as part of, rather than owners of, land and its living systems.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'lar-act-1',
      title: 'Land History Investigation',
      type: 'SCENARIO',
      description: 'Research the land history of your local area',
      estimatedMinutes: 25,
      interactiveContent: {
        questions: [
          'Who are the indigenous peoples of this land?',
          'How was the land transferred to current ownership?',
          'What has the land been used for historically?',
          'Who farms this land today?',
          'What are current land access challenges?'
        ]
      }
    }
  ],
  game: {
    id: 'lar-game',
    title: 'Land Stewardship Quest',
    type: 'simulation',
    description: 'Navigate challenges of securing and stewarding farmland',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'lar-q1',
        question: 'What is a land trust?',
        options: [
          'A bank that lends money for land purchases',
          'An organization that holds land to keep it affordable or protected',
          'A government agency that sells public land',
          'A type of farm insurance'
        ],
        correctAnswer: 1,
        explanation: 'Land trusts are nonprofit organizations that acquire and hold land to keep it permanently affordable for farming or protected for conservation.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const agroecologyPrinciples: Module = {
  id: 'food-sov-agroecology',
  slug: 'agroecology-principles',
  title: 'Agroecology Principles',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover how farms can work with nature instead of against it!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn how agroecology uses natural systems to grow food sustainably.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the science and practice of agroecology as an alternative to industrial agriculture.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze agroecology as science, practice, and social movement for food system transformation.',
    [LearningLevel.GRADUATE]: 'Examine agroecology through transdisciplinary lenses, integrating ecological and social dimensions.',
    [LearningLevel.PHD]: 'Investigate agroecology as transformative praxis and its relationship to food sovereignty movements.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 75,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [
    {
      id: 'agro-1',
      title: 'Farming with Nature',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌿 Nature's Farm Team!</h2>
          <p>Did you know that nature has its own team of helpers that can make farms work better? Instead of fighting nature, smart farmers work WITH nature!</p>
          <h3>Nature's Helpers</h3>
          <ul>
            <li>🐞 <strong>Ladybugs:</strong> Eat the bugs that hurt plants</li>
            <li>🐝 <strong>Bees:</strong> Help flowers become fruits</li>
            <li>🪱 <strong>Worms:</strong> Make soil healthy</li>
            <li>🌻 <strong>Flowers:</strong> Attract helpful insects</li>
            <li>🌳 <strong>Trees:</strong> Provide shade and homes for birds</li>
          </ul>
          <div class="discover">
            <h3>Discover!</h3>
            <p>Some farmers plant flowers between vegetable rows to invite helpful bugs. This is called "companion planting!"</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Introduction to Agroecology</h2>
          <p>Agroecology applies ecological principles to farming, creating systems that work with natural processes rather than against them.</p>
          <h3>Key Agroecological Principles</h3>
          <ul>
            <li><strong>Diversity:</strong> Grow many different crops and animals</li>
            <li><strong>Synergy:</strong> Components support each other</li>
            <li><strong>Recycling:</strong> Waste from one part feeds another</li>
            <li><strong>Efficiency:</strong> Use resources wisely</li>
            <li><strong>Resilience:</strong> System recovers from problems</li>
          </ul>
          <h3>Agroecology vs. Industrial Farming</h3>
          <table>
            <tr><th>Agroecology</th><th>Industrial</th></tr>
            <tr><td>Many crops together</td><td>Single crop (monoculture)</td></tr>
            <tr><td>Natural pest control</td><td>Chemical pesticides</td></tr>
            <tr><td>Builds soil</td><td>Depletes soil</td></tr>
            <tr><td>Local knowledge</td><td>External inputs</td></tr>
          </table>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Agroecology: Science and Practice</h2>
          <p>Agroecology is simultaneously a scientific discipline, a set of farming practices, and a social movement.</p>
          <h3>The 10 Elements of Agroecology (FAO)</h3>
          <ol>
            <li><strong>Diversity</strong> - Diversification is key to agroecological transitions</li>
            <li><strong>Co-creation of Knowledge</strong> - Sharing innovations horizontally</li>
            <li><strong>Synergies</strong> - Building synergies enhances key functions</li>
            <li><strong>Efficiency</strong> - Innovative practices produce more using less</li>
            <li><strong>Recycling</strong> - More recycling means more efficient resource use</li>
            <li><strong>Resilience</strong> - Enhanced resilience of systems</li>
            <li><strong>Human and Social Values</strong> - Protecting livelihoods, equity</li>
            <li><strong>Culture and Food Traditions</strong> - Supporting healthy diets</li>
            <li><strong>Responsible Governance</strong> - Transparent, accountable governance</li>
            <li><strong>Circular and Solidarity Economy</strong> - Reconnecting producers and consumers</li>
          </ol>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Agroecology as Transdisciplinary Science</h2>
          <p>This module examines agroecology as a transdisciplinary field integrating ecological science, traditional knowledge, and social sciences.</p>
          <h3>Theoretical Foundations</h3>
          <p>Agroecology draws from:</p>
          <ul>
            <li><strong>Ecology:</strong> Ecosystem function, nutrient cycling, biodiversity</li>
            <li><strong>Agronomy:</strong> Crop science, soil science, integrated management</li>
            <li><strong>Traditional Knowledge:</strong> Indigenous and peasant farming systems</li>
            <li><strong>Social Sciences:</strong> Political economy, sociology, anthropology</li>
          </ul>
          <h3>Agroecology and Yield</h3>
          <p>Debates about agroecological productivity require examining what we measure and value. While single-crop yields may be lower, agroecological systems often show higher total productivity, stability, and resource efficiency.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Agroecology and Food System Transformation</h2>
          <p>This seminar examines agroecology as a pathway for food system transformation, analyzing scaling strategies and political dynamics.</p>
          <h3>Scaling Agroecology</h3>
          <p>Key debates in scaling include:</p>
          <ul>
            <li><strong>Scaling out:</strong> Spreading practices to more farmers</li>
            <li><strong>Scaling up:</strong> Influencing policy and institutions</li>
            <li><strong>Scaling deep:</strong> Shifting values and worldviews</li>
          </ul>
          <h3>Political Agroecology</h3>
          <p>Scholars increasingly emphasize the political dimensions of agroecology - that technical practices alone cannot transform food systems without addressing power relations.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Agroecology as Transformative Praxis</h2>
          <p>This doctoral seminar examines agroecology as transformative praxis - the unity of theory and practice aimed at food system transformation.</p>
          <h3>Agroecology and Food Sovereignty</h3>
          <p>La Vía Campesina and allied movements position agroecology as the productive foundation of food sovereignty. This political framing distinguishes transformative agroecology from technocratic or "weak" versions.</p>
          <h3>Epistemological Dimensions</h3>
          <p>Agroecology raises epistemological questions about how knowledge is produced and validated:</p>
          <ul>
            <li>Dialogue between scientific and traditional knowledge</li>
            <li>Farmer-to-farmer pedagogy (Campesino a Campesino)</li>
            <li>Participatory action research methodologies</li>
          </ul>
        `
      }
    }
  ],
  activities: [
    {
      id: 'agro-act-1',
      title: 'Agroecosystem Analysis',
      type: 'SIMULATION',
      description: 'Map the relationships in an agroecological farming system',
      estimatedMinutes: 25,
      interactiveContent: {
        elements: ['Crops', 'Livestock', 'Pollinators', 'Soil Organisms', 'Water', 'Nutrients', 'Farmers', 'Markets'],
        task: 'Draw connections showing how elements interact and support each other'
      }
    }
  ],
  game: {
    id: 'agro-game',
    title: 'Agroecology Farm Designer',
    type: 'simulation',
    description: 'Design a balanced agroecological farming system',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'agro-q1',
        question: 'What is a key difference between agroecology and industrial agriculture?',
        options: [
          'Agroecology uses more pesticides',
          'Agroecology focuses on diversity while industrial farming uses monocultures',
          'Industrial farming is more sustainable',
          'Agroecology requires more fossil fuels'
        ],
        correctAnswer: 1,
        explanation: 'Agroecology emphasizes biodiversity and ecological relationships, while industrial agriculture typically relies on monocultures with external chemical inputs.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const fairTradeSystems: Module = {
  id: 'food-sov-fair-trade',
  slug: 'fair-trade-systems',
  title: 'Fair Trade Systems',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how buying fair trade helps farmers around the world!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how fair trade certification ensures farmers get fair prices for their products.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the fair trade movement, certification systems, and debates about their effectiveness.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze fair trade as market-based development, examining impacts, limitations, and alternatives.',
    [LearningLevel.GRADUATE]: 'Critically examine fair trade through commodity chain analysis and development theory.',
    [LearningLevel.PHD]: 'Investigate fair trade as ethical consumption and its relationship to systemic trade justice.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 30,
    [LearningLevel.HIGH_SCHOOL]: 45,
    [LearningLevel.UNDERGRADUATE]: 65,
    [LearningLevel.GRADUATE]: 90,
    [LearningLevel.PHD]: 120
  },
  lessons: [
    {
      id: 'ft-1',
      title: 'What is Fair Trade?',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🤝 Fair Trade = Fair Pay!</h2>
          <p>When you buy chocolate or bananas, have you thought about who grew them? Fair trade means the farmers who grow our food get paid fairly!</p>
          <h3>How Fair Trade Helps</h3>
          <ul>
            <li>💰 Farmers earn enough money to live</li>
            <li>🏫 Kids can go to school</li>
            <li>🏥 Families can see doctors</li>
            <li>🌱 Farms are better for nature</li>
          </ul>
          <div class="look-for">
            <h3>Look for the Label!</h3>
            <p>Fair trade products have special labels. Look for them on chocolate, bananas, coffee, and tea!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Fair Trade</h2>
          <p>Fair trade is a trading partnership that aims to achieve greater equity in international trade by offering better trading conditions to marginalized producers.</p>
          <h3>Fair Trade Principles</h3>
          <ul>
            <li><strong>Fair Prices:</strong> Minimum price that covers production costs</li>
            <li><strong>Fair Labor:</strong> Safe working conditions, no child labor</li>
            <li><strong>Direct Trade:</strong> Fewer middlemen means more money for farmers</li>
            <li><strong>Community Development:</strong> Premium for social projects</li>
            <li><strong>Environmental Standards:</strong> Sustainable farming practices</li>
          </ul>
          <h3>Common Fair Trade Products</h3>
          <ul>
            <li>Coffee and tea</li>
            <li>Chocolate and cocoa</li>
            <li>Bananas and tropical fruits</li>
            <li>Sugar</li>
            <li>Cotton and textiles</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>The Fair Trade Movement</h2>
          <p>Fair trade emerged in the mid-20th century as an alternative approach to conventional international trade, aiming to address inequities between producers in developing countries and consumers in wealthy nations.</p>
          <h3>Fair Trade Organizations</h3>
          <ul>
            <li><strong>Fairtrade International:</strong> Sets standards and certifies products</li>
            <li><strong>Fair Trade USA:</strong> U.S.-based certification</li>
            <li><strong>World Fair Trade Organization:</strong> Certifies organizations (not just products)</li>
          </ul>
          <h3>Debates About Fair Trade</h3>
          <ul>
            <li>Does it actually help the poorest farmers?</li>
            <li>Can market-based solutions address structural inequity?</li>
            <li>Who benefits when fair trade goes mainstream?</li>
            <li>What are alternatives like direct trade?</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Fair Trade and Development</h2>
          <p>This module critically examines fair trade as a market-based approach to development, analyzing evidence of impacts and theoretical debates.</p>
          <h3>Impact Evidence</h3>
          <p>Research on fair trade impacts shows mixed results:</p>
          <ul>
            <li>Price premiums do reach producers, but amounts vary</li>
            <li>Community development premiums fund local projects</li>
            <li>Environmental standards may improve practices</li>
            <li>However, poorest farmers often can't access certification</li>
          </ul>
          <h3>Theoretical Critiques</h3>
          <ul>
            <li><strong>Commodification of ethics:</strong> Turns justice into consumer choice</li>
            <li><strong>Depoliticization:</strong> Diverts from structural trade reform</li>
            <li><strong>Northern dominance:</strong> Standards set by consuming countries</li>
          </ul>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Global Value Chains and Fair Trade</h2>
          <p>This seminar examines fair trade through the lens of global value chain analysis, exploring how certification reshapes power relations in commodity networks.</p>
          <h3>Value Chain Analysis</h3>
          <p>Gereffi's global value chain framework helps analyze where value is created and captured in commodity chains. Fair trade attempts to shift value toward producers, but:</p>
          <ul>
            <li>Retailers and brands often capture most value even in fair trade chains</li>
            <li>Certification costs fall on producers</li>
            <li>Power asymmetries persist despite certification</li>
          </ul>
          <h3>Alternative Trading Organizations</h3>
          <p>Some organizations pursue more radical trade justice models than mainstream fair trade certification, raising questions about reform vs. transformation.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Ethical Consumption and Trade Justice</h2>
          <p>This doctoral seminar examines fair trade within broader debates about ethical consumption, moral economy, and the politics of global trade.</p>
          <h3>Governmentality and Ethical Consumption</h3>
          <p>Following Foucault, we can analyze fair trade as a form of ethical self-governance where consumers are constituted as responsible actors whose purchasing choices shape the world.</p>
          <h3>From Fair Trade to Trade Justice</h3>
          <p>Food sovereignty movements often critique fair trade as insufficient, calling for trade justice that addresses structural causes of inequity through policy change rather than consumer choice.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'ft-act-1',
      title: 'Fair Trade Product Hunt',
      type: 'SCENARIO',
      description: 'Research and find fair trade products in your community',
      estimatedMinutes: 20,
      interactiveContent: {
        tasks: ['Visit local stores', 'Identify fair trade labels', 'Compare prices', 'Research the producers']
      }
    }
  ],
  game: {
    id: 'ft-game',
    title: 'Fair Trade Trader',
    type: 'simulation',
    description: 'Make trading decisions that impact farmer communities',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'ft-q1',
        question: 'What is the main goal of fair trade?',
        options: [
          'To make products cheaper',
          'To ensure producers receive fair prices and working conditions',
          'To increase international shipping',
          'To eliminate all trade'
        ],
        correctAnswer: 1,
        explanation: 'Fair trade aims to create more equitable trading relationships by ensuring producers receive fair prices, safe working conditions, and community development benefits.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const foodJusticeEquity: Module = {
  id: 'food-sov-food-justice',
  slug: 'food-justice-equity',
  title: 'Food Justice & Equity',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn why everyone deserves healthy, yummy food no matter where they live!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how some communities face unfair barriers to healthy food access.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the food justice movement and systemic inequities in food systems.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze food justice through critical race theory, political economy, and social movement frameworks.',
    [LearningLevel.GRADUATE]: 'Examine intersections of food, race, class, and place in producing food system inequities.',
    [LearningLevel.PHD]: 'Investigate food justice as praxis, examining theory-practice relationships in movement building.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [
    {
      id: 'fj-1',
      title: 'Food for Everyone',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🍎 Healthy Food for All!</h2>
          <p>Everyone needs healthy food to grow strong, but not everyone can easily get it. Let's learn why this happens and how we can help!</p>
          <h3>What's Not Fair?</h3>
          <ul>
            <li>🏪 Some neighborhoods don't have grocery stores nearby</li>
            <li>💵 Healthy food sometimes costs more</li>
            <li>🚗 Not everyone has a way to get to stores</li>
            <li>⏰ Some families work so much they have little time to cook</li>
          </ul>
          <div class="helpers">
            <h3>People Who Help!</h3>
            <p>Many people are working to make sure everyone has healthy food:</p>
            <ul>
              <li>Food banks share free food</li>
              <li>Community gardens grow vegetables together</li>
              <li>School programs give free lunches</li>
            </ul>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Understanding Food Injustice</h2>
          <p>Food justice is the idea that everyone, regardless of race, income, or location, deserves access to healthy, affordable, culturally appropriate food.</p>
          <h3>Food Deserts and Food Apartheid</h3>
          <ul>
            <li><strong>Food Deserts:</strong> Areas with limited access to healthy food retailers</li>
            <li><strong>Food Apartheid:</strong> A term some prefer, emphasizing that food access inequities result from systemic racism, not just geography</li>
          </ul>
          <h3>Who Is Affected?</h3>
          <ul>
            <li>Low-income communities</li>
            <li>Communities of color</li>
            <li>Rural areas</li>
            <li>Elderly and disabled individuals</li>
            <li>Recent immigrants</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>The Food Justice Movement</h2>
          <p>Food justice emerged as a movement addressing the root causes of food inequity, centering the leadership of communities most affected by food system injustices.</p>
          <h3>Key Principles</h3>
          <ul>
            <li><strong>Self-Determination:</strong> Communities lead their own food system solutions</li>
            <li><strong>Addressing Root Causes:</strong> Focus on systemic racism, poverty, and disinvestment</li>
            <li><strong>Intersectionality:</strong> Food connects to housing, jobs, healthcare, environment</li>
            <li><strong>Worker Justice:</strong> Fair treatment for food system workers</li>
          </ul>
          <h3>Food Justice vs. Food Security</h3>
          <p>Food security focuses on access and availability. Food justice asks: Why don't some communities have access? Who decides what food is available? Who benefits from the current system?</p>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Critical Food Justice Studies</h2>
          <p>This module examines food justice through theoretical frameworks that illuminate how race, class, and place intersect in food systems.</p>
          <h3>Theoretical Frameworks</h3>
          <ul>
            <li><strong>Critical Race Theory:</strong> Analyzes how racism structures food system inequities</li>
            <li><strong>Environmental Justice:</strong> Connects food access to broader environmental racism</li>
            <li><strong>Intersectionality:</strong> Examines how multiple forms of oppression compound</li>
            <li><strong>Political Economy:</strong> Traces how capitalism produces food inequities</li>
          </ul>
          <h3>Historical Context</h3>
          <p>Current food inequities reflect historical processes including redlining, urban renewal, highway construction, supermarket redlining, and ongoing disinvestment in communities of color.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Race, Space, and Food Systems</h2>
          <p>This seminar examines how racial capitalism produces and reproduces food system inequities, with attention to space, place, and scale.</p>
          <h3>Racialized Geographies of Food</h3>
          <p>Following scholars like Nathan McClintock and Ashanté Reese, we examine how racialized processes produce uneven food landscapes. Key concepts:</p>
          <ul>
            <li>Racial capitalism and food system development</li>
            <li>Urban food environments as produced spaces</li>
            <li>Community responses and counter-geographies</li>
          </ul>
          <h3>Critiques Within Food Justice</h3>
          <p>Scholars critique how some food justice work may reproduce inequities by centering white leadership, imposing external solutions, or failing to address structural causes.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Food Justice as Praxis</h2>
          <p>This doctoral seminar examines food justice as praxis - the unity of theory and practice - exploring how movements theorize and enact food system transformation.</p>
          <h3>Movement Building</h3>
          <p>Food justice movements engage in both prefigurative politics (building alternative food systems) and contestation (challenging dominant systems). We examine tensions and synergies between these strategies.</p>
          <h3>Decolonizing Food Systems</h3>
          <p>Indigenous food sovereignty movements center decolonization, challenging settler-colonial food systems and asserting rights to traditional foodways and territories.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'fj-act-1',
      title: 'Community Food Access Assessment',
      type: 'SCENARIO',
      description: 'Assess food access in your community',
      estimatedMinutes: 25,
      interactiveContent: {
        tasks: ['Map food retailers', 'Identify access barriers', 'Research community demographics', 'Find community food programs']
      }
    }
  ],
  game: {
    id: 'fj-game',
    title: 'Food Justice Organizer',
    type: 'simulation',
    description: 'Build community power to address food inequities',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'fj-q1',
        question: 'What does "food apartheid" emphasize that "food desert" does not?',
        options: [
          'The lack of water in an area',
          'That food access inequities result from systemic racism, not just geography',
          'That deserts have no food',
          'That food is expensive everywhere'
        ],
        correctAnswer: 1,
        explanation: 'The term "food apartheid" emphasizes that inequitable food access is the result of intentional disinvestment and systemic racism, not simply a natural geographic phenomenon.',
        difficulty: LearningLevel.HIGH_SCHOOL
      }
    ]
  }
}

export const seasonalNutritionalEating: Module = {
  id: 'food-sov-seasonal-eating',
  slug: 'seasonal-nutritional-eating',
  title: 'Seasonal & Nutritional Eating',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover which yummy foods grow in each season!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn about eating with the seasons and the nutrition in whole foods.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the benefits of seasonal eating and whole food nutrition for health and environment.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze seasonal foodways, nutritional ecology, and the politics of dietary guidance.',
    [LearningLevel.GRADUATE]: 'Examine the nutrition transition, dietary patterns, and food culture through anthropological lenses.',
    [LearningLevel.PHD]: 'Investigate food, nutrition, and health as biocultural phenomena shaped by political economy.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 30,
    [LearningLevel.HIGH_SCHOOL]: 45,
    [LearningLevel.UNDERGRADUATE]: 65,
    [LearningLevel.GRADUATE]: 90,
    [LearningLevel.PHD]: 120
  },
  lessons: [
    {
      id: 'sne-1',
      title: 'Eating with the Seasons',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🍂 What's Growing Now?</h2>
          <p>Different foods grow at different times of year! Eating foods when they're in season means they taste the best!</p>
          <h3>Seasons and Foods</h3>
          <ul>
            <li>🌸 <strong>Spring:</strong> Asparagus, peas, strawberries</li>
            <li>☀️ <strong>Summer:</strong> Tomatoes, corn, watermelon</li>
            <li>🍂 <strong>Fall:</strong> Apples, pumpkins, squash</li>
            <li>❄️ <strong>Winter:</strong> Oranges, cabbage, potatoes</li>
          </ul>
          <div class="try-it">
            <h3>Try This!</h3>
            <p>Visit a farmers market and ask what's in season right now!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Why Eat Seasonally?</h2>
          <p>For most of human history, people ate what was available locally and in season. Today, we can buy almost any food year-round, but there are good reasons to eat seasonally.</p>
          <h3>Benefits of Seasonal Eating</h3>
          <ul>
            <li><strong>Better Taste:</strong> Foods picked ripe and eaten fresh taste better</li>
            <li><strong>More Nutrition:</strong> Fresh foods retain more vitamins</li>
            <li><strong>Lower Cost:</strong> Abundant seasonal foods cost less</li>
            <li><strong>Better for Environment:</strong> Less transportation and storage</li>
            <li><strong>Variety:</strong> Eating seasonally adds variety to your diet</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Seasonal Eating and Nutrition</h2>
          <p>Understanding seasonal eating connects to broader nutrition principles and food system sustainability.</p>
          <h3>Nutritional Benefits</h3>
          <ul>
            <li><strong>Peak Nutrition:</strong> Produce has highest nutrient content when harvested ripe and eaten quickly</li>
            <li><strong>Phytonutrient Diversity:</strong> Seasonal eating encourages varied diet</li>
            <li><strong>Whole Foods:</strong> Fresh seasonal foods are minimally processed</li>
          </ul>
          <h3>Environmental Connections</h3>
          <ul>
            <li>Seasonal foods require less energy for heating/cooling</li>
            <li>Local seasonal foods reduce transportation</li>
            <li>Eating with seasons supports crop rotation</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Nutritional Ecology and Food Culture</h2>
          <p>This module examines seasonal eating through ecological and cultural lenses, exploring how human diets co-evolved with local food environments.</p>
          <h3>Nutritional Ecology</h3>
          <p>Traditional diets evolved in relationship to local ecologies. Key concepts:</p>
          <ul>
            <li>Adaptation to local foods over generations</li>
            <li>Dietary diversity within ecological constraints</li>
            <li>Traditional food processing and preservation</li>
            <li>Cultural knowledge encoding nutritional wisdom</li>
          </ul>
          <h3>Politics of Nutrition Science</h3>
          <p>Critical nutrition scholars examine how nutrition science is shaped by industry funding, reductionist paradigms, and cultural biases.</p>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Food, Diet, and Health Transitions</h2>
          <p>This seminar examines changing dietary patterns through the lens of the nutrition transition, exploring relationships between food systems, diets, and health outcomes.</p>
          <h3>The Nutrition Transition</h3>
          <p>Popkin's nutrition transition framework describes shifts from traditional diets toward Western dietary patterns, with associated health consequences.</p>
          <h3>Traditional Diets and Health</h3>
          <p>Research on traditional diets (Mediterranean, Okinawan, etc.) suggests health benefits, but translating these findings is complicated by cultural, social, and economic factors.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Critical Nutrition Studies</h2>
          <p>This doctoral seminar examines nutrition as a biocultural phenomenon, analyzing how diet-health relationships are mediated by political economy, culture, and power.</p>
          <h3>Beyond Nutritionism</h3>
          <p>Following Gyorgy Scrinis, we critique "nutritionism" - the ideology that reduces food to nutrients and eating to a technical problem solvable through science.</p>
          <h3>Structural Determinants of Diet</h3>
          <p>Diet is shaped by food system structures, economic conditions, built environments, and policy - factors often obscured by individual-focused nutrition advice.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'sne-act-1',
      title: 'Seasonal Meal Planner',
      type: 'SIMULATION',
      description: 'Plan a week of meals using seasonal ingredients',
      estimatedMinutes: 20,
      interactiveContent: {
        seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
        mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
      }
    }
  ],
  game: {
    id: 'sne-game',
    title: 'Seasonal Chef',
    type: 'matching',
    description: 'Match foods to their peak seasons',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'sne-q1',
        question: 'Why do seasonal foods often have more nutrients?',
        options: [
          'They have added vitamins',
          'They are harvested ripe and eaten fresh, retaining more nutrients',
          'They are genetically modified',
          'They are frozen immediately'
        ],
        correctAnswer: 1,
        explanation: 'Produce harvested at peak ripeness and eaten shortly after has higher nutrient content than food picked early and shipped long distances.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const traditionalFarmingMethods: Module = {
  id: 'food-sov-traditional-farming',
  slug: 'traditional-farming-methods',
  title: 'Traditional Farming Methods',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn about how people farmed before tractors and technology!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover traditional farming techniques that have fed people for thousands of years.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore traditional agricultural systems and their relevance to sustainable farming today.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze traditional ecological knowledge in agriculture and its integration with modern science.',
    [LearningLevel.GRADUATE]: 'Examine traditional farming through ethnoecology and the politics of knowledge.',
    [LearningLevel.PHD]: 'Investigate traditional agriculture as biocultural heritage and site of epistemic struggle.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [
    {
      id: 'tfm-1',
      title: 'Farming Through History',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌾 How People Farmed Long Ago</h2>
          <p>Before there were tractors and big machines, people used clever ways to grow food. Many of these old ways are still used today!</p>
          <h3>Old Farming Tricks That Work</h3>
          <ul>
            <li>🌱 <strong>Three Sisters:</strong> Native Americans grew corn, beans, and squash together - they help each other grow!</li>
            <li>🏞️ <strong>Terraces:</strong> Steps cut into hillsides to grow food on mountains</li>
            <li>🐃 <strong>Animal Power:</strong> Oxen and horses helped plow fields</li>
            <li>💩 <strong>Compost:</strong> Using old plants and animal waste to feed the soil</li>
          </ul>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Traditional Agricultural Systems</h2>
          <p>Traditional farming systems developed over thousands of years, representing accumulated wisdom about growing food sustainably in specific environments.</p>
          <h3>Examples of Traditional Systems</h3>
          <ul>
            <li><strong>Milpa (Mesoamerica):</strong> Polyculture of corn, beans, squash</li>
            <li><strong>Rice Paddies (Asia):</strong> Flooded fields for rice cultivation</li>
            <li><strong>Chinampas (Mexico):</strong> Floating gardens in lake beds</li>
            <li><strong>Terracing (Andes, Asia):</strong> Mountain farming on built steps</li>
            <li><strong>Silvopasture (Worldwide):</strong> Integrating trees with livestock</li>
          </ul>
          <h3>Why Traditional Methods Matter</h3>
          <ul>
            <li>Adapted to local conditions over generations</li>
            <li>Often more sustainable than industrial methods</li>
            <li>Preserve biodiversity</li>
            <li>Provide food security without expensive inputs</li>
          </ul>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Traditional Ecological Knowledge in Agriculture</h2>
          <p>Traditional ecological knowledge (TEK) refers to the knowledge, practices, and beliefs about the environment developed by indigenous and local peoples over generations.</p>
          <h3>Characteristics of Traditional Farming Systems</h3>
          <ul>
            <li><strong>Complexity:</strong> Multiple crops, integration with environment</li>
            <li><strong>Adaptation:</strong> Suited to local climate, soil, water</li>
            <li><strong>Resilience:</strong> Diverse systems buffer against shocks</li>
            <li><strong>Low External Inputs:</strong> Use local resources, not purchased chemicals</li>
            <li><strong>Embedded Knowledge:</strong> Practices encode generations of learning</li>
          </ul>
          <h3>Traditional vs. Industrial</h3>
          <p>Industrial agriculture maximizes short-term yields but often degrades soil, water, and biodiversity. Traditional systems often demonstrate greater long-term sustainability.</p>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Agrobiodiversity and Traditional Knowledge</h2>
          <p>This module examines how traditional farming systems maintain agrobiodiversity and the challenges of integrating traditional and scientific knowledge.</p>
          <h3>In Situ Conservation</h3>
          <p>Traditional farmers are primary stewards of crop genetic diversity through in situ conservation - maintaining crop varieties in their centers of origin through continued cultivation.</p>
          <h3>Knowledge Integration Challenges</h3>
          <ul>
            <li>Different epistemological frameworks</li>
            <li>Power imbalances in knowledge validation</li>
            <li>Intellectual property and benefit-sharing</li>
            <li>Risks of extraction and appropriation</li>
          </ul>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Ethnoecology and Agricultural Knowledge</h2>
          <p>This seminar examines traditional agriculture through ethnoecological frameworks, analyzing how cultures perceive, classify, and interact with their environments.</p>
          <h3>Ethnoecological Approaches</h3>
          <p>Ethnoecology examines relationships between cultures and environments, including:</p>
          <ul>
            <li>Ethnobotany and ethnozoology</li>
            <li>Cognitive aspects of environmental knowledge</li>
            <li>Practice-based knowledge and embodied expertise</li>
          </ul>
          <h3>Politics of Traditional Knowledge</h3>
          <p>Traditional knowledge is increasingly recognized in policy (CBD, FAO) but recognition raises questions about definition, ownership, and instrumentalization.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Traditional Agriculture as Biocultural Heritage</h2>
          <p>This doctoral seminar examines traditional agricultural systems as biocultural heritage, exploring their conservation, transformation, and politicization.</p>
          <h3>Biocultural Diversity</h3>
          <p>The concept of biocultural diversity recognizes interrelationships between biological and cultural diversity. Agricultural systems embody these connections.</p>
          <h3>Epistemic Justice</h3>
          <p>Following scholars like Boaventura de Sousa Santos, we examine how traditional knowledge has been marginalized by "epistemicide" and how food sovereignty movements assert epistemic justice.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'tfm-act-1',
      title: 'Three Sisters Garden',
      type: 'STEP_GUIDED',
      description: 'Plan a traditional Three Sisters garden',
      estimatedMinutes: 20,
      interactiveContent: {
        steps: ['Learn the history', 'Plan the mound layout', 'Understand companion planting', 'Plant sequence and spacing']
      }
    }
  ],
  game: {
    id: 'tfm-game',
    title: 'Traditional Farmer',
    type: 'simulation',
    description: 'Apply traditional methods to grow food sustainably',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'tfm-q1',
        question: 'What are the "Three Sisters" in Native American agriculture?',
        options: [
          'Three female farmers',
          'Corn, beans, and squash grown together',
          'Three types of wheat',
          'Three farming seasons'
        ],
        correctAnswer: 1,
        explanation: 'The Three Sisters are corn, beans, and squash - traditionally grown together. Corn provides structure for beans to climb, beans fix nitrogen, and squash shades the soil.',
        difficulty: LearningLevel.ELEMENTARY
      }
    ]
  }
}

export const organicFarmingPractices: Module = {
  id: 'food-sov-organic',
  slug: 'organic-farming-practices',
  title: 'Organic Farming Practices',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how organic farmers grow food without harmful chemicals!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover the principles and practices of organic agriculture.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore organic certification, farming methods, and debates about organic agriculture.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze organic agriculture as alternative farming system, examining standards, impacts, and limitations.',
    [LearningLevel.GRADUATE]: 'Critically examine organic agriculture through political economy and environmental sociology.',
    [LearningLevel.PHD]: 'Investigate the conventionalization of organic and tensions in the organic movement.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [
    {
      id: 'ofp-1',
      title: 'What is Organic Farming?',
      content: {
        [LearningLevel.ELEMENTARY]: `
          <h2>🌿 Farming the Natural Way!</h2>
          <p>Organic farmers grow food without using certain chemicals. They use nature's own ways to keep plants healthy!</p>
          <h3>How Organic Farmers Work</h3>
          <ul>
            <li>🐛 Use ladybugs instead of bug spray</li>
            <li>🌻 Plant flowers to attract helpful insects</li>
            <li>🍂 Add compost to make soil healthy</li>
            <li>🔄 Rotate crops so soil stays strong</li>
            <li>🚫 No chemical pesticides or fertilizers</li>
          </ul>
          <div class="look-for">
            <h3>Find Organic Food!</h3>
            <p>Look for the organic label at the store. It often has a green and white circle!</p>
          </div>
        `,
        [LearningLevel.MIDDLE_SCHOOL]: `
          <h2>Organic Agriculture Basics</h2>
          <p>Organic farming is a method of crop and livestock production that avoids synthetic chemicals and emphasizes ecological processes.</p>
          <h3>What Makes Farming Organic?</h3>
          <ul>
            <li><strong>No Synthetic Pesticides:</strong> Uses natural pest management</li>
            <li><strong>No Synthetic Fertilizers:</strong> Uses compost, cover crops, manure</li>
            <li><strong>No GMOs:</strong> Genetically modified organisms not allowed</li>
            <li><strong>Animal Welfare:</strong> Requirements for space, outdoor access</li>
            <li><strong>Soil Health:</strong> Focus on building healthy soil</li>
          </ul>
          <h3>Organic Certification</h3>
          <p>In the US, the USDA certifies organic products. Farmers must follow organic practices for 3 years before certification.</p>
        `,
        [LearningLevel.HIGH_SCHOOL]: `
          <h2>Organic Agriculture: Principles and Practice</h2>
          <p>Organic agriculture is based on principles of health, ecology, fairness, and care, as defined by IFOAM (International Federation of Organic Agriculture Movements).</p>
          <h3>The Four Principles of Organic Agriculture</h3>
          <ul>
            <li><strong>Health:</strong> Soil, plant, animal, human, and planetary health are interconnected</li>
            <li><strong>Ecology:</strong> Based on living ecological systems and cycles</li>
            <li><strong>Fairness:</strong> Built on relationships that ensure equity</li>
            <li><strong>Care:</strong> Managed responsibly for current and future generations</li>
          </ul>
          <h3>Debates About Organic</h3>
          <ul>
            <li>Is organic more sustainable?</li>
            <li>Can organic feed the world?</li>
            <li>Is certified organic being "conventionalized"?</li>
            <li>What about organic food imported from far away?</li>
          </ul>
        `,
        [LearningLevel.UNDERGRADUATE]: `
          <h2>Organic Agriculture: Systems Analysis</h2>
          <p>This module analyzes organic agriculture as an alternative production system, examining environmental impacts, economic viability, and systemic limitations.</p>
          <h3>Environmental Impacts</h3>
          <p>Research on organic environmental impacts shows:</p>
          <ul>
            <li>Higher biodiversity on organic farms</li>
            <li>Better soil health and carbon sequestration</li>
            <li>Lower pesticide exposure for workers and environment</li>
            <li>But: lower yields often mean more land needed</li>
          </ul>
          <h3>Economic Dimensions</h3>
          <p>Organic markets have grown dramatically, but:</p>
          <ul>
            <li>Certification costs exclude small farmers</li>
            <li>Price premiums may not cover higher costs</li>
            <li>Corporate entry changes market dynamics</li>
          </ul>
        `,
        [LearningLevel.GRADUATE]: `
          <h2>Political Economy of Organic Agriculture</h2>
          <p>This seminar examines organic agriculture through political economy lenses, analyzing the transformation of organic from social movement to market segment.</p>
          <h3>Conventionalization Thesis</h3>
          <p>Julie Guthman's "conventionalization" thesis argues that organic agriculture has increasingly adopted industrial structures and logics, undermining its transformative potential.</p>
          <h3>Beyond Organic</h3>
          <p>Some farmers and movements reject organic certification, pursuing agroecology, regenerative agriculture, or food sovereignty frameworks as more transformative alternatives.</p>
        `,
        [LearningLevel.PHD]: `
          <h2>Organic Agriculture and Alternative Food Systems</h2>
          <p>This doctoral seminar situates organic within broader debates about alternative food systems, examining contradictions between market-based and movement-based approaches.</p>
          <h3>Organic as Contested Terrain</h3>
          <p>Organic agriculture represents contested terrain where different visions compete: agrarian reform, environmental management, market opportunity, consumer lifestyle choice.</p>
          <h3>Standards and Governance</h3>
          <p>Organic standard-setting involves struggles over definitions, with implications for who can participate and what practices are valued.</p>
        `
      }
    }
  ],
  activities: [
    {
      id: 'ofp-act-1',
      title: 'Organic vs. Conventional Comparison',
      type: 'DRAG_DROP',
      description: 'Compare organic and conventional farming practices',
      estimatedMinutes: 15,
      interactiveContent: {
        items: ['Synthetic pesticides', 'Compost', 'Cover crops', 'GMO seeds', 'Crop rotation', 'Synthetic fertilizers'],
        dropZones: ['Organic', 'Conventional', 'Both']
      }
    }
  ],
  game: {
    id: 'ofp-game',
    title: 'Organic Farm Manager',
    type: 'simulation',
    description: 'Manage an organic farm through pest and fertility challenges',
    difficulty: {
      [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true },
      [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true },
      [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false },
      [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false },
      [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false },
      [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false }
    }
  },
  quiz: {
    questions: [
      {
        id: 'ofp-q1',
        question: 'What is NOT allowed in certified organic farming?',
        options: [
          'Compost',
          'Crop rotation',
          'Synthetic chemical pesticides',
          'Cover crops'
        ],
        correctAnswer: 2,
        explanation: 'Organic certification prohibits the use of synthetic chemical pesticides and fertilizers. Organic farmers use natural methods like compost, crop rotation, and biological pest control.',
        difficulty: LearningLevel.MIDDLE_SCHOOL
      }
    ]
  }
}

export const smallScaleLivestock: Module = {
  id: 'food-sov-livestock',
  slug: 'small-scale-livestock',
  title: 'Small-Scale Livestock',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how farm animals help provide food and help gardens grow!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how raising chickens, goats, and other animals fits into sustainable food systems.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore small-scale animal husbandry, animal welfare, and integrated farming systems.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze livestock in sustainable agriculture, examining ecological roles and ethical dimensions.',
    [LearningLevel.GRADUATE]: 'Examine livestock production through agroecological and political ecology frameworks.',
    [LearningLevel.PHD]: 'Investigate human-animal relations in food systems and debates over livestock sustainability.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [{
    id: 'ssl-1',
    title: 'Animals on the Farm',
    content: {
      [LearningLevel.ELEMENTARY]: '<h2>Farm Animal Friends!</h2><p>Farm animals help farmers grow food. Chickens give eggs, goats give milk, and their manure helps gardens grow!</p>',
      [LearningLevel.MIDDLE_SCHOOL]: '<h2>Small-Scale Animal Husbandry</h2><p>Raising animals on a small scale provides food while using fewer resources than industrial operations. Animals provide eggs, milk, meat, and manure for gardens.</p>',
      [LearningLevel.HIGH_SCHOOL]: '<h2>Integrated Livestock Systems</h2><p>In sustainable agriculture, livestock integrate with crops through rotational grazing, silvopasture, and chicken tractors to create resilient farming systems.</p>',
      [LearningLevel.UNDERGRADUATE]: '<h2>Livestock in Agroecosystems</h2><p>Animals provide nutrient cycling, landscape management, waste valorization, and traction. Sustainability depends on production system choices.</p>',
      [LearningLevel.GRADUATE]: '<h2>Political Ecology of Livestock</h2><p>The rise of CAFOs transformed human-animal relations with implications for rural communities, environmental justice, and public health.</p>',
      [LearningLevel.PHD]: '<h2>Human-Animal Relations</h2><p>Critical animal studies challenge instrumental views, proposing relational approaches to agriculture\'s multispecies entanglements.</p>'
    }
  }],
  activities: [{ id: 'ssl-act-1', title: 'Design an Integrated Farm', type: 'SIMULATION', description: 'Plan how livestock integrate with crops', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'ssl-game', title: 'Farm Manager', type: 'simulation', description: 'Balance animal needs with farm productivity', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'ssl-q1', question: 'What is a chicken tractor?', options: ['A tractor shaped like a chicken', 'A mobile coop that prepares garden beds', 'A machine for harvesting', 'A chicken-powered vehicle'], correctAnswer: 1, explanation: 'A chicken tractor is a mobile coop. Chickens scratch, eat pests, and deposit manure, preparing beds for planting.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const beekeepingPollinators: Module = {
  id: 'food-sov-beekeeping',
  slug: 'beekeeping-pollinators',
  title: 'Beekeeping & Pollinators',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn about amazing bees and how they help our food grow!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover how bees and other pollinators are essential for food production.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore beekeeping basics, pollinator ecology, and threats to pollinator populations.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze pollinator ecology, ecosystem services valuation, and conservation strategies.',
    [LearningLevel.GRADUATE]: 'Examine pollinator decline through political ecology and science-policy interfaces.',
    [LearningLevel.PHD]: 'Investigate pollinator-human relations as multispecies assemblages.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [{
    id: 'bp-1',
    title: 'The World of Bees',
    content: {
      [LearningLevel.ELEMENTARY]: '<h2>Busy Bees!</h2><p>Bees visit flowers, carry pollen, and help plants make fruits and vegetables. Without bees, we wouldn\'t have many of our favorite foods!</p>',
      [LearningLevel.MIDDLE_SCHOOL]: '<h2>Pollinators and Food</h2><p>About 75% of crop species benefit from animal pollination. Pollinators include bees, butterflies, birds, and bats.</p>',
      [LearningLevel.HIGH_SCHOOL]: '<h2>Beekeeping and Conservation</h2><p>Beekeeping provides honey while supporting pollination. Both managed and wild pollinators face threats from pesticides, habitat loss, and disease.</p>',
      [LearningLevel.UNDERGRADUATE]: '<h2>Ecosystem Services</h2><p>Pollination\'s estimated global value is $235-577 billion annually. Conservation strategies include habitat restoration and pesticide regulation.</p>',
      [LearningLevel.GRADUATE]: '<h2>Pollinator Decline Politics</h2><p>Causes remain contested - pesticide industry, environmentalists, and scientists emphasize different factors. Policy responses range from bans to habitat programs.</p>',
      [LearningLevel.PHD]: '<h2>Multispecies Approaches</h2><p>Moving beyond ecosystem services, we examine pollinators as agents in multispecies worlds and subjects of biopolitical governance.</p>'
    }
  }],
  activities: [{ id: 'bp-act-1', title: 'Design a Pollinator Garden', type: 'SIMULATION', description: 'Plan a garden supporting pollinators year-round', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'bp-game', title: 'Bee Colony Simulator', type: 'simulation', description: 'Manage a bee colony through seasons', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'bp-q1', question: 'What percentage of crops benefit from animal pollination?', options: ['About 25%', 'About 50%', 'About 75%', 'About 90%'], correctAnswer: 2, explanation: 'Approximately 75% of crop species benefit from animal pollination.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const aquaponicsSystems: Module = {
  id: 'food-sov-aquaponics',
  slug: 'aquaponics-systems',
  title: 'Aquaponics Systems',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover how fish and plants grow together in amazing systems!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn how aquaponics combines fish farming with plant growing.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore the science of aquaponics systems, including nitrogen cycling.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze aquaponics as integrated food production, examining efficiency and scalability.',
    [LearningLevel.GRADUATE]: 'Examine aquaponics through food systems and sustainability science.',
    [LearningLevel.PHD]: 'Investigate aquaponics as socio-technical innovation for food system transformation.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 40,
    [LearningLevel.HIGH_SCHOOL]: 55,
    [LearningLevel.UNDERGRADUATE]: 75,
    [LearningLevel.GRADUATE]: 100,
    [LearningLevel.PHD]: 130
  },
  lessons: [{
    id: 'aqua-1',
    title: 'Fish and Plants Together',
    content: {
      [LearningLevel.ELEMENTARY]: '<h2>Fish Help Plants Grow!</h2><p>Fish poop feeds the plants, plants clean the water for fish. It\'s a circle of life in a tank!</p>',
      [LearningLevel.MIDDLE_SCHOOL]: '<h2>Introduction to Aquaponics</h2><p>The nitrogen cycle: fish produce ammonia, bacteria convert it to nitrate, plants absorb nitrate, clean water returns to fish.</p>',
      [LearningLevel.HIGH_SCHOOL]: '<h2>System Design</h2><p>System types include media bed, deep water culture, and nutrient film technique. pH compromise of 6.8-7.2 works for most systems.</p>',
      [LearningLevel.UNDERGRADUATE]: '<h2>Efficiency Analysis</h2><p>Uses 90% less water than conventional agriculture, but has high startup costs and energy requirements.</p>',
      [LearningLevel.GRADUATE]: '<h2>Food Systems Context</h2><p>Aquaponics shows promise for urban food production but scalability and impact on food security remain debated.</p>',
      [LearningLevel.PHD]: '<h2>Socio-Technical Innovation</h2><p>Aquaponics designs embody different values: backyard systems emphasize autonomy, commercial systems prioritize efficiency.</p>'
    }
  }],
  activities: [{ id: 'aqua-act-1', title: 'Design Your System', type: 'SIMULATION', description: 'Plan a balanced aquaponics system', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'aqua-game', title: 'Aquaponics Balance', type: 'simulation', description: 'Keep fish, plants, and bacteria in balance', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'aqua-q1', question: 'What do bacteria convert fish waste into?', options: ['Oxygen', 'Nitrate for plants', 'Clean drinking water', 'Fish food'], correctAnswer: 1, explanation: 'Bacteria convert ammonia to nitrate, which plants absorb as fertilizer.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const hydroponicsFundamentals: Module = {
  id: 'food-sov-hydroponics',
  slug: 'hydroponics-fundamentals',
  title: 'Hydroponics Fundamentals',
  description: {
    [LearningLevel.ELEMENTARY]: 'Learn how to grow plants in water without any soil!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Discover the science of growing plants in nutrient-rich water.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore hydroponic systems, plant nutrition, and applications.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze hydroponic production systems and economic viability.',
    [LearningLevel.GRADUATE]: 'Critically examine hydroponics within sustainable intensification debates.',
    [LearningLevel.PHD]: 'Investigate hydroponics as technological fix and agrarian implications.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 20,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [{
    id: 'hydro-1',
    title: 'Growing Without Soil',
    content: {
      [LearningLevel.ELEMENTARY]: '<h2>Water Gardens!</h2><p>Plants can grow without dirt - they just need water with special plant food mixed in!</p>',
      [LearningLevel.MIDDLE_SCHOOL]: '<h2>Introduction to Hydroponics</h2><p>Benefits: faster growth, 70-90% less water, space efficient, year-round growing. Plants need nitrogen, phosphorus, and potassium.</p>',
      [LearningLevel.HIGH_SCHOOL]: '<h2>System Types</h2><p>DWC, NFT, ebb and flow, drip systems, aeroponics. Manage pH (5.5-6.5), EC, temperature, and oxygen.</p>',
      [LearningLevel.UNDERGRADUATE]: '<h2>Efficiency Analysis</h2><p>High water efficiency but energy-intensive. Sustainability depends on energy sources and system design.</p>',
      [LearningLevel.GRADUATE]: '<h2>Sustainable Intensification</h2><p>Proponents see resource efficiency; critics note energy intensity and disconnection from land.</p>',
      [LearningLevel.PHD]: '<h2>Agrarian Futures</h2><p>Soilless agriculture challenges traditional farming identity and raises questions about technological control of food.</p>'
    }
  }],
  activities: [{ id: 'hydro-act-1', title: 'Build Simple System', type: 'STEP_GUIDED', description: 'Build a basic DWC system', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'hydro-game', title: 'Hydroponic Grower', type: 'simulation', description: 'Manage nutrients and grow plants', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'hydro-q1', question: 'How much less water does hydroponics use?', options: ['10-20%', '30-40%', '50-60%', '70-90%'], correctAnswer: 3, explanation: 'Hydroponics uses 70-90% less water than conventional soil farming.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const mushroomCultivation: Module = {
  id: 'food-sov-mushrooms',
  slug: 'mushroom-cultivation',
  title: 'Mushroom Cultivation',
  description: {
    [LearningLevel.ELEMENTARY]: 'Discover the magical world of growing mushrooms!',
    [LearningLevel.MIDDLE_SCHOOL]: 'Learn how mushrooms grow and how to cultivate them at home.',
    [LearningLevel.HIGH_SCHOOL]: 'Explore mushroom biology, cultivation techniques, and sustainable food systems.',
    [LearningLevel.UNDERGRADUATE]: 'Analyze mushroom cultivation as biotechnology and market dynamics.',
    [LearningLevel.GRADUATE]: 'Examine fungi through ecological lenses, including mycoremediation.',
    [LearningLevel.PHD]: 'Investigate mushrooms within multispecies studies and more-than-human food.'
  },
  topic: 'food-sovereignty',
  estimatedMinutes: {
    [LearningLevel.ELEMENTARY]: 25,
    [LearningLevel.MIDDLE_SCHOOL]: 35,
    [LearningLevel.HIGH_SCHOOL]: 50,
    [LearningLevel.UNDERGRADUATE]: 70,
    [LearningLevel.GRADUATE]: 95,
    [LearningLevel.PHD]: 125
  },
  lessons: [{
    id: 'mush-1',
    title: 'The World of Mushrooms',
    content: {
      [LearningLevel.ELEMENTARY]: '<h2>Mushrooms Are Amazing!</h2><p>Mushrooms aren\'t plants - they\'re fungi! They grow from underground networks called mycelium.</p>',
      [LearningLevel.MIDDLE_SCHOOL]: '<h2>Understanding Fungi</h2><p>Mushroom anatomy: cap, gills, stem, mycelium, spores. Common cultivated: button, oyster, shiitake, lion\'s mane.</p>',
      [LearningLevel.HIGH_SCHOOL]: '<h2>Cultivation Techniques</h2><p>Process: spawn production, substrate preparation, inoculation, incubation, fruiting, harvesting. Substrates: straw, sawdust, coffee grounds.</p>',
      [LearningLevel.UNDERGRADUATE]: '<h2>Production Systems</h2><p>Scales from hobby to industrial. Sustainability: converts waste to food, low water/land needs, high protein.</p>',
      [LearningLevel.GRADUATE]: '<h2>Fungi Beyond Food</h2><p>Mycoremediation for pollution cleanup. Mycelium materials for packaging, insulation, leather alternatives.</p>',
      [LearningLevel.PHD]: '<h2>More-Than-Human Fungi</h2><p>Following Anna Tsing, fungi shape worlds through mycorrhizal networks - the "wood wide web" connecting forests.</p>'
    }
  }],
  activities: [{ id: 'mush-act-1', title: 'Mushroom Growing Lab', type: 'STEP_GUIDED', description: 'Start your own mushroom project', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'mush-game', title: 'Mushroom Farm', type: 'simulation', description: 'Manage conditions for healthy mushrooms', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'mush-q1', question: 'What is mycelium?', options: ['The cap of a mushroom', 'Underground fungal network', 'Mushroom spores', 'A type of mushroom'], correctAnswer: 1, explanation: 'Mycelium is the underground network of fungal threads that form the main body of a fungus.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const edibleMedicinalPlants: Module = {
  id: 'food-sov-edible-plants', slug: 'edible-medicinal-plants', title: 'Edible & Medicinal Plants',
  description: { [LearningLevel.ELEMENTARY]: 'Discover plants you can eat and plants that help you feel better!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn to identify edible wild plants and common medicinal herbs.', [LearningLevel.HIGH_SCHOOL]: 'Explore ethnobotany, plant identification, and safe foraging.', [LearningLevel.UNDERGRADUATE]: 'Analyze traditional plant knowledge and intellectual property debates.', [LearningLevel.GRADUATE]: 'Examine ethnobotany through decolonial frameworks.', [LearningLevel.PHD]: 'Investigate plant knowledge as contested terrain in food sovereignty.' },
  topic: 'food-sovereignty',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 25, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'emp-1', title: 'Plants Around Us', content: { [LearningLevel.ELEMENTARY]: '<h2>Nature\'s Grocery!</h2><p>Many wild plants are food! Dandelions, clover, and berries can be eaten if identified safely.</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Foraging Basics</h2><p>The golden rule: never eat anything you can\'t positively identify.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Ethnobotany</h2><p>Studies relationships between people and plants across cultures.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Traditional Knowledge</h2><p>Issues include biopiracy, intellectual property, benefit-sharing.</p>', [LearningLevel.GRADUATE]: '<h2>Decolonizing Plant Knowledge</h2><p>Food sovereignty movements assert rights to traditional plant resources.</p>', [LearningLevel.PHD]: '<h2>Plants as Political</h2><p>Control over plants reflects broader power relations.</p>' } }],
  activities: [{ id: 'emp-act-1', title: 'Plant ID Practice', type: 'DRAG_DROP', description: 'Match plants to uses', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'emp-game', title: 'Forager Quest', type: 'matching', description: 'Identify plants correctly', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'emp-q1', question: 'Most important foraging rule?', options: ['Eat everything green', 'Never eat unidentified plants', 'All berries safe', 'Taste first'], correctAnswer: 1, explanation: 'Never eat wild plants unless positively identified.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const climateResilientCrops: Module = {
  id: 'food-sov-climate-crops', slug: 'climate-resilient-crops', title: 'Climate-Resilient Crops',
  description: { [LearningLevel.ELEMENTARY]: 'Learn about tough plants that grow even in challenging weather!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover crops that survive drought, heat, and extreme weather.', [LearningLevel.HIGH_SCHOOL]: 'Explore climate adaptation through crop selection and breeding.', [LearningLevel.UNDERGRADUATE]: 'Analyze climate-resilient agriculture and genetic resources.', [LearningLevel.GRADUATE]: 'Examine climate adaptation through agrobiodiversity lenses.', [LearningLevel.PHD]: 'Investigate crop genetic resources governance and climate justice.' },
  topic: 'food-sovereignty',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'crc-1', title: 'Crops That Survive', content: { [LearningLevel.ELEMENTARY]: '<h2>Tough Plants!</h2><p>Some plants grow even when very hot, dry, or stormy.</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Climate-Adapted Crops</h2><p>Traditional varieties often have built-in resilience.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Adaptation Strategies</h2><p>Select drought-tolerant varieties, diversify crops, adjust planting dates.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Agrobiodiversity</h2><p>Crop diversity provides raw material for adaptation.</p>', [LearningLevel.GRADUATE]: '<h2>Seed Systems</h2><p>Who controls seeds shapes adaptive capacity.</p>', [LearningLevel.PHD]: '<h2>Climate Justice</h2><p>Those least responsible for climate change have fewest adaptation resources.</p>' } }],
  activities: [{ id: 'crc-act-1', title: 'Climate Crop Selection', type: 'SCENARIO', description: 'Choose crops for changing climate', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'crc-game', title: 'Climate Farmer', type: 'simulation', description: 'Adapt to climate challenges', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'crc-q1', question: 'Why are traditional varieties important for climate adaptation?', options: ['Easier to grow', 'Contain diverse genetic traits', 'Taste better', 'Cost less'], correctAnswer: 1, explanation: 'Traditional varieties contain diverse genetic traits for resilience.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

export const foodStorageRootCellars: Module = {
  id: 'food-sov-storage', slug: 'food-storage-root-cellars', title: 'Food Storage & Root Cellars',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how people kept food fresh before refrigerators!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover traditional food storage methods including root cellars.', [LearningLevel.HIGH_SCHOOL]: 'Explore the science of food storage and root cellar design.', [LearningLevel.UNDERGRADUATE]: 'Analyze food storage for food security and resilience.', [LearningLevel.GRADUATE]: 'Examine storage through material culture frameworks.', [LearningLevel.PHD]: 'Investigate storage as sites of autonomy and preparedness.' },
  topic: 'food-sovereignty',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 20, [LearningLevel.MIDDLE_SCHOOL]: 30, [LearningLevel.HIGH_SCHOOL]: 45, [LearningLevel.UNDERGRADUATE]: 65, [LearningLevel.GRADUATE]: 90, [LearningLevel.PHD]: 120 },
  lessons: [{ id: 'fsrc-1', title: 'Keeping Food Fresh', content: { [LearningLevel.ELEMENTARY]: '<h2>Before Refrigerators!</h2><p>Root cellars kept vegetables fresh underground where it\'s cool and dark.</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Root Cellar Basics</h2><p>Uses Earth\'s stable 50-55°F temperature. Key: temperature, humidity, ventilation.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Storage Science</h2><p>Different crops need different conditions. Potatoes: dark, humid. Onions: dry, cool.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Storage and Security</h2><p>Extends harvest, reduces waste, builds food security without energy inputs.</p>', [LearningLevel.GRADUATE]: '<h2>Material Culture</h2><p>Storage infrastructure shapes household food practices.</p>', [LearningLevel.PHD]: '<h2>Storage and Autonomy</h2><p>Capacity relates to household autonomy from food markets.</p>' } }],
  activities: [{ id: 'fsrc-act-1', title: 'Design Root Cellar', type: 'SIMULATION', description: 'Plan storage for your climate', estimatedMinutes: 20, interactiveContent: {} }],
  game: { id: 'fsrc-game', title: 'Storage Master', type: 'sorting', description: 'Match foods to proper storage', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'fsrc-q1', question: 'Root cellar temperature range?', options: ['32-40°F', '50-55°F', '65-70°F', '75-80°F'], correctAnswer: 1, explanation: 'Root cellars maintain about 50-55°F.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

export const canningPickling: Module = {
  id: 'food-sov-canning', slug: 'canning-pickling', title: 'Canning & Pickling',
  description: { [LearningLevel.ELEMENTARY]: 'Learn how to put summer vegetables in jars for winter!', [LearningLevel.MIDDLE_SCHOOL]: 'Discover home canning and pickling.', [LearningLevel.HIGH_SCHOOL]: 'Master canning safety and techniques.', [LearningLevel.UNDERGRADUATE]: 'Analyze canning as technology and cultural practice.', [LearningLevel.GRADUATE]: 'Examine canning cultures through food studies.', [LearningLevel.PHD]: 'Investigate canning as gendered labor and resistance.' },
  topic: 'food-sovereignty',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 25, [LearningLevel.MIDDLE_SCHOOL]: 40, [LearningLevel.HIGH_SCHOOL]: 55, [LearningLevel.UNDERGRADUATE]: 75, [LearningLevel.GRADUATE]: 100, [LearningLevel.PHD]: 130 },
  lessons: [{ id: 'cp-1', title: 'Putting Food in Jars', content: { [LearningLevel.ELEMENTARY]: '<h2>Jars of Summer!</h2><p>Save summer tomatoes and cucumbers in jars for winter!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Canning Basics</h2><p>Heat kills microorganisms, seals jars. Water bath for high-acid, pressure for low-acid.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Canning Safety</h2><p>Botulism prevention: use tested recipes, proper times, pressure can low-acid foods.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Canning History</h2><p>Spread in early 1900s, peaked during WWII Victory Gardens, reviving today.</p>', [LearningLevel.GRADUATE]: '<h2>Canning Cultures</h2><p>Encodes gender, class, regional identities.</p>', [LearningLevel.PHD]: '<h2>Canning as Resistance</h2><p>Resistance to industrial food, but also unpaid domestic labor.</p>' } }],
  activities: [{ id: 'cp-act-1', title: 'Canning Process', type: 'STEP_GUIDED', description: 'Follow safe canning steps', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'cp-game', title: 'Canning Kitchen', type: 'simulation', description: 'Safely preserve harvest', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'cp-q1', question: 'Why pressure can low-acid foods?', options: ['Faster', 'Higher temps kill botulism', 'Less energy', 'Tastes better'], correctAnswer: 1, explanation: 'Pressure canning reaches 240°F, killing botulism spores.', difficulty: LearningLevel.HIGH_SCHOOL }] }
}

export const homeDairyProcessing: Module = {
  id: 'food-sov-dairy', slug: 'home-dairy-processing', title: 'Home Dairy Processing',
  description: { [LearningLevel.ELEMENTARY]: 'Discover how milk becomes cheese, yogurt, and butter!', [LearningLevel.MIDDLE_SCHOOL]: 'Learn to make dairy products at home.', [LearningLevel.HIGH_SCHOOL]: 'Explore dairy processing science and fermentation.', [LearningLevel.UNDERGRADUATE]: 'Analyze artisan dairy in alternative food systems.', [LearningLevel.GRADUATE]: 'Examine raw milk politics and food safety governance.', [LearningLevel.PHD]: 'Investigate dairy cultures as tradition and contested modernity.' },
  topic: 'food-sovereignty',
  estimatedMinutes: { [LearningLevel.ELEMENTARY]: 25, [LearningLevel.MIDDLE_SCHOOL]: 35, [LearningLevel.HIGH_SCHOOL]: 50, [LearningLevel.UNDERGRADUATE]: 70, [LearningLevel.GRADUATE]: 95, [LearningLevel.PHD]: 125 },
  lessons: [{ id: 'hdp-1', title: 'Milk Magic', content: { [LearningLevel.ELEMENTARY]: '<h2>Milk Transformations!</h2><p>Shake cream for butter, add cultures for yogurt, use rennet for cheese!</p>', [LearningLevel.MIDDLE_SCHOOL]: '<h2>Dairy Basics</h2><p>Butter: agitate cream. Yogurt: add cultures, keep warm. Cheese: add acid or rennet.</p>', [LearningLevel.HIGH_SCHOOL]: '<h2>Dairy Science</h2><p>Milk contains proteins, fats, sugars. Processing uses heat, acid, enzymes, cultures.</p>', [LearningLevel.UNDERGRADUATE]: '<h2>Artisan Dairy</h2><p>Small-scale competes with industrial. Raw milk sales restricted despite demand.</p>', [LearningLevel.GRADUATE]: '<h2>Raw Milk Politics</h2><p>Debates pit food safety vs food sovereignty, risk vs consumer choice.</p>', [LearningLevel.PHD]: '<h2>Dairy Cultures</h2><p>Traditional practices embody cultural knowledge and agrarian relations.</p>' } }],
  activities: [{ id: 'hdp-act-1', title: 'Make Simple Cheese', type: 'STEP_GUIDED', description: 'Make ricotta at home', estimatedMinutes: 25, interactiveContent: {} }],
  game: { id: 'hdp-game', title: 'Dairy Artisan', type: 'simulation', description: 'Transform milk into products', difficulty: { [LearningLevel.ELEMENTARY]: { lives: 5, timeLimit: null, hints: true }, [LearningLevel.MIDDLE_SCHOOL]: { lives: 4, timeLimit: 300, hints: true }, [LearningLevel.HIGH_SCHOOL]: { lives: 3, timeLimit: 240, hints: false }, [LearningLevel.UNDERGRADUATE]: { lives: 3, timeLimit: 180, hints: false }, [LearningLevel.GRADUATE]: { lives: 2, timeLimit: 120, hints: false }, [LearningLevel.PHD]: { lives: 1, timeLimit: 90, hints: false } } },
  quiz: { questions: [{ id: 'hdp-q1', question: 'What curdles milk for cheese?', options: ['Sugar', 'Salt', 'Acid or rennet', 'Water'], correctAnswer: 2, explanation: 'Acid or rennet causes milk proteins to coagulate.', difficulty: LearningLevel.MIDDLE_SCHOOL }] }
}

// Export all Food Sovereignty modules
export const foodSovereigntyModules: Module[] = [
  introToFoodSovereignty,
  seedSavingFundamentals,
  communityGardens,
  urbanFarming,
  foodPreservation,
  fermentationCulturedFoods,
  localFoodNetworks,
  foodPolicyAdvocacy,
  landAccessRights,
  agroecologyPrinciples,
  fairTradeSystems,
  foodJusticeEquity,
  seasonalNutritionalEating,
  traditionalFarmingMethods,
  organicFarmingPractices,
  smallScaleLivestock,
  beekeepingPollinators,
  aquaponicsSystems,
  hydroponicsFundamentals,
  mushroomCultivation,
  edibleMedicinalPlants,
  climateResilientCrops,
  foodStorageRootCellars,
  canningPickling,
  homeDairyProcessing
]
