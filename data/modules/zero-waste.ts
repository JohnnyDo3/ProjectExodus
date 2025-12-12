// Zero Waste Living Modules - Complete Content for All Learning Levels
import { Module } from './index'

export const zeroWasteModules: Module[] = [
  // Module 1: Composting Fundamentals
  {
    id: 'zero-waste-composting',
    slug: 'composting-fundamentals',
    title: 'Composting Fundamentals',
    description: {
      ELEMENTARY: 'Turn food scraps into garden gold! Learn how nature recycles everything.',
      MIDDLE_SCHOOL: 'Master the science and art of composting to reduce waste and create rich soil.',
      HIGH_SCHOOL: 'Understand decomposition chemistry, composting methods, and applications at various scales.',
      UNDERGRADUATE: 'Analyze composting systems design, process optimization, and integration with waste management.',
      GRADUATE: 'Evaluate industrial composting, anaerobic digestion, and circular bioeconomy strategies.',
      PHD: 'Research microbial ecology of decomposition, emissions management, and novel organic processing.'
    },
    topic: 'zero-waste',
    category: 'COMPOSTING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 30, MIDDLE_SCHOOL: 40, HIGH_SCHOOL: 55, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [
      {
        id: 'compost-lesson-1',
        title: 'What is Composting?',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'DRAG_DROP',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🍂 Nature's Recycling!</h2><div class="intro"><p>In nature, nothing is wasted. When leaves fall and fruits drop, tiny creatures turn them back into soil. Composting is how we help this happen!</p></div><h3>What Can You Compost?</h3><div class="yes-no-grid"><div class="yes"><h4>✅ YES!</h4><ul><li>🍎 Fruit and veggie scraps</li><li>🥚 Eggshells</li><li>🍂 Leaves</li><li>🌱 Grass clippings</li><li>☕ Coffee grounds</li></ul></div><div class="no"><h4>❌ NO!</h4><ul><li>🥩 Meat</li><li>🧀 Dairy</li><li>🛢️ Oils</li><li>🐕 Pet waste</li></ul></div></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>The Science of Decomposition</h2><h3>What Happens in a Compost Pile?</h3><p>Billions of microorganisms break down organic matter through aerobic (with oxygen) decomposition.</p><h3>The Key Ingredients</h3><ul><li><strong>Greens (Nitrogen):</strong> Food scraps, grass, coffee grounds</li><li><strong>Browns (Carbon):</strong> Leaves, cardboard, straw</li><li><strong>Water:</strong> Moisture for microbes</li><li><strong>Air:</strong> Oxygen for aerobic decomposition</li></ul><h3>The Magic Ratio</h3><p>Aim for roughly 3 parts brown to 1 part green by volume for optimal composting.</p></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Composting Chemistry</h2><h3>C:N Ratio</h3><p>The carbon to nitrogen ratio drives microbial activity:</p><ul><li>Ideal range: 25-30:1</li><li>Too high (>40:1): Slow decomposition</li><li>Too low (<20:1): Nitrogen loss, odors</li></ul><h3>Temperature Phases</h3><ol><li><strong>Mesophilic (20-40°C):</strong> Initial breakdown</li><li><strong>Thermophilic (40-70°C):</strong> Rapid decomposition, pathogen kill</li><li><strong>Cooling:</strong> Slower decomposition continues</li><li><strong>Curing:</strong> Stabilization and maturation</li></ol><h3>Common C:N Ratios</h3><table><tr><th>Material</th><th>C:N</th></tr><tr><td>Food scraps</td><td>15:1</td></tr><tr><td>Grass clippings</td><td>20:1</td></tr><tr><td>Leaves</td><td>50:1</td></tr><tr><td>Cardboard</td><td>350:1</td></tr></table></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Composting Systems Engineering</h2><h3>System Types</h3><ul><li><strong>Windrow:</strong> Long rows, periodic turning, large scale</li><li><strong>Aerated static pile:</strong> Forced aeration, less turning</li><li><strong>In-vessel:</strong> Enclosed systems, process control</li><li><strong>Vermicomposting:</strong> Worm-mediated, lower temperature</li></ul><h3>Process Parameters</h3><ul><li>Moisture: 50-60% optimal</li><li>Oxygen: >5% in pile</li><li>Temperature: 55-65°C for pathogen reduction</li><li>Time: Weeks to months depending on system</li></ul><h3>Quality Standards</h3><p>EPA 40 CFR Part 503 defines Class A (unrestricted use) and Class B compost standards.</p></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Industrial Organic Processing</h2><h3>Anaerobic Digestion</h3><p>Biogas production from organic waste:</p><ul><li>Methane yield: 200-400 m³/ton VS</li><li>Digestate as fertilizer</li><li>Energy balance considerations</li></ul><h3>Emissions Management</h3><ul><li>Methane from anaerobic zones</li><li>Nitrous oxide from nitrogen cycling</li><li>VOCs and odor control</li><li>Biofilter and cover systems</li></ul><h3>Integration with Waste Systems</h3><p>Source separation, contamination management, end-market development.</p></div>`,
          PHD: `<div class="lesson-content"><h2>Organic Processing Research</h2><h3>Microbial Ecology</h3><ul><li>Succession during composting phases</li><li>Functional metagenomics of decomposition</li><li>Inoculant development</li></ul><h3>Emissions Quantification</h3><ul><li>Chamber and mass balance methods</li><li>Flux modeling</li><li>Climate impact assessment</li></ul><h3>Novel Technologies</h3><ul><li>Black soldier fly processing</li><li>Hydrothermal carbonization</li><li>Biorefinery integration</li></ul></div>`
        }
      },
      {
        id: 'compost-lesson-2',
        title: 'Building Your Compost System',
        order: 2,
        duration: 15,
        hasActivity: true,
        activityType: 'STEP_GUIDED',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🏗️ Make Your Own Compost Bin!</h2><h3>Simple Steps</h3><ol><li>Find a spot in your yard (ask a grown-up!)</li><li>Start with a layer of sticks for air</li><li>Add brown stuff (leaves, cardboard)</li><li>Add green stuff (food scraps)</li><li>Keep it moist like a sponge</li><li>Wait and watch the magic happen!</li></ol><div class="tip-box"><p>🐛 You might see worms - they're helpers!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Composting Methods</h2><h3>Bin Composting</h3><p>Enclosed containers keep materials contained and can speed decomposition.</p><h3>Pile Composting</h3><p>Open piles work well for larger quantities of yard waste.</p><h3>Tumbler Composting</h3><p>Rotating drums make turning easy and can produce compost faster.</p><h3>Vermicomposting</h3><p>Red wiggler worms process food scraps indoors - great for apartments!</p><h3>Troubleshooting</h3><ul><li><strong>Smelly?</strong> Too wet or too many greens - add browns</li><li><strong>Not decomposing?</strong> Too dry or too many browns - add water and greens</li><li><strong>Pests?</strong> Bury food scraps, avoid meat/dairy</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Optimizing Your Compost</h2><h3>Monitoring Parameters</h3><ul><li><strong>Temperature:</strong> Use compost thermometer, target 130-150°F</li><li><strong>Moisture:</strong> Squeeze test - should feel like wrung sponge</li><li><strong>Aeration:</strong> Turn every 1-2 weeks or use passive aeration</li></ul><h3>Accelerating Decomposition</h3><ul><li>Smaller particle size increases surface area</li><li>Proper C:N ratio fuels microbes</li><li>Adequate moisture and oxygen</li><li>Larger pile retains heat better</li></ul><h3>Finished Compost Indicators</h3><ul><li>Dark, crumbly texture</li><li>Earthy smell</li><li>Original materials unrecognizable</li><li>Temperature stable near ambient</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>System Design and Management</h2><h3>Site Selection</h3><ul><li>Drainage and runoff management</li><li>Access for materials and equipment</li><li>Buffer zones and neighbors</li><li>Regulatory requirements</li></ul><h3>Process Control</h3><ul><li>Recipe development for feedstock mix</li><li>Monitoring and documentation</li><li>PFRP (Process to Further Reduce Pathogens) compliance</li></ul><h3>End Product Quality</h3><ul><li>Maturity testing (germination, respiration)</li><li>Stability assessment</li><li>Contaminant screening</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Commercial Composting Operations</h2><h3>Facility Design</h3><ul><li>Throughput and retention time calculations</li><li>Equipment selection</li><li>Leachate management</li><li>Odor control systems</li></ul><h3>Economics</h3><ul><li>Tipping fees vs. product sales</li><li>Operating cost structures</li><li>Market development</li></ul><h3>Regulatory Compliance</h3><ul><li>Permit requirements</li><li>Testing and reporting</li><li>Neighbor relations</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Advanced Composting Research</h2><h3>Process Optimization</h3><ul><li>Real-time monitoring systems</li><li>Predictive modeling</li><li>Automation and control</li></ul><h3>Emerging Applications</h3><ul><li>Compost as biofilter medium</li><li>Disease suppressive composts</li><li>Biochar-compost combinations</li></ul><h3>Life Cycle Assessment</h3><p>Comparing composting with other organic waste options across environmental impact categories.</p></div>`
        }
      }
    ],
    activities: [
      {
        id: 'compost-activity-1',
        type: 'DRAG_DROP',
        title: {
          ELEMENTARY: 'Sort the Scraps!',
          MIDDLE_SCHOOL: 'Build a Balanced Pile',
          HIGH_SCHOOL: 'Calculate C:N Ratio',
          UNDERGRADUATE: 'Design a Recipe',
          GRADUATE: 'Facility Layout',
          PHD: 'Process Optimization'
        },
        description: {
          ELEMENTARY: 'Drag items to the compost bin or trash!',
          MIDDLE_SCHOOL: 'Balance greens and browns in your compost.',
          HIGH_SCHOOL: 'Mix materials to achieve optimal C:N ratio.',
          UNDERGRADUATE: 'Design a feedstock recipe for target output.',
          GRADUATE: 'Layout a commercial composting facility.',
          PHD: 'Optimize process parameters for multiple objectives.'
        },
        config: {
          ELEMENTARY: { items: 10, hints: true, timeLimit: null },
          MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 },
          HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 },
          UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 },
          GRADUATE: { items: 22, hints: false, timeLimit: 90 },
          PHD: { items: 25, hints: false, timeLimit: 60 }
        }
      }
    ],
    game: {
      id: 'compost-game',
      type: 'sorting',
      title: 'Compost Master',
      description: 'Sort materials and build the perfect compost pile!',
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
      id: 'compost-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'cq1',
          question: {
            ELEMENTARY: 'Which of these can go in the compost?',
            MIDDLE_SCHOOL: 'What is the ideal ratio of browns to greens?',
            HIGH_SCHOOL: 'What is the optimal C:N ratio for composting?',
            UNDERGRADUATE: 'What temperature is needed for pathogen reduction (PFRP)?',
            GRADUATE: 'What is the typical methane yield from anaerobic digestion?',
            PHD: 'What microbial phase dominates the thermophilic stage?'
          },
          options: {
            ELEMENTARY: ['Apple cores and leaves', 'Plastic bags', 'Glass bottles', 'Metal cans'],
            MIDDLE_SCHOOL: ['3 parts brown to 1 part green', '1 to 1', 'All browns', 'All greens'],
            HIGH_SCHOOL: ['25-30:1', '100:1', '5:1', '1:1'],
            UNDERGRADUATE: ['55°C for 3+ days', '30°C for 1 day', '80°C for 1 hour', '20°C for 1 week'],
            GRADUATE: ['200-400 m³/ton VS', '10-20 m³/ton VS', '1000+ m³/ton VS', '50 m³/ton VS'],
            PHD: ['Thermophilic bacteria and actinomycetes', 'Psychrophilic fungi', 'Mesophilic protozoa', 'Cryophilic archaea']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Fruit scraps and leaves are perfect for composting!',
            MIDDLE_SCHOOL: 'About 3 parts brown materials to 1 part green gives the right carbon-nitrogen balance.',
            HIGH_SCHOOL: 'A C:N ratio of 25-30:1 provides optimal conditions for microbial decomposition.',
            UNDERGRADUATE: '55°C (131°F) for at least 3 days is required by EPA for pathogen reduction.',
            GRADUATE: 'Typical biogas yields are 200-400 cubic meters per ton of volatile solids.',
            PHD: 'Thermophilic bacteria and actinomycetes dominate at high temperatures (40-70°C).'
          }
        }
      ]
    },
    externalResources: [
      { title: 'EPA Composting Guide', url: 'https://www.epa.gov/recycle/composting-home', type: 'article' },
      { title: 'US Composting Council', url: 'https://www.compostingcouncil.org/', type: 'research' }
    ]
  },
  // Module 2: Circular Economy Principles
  {
    id: 'zero-waste-circular',
    slug: 'circular-economy',
    title: 'Circular Economy Principles',
    description: {
      ELEMENTARY: 'Imagine if nothing was ever thrown away! Learn about the circle of stuff.',
      MIDDLE_SCHOOL: 'Discover how we can design waste out of our systems entirely.',
      HIGH_SCHOOL: 'Understand circular economy frameworks, business models, and design principles.',
      UNDERGRADUATE: 'Analyze circular economy implementation, metrics, and policy frameworks.',
      GRADUATE: 'Evaluate systemic approaches to circularity across sectors and scales.',
      PHD: 'Research circular economy transitions, material flow analysis, and transformation pathways.'
    },
    topic: 'zero-waste',
    category: 'CIRCULAR ECONOMY',
    icon: 'RefreshCw',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 65, GRADUATE: 85, PHD: 110 },
    isMasterclass: false,
    lessons: [
      {
        id: 'circular-lesson-1',
        title: 'From Linear to Circular',
        order: 1,
        duration: 15,
        hasActivity: true,
        activityType: 'SIMULATION',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>♻️ The Circle of Stuff!</h2><h3>The Old Way (Linear)</h3><p>Take → Make → Use → Throw Away 😢</p><h3>The New Way (Circular)</h3><p>Make → Use → Reuse → Remake → Use Again! 😊</p><div class="example"><p>Think of a glass jar: You buy jam, eat it, then use the jar for storage, then recycle it into a new jar!</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Linear vs Circular Economy</h2><h3>Linear Economy Problems</h3><ul><li>Resource depletion</li><li>Pollution and waste</li><li>Climate emissions</li><li>Ecosystem destruction</li></ul><h3>Circular Economy Solutions</h3><ul><li><strong>Design out waste:</strong> Products made to last and be reused</li><li><strong>Keep materials in use:</strong> Repair, reuse, recycle</li><li><strong>Regenerate nature:</strong> Return nutrients to ecosystems</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Circular Economy Framework</h2><h3>The Butterfly Diagram</h3><p>Ellen MacArthur Foundation's model shows two cycles:</p><ul><li><strong>Technical cycle:</strong> Products maintained, reused, refurbished, recycled</li><li><strong>Biological cycle:</strong> Organic materials return to biosphere</li></ul><h3>Value Retention Hierarchy</h3><ol><li>Maintain/prolong (highest value)</li><li>Reuse/redistribute</li><li>Refurbish/remanufacture</li><li>Recycle (lowest value retention)</li></ol><h3>Design Principles</h3><ul><li>Design for durability</li><li>Design for disassembly</li><li>Design for recyclability</li><li>Use safe, circular materials</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Circular Business Models</h2><h3>Model Types</h3><ul><li><strong>Product-as-Service:</strong> Access over ownership</li><li><strong>Product Life Extension:</strong> Repair, upgrade services</li><li><strong>Resource Recovery:</strong> Take-back and recycling</li><li><strong>Sharing Platforms:</strong> Collaborative consumption</li><li><strong>Circular Supply:</strong> Renewable/recycled inputs</li></ul><h3>Implementation Challenges</h3><ul><li>Reverse logistics complexity</li><li>Quality and consistency of secondary materials</li><li>Consumer acceptance and behavior change</li><li>Economic viability vs. linear alternatives</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Systemic Circularity</h2><h3>Industrial Symbiosis</h3><p>Waste from one industry becomes feedstock for another (e.g., Kalundborg, Denmark).</p><h3>Urban Metabolism</h3><p>Material and energy flows through cities - opportunities for circular urban systems.</p><h3>Policy Instruments</h3><ul><li>Extended Producer Responsibility</li><li>Green public procurement</li><li>Material taxes and virgin material levies</li><li>Right to repair legislation</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Circular Economy Research</h2><h3>Material Flow Analysis</h3><p>Tracking materials through economy to identify intervention points.</p><h3>Circularity Metrics</h3><ul><li>Material Circularity Indicator</li><li>Circular Economy Index</li><li>Resource efficiency metrics</li><li>Value retention measures</li></ul><h3>Transition Research</h3><ul><li>Socio-technical transitions</li><li>Business model innovation</li><li>Consumer practice change</li><li>Policy coherence</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'circular-activity-1',
        type: 'SIMULATION',
        title: {
          ELEMENTARY: 'Follow the Circle!',
          MIDDLE_SCHOOL: 'Design a Circular Product',
          HIGH_SCHOOL: 'Business Model Canvas',
          UNDERGRADUATE: 'Circular System Design',
          GRADUATE: 'Industrial Symbiosis Network',
          PHD: 'Material Flow Model'
        },
        description: {
          ELEMENTARY: 'Help products go around the circle instead of to trash!',
          MIDDLE_SCHOOL: 'Design a product that can be reused and recycled.',
          HIGH_SCHOOL: 'Create a circular business model for a product.',
          UNDERGRADUATE: 'Design a circular system for a product category.',
          GRADUATE: 'Map industrial symbiosis opportunities in a region.',
          PHD: 'Build a material flow analysis model.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', variables: 3 },
          MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 },
          HIGH_SCHOOL: { complexity: 'intermediate', variables: 8 },
          UNDERGRADUATE: { complexity: 'advanced', variables: 12 },
          GRADUATE: { complexity: 'expert', variables: 18 },
          PHD: { complexity: 'research', variables: 25 }
        }
      }
    ],
    game: {
      id: 'circular-game',
      type: 'puzzle',
      title: 'Circular Challenge',
      description: 'Complete the circular economy loops!',
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
      id: 'circular-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'cirq1',
          question: {
            ELEMENTARY: 'In a circular economy, what happens to old products?',
            MIDDLE_SCHOOL: 'What are the three principles of circular economy?',
            HIGH_SCHOOL: 'In the value retention hierarchy, what preserves the most value?',
            UNDERGRADUATE: 'What is a product-as-service business model?',
            GRADUATE: 'What is industrial symbiosis?',
            PHD: 'What metric measures material circularity at product level?'
          },
          options: {
            ELEMENTARY: ['They get reused or recycled', 'They all go to landfill', 'They disappear', 'They go to space'],
            MIDDLE_SCHOOL: ['Design out waste, keep materials in use, regenerate nature', 'Take, make, dispose', 'Buy, use, throw', 'Mine, manufacture, dump'],
            HIGH_SCHOOL: ['Maintain/prolong', 'Recycle', 'Incinerate', 'Landfill'],
            UNDERGRADUATE: ['Customers pay for access/use rather than ownership', 'Selling products as fast as possible', 'Only selling services', 'Free products'],
            GRADUATE: ['Waste from one industry becomes input for another', 'Industries competing for resources', 'Factories working alone', 'Outsourcing production'],
            PHD: ['Material Circularity Indicator (MCI)', 'GDP', 'Carbon footprint', 'Water footprint']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'In a circular economy, things are reused, repaired, and recycled instead of thrown away!',
            MIDDLE_SCHOOL: 'The three principles are: design out waste, keep materials in use, and regenerate natural systems.',
            HIGH_SCHOOL: 'Maintaining and prolonging product use preserves the most embedded value.',
            UNDERGRADUATE: 'Product-as-service means customers pay for the function/outcome rather than owning the product.',
            GRADUATE: 'Industrial symbiosis creates networks where one facility\'s waste becomes another\'s resource.',
            PHD: 'The Material Circularity Indicator measures how restorative material flows are for a product.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' },
      { title: 'Circular Economy Club', url: 'https://www.circulareconomyclub.com/', type: 'article' }
    ]
  },
  // MASTERCLASS: Zero Waste Lifestyle Transformation
  {
    id: 'zero-waste-masterclass',
    slug: 'zero-waste-masterclass',
    title: 'Zero Waste Lifestyle Masterclass',
    description: {
      ELEMENTARY: 'Become a zero waste superhero! Learn to make almost no trash.',
      MIDDLE_SCHOOL: 'Master the art of reducing, reusing, and living with less waste.',
      HIGH_SCHOOL: 'Comprehensive guide to zero waste living, from personal choices to systemic change.',
      UNDERGRADUATE: 'Advanced analysis of waste reduction strategies, behavior change, and policy.',
      GRADUATE: 'Expert examination of waste systems transformation and circular transitions.',
      PHD: 'Research synthesis of waste prevention, behavior science, and system innovation.'
    },
    topic: 'zero-waste',
    category: 'MASTERCLASS',
    icon: 'Award',
    color: 'moss',
    duration: { ELEMENTARY: 45, MIDDLE_SCHOOL: 60, HIGH_SCHOOL: 90, UNDERGRADUATE: 120, GRADUATE: 150, PHD: 180 },
    isMasterclass: true,
    hasVideo: true,
    lessons: [
      {
        id: 'master-zw-1',
        title: 'The Zero Waste Journey',
        order: 1,
        duration: 20,
        hasActivity: true,
        activityType: 'SCENARIO',
        content: {
          ELEMENTARY: `<div class="lesson-content"><h2>🌟 Your Zero Waste Adventure!</h2><h3>The 5 R's</h3><ol><li><strong>Refuse</strong> - Say no to things you don't need</li><li><strong>Reduce</strong> - Use less stuff</li><li><strong>Reuse</strong> - Use things again and again</li><li><strong>Recycle</strong> - Turn old into new</li><li><strong>Rot</strong> - Compost food scraps</li></ol><div class="challenge"><p>Can you go one whole day without making any trash?</p></div></div>`,
          MIDDLE_SCHOOL: `<div class="lesson-content"><h2>Zero Waste Fundamentals</h2><h3>The Waste Hierarchy</h3><ol><li>Prevention (best)</li><li>Minimization</li><li>Reuse</li><li>Recycling</li><li>Energy recovery</li><li>Disposal (worst)</li></ol><h3>Starting Your Journey</h3><ul><li>Audit your trash - what do you throw away most?</li><li>Start with easy swaps (reusable bags, bottles)</li><li>Progress to harder changes over time</li><li>Don't aim for perfection - progress matters!</li></ul></div>`,
          HIGH_SCHOOL: `<div class="lesson-content"><h2>Zero Waste Systems Thinking</h2><h3>Personal vs Systemic</h3><p>Individual actions matter, but systemic change is essential:</p><ul><li>Producer responsibility for packaging</li><li>Infrastructure for reuse and repair</li><li>Policy to internalize waste costs</li></ul><h3>Life Cycle Perspective</h3><p>Consider full impacts: production, use, and end-of-life.</p><h3>Effective Interventions</h3><ul><li>High-impact swaps (e.g., eliminating single-use plastics)</li><li>Behavior change that sticks</li><li>Advocacy for systemic solutions</li></ul></div>`,
          UNDERGRADUATE: `<div class="lesson-content"><h2>Waste Prevention Science</h2><h3>Behavioral Economics</h3><ul><li>Default effects</li><li>Social norms</li><li>Commitment devices</li><li>Feedback and salience</li></ul><h3>Policy Instruments</h3><ul><li>Bans and restrictions</li><li>Economic incentives (taxes, fees)</li><li>Information and labeling</li><li>Infrastructure investment</li></ul><h3>Measuring Success</h3><ul><li>Per capita waste generation</li><li>Diversion rates</li><li>Material recovery quality</li><li>Upstream indicators</li></ul></div>`,
          GRADUATE: `<div class="lesson-content"><h2>Waste System Transformation</h2><h3>Transition Management</h3><p>Long-term, multi-stakeholder approach to system change.</p><h3>Innovation Systems</h3><ul><li>Niche experiments and scaling</li><li>Regime destabilization</li><li>Landscape pressures</li></ul><h3>Justice Considerations</h3><ul><li>Waste worker impacts</li><li>Community burden distribution</li><li>Access to alternatives</li><li>Global waste trade</li></ul></div>`,
          PHD: `<div class="lesson-content"><h2>Waste Research Frontiers</h2><h3>Behavioral Research</h3><ul><li>Long-term behavior persistence</li><li>Spillover effects</li><li>Identity and values</li></ul><h3>Systems Modeling</h3><ul><li>Agent-based models of waste behavior</li><li>System dynamics of waste flows</li><li>Scenario analysis</li></ul><h3>Innovation Research</h3><ul><li>Business model experimentation</li><li>Policy innovation</li><li>Social innovation</li></ul></div>`
        }
      }
    ],
    activities: [
      {
        id: 'master-zw-activity-1',
        type: 'SCENARIO',
        title: {
          ELEMENTARY: 'A Day Without Trash',
          MIDDLE_SCHOOL: 'Zero Waste Week',
          HIGH_SCHOOL: 'Household Audit',
          UNDERGRADUATE: 'Campus Zero Waste Plan',
          GRADUATE: 'City Waste Strategy',
          PHD: 'Transition Pathway Design'
        },
        description: {
          ELEMENTARY: 'Make choices throughout a day to avoid creating trash!',
          MIDDLE_SCHOOL: 'Plan a week of zero waste living.',
          HIGH_SCHOOL: 'Audit household waste and design reduction strategies.',
          UNDERGRADUATE: 'Develop a zero waste plan for a campus.',
          GRADUATE: 'Design a city-wide waste reduction strategy.',
          PHD: 'Model transition pathways to zero waste systems.'
        },
        config: {
          ELEMENTARY: { complexity: 'basic', choices: 8 },
          MIDDLE_SCHOOL: { complexity: 'simple', choices: 12 },
          HIGH_SCHOOL: { complexity: 'intermediate', choices: 16 },
          UNDERGRADUATE: { complexity: 'advanced', choices: 20 },
          GRADUATE: { complexity: 'expert', choices: 25 },
          PHD: { complexity: 'research', choices: 30 }
        }
      }
    ],
    game: {
      id: 'master-zw-game',
      type: 'timed_challenge',
      title: 'Zero Waste Master Challenge',
      description: 'Test your comprehensive zero waste knowledge!',
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
      id: 'master-zw-quiz',
      passingScore: 80,
      questions: [
        {
          id: 'mzwq1',
          question: {
            ELEMENTARY: 'What is the first R in the 5 R\'s?',
            MIDDLE_SCHOOL: 'What is at the top of the waste hierarchy?',
            HIGH_SCHOOL: 'What type of change is most impactful for waste reduction?',
            UNDERGRADUATE: 'What behavioral economics concept involves pre-set options?',
            GRADUATE: 'What approach involves long-term multi-stakeholder system change?',
            PHD: 'What research method models individual waste decisions?'
          },
          options: {
            ELEMENTARY: ['Refuse', 'Recycle', 'Reuse', 'Reduce'],
            MIDDLE_SCHOOL: ['Prevention', 'Recycling', 'Landfill', 'Incineration'],
            HIGH_SCHOOL: ['Systemic change', 'Individual recycling', 'Buying green products', 'Wishcycling'],
            UNDERGRADUATE: ['Default effects', 'Loss aversion', 'Anchoring', 'Framing'],
            GRADUATE: ['Transition management', 'Command and control', 'Market forces', 'Technology push'],
            PHD: ['Agent-based modeling', 'Regression analysis', 'Case studies', 'Focus groups']
          },
          correctIndex: 0,
          explanation: {
            ELEMENTARY: 'Refuse comes first - say no to things you don\'t need before they become waste!',
            MIDDLE_SCHOOL: 'Prevention is at the top - the best waste is waste that\'s never created.',
            HIGH_SCHOOL: 'Systemic change (policy, infrastructure, producer responsibility) has the greatest impact.',
            UNDERGRADUATE: 'Default effects shape choices through pre-set options (e.g., opt-out vs. opt-in).',
            GRADUATE: 'Transition management coordinates stakeholders toward long-term system transformation.',
            PHD: 'Agent-based models simulate how individual decisions aggregate to system-level patterns.'
          }
        }
      ]
    },
    externalResources: [
      { title: 'Zero Waste International Alliance', url: 'https://zwia.org/', type: 'research' },
      { title: 'Story of Stuff Project', url: 'https://www.storyofstuff.org/', type: 'video' }
    ]
  },
  // Module 4: Composting
  {
    id: 'zw-composting',
    slug: 'composting-fundamentals',
    title: 'Composting Fundamentals',
    description: {
      ELEMENTARY: 'Learn how food scraps become soil!',
      MIDDLE_SCHOOL: 'Discover the science of turning waste into compost.',
      HIGH_SCHOOL: 'Explore composting methods, carbon-nitrogen ratios, and troubleshooting.',
      UNDERGRADUATE: 'Analyze composting systems, facility design, and end-product quality.',
      GRADUATE: 'Examine municipal composting, policy frameworks, and contamination management.',
      PHD: 'Research microbial dynamics, process optimization, and climate implications.'
    },
    topic: 'zero-waste',
    category: 'COMPOSTING',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comp-1', title: 'Nature\'s Recyclers', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Magic Dirt!</h2><p>Banana peels, apple cores, and leaves can turn into rich soil for growing plants!</p>', MIDDLE_SCHOOL: '<h2>How Composting Works</h2><p>Microorganisms break down organic matter into humus. Greens (nitrogen) + Browns (carbon) + air + water = compost!</p>', HIGH_SCHOOL: '<h2>Composting Science</h2><p>C:N ratio (25-30:1 ideal), oxygen, moisture, and temperature control. Hot composting vs. cold composting.</p>', UNDERGRADUATE: '<h2>Composting Systems</h2><p>Windrow, aerated static pile, in-vessel, and vermicomposting. Scale, feedstocks, and end-use considerations.</p>', GRADUATE: '<h2>Municipal Programs</h2><p>Collection logistics, processing capacity, contamination, and compost markets.</p>', PHD: '<h2>Research Frontiers</h2><p>Microbial community dynamics, greenhouse gas emissions, and emerging contaminants (PFAS, microplastics).</p>' } }],
    activities: [{ id: 'zw-comp-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Build a Compost Pile!', MIDDLE_SCHOOL: 'Balance the Recipe', HIGH_SCHOOL: 'Troubleshoot Problems', UNDERGRADUATE: 'Design a Facility', GRADUATE: 'Program Planning', PHD: 'Process Optimization' }, description: { ELEMENTARY: 'Layer materials to make compost!', MIDDLE_SCHOOL: 'Balance greens and browns for perfect compost.', HIGH_SCHOOL: 'Diagnose and fix composting problems.', UNDERGRADUATE: 'Design a community composting facility.', GRADUATE: 'Plan a municipal composting program.', PHD: 'Optimize composting for emissions and quality.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comp-game', type: 'simulation', title: 'Compost Master', description: 'Create perfect compost!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comp-quiz', passingScore: 80, questions: [{ id: 'zwcq1', question: { ELEMENTARY: 'What breaks down food scraps into compost?', MIDDLE_SCHOOL: 'What ratio of carbon to nitrogen is ideal?', HIGH_SCHOOL: 'What causes a compost pile to smell bad?', UNDERGRADUATE: 'What is vermicomposting?', GRADUATE: 'What is the biggest challenge for municipal composting?', PHD: 'What emerging contaminant concerns exist for compost?' }, options: { ELEMENTARY: ['Tiny living things (microorganisms)', 'Magic', 'Sunlight alone', 'Water alone'], MIDDLE_SCHOOL: ['25-30:1', '1:1', '100:1', '5:1'], HIGH_SCHOOL: ['Too much nitrogen or not enough air', 'Too much carbon', 'Perfect balance', 'Too dry'], UNDERGRADUATE: ['Using worms to make compost', 'Using machines', 'Burning waste', 'Landfilling'], GRADUATE: ['Contamination in feedstocks', 'Too much supply', 'No demand', 'Weather'], PHD: ['PFAS and microplastics', 'Too much nitrogen', 'Good bacteria', 'Moisture'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Microorganisms - tiny living things like bacteria and fungi - break down organic matter!', MIDDLE_SCHOOL: 'A carbon to nitrogen ratio of 25-30:1 provides ideal conditions for composting microbes.', HIGH_SCHOOL: 'Odors usually indicate excess nitrogen (ammonia) or anaerobic conditions (not enough oxygen).', UNDERGRADUATE: 'Vermicomposting uses earthworms to process organic matter into nutrient-rich castings.', GRADUATE: 'Contamination (plastics, glass, non-compostables) is the biggest challenge for municipal programs.', PHD: 'PFAS (forever chemicals) and microplastics in compost feedstocks raise quality and safety concerns.' } }] },
    externalResources: [{ title: 'US Composting Council', url: 'https://www.compostingcouncil.org/', type: 'research' }]
  },
  // Module 5: Recycling Systems
  {
    id: 'zw-recycling',
    slug: 'recycling-systems',
    title: 'Recycling Systems',
    description: {
      ELEMENTARY: 'Learn how to recycle the right way!',
      MIDDLE_SCHOOL: 'Discover what happens to recyclables after collection.',
      HIGH_SCHOOL: 'Explore MRFs, material markets, and recycling challenges.',
      UNDERGRADUATE: 'Analyze recycling economics, contamination, and system design.',
      GRADUATE: 'Examine global recycling markets, policy tools, and circular economy.',
      PHD: 'Research recycling system optimization, material flows, and future scenarios.'
    },
    topic: 'zero-waste',
    category: 'RECYCLING',
    icon: 'Recycle',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-rec-1', title: 'The Recycling Journey', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Recycling Right!</h2><p>When we recycle correctly, bottles become new bottles, paper becomes new paper!</p>', MIDDLE_SCHOOL: '<h2>What Gets Recycled?</h2><p>Paper, cardboard, metal cans, glass, and certain plastics (#1, #2). Check local rules - they vary!</p>', HIGH_SCHOOL: '<h2>Recycling Infrastructure</h2><p>MRFs (Material Recovery Facilities) sort recyclables. Contamination and "wishcycling" cause problems.</p>', UNDERGRADUATE: '<h2>Recycling Economics</h2><p>Commodity markets, processing costs, and the economics of recycled vs. virgin materials.</p>', GRADUATE: '<h2>System Design</h2><p>Single-stream vs. source-separated, EPR, deposit return systems, and market development.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical recycling, material flow analysis, and modeling circular systems.</p>' } }],
    activities: [{ id: 'zw-rec-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Sort the Recycling!', MIDDLE_SCHOOL: 'Follow the Material', HIGH_SCHOOL: 'MRF Simulation', UNDERGRADUATE: 'Economic Analysis', GRADUATE: 'System Design', PHD: 'Flow Modeling' }, description: { ELEMENTARY: 'Put items in the right recycling bins!', MIDDLE_SCHOOL: 'Follow materials from bin to new product.', HIGH_SCHOOL: 'Run a material recovery facility.', UNDERGRADUATE: 'Analyze recycling economics for a city.', GRADUATE: 'Design an improved recycling system.', PHD: 'Model material flows in a circular economy.' }, config: { ELEMENTARY: { items: 10, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 }, GRADUATE: { items: 20, hints: false, timeLimit: 90 }, PHD: { items: 25, hints: false, timeLimit: 60 } } }],
    game: { id: 'zw-rec-game', type: 'matching', title: 'Recycling Sorter', description: 'Sort materials correctly and efficiently!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-rec-quiz', passingScore: 80, questions: [{ id: 'zwrq1', question: { ELEMENTARY: 'What can usually be recycled?', MIDDLE_SCHOOL: 'What is wishcycling?', HIGH_SCHOOL: 'What is a MRF?', UNDERGRADUATE: 'What drives recycling economics?', GRADUATE: 'What is EPR?', PHD: 'What is chemical recycling?' }, options: { ELEMENTARY: ['Clean bottles, cans, paper, cardboard', 'Dirty diapers', 'Food waste', 'Plastic bags'], MIDDLE_SCHOOL: ['Putting non-recyclables in hoping they get recycled', 'Wishing for less waste', 'Recycling correctly', 'A type of sorting'], HIGH_SCHOOL: ['Material Recovery Facility', 'Main Recycling Facility', 'Metal Reclamation Fund', 'Municipal Refuse Factory'], UNDERGRADUATE: ['Commodity prices for materials', 'Collection convenience', 'Public desire', 'Government mandates only'], GRADUATE: ['Extended Producer Responsibility', 'Environmental Protection Regulation', 'Energy Production Requirement', 'Excess Packaging Rules'], PHD: ['Breaking polymers into monomers for re-polymerization', 'Traditional mechanical recycling', 'Composting plastics', 'Burning for energy'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Clean bottles, cans, paper, and cardboard can usually be recycled!', MIDDLE_SCHOOL: 'Wishcycling is putting non-recyclables in the recycling bin hoping they will be recycled - it causes contamination.', HIGH_SCHOOL: 'A MRF (Material Recovery Facility) is where recyclables are sorted into separate material streams.', UNDERGRADUATE: 'Commodity prices for recycled materials determine whether recycling is economically viable.', GRADUATE: 'EPR (Extended Producer Responsibility) makes producers responsible for end-of-life product management.', PHD: 'Chemical recycling breaks polymers back into monomers that can be re-polymerized into new plastics.' } }] },
    externalResources: [{ title: 'EPA Recycling', url: 'https://www.epa.gov/recycle', type: 'research' }]
  },
  // Module 6: Product Lifecycle Design
  {
    id: 'zw-lifecycle',
    slug: 'product-lifecycle-design',
    title: 'Product Lifecycle Design',
    description: {
      ELEMENTARY: 'Learn how products can be made to last and not become waste!',
      MIDDLE_SCHOOL: 'Discover how design choices affect whether things become waste.',
      HIGH_SCHOOL: 'Explore design for environment, durability, and repairability.',
      UNDERGRADUATE: 'Analyze lifecycle assessment, eco-design principles, and material selection.',
      GRADUATE: 'Examine circular design strategies, business model innovation, and policy.',
      PHD: 'Research design for circularity, system dynamics, and transition pathways.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'Pencil',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-life-1', title: 'Designing Out Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Design!</h2><p>Some products are designed to be fixed and used for a long time. Others are designed to be thrown away quickly.</p>', MIDDLE_SCHOOL: '<h2>Design Matters</h2><p>Designers choose materials, durability, and whether products can be repaired. These choices determine waste.</p>', HIGH_SCHOOL: '<h2>Design for Environment</h2><p>DfE principles: durability, repairability, recyclability, non-toxicity, and minimal materials.</p>', UNDERGRADUATE: '<h2>Lifecycle Assessment</h2><p>LCA evaluates environmental impacts from raw material extraction through disposal. Guides design decisions.</p>', GRADUATE: '<h2>Circular Design</h2><p>Designing for multiple use cycles, component recovery, and closed-loop systems.</p>', PHD: '<h2>Research Frontiers</h2><p>Design for circular economy, material passports, and system-level optimization.</p>' } }],
    activities: [{ id: 'zw-life-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design a Toy!', MIDDLE_SCHOOL: 'Compare Products', HIGH_SCHOOL: 'Redesign Challenge', UNDERGRADUATE: 'LCA Study', GRADUATE: 'Business Model', PHD: 'System Design' }, description: { ELEMENTARY: 'Design a toy that lasts a long time!', MIDDLE_SCHOOL: 'Compare short-lived vs. durable products.', HIGH_SCHOOL: 'Redesign a disposable product to be reusable.', UNDERGRADUATE: 'Conduct a lifecycle assessment of a product.', GRADUATE: 'Design a circular business model.', PHD: 'Design a system for circular material flows.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-life-game', type: 'puzzle', title: 'Product Designer', description: 'Design products that minimize waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-life-quiz', passingScore: 80, questions: [{ id: 'zwlq1', question: { ELEMENTARY: 'What makes a good product design for reducing waste?', MIDDLE_SCHOOL: 'What is planned obsolescence?', HIGH_SCHOOL: 'What does DfE stand for?', UNDERGRADUATE: 'What does LCA measure?', GRADUATE: 'What is a product-service system?', PHD: 'What is a material passport?' }, options: { ELEMENTARY: ['Made to last and be fixed', 'Made to break quickly', 'Made with lots of different parts', 'Made to be thrown away'], MIDDLE_SCHOOL: ['Designing products to break or become outdated', 'Making products last forever', 'Recycling old products', 'Using recycled materials'], HIGH_SCHOOL: ['Design for Environment', 'Direct Factory Export', 'Durable Finished Equipment', 'Design for Excellence'], UNDERGRADUATE: ['Environmental impacts across a product\'s life', 'Only manufacturing impacts', 'Only disposal impacts', 'Product cost'], GRADUATE: ['Selling services instead of products', 'Selling more products', 'Planned obsolescence', 'Lower quality'], PHD: ['Digital record of materials in a product', 'Travel document', 'Manufacturing date', 'Brand certification'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Products designed to last a long time and be repaired create less waste!', MIDDLE_SCHOOL: 'Planned obsolescence is intentionally designing products to break or become outdated quickly.', HIGH_SCHOOL: 'DfE (Design for Environment) is designing products to minimize environmental impact.', UNDERGRADUATE: 'LCA (Lifecycle Assessment) measures environmental impacts from raw materials through disposal.', GRADUATE: 'Product-service systems sell outcomes (e.g., lighting) instead of products (e.g., lightbulbs).', PHD: 'Material passports are digital records of materials in products to enable recovery and reuse.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' }]
  },
  // Module 7: Food Waste Reduction
  {
    id: 'zw-food-waste',
    slug: 'food-waste-reduction',
    title: 'Food Waste Reduction',
    description: {
      ELEMENTARY: 'Learn why wasting food is bad and how to waste less!',
      MIDDLE_SCHOOL: 'Discover the impacts of food waste and solutions.',
      HIGH_SCHOOL: 'Explore food waste across the supply chain and reduction strategies.',
      UNDERGRADUATE: 'Analyze food loss measurement, causes, and intervention design.',
      GRADUATE: 'Examine food waste policy, food recovery hierarchy, and system change.',
      PHD: 'Research food system modeling, behavior change, and climate implications.'
    },
    topic: 'zero-waste',
    category: 'FOOD WASTE',
    icon: 'Apple',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-food-1', title: 'Don\'t Waste Food!', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Food is Precious!</h2><p>When we throw away food, we waste the water, energy, and work that made it. Let us eat what we take!</p>', MIDDLE_SCHOOL: '<h2>Food Waste Facts</h2><p>About 1/3 of food is wasted globally. In homes, we waste food by buying too much, not eating leftovers, and confusion about dates.</p>', HIGH_SCHOOL: '<h2>Supply Chain Waste</h2><p>Food is lost on farms, in processing, retail, and homes. Different solutions needed at each stage.</p>', UNDERGRADUATE: '<h2>Measuring Food Waste</h2><p>Quantification methods, waste characterization, and identifying intervention points.</p>', GRADUATE: '<h2>Food Recovery Hierarchy</h2><p>Prevention > Feed people > Feed animals > Industrial uses > Composting > Disposal.</p>', PHD: '<h2>Research Frontiers</h2><p>Food-climate modeling, behavior intervention design, and system optimization.</p>' } }],
    activities: [{ id: 'zw-food-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Food!', MIDDLE_SCHOOL: 'Meal Planning', HIGH_SCHOOL: 'Supply Chain Analysis', UNDERGRADUATE: 'Intervention Design', GRADUATE: 'Policy Development', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Make choices to waste less food!', MIDDLE_SCHOOL: 'Plan meals to use all the food you buy.', HIGH_SCHOOL: 'Analyze food waste across the supply chain.', UNDERGRADUATE: 'Design a food waste intervention.', GRADUATE: 'Develop food waste reduction policy.', PHD: 'Model food system waste dynamics.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-food-game', type: 'simulation', title: 'Food Saver', description: 'Reduce food waste at home and beyond!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-food-quiz', passingScore: 80, questions: [{ id: 'zwfq1', question: { ELEMENTARY: 'Why is wasting food bad?', MIDDLE_SCHOOL: 'How much food is wasted globally?', HIGH_SCHOOL: 'Where does most household food waste occur?', UNDERGRADUATE: 'What is the best way to handle surplus food?', GRADUATE: 'What is the food recovery hierarchy?', PHD: 'What is a key challenge in food waste research?' }, options: { ELEMENTARY: ['It wastes water, energy, and work', 'It does not matter', 'Food grows on trees easily', 'There is always more'], MIDDLE_SCHOOL: ['About 1/3', 'Almost none', 'About 1/10', '90%'], HIGH_SCHOOL: ['In the kitchen - preparation and leftovers', 'In the store', 'On the farm', 'In the factory'], UNDERGRADUATE: ['Prevent it or feed hungry people', 'Send to landfill', 'Burn it', 'Flush it'], GRADUATE: ['Prioritized uses from prevention to disposal', 'All options are equal', 'Landfill is best', 'No hierarchy exists'], PHD: ['Accurate measurement and behavior change', 'Too simple', 'No challenges', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Wasting food wastes all the water, energy, and work that went into growing and making it!', MIDDLE_SCHOOL: 'About one-third of all food produced globally is lost or wasted.', HIGH_SCHOOL: 'Most household food waste happens in the kitchen during preparation and from uneaten leftovers.', UNDERGRADUATE: 'The best options are preventing waste or donating edible surplus to feed people.', GRADUATE: 'The food recovery hierarchy prioritizes options from prevention (best) through disposal (worst).', PHD: 'Accurately measuring food waste and designing effective behavior change interventions remain challenging.' } }] },
    externalResources: [{ title: 'EPA Food Waste', url: 'https://www.epa.gov/sustainable-management-food', type: 'research' }]
  },
  // Module 8: Plastic-Free Living
  {
    id: 'zw-plastic-free',
    slug: 'plastic-free-living',
    title: 'Plastic-Free Living',
    description: {
      ELEMENTARY: 'Learn how to use less plastic!',
      MIDDLE_SCHOOL: 'Discover alternatives to single-use plastics.',
      HIGH_SCHOOL: 'Explore the plastic pollution problem and solutions.',
      UNDERGRADUATE: 'Analyze plastic lifecycle, alternatives assessment, and policy options.',
      GRADUATE: 'Examine global plastic agreements, corporate responsibility, and system change.',
      PHD: 'Research plastic fate, microplastics, and sociotechnical transitions.'
    },
    topic: 'zero-waste',
    category: 'PLASTICS',
    icon: 'Ban',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-pf-1', title: 'Beyond Plastic', order: 1, duration: 15, hasActivity: true, activityType: 'DRAG_DROP', content: { ELEMENTARY: '<h2>Plastic Problems!</h2><p>Plastic lasts for hundreds of years. Using reusable bottles, bags, and containers helps protect nature!</p>', MIDDLE_SCHOOL: '<h2>Single-Use Plastics</h2><p>Bags, bottles, straws, and packaging are used once then thrown away. Most are not recycled.</p>', HIGH_SCHOOL: '<h2>Plastic Pollution</h2><p>Ocean plastic, microplastics, and chemical additives. Only 9% of plastic ever made has been recycled.</p>', UNDERGRADUATE: '<h2>Alternatives Assessment</h2><p>Evaluating alternatives requires lifecycle thinking. Paper is not always better than plastic.</p>', GRADUATE: '<h2>Policy Approaches</h2><p>Bans, fees, EPR, plastic treaties, and voluntary commitments from companies.</p>', PHD: '<h2>Research Frontiers</h2><p>Microplastic fate and effects, degradation pathways, and sociotechnical transition.</p>' } }],
    activities: [{ id: 'zw-pf-act-1', type: 'DRAG_DROP', title: { ELEMENTARY: 'Swap the Plastic!', MIDDLE_SCHOOL: 'Plastic Audit', HIGH_SCHOOL: 'Alternatives Analysis', UNDERGRADUATE: 'LCA Comparison', GRADUATE: 'Policy Design', PHD: 'System Modeling' }, description: { ELEMENTARY: 'Find reusable alternatives to plastic items!', MIDDLE_SCHOOL: 'Audit plastics in your daily life.', HIGH_SCHOOL: 'Analyze alternatives to common plastics.', UNDERGRADUATE: 'Compare lifecycles of plastic vs. alternatives.', GRADUATE: 'Design plastic reduction policy.', PHD: 'Model plastic system transitions.' }, config: { ELEMENTARY: { items: 8, hints: true, timeLimit: null }, MIDDLE_SCHOOL: { items: 12, hints: true, timeLimit: 120 }, HIGH_SCHOOL: { items: 15, hints: false, timeLimit: 90 }, UNDERGRADUATE: { items: 18, hints: false, timeLimit: 120 }, GRADUATE: { items: 20, hints: false, timeLimit: 90 }, PHD: { items: 25, hints: false, timeLimit: 60 } } }],
    game: { id: 'zw-pf-game', type: 'matching', title: 'Plastic Swapper', description: 'Find alternatives to single-use plastics!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-pf-quiz', passingScore: 80, questions: [{ id: 'zwpfq1', question: { ELEMENTARY: 'What is better than a plastic bag?', MIDDLE_SCHOOL: 'What percentage of plastic has been recycled?', HIGH_SCHOOL: 'What are microplastics?', UNDERGRADUATE: 'Why is paper not always better than plastic?', GRADUATE: 'What is a plastic treaty?', PHD: 'What is a key microplastics research question?' }, options: { ELEMENTARY: ['A reusable bag', 'More plastic bags', 'Throwing it on the ground', 'Nothing'], MIDDLE_SCHOOL: ['About 9%', '90%', '50%', '75%'], HIGH_SCHOOL: ['Tiny plastic pieces under 5mm', 'Big plastic items', 'Recycled plastic', 'Clean plastic'], UNDERGRADUATE: ['Paper has its own impacts (forests, water, energy)', 'Paper is always better', 'Plastic is always better', 'They are identical'], GRADUATE: ['International agreement to address plastic pollution', 'A type of plastic', 'A recycling program', 'A plastic ban'], PHD: ['Health effects of microplastic exposure', 'Too simple', 'All questions answered', 'No concerns'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Reusable bags can be used hundreds of times instead of throwing away plastic bags!', MIDDLE_SCHOOL: 'Only about 9% of all plastic ever made has been recycled. Most ends up in landfills or nature.', HIGH_SCHOOL: 'Microplastics are tiny plastic pieces smaller than 5mm that are found in water, air, and organisms.', UNDERGRADUATE: 'Paper production requires forests, water, and energy - LCA shows tradeoffs between materials.', GRADUATE: 'A global plastic treaty is being negotiated to address plastic pollution internationally.', PHD: 'Understanding human and ecological health effects of microplastic exposure is a key research gap.' } }] },
    externalResources: [{ title: 'Plastic Free Foundation', url: 'https://www.plasticfreefoundation.org/', type: 'research' }]
  },
  // Module 9: Community Waste Solutions
  {
    id: 'zw-community',
    slug: 'community-waste-solutions',
    title: 'Community Waste Solutions',
    description: {
      ELEMENTARY: 'Learn how communities can work together to reduce waste!',
      MIDDLE_SCHOOL: 'Discover sharing, repair, and reuse programs in communities.',
      HIGH_SCHOOL: 'Explore community-based waste reduction models and social enterprise.',
      UNDERGRADUATE: 'Analyze community waste systems, social capital, and collaborative consumption.',
      GRADUATE: 'Examine community-based social marketing, collective action, and scaling.',
      PHD: 'Research community transition dynamics, social innovation, and intervention design.'
    },
    topic: 'zero-waste',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comm-1', title: 'Together for Zero Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Sharing is Caring!</h2><p>When neighbors share tools, toys, and things they don\'t use, we need to buy less and throw away less!</p>', MIDDLE_SCHOOL: '<h2>Community Programs</h2><p>Tool libraries, repair cafes, swap meets, and community gardens help people share and reuse.</p>', HIGH_SCHOOL: '<h2>Collaborative Consumption</h2><p>Sharing economy, library of things, and community reuse centers extend product life.</p>', UNDERGRADUATE: '<h2>Social Infrastructure</h2><p>Building social capital, trust, and networks that enable sharing and collective action.</p>', GRADUATE: '<h2>Scaling Solutions</h2><p>Community-based social marketing, network effects, and replicating successful models.</p>', PHD: '<h2>Research Frontiers</h2><p>Community transition dynamics, social innovation, and measuring collective impact.</p>' } }],
    activities: [{ id: 'zw-comm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Start a Swap!', MIDDLE_SCHOOL: 'Plan a Repair Cafe', HIGH_SCHOOL: 'Design a Tool Library', UNDERGRADUATE: 'Community Assessment', GRADUATE: 'Program Scaling', PHD: 'Intervention Design' }, description: { ELEMENTARY: 'Organize a toy and book swap!', MIDDLE_SCHOOL: 'Plan a community repair event.', HIGH_SCHOOL: 'Design a tool lending library.', UNDERGRADUATE: 'Assess community readiness for sharing programs.', GRADUATE: 'Plan to scale a community program.', PHD: 'Design a community-based intervention study.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comm-game', type: 'simulation', title: 'Community Builder', description: 'Build sharing and reuse programs!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comm-quiz', passingScore: 80, questions: [{ id: 'zwcmq1', question: { ELEMENTARY: 'How can sharing help reduce waste?', MIDDLE_SCHOOL: 'What is a repair cafe?', HIGH_SCHOOL: 'What is a tool library?', UNDERGRADUATE: 'What enables community sharing programs?', GRADUATE: 'What is community-based social marketing?', PHD: 'What is a key challenge in scaling community programs?' }, options: { ELEMENTARY: ['We buy less when we share', 'It creates more waste', 'It does not help', 'Sharing is bad'], MIDDLE_SCHOOL: ['A place where volunteers help fix broken items', 'A coffee shop', 'A place to buy tools', 'A recycling center'], HIGH_SCHOOL: ['A place to borrow tools instead of buying', 'A tool store', 'A workshop', 'A factory'], UNDERGRADUATE: ['Social capital, trust, and networks', 'Just money', 'Only government', 'Technology alone'], GRADUATE: ['Using social science to promote sustainable behaviors', 'Advertising', 'Regulations only', 'Market competition'], PHD: ['Maintaining fidelity while adapting to context', 'Too easy to scale', 'No challenges', 'One size fits all'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When we share things, we do not each need to buy our own, so less stuff gets made and thrown away!', MIDDLE_SCHOOL: 'A repair cafe is an event where volunteers help people fix broken items like clothes, electronics, and furniture.', HIGH_SCHOOL: 'A tool library lets people borrow tools they need occasionally instead of buying them.', UNDERGRADUATE: 'Social capital - trust, networks, and norms of reciprocity - enables community sharing programs.', GRADUATE: 'CBSM uses behavioral science to design community-level interventions for sustainable behaviors.', PHD: 'Maintaining program fidelity while adapting to different community contexts is a key scaling challenge.' } }] },
    externalResources: [{ title: 'Repair Cafe Foundation', url: 'https://www.repaircafe.org/', type: 'research' }]
  },
  // Module 10: Extended Producer Responsibility
  {
    id: 'zw-epr',
    slug: 'extended-producer-responsibility',
    title: 'Extended Producer Responsibility',
    description: {
      ELEMENTARY: 'Learn why companies should help deal with their products when we are done!',
      MIDDLE_SCHOOL: 'Discover how producers can be responsible for product end-of-life.',
      HIGH_SCHOOL: 'Explore EPR programs for packaging, electronics, and other products.',
      UNDERGRADUATE: 'Analyze EPR policy design, fee structures, and governance.',
      GRADUATE: 'Examine EPR effectiveness, international models, and design incentives.',
      PHD: 'Research EPR system dynamics, design optimization, and policy innovation.'
    },
    topic: 'zero-waste',
    category: 'POLICY',
    icon: 'Building',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-epr-1', title: 'Producer Responsibility', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Companies Should Help!</h2><p>Companies that make things should help collect and recycle them when we are finished using them.</p>', MIDDLE_SCHOOL: '<h2>What is EPR?</h2><p>Extended Producer Responsibility makes companies responsible for their products through the whole lifecycle, including disposal.</p>', HIGH_SCHOOL: '<h2>EPR Programs</h2><p>Deposit return systems, packaging EPR, electronics take-back, and tire recycling are common EPR programs.</p>', UNDERGRADUATE: '<h2>EPR Design</h2><p>Fee structures, eco-modulation, governance models, and performance targets shape EPR effectiveness.</p>', GRADUATE: '<h2>International Models</h2><p>European EPR frameworks, comparative policy analysis, and lessons learned.</p>', PHD: '<h2>Research Frontiers</h2><p>EPR effectiveness evaluation, design incentives for circularity, and system optimization.</p>' } }],
    activities: [{ id: 'zw-epr-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Return the Bottles!', MIDDLE_SCHOOL: 'Design Take-Back', HIGH_SCHOOL: 'Compare Programs', UNDERGRADUATE: 'Fee Structure Design', GRADUATE: 'Policy Evaluation', PHD: 'System Optimization' }, description: { ELEMENTARY: 'Return bottles to get your deposit back!', MIDDLE_SCHOOL: 'Design a product take-back program.', HIGH_SCHOOL: 'Compare EPR programs for different products.', UNDERGRADUATE: 'Design EPR fee structures.', GRADUATE: 'Evaluate EPR policy effectiveness.', PHD: 'Optimize EPR system design.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 4 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 6 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 12 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-epr-game', type: 'simulation', title: 'Policy Designer', description: 'Design effective producer responsibility!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-epr-quiz', passingScore: 80, questions: [{ id: 'zweprq1', question: { ELEMENTARY: 'What happens when you return a bottle with a deposit?', MIDDLE_SCHOOL: 'What does EPR stand for?', HIGH_SCHOOL: 'What products commonly have EPR programs?', UNDERGRADUATE: 'What is eco-modulation?', GRADUATE: 'Where did EPR policy originate?', PHD: 'What is a key EPR research question?' }, options: { ELEMENTARY: ['You get money back', 'Nothing happens', 'You pay more', 'It goes to landfill'], MIDDLE_SCHOOL: ['Extended Producer Responsibility', 'Extra Packaging Required', 'Environmental Protection Rules', 'Energy Power Reduction'], HIGH_SCHOOL: ['Packaging, electronics, tires', 'Only food', 'Only paper', 'Nothing'], UNDERGRADUATE: ['Adjusting fees based on environmental design', 'Same fee for everything', 'No fees', 'Only government pays'], GRADUATE: ['Europe, especially Germany and Sweden', 'United States', 'China', 'No specific origin'], PHD: ['How to design fees that incentivize circularity', 'Too simple', 'All questions answered', 'No research needed'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When you return a bottle with a deposit, you get your money back and the bottle gets recycled!', MIDDLE_SCHOOL: 'EPR stands for Extended Producer Responsibility - making producers responsible for end-of-life.', HIGH_SCHOOL: 'Packaging, electronics (e-waste), tires, batteries, and paint commonly have EPR programs.', UNDERGRADUATE: 'Eco-modulation adjusts producer fees based on product design - lower fees for recyclable designs.', GRADUATE: 'EPR policy originated in Europe, particularly Germany and Scandinavian countries in the 1990s.', PHD: 'Designing fee structures that effectively incentivize design for circularity is a key research question.' } }] },
    externalResources: [{ title: 'Product Stewardship Institute', url: 'https://www.productstewardship.us/', type: 'research' }]
  },
  // Module 11: Textile Waste
  {
    id: 'zw-textiles',
    slug: 'textile-waste',
    title: 'Textile Waste',
    description: {
      ELEMENTARY: 'Learn why throwing away clothes hurts the planet!',
      MIDDLE_SCHOOL: 'Discover the problem with fast fashion and textile waste.',
      HIGH_SCHOOL: 'Explore textile recycling, upcycling, and sustainable fashion.',
      UNDERGRADUATE: 'Analyze textile industry impacts, circular fashion, and innovation.',
      GRADUATE: 'Examine textile policy, fiber recycling technology, and business models.',
      PHD: 'Research textile system transformation, material innovation, and consumer behavior.'
    },
    topic: 'zero-waste',
    category: 'TEXTILES',
    icon: 'Shirt',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-tex-1', title: 'Fashion and Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Clothes Waste!</h2><p>Many clothes are worn just a few times then thrown away. Thats a lot of waste! Wearing clothes longer helps.</p>', MIDDLE_SCHOOL: '<h2>Fast Fashion</h2><p>Cheap clothes made quickly are often thrown away after a few wears. Most textiles are not recycled.</p>', HIGH_SCHOOL: '<h2>Textile Impacts</h2><p>Water pollution, carbon emissions, microfibers, and landfill volume. Only 1% of textiles are recycled into new clothes.</p>', UNDERGRADUATE: '<h2>Circular Fashion</h2><p>Design for durability, take-back programs, resale platforms, and fiber-to-fiber recycling.</p>', GRADUATE: '<h2>Policy and Innovation</h2><p>Textile EPR, fiber sorting technology, and new business models like rental and subscription.</p>', PHD: '<h2>Research Frontiers</h2><p>Chemical recycling, fiber identification, and sociotechnical transition of fashion system.</p>' } }],
    activities: [{ id: 'zw-tex-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save Your Clothes!', MIDDLE_SCHOOL: 'Fashion Footprint', HIGH_SCHOOL: 'Upcycling Workshop', UNDERGRADUATE: 'Business Model', GRADUATE: 'Policy Design', PHD: 'System Analysis' }, description: { ELEMENTARY: 'Learn to take care of clothes so they last!', MIDDLE_SCHOOL: 'Calculate your fashion footprint.', HIGH_SCHOOL: 'Design an upcycling project.', UNDERGRADUATE: 'Design a circular fashion business.', GRADUATE: 'Design textile EPR policy.', PHD: 'Analyze textile system transformation.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-tex-game', type: 'simulation', title: 'Fashion Saver', description: 'Reduce textile waste through smart choices!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-tex-quiz', passingScore: 80, questions: [{ id: 'zwtexq1', question: { ELEMENTARY: 'What can we do with old clothes?', MIDDLE_SCHOOL: 'What is fast fashion?', HIGH_SCHOOL: 'What percent of textiles become new clothes?', UNDERGRADUATE: 'What is fiber-to-fiber recycling?', GRADUATE: 'What is textile EPR?', PHD: 'What is a textile recycling challenge?' }, options: { ELEMENTARY: ['Donate, repair, or upcycle them', 'Always throw them away', 'Burn them', 'Nothing'], MIDDLE_SCHOOL: ['Cheap clothes made quickly, often thrown away soon', 'Slow fashion', 'Expensive clothes', 'Old fashion'], HIGH_SCHOOL: ['About 1%', '50%', '90%', '25%'], UNDERGRADUATE: ['Recycling fabric into new fabric', 'Burning fabric', 'Only downcycling', 'No recycling possible'], GRADUATE: ['Producer responsibility for end-of-life textiles', 'Textile tax', 'Fashion police', 'Clothing bank'], PHD: ['Sorting blended fiber materials', 'Too easy', 'No challenges', 'All solved'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old clothes can be donated to others, repaired to last longer, or turned into something new!', MIDDLE_SCHOOL: 'Fast fashion is cheap, trendy clothes designed to be worn a few times then discarded.', HIGH_SCHOOL: 'Only about 1% of textiles are recycled into new clothing - most are downcycled or landfilled.', UNDERGRADUATE: 'Fiber-to-fiber recycling breaks down old textiles into fibers that become new fabric.', GRADUATE: 'Textile EPR makes fashion brands responsible for collecting and recycling their products.', PHD: 'Sorting blended materials (cotton-polyester) for recycling is a major technical challenge.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Fashion', url: 'https://ellenmacarthurfoundation.org/topics/fashion/overview', type: 'research' }]
  },
  // Module 12: E-Waste
  {
    id: 'zw-ewaste',
    slug: 'e-waste',
    title: 'Electronic Waste',
    description: {
      ELEMENTARY: 'Learn what happens to old phones and computers!',
      MIDDLE_SCHOOL: 'Discover why e-waste is a growing problem and how to recycle electronics.',
      HIGH_SCHOOL: 'Explore e-waste composition, hazards, and recycling processes.',
      UNDERGRADUATE: 'Analyze e-waste flows, urban mining, and circular electronics design.',
      GRADUATE: 'Examine e-waste policy, informal sector, and extended producer responsibility.',
      PHD: 'Research e-waste system dynamics, material recovery optimization, and justice issues.'
    },
    topic: 'zero-waste',
    category: 'ELECTRONICS',
    icon: 'Smartphone',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-ew-1', title: 'Old Electronics', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>E-Waste!</h2><p>Old phones, tablets, and computers have valuable metals inside. We should recycle them, not throw them away!</p>', MIDDLE_SCHOOL: '<h2>Growing E-Waste</h2><p>E-waste is the fastest growing waste stream. It contains valuable and hazardous materials.</p>', HIGH_SCHOOL: '<h2>E-Waste Composition</h2><p>Gold, copper, rare earths, but also lead, mercury, and flame retardants. Proper recycling is essential.</p>', UNDERGRADUATE: '<h2>Urban Mining</h2><p>Recovering valuable materials from e-waste. Higher concentrations than natural ore in some cases.</p>', GRADUATE: '<h2>Global E-Waste</h2><p>Transboundary flows, informal recycling, health impacts, and international regulations.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated disassembly, material recovery efficiency, and environmental justice.</p>' } }],
    activities: [{ id: 'zw-ew-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Recycle Electronics!', MIDDLE_SCHOOL: 'E-Waste Audit', HIGH_SCHOOL: 'Material Recovery', UNDERGRADUATE: 'Urban Mining', GRADUATE: 'Policy Analysis', PHD: 'System Optimization' }, description: { ELEMENTARY: 'Find the right place to recycle electronics!', MIDDLE_SCHOOL: 'Audit electronics in your home.', HIGH_SCHOOL: 'Simulate material recovery from e-waste.', UNDERGRADUATE: 'Analyze urban mining economics.', GRADUATE: 'Analyze international e-waste policy.', PHD: 'Optimize e-waste recovery systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-ew-game', type: 'simulation', title: 'E-Waste Expert', description: 'Properly manage electronic waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-ew-quiz', passingScore: 80, questions: [{ id: 'zwewq1', question: { ELEMENTARY: 'Why should we recycle old phones?', MIDDLE_SCHOOL: 'What is the fastest growing waste stream?', HIGH_SCHOOL: 'What valuable material is in electronics?', UNDERGRADUATE: 'What is urban mining?', GRADUATE: 'What is the Basel Convention?', PHD: 'What is a key e-waste justice issue?' }, options: { ELEMENTARY: ['They have valuable metals inside', 'They are boring', 'No reason', 'They should go in trash'], MIDDLE_SCHOOL: ['E-waste', 'Food waste', 'Paper waste', 'Plastic waste'], HIGH_SCHOOL: ['Gold and rare earth elements', 'Just plastic', 'Only glass', 'Nothing valuable'], UNDERGRADUATE: ['Recovering materials from waste products', 'Mining in cities', 'Video game', 'Building cities'], GRADUATE: ['Treaty controlling hazardous waste trade', 'Swiss city', 'A company', 'A recycling method'], PHD: ['Informal workers exposed to toxics', 'Too much recycling', 'No issues', 'Perfect system'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old phones and computers contain gold, silver, and other valuable metals that can be recovered!', MIDDLE_SCHOOL: 'E-waste (electronic waste) is the fastest growing waste stream globally.', HIGH_SCHOOL: 'Electronics contain gold, silver, copper, platinum, and rare earth elements.', UNDERGRADUATE: 'Urban mining recovers valuable materials from waste - e-waste has higher gold concentration than ore.', GRADUATE: 'The Basel Convention controls transboundary movement of hazardous wastes including e-waste.', PHD: 'Informal recyclers in developing countries face serious health risks from primitive e-waste processing.' } }] },
    externalResources: [{ title: 'E-Waste World', url: 'https://ewastemonitor.info/', type: 'research' }]
  },
  // Module 13: Upcycling and Repair
  {
    id: 'zw-upcycling',
    slug: 'upcycling-repair',
    title: 'Upcycling and Repair',
    description: {
      ELEMENTARY: 'Learn how to turn old things into new treasures!',
      MIDDLE_SCHOOL: 'Discover the art of repairing and upcycling instead of throwing away.',
      HIGH_SCHOOL: 'Explore repair skills, upcycling techniques, and right to repair.',
      UNDERGRADUATE: 'Analyze repair economy, product longevity, and design for repair.',
      GRADUATE: 'Examine repair cafes, maker movement, and policy for repairability.',
      PHD: 'Research repair culture, skill development, and systemic barriers to repair.'
    },
    topic: 'zero-waste',
    category: 'REUSE',
    icon: 'Hammer',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-up-1', title: 'Fix It, Dont Trash It', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Fix and Make New!</h2><p>Broken things can often be fixed! Old things can become new things with creativity!</p>', MIDDLE_SCHOOL: '<h2>Repair and Upcycle</h2><p>Repair keeps things working longer. Upcycling turns old items into something better or different.</p>', HIGH_SCHOOL: '<h2>Right to Repair</h2><p>Companies sometimes make products hard to repair. Right to repair laws help consumers fix things.</p>', UNDERGRADUATE: '<h2>Design for Repair</h2><p>Modular design, available parts, and repair documentation enable product longevity.</p>', GRADUATE: '<h2>Repair Movement</h2><p>Repair cafes, makerspaces, and iFixit are building repair culture and skills.</p>', PHD: '<h2>Research Frontiers</h2><p>Repair skills, cultural attitudes, and systemic barriers to repair economy.</p>' } }],
    activities: [{ id: 'zw-up-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Upcycle Art!', MIDDLE_SCHOOL: 'Learn to Fix', HIGH_SCHOOL: 'Repair Guide', UNDERGRADUATE: 'Design Review', GRADUATE: 'Start a Repair Cafe', PHD: 'Barrier Analysis' }, description: { ELEMENTARY: 'Turn old things into art!', MIDDLE_SCHOOL: 'Learn basic repair skills.', HIGH_SCHOOL: 'Create a repair guide for a product.', UNDERGRADUATE: 'Review product design for repairability.', GRADUATE: 'Plan a community repair cafe.', PHD: 'Analyze barriers to repair culture.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-up-game', type: 'simulation', title: 'Repair Hero', description: 'Fix things and create from old materials!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-up-quiz', passingScore: 80, questions: [{ id: 'zwupq1', question: { ELEMENTARY: 'What is upcycling?', MIDDLE_SCHOOL: 'Why is repair better than replacing?', HIGH_SCHOOL: 'What is right to repair?', UNDERGRADUATE: 'What is modular design?', GRADUATE: 'What is a repair cafe?', PHD: 'What limits repair culture?' }, options: { ELEMENTARY: ['Making new things from old things', 'Throwing things away', 'Buying new things', 'Breaking things'], MIDDLE_SCHOOL: ['Uses less resources and creates less waste', 'Costs more', 'Takes too long', 'Not possible'], HIGH_SCHOOL: ['Laws allowing consumers to fix their products', 'Right to throw away', 'Company rights', 'No such thing'], UNDERGRADUATE: ['Components that can be individually replaced', 'One piece design', 'Glued together', 'Disposable design'], GRADUATE: ['Community event where volunteers help fix items', 'Coffee shop', 'Tool store', 'Recycling center'], PHD: ['Lack of skills, parts, information, and time', 'Too easy to repair', 'Everyone repairs', 'No barriers'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Upcycling is taking something old and making it into something new and useful!', MIDDLE_SCHOOL: 'Repairing uses fewer resources than making new products and keeps items out of landfills.', HIGH_SCHOOL: 'Right to repair laws require manufacturers to make parts and repair information available.', UNDERGRADUATE: 'Modular design allows individual components to be replaced, extending product life.', GRADUATE: 'Repair cafes are community events where skilled volunteers help people fix broken items.', PHD: 'Barriers include lost repair skills, unavailable parts, proprietary designs, and time pressures.' } }] },
    externalResources: [{ title: 'iFixit', url: 'https://www.ifixit.com/', type: 'research' }]
  },
  // Module 14: Industrial Ecology
  {
    id: 'zw-industrial',
    slug: 'industrial-ecology',
    title: 'Industrial Ecology',
    description: {
      ELEMENTARY: 'Learn how factories can work like nature!',
      MIDDLE_SCHOOL: 'Discover how industries can share and reuse materials.',
      HIGH_SCHOOL: 'Explore industrial symbiosis, eco-industrial parks, and material flows.',
      UNDERGRADUATE: 'Analyze material flow analysis, industrial symbiosis networks, and lifecycle thinking.',
      GRADUATE: 'Examine eco-industrial development, circular economy policy, and systems optimization.',
      PHD: 'Research industrial ecosystem dynamics, network analysis, and transition pathways.'
    },
    topic: 'zero-waste',
    category: 'INDUSTRY',
    icon: 'Factory',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-ind-1', title: 'Factories Like Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Smart Factories!</h2><p>In nature, nothing is wasted - one creature\'s waste is another\'s food. Factories can work the same way!</p>', MIDDLE_SCHOOL: '<h2>Industrial Symbiosis</h2><p>One factory\'s waste can be another factory\'s raw material. This is called industrial symbiosis.</p>', HIGH_SCHOOL: '<h2>Eco-Industrial Parks</h2><p>Companies co-locate to exchange materials, energy, and water. Kalundborg, Denmark is a famous example.</p>', UNDERGRADUATE: '<h2>Material Flow Analysis</h2><p>Tracking materials through industrial systems reveals opportunities for efficiency and symbiosis.</p>', GRADUATE: '<h2>Circular Economy</h2><p>Moving from linear take-make-waste to circular systems that keep materials in use.</p>', PHD: '<h2>Research Frontiers</h2><p>Industrial ecosystem emergence, network resilience, and sociotechnical transitions.</p>' } }],
    activities: [{ id: 'zw-ind-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Connect the Factories!', MIDDLE_SCHOOL: 'Waste Exchange', HIGH_SCHOOL: 'Design an Eco-Park', UNDERGRADUATE: 'Material Flow Map', GRADUATE: 'Network Analysis', PHD: 'Transition Pathway' }, description: { ELEMENTARY: 'Help factories share their waste!', MIDDLE_SCHOOL: 'Match wastes with uses.', HIGH_SCHOOL: 'Design an eco-industrial park.', UNDERGRADUATE: 'Map material flows in an industry.', GRADUATE: 'Analyze an industrial symbiosis network.', PHD: 'Model industrial system transition.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-ind-game', type: 'simulation', title: 'Industrial Ecologist', description: 'Create industrial symbiosis networks!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-ind-quiz', passingScore: 80, questions: [{ id: 'zwindq1', question: { ELEMENTARY: 'How can factories work like nature?', MIDDLE_SCHOOL: 'What is industrial symbiosis?', HIGH_SCHOOL: 'What is Kalundborg?', UNDERGRADUATE: 'What is material flow analysis?', GRADUATE: 'What is a circular economy?', PHD: 'What makes industrial ecosystems stable?' }, options: { ELEMENTARY: ['Use each other\'s waste', 'Make more pollution', 'Work alone', 'Throw everything away'], MIDDLE_SCHOOL: ['Factories sharing waste as resources', 'Factories competing', 'Making more waste', 'Industrial war'], HIGH_SCHOOL: ['A famous eco-industrial park in Denmark', 'A type of factory', 'A recycling bin', 'A city in Sweden'], UNDERGRADUATE: ['Tracking materials through systems', 'Water flow only', 'Money flow', 'Air flow only'], GRADUATE: ['Systems that keep materials in use', 'Linear economy', 'More consumption', 'Waste economy'], PHD: ['Diversity and redundancy in exchanges', 'Single connections', 'No diversity', 'Random connections'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Factories can use each other\'s waste materials, just like nature does!', MIDDLE_SCHOOL: 'Industrial symbiosis is when companies exchange waste materials that become resources for others.', HIGH_SCHOOL: 'Kalundborg, Denmark is the world\'s most famous example of industrial symbiosis.', UNDERGRADUATE: 'MFA tracks materials through industrial systems to find efficiency and recycling opportunities.', GRADUATE: 'A circular economy keeps materials in use through reuse, repair, and recycling instead of disposal.', PHD: 'Diverse connections and redundant pathways make industrial ecosystems more resilient.' } }] },
    externalResources: [{ title: 'Industrial Ecology', url: 'https://is4ie.org/', type: 'research' }]
  },
  // Module 15: Circular Economy
  {
    id: 'zw-circular',
    slug: 'circular-economy',
    title: 'Circular Economy',
    description: {
      ELEMENTARY: 'Learn how to keep using things again and again!',
      MIDDLE_SCHOOL: 'Discover the circular economy where nothing is wasted.',
      HIGH_SCHOOL: 'Explore circular business models, design strategies, and system change.',
      UNDERGRADUATE: 'Analyze circular economy frameworks, metrics, and implementation.',
      GRADUATE: 'Examine circular economy policy, investment, and transformation strategies.',
      PHD: 'Research circular economy transition, rebound effects, and systemic change.'
    },
    topic: 'zero-waste',
    category: 'CIRCULAR',
    icon: 'RefreshCcw',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-circ-1', title: 'Round and Round', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Going in Circles!</h2><p>Instead of use-and-throw-away, we can use-repair-reuse-recycle in a circle, forever!</p>', MIDDLE_SCHOOL: '<h2>Circular vs Linear</h2><p>Linear: take-make-waste. Circular: design out waste, keep materials in use, regenerate nature.</p>', HIGH_SCHOOL: '<h2>Circular Business Models</h2><p>Product-as-service, sharing platforms, take-back programs, and remanufacturing.</p>', UNDERGRADUATE: '<h2>Circular Design</h2><p>Design for durability, repair, disassembly, and material recovery. Biomimicry principles.</p>', GRADUATE: '<h2>Circular Policy</h2><p>EU Circular Economy Action Plan, metrics, and enabling conditions for transition.</p>', PHD: '<h2>Research Frontiers</h2><p>Circularity metrics, rebound effects, and sociotechnical transition pathways.</p>' } }],
    activities: [{ id: 'zw-circ-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Close the Loop!', MIDDLE_SCHOOL: 'Linear to Circular', HIGH_SCHOOL: 'Business Model', UNDERGRADUATE: 'Design Challenge', GRADUATE: 'Policy Framework', PHD: 'Transition Modeling' }, description: { ELEMENTARY: 'Keep materials going in circles!', MIDDLE_SCHOOL: 'Convert a linear process to circular.', HIGH_SCHOOL: 'Design a circular business model.', UNDERGRADUATE: 'Design a circular product.', GRADUATE: 'Develop a circular economy policy.', PHD: 'Model circular economy transition.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-circ-game', type: 'simulation', title: 'Circular Designer', description: 'Create circular systems that eliminate waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-circ-quiz', passingScore: 80, questions: [{ id: 'zwcircq1', question: { ELEMENTARY: 'What shape is better than a line for stuff?', MIDDLE_SCHOOL: 'What are the 3 principles of circular economy?', HIGH_SCHOOL: 'What is product-as-service?', UNDERGRADUATE: 'What is design for disassembly?', GRADUATE: 'What is the EU Circular Economy Action Plan?', PHD: 'What is a circularity rebound effect?' }, options: { ELEMENTARY: ['A circle', 'A line', 'A square', 'A triangle'], MIDDLE_SCHOOL: ['Design out waste, keep materials in use, regenerate nature', 'Take, make, waste', 'Buy, use, throw', 'Dig, burn, dump'], HIGH_SCHOOL: ['Paying for use instead of ownership', 'Buying products', 'Service station', 'Product store'], UNDERGRADUATE: ['Designing products to be easily taken apart', 'Gluing everything', 'Making it harder to open', 'Single material only'], GRADUATE: ['EU policy framework for circular transition', 'A recycling program', 'A product', 'A company'], PHD: ['Efficiency gains leading to increased consumption', 'Perfect circles', 'No rebounds', 'Only positive effects'] }, correctIndex: 0, explanation: { ELEMENTARY: 'A circle keeps things going around and around instead of ending up in the trash!', MIDDLE_SCHOOL: 'Circular economy: 1) Design out waste, 2) Keep materials in use, 3) Regenerate natural systems.', HIGH_SCHOOL: 'Product-as-service means paying for the use of a product rather than owning it.', UNDERGRADUATE: 'Design for disassembly enables easy separation of components for repair, reuse, and recycling.', GRADUATE: 'The EU CEAP is a comprehensive policy package to accelerate circular economy transition.', PHD: 'Rebound effects occur when efficiency gains lead to increased consumption, partially offsetting benefits.' } }] },
    externalResources: [{ title: 'Ellen MacArthur Foundation', url: 'https://ellenmacarthurfoundation.org/', type: 'research' }]
  },
  {
    id: 'zw-packaging',
    slug: 'packaging-innovation',
    title: 'Packaging Innovation',
    description: {
      ELEMENTARY: 'Learn about cool new packaging that doesnt make trash!',
      MIDDLE_SCHOOL: 'Discover innovative packaging solutions from reusable to edible.',
      HIGH_SCHOOL: 'Explore sustainable packaging materials, design strategies, and refill systems.',
      UNDERGRADUATE: 'Analyze packaging lifecycle assessment, material selection, and circular design.',
      GRADUATE: 'Examine packaging policy, extended producer responsibility, and system innovation.',
      PHD: 'Research packaging material science, end-of-life systems, and behavior change.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'Package',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-pack-1', title: 'Better Packaging', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>No More Trash Packaging!</h2><p>Some packaging can be eaten, planted, or used again and again. No more throwing away!</p>', MIDDLE_SCHOOL: '<h2>Packaging Solutions</h2><p>Refill systems, compostable materials, edible packaging, and concentrated products reduce packaging waste.</p>', HIGH_SCHOOL: '<h2>Sustainable Packaging</h2><p>Lifecycle thinking, material selection, and design for recycling. Reuse systems are often better than recycling.</p>', UNDERGRADUATE: '<h2>Packaging LCA</h2><p>Comparing packaging options requires full lifecycle assessment - material production, transport, and end-of-life.</p>', GRADUATE: '<h2>System Change</h2><p>Extended producer responsibility, deposit return schemes, and reuse infrastructure.</p>', PHD: '<h2>Research Frontiers</h2><p>Novel bio-based materials, chemical recycling, and consumer behavior research.</p>' } }],
    activities: [{ id: 'zw-pack-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Design Cool Packaging!', MIDDLE_SCHOOL: 'Package Makeover', HIGH_SCHOOL: 'Sustainable Design', UNDERGRADUATE: 'Packaging LCA', GRADUATE: 'System Redesign', PHD: 'Material Innovation' }, description: { ELEMENTARY: 'Create packaging that doesnt make trash!', MIDDLE_SCHOOL: 'Redesign wasteful packaging.', HIGH_SCHOOL: 'Design sustainable packaging.', UNDERGRADUATE: 'Compare packaging lifecycle impacts.', GRADUATE: 'Design a reuse system.', PHD: 'Develop new packaging materials.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-pack-game', type: 'simulation', title: 'Packaging Designer', description: 'Create innovative zero-waste packaging!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-pack-quiz', passingScore: 80, questions: [{ id: 'zwpackq1', question: { ELEMENTARY: 'What can some cool packaging do?', MIDDLE_SCHOOL: 'What is a refill system?', HIGH_SCHOOL: 'Why is reuse better than recycling?', UNDERGRADUATE: 'What is packaging LCA?', GRADUATE: 'What is EPR?', PHD: 'What is chemical recycling?' }, options: { ELEMENTARY: ['Be eaten or planted', 'Last forever', 'Fly away', 'Disappear by magic'], MIDDLE_SCHOOL: ['Bringing containers to fill again', 'Throwing away and buying new', 'Using once', 'Making more trash'], HIGH_SCHOOL: ['Uses less energy and materials', 'Makes more waste', 'Costs more', 'Is impossible'], UNDERGRADUATE: ['Full lifecycle impact assessment', 'Just the package', 'Only production', 'Only disposal'], GRADUATE: ['Extended Producer Responsibility', 'Extra Plastic Recycling', 'Emergency Package Response', 'Early Product Rejection'], PHD: ['Breaking polymers into monomers', 'Regular recycling', 'Burning plastic', 'Landfilling'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Some amazing packaging can be eaten like food or planted to grow flowers!', MIDDLE_SCHOOL: 'Refill systems let you bring your container back to fill it up again instead of buying new packaging.', HIGH_SCHOOL: 'Reuse keeps the whole package, while recycling requires energy to process and often degrades materials.', UNDERGRADUATE: 'Packaging LCA evaluates environmental impacts from raw material extraction through disposal.', GRADUATE: 'EPR makes producers responsible for end-of-life management of their packaging.', PHD: 'Chemical recycling breaks plastics back into chemical building blocks for new materials.' } }] },
    externalResources: [{ title: 'Sustainable Packaging', url: 'https://www.sustainablepackaging.org/', type: 'research' }]
  },
  {
    id: 'zw-construction',
    slug: 'construction-waste',
    title: 'Construction and Demolition Waste',
    description: {
      ELEMENTARY: 'Learn how building projects can make less trash!',
      MIDDLE_SCHOOL: 'Discover how construction sites reduce and recycle waste.',
      HIGH_SCHOOL: 'Explore construction waste management, deconstruction, and material recovery.',
      UNDERGRADUATE: 'Analyze C&D waste streams, diversion strategies, and economic factors.',
      GRADUATE: 'Examine deconstruction economics, material marketplaces, and policy frameworks.',
      PHD: 'Research construction circular economy, building material passports, and urban mining.'
    },
    topic: 'zero-waste',
    category: 'INDUSTRY',
    icon: 'HardHat',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-const-1', title: 'Building Without Waste', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Less Trash from Building!</h2><p>When people build or tear down buildings, they can save materials instead of throwing them away!</p>', MIDDLE_SCHOOL: '<h2>Construction Recycling</h2><p>Wood, metal, concrete, and other building materials can be recycled or reused instead of landfilled.</p>', HIGH_SCHOOL: '<h2>Deconstruction</h2><p>Deconstruction carefully takes buildings apart to save materials. Its better than demolition which destroys everything.</p>', UNDERGRADUATE: '<h2>C&D Waste Management</h2><p>Source separation, material recovery facilities, and markets for recycled construction materials.</p>', GRADUATE: '<h2>Urban Mining</h2><p>Existing buildings are resource banks. Material passports track embedded materials for future recovery.</p>', PHD: '<h2>Research Frontiers</h2><p>Automated deconstruction, material tracking systems, and construction circular economy transitions.</p>' } }],
    activities: [{ id: 'zw-const-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Save the Building Parts!', MIDDLE_SCHOOL: 'Construction Sort', HIGH_SCHOOL: 'Deconstruction Plan', UNDERGRADUATE: 'Waste Diversion', GRADUATE: 'Material Passport', PHD: 'Urban Mining Model' }, description: { ELEMENTARY: 'Keep building materials out of trash!', MIDDLE_SCHOOL: 'Sort construction waste for recycling.', HIGH_SCHOOL: 'Plan a building deconstruction.', UNDERGRADUATE: 'Design a C&D waste diversion plan.', GRADUATE: 'Create a building material passport.', PHD: 'Model urban mining potential.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-const-game', type: 'simulation', title: 'Deconstruction Expert', description: 'Recover valuable materials from buildings!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-const-quiz', passingScore: 80, questions: [{ id: 'zwconstq1', question: { ELEMENTARY: 'What can we save from old buildings?', MIDDLE_SCHOOL: 'What can be recycled from construction?', HIGH_SCHOOL: 'Why is deconstruction better?', UNDERGRADUATE: 'What is source separation?', GRADUATE: 'What is a material passport?', PHD: 'What is urban mining?' }, options: { ELEMENTARY: ['Wood, metal, and bricks', 'Nothing useful', 'Only the paint', 'Just the windows'], MIDDLE_SCHOOL: ['Wood, metal, concrete, bricks', 'Nothing', 'Only paper', 'Only plastic'], HIGH_SCHOOL: ['Saves more materials than demolition', 'Its faster', 'Its cheaper always', 'Makes more noise'], UNDERGRADUATE: ['Sorting waste at the job site', 'Mixing everything together', 'Burning on site', 'Ignoring waste'], GRADUATE: ['Document of materials in a building', 'Travel document', 'Building permit', 'Insurance policy'], PHD: ['Extracting resources from the built environment', 'Digging underground', 'Mining mountains', 'Ocean mining'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Old buildings have lots of useful stuff like wood, metal, and bricks that can be used again!', MIDDLE_SCHOOL: 'Construction waste includes recyclable wood, metal, concrete, bricks, cardboard, and more.', HIGH_SCHOOL: 'Deconstruction carefully removes materials intact for reuse, while demolition destroys them.', UNDERGRADUATE: 'Source separation at construction sites improves recycling rates and material quality.', GRADUATE: 'Material passports document what materials are in a building for future recovery.', PHD: 'Urban mining treats the built environment as a resource bank for material extraction.' } }] },
    externalResources: [{ title: 'C&D Recycling', url: 'https://www.cdrecycling.org/', type: 'research' }]
  },
  {
    id: 'zw-bio',
    slug: 'biomaterials',
    title: 'Biomaterials and Bioplastics',
    description: {
      ELEMENTARY: 'Learn about materials made from plants that go back to nature!',
      MIDDLE_SCHOOL: 'Discover materials made from plants and algae that can replace plastic.',
      HIGH_SCHOOL: 'Explore bio-based and biodegradable materials, applications, and limitations.',
      UNDERGRADUATE: 'Analyze biomaterial feedstocks, production, and end-of-life pathways.',
      GRADUATE: 'Examine biomaterial lifecycle impacts, certification, and market development.',
      PHD: 'Research advanced biomaterials, marine biodegradation, and systemic impacts.'
    },
    topic: 'zero-waste',
    category: 'MATERIALS',
    icon: 'Leaf',
    color: 'moss',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-bio-1', title: 'Materials from Nature', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Plant-Based Materials!</h2><p>We can make things from plants that return to the earth when were done, instead of plastic that lasts forever!</p>', MIDDLE_SCHOOL: '<h2>Bioplastics</h2><p>Bioplastics are made from plants like corn or sugarcane. Some can compost, while others just have plant-based origins.</p>', HIGH_SCHOOL: '<h2>Bio-based vs Biodegradable</h2><p>Bio-based means plant-derived. Biodegradable means it breaks down. These are different properties - a material can be one, both, or neither.</p>', UNDERGRADUATE: '<h2>Biomaterial Systems</h2><p>Feedstock sourcing, production pathways, properties, applications, and end-of-life infrastructure requirements.</p>', GRADUATE: '<h2>Critical Assessment</h2><p>Land use competition, industrial composting requirements, and lifecycle environmental impacts.</p>', PHD: '<h2>Research Frontiers</h2><p>Algae-based materials, marine biodegradation standards, and systems-level sustainability analysis.</p>' } }],
    activities: [{ id: 'zw-bio-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Grow Your Materials!', MIDDLE_SCHOOL: 'Bioplastic Lab', HIGH_SCHOOL: 'Material Comparison', UNDERGRADUATE: 'LCA Analysis', GRADUATE: 'System Design', PHD: 'Research Protocol' }, description: { ELEMENTARY: 'Make materials from plants!', MIDDLE_SCHOOL: 'Create a simple bioplastic.', HIGH_SCHOOL: 'Compare bio vs fossil materials.', UNDERGRADUATE: 'Analyze biomaterial lifecycle.', GRADUATE: 'Design an end-of-life system.', PHD: 'Develop research protocols.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-bio-game', type: 'simulation', title: 'Biomaterial Designer', description: 'Create sustainable materials from nature!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-bio-quiz', passingScore: 80, questions: [{ id: 'zwbioq1', question: { ELEMENTARY: 'What are plant materials good at?', MIDDLE_SCHOOL: 'What are bioplastics made from?', HIGH_SCHOOL: 'Does bio-based mean biodegradable?', UNDERGRADUATE: 'What is needed for industrial composting?', GRADUATE: 'What is a land use concern?', PHD: 'Why is marine biodegradation important?' }, options: { ELEMENTARY: ['Going back to nature', 'Lasting forever', 'Being super hard', 'Floating in water'], MIDDLE_SCHOOL: ['Plants like corn and sugarcane', 'Oil', 'Rocks', 'Metal'], HIGH_SCHOOL: ['Not necessarily - they are different properties', 'Yes always', 'They mean the same thing', 'Bio-based never biodegrades'], UNDERGRADUATE: ['High heat and specific microbes', 'Just time', 'Ocean water', 'Regular landfill'], GRADUATE: ['Food vs material feedstock competition', 'Land is unlimited', 'No concerns', 'Only benefits'], PHD: ['Much plastic ends up in oceans', 'Oceans are clean', 'No plastic in oceans', 'Marine life eats plastic safely'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Materials from plants can break down and return to the earth, making less trash!', MIDDLE_SCHOOL: 'Bioplastics are made from plant materials like corn, sugarcane, or other biomass.', HIGH_SCHOOL: 'Bio-based means plant-derived; biodegradable means it breaks down. A material can be one without the other.', UNDERGRADUATE: 'Industrial composting requires controlled temperature, moisture, and specific microbial communities.', GRADUATE: 'Growing crops for materials may compete with food production for agricultural land.', PHD: 'Most plastic pollution reaches oceans, making marine biodegradation crucial for reducing impacts.' } }] },
    externalResources: [{ title: 'Bioplastics', url: 'https://www.european-bioplastics.org/', type: 'research' }]
  },
  {
    id: 'zw-lifecycle',
    slug: 'product-lifecycle',
    title: 'Product Lifecycle Thinking',
    description: {
      ELEMENTARY: 'Learn to think about where things come from and where they go!',
      MIDDLE_SCHOOL: 'Discover how to trace products from creation to disposal.',
      HIGH_SCHOOL: 'Explore lifecycle assessment, cradle-to-cradle design, and environmental footprints.',
      UNDERGRADUATE: 'Analyze LCA methodology, impact categories, and decision-making applications.',
      GRADUATE: 'Examine consequential LCA, uncertainty analysis, and policy applications.',
      PHD: 'Research LCA methodology advances, social LCA, and absolute sustainability assessment.'
    },
    topic: 'zero-waste',
    category: 'DESIGN',
    icon: 'GitBranch',
    color: 'ocean',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-life-1', title: 'Following the Journey', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Where Does Stuff Come From?</h2><p>Everything we use has a story - where it came from, how it was made, and where it goes when were done!</p>', MIDDLE_SCHOOL: '<h2>Product Stories</h2><p>Products travel from raw materials, through factories, to stores, to your home, and finally to disposal or recycling.</p>', HIGH_SCHOOL: '<h2>Lifecycle Assessment</h2><p>LCA tracks environmental impacts at every stage: raw materials, manufacturing, transport, use, and end-of-life.</p>', UNDERGRADUATE: '<h2>LCA Methodology</h2><p>Goal and scope, inventory analysis, impact assessment, and interpretation. ISO 14040/14044 standards.</p>', GRADUATE: '<h2>Advanced LCA</h2><p>Consequential vs attributional LCA, uncertainty analysis, and integration with decision-making.</p>', PHD: '<h2>Research Frontiers</h2><p>Social LCA, planetary boundaries integration, and absolute sustainability metrics.</p>' } }],
    activities: [{ id: 'zw-life-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Track Your Stuff!', MIDDLE_SCHOOL: 'Product Journey', HIGH_SCHOOL: 'Simple LCA', UNDERGRADUATE: 'Full LCA', GRADUATE: 'Uncertainty Analysis', PHD: 'Method Development' }, description: { ELEMENTARY: 'Follow where your things come from!', MIDDLE_SCHOOL: 'Map a products journey.', HIGH_SCHOOL: 'Conduct a simplified LCA.', UNDERGRADUATE: 'Perform a complete LCA study.', GRADUATE: 'Analyze LCA uncertainty.', PHD: 'Advance LCA methodology.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-life-game', type: 'simulation', title: 'Lifecycle Detective', description: 'Trace products through their entire journey!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-life-quiz', passingScore: 80, questions: [{ id: 'zwlifeq1', question: { ELEMENTARY: 'What is a products story?', MIDDLE_SCHOOL: 'What stages does a product go through?', HIGH_SCHOOL: 'What is LCA?', UNDERGRADUATE: 'What are LCA impact categories?', GRADUATE: 'What is consequential LCA?', PHD: 'What is social LCA?' }, options: { ELEMENTARY: ['Where it comes from and goes', 'Just its name', 'Only its color', 'How much it costs'], MIDDLE_SCHOOL: ['Raw materials, making, using, disposal', 'Just buying it', 'Only the store', 'Only at home'], HIGH_SCHOOL: ['Lifecycle Assessment of environmental impacts', 'Life changing adventure', 'Large container area', 'Last call alert'], UNDERGRADUATE: ['Types of environmental effects measured', 'Product categories', 'Store sections', 'No categories'], GRADUATE: ['Assessing system-wide change effects', 'Following one product', 'No consequences', 'Simple accounting'], PHD: ['Assessing social and labor impacts', 'Only environment', 'No people', 'Technology only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'Every product has a story of where it came from, how it was made, and where it goes!', MIDDLE_SCHOOL: 'Products go from raw materials, through manufacturing, to stores, homes, and finally disposal or recycling.', HIGH_SCHOOL: 'LCA (Lifecycle Assessment) measures environmental impacts across a products entire life.', UNDERGRADUATE: 'Impact categories include climate change, water use, toxicity, resource depletion, and more.', GRADUATE: 'Consequential LCA models the system-wide effects of decisions, including market responses.', PHD: 'Social LCA extends lifecycle thinking to human rights, labor conditions, and community impacts.' } }] },
    externalResources: [{ title: 'LCA Resources', url: 'https://www.lifecycleinitiative.org/', type: 'research' }]
  },
  {
    id: 'zw-community',
    slug: 'zero-waste-communities',
    title: 'Zero Waste Communities',
    description: {
      ELEMENTARY: 'Learn how whole towns can work together to make almost no trash!',
      MIDDLE_SCHOOL: 'Discover how communities are achieving zero waste goals together.',
      HIGH_SCHOOL: 'Explore zero waste city strategies, community programs, and behavior change.',
      UNDERGRADUATE: 'Analyze municipal waste systems, diversion metrics, and implementation strategies.',
      GRADUATE: 'Examine zero waste policy, informal sector integration, and just transitions.',
      PHD: 'Research urban metabolism, waste governance, and social practice change.'
    },
    topic: 'zero-waste',
    category: 'COMMUNITY',
    icon: 'Users',
    color: 'terra',
    duration: { ELEMENTARY: 25, MIDDLE_SCHOOL: 35, HIGH_SCHOOL: 50, UNDERGRADUATE: 70, GRADUATE: 90, PHD: 120 },
    isMasterclass: false,
    lessons: [{ id: 'zw-comm-1', title: 'Towns Without Trash', order: 1, duration: 15, hasActivity: true, activityType: 'SIMULATION', content: { ELEMENTARY: '<h2>Whole Towns Going Zero Waste!</h2><p>When everyone in a town works together, they can recycle and compost almost everything!</p>', MIDDLE_SCHOOL: '<h2>Zero Waste Cities</h2><p>Cities like San Francisco and Kamikatsu, Japan are working to send nothing to landfills through recycling, composting, and reducing waste.</p>', HIGH_SCHOOL: '<h2>Community Programs</h2><p>Pay-as-you-throw, curbside composting, repair cafes, tool libraries, and education campaigns.</p>', UNDERGRADUATE: '<h2>Municipal Systems</h2><p>Waste characterization, collection systems, processing infrastructure, and measuring diversion rates.</p>', GRADUATE: '<h2>Policy and Justice</h2><p>Zero waste policy frameworks, waste picker integration, and ensuring just transitions.</p>', PHD: '<h2>Research Frontiers</h2><p>Urban metabolism, waste governance models, and social practice theory applications.</p>' } }],
    activities: [{ id: 'zw-comm-act-1', type: 'SIMULATION', title: { ELEMENTARY: 'Zero Waste Town!', MIDDLE_SCHOOL: 'Community Plan', HIGH_SCHOOL: 'City Strategy', UNDERGRADUATE: 'System Design', GRADUATE: 'Policy Framework', PHD: 'Governance Model' }, description: { ELEMENTARY: 'Help a town make no trash!', MIDDLE_SCHOOL: 'Create a community waste plan.', HIGH_SCHOOL: 'Design a zero waste city strategy.', UNDERGRADUATE: 'Design a municipal waste system.', GRADUATE: 'Develop zero waste policy.', PHD: 'Model waste governance systems.' }, config: { ELEMENTARY: { complexity: 'basic', variables: 3 }, MIDDLE_SCHOOL: { complexity: 'simple', variables: 5 }, HIGH_SCHOOL: { complexity: 'intermediate', variables: 10 }, UNDERGRADUATE: { complexity: 'advanced', variables: 18 }, GRADUATE: { complexity: 'expert', variables: 25 }, PHD: { complexity: 'research', variables: 35 } } }],
    game: { id: 'zw-comm-game', type: 'simulation', title: 'Zero Waste Mayor', description: 'Lead your community to zero waste!', rounds: 5, timeLimit: 40, difficultyByLevel: { ELEMENTARY: 'easy', MIDDLE_SCHOOL: 'easy', HIGH_SCHOOL: 'medium', UNDERGRADUATE: 'medium', GRADUATE: 'hard', PHD: 'expert' } },
    quiz: { id: 'zw-comm-quiz', passingScore: 80, questions: [{ id: 'zwcommq1', question: { ELEMENTARY: 'How do towns make less trash?', MIDDLE_SCHOOL: 'What city is famous for zero waste?', HIGH_SCHOOL: 'What is pay-as-you-throw?', UNDERGRADUATE: 'What is waste characterization?', GRADUATE: 'Why integrate informal waste workers?', PHD: 'What is urban metabolism?' }, options: { ELEMENTARY: ['Everyone works together to recycle', 'They make more trash', 'They hide the trash', 'They burn everything'], MIDDLE_SCHOOL: ['San Francisco and Kamikatsu', 'Only big cities', 'No cities do this', 'Only rich cities'], HIGH_SCHOOL: ['Paying based on trash amount', 'Free trash service', 'Pay for recycling', 'No payment needed'], UNDERGRADUATE: ['Studying whats in the waste stream', 'Describing trash cans', 'Naming landfills', 'Counting trucks'], GRADUATE: ['They already do valuable work and deserve rights', 'They dont help', 'Ignore them', 'Replace with machines'], PHD: ['Flows of materials and energy through cities', 'City eating habits', 'Building metabolism', 'Traffic flow only'] }, correctIndex: 0, explanation: { ELEMENTARY: 'When everyone in a town recycles, composts, and reduces together, almost no trash goes to landfills!', MIDDLE_SCHOOL: 'San Francisco, USA and Kamikatsu, Japan are famous for their zero waste achievements.', HIGH_SCHOOL: 'Pay-as-you-throw charges based on trash volume, encouraging waste reduction.', UNDERGRADUATE: 'Waste characterization analyzes what materials are in the waste stream to guide programs.', GRADUATE: 'Informal waste workers provide recycling services and deserve dignified integration into formal systems.', PHD: 'Urban metabolism studies how materials and energy flow through cities like nutrients through ecosystems.' } }] },
    externalResources: [{ title: 'Zero Waste Cities', url: 'https://zerowasteworld.org/', type: 'research' }]
  }
]
