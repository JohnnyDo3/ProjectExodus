// ============================================================================
// EXODOLOGY CURRICULUM - COMPLETE LESSON CONTENT
// ============================================================================

import {
  Compass, Map, Target, BookOpen, Droplet, Zap, Wheat,
  Users, Globe, Shield, Layers, GitBranch, Scale, Clock,
  AlertTriangle, Lightbulb, Network, BarChart3, Building,
  Heart, Puzzle, GraduationCap, Brain, Gamepad2, FileText, Play
} from 'lucide-react'

// ============================================================================
// CORE EXODOLOGY VOCABULARY (Consistent across all paths)
// ============================================================================

export const exodologyGlossary = {
  'exodology': {
    term: 'Exodology',
    definition: 'The study and practice of designing ethical exits from systems that no longer serve people or the planet.',
    level: 'foundations'
  },
  'system-exit': {
    term: 'System Exit',
    definition: 'A deliberate, planned departure from a dependent relationship with a system, preserving value and relationships.',
    level: 'foundations'
  },
  'exit-capability': {
    term: 'Exit Capability',
    definition: 'The structural capacity of individuals or communities to leave a system when needed without catastrophic loss.',
    level: 'foundations'
  },
  'exit-friction': {
    term: 'Exit Friction',
    definition: 'The resistance, costs, and barriers that make leaving a system difficult or costly.',
    level: 'foundations'
  },
  'structural-dependence': {
    term: 'Structural Dependence',
    definition: 'A condition where survival or basic functioning requires continued participation in a specific system.',
    level: 'foundations'
  },
  'soft-exodus': {
    term: 'Soft Exodus',
    definition: 'A gradual, partial exit that maintains some connections while building alternatives.',
    level: 'applied'
  },
  'hard-exodus': {
    term: 'Hard Exodus',
    definition: 'A complete, rapid departure from a system, typically in response to crisis or failure.',
    level: 'applied'
  },
  'parallel-systems': {
    term: 'Parallel Systems',
    definition: 'Alternative infrastructure built alongside existing systems to enable future exit.',
    level: 'applied'
  },
  'exit-compatible-governance': {
    term: 'Exit-Compatible Governance',
    definition: 'Institutional structures designed to enable rather than prevent system departure.',
    level: 'strategic'
  },
  'post-exit-precarity': {
    term: 'Post-Exit Precarity',
    definition: 'The vulnerability and instability experienced after leaving an established system.',
    level: 'strategic'
  },
  'transition-burden': {
    term: 'Transition Burden',
    definition: 'The costs, difficulties, and risks borne by those undergoing system transition.',
    level: 'strategic'
  },
  'residual-duty': {
    term: 'Residual Duty',
    definition: 'Continuing ethical obligations to those who remain in systems we have left.',
    level: 'foundations'
  }
}

// ============================================================================
// FOUNDATIONS OF EXODOLOGY - COMPLETE LESSON CONTENT
// ============================================================================

export const foundationsLessons = {
  // MODULE 1: Introduction to Exodology
  'f-m1-l1': {
    id: 'f-m1-l1',
    title: 'What is Exodology?',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exodology is the systematic study of exit—how individuals, communities, and societies leave systems that no longer serve them. Unlike migration studies, which focus on movement between places, or sustainability, which focuses on improving existing systems, Exodology asks a different question: When should we leave, and how do we leave well?

The term derives from "exodus" (departure) and "logos" (study/reason). It emerged as scholars and practitioners recognized that some systems cannot be reformed from within—they must be departed from. This is not about abandonment or collapse, but about intentional, ethical transition.`,

      sections: [
        {
          title: 'The Core Question of Exodology',
          content: `At its heart, Exodology addresses three interconnected questions:

1. **When is exit appropriate?** Not all systems should be exited. Some can be reformed. Exodology provides frameworks for distinguishing between systems worth saving and systems worth leaving.

2. **How do we exit ethically?** Departure has consequences—for those who leave, those who stay, and the system itself. Ethical exit minimizes harm while maximizing the potential for better alternatives.

3. **What comes after exit?** Building viable alternatives is as important as the act of leaving. Exodology studies how post-exit systems can thrive.`
        },
        {
          title: 'What Exodology Is Not',
          content: `It's important to distinguish Exodology from related but different concepts:

**Not Collapse Studies**: Collapse is unplanned, chaotic disintegration. Exodology seeks managed transitions that prevent collapse.

**Not Survivalism**: Exodology is not about individual escape or hoarding resources. It's about collective, ethical transition.

**Not Anti-System Ideology**: Exodology doesn't oppose all systems. It provides tools for evaluating when specific systems have failed their purpose.

**Not Migration Studies**: While both involve movement, migration typically means changing location within systems. Exodology addresses changing the systems themselves.`
        },
        {
          title: 'Historical Context',
          content: `The concept of exodus has deep historical roots. The Biblical Exodus—the departure of Israelites from Egypt—represents one of humanity's foundational narratives about leaving oppressive systems. Throughout history, we see patterns of exit:

- **The Great Migration** (1916-1970): Six million African Americans left the rural South for northern cities, exiting a system of racial oppression.
- **The Green Revolution Exit**: Communities worldwide have begun exiting industrial agriculture for regenerative alternatives.
- **Energy Transitions**: Societies have repeatedly transitioned from one energy system to another—wood to coal, coal to oil, and now fossil fuels to renewables.

Exodology synthesizes these historical patterns into a coherent discipline.`
        },
        {
          title: 'The Three Pillars of Exodology',
          content: `Exodology practice rests on three interconnected pillars:

**1. Literacy (Foundations)**: Understanding why systems fail, recognizing when exit is appropriate, and developing ethical frameworks for departure.

**2. Application (Applied)**: Designing and building exit-capable systems—decentralized alternatives in food, water, energy, and other domains.

**3. Stewardship (Strategic)**: Guiding large-scale transitions, navigating policy, ensuring equity, and maintaining stability during mass exits.

Mastery of all three pillars constitutes full Exodology competence.`
        }
      ],

      keyTakeaways: [
        'Exodology is the study of ethical exit from systems that no longer serve people or planet',
        'It differs from collapse studies, survivalism, and migration studies',
        'The discipline addresses when to exit, how to exit ethically, and what comes after',
        'Three pillars: Literacy, Application, and Stewardship'
      ],

      references: [
        {
          author: 'Hirschman, Albert O.',
          title: 'Exit, Voice, and Loyalty: Responses to Decline in Firms, Organizations, and States',
          year: 1970,
          publisher: 'Harvard University Press',
          relevance: 'Foundational text on exit as a response to organizational decline'
        },
        {
          author: 'Deleuze, Gilles & Guattari, Félix',
          title: 'A Thousand Plateaus: Capitalism and Schizophrenia',
          year: 1980,
          publisher: 'University of Minnesota Press',
          relevance: 'Philosophical framework for "lines of flight" and system departure'
        }
      ]
    },
    learningObjectives: [
      'Define Exodology in precise terms',
      'Explain how Exodology differs from related fields',
      'Identify the three pillars of Exodology practice',
      'Recognize historical examples of system exit'
    ],
    keyTerms: [
      { term: 'Exodology', definition: 'The study and practice of designing ethical exits from systems that no longer serve people or the planet.' },
      { term: 'System Exit', definition: 'A deliberate, planned departure from a dependent relationship with a system.' },
      { term: 'Exit Capability', definition: 'The structural capacity of individuals or communities to leave a system when needed.' }
    ]
  },

  'f-m1-l2': {
    id: 'f-m1-l2',
    title: 'The Exodology Trinity',
    duration: '15 min',
    type: 'instruction' as const,
    content: {
      introduction: `The Exodology Trinity represents the three interconnected competencies required for complete Exodology practice. Like a three-legged stool, removing any one leg causes the whole to fail. Understanding this structure helps learners see how the three learning paths connect and why all three are necessary for certification.`,

      sections: [
        {
          title: 'Pillar One: Literacy',
          content: `**Exodological Literacy** is the foundational competency—the ability to understand, analyze, and evaluate systems through an exit lens.

A literate exodologist can:
- Recognize when systems are failing their stated purposes
- Distinguish between reformable and unreformable systems
- Understand the ethics of departure
- Identify psychological and cultural barriers to exit
- Apply historical patterns to contemporary situations

Without literacy, exit becomes reactive rather than strategic. People flee collapsing systems rather than transitioning deliberately. Literacy transforms exit from panic to planning.`
        },
        {
          title: 'Pillar Two: Application',
          content: `**Exodological Application** is the practical competency—the ability to design, build, and support exit-capable systems.

An applied exodologist can:
- Map dependencies and identify exit friction points
- Design decentralized alternatives (food, water, energy)
- Create hybrid systems that enable gradual transition
- Measure autonomy and resilience
- Advise communities on practical exit strategies

Without application, literacy remains theoretical. Understanding why exit is needed means nothing if no viable alternatives exist. Application transforms understanding into infrastructure.`
        },
        {
          title: 'Pillar Three: Stewardship',
          content: `**Exodological Stewardship** is the leadership competency—the ability to guide large-scale transitions ethically and effectively.

A stewarding exodologist can:
- Navigate policy and governance considerations
- Address equity, justice, and access in transitions
- Manage risk, backlash, and unintended consequences
- Design exit-compatible institutions
- Maintain stability during mass transitions

Without stewardship, individual exits remain isolated successes. Stewardship transforms personal transitions into systemic change.`
        },
        {
          title: 'How the Pillars Connect',
          content: `The Trinity is not linear but cyclical. Each pillar informs and strengthens the others:

**Literacy → Application**: Understanding why systems fail shapes what alternatives we build.

**Application → Stewardship**: Building working alternatives provides models for scaling.

**Stewardship → Literacy**: Guiding large transitions reveals new patterns that deepen understanding.

A truly competent exodologist moves fluidly between all three modes of practice.`
        }
      ],

      keyTakeaways: [
        'The Trinity comprises Literacy, Application, and Stewardship',
        'Each pillar is necessary but insufficient alone',
        'The pillars are cyclical, not linear',
        'Certification requires demonstrated competence in all three'
      ]
    },
    learningObjectives: [
      'Describe the three pillars of Exodology',
      'Explain how the pillars build upon each other',
      'Recognize the certification pathway',
      'Understand why all three pillars are necessary'
    ]
  },

  'f-m1-l3': {
    id: 'f-m1-l3',
    title: 'Key Terms Flashcards',
    duration: '10 min',
    type: 'game' as const,
    content: {
      introduction: 'Master foundational Exodology vocabulary through interactive flashcard exercises. These terms form the language of Exodology practice.',
      gameType: 'flashcards',
      cards: [
        { front: 'Exodology', back: 'The study and practice of designing ethical exits from systems that no longer serve people or the planet.' },
        { front: 'System Exit', back: 'A deliberate, planned departure from a dependent relationship with a system.' },
        { front: 'Exit Capability', back: 'The structural capacity of individuals or communities to leave a system when needed.' },
        { front: 'Exit Friction', back: 'The resistance, costs, and barriers that make leaving a system difficult.' },
        { front: 'Structural Dependence', back: 'A condition where survival requires continued participation in a specific system.' },
        { front: 'The Exodology Trinity', back: 'The three pillars of Exodology practice: Literacy, Application, and Stewardship.' },
        { front: 'System Reform', back: 'Efforts to improve a system while remaining within its fundamental structure.' },
        { front: 'System Collapse', back: 'Unplanned, chaotic disintegration of a system without managed transition.' },
        { front: 'Residual Duty', back: 'Continuing ethical obligations to those who remain in systems we have left.' }
      ],
      completionRequirement: 'Score 80% or higher to complete this lesson'
    }
  },

  'f-m1-l4': {
    id: 'f-m1-l4',
    title: 'Why Exodology Now?',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `The early 21st century presents unique conditions that make Exodology not just relevant but necessary. Multiple converging crises—climate change, resource depletion, institutional erosion, and technological disruption—are exposing the limits of systems we've long depended upon. This lesson examines why Exodology has emerged as a discipline precisely at this moment.`,

      sections: [
        {
          title: 'The Polycrisis Context',
          content: `We live in an era of interconnected, cascading crises—what scholars call a "polycrisis." Unlike isolated problems that can be solved independently, polycrisis involves multiple systems failing simultaneously and amplifying each other's effects.

**Climate Crisis**: Rising temperatures, extreme weather, and ecosystem collapse threaten the stability of food, water, and energy systems simultaneously.

**Resource Depletion**: Peak oil, aquifer depletion, soil degradation, and mineral scarcity constrain the growth-based economic models most societies depend upon.

**Institutional Erosion**: Trust in governments, corporations, and international bodies has declined globally, reducing the capacity for coordinated reform.

**Technological Disruption**: Automation, AI, and platform capitalism are transforming labor markets faster than social systems can adapt.

In this context, the question is not whether systems will change, but whether those changes will be managed transitions or chaotic collapses.`
        },
        {
          title: 'Limits of Reform',
          content: `For decades, the dominant response to systemic problems has been reform—improving systems from within. Reform has achieved real successes: cleaner air in developed countries, improved workplace safety, expanded civil rights.

But reform faces structural limits:

**Path Dependence**: Systems develop around existing infrastructure, making fundamental change increasingly costly.

**Regulatory Capture**: Industries often control the agencies meant to regulate them.

**Growth Imperatives**: Economic systems that require perpetual growth cannot be reformed into sustainability.

**Time Horizons**: Democratic systems optimize for short-term results while ecological systems operate on multi-generational timescales.

When reform is insufficient, exit becomes necessary—not as abandonment, but as the creation of viable alternatives.`
        },
        {
          title: 'The Affordability of Exit',
          content: `Historically, exit was available primarily to the wealthy and privileged. The poor were locked into failing systems. Today, several factors are making exit more accessible:

**Distributed Technology**: Solar panels, water filtration, and communication tools are cheaper and more accessible than ever.

**Knowledge Networks**: Open-source information enables communities to learn exit strategies from each other.

**Precedent Examples**: Successful exits—from community land trusts to energy cooperatives—provide models to replicate.

**Crisis Pressure**: As mainstream systems become less reliable, the risk calculation for exit changes.

Exodology systematizes these possibilities, making ethical exit available to more people.`
        },
        {
          title: 'The Emergence of Exit Movements',
          content: `Across the globe, exit movements are already underway:

**Food Sovereignty**: Communities building local food systems outside industrial agriculture.

**Energy Democracy**: Cooperatives and microgrids enabling energy independence.

**Water Commons**: Communities reclaiming water from privatization and centralized control.

**Alternative Currencies**: Local and digital currencies enabling economic exit.

**Intentional Communities**: Settlements designed around different social and economic principles.

Exodology provides the theoretical framework to understand, evaluate, and improve these movements.`
        }
      ],

      keyTakeaways: [
        'Multiple converging crises create conditions where exit becomes necessary',
        'Reform faces structural limits in growth-dependent systems',
        'Technology and knowledge-sharing make exit more accessible',
        'Exit movements already exist across food, water, energy, and economic systems'
      ],

      references: [
        {
          author: 'IPCC',
          title: 'Climate Change 2022: Impacts, Adaptation and Vulnerability',
          year: 2022,
          relevance: 'Documents systemic climate risks requiring transformative change'
        },
        {
          author: 'World Bank',
          title: 'Groundswell: Preparing for Internal Climate Migration',
          year: 2021,
          relevance: 'Projects climate-driven displacement and system stress'
        }
      ]
    },
    learningObjectives: [
      'Identify systemic pressures driving interest in exit strategies',
      'Analyze the structural limits of reform',
      'Recognize factors making exit more accessible',
      'Connect current movements to Exodology principles'
    ]
  },

  'f-m1-l5': {
    id: 'f-m1-l5',
    title: 'Reflection: Your Relationship with Systems',
    duration: '12 min',
    type: 'reflection' as const,
    content: {
      introduction: `Before studying systems abstractly, it's valuable to examine your own system dependencies. This reflection exercise helps you identify the systems you participate in, evaluate your exit capability, and consider which systems serve you well versus which may warrant exit consideration.`,

      prompts: [
        {
          question: 'List the three systems you depend on most for daily survival (e.g., food supply chain, electrical grid, healthcare system).',
          guidance: 'Think about what would happen if each system suddenly became unavailable. Which would cause the most disruption?'
        },
        {
          question: 'For each system, estimate your exit capability on a scale of 1-5 (1 = completely dependent, 5 = could exit immediately).',
          guidance: 'Consider: Do you have alternatives? Skills to create alternatives? Resources to transition? Community support?'
        },
        {
          question: 'Identify one system you participate in that you believe no longer serves its stated purpose well.',
          guidance: 'Consider systems related to work, housing, transportation, communication, governance, or community.'
        },
        {
          question: 'What keeps you in this system despite its limitations?',
          guidance: 'Consider economic factors, social ties, lack of alternatives, uncertainty, or habit.'
        },
        {
          question: 'If you could increase your exit capability in one area, which would it be and why?',
          guidance: 'This question helps prioritize your learning focus throughout the course.'
        }
      ],

      closingNote: 'Your responses are private and for your own reflection. They will inform how you engage with the rest of this curriculum. There are no wrong answers—only honest assessments of your current position.'
    },
    learningObjectives: [
      'Identify personal system dependencies',
      'Assess current exit capability',
      'Recognize barriers to exit in your own life',
      'Set intentions for learning'
    ]
  },

  // MODULE 2: Exit vs Reform vs Collapse
  'f-m2-l1': {
    id: 'f-m2-l1',
    title: 'The Response Spectrum',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `When systems fail to serve their purposes, communities face a choice about how to respond. This lesson maps the full spectrum of responses—from minor optimization to complete exit—and provides frameworks for determining which response is appropriate in different contexts.`,

      sections: [
        {
          title: 'Mapping the Spectrum',
          content: `Responses to system dysfunction exist on a spectrum:

**1. Optimization** (Least Disruptive)
Making small improvements within existing structures. Examples: efficiency programs, better training, incremental policy adjustments.
*Appropriate when*: The system is fundamentally sound but underperforming.

**2. Reform**
Changing structures, rules, or incentives while maintaining the system's core identity. Examples: regulatory changes, new governance models, redistribution programs.
*Appropriate when*: The system's core purpose is valid but its mechanisms are flawed.

**3. Exit**
Deliberate departure from a system to build or join alternatives. Examples: community-supported agriculture, energy cooperatives, alternative currencies.
*Appropriate when*: The system's fundamental structure cannot be reformed to serve its stated purpose.

**4. Collapse** (Most Disruptive)
Unplanned, chaotic disintegration of a system. Not chosen but endured.
*Happens when*: Exit and reform fail or are prevented, and the system becomes unsustainable.`
        },
        {
          title: 'Distinguishing Reform from Exit',
          content: `The boundary between reform and exit is often unclear. Key distinctions:

**Reform maintains dependence**: Even after successful reform, participants remain dependent on the system. They've improved it, not replaced it.

**Exit creates alternatives**: Successful exit means viable alternatives exist. Participants can meet their needs outside the original system.

**The hybrid zone**: In practice, many transitions involve elements of both—reforming systems while simultaneously building alternatives (parallel systems).

A useful test: If the original system disappeared tomorrow, would those who've "reformed" it be fine, or would they be in crisis? If crisis, it's reform. If fine, it's exit.`
        },
        {
          title: 'The Collapse Trap',
          content: `Collapse is not a chosen response—it's what happens when other responses fail or are blocked. Understanding collapse helps us avoid it:

**Characteristics of collapse**:
- Rapid, not gradual
- Chaotic, not managed
- Destructive of value, relationships, and knowledge
- Traumatic for those who experience it
- Often followed by worse conditions, not better

**Why systems collapse**:
- Exit barriers prevent departure until breakdown
- Reform is captured or co-opted
- Leaders deny problems until crisis
- Interdependencies cause cascading failures

Exodology seeks to enable exit before collapse becomes inevitable. The window between "reform is working" and "collapse is unavoidable" is the exit window.`
        },
        {
          title: 'Reading the Signals',
          content: `How do we know when to shift from reform to exit? Warning signs include:

**Reform Exhaustion Signals**:
- Repeated reforms fail to address core problems
- Each reform requires more effort for less improvement
- Problems return shortly after reforms
- Reform efforts are actively undermined by system beneficiaries

**Exit Window Signals**:
- Viable alternatives exist or are emerging
- Key resources can be redirected
- Community of potential exiters is forming
- Cost of staying begins to exceed cost of leaving

**Collapse Warning Signals**:
- System requires increasing force to maintain
- Cascading failures begin
- Trust collapses rapidly
- Exit becomes desperate flight rather than planned transition`
        }
      ],

      keyTakeaways: [
        'Responses range from optimization to reform to exit to collapse',
        'Each response is appropriate in different contexts',
        'Reform maintains dependence; exit creates alternatives',
        'Exodology seeks to enable exit before collapse becomes inevitable'
      ],

      references: [
        {
          author: 'Tainter, Joseph',
          title: 'The Collapse of Complex Societies',
          year: 1988,
          relevance: 'Foundational analysis of why complex systems collapse'
        },
        {
          author: 'Meadows, Donella et al.',
          title: 'Limits to Growth: The 30-Year Update',
          year: 2004,
          relevance: 'Systems analysis of overshoot and collapse dynamics'
        }
      ]
    },
    learningObjectives: [
      'Define each response type on the spectrum',
      'Identify indicators for each response type',
      'Distinguish between reform and exit',
      'Recognize collapse warning signals'
    ],
    keyTerms: [
      { term: 'System Reform', definition: 'Efforts to improve a system while remaining within its fundamental structure.' },
      { term: 'System Collapse', definition: 'Unplanned, chaotic disintegration of a system without managed transition.' },
      { term: 'Strategic Exit', definition: 'Deliberate, planned departure that preserves value and relationships.' },
      { term: 'Exit Window', definition: 'The period when exit is possible before collapse becomes inevitable.' }
    ]
  },

  'f-m2-l2': {
    id: 'f-m2-l2',
    title: 'When Reform Reaches Its Limits',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Reform is often the first and most appropriate response to system dysfunction. But reform has limits—structural constraints that prevent even the most determined reform efforts from succeeding. This lesson examines these limits and helps you recognize when you've reached them.`,

      sections: [
        {
          title: 'Types of Reform Limits',
          content: `Reform can be blocked by different types of structural limits:

**Architectural Limits**
The system's basic design prevents the change you need. Example: You cannot reform a coal plant into a solar farm—the fundamental technology must change.

**Governance Limits**
Decision-making structures prevent reform. Example: Corporations legally obligated to maximize shareholder value cannot prioritize long-term sustainability when it conflicts with short-term profits.

**Economic Limits**
Financial structures make reform economically impossible. Example: Systems dependent on perpetual growth cannot be reformed into steady-state sustainability without changing their economic foundations.

**Cultural Limits**
Deeply held beliefs and identities resist change. Example: Communities whose identity is tied to a particular industry may resist transitioning away from it regardless of economic or environmental pressures.`
        },
        {
          title: 'The Reform Exhaustion Pattern',
          content: `Reform exhaustion follows a predictable pattern:

**Phase 1: Early Success**
Initial reforms address obvious problems and produce visible improvements. Reformers gain credibility and resources.

**Phase 2: Diminishing Returns**
Subsequent reforms require more effort for smaller gains. The easy problems have been solved; structural problems remain.

**Phase 3: Active Resistance**
Beneficiaries of the status quo organize to block further reform. Regulatory capture, political obstruction, and discrediting campaigns intensify.

**Phase 4: Reform Theater**
Reforms continue to be announced but produce no meaningful change. The appearance of progress substitutes for actual progress.

**Phase 5: Reform Exhaustion**
Reformers burn out, lose funding, or give up. The window for exit opens.`
        },
        {
          title: 'Case Study: Industrial Agriculture',
          content: `Industrial agriculture illustrates reform exhaustion:

**Early reforms**: Pesticide regulations, organic certification, farm worker protections produced real improvements.

**Diminishing returns**: Subsequent reforms (soil conservation programs, water quality regulations) achieved less while requiring more.

**Active resistance**: Agribusiness lobbying captured regulatory agencies, weakened standards, and blocked systemic change.

**Reform theater**: "Sustainable agriculture" initiatives were announced without changing fundamental practices.

**Current state**: Despite decades of reform, industrial agriculture continues depleting soil, contaminating water, and concentrating ownership. Many advocates now pursue exit—building alternative food systems—rather than further reform.`
        },
        {
          title: 'Testing for Reform Limits',
          content: `Use these questions to test whether reform can succeed:

**The Architecture Test**
Can the change you need be implemented within the system's existing structure? If it requires replacing the structure itself, reform is insufficient.

**The Power Test**
Do those with power to implement reform benefit from the status quo? If yes, expect active resistance that may exceed your capacity to overcome.

**The Time Test**
How quickly is the problem progressing versus how quickly can reform work? If the problem is advancing faster than reform, the gap will widen, not close.

**The Reversibility Test**
If you achieve reform, can it be reversed by the next administration or market shift? If reforms are easily undone, they may not be worth pursuing.

**The Exit Alternative Test**
Is it easier to build an alternative than to fix the existing system? If yes, exit may be more strategic than reform.`
        }
      ],

      keyTakeaways: [
        'Reform has architectural, governance, economic, and cultural limits',
        'Reform exhaustion follows a predictable pattern',
        'Testing for reform limits helps determine when exit is appropriate',
        'Building alternatives may be more strategic than continued reform'
      ]
    },
    learningObjectives: [
      'Identify different types of reform limits',
      'Recognize the reform exhaustion pattern',
      'Apply testing frameworks to evaluate reform viability',
      'Determine when exit is more strategic than reform'
    ]
  },

  'f-m2-l3': {
    id: 'f-m2-l3',
    title: 'Matching Game: Response Types',
    duration: '10 min',
    type: 'game' as const,
    content: {
      introduction: 'Test your ability to distinguish between optimization, reform, exit, and collapse by matching scenarios to the appropriate response type.',
      gameType: 'matching',
      instructions: 'Read each scenario and determine which response type it represents. Consider the key distinctions: Does it maintain or create alternatives? Is it planned or chaotic? Does it change structure or work within it?',
      pairs: [
        {
          scenario: 'A company improves its supply chain efficiency to reduce costs',
          response: 'Optimization',
          explanation: 'This is a minor improvement within existing structures without changing fundamental relationships.'
        },
        {
          scenario: 'Activists successfully lobby for new environmental regulations on an industry',
          response: 'Reform',
          explanation: 'This changes rules and incentives while maintaining the basic system structure.'
        },
        {
          scenario: 'Farmers leave industrial contracts to join a cooperative that sells directly to consumers',
          response: 'Exit',
          explanation: 'This creates an alternative system and reduces dependence on the original.'
        },
        {
          scenario: 'A regional power grid fails completely during a heat wave, leaving millions without electricity',
          response: 'Collapse',
          explanation: 'This is unplanned, chaotic system failure, not a chosen transition.'
        },
        {
          scenario: 'A city installs water-efficient fixtures in all public buildings',
          response: 'Optimization',
          explanation: 'This improves efficiency within the existing water system structure.'
        },
        {
          scenario: 'Residents install rainwater catchment and greywater recycling, meeting 80% of water needs independently',
          response: 'Exit',
          explanation: 'This creates functional independence from the centralized water system.'
        },
        {
          scenario: 'A community builds a microgrid while remaining connected to the main grid as backup',
          response: 'Exit (partial)',
          explanation: 'This creates alternatives while maintaining some connection—a soft exodus.'
        },
        {
          scenario: 'A national healthcare system adopts new cost-control measures and expands coverage',
          response: 'Reform',
          explanation: 'This changes system parameters while maintaining the fundamental structure.'
        }
      ],
      completionRequirement: 'Match all scenarios correctly to complete this lesson'
    }
  },

  'f-m2-l4': {
    id: 'f-m2-l4',
    title: 'Collapse: What Exodology Seeks to Prevent',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Collapse is not a response to choose but a fate to avoid. Understanding collapse—its characteristics, causes, and consequences—helps us appreciate why managed exit is preferable. This lesson examines collapse dynamics so we can recognize warning signs and act before collapse becomes inevitable.`,

      sections: [
        {
          title: 'Characteristics of Collapse',
          content: `Collapse has distinct characteristics that distinguish it from exit:

**Rapidity**: Collapse happens faster than people can adapt. Systems that took decades to build can fail in months or weeks.

**Chaos**: Unlike planned transitions, collapse lacks coordination. People flee rather than transition.

**Value Destruction**: Collapse destroys the value that managed exit would preserve—infrastructure, knowledge, relationships, institutions.

**Trauma**: Collapse is experienced as crisis, not opportunity. It creates refugees, not pioneers.

**Regression**: Collapse often leads to conditions worse than before the system existed. Institutional knowledge is lost; trust evaporates.`
        },
        {
          title: 'Why Systems Collapse',
          content: `Systems collapse when exit and reform are prevented until breaking point:

**Exit Barriers**: High costs, social stigma, or legal restrictions prevent departure. People stay until they can't.

**Reform Capture**: Those who benefit from the status quo control reform processes, preventing meaningful change.

**Denial**: Leaders and participants deny problems until crisis makes denial impossible.

**Interdependence**: Systems depend on other systems. When one fails, cascading failures follow.

**Rigidity**: Systems optimized for efficiency lack the slack needed to absorb shocks.

**Overshoot**: Systems exceed sustainable limits, depleting the resources they depend on.`
        },
        {
          title: 'Historical Collapse Examples',
          content: `History provides sobering examples:

**The Bronze Age Collapse (c. 1200 BCE)**: Interconnected Mediterranean civilizations collapsed within decades. Causes included climate change, disrupted trade, and systems optimized for efficiency without resilience.

**The Western Roman Empire (476 CE)**: Centuries of reform attempts couldn't address fundamental structural problems. Those who could exit did; those who couldn't endured centuries of instability.

**The Soviet Union (1991)**: Sudden collapse followed decades of reform that couldn't address structural contradictions. The transition was chaotic, traumatic, and created widespread hardship.

In each case, managed exit might have produced better outcomes than chaotic collapse.`
        },
        {
          title: 'The Exit Alternative',
          content: `Exodology proposes exit as an alternative to collapse:

**Preserve Value**: Managed exit transfers resources, knowledge, and relationships to new systems rather than destroying them.

**Reduce Trauma**: Gradual transition is less traumatic than sudden collapse.

**Maintain Function**: Exit can maintain critical functions during transition; collapse cannot.

**Enable Choice**: Exit is chosen; collapse is endured. Agency matters for recovery.

**Build Better**: Exit can lead to improved systems; collapse often leads to regression.

The goal is not to save failing systems but to enable dignified departure before collapse makes departure chaotic and costly.`
        }
      ],

      keyTakeaways: [
        'Collapse is rapid, chaotic, destructive, and traumatic',
        'Systems collapse when exit and reform are blocked until breaking point',
        'Historical collapses share common patterns we can recognize',
        'Managed exit preserves what collapse destroys'
      ]
    },
    learningObjectives: [
      'Define system collapse and its characteristics',
      'Identify factors that lead to collapse',
      'Analyze historical examples of system collapse',
      'Explain how exit prevents collapse'
    ]
  },

  'f-m2-l5': {
    id: 'f-m2-l5',
    title: 'Scenario Analysis: Exit or Reform?',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Apply your understanding of the response spectrum to real-world scenarios. For each case, analyze whether reform or exit is the more appropriate response, and justify your reasoning.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'The Declining Manufacturing Town',
          description: 'A town of 15,000 depends on a single factory that employs 40% of residents. The factory is becoming uncompetitive due to automation and overseas competition. The company has announced potential closure within 5 years. Town leaders are debating whether to offer tax incentives to keep the factory, or to begin planning for life without it.',
          options: [
            {
              choice: 'Reform: Offer incentives and work to make the factory competitive',
              analysis: 'This maintains dependence on a single employer and may only delay the inevitable while depleting public resources.',
              score: 2
            },
            {
              choice: 'Exit: Begin planning alternative economic development while the factory still operates',
              analysis: 'This uses the remaining time to build alternatives, diversify the economy, and prepare residents for transition.',
              score: 5
            },
            {
              choice: 'Wait and see what happens',
              analysis: 'This risks collapse—sudden closure without alternatives in place.',
              score: 1
            }
          ],
          lesson: 'When a system\'s decline is predictable, the exit window is before closure, not after. Using remaining resources to build alternatives is more strategic than attempting to preserve a failing system.'
        },
        {
          title: 'The Polluted Water System',
          description: 'A city\'s water system shows increasing contamination. Testing reveals aging infrastructure that would cost $500 million to fully replace. The city can afford $50 million. Current contamination levels are below legal limits but rising. Some residents have begun installing home filtration systems.',
          options: [
            {
              choice: 'Reform: Prioritize the most critical repairs with available funds',
              analysis: 'This may buy time but doesn\'t address the fundamental problem. Contamination will likely continue rising.',
              score: 3
            },
            {
              choice: 'Hybrid: Support both municipal repairs and household-level water independence',
              analysis: 'This reduces dependence on the centralized system while buying time for infrastructure investment.',
              score: 5
            },
            {
              choice: 'Exit: Encourage all residents to develop independent water sources',
              analysis: 'Full exit may not be possible for all residents, especially those without resources for independent systems.',
              score: 2
            }
          ],
          lesson: 'Complex systems often require hybrid approaches—reforming what can be reformed while building alternatives for those who can access them.'
        },
        {
          title: 'The Corporate Sustainability Program',
          description: 'You work for a large corporation with an active sustainability program. The program has reduced emissions by 15% over five years. However, core business practices continue driving much larger emissions in the supply chain. Leadership celebrates the program while blocking discussion of fundamental business model changes.',
          options: [
            {
              choice: 'Reform: Continue the sustainability program and push for expanded scope',
              analysis: 'This may produce incremental gains but won\'t address the structural issue if leadership blocks fundamental change.',
              score: 3
            },
            {
              choice: 'Exit: Leave to work for or start an organization with sustainability as its core model',
              analysis: 'Individual exit may be appropriate when institutional reform is blocked.',
              score: 4
            },
            {
              choice: 'Hybrid: Continue reform internally while supporting alternative business models externally',
              analysis: 'This keeps reform pressure while building the alternatives that make corporate change more likely.',
              score: 5
            }
          ],
          lesson: 'When reform is captured by those who benefit from the status quo, building external alternatives may be more impactful than internal reform alone.'
        }
      ],
      completionRequirement: 'Complete analysis of all scenarios to finish this lesson'
    }
  },

  // MODULE 3: Why People Leave Systems
  'f-m3-l1': {
    id: 'f-m3-l1',
    title: 'Push and Pull Factors',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Understanding why people leave systems requires analyzing both the forces that push them out and the attractions that pull them toward alternatives. This dual-force model—borrowed from migration studies but adapted for Exodology—provides a framework for predicting, planning, and supporting system exits.`,

      sections: [
        {
          title: 'The Push-Pull Framework',
          content: `Every exit decision involves two sets of forces:

**Push Factors**: Conditions within the current system that make staying difficult, painful, or impossible. These are the "away from" motivations.

**Pull Factors**: Attractions of alternatives that make leaving appealing. These are the "toward" motivations.

Most exits involve both. Pure push (fleeing with nowhere to go) leads to precarity. Pure pull (leaving a functional system for something better) is rare. Understanding the mix of push and pull helps predict exit patterns and design better alternatives.`
        },
        {
          title: 'Categories of Push Factors',
          content: `Push factors fall into several categories:

**Economic Push**: Declining wages, job loss, unaffordable costs, debt traps, lack of economic opportunity.

**Environmental Push**: Pollution, resource depletion, climate impacts, health hazards, ecosystem collapse.

**Social Push**: Discrimination, exclusion, violence, breakdown of community, loss of social support.

**Political Push**: Repression, corruption, lack of representation, unjust laws, institutional failure.

**Existential Push**: Loss of meaning, values conflict, identity suppression, spiritual emptiness.

The strength of push factors determines urgency. Weak push creates discomfort; strong push creates desperation.`
        },
        {
          title: 'Categories of Pull Factors',
          content: `Pull factors also fall into categories:

**Economic Pull**: Better opportunities, fair compensation, ownership possibilities, sustainable livelihoods.

**Environmental Pull**: Clean air and water, healthy ecosystems, sustainable practices, connection to nature.

**Social Pull**: Community belonging, mutual support, shared values, cultural expression.

**Political Pull**: Voice in decisions, just governance, rights protection, meaningful participation.

**Existential Pull**: Purpose, meaning, alignment with values, spiritual fulfillment.

Strong pull factors make exit destinations viable. Without pull, exit becomes flight rather than transition.`
        },
        {
          title: 'The Exit Threshold',
          content: `The exit threshold is the point where push factors overcome inertia and barriers:

**Inertia**: The tendency to stay with the familiar, even when it's not optimal. Includes habit, comfort with known difficulties, and fear of unknown challenges.

**Barriers**: Structural obstacles to exit—financial costs, legal restrictions, social ties, lack of alternatives, knowledge gaps.

**Threshold Calculation**: Exit occurs when:
(Push Factors) + (Pull Factors) > (Inertia) + (Barriers)

This explains why people stay in clearly failing systems—not because they're unaware, but because the threshold hasn't been crossed.`
        },
        {
          title: 'Implications for Exodology Practice',
          content: `Understanding push-pull dynamics informs practice:

**For those experiencing push**: Recognize that discomfort is valid data. Begin exploring alternatives before desperation forces hasty exits.

**For those building alternatives**: Create genuine pull—not just escape hatches but destinations worth reaching.

**For advisors and stewards**: Assess both forces. Help people exit before push becomes overwhelming, and ensure pull factors are real, not illusory.

**For policy**: Reduce artificial barriers that trap people in failing systems. Enable exit before collapse forces it.`
        }
      ],

      keyTakeaways: [
        'Exit decisions involve push factors (away from) and pull factors (toward)',
        'Both forces fall into economic, environmental, social, political, and existential categories',
        'Exit occurs when push plus pull exceeds inertia plus barriers',
        'Effective Exodology addresses both forces strategically'
      ],

      references: [
        {
          author: 'Lee, Everett S.',
          title: 'A Theory of Migration',
          year: 1966,
          relevance: 'Foundational push-pull framework adapted for Exodology'
        }
      ]
    },
    learningObjectives: [
      'Apply the push-pull framework to exit analysis',
      'Categorize exit motivations by type',
      'Calculate exit threshold factors',
      'Use push-pull analysis in practice'
    ],
    keyTerms: [
      { term: 'Push Factors', definition: 'Conditions within a system that drive people to seek exit.' },
      { term: 'Pull Factors', definition: 'Attractions of alternatives that draw people away from current systems.' },
      { term: 'Exit Threshold', definition: 'The point at which push factors overcome inertia and barriers to exit.' }
    ]
  },

  'f-m3-l2': {
    id: 'f-m3-l2',
    title: 'Economic Exit Drivers',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Economic factors are among the most powerful drivers of system exit. When economic systems fail to provide livelihoods, concentrate wealth, or trap people in debt, exit becomes both necessity and opportunity. This lesson examines economic push and pull factors in depth.`,

      sections: [
        {
          title: 'Economic Push Factors',
          content: `Economic dysfunction pushes people toward exit:

**Wage Stagnation and Decline**: When wages fail to keep pace with costs, the implicit bargain of the economic system breaks down. Workers who followed the rules find themselves falling behind.

**Job Insecurity**: Automation, offshoring, and gig-ification erode stable employment. Without job security, the case for loyalty to the system weakens.

**Debt Traps**: Student loans, medical debt, credit card debt, and mortgages can create inescapable obligations that make working within the system feel like servitude.

**Concentration of Opportunity**: When economic opportunity concentrates in a few locations or industries, those outside face exit pressure—either geographic migration or system departure.

**Cost of Basics**: When housing, healthcare, education, and childcare consume most income, the economic system fails its basic function of enabling life.`
        },
        {
          title: 'Economic Pull Factors',
          content: `Alternative economic arrangements create pull:

**Ownership and Equity**: Cooperatives, employee ownership, and community ownership models offer stakes in success rather than mere wages.

**Local Economies**: Local production, local currency, and local investment keep wealth circulating in communities rather than extracting it.

**Reduced Costs**: Lower cost of living through shared resources, self-provisioning, and simpler lifestyles makes smaller incomes viable.

**Meaningful Work**: Economic alternatives often offer work aligned with values—something mainstream employment increasingly lacks.

**Resilience**: Diversified local economies prove more resilient to global shocks than dependent integration into global supply chains.`
        },
        {
          title: 'Case Study: The Gig Economy Exodus',
          content: `Consider the growing exit from gig work:

**Push Factors**: No benefits, unstable income, algorithmic control, vehicle expenses, lack of advancement, physical toll.

**Initial Attraction**: Flexibility, independence, immediate income access.

**Reality Gap**: The gap between promised flexibility and experienced precarity creates exit pressure.

**Exit Destinations**: Traditional employment (return), cooperative platforms (reform), self-employment (partial exit), or complete withdrawal from the labor market where possible.

**Barriers**: Debt obligations, lack of savings, skill gaps, and need for immediate income keep many trapped despite dissatisfaction.

This pattern—initial attraction, reality gap, exit pressure, barriers—recurs across economic systems.`
        },
        {
          title: 'Evaluating Economic Exit Opportunities',
          content: `When assessing economic exit opportunities, consider:

**Viability**: Can the alternative actually provide livelihood? Many alternatives fail this basic test.

**Transition Path**: How do you get from here to there? The transition itself has costs.

**Risk Distribution**: Who bears the risk if the alternative fails? Economic exit shouldn't create worse precarity.

**Scalability**: Can this work for many people, or only for a privileged few with resources to exit?

**Sustainability**: Will this alternative remain viable long-term, or is it dependent on conditions that may change?

Responsible economic exit requires honest assessment, not just hope.`
        }
      ],

      keyTakeaways: [
        'Economic push factors include wage stagnation, insecurity, debt, and cost of basics',
        'Economic pull factors include ownership, local economies, and meaningful work',
        'The gap between promise and reality creates exit pressure',
        'Economic exits must be evaluated for viability, transition path, and sustainability'
      ]
    },
    learningObjectives: [
      'Identify economic push factors driving exit',
      'Recognize economic pull factors in alternatives',
      'Analyze the gig economy as an exit case study',
      'Evaluate economic exit opportunities critically'
    ]
  },

  'f-m3-l3': {
    id: 'f-m3-l3',
    title: 'Social and Cultural Exit Drivers',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Not all exit drivers are economic. Social exclusion, cultural alienation, and identity suppression push people toward communities and systems where they can belong authentically. These drivers are often underestimated but can be more powerful than material factors.`,

      sections: [
        {
          title: 'Social Push Factors',
          content: `Social dysfunction drives exit:

**Exclusion and Discrimination**: When systems exclude people based on identity—race, gender, sexuality, disability, religion—those excluded seek systems where they belong.

**Community Breakdown**: Atomization, isolation, and the erosion of social bonds push people toward communities that offer genuine connection.

**Violence and Harassment**: Physical and psychological violence within systems makes exit a matter of safety.

**Social Stigma**: When participation in a system carries stigma (certain jobs, certain places, certain associations), exit becomes attractive.

**Belonging Deficit**: The deep human need for belonging, when unmet, creates powerful exit motivation.`
        },
        {
          title: 'Cultural Push Factors',
          content: `Cultural factors also drive exit:

**Values Misalignment**: When system values conflict with personal values, continued participation feels like self-betrayal.

**Meaning Deficit**: Systems that offer material sufficiency but no meaning leave people hungry for purpose.

**Identity Suppression**: Pressure to hide or suppress authentic identity—whether cultural, spiritual, or personal—creates exit pressure.

**Cultural Homogenization**: The flattening of cultural diversity pushes those who value their heritage toward spaces that honor it.

**Spiritual Emptiness**: For many, the secular materialism of mainstream systems fails to address spiritual needs.`
        },
        {
          title: 'Social and Cultural Pull Factors',
          content: `Alternative communities offer powerful pull:

**Authentic Belonging**: Communities built around shared values and mutual acceptance offer what mainstream systems lack.

**Shared Purpose**: Working together toward meaningful goals creates bonds stronger than economic transaction.

**Cultural Expression**: Spaces that celebrate rather than suppress cultural identity draw those whose identity is marginalized elsewhere.

**Spiritual Community**: Religious and spiritual communities offer meaning, ritual, and transcendence.

**Intentional Design**: Intentional communities explicitly design social structures rather than inheriting dysfunction.

These pull factors often matter more than material conditions. People accept material sacrifice for social and cultural fulfillment.`
        },
        {
          title: 'The Social Cost of Exit',
          content: `Social and cultural exits carry unique costs:

**Leaving Relationships**: Exiting a system often means leaving family, friends, and social networks embedded in that system.

**Identity Transition**: Exit may require becoming someone different, with all the disorientation that entails.

**Loss of Status**: Status achieved within the old system may not transfer to the new context.

**Cultural Learning**: Entering a new cultural context requires learning new norms, languages, and practices.

**Isolation Risk**: Failed social exit can leave people between communities, belonging to neither.

Understanding these costs helps plan transitions that maintain social support throughout.`
        }
      ],

      keyTakeaways: [
        'Social push factors include exclusion, community breakdown, and belonging deficit',
        'Cultural push factors include values misalignment and identity suppression',
        'Social and cultural pull often matters more than material conditions',
        'Social exit carries unique costs that must be planned for'
      ]
    },
    learningObjectives: [
      'Identify social and cultural push factors',
      'Recognize the power of belonging as a pull factor',
      'Understand why people sacrifice material conditions for social fulfillment',
      'Plan for the social costs of exit'
    ]
  },

  'f-m3-l4': {
    id: 'f-m3-l4',
    title: 'Environmental Exit Drivers',
    duration: '15 min',
    type: 'instruction' as const,
    content: {
      introduction: `Environmental degradation is an increasingly powerful exit driver. As climate change, pollution, and resource depletion make places uninhabitable or systems unsustainable, environmental factors will drive more exits than any other category in coming decades.`,

      sections: [
        {
          title: 'Environmental Push Factors',
          content: `Environmental conditions push exit:

**Climate Impacts**: Rising seas, extreme heat, drought, flooding, and storms make regions uninhabitable. Climate migration is already underway.

**Pollution**: Air pollution, water contamination, and toxic exposure drive people from poisoned places.

**Resource Depletion**: Depleted aquifers, degraded soil, and exhausted fisheries undermine livelihoods dependent on natural resources.

**Ecosystem Collapse**: The loss of pollinators, forests, wetlands, and biodiversity destroys the ecological foundation of communities.

**Health Impacts**: Environmental degradation manifests in bodies—cancer clusters, respiratory disease, reproductive harm—making the personal political.`
        },
        {
          title: 'Environmental Pull Factors',
          content: `Healthier environments create pull:

**Clean Essentials**: Clean air, clean water, and uncontaminated soil are increasingly valuable as they become rare.

**Functioning Ecosystems**: Places where ecosystems still function—pollinators pollinate, water cycles work, soil lives—attract those fleeing degraded environments.

**Sustainable Systems**: Communities practicing regenerative agriculture, renewable energy, and closed-loop resource management offer environmental security.

**Climate Refugia**: Regions less affected by climate change—temperate, water-rich, stable—become destinations.

**Connection to Nature**: Beyond physical health, many seek the psychological and spiritual benefits of nature connection lost in degraded environments.`
        },
        {
          title: 'Environmental Exit Patterns',
          content: `Environmental exits follow distinct patterns:

**Gradual Degradation**: Slow environmental decline allows planned exit for those paying attention, but often triggers mass exit only when thresholds are crossed.

**Acute Events**: Disasters—hurricanes, floods, fires, droughts—trigger immediate displacement. Some displaced return; many become permanent exiters.

**Health Triggers**: Personal health impacts often catalyze exit that abstract environmental knowledge didn't.

**Anticipatory Exit**: Those with resources and foresight exit before conditions force it, leading to environmental gentrification of refugia.

**Trapped Populations**: Those without resources to exit remain in degrading environments, bearing disproportionate harm—an environmental justice crisis.`
        },
        {
          title: 'Exodology and Environmental Transition',
          content: `Environmental exit has special characteristics:

**Non-negotiable**: Unlike economic or social factors, environmental limits are physical. Collapse cannot be reformed away.

**Slow and Fast**: Environmental change operates on timescales from decades (climate) to hours (disasters), requiring both long-term planning and rapid response.

**Collective**: Individual exit doesn't solve collective environmental problems. Environmental Exodology must address system-level change.

**Irreversible**: Unlike social systems, degraded ecosystems may not recover on human timescales. Exit windows can close permanently.

**Just Transition**: Environmental exit is morally complex—those least responsible for degradation often bear the greatest exit burdens.`
        }
      ],

      keyTakeaways: [
        'Environmental push factors include climate impacts, pollution, and ecosystem collapse',
        'Environmental pull factors include clean resources and functioning ecosystems',
        'Environmental exit often lags behind degradation until thresholds are crossed',
        'Environmental Exodology must address justice, irreversibility, and collective action'
      ]
    },
    learningObjectives: [
      'Identify environmental push and pull factors',
      'Recognize environmental exit patterns',
      'Understand the special characteristics of environmental exit',
      'Apply environmental justice frameworks to exit planning'
    ]
  },

  'f-m3-l5': {
    id: 'f-m3-l5',
    title: 'Drag-and-Drop: Mapping Exit Motivations',
    duration: '12 min',
    type: 'game' as const,
    content: {
      introduction: 'Practice categorizing exit motivations into their proper frameworks. This skill helps you analyze exit situations systematically.',
      gameType: 'drag-drop-classification',
      categories: [
        { name: 'Economic Push', description: 'Financial pressures driving exit' },
        { name: 'Economic Pull', description: 'Financial attractions of alternatives' },
        { name: 'Social Push', description: 'Social dysfunction driving exit' },
        { name: 'Social Pull', description: 'Social attractions of alternatives' },
        { name: 'Environmental Push', description: 'Environmental degradation driving exit' },
        { name: 'Environmental Pull', description: 'Environmental quality attracting exit' }
      ],
      items: [
        { motivation: 'Wages haven\'t kept up with housing costs for a decade', correctCategory: 'Economic Push' },
        { motivation: 'The cooperative offers profit-sharing to all workers', correctCategory: 'Economic Pull' },
        { motivation: 'Neighbors don\'t talk to each other anymore', correctCategory: 'Social Push' },
        { motivation: 'The intentional community has weekly shared meals', correctCategory: 'Social Pull' },
        { motivation: 'The river is too polluted to fish in now', correctCategory: 'Environmental Push' },
        { motivation: 'The ecovillage has clean spring water', correctCategory: 'Environmental Pull' },
        { motivation: 'Healthcare costs bankrupted us twice', correctCategory: 'Economic Push' },
        { motivation: 'My cultural traditions are mocked here', correctCategory: 'Social Push' },
        { motivation: 'They practice regenerative agriculture', correctCategory: 'Environmental Pull' },
        { motivation: 'I could own a stake in the business', correctCategory: 'Economic Pull' }
      ],
      completionRequirement: 'Correctly classify 80% of motivations to complete this lesson'
    }
  },

  // MODULE 4: Historical and Modern Exoduses
  'f-m4-l1': {
    id: 'f-m4-l1',
    title: 'The Great Migration and Economic Systems',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `The Great Migration—the movement of six million African Americans from the rural South to northern and western cities between 1916 and 1970—represents one of history's most significant examples of mass system exit. Studying it illuminates patterns relevant to contemporary Exodology.`,

      sections: [
        {
          title: 'The System Being Exited',
          content: `The Jim Crow South was a comprehensive system of oppression:

**Economic Dimension**: Sharecropping and tenant farming trapped Black farmers in cycles of debt. Wages for non-agricultural work were a fraction of white wages. Economic advancement was legally and violently suppressed.

**Political Dimension**: Disenfranchisement through poll taxes, literacy tests, and violence denied political voice. The law provided no protection and often enabled oppression.

**Social Dimension**: Rigid segregation enforced white supremacy in every public space. Lynching and racial terror maintained the system through fear.

**Cultural Dimension**: Black culture was simultaneously appropriated and denigrated. Education was deliberately inferior.

This was not merely a flawed system needing reform—it was designed to exploit. Exit, not reform, was the appropriate response.`
        },
        {
          title: 'Push and Pull Dynamics',
          content: `The Great Migration exemplifies push-pull dynamics:

**Push Factors**:
- Racial violence and terror
- Economic exploitation through sharecropping
- Political disenfranchisement
- Destruction of Black communities (Tulsa, Rosewood)
- Boll weevil devastation of cotton economy
- Mechanization reducing need for agricultural labor

**Pull Factors**:
- Industrial jobs in northern cities
- Higher wages (though still discriminatory)
- Relative freedom from legal segregation
- Existing Black communities in destination cities
- Black newspapers (especially the Chicago Defender) promoting migration
- Railroad networks enabling movement

The combination created the Great Migration, not either force alone.`
        },
        {
          title: 'Exit Patterns and Strategies',
          content: `The Great Migration showed various exit patterns:

**Chain Migration**: Early migrants established footholds, then helped family and community members follow. Information and resources flowed through networks.

**Seasonal to Permanent**: Many began as seasonal migrants, testing northern conditions before committing to permanent relocation.

**Institutional Support**: Black newspapers, churches, and organizations provided information, resources, and community support for exiters.

**Destination Choice**: Migrants chose destinations based on railroad routes, existing connections, and industry needs—not randomly.

**Staged Exit**: Many moved in stages—rural South to southern cities, then to the North—building resources and experience.

These patterns recur in contemporary exit movements.`
        },
        {
          title: 'Outcomes and Lessons',
          content: `The Great Migration offers lessons for Exodology:

**Exit Transformed Both Sides**: The South lost labor and was eventually forced to change. The North was transformed by Black culture, politics, and community.

**Partial Success**: While migration escaped the worst of Jim Crow, northern racism created different but real barriers. Exit is not liberation.

**Collective Power**: Mass exit gave political and economic leverage. Individual exit would not have achieved what collective movement did.

**Backlash**: Northern white resistance, housing discrimination, and deindustrialization created new challenges.

**Cultural Flowering**: The Harlem Renaissance, Chicago blues, and Black political power emerged from exit communities.

The Great Migration shows that exit can transform societies—but also that destination systems have their own challenges.`
        }
      ],

      keyTakeaways: [
        'The Great Migration was mass exit from a system designed for exploitation',
        'Push and pull factors combined to enable movement',
        'Exit patterns included chain migration, staged movement, and institutional support',
        'Exit transformed both origin and destination but did not eliminate challenges'
      ],

      references: [
        {
          author: 'Wilkerson, Isabel',
          title: 'The Warmth of Other Suns: The Epic Story of America\'s Great Migration',
          year: 2010,
          relevance: 'Definitive narrative history of the Great Migration'
        }
      ]
    },
    learningObjectives: [
      'Analyze the Great Migration as a system exit',
      'Identify push and pull factors in historical migration',
      'Recognize exit patterns applicable to contemporary movements',
      'Understand the complex outcomes of mass exit'
    ]
  },

  'f-m4-l2': {
    id: 'f-m4-l2',
    title: 'Agricultural Transitions Throughout History',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Humanity has undergone several major agricultural transitions—from foraging to cultivation, from subsistence to commercial farming, and from traditional to industrial agriculture. Each involved system exit at massive scale. Understanding these transitions informs contemporary food system Exodology.`,

      sections: [
        {
          title: 'The Neolithic Transition',
          content: `The shift from foraging to agriculture (beginning ~10,000 BCE) was humanity's first major system exit:

**The Foraging System**: Small, mobile groups following seasonal resources. Low population density, extensive land use, diverse diet, egalitarian social structure.

**Push Factors**: Climate change, population pressure, declining megafauna, resource concentration.

**Pull Factors**: Storable surplus, settled life, larger communities, accumulation possible.

**Transition Dynamics**: Gradual in most places, spanning centuries. Foraging and farming coexisted for millennia. Not a single decision but emergent pattern.

**Outcomes**: Higher population, more disease, more hierarchy, more labor, but also cities, writing, and civilization as we know it.

This transition shows that system exit can be civilizationally transformative—for better and worse.`
        },
        {
          title: 'The Enclosure Movement',
          content: `The enclosure of common lands in England (15th-19th centuries) forced agricultural exit:

**The Commons System**: Peasants held customary rights to common lands for grazing, foraging, and cultivation. Land was not purely private property.

**Push Factors**: Legal enclosure eliminated commons access. Peasants lost livelihood and were forced into wage labor.

**This Was Forced Exit**: Unlike voluntary exit, enclosure imposed system departure through legal dispossession.

**Outcomes**: Created landless labor force for industrial capitalism. Destroyed traditional communities. Concentrated land ownership.

**Lessons for Exodology**: Exit can be imposed, not chosen. Those forced to exit often fare worse than those who choose it. Power determines who exits and who controls alternatives.`
        },
        {
          title: 'The Industrial Agriculture Transition',
          content: `The 20th century shift to industrial agriculture continues today:

**The Traditional System**: Diverse, integrated farms. Local markets. Family labor. Seed saving. Animal and human power.

**Push Factors**: Economic pressure from cheap industrial food. Policy favoring consolidation. Input costs favoring scale.

**Pull Factors**: Technology promises of easier work. Access to consumer goods. Educational opportunities for children.

**Transition Dynamics**: Rapid in developed countries (1940s-1970s). Ongoing globally. Millions of farmers exit agriculture each decade.

**Outcomes**: Cheap calories but diet-related disease. Environmental degradation. Rural depopulation. Loss of agricultural knowledge.`
        },
        {
          title: 'Contemporary Agricultural Exit',
          content: `Today we see exit from industrial agriculture:

**Push Factors**: Economic unsustainability for small farms. Health concerns. Environmental destruction. Loss of meaning.

**Pull Factors**: Organic and regenerative alternatives. Direct marketing. Food sovereignty movements. Urban agriculture.

**Current Patterns**:
- Farmers exiting industrial to organic/regenerative
- Urban dwellers re-entering food production
- Communities building local food systems
- Indigenous food sovereignty reclaiming traditional practices

**Challenges**:
- Land access and cost
- Knowledge gaps
- Market access
- Policy environment favoring industrial

Agricultural Exodology applies lessons from historical transitions to contemporary food system redesign.`
        }
      ],

      keyTakeaways: [
        'Agricultural transitions show system exit at civilizational scale',
        'Exit can be voluntary or forced, with different outcomes',
        'Push and pull factors operate across millennia of agricultural history',
        'Contemporary food system exit builds on historical patterns'
      ]
    },
    learningObjectives: [
      'Trace agricultural system transitions throughout history',
      'Distinguish voluntary and forced agricultural exit',
      'Identify push and pull factors in agricultural transitions',
      'Apply historical patterns to contemporary food system exit'
    ]
  },

  'f-m4-l3': {
    id: 'f-m4-l3',
    title: 'Energy Transitions: From Wood to Coal to Oil',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Energy transitions—from wood to coal, coal to oil, and now fossil fuels to renewables—represent system exits at societal scale. These transitions reshape economies, politics, and daily life. Understanding past energy transitions informs the current transition we must navigate.`,

      sections: [
        {
          title: 'The Wood-to-Coal Transition',
          content: `Britain's shift from wood to coal (16th-18th centuries) was the first fossil fuel transition:

**The Wood System**: Forests provided fuel for heating, cooking, and industry (iron smelting, glass-making). Timber for construction and ships.

**Push Factors**: Deforestation created wood scarcity. Growing population and industry demanded more energy than forests could provide.

**Pull Factors**: Coal was abundant, energy-dense, and located near industrial centers. New technologies (steam engine) enabled its use.

**Transition Dynamics**: Gradual, spanning centuries. Wood and coal coexisted for generations. Not centrally planned but emergent.

**Outcomes**: Industrial Revolution. Urbanization. Air pollution. Climate change (begun). Global British Empire built on coal-powered navy.

**Key Lesson**: Energy transitions reshape everything—economy, geography, politics, daily life.`
        },
        {
          title: 'The Coal-to-Oil Transition',
          content: `The 20th century shift from coal to oil transformed modernity:

**The Coal System**: Coal powered factories, trains, ships, and home heating. Coal mining employed millions. Coal regions held political power.

**Push Factors**: Coal's limitations—weight, pollution, solid form—constrained transportation and created urban health crises.

**Pull Factors**: Oil's advantages—liquid, energy-dense, versatile—enabled automobiles, aviation, plastics, and modern warfare.

**Transition Dynamics**: Rapid in transportation (1910s-1960s). Electricity generation remained coal-heavy longer. Geographically uneven.

**Outcomes**: Automobile society. Suburban sprawl. Oil-driven geopolitics. Petrochemical revolution. Accelerated climate change.

**Key Lesson**: New energy systems don't just replace old ones—they create entirely new forms of life.`
        },
        {
          title: 'The Current Transition',
          content: `We are now in a fossil fuel-to-renewable transition:

**The Fossil System**: Oil, gas, and coal power nearly everything. Economies, infrastructure, and politics built around fossil extraction and use.

**Push Factors**: Climate change. Air pollution health impacts. Resource depletion. Price volatility. Geopolitical instability.

**Pull Factors**: Renewable costs falling rapidly. Energy independence possible. Health benefits. Climate mitigation. New industries and jobs.

**Transition Challenges**:
- Speed needed (decades, not centuries)
- Incumbent resistance (fossil fuel industry)
- Infrastructure lock-in
- Uneven distribution of costs and benefits
- Scale of transformation required

**Exodology Role**: Designing managed transition from fossil dependence rather than collapse.`
        },
        {
          title: 'Patterns Across Energy Transitions',
          content: `Common patterns emerge across energy transitions:

**Coexistence**: Old and new systems overlap for extended periods. Transitions are not instant switches.

**Path Dependence**: Early choices constrain later options. Infrastructure built for one energy system resists change.

**Political Economy**: Energy transitions create winners and losers. Those losing fight transition.

**Uneven Geography**: Some regions benefit, others decline. Coal regions suffered when coal declined.

**Emergent Effects**: Transitions produce outcomes no one planned. Automobiles created suburbs, not by design but by emergence.

**Acceleration**: Each transition has been faster than the last. The current transition must be fastest yet.

Understanding these patterns helps navigate the transition we're in.`
        }
      ],

      keyTakeaways: [
        'Energy transitions are societal-scale system exits',
        'Each transition has been faster than the previous',
        'Transitions create winners, losers, and unplanned consequences',
        'The current transition requires managed Exodology at unprecedented speed'
      ]
    },
    learningObjectives: [
      'Trace the history of major energy transitions',
      'Identify common patterns across energy transitions',
      'Understand the current transition in historical context',
      'Apply transition lessons to contemporary energy Exodology'
    ]
  },

  'f-m4-l4': {
    id: 'f-m4-l4',
    title: 'Modern Exit Movements',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Contemporary exit movements are emerging across food, energy, governance, and economic systems. These movements—often fragmented and small—represent the leading edge of 21st century Exodology. This lesson surveys the landscape.`,

      sections: [
        {
          title: 'Food System Exit Movements',
          content: `Exit from industrial food is widespread:

**Community Supported Agriculture (CSA)**: Members share risk with farmers, exiting supermarket dependence. Thousands of CSAs operate globally.

**Food Sovereignty Movement**: Communities and nations assert control over food systems. Strongest in Global South and Indigenous communities.

**Urban Agriculture**: City dwellers grow food, reclaiming production capability lost to industrialization.

**Permaculture and Regenerative Agriculture**: Farmers exit chemical-industrial methods for ecosystem-integrated approaches.

**Seed Saving and Heirloom Varieties**: Gardeners and farmers exit corporate seed dependence.

**Foraging Revival**: Growing interest in wild food knowledge exits total food system dependence.

These movements are interconnected, sharing knowledge and practitioners.`
        },
        {
          title: 'Energy System Exit Movements',
          content: `Exit from fossil-fuel dependence takes multiple forms:

**Community Solar and Microgrids**: Neighborhoods and communities building shared renewable infrastructure.

**Energy Cooperatives**: Member-owned utilities replacing investor-owned extractive models.

**Off-Grid Living**: Individuals and communities achieving energy independence.

**Energy Descent**: Voluntary reduction of energy use rather than just changing sources.

**Appropriate Technology**: Emphasis on human-scale, maintainable energy systems rather than complex grids.

**Anti-Pipeline and Divestment Movements**: Blocking new fossil infrastructure while exiting fossil investments.

Energy exit ranges from technical solutions to lifestyle redesign.`
        },
        {
          title: 'Economic System Exit Movements',
          content: `Alternative economic arrangements are proliferating:

**Cooperative Movement**: Worker, consumer, and producer cooperatives offer alternatives to corporate capitalism. Growing in grocery, housing, platforms.

**Local and Complementary Currencies**: Communities creating their own exchange media to keep wealth local.

**Solidarity Economy**: Networks of mutual aid, time banks, gift economy, and non-monetary exchange.

**Degrowth Movement**: Questioning the growth imperative and designing steady-state alternatives.

**Commons-Based Approaches**: Land trusts, open source, and shared resource governance exiting privatization.

**Buy Nothing and Free Economy**: Neighborhood-level sharing that exits consumer capitalism.

Economic exit movements often operate below the radar of mainstream attention.`
        },
        {
          title: 'Governance and Social Exit Movements',
          content: `Exit from conventional governance and social structures:

**Intentional Communities**: Ecovillages, cohousing, and communes creating alternative social arrangements.

**Autonomous Zones**: From Zapatistas to Rojava, communities exiting state governance to build alternatives.

**Platform Cooperativism**: Exiting platform capitalism (Uber, Amazon) for cooperatively-owned alternatives.

**Mutual Aid Networks**: Exiting social service dependence for community self-help.

**Alternative Dispute Resolution**: Exiting state legal systems for community-based justice.

**Homeschooling and Unschooling**: Exiting institutional education for family and community-based learning.

These movements create spaces where different social rules apply.`
        }
      ],

      keyTakeaways: [
        'Exit movements are active across food, energy, economic, and governance systems',
        'Movements range from partial reform to comprehensive alternative-building',
        'Most operate below mainstream attention but involve millions of people',
        'Movements are interconnected through shared practitioners and knowledge'
      ]
    },
    learningObjectives: [
      'Survey contemporary exit movements across domains',
      'Recognize the diversity of exit strategies in practice',
      'Identify connections between different exit movements',
      'Locate specific movements for further research'
    ]
  },

  'f-m4-l5': {
    id: 'f-m4-l5',
    title: 'Timeline Challenge: Historical Exits',
    duration: '12 min',
    type: 'game' as const,
    content: {
      introduction: 'Test your knowledge of historical system exits by placing events in chronological order and identifying patterns across time.',
      gameType: 'timeline-ordering',
      events: [
        { event: 'Beginning of Neolithic transition to agriculture', date: '~10,000 BCE', category: 'Agricultural' },
        { event: 'English Enclosure Movement begins', date: '~1450 CE', category: 'Agricultural' },
        { event: 'British wood-to-coal transition underway', date: '~1600 CE', category: 'Energy' },
        { event: 'Industrial Revolution transforms agriculture', date: '~1750 CE', category: 'Agricultural' },
        { event: 'Great Migration begins', date: '1916', category: 'Social' },
        { event: 'Oil begins displacing coal in transportation', date: '~1920', category: 'Energy' },
        { event: 'Green Revolution transforms global agriculture', date: '~1960', category: 'Agricultural' },
        { event: 'Back-to-the-land movement peaks', date: '~1970', category: 'Social' },
        { event: 'First community solar projects', date: '~1990', category: 'Energy' },
        { event: 'Local food movement goes mainstream', date: '~2005', category: 'Agricultural' }
      ],
      completionRequirement: 'Correctly order at least 8 of 10 events to complete this lesson'
    }
  },

  // MODULE 5: Food System Failures
  'f-m5-l1': {
    id: 'f-m5-l1',
    title: 'Industrial Agriculture Dependencies',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Industrial agriculture appears to be a marvel of efficiency, producing abundant food at low cost. But this efficiency is built on deep dependencies that create systemic vulnerability.`,
      sections: [
        {
          title: 'The Fossil Fuel Dependency',
          content: `Modern agriculture runs on oil: Nitrogen fertilizer is synthesized from natural gas. Pesticides are petroleum-derived. Machinery burns diesel. Food travels 1,500 miles on average. When oil becomes scarce or expensive, the entire system is stressed.`
        },
        {
          title: 'The Seed and Genetic Dependency',
          content: `Hybrid seeds don't breed true—farmers must buy new seed annually. GMO patents prohibit seed saving. Genetic diversity has collapsed as industrial varieties focus on yield over resilience. A handful of corporations control most commercial seed.`
        },
        {
          title: 'The Water and Soil Dependency',
          content: `Aquifer depletion, soil degradation, erosion, and salinization are mining the resource base. Industrial agriculture is consuming the foundations it depends on. This creates a slow-motion exit crisis.`
        },
        {
          title: 'The Supply Chain Dependency',
          content: `Just-in-time delivery means grocery stores hold days of inventory, not weeks. Global sourcing means problems anywhere affect everywhere. Concentration means disruption at one facility affects millions.`
        }
      ],
      keyTakeaways: [
        'Industrial agriculture depends on fossil fuels at every stage',
        'Seed and genetic dependencies create corporate control and fragility',
        'Industrial methods deplete soil and water—their own resource base',
        'Long, concentrated supply chains create systemic vulnerability'
      ]
    },
    learningObjectives: ['Identify key dependencies in industrial agriculture', 'Analyze supply chain vulnerabilities', 'Understand how industrial methods undermine their foundations']
  },

  'f-m5-l2': {
    id: 'f-m5-l2',
    title: 'Food System Failure Modes',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Understanding how food systems fail helps us anticipate crises and design resilient alternatives.`,
      sections: [
        { title: 'Supply Disruption Failures', content: `Energy shocks, input unavailability, weather events, transportation collapse, and labor gaps reveal brittleness beneath apparent abundance.` },
        { title: 'Economic Failure Modes', content: `Price volatility, farm debt crisis, consolidation death spiral, market access collapse, and subsidy dependency often precede physical failure.` },
        { title: 'Ecological Failure Modes', content: `Soil exhaustion, water depletion, pollinator collapse, pest explosions, and climate mismatch operate on longer timescales but are more fundamental.` },
        { title: 'Cascade Failures', content: `Food-energy nexus, financial-physical nexus, ecological-economic nexus, and regional cascades are most dangerous because intervention points are unclear.` }
      ],
      keyTakeaways: ['Supply disruptions reveal hidden dependencies', 'Economic failures often precede physical failures', 'Ecological failures are slow but fundamental', 'Cascade failures are most dangerous']
    },
    learningObjectives: ['Identify primary food system failure modes', 'Distinguish between supply, economic, and ecological failures', 'Understand cascade failure dynamics']
  },

  'f-m5-l3': {
    id: 'f-m5-l3',
    title: 'Food Sovereignty Movements',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Food sovereignty—the right of peoples to define their own food systems—represents a comprehensive alternative to industrial food.`,
      sections: [
        { title: 'What is Food Sovereignty?', content: `Food sovereignty goes beyond food security (having enough food) to controlling how food is produced, distributed, and consumed. It emerged from La Vía Campesina in 1996 and includes rights to define policy, prioritize local production, and control land, water, and seeds.` },
        { title: 'Global Movements', content: `La Vía Campesina represents 200+ million farmers. MST in Brazil, National Family Farm Coalition in US, GRAIN, and Indigenous food sovereignty movements combine political advocacy with practical alternative-building.` },
        { title: 'Food Sovereignty in Practice', content: `Seed sovereignty through community seed banks, land access through trusts and reform, direct marketing through CSAs and farmers markets, agroecology, food policy councils, and cooperative processing.` },
        { title: 'Challenges', content: `Scale questions about feeding cities, affordability, knowledge gaps after industrial agriculture destroyed traditional knowledge, land access barriers, and policy environments favoring industrial production.` }
      ],
      keyTakeaways: ['Food sovereignty is control over food systems, not just access to food', 'Global movements connect local struggles', 'Practical sovereignty includes seeds, land, markets, and governance']
    },
    learningObjectives: ['Distinguish food sovereignty from food security', 'Identify key movements and organizations', 'Recognize practices in action']
  },

  'f-m5-l4': {
    id: 'f-m5-l4',
    title: 'Interactive: Food System Mapping',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Map your own food dependencies and identify potential exit points.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'List what you ate yesterday', prompt: 'Write down every food item consumed in the last 24 hours' },
        { instruction: 'Trace items backward', prompt: 'For 3 items, trace: Where did you get it? Where did the store get it? Where was it produced?' },
        { instruction: 'Identify dependencies', prompt: 'What systems does your food depend on? What would break first in a disruption?' },
        { instruction: 'Rate your food autonomy', prompt: 'On a scale of 1-5, how able are you to meet food needs if supply chains failed for 2 weeks?' },
        { instruction: 'Identify one exit opportunity', prompt: 'What is one realistic step to increase your food autonomy?' }
      ],
      completionRequirement: 'Complete all steps to finish this lesson'
    }
  },

  // MODULE 6: Water System Failures
  'f-m6-l1': {
    id: 'f-m6-l1',
    title: 'Water System Dependencies',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Modern water systems seem invisible—turn the tap, water flows. But this invisibility masks deep dependencies and vulnerabilities.`,
      sections: [
        { title: 'Centralized Water Infrastructure', content: `Source dependency on limited rivers or aquifers, treatment requiring power and chemicals, distribution through aging pipes, pressure requiring pumps, and centralized control by utilities and governments.` },
        { title: 'Energy-Water Nexus', content: `Pumping and treating water uses 2-3% of US electricity. Power plants need water for cooling. Climate change stresses both systems simultaneously.` },
        { title: 'Supply Dependencies', content: `Treatment requires chemicals, replacement parts, trained expertise, testing capacity, and continuous funding.` },
        { title: 'Climate Dependencies', content: `Systems were designed for historical precipitation. Climate change is shifting patterns. Snowpack is declining. Aquifers recharge slowly.` }
      ],
      keyTakeaways: ['Centralized infrastructure creates efficiency and vulnerability', 'Water and energy are deeply interdependent', 'Climate change threatens water systems']
    },
    learningObjectives: ['Identify key dependencies in centralized water systems', 'Understand the energy-water nexus', 'Connect climate change to water system stress']
  },

  'f-m6-l2': {
    id: 'f-m6-l2',
    title: 'When Water Systems Fail',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Water system failures have become increasingly visible—from Flint to Jackson to Cape Town.`,
      sections: [
        { title: 'Flint, Michigan', content: `In 2014, Flint switched water sources to save money. The new source corroded lead pipes, contaminating water. Infrastructure failure combined with governance failure and environmental racism. Years later, residents still don't trust tap water.` },
        { title: 'Cape Town, South Africa', content: `Multi-year drought depleted reservoirs. "Day Zero" announced—the day taps would be turned off. Aggressive conservation reduced consumption 50%. Wealthy residents installed private storage while the poor faced cutoffs.` },
        { title: 'Jackson, Mississippi', content: `Flooding disabled the treatment plant, leaving 150,000 without water. Decades of underinvestment, population loss reducing tax base, and climate events created compounding failure.` },
        { title: 'Patterns', content: `Infrastructure age, governance failures, environmental justice issues, climate stress as threat multiplier, slow-motion crises before acute events, and loss of trust once broken.` }
      ],
      keyTakeaways: ['Water failures combine infrastructure, governance, and environmental factors', 'Environmental justice shapes who experiences water crises', 'Climate change acts as threat multiplier']
    },
    learningObjectives: ['Analyze Flint, Cape Town, and Jackson as case studies', 'Identify common patterns', 'Recognize warning signs']
  },

  'f-m6-l3': {
    id: 'f-m6-l3',
    title: 'Water Commons and Exit Alternatives',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Water alternatives exist between complete grid-dependence and complete self-sufficiency. Water commons offer both resilience and justice.`,
      sections: [
        { title: 'Household-Scale', content: `Rainwater harvesting, greywater systems, cisterns and storage, point-of-use treatment, and demand reduction through low-flow fixtures and efficient landscaping.` },
        { title: 'Community-Scale', content: `Community wells, spring development, cooperative water systems, community cisterns, constructed wetlands for treatment, and water user associations for governance.` },
        { title: 'Water as Commons', content: `Resources managed collectively by communities rather than states or markets. Historical water commons and modern cooperatives continue traditions. Community governance, user-developed rules, need-based access, and sustainability as core value.` },
        { title: 'Transition Strategies', content: `Start with resilience through emergency storage. Layer systems combining municipal with rainwater and greywater. Build community to spread costs. Advocate for water as a right. Learn skills now.` }
      ],
      keyTakeaways: ['Household measures provide resilience but have limits', 'Community scale achieves what individuals cannot', 'Water commons offer alternative to public and private models']
    },
    learningObjectives: ['Identify household and community water options', 'Apply commons framework', 'Plan transition strategies']
  },

  'f-m6-l4': {
    id: 'f-m6-l4',
    title: 'Matching Game: Water Failure Modes',
    duration: '10 min',
    type: 'game' as const,
    content: {
      introduction: 'Match water failure events to their underlying causes.',
      gameType: 'matching',
      pairs: [
        { scenario: 'Lead contamination after source switch', cause: 'Infrastructure age + governance failure' },
        { scenario: 'Near-complete reservoir depletion', cause: 'Climate drought + demand growth' },
        { scenario: 'Treatment plant disabled by flooding', cause: 'Infrastructure fragility + climate events' },
        { scenario: 'Aquifer requiring deeper wells', cause: 'Overpumping + slow recharge' }
      ],
      completionRequirement: 'Match all scenarios correctly'
    }
  },

  // MODULE 7: Energy System Failures
  'f-m7-l1': {
    id: 'f-m7-l1',
    title: 'Grid Dependencies and Vulnerabilities',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `The electrical grid is perhaps the most critical infrastructure of modern life. Nearly everything depends on it.`,
      sections: [
        { title: 'What Depends on the Grid', content: `Water systems, food refrigeration, communication, transportation (gas pumps need electricity), healthcare, finance, and heating/cooling. Modern life is electrified life.` },
        { title: 'Grid Vulnerabilities', content: `Generation concentration, transmission bottlenecks, aging infrastructure, cybersecurity risks, physical attack vulnerability, weather exposure, and fuel dependence.` },
        { title: 'Failure Examples', content: `Texas 2021: Cold caused gas failures, hundreds died. California rolling blackouts from heat and wildfire. Puerto Rico 2017: Hurricane destroyed grid, restoration took over a year. Northeast 2003: Software bug cascaded to 55 million affected.` },
        { title: 'Cascade Dynamics', content: `Initial failure causes load redistribution, which causes overload, which causes more failures, leading to blackout. Recovery is complex—"black start" capability is limited.` }
      ],
      keyTakeaways: ['Nearly every system depends on the grid', 'Multiple vulnerability points exist', 'Cascade dynamics mean small failures become large']
    },
    learningObjectives: ['Identify grid-dependent systems', 'Analyze vulnerability points', 'Understand cascade failure dynamics']
  },

  'f-m7-l2': {
    id: 'f-m7-l2',
    title: 'Energy System Failure Patterns',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Energy systems fail in predictable patterns that Exodology can help us anticipate and address.`,
      sections: [
        { title: 'Generation Failures', content: `Fuel supply disruption, equipment failure, weather impacts, and demand exceeding capacity. Concentration makes single failures catastrophic.` },
        { title: 'Transmission Failures', content: `Line damage from weather, equipment age, overload from demand spikes, and physical or cyber attacks on substations.` },
        { title: 'Distribution Failures', content: `Local equipment failure, tree contact, vehicle collisions with poles, and underground cable deterioration.` },
        { title: 'Systemic Failures', content: `Market failures where price signals fail to ensure reliability. Regulatory failures where oversight is inadequate. Investment failures where maintenance is deferred.` }
      ],
      keyTakeaways: ['Failures occur at generation, transmission, and distribution', 'Systemic issues enable physical failures', 'Understanding patterns aids anticipation']
    },
    learningObjectives: ['Identify failure patterns at each grid level', 'Understand systemic factors enabling failures']
  },

  'f-m7-l3': {
    id: 'f-m7-l3',
    title: 'Microgrids and Energy Independence',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Decentralized energy alternatives offer exit from grid dependence. Microgrids represent a middle path between complete grid dependence and full off-grid living.`,
      sections: [
        { title: 'What is a Microgrid?', content: `A local energy system that can operate independently or connected to the main grid. Includes generation (solar, wind, batteries), storage, distribution, and controls.` },
        { title: 'Microgrid Benefits', content: `Resilience through islanding during outages. Local control over energy. Integration of renewables. Reduced transmission losses. Community economic benefits.` },
        { title: 'Implementation Approaches', content: `Campus microgrids (universities, hospitals), community microgrids (neighborhoods, villages), commercial/industrial microgrids, and emergency/military microgrids.` },
        { title: 'Challenges', content: `High upfront costs, technical complexity, regulatory barriers, utility resistance, and intermittency management.` }
      ],
      keyTakeaways: ['Microgrids offer middle path between grid dependence and off-grid', 'Multiple implementation approaches exist', 'Challenges include cost, complexity, and regulation']
    },
    learningObjectives: ['Understand microgrid architecture', 'Identify implementation approaches', 'Recognize challenges and barriers']
  },

  'f-m7-l4': {
    id: 'f-m7-l4',
    title: 'Scenario Builder: Energy Exit Planning',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Design an energy exit strategy for a hypothetical community.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Assess current energy use', prompt: 'List major energy uses in a community: heating, cooling, lighting, cooking, transportation, industrial' },
        { instruction: 'Identify critical loads', prompt: 'Which uses are critical (must continue in outage)? Which are deferrable?' },
        { instruction: 'Evaluate local resources', prompt: 'What renewable resources are available? Solar, wind, hydro, biomass potential?' },
        { instruction: 'Design hybrid system', prompt: 'How would you combine grid connection with local generation and storage?' },
        { instruction: 'Plan transition path', prompt: 'What sequence of investments moves from current state to energy autonomy?' }
      ],
      completionRequirement: 'Complete all design steps'
    }
  },

  // MODULE 8: Ethics of Exit
  'f-m8-l1': {
    id: 'f-m8-l1',
    title: 'The Moral Landscape of Exit',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exit is not morally neutral. Choosing to leave a system raises ethical questions about responsibility, solidarity, and justice.`,
      sections: [
        { title: 'Staying vs Leaving', content: `Arguments for staying: responsibility to improve from within, solidarity with those who cannot leave. Arguments for leaving: participation legitimizes harmful systems, resources could build alternatives, some systems cannot be reformed. Neither is automatically ethical.` },
        { title: 'The Lifeboat Problem', content: `The critique: exit movements often serve the privileged. Valid when exit requires resources most lack, exiters extract value, alternatives exclude the vulnerable. Less valid when exiters create replicable models and maintain solidarity.` },
        { title: 'Responsibility to Those Who Stay', content: `Residual duty: obligations that persist after leaving. Forms include sharing knowledge, creating on-ramps for others, avoiding actions that harm those remaining, and advocacy for better conditions.` },
        { title: 'When Exit is Obligatory', content: `Sometimes exit is required: when staying makes you complicit in serious harm, when participation enables continued harm, when self-preservation demands it, when exit models possibilities for others.` }
      ],
      keyTakeaways: ['Both staying and leaving have ethical dimensions', 'Lifeboat critique is valid when exit serves only privileged', 'Residual duty persists after exit']
    },
    learningObjectives: ['Analyze ethical arguments for staying vs leaving', 'Confront the lifeboat problem', 'Understand residual duty'],
    keyTerms: [
      { term: 'Exit Ethics', definition: 'The moral principles governing responsible system departure.' },
      { term: 'Residual Duty', definition: 'Ongoing obligations to those who remain in systems we have left.' }
    ]
  },

  'f-m8-l2': {
    id: 'f-m8-l2',
    title: 'Responsibilities to Those Who Stay',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exiting a system doesn't end all obligations. This lesson examines what we owe to those who remain.`,
      sections: [
        { title: 'Forms of Residual Duty', content: `Knowledge sharing about how to exit. Creating on-ramps for others to follow. Avoiding extraction that harms those remaining. Advocacy for improved conditions. Resource sharing across the exit divide.` },
        { title: 'Limits of Residual Duty', content: `You cannot save everyone. Your own wellbeing has value. Those remaining by choice bear less claim. Infinite obligation is paralyzing. Judgment is required, not just rules.` },
        { title: 'Practical Applications', content: `Document and share your exit process. Mentor those beginning exit. Maintain solidarity even after distance. Avoid actions that accelerate system decline for those still inside.` },
        { title: 'When Duty Conflicts', content: `Sometimes duties conflict—self-preservation vs solidarity, helping many weakly vs few strongly. Ethical Exodology requires navigating these tensions thoughtfully.` }
      ],
      keyTakeaways: ['Residual duty takes multiple forms', 'Limits exist—you cannot save everyone', 'Practical applications make duty concrete']
    },
    learningObjectives: ['Identify forms of residual duty', 'Recognize limits of obligation', 'Apply duty in practical contexts']
  },

  'f-m8-l3': {
    id: 'f-m8-l3',
    title: 'When Exit is Harmful',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Not all exits are ethical. Some exits cause more harm than good. Learning to recognize harmful exit patterns is essential.`,
      sections: [
        { title: 'Exit as Extraction', content: `Taking resources, talent, or capital on the way out. Brain drain leaving communities without skilled workers. Capital flight leaving economies without investment. Knowledge hoarding rather than sharing.` },
        { title: 'Exit as Abandonment', content: `Leaving when staying could have made a difference. Exiting in ways that accelerate collapse for those remaining. Breaking commitments without transition planning.` },
        { title: 'Exit as Escapism', content: `Seeking personal comfort while ignoring structural problems. Building isolated utopias rather than addressing root causes. Using exit to avoid difficult work of reform when reform is possible.` },
        { title: 'Tests for Harmful Exit', content: `Does this exit extract value from those remaining? Does it accelerate harm to the vulnerable? Does it replicate exclusions it claims to escape? Is it motivated by avoidance rather than building?` }
      ],
      keyTakeaways: ['Exit can be extractive, abandonment, or escapism', 'Tests help identify harmful patterns', 'Honest self-assessment is required']
    },
    learningObjectives: ['Recognize patterns of harmful exit', 'Apply tests to evaluate exit ethics', 'Avoid common ethical pitfalls']
  },

  'f-m8-l4': {
    id: 'f-m8-l4',
    title: 'Ethical Dilemma Scenarios',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Navigate complex ethical scenarios involving system exit.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'The Skilled Professional',
          description: 'You are a doctor in a rural community with few healthcare providers. You want to leave for a sustainable community elsewhere. The nearest replacement is 100 miles away.',
          options: [
            { choice: 'Leave immediately—your life is your own', analysis: 'Autonomy is valid, but abandonment harms those depending on you.', score: 2 },
            { choice: 'Stay forever—your community needs you', analysis: 'Self-sacrifice may be noble but isn\'t required and may lead to burnout.', score: 2 },
            { choice: 'Plan transition: train replacements, then leave', analysis: 'Balances autonomy with residual duty.', score: 5 }
          ]
        },
        {
          title: 'The Company Exit',
          description: 'You work for a company with harmful environmental practices. You have skills they rely on. Leaving would be easy for you but might not change anything.',
          options: [
            { choice: 'Leave and work for a sustainable company', analysis: 'Personal integrity matters. Your skills serve better causes.', score: 4 },
            { choice: 'Stay and push for internal reform', analysis: 'Valid if reform is possible, but may be captured by hopelessness.', score: 3 },
            { choice: 'Leave loudly, documenting problems publicly', analysis: 'Combines exit with advocacy, but may have personal costs.', score: 4 }
          ]
        }
      ],
      completionRequirement: 'Complete analysis of all scenarios'
    }
  },

  'f-m8-l5': {
    id: 'f-m8-l5',
    title: 'Reflection: Your Exit Ethics',
    duration: '12 min',
    type: 'reflection' as const,
    content: {
      introduction: 'Develop your personal ethical framework for exit decisions.',
      prompts: [
        { question: 'What do you believe you owe to systems you\'ve benefited from?', guidance: 'Consider education, healthcare, infrastructure, community' },
        { question: 'What limits would you place on your residual duty to those who remain?', guidance: 'At what point does your own wellbeing take priority?' },
        { question: 'How would you determine if an exit is escapism vs legitimate transition?', guidance: 'What tests would you apply to your own motivations?' },
        { question: 'What would make an exit destination worthy of your participation?', guidance: 'What values and practices would it need to embody?' }
      ],
      closingNote: 'Your answers form the beginning of a personal exit ethics. These may evolve as you learn and experience more.'
    }
  },

  // MODULE 9: Barriers to Exit
  'f-m9-l1': {
    id: 'f-m9-l1',
    title: 'Psychological Lock-in',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Even when exit is possible and desirable, psychological factors keep people in failing systems. Understanding these barriers is essential for designing effective exits.`,
      sections: [
        { title: 'Cognitive Biases', content: `Status quo bias: preference for current state. Sunk cost fallacy: continuing because of past investment. Loss aversion: losses loom larger than equivalent gains. Normalcy bias: assuming current conditions will continue.` },
        { title: 'Identity Lock-in', content: `When identity is tied to a system (I am a coal miner, I am a corporate employee), exit threatens identity. Exit requires becoming someone new, which is psychologically challenging.` },
        { title: 'Fear and Uncertainty', content: `Fear of the unknown exceeds fear of known problems. Uncertainty about alternatives creates paralysis. Risk aversion prevents action even when current path is riskier.` },
        { title: 'Learned Helplessness', content: `Repeated inability to affect change creates belief that change is impossible. People stop trying even when opportunities exist. Systems can create helplessness intentionally.` }
      ],
      keyTakeaways: ['Cognitive biases favor staying in current systems', 'Identity attachment creates psychological exit costs', 'Fear and uncertainty create paralysis', 'Learned helplessness must be overcome']
    },
    learningObjectives: ['Identify cognitive biases affecting exit', 'Understand identity lock-in', 'Recognize learned helplessness patterns']
  },

  'f-m9-l2': {
    id: 'f-m9-l2',
    title: 'Social and Cultural Barriers',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Beyond individual psychology, social and cultural factors create exit barriers. We are embedded in webs of relationship and meaning that constrain movement.`,
      sections: [
        { title: 'Social Ties', content: `Family, friends, and community create attachment to place and system. Exit often means leaving relationships. The more embedded, the higher the exit cost.` },
        { title: 'Cultural Norms', content: `Cultures define acceptable life paths. Exit may violate norms about success, responsibility, or belonging. Social sanctions follow norm violations.` },
        { title: 'Stigma', content: `Exiters may face stigma—seen as dropouts, failures, or abandoners. Stigma creates social cost that must be weighed against exit benefits.` },
        { title: 'Information Control', content: `Systems control information about alternatives. Exit options may be unknown, understated, or actively discredited. Information asymmetry favors staying.` }
      ],
      keyTakeaways: ['Social ties create attachment and exit costs', 'Cultural norms define acceptable paths', 'Stigma creates additional exit costs', 'Information control shapes perceived options']
    },
    learningObjectives: ['Analyze social barriers to exit', 'Understand cultural constraints', 'Recognize information asymmetries']
  },

  'f-m9-l3': {
    id: 'f-m9-l3',
    title: 'Economic Lock-in Mechanisms',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Economic structures often create intentional exit barriers. Understanding these mechanisms reveals how systems maintain participation despite dysfunction.`,
      sections: [
        { title: 'Debt and Obligation', content: `Student loans, mortgages, and consumer debt create obligations that require system participation to service. Debt is a lock-in mechanism.` },
        { title: 'Benefits Tied to Participation', content: `Health insurance tied to employment. Pensions requiring years of service. Social security requiring wage history. Benefits become chains.` },
        { title: 'Credential Requirements', content: `Professional credentials valid only within systems. Licenses that don't transfer. Skills that aren't valued in alternative contexts.` },
        { title: 'Exit Costs', content: `Penalties for early withdrawal from contracts. Relocation costs. Transition periods without income. Exit is made expensive.` }
      ],
      keyTakeaways: ['Debt creates forced system participation', 'Benefits tied to participation become chains', 'Credentials may not transfer', 'Exit costs are often intentionally created']
    },
    learningObjectives: ['Identify economic lock-in mechanisms', 'Understand how benefits become barriers', 'Recognize intentional exit cost creation']
  },

  'f-m9-l4': {
    id: 'f-m9-l4',
    title: 'Barrier Assessment Tool',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Assess your own barriers to exit across different systems.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Choose a system you might want to exit', prompt: 'Select: employment, housing, food system, energy system, or other' },
        { instruction: 'Assess psychological barriers', prompt: 'Rate 1-5: Status quo bias, identity attachment, fear of unknown, learned helplessness' },
        { instruction: 'Assess social barriers', prompt: 'Rate 1-5: Relationship ties, cultural norm pressure, potential stigma, information gaps' },
        { instruction: 'Assess economic barriers', prompt: 'Rate 1-5: Debt obligations, benefit dependencies, credential limits, exit costs' },
        { instruction: 'Identify the biggest barrier', prompt: 'Which single barrier is most significant? What would it take to address it?' }
      ],
      completionRequirement: 'Complete full assessment'
    }
  },

  // MODULE 10: When Not to Exit
  'f-m10-l1': {
    id: 'f-m10-l1',
    title: 'Premature Exit',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Not all exits are wise. Sometimes exit is premature—reform is still possible, alternatives aren't ready, or conditions don't warrant departure.`,
      sections: [
        { title: 'Signs Reform is Still Viable', content: `Genuine decision-making power is available. Resources exist for change. Leadership is open to reform. Structural barriers haven't calcified. Time exists to implement change.` },
        { title: 'Alternatives Not Ready', content: `Exit destination doesn't yet exist or function. Transition path is unclear. Resources for transition are insufficient. Knowledge gaps remain unfilled.` },
        { title: 'Costs Exceed Benefits', content: `What's lost in exit exceeds what's gained. Relationships, resources, or position can't be replaced. The exit destination isn't actually better.` },
        { title: 'Timing Matters', content: `The same exit can be premature now but appropriate later. Windows open and close. Patience is sometimes strategic.` }
      ],
      keyTakeaways: ['Reform viability should be honestly assessed', 'Exit requires ready alternatives', 'Costs and benefits must be weighed', 'Timing matters strategically']
    },
    learningObjectives: ['Recognize when reform remains viable', 'Assess alternative readiness', 'Calculate exit cost-benefit']
  },

  'f-m10-l2': {
    id: 'f-m10-l2',
    title: 'Harmful Exit Patterns',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Some exit patterns cause more harm than good. Recognizing these patterns helps avoid them.`,
      sections: [
        { title: 'Reactive Flight', content: `Exiting in panic rather than planning. Leaving without destination. Trading known problems for unknown worse ones.` },
        { title: 'Extraction Exit', content: `Taking resources that would help those remaining. Brain drain, capital flight, knowledge hoarding. Weakening the system for those left behind.` },
        { title: 'Escapist Exit', content: `Seeking personal comfort while ignoring that others can't follow. Building isolated solutions rather than scalable alternatives.` },
        { title: 'Destabilizing Exit', content: `Exiting in ways that cause the system to collapse on those remaining. Pulling out key supports without transition.` }
      ],
      keyTakeaways: ['Reactive flight leads to worse situations', 'Extraction harms those remaining', 'Escapism doesn\'t address root causes', 'Destabilization harms the vulnerable']
    },
    learningObjectives: ['Identify harmful exit patterns', 'Avoid reactive and extractive exits', 'Plan exits that don\'t destabilize']
  },

  'f-m10-l3': {
    id: 'f-m10-l3',
    title: 'The Stay-and-Fight Option',
    duration: '15 min',
    type: 'instruction' as const,
    content: {
      introduction: `Sometimes staying to fight for change is the right choice. This doesn't mean staying forever, but recognizing when presence has value.`,
      sections: [
        { title: 'When Staying Matters', content: `When you have power to affect change. When your presence protects others. When exit would validate abandonment. When reform is genuinely possible.` },
        { title: 'Strategic Staying', content: `Stay with intention, not inertia. Set conditions for exit. Build power while inside. Create exit options even while staying.` },
        { title: 'Protecting Those Who Can\'t Leave', content: `Sometimes those with exit capability should stay to advocate for those without. Solidarity means sharing conditions, not just sympathy.` },
        { title: 'Knowing When to Stop', content: `Strategic staying isn't forever. Set benchmarks. Recognize when reform has failed. Exit before burnout makes exit impossible.` }
      ],
      keyTakeaways: ['Staying can be strategic, not just inertia', 'Build exit options while staying', 'Protect those who can\'t leave', 'Know when to stop staying']
    },
    learningObjectives: ['Evaluate when staying is strategic', 'Plan strategic staying', 'Recognize when to shift from staying to exiting']
  },

  'f-m10-l4': {
    id: 'f-m10-l4',
    title: 'Decision Framework: Exit or Stay?',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Apply a structured decision framework to complex scenarios.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'The Reformable Institution',
          description: 'You work at a university with problematic investment policies. Student and faculty pressure has achieved some changes. More campaigns are planned. You\'re considering leaving for an already-sustainable institution.',
          options: [
            { choice: 'Leave for the sustainable institution', analysis: 'Your talents serve better there, but removes a voice for change.', score: 3 },
            { choice: 'Stay and continue reform campaigns', analysis: 'Reform seems possible here—your presence may matter.', score: 4 },
            { choice: 'Set a timeline: stay 2 more years, then reassess', analysis: 'Strategic patience with exit option preserved.', score: 5 }
          ]
        }
      ],
      completionRequirement: 'Complete the decision analysis'
    }
  },

  // MODULE 11: Foundations Synthesis
  'f-m11-l1': {
    id: 'f-m11-l1',
    title: 'Concept Integration Review',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `This lesson integrates all concepts from the Foundations path, showing how they connect into a coherent framework for Exodological Literacy.`,
      sections: [
        { title: 'The Core Framework', content: `Exodology studies ethical exit from failing systems. The Trinity of Literacy, Application, and Stewardship guides practice. Exit exists on a spectrum from optimization through reform to exit to collapse.` },
        { title: 'Understanding Why People Leave', content: `Push factors drive people out; pull factors attract them to alternatives. Exit occurs when push + pull > inertia + barriers. Economic, social, environmental, and existential factors all matter.` },
        { title: 'System Analysis', content: `Food, water, and energy systems have deep dependencies that create vulnerability. Understanding failure modes helps anticipate crises. Alternatives exist across these domains.` },
        { title: 'Ethical Navigation', content: `Exit has ethical dimensions: responsibilities to those who stay, avoiding harmful patterns, knowing when not to exit. Barriers—psychological, social, economic—must be understood and addressed.` }
      ],
      keyTakeaways: ['Exodology provides a coherent framework for understanding exit', 'Multiple factors determine when and how to exit', 'System analysis reveals vulnerabilities and alternatives', 'Ethics guides responsible exit practice']
    },
    learningObjectives: ['Integrate all Foundations concepts', 'See connections across modules', 'Prepare for Applied Exodology']
  },

  'f-m11-l2': {
    id: 'f-m11-l2',
    title: 'Comprehensive Flashcard Challenge',
    duration: '15 min',
    type: 'game' as const,
    content: {
      introduction: 'Master all key terms from the Foundations path.',
      gameType: 'flashcards',
      cards: [
        { front: 'Exodology', back: 'The study and practice of designing ethical exits from systems that no longer serve people or planet.' },
        { front: 'Exit Capability', back: 'The structural capacity to leave a system when needed.' },
        { front: 'Push Factors', back: 'Conditions within a system that drive people to seek exit.' },
        { front: 'Pull Factors', back: 'Attractions of alternatives that draw people away.' },
        { front: 'Exit Threshold', back: 'When push + pull exceeds inertia + barriers.' },
        { front: 'System Collapse', back: 'Unplanned, chaotic disintegration of a system.' },
        { front: 'Residual Duty', back: 'Obligations to those who remain after you exit.' },
        { front: 'Food Sovereignty', back: 'Community control over food systems, not just access to food.' },
        { front: 'Water Commons', back: 'Community-controlled water resources managed collectively.' },
        { front: 'Microgrid', back: 'Local energy system that can operate independently.' },
        { front: 'Psychological Lock-in', back: 'Cognitive biases and fears that prevent exit.' },
        { front: 'The Exodology Trinity', back: 'Literacy, Application, and Stewardship—the three pillars.' }
      ],
      completionRequirement: 'Score 90% or higher'
    }
  },

  'f-m11-l3': {
    id: 'f-m11-l3',
    title: 'Final Case Study Analysis',
    duration: '30 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Apply all frameworks to a comprehensive real-world case.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Read the case', prompt: 'A coastal community faces rising seas, declining fisheries, and an aging population. Young people are leaving. Infrastructure is deteriorating. Tourism—the main economy—is declining as climate impacts increase.' },
        { instruction: 'Analyze push and pull factors', prompt: 'What\'s pushing people to consider exit? What might pull them to alternatives?' },
        { instruction: 'Map dependencies', prompt: 'What systems does this community depend on? What are the vulnerabilities?' },
        { instruction: 'Evaluate response options', prompt: 'Is reform possible? What would exit look like? What would prevent collapse?' },
        { instruction: 'Apply ethical frameworks', prompt: 'Who is most vulnerable? What residual duties exist? What would be harmful exit?' },
        { instruction: 'Recommend a path forward', prompt: 'What would you advise this community? Why?' }
      ],
      completionRequirement: 'Complete comprehensive analysis'
    }
  },

  'f-m11-l4': {
    id: 'f-m11-l4',
    title: 'Reflection: Your Exodology Journey',
    duration: '15 min',
    type: 'reflection' as const,
    content: {
      introduction: 'Reflect on your learning and prepare for Applied Exodology.',
      prompts: [
        { question: 'What concept from Foundations most changed your thinking?', guidance: 'Consider what surprised you or shifted your perspective.' },
        { question: 'Which system in your own life most warrants exit analysis?', guidance: 'Food, energy, water, economic, social...' },
        { question: 'What barriers to exit do you most need to address?', guidance: 'Psychological, social, economic...' },
        { question: 'What practical skills do you most want to develop in Applied Exodology?', guidance: 'Dependency mapping, system design, community advising...' }
      ],
      closingNote: 'You have completed Exodological Literacy. You now understand why systems fail, when exit is appropriate, and the ethical dimensions of departure. In Applied Exodology, you will learn to build the alternatives.'
    }
  }
}

// ============================================================================
// APPLIED EXODOLOGY - COMPLETE LESSON CONTENT
// ============================================================================

export const appliedLessons = {
  'a-m1-l1': {
    id: 'a-m1-l1',
    title: 'Dependency Mapping Fundamentals',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `Before you can exit a system, you must understand how you depend on it. Dependency mapping is the foundational skill of Applied Exodology—the ability to visualize, analyze, and prioritize the connections that bind you to systems. This lesson teaches the core methodology.`,

      sections: [
        {
          title: 'What Is Dependency Mapping?',
          content: `A dependency map is a visual representation of how a system relies on external inputs, services, and resources. For exit planning, it reveals:

**What you need**: The actual goods and services the system provides
**Where they come from**: The supply chains and sources that deliver them
**What would break**: The vulnerabilities if any link fails
**Where to intervene**: The leverage points where alternatives could be built

Unlike organizational charts or process flows, dependency maps focus specifically on what would need to be replaced or provided independently for exit to succeed.`
        },
        {
          title: 'The Mapping Process',
          content: `Follow these steps to create a dependency map:

**Step 1: Identify the Core Function**
What does this system provide that you need? Be specific. "Food" is too broad; "daily calories, protein, and micronutrients" is more useful.

**Step 2: Trace Upstream**
For each core function, trace backward: Where does it come from? What enables that source? Keep going until you reach resources you control or fundamental inputs (sunlight, water, labor).

**Step 3: Mark Critical Nodes**
Identify points where failure would cascade. A "critical node" is any point where:
- No alternative path exists
- Failure affects multiple downstream functions
- Recovery time is long relative to need

**Step 4: Assess Exit Friction**
For each dependency, estimate how difficult it would be to replace or provide independently. Consider cost, knowledge, time, and social factors.

**Step 5: Identify Leverage Points**
Find places where intervention could reduce multiple dependencies simultaneously, or where alternatives already exist.`
        },
        {
          title: 'Reading a Dependency Map',
          content: `A completed dependency map reveals several key insights:

**Depth of Dependence**
How many layers separate you from fundamental resources? More layers = more vulnerability.

**Breadth of Dependence**
How many different systems do you depend on? More breadth = more potential failure points, but also more resilience if any single system fails.

**Concentration Risk**
Do multiple functions depend on a single source? Concentration creates critical nodes.

**Exit Readiness**
Which dependencies have existing alternatives? Which would require building new capacity?

**Priority Sequence**
Which dependencies should be addressed first based on criticality and feasibility?`
        },
        {
          title: 'Common Mapping Mistakes',
          content: `Avoid these common errors:

**Stopping too early**: If your map ends at "grocery store," you haven't traced far enough. Where does the grocery store get food?

**Ignoring soft dependencies**: Don't just map physical goods. Map knowledge, social connections, and institutional relationships too.

**Assuming stability**: Today's map shows current dependencies. Systems change. Rerun periodically.

**Mapping alone**: Your dependencies interlock with your community's. Map collectively when possible.

**Forgetting yourself**: Your skills, health, and relationships are part of the map. What do you depend on to maintain them?`
        }
      ],

      keyTakeaways: [
        'Dependency maps visualize how systems connect to needs you must meet',
        'The mapping process traces from core functions back to fundamental inputs',
        'Critical nodes and leverage points reveal where to focus exit efforts',
        'Maps should be comprehensive, updated, and ideally developed collectively'
      ]
    },
    learningObjectives: [
      'Create comprehensive dependency maps',
      'Identify critical nodes and single points of failure',
      'Analyze dependency chains and cascading risks',
      'Find leverage points for building alternatives'
    ],
    keyTerms: [
      { term: 'Dependency Map', definition: 'A visual representation of how a system relies on external inputs, services, and resources.' },
      { term: 'Critical Node', definition: 'A point in a dependency chain whose failure would cause system breakdown.' },
      { term: 'Exit Leverage Point', definition: 'A dependency that can be addressed to increase exit capability significantly.' },
      { term: 'Exit Friction', definition: 'The resistance, costs, and barriers that make replacing a dependency difficult.' }
    ]
  },

  'a-m1-l3': {
    id: 'a-m1-l3',
    title: 'Interactive: Build Your First Dependency Map',
    duration: '25 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Apply the dependency mapping methodology to a real system you use. This exercise walks you through creating your first complete dependency map.',
      gameType: 'guided-exercise',
      steps: [
        {
          instruction: 'Choose a system to map',
          options: ['Your household food system', 'Your household energy system', 'Your household water system', 'Your transportation system'],
          guidance: 'Pick whichever feels most important or vulnerable to you.'
        },
        {
          instruction: 'Identify core functions',
          prompt: 'List 3-5 specific functions this system provides for you (e.g., "refrigerated food storage" not just "food")',
          example: 'For energy: lighting, heating, cooking, refrigeration, communication devices'
        },
        {
          instruction: 'Trace first-layer dependencies',
          prompt: 'For each function, what immediate source provides it?',
          example: 'Lighting ← Electrical outlets ← Grid connection ← Utility company'
        },
        {
          instruction: 'Trace second-layer dependencies',
          prompt: 'Go one layer deeper: what does each first-layer source depend on?',
          example: 'Utility company ← Power plants ← Fuel supply (natural gas pipeline, coal delivery)'
        },
        {
          instruction: 'Mark critical nodes',
          prompt: 'Circle any point where failure would cascade to multiple functions',
          guidance: 'These are your highest priorities for building alternatives'
        },
        {
          instruction: 'Assess exit friction',
          prompt: 'For each dependency, rate replacement difficulty 1-5 (1=easy, 5=very difficult)',
          guidance: 'Consider cost, knowledge required, time needed, and social acceptance'
        },
        {
          instruction: 'Identify leverage points',
          prompt: 'Find dependencies where one intervention could address multiple vulnerabilities',
          example: 'Installing solar panels might address multiple energy dependencies simultaneously'
        }
      ],
      completionRequirement: 'Complete all steps and submit your dependency map to finish this lesson'
    }
  },

  'a-m1-l5': {
    id: 'a-m1-l5',
    title: 'Drag-and-Drop: Dependency Classification',
    duration: '12 min',
    type: 'game' as const,
    content: {
      introduction: 'Practice classifying dependencies by type, criticality, and addressability. Accurate classification is essential for prioritizing exit efforts.',
      gameType: 'drag-drop-classification',
      categories: [
        {
          name: 'Critical / High Friction',
          description: 'Most urgent but most difficult to address',
          examples: ['Grid electricity for medical equipment', 'Municipal water in a drought region']
        },
        {
          name: 'Critical / Low Friction',
          description: 'Urgent and addressable - prioritize these',
          examples: ['Emergency food supplies', 'Basic lighting alternatives']
        },
        {
          name: 'Non-Critical / High Friction',
          description: 'Can defer until resources allow',
          examples: ['Complete energy independence', 'Full food self-sufficiency']
        },
        {
          name: 'Non-Critical / Low Friction',
          description: 'Easy wins - good for building momentum',
          examples: ['Rainwater collection for gardens', 'LED lighting conversion']
        }
      ],
      items: [
        { dependency: 'Municipal water supply for drinking', correctCategory: 'Critical / High Friction' },
        { dependency: 'Grid electricity for refrigeration', correctCategory: 'Critical / High Friction' },
        { dependency: 'Gasoline for daily commute', correctCategory: 'Critical / High Friction' },
        { dependency: 'Grocery store for weekly shopping', correctCategory: 'Critical / Low Friction' },
        { dependency: 'Natural gas for cooking', correctCategory: 'Non-Critical / Low Friction' },
        { dependency: 'Internet for entertainment', correctCategory: 'Non-Critical / Low Friction' },
        { dependency: 'Central heating system', correctCategory: 'Non-Critical / High Friction' },
        { dependency: 'Lawn irrigation', correctCategory: 'Non-Critical / Low Friction' }
      ],
      completionRequirement: 'Correctly classify 80% of items to complete this lesson'
    }
  },

  // MODULE 2: Alternative System Design
  'a-m2-l1': {
    id: 'a-m2-l1',
    title: 'Designing Parallel Systems',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exit without an alternative is just chaos. The practical work of Exodology is building parallel systems—alternatives that can meet needs currently served by systems you're exiting.`,
      sections: [
        { title: 'What Are Parallel Systems?', content: `Systems built alongside existing ones that can eventually replace them. The parallel system operates now, meeting real needs, while the old system continues. This allows gradual transition rather than sudden rupture.` },
        { title: 'Design Principles', content: `Start with function, not form. Community-owned solar isn't interesting because it's solar—it's interesting because it provides energy without fossil fuels. Design for resilience over optimization. Optimize for maintainability by the community that will use it.` },
        { title: 'The Minimum Viable System', content: `Like minimum viable products, start with the smallest system that actually functions. A CSA with 10 members is a minimum viable food system. One home with solar and batteries is a minimum viable energy system. Start small, learn, expand.` },
        { title: 'Integration Points', content: `Where will the parallel system connect to the existing one during transition? How will people move between systems? Design for graceful interoperability.` }
      ],
      keyTakeaways: ['Parallel systems operate alongside existing systems', 'Design for function, resilience, and maintainability', 'Start with minimum viable systems', 'Plan integration with existing systems']
    },
    learningObjectives: ['Design parallel systems for common needs', 'Apply minimum viable system thinking', 'Plan integration and transition']
  },

  'a-m2-l2': {
    id: 'a-m2-l2',
    title: 'Food System Alternatives',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Food is the most fundamental human need and one of the most actionable areas for building parallel systems.`,
      sections: [
        { title: 'Production Alternatives', content: `Home gardens, community gardens, urban farms, small-scale farms, agroforestry, permaculture systems. Each provides food production at different scales with different resource requirements.` },
        { title: 'Distribution Alternatives', content: `CSAs, farmers markets, food hubs, community buying clubs, food cooperatives. These connect producers to consumers outside industrial supply chains.` },
        { title: 'Preservation and Processing', content: `Canning, fermenting, drying, freezing, root cellaring. Community kitchens for shared processing. These reduce dependence on industrial processing and extend seasons.` },
        { title: 'Seed and Knowledge Systems', content: `Seed libraries, seed exchanges, community seed banks. Farming knowledge sharing, mentorship programs. These preserve the foundational resources of food sovereignty.` }
      ],
      keyTakeaways: ['Food alternatives span production, distribution, processing, and knowledge', 'Different scales require different approaches', 'Community infrastructure enables what individuals cannot']
    },
    learningObjectives: ['Identify food system alternatives at each stage', 'Match alternatives to community capacity', 'Design integrated local food systems']
  },

  'a-m2-l3': {
    id: 'a-m2-l3',
    title: 'Energy System Alternatives',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Energy independence provides resilience against both grid failures and fossil fuel transitions.`,
      sections: [
        { title: 'Generation Alternatives', content: `Solar PV, small wind, micro-hydro, biomass. Each has different resource requirements and applicability. Solar is most broadly applicable; hydro needs water flow; biomass needs sustainable fuel supply.` },
        { title: 'Storage Solutions', content: `Batteries for short-term storage. Thermal mass, ice storage, hydrogen for longer durations. Pumped hydro for community scale. Storage is often more challenging than generation.` },
        { title: 'Demand Reduction', content: `The cheapest watt is the one you don't use. Efficiency improvements, passive design, behavior change. Often more cost-effective than generation.` },
        { title: 'Grid Relationship', content: `Complete off-grid, grid-tied with backup, community microgrid. Each has tradeoffs in cost, complexity, and resilience. Most situations benefit from hybrid approaches.` }
      ],
      keyTakeaways: ['Multiple generation technologies for different contexts', 'Storage is often the limiting factor', 'Demand reduction is most cost-effective', 'Hybrid grid relationships usually optimal']
    },
    learningObjectives: ['Evaluate energy generation options', 'Understand storage requirements', 'Design hybrid energy systems']
  },

  'a-m2-l4': {
    id: 'a-m2-l4',
    title: 'Water System Alternatives',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Water independence is challenging but essential for true resilience.`,
      sections: [
        { title: 'Source Alternatives', content: `Rainwater harvesting, well drilling, spring development. Each requires different conditions and has different costs. Rainwater is universally applicable but volume-limited; wells require groundwater; springs need specific geography.` },
        { title: 'Treatment Options', content: `Filtration (sediment, carbon, ceramic), UV sterilization, ozone, chlorination. Multi-barrier approaches provide redundancy. Match treatment to contamination risks.` },
        { title: 'Greywater and Blackwater', content: `Greywater reuse for irrigation. Composting toilets eliminate blackwater. Constructed wetlands for treatment. Closing loops reduces water demand.` },
        { title: 'Community Scale', content: `Shared wells, community treatment, cooperative maintenance. Community scale reduces per-household cost and enables more sophisticated treatment.` }
      ],
      keyTakeaways: ['Multiple source options with different requirements', 'Treatment must match contamination risks', 'Closing loops reduces water demand', 'Community scale enables better solutions']
    },
    learningObjectives: ['Evaluate water source options', 'Design appropriate treatment systems', 'Apply water-loop closure principles']
  },

  'a-m2-l5': {
    id: 'a-m2-l5',
    title: 'Interactive: Design Your System',
    duration: '25 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Design a parallel system for one of your key dependencies.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Choose a system to replace', prompt: 'Select food, energy, or water based on your dependency map priorities.' },
        { instruction: 'Define minimum functions', prompt: 'What is the minimum this system must provide? Be specific about quantities and timing.' },
        { instruction: 'Select components', prompt: 'What technologies/approaches will you use for each function?' },
        { instruction: 'Assess resources needed', prompt: 'What money, time, skills, and materials does this require?' },
        { instruction: 'Plan phased implementation', prompt: 'What sequence of steps moves from current state to working system?' },
        { instruction: 'Identify integration points', prompt: 'How will this work alongside existing systems during transition?' }
      ],
      completionRequirement: 'Complete full design exercise'
    }
  },

  // MODULE 3: Transition Planning
  'a-m3-l1': {
    id: 'a-m3-l1',
    title: 'Transition Path Design',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `The transition itself—moving from current systems to alternatives—is often the most challenging part. This lesson teaches transition path design.`,
      sections: [
        { title: 'Mapping the Gap', content: `Current state → desired state. What's the gap? Resources needed, skills to develop, infrastructure to build, relationships to form. Map the gap comprehensively.` },
        { title: 'Sequencing', content: `What must happen first? Dependencies between steps. Critical path analysis. Some steps unlock others; identify these enablers.` },
        { title: 'Resource Staging', content: `When will resources be needed? Financial planning for transition costs. Skill development timing. Material acquisition sequence.` },
        { title: 'Fallback Points', content: `What if transition stalls? Identify stable intermediate states. Design off-ramps where you can pause. Never burn bridges before alternatives are proven.` }
      ],
      keyTakeaways: ['Map the gap between current and desired states', 'Sequence steps based on dependencies', 'Stage resources for when they are needed', 'Design fallback points for stalled transitions']
    },
    learningObjectives: ['Map transition gaps', 'Sequence transition steps', 'Stage resources appropriately', 'Design fallback positions']
  },

  'a-m3-l2': {
    id: 'a-m3-l2',
    title: 'Managing Transition Risk',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Transitions are inherently risky. Understanding and managing these risks is essential for successful exit.`,
      sections: [
        { title: 'Types of Transition Risk', content: `Technical risk: Will the alternative work? Financial risk: Can we afford transition? Social risk: Will relationships survive? Timing risk: Will the window stay open?` },
        { title: 'Risk Assessment', content: `For each risk: What's the probability? What's the impact? What's the detection time? Prioritize by expected impact (probability × impact).` },
        { title: 'Risk Mitigation', content: `Reduce probability through preparation. Reduce impact through fallbacks. Reduce detection time through monitoring. Accept some risks consciously.` },
        { title: 'The Commitment Curve', content: `Risk changes as commitment deepens. Early stages are low commitment, easy reversal. Later stages are high commitment, difficult reversal. Manage risk differently at each stage.` }
      ],
      keyTakeaways: ['Multiple risk types in transitions', 'Assess probability, impact, and detection time', 'Mitigate through preparation, fallbacks, monitoring', 'Risk profile changes with commitment depth']
    },
    learningObjectives: ['Identify transition risk types', 'Assess risks quantitatively', 'Apply mitigation strategies', 'Navigate commitment curve']
  },

  'a-m3-l3': {
    id: 'a-m3-l3',
    title: 'Building Transition Teams',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Transitions rarely succeed alone. Building effective transition teams accelerates exit and provides resilience.`,
      sections: [
        { title: 'Team Composition', content: `Skills needed: technical, financial, social, emotional. Roles: builders, connectors, sustainers. Diversity of perspective improves problem-solving.` },
        { title: 'Team Formation', content: `Start with trusted relationships. Expand through shared work. Vet through small commitments before large ones. Build trust before crisis.` },
        { title: 'Team Dynamics', content: `Clear communication norms. Decision-making processes. Conflict resolution methods. Burnout prevention. Teams that last are intentionally maintained.` },
        { title: 'Network Effects', content: `Teams connected to other teams multiply capacity. Build networks, not just teams. Share learning across groups.` }
      ],
      keyTakeaways: ['Teams need diverse skills and roles', 'Build trust through small commitments', 'Maintain teams intentionally', 'Network teams for greater impact']
    },
    learningObjectives: ['Compose effective transition teams', 'Build and expand teams strategically', 'Maintain team health', 'Network teams for impact']
  },

  'a-m3-l4': {
    id: 'a-m3-l4',
    title: 'Transition Timeline Development',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Develop a realistic transition timeline for your exit.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Define the end state', prompt: 'What does successful transition look like? Be specific.' },
        { instruction: 'List all major milestones', prompt: 'What are the key achievements on the path to end state?' },
        { instruction: 'Sequence milestones', prompt: 'Which must happen before others? What are dependencies?' },
        { instruction: 'Estimate durations', prompt: 'How long for each milestone? Be realistic about constraints.' },
        { instruction: 'Identify critical path', prompt: 'Which sequence determines minimum timeline?' },
        { instruction: 'Add buffer and fallbacks', prompt: 'Where are you vulnerable to delays? What fallbacks exist?' }
      ],
      completionRequirement: 'Complete timeline development'
    }
  },

  // MODULE 4: Community Organizing
  'a-m4-l1': {
    id: 'a-m4-l1',
    title: 'Organizing for Collective Exit',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Individual exits are limited. Collective exit multiplies capacity and creates systemic change. This lesson teaches community organizing for Exodology.`,
      sections: [
        { title: 'Why Collective Exit?', content: `Shared infrastructure reduces per-person costs. Collective action changes systems individuals can't. Community provides support through difficulties. Many exits only make sense at community scale.` },
        { title: 'Organizing Principles', content: `Start with shared concerns, not ideology. Build relationships before asking for commitment. Move at the speed of trust. Power comes from relationships, not just ideas.` },
        { title: 'Entry Points', content: `Find issues where exit makes sense to people already. Utility rate increases, food access gaps, water concerns. Connect Exodology to felt needs.` },
        { title: 'Building Commitment', content: `Graduated engagement: attend → participate → contribute → lead. Don't ask for large commitments before small ones. Celebrate small wins to build momentum.` }
      ],
      keyTakeaways: ['Collective exit multiplies capacity', 'Start with shared concerns and relationships', 'Connect to felt needs', 'Build commitment gradually']
    },
    learningObjectives: ['Articulate value of collective exit', 'Apply organizing principles', 'Identify entry points in communities', 'Build graduated commitment']
  },

  'a-m4-l2': {
    id: 'a-m4-l2',
    title: 'Cooperative Structures',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Cooperatives—enterprises owned and governed by their members—provide legal and organizational structures for collective exit.`,
      sections: [
        { title: 'Types of Cooperatives', content: `Consumer co-ops (members are customers), worker co-ops (members are employees), producer co-ops (members are producers), housing co-ops (members are residents), multi-stakeholder co-ops (multiple types).` },
        { title: 'Cooperative Principles', content: `Voluntary membership, democratic control, member economic participation, autonomy, education, cooperation among cooperatives, concern for community. These distinguish co-ops from other business forms.` },
        { title: 'Legal Considerations', content: `State laws vary on cooperative formation. Some states have strong cooperative statutes; others require workarounds. Legal structure affects governance, liability, and taxation.` },
        { title: 'Cooperative Development', content: `Feasibility study, organizing committee, business plan, legal formation, capitalization, launch. Development typically takes 1-3 years.` }
      ],
      keyTakeaways: ['Multiple cooperative types for different purposes', 'Cooperative principles guide governance', 'Legal structure varies by state', 'Development requires patient process']
    },
    learningObjectives: ['Identify appropriate cooperative type', 'Apply cooperative principles', 'Navigate legal formation', 'Plan cooperative development']
  },

  'a-m4-l3': {
    id: 'a-m4-l3',
    title: 'Commons Governance',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Commons—shared resources governed by communities—offer alternatives to both market and state. Understanding commons governance enables collective exit.`,
      sections: [
        { title: 'What Are Commons?', content: `Resources managed collectively by user communities. Can be natural (water, forests), cultural (knowledge, creative works), or infrastructural (shared tools, spaces). Not unregulated—they have rules, but rules made by users.` },
        { title: 'Ostrom\'s Principles', content: `Elinor Ostrom identified 8 principles for successful commons: defined boundaries, fit between rules and conditions, collective choice, monitoring, graduated sanctions, conflict resolution, recognition by external authorities, nested enterprises.` },
        { title: 'Modern Commons', content: `Open source software, Wikipedia, community land trusts, tool libraries, makerspaces. New commons emerge when communities claim collective governance.` },
        { title: 'Designing for Commons', content: `Clear boundaries for who is included. Rules that match local conditions. Member participation in rule-making. Monitoring and enforcement by community. Conflict resolution mechanisms.` }
      ],
      keyTakeaways: ['Commons are shared resources with community governance', 'Ostrom\'s principles guide sustainable commons', 'Modern commons include digital and physical resources', 'Design requires attention to boundaries, rules, and enforcement']
    },
    learningObjectives: ['Understand commons as governance model', 'Apply Ostrom\'s principles', 'Identify modern commons examples', 'Design commons governance']
  },

  'a-m4-l4': {
    id: 'a-m4-l4',
    title: 'Scenario: Community Food Co-op',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Apply organizing and cooperative principles to develop a community food co-op.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'Initial Organizing',
          description: 'You want to start a food co-op in your neighborhood. Several people are interested but commitments vary.',
          options: [
            { choice: 'Hold a public meeting and ask for founding member commitments', analysis: 'Too early—you need relationships first.', score: 2 },
            { choice: 'Start a buying club with 5-10 committed people to test the concept', analysis: 'Graduated engagement—build proof of concept before expansion.', score: 5 },
            { choice: 'Write a detailed business plan and seek funding', analysis: 'Planning before organizing may produce plans nobody owns.', score: 2 }
          ]
        },
        {
          title: 'Governance Structure',
          description: 'Your buying club has grown to 30 members. It\'s time to formalize. Members disagree on structure.',
          options: [
            { choice: 'Let the founders decide the structure', analysis: 'Violates cooperative principle of democratic control.', score: 2 },
            { choice: 'Survey members and adopt the most popular option', analysis: 'Democratic but may miss hybrid solutions.', score: 3 },
            { choice: 'Facilitate a series of meetings to develop shared governance together', analysis: 'Slower but builds ownership and develops governance skills.', score: 5 }
          ]
        }
      ],
      completionRequirement: 'Complete all scenarios'
    }
  },

  // MODULE 5: Economic Transition
  'a-m5-l1': {
    id: 'a-m5-l1',
    title: 'Personal Economic Transition',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Economic security is often the biggest barrier to exit. This lesson addresses personal economic transition strategies.`,
      sections: [
        { title: 'Reducing Exit Costs', content: `Debt reduction expands exit options. Lower fixed costs reduce income requirements. Skills that transfer across contexts increase options. Relationship capital provides safety nets.` },
        { title: 'Building Transition Capital', content: `Financial reserves for transition period. Skills for alternative livelihoods. Equipment and tools for self-provisioning. Knowledge of alternative systems.` },
        { title: 'Income Diversification', content: `Multiple income streams reduce dependence on any single source. Some income from exited systems during transition. Some income from alternative systems. Gradual shift of balance.` },
        { title: 'Expense Restructuring', content: `Which expenses support exit? (tools, skills) Which oppose it? (debt service, high fixed costs) Restructure toward exit-supporting expenses.` }
      ],
      keyTakeaways: ['Reduce exit costs through debt reduction and lower fixed costs', 'Build capital in multiple forms', 'Diversify income across systems', 'Restructure expenses toward exit support']
    },
    learningObjectives: ['Analyze personal economic barriers to exit', 'Build transition capital', 'Diversify income strategically', 'Restructure expenses']
  },

  'a-m5-l2': {
    id: 'a-m5-l2',
    title: 'Alternative Economies',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Beyond individual economics, alternative economic systems enable collective exit from capitalism's extractive dynamics.`,
      sections: [
        { title: 'Solidarity Economy', content: `Economic practices prioritizing people and planet over profit. Includes cooperatives, community land trusts, local currencies, time banks, mutual aid.` },
        { title: 'Local and Complementary Currencies', content: `Community currencies keep wealth local. Time banks exchange labor directly. LETS (Local Exchange Trading Systems) create credit within communities.` },
        { title: 'Gift Economy', content: `Giving without expectation of direct return. Builds relationships and community. Works at neighborhood scale. Platforms like Buy Nothing groups facilitate.` },
        { title: 'Commons-Based Production', content: `Open source, creative commons, community-owned infrastructure. Produce collectively, share freely. Wikipedia and Linux as examples.` }
      ],
      keyTakeaways: ['Solidarity economy prioritizes people and planet', 'Local currencies keep wealth circulating locally', 'Gift economy builds community', 'Commons-based production shares freely']
    },
    learningObjectives: ['Identify solidarity economy practices', 'Understand complementary currency systems', 'Apply gift economy principles', 'Participate in commons-based production']
  },

  'a-m5-l3': {
    id: 'a-m5-l3',
    title: 'Financial Planning for Exit',
    duration: '18 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Develop a personal financial plan for your exit transition.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Assess current financial position', prompt: 'Income, expenses, debts, assets, skills-as-assets' },
        { instruction: 'Identify exit-opposing elements', prompt: 'What debts, expenses, or dependencies constrain exit?' },
        { instruction: 'Estimate transition costs', prompt: 'What will the exit itself cost? Timeline to functional alternative?' },
        { instruction: 'Plan transition capital', prompt: 'How much reserve is needed? How will you build it?' },
        { instruction: 'Design income bridge', prompt: 'How will income flow during transition? From which systems?' },
        { instruction: 'Set milestones', prompt: 'What financial milestones indicate readiness for each transition phase?' }
      ],
      completionRequirement: 'Complete financial plan'
    }
  },

  // MODULE 6-9 continue similar patterns...
  'a-m6-l1': {
    id: 'a-m6-l1',
    title: 'Skills for Exit',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Skills are the ultimate portable asset. Building skills for exit reduces dependence and creates value in alternative systems.`,
      sections: [
        { title: 'Skill Categories', content: `Production skills (growing, making, building), maintenance skills (repair, preservation), social skills (organizing, teaching, mediating), systems skills (design, planning, troubleshooting).` },
        { title: 'Skill Assessment', content: `What skills do you have? What skills does exit require? Gap analysis. Prioritization by criticality and difficulty.` },
        { title: 'Skill Development', content: `Learning pathways: formal training, apprenticeship, self-teaching, learning-by-doing. Different skills require different approaches.` },
        { title: 'Community Skill Networks', content: `No one needs all skills. Skill sharing within communities. Identify and develop complementary skills. Teach what you know.` }
      ],
      keyTakeaways: ['Skills span production, maintenance, social, and systems categories', 'Gap analysis identifies learning priorities', 'Different skills require different learning approaches', 'Community skill networks reduce individual burden']
    },
    learningObjectives: ['Assess current skills', 'Identify skill gaps for exit', 'Plan skill development', 'Build community skill networks']
  },

  'a-m7-l1': {
    id: 'a-m7-l1',
    title: 'Conflict and Resilience',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exit communities face internal conflicts and external challenges. Building conflict resolution capacity and community resilience is essential.`,
      sections: [
        { title: 'Sources of Conflict', content: `Resource allocation, decision-making processes, values differences, personality clashes, burnout and stress, external pressures. Conflict is normal; unaddressed conflict is dangerous.` },
        { title: 'Conflict Resolution Methods', content: `Direct communication, mediation, group processes, restorative circles. Match method to conflict type and severity.` },
        { title: 'Building Resilience', content: `Redundancy in skills and relationships. Reserves of resources. Practices for wellbeing. Rituals and celebrations that build bonds.` },
        { title: 'External Challenges', content: `Resistance from exited systems, skepticism from outsiders, resource constraints, setbacks and failures. Prepare emotionally and practically.` }
      ],
      keyTakeaways: ['Conflict is normal; address it proactively', 'Match resolution methods to conflict types', 'Build redundancy and reserves for resilience', 'Prepare for external challenges']
    },
    learningObjectives: ['Identify conflict sources', 'Apply resolution methods', 'Build community resilience', 'Prepare for external challenges']
  },

  'a-m8-l1': {
    id: 'a-m8-l1',
    title: 'Documenting and Sharing',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exodology creates knowledge that should be shared. Documentation enables others to learn from your experience.`,
      sections: [
        { title: 'Why Document?', content: `Capture lessons for future reference. Enable others to replicate. Build collective knowledge. Maintain institutional memory. Create resources for teaching.` },
        { title: 'What to Document', content: `What worked, what didn\'t, why. Designs, processes, costs. Lessons learned, mistakes made. Context that shaped decisions.` },
        { title: 'Documentation Methods', content: `Written guides, video documentation, case studies, templates and tools. Match method to audience and content.` },
        { title: 'Sharing Networks', content: `Exit movement networks, bioregional hubs, online commons, peer learning communities. Share early and often.` }
      ],
      keyTakeaways: ['Document to capture and share knowledge', 'Include successes, failures, and context', 'Use methods appropriate to content and audience', 'Share through appropriate networks']
    },
    learningObjectives: ['Establish documentation practices', 'Capture appropriate information', 'Share effectively', 'Contribute to collective knowledge']
  },

  'a-m9-l1': {
    id: 'a-m9-l1',
    title: 'Applied Exodology Synthesis',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `This lesson integrates all Applied Exodology concepts into a coherent practice framework.`,
      sections: [
        { title: 'The Applied Toolkit', content: `Dependency mapping, alternative system design, transition planning, community organizing, economic transition, skill development, conflict resolution, documentation. These tools work together.` },
        { title: 'Sequencing Your Exit', content: `Map dependencies → design alternatives → plan transition → build teams → execute → document → share. Iterate as needed. Adapt to your context.` },
        { title: 'Common Pitfalls', content: `Moving too fast without foundation. Moving too slow and missing windows. Isolation without community. Action without reflection. Reflection without action.` },
        { title: 'Next Steps', content: `You have tools for building alternatives. Strategic Exodology addresses guiding others and shaping larger transitions. Consider which role calls to you.` }
      ],
      keyTakeaways: ['Applied tools form an integrated practice', 'Sequence from mapping through sharing', 'Avoid common pitfalls of pace and isolation', 'Strategic Exodology awaits those who would guide others']
    },
    learningObjectives: ['Integrate all Applied tools', 'Sequence exit activities appropriately', 'Avoid common pitfalls', 'Prepare for Strategic Exodology']
  },

  'a-m9-l2': {
    id: 'a-m9-l2',
    title: 'Capstone: Your Exit Plan',
    duration: '45 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Develop a comprehensive exit plan integrating all Applied Exodology tools.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Complete dependency map', prompt: 'Map your top 3 system dependencies with full tracing' },
        { instruction: 'Design priority alternative', prompt: 'Design a parallel system for your most critical/addressable dependency' },
        { instruction: 'Develop transition plan', prompt: 'Sequence steps, stage resources, identify risks and fallbacks' },
        { instruction: 'Identify team and community', prompt: 'Who will transition with you? What organizing is needed?' },
        { instruction: 'Create financial plan', prompt: 'How will you fund transition? What economic restructuring is needed?' },
        { instruction: 'List skill development needs', prompt: 'What skills must you develop? How and when?' },
        { instruction: 'Plan documentation', prompt: 'How will you capture and share your learning?' }
      ],
      completionRequirement: 'Complete comprehensive exit plan'
    }
  }
}

// ============================================================================
// STRATEGIC EXODOLOGY - COMPLETE LESSON CONTENT
// ============================================================================

export const strategicLessons = {
  's-m1-l1': {
    id: 's-m1-l1',
    title: 'Scaling Exodology',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `Individual and community exits operate differently than regional or national transitions. As scale increases, new dynamics emerge: coordination challenges, political resistance, infrastructure dependencies, and equity concerns all intensify. This lesson examines how Exodology principles transform as we move from personal to civilizational scale.`,

      sections: [
        {
          title: 'The Scale Spectrum',
          content: `Exodology operates across multiple scales:

**Individual Scale**
One person or household reducing dependence on a system. Relatively simple but limited impact.

**Community Scale**
A neighborhood, village, or organization transitioning together. Enables shared infrastructure but requires coordination.

**Regional Scale**
A city, county, or bioregion pursuing exit. Involves governance, public infrastructure, and diverse stakeholders.

**National Scale**
An entire country transitioning away from systems. Requires policy, massive coordination, and international considerations.

**Civilizational Scale**
Humanity transitioning from global systems (e.g., fossil fuels). Requires international cooperation and generational timelines.

Each scale requires different tools, timelines, and trade-offs.`
        },
        {
          title: 'What Changes at Scale',
          content: `As scale increases, several dynamics change:

**Coordination Costs Rise**
Individual exit requires no coordination. National exit requires aligning millions of actors. The coordination burden grows exponentially.

**Political Resistance Intensifies**
Individual exiters are ignored. Regional exits threaten industries. National exits threaten entire economic sectors and provoke organized resistance.

**Infrastructure Matters More**
An individual can use portable solar panels. A region needs grid infrastructure. A nation needs energy policy, manufacturing capacity, and workforce training.

**Timelines Extend**
Individual exit might take months. National transition takes decades. Civilizational transition takes generations.

**Equity Stakes Rise**
Individual exit affects one household. National exit affects millions, including vulnerable populations who may lack exit capability.`
        },
        {
          title: 'The Fractal Principle',
          content: `Despite these differences, Exodology principles apply fractally—they work at every scale, with appropriate adaptation:

**Dependency Mapping** works for households and for nations, though national maps are vastly more complex.

**Exit Friction** exists at every scale, from individual habit to institutional lock-in.

**Parallel Systems** can be built by individuals (home gardens) or nations (renewable energy infrastructure).

**Ethical Responsibility** applies whether exiting a company or a civilization.

The strategic exodologist understands how to apply principles across scales and recognizes when scale-specific considerations require different approaches.`
        },
        {
          title: 'Multi-Scale Strategy',
          content: `Effective strategic Exodology often works across multiple scales simultaneously:

**Bottom-Up**: Individual and community exits create models that larger scales can adopt. The first solar homes enabled the solar industry.

**Top-Down**: Policy changes can enable individual and community exits. Feed-in tariffs made home solar economically viable.

**Middle-Out**: Regional transitions can spread horizontally to other regions while influencing both individuals and nations.

A comprehensive exit strategy considers how actions at one scale affect possibilities at other scales.`
        }
      ],

      keyTakeaways: [
        'Exodology operates across individual, community, regional, national, and civilizational scales',
        'Coordination, resistance, infrastructure, timelines, and equity all change with scale',
        'Core principles apply fractally but require scale-appropriate adaptation',
        'Effective strategy often works across multiple scales simultaneously'
      ],

      references: [
        {
          author: 'Geels, Frank W.',
          title: 'Technological Transitions and System Innovations',
          year: 2005,
          relevance: 'Multi-level perspective on sociotechnical transitions'
        },
        {
          author: 'IPCC',
          title: 'Special Report on Global Warming of 1.5°C',
          year: 2018,
          relevance: 'Global-scale transition requirements and timelines'
        }
      ]
    },
    learningObjectives: [
      'Identify scale-specific considerations in Exodology',
      'Analyze how dynamics change from individual to civilizational scale',
      'Apply the fractal principle to multi-scale strategy',
      'Develop strategies that work across scales'
    ]
  },

  's-m3-l1': {
    id: 's-m3-l1',
    title: 'Justice Frameworks for Exit',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `Large-scale exits raise profound questions of justice: Who gets to exit? Who bears the costs? How do we protect those who cannot leave? This lesson introduces justice frameworks specifically adapted for Exodology practice, ensuring that transitions are not just effective but fair.`,

      sections: [
        {
          title: 'The Justice Problem in Exit',
          content: `Exit is not equally available to everyone. Those with resources—wealth, skills, social connections, mobility—can exit more easily than those without. Without attention to justice, exits can:

- Leave the most vulnerable behind in failing systems
- Extract resources that would have supported those who remain
- Create new forms of exclusion in alternative systems
- Reproduce existing inequalities in new contexts

Just transition is not an add-on to Exodology; it is central to ethical practice.`
        },
        {
          title: 'Key Justice Concepts',
          content: `Several justice concepts are essential for Exodology:

**Exit Equity**: Equal access to exit opportunities across different groups, regardless of income, location, ability, or background.

**Transition Burden**: The costs and difficulties experienced by those undergoing transition. Just transitions distribute these burdens fairly.

**Procedural Justice**: Fair processes for making exit decisions, including voice for affected communities.

**Restorative Justice**: Addressing harms caused by the systems being exited, not just building alternatives.

**Intergenerational Justice**: Ensuring transitions serve future generations, not just current participants.`
        },
        {
          title: 'The "Lifeboats" Problem',
          content: `A common critique of exit is the "lifeboats" problem: Are exiters building escape pods for the privileged while leaving the masses to sink?

This critique is valid when exits:
- Require resources most people don't have
- Actively extract from communities (brain drain, capital flight)
- Create exclusive alternatives unavailable to most

The critique is less valid when exits:
- Create models that can be scaled and replicated
- Include provisions for those who cannot self-exit
- Challenge systems of extraction rather than reproducing them
- Maintain solidarity with those who remain

Strategic exodologists must honestly assess whether their exits are lifeboats or ladders.`
        },
        {
          title: 'Justice-Centered Exit Design',
          content: `Design exits with justice at the center:

**Access**: Who can participate in this exit? What barriers exist? How can they be reduced?

**Voice**: Are affected communities making decisions, or are decisions being made for them?

**Burden Distribution**: Who bears the costs of transition? Are they distributed fairly?

**Benefit Distribution**: Who gains from the alternative system? Are benefits shared?

**Responsibility**: What obligations exist to those who cannot exit?

Every exit plan should include explicit answers to these questions.`
        }
      ],

      keyTakeaways: [
        'Exit capability is unequally distributed; justice requires addressing this',
        'Key concepts include exit equity, transition burden, and procedural justice',
        'The "lifeboats" critique challenges exits that serve only the privileged',
        'Justice-centered design asks: access, voice, burdens, benefits, responsibility'
      ],

      references: [
        {
          author: 'Rawls, John',
          title: 'A Theory of Justice',
          year: 1971,
          relevance: 'Foundational framework for distributional justice'
        },
        {
          author: 'Sen, Amartya',
          title: 'Development as Freedom',
          year: 1999,
          relevance: 'Capability approach to justice and freedom'
        }
      ]
    },
    learningObjectives: [
      'Apply justice frameworks to Exodology practice',
      'Analyze the distribution of exit capability and transition burdens',
      'Evaluate exits using justice criteria',
      'Design exits with justice at the center'
    ],
    keyTerms: [
      { term: 'Just Transition', definition: 'A transition that protects the rights and wellbeing of all affected parties, especially the vulnerable.' },
      { term: 'Exit Equity', definition: 'Equal access to exit opportunities across different groups.' },
      { term: 'Transition Burden', definition: 'The costs and difficulties experienced by those undergoing transition.' }
    ]
  },

  // MODULE 2: Policy and Governance
  's-m2-l1': {
    id: 's-m2-l1',
    title: 'Policy Levers for Exit',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Policy shapes the landscape of exit possibility. Some policies enable exit; others block it. Strategic exodologists understand policy levers and how to move them.`,
      sections: [
        { title: 'Exit-Enabling Policies', content: `Right-to-repair laws enable technology exit. Net metering enables energy exit. Land use policy affects food system exit. Cooperative formation laws affect economic exit.` },
        { title: 'Exit-Blocking Policies', content: `Utility monopolies block energy alternatives. Zoning blocks food production. Licensing blocks economic alternatives. Debt policy creates lock-in.` },
        { title: 'Policy Advocacy', content: `Identify blocking policies. Build coalitions for change. Frame exit-enabling policies in terms policymakers understand. Work at local, state, and federal levels.` },
        { title: 'Prefigurative Policy', content: `Some communities create their own policy environments. Intentional communities with internal governance. Cooperatives with member-determined policies. Working within constraints while advocating for change.` }
      ],
      keyTakeaways: ['Policy enables or blocks exit', 'Advocacy can shift policy environment', 'Prefigurative approaches create alternative policy environments', 'Work at multiple policy levels']
    },
    learningObjectives: ['Identify exit-enabling and blocking policies', 'Develop policy advocacy strategies', 'Apply prefigurative policy approaches']
  },

  's-m2-l2': {
    id: 's-m2-l2',
    title: 'Governance Models for Transition',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `How we govern transitions matters as much as what we transition to. This lesson explores governance models appropriate for different scales.`,
      sections: [
        { title: 'Small-Scale Governance', content: `Consensus for small groups. Modified consensus with fallbacks. Sociocracy for nested circles. Holacracy for organizational structure. Match governance to group size and culture.` },
        { title: 'Community-Scale Governance', content: `Town meetings, participatory budgeting, citizen assemblies. Representative structures with accountability. Hybrid approaches combining direct and representative democracy.` },
        { title: 'Multi-Scale Governance', content: `Subsidiarity: decide at lowest appropriate level. Nested governance linking scales. Bioregional organization following ecological boundaries.` },
        { title: 'Transition Governance', content: `Governance for transition differs from steady-state. Need for quick decisions during crisis. Balance of speed and participation. Temporary structures with sunset clauses.` }
      ],
      keyTakeaways: ['Match governance to scale', 'Multiple models exist for each scale', 'Subsidiarity guides level of decision-making', 'Transition may require special governance']
    },
    learningObjectives: ['Select appropriate governance models', 'Design multi-scale governance', 'Apply transition-specific governance']
  },

  's-m2-l3': {
    id: 's-m2-l3',
    title: 'Scenario: Policy Advocacy Campaign',
    duration: '15 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Design a policy advocacy campaign to enable community exit.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'Solar Access',
          description: 'Your utility blocks community solar through prohibitive fees and restrictions. You want to change state policy.',
          options: [
            { choice: 'File a regulatory complaint', analysis: 'Regulatory process is slow and utility has resources to fight.', score: 2 },
            { choice: 'Build coalition with environmental and ratepayer groups for legislation', analysis: 'Coalition building creates political power for systemic change.', score: 5 },
            { choice: 'Focus on individual rooftop solar which isn\'t restricted', analysis: 'Avoids the fight but doesn\'t solve community-scale problem.', score: 3 }
          ]
        },
        {
          title: 'Food Production',
          description: 'Zoning prohibits backyard chickens and front-yard gardens in your city.',
          options: [
            { choice: 'Seek variance for your property', analysis: 'Solves individual problem but doesn\'t change policy.', score: 2 },
            { choice: 'Organize neighbors to petition for zoning amendment', analysis: 'Collective action changes policy for everyone.', score: 5 },
            { choice: 'Move to a less restrictive area', analysis: 'Individual exit—may be appropriate but doesn\'t help community.', score: 3 }
          ]
        }
      ],
      completionRequirement: 'Complete all scenarios'
    }
  },

  // MODULE 4: Large-Scale Transition Design
  's-m4-l1': {
    id: 's-m4-l1',
    title: 'Designing Regional Transitions',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `Regional transitions—at the city, county, or bioregional level—require different approaches than individual or community exits.`,
      sections: [
        { title: 'Regional Assessment', content: `Regional dependency mapping. Critical infrastructure analysis. Stakeholder mapping. Political landscape assessment. What are the unique vulnerabilities and opportunities of this region?` },
        { title: 'Regional Strategy', content: `Identify early adopter communities. Build demonstration projects. Create regional networks. Develop scalable models. Sequence interventions for cascade effects.` },
        { title: 'Infrastructure Planning', content: `Regional energy systems, water systems, food networks. Transportation alternatives. Communication infrastructure. Build what individuals and communities cannot.` },
        { title: 'Political Strategy', content: `Engage local government. Build relationships with key actors. Navigate political opposition. Create policy frameworks. Work within and outside formal channels.` }
      ],
      keyTakeaways: ['Regional transitions require systematic assessment', 'Strategy should create cascade effects', 'Regional infrastructure enables local exits', 'Political engagement is essential']
    },
    learningObjectives: ['Conduct regional assessments', 'Design regional transition strategies', 'Plan regional infrastructure', 'Navigate regional politics']
  },

  's-m4-l2': {
    id: 's-m4-l2',
    title: 'National and Global Transitions',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `The largest transitions—national energy policy, global food systems—require understanding dynamics that operate beyond regional scope.`,
      sections: [
        { title: 'National Transition Dynamics', content: `Policy at national scale. Industrial policy and transition. Labor market implications. International trade considerations. National infrastructure.` },
        { title: 'Global Transition Dynamics', content: `International coordination challenges. Climate agreements as exit frameworks. Global supply chain transformation. Technology transfer. International justice.` },
        { title: 'Multi-Level Alignment', content: `How local exits contribute to national/global transition. How national/global frameworks enable local exits. Aligning action across scales.` },
        { title: 'Strategic Positioning', content: `Where can individuals and communities influence large-scale transitions? Leverage points. Movement building. Coalition strategies.` }
      ],
      keyTakeaways: ['National transitions involve industrial and labor policy', 'Global transitions require international coordination', 'Multi-level alignment is essential', 'Strategic positioning identifies leverage points']
    },
    learningObjectives: ['Understand national transition dynamics', 'Analyze global transition challenges', 'Align action across scales', 'Position for maximum leverage']
  },

  // MODULE 5: Guiding Others
  's-m5-l1': {
    id: 's-m5-l1',
    title: 'The Role of the Exit Steward',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Exit Stewards guide others through transitions. This role requires knowledge, skill, and ethical grounding.`,
      sections: [
        { title: 'What Stewards Do', content: `Provide frameworks for thinking about exit. Share knowledge of alternatives. Facilitate transition planning. Connect people with resources and networks. Support through difficulties.` },
        { title: 'Steward Ethics', content: `Never push exit on those not ready. Respect autonomy in decisions. Maintain confidentiality. Acknowledge limits of knowledge. Refer when appropriate.` },
        { title: 'Steward Development', content: `Deep knowledge through personal exit experience. Broad knowledge across domains. Facilitation and coaching skills. Self-care and sustainability.` },
        { title: 'Steward Networks', content: `No steward knows everything. Networks of mutual support and referral. Collective learning and knowledge sharing. Regional and domain-specific networks.` }
      ],
      keyTakeaways: ['Stewards guide others through transitions', 'Ethics require respect for autonomy', 'Development requires experience and skills', 'Networks extend individual capacity']
    },
    learningObjectives: ['Understand steward role', 'Apply steward ethics', 'Plan steward development', 'Build steward networks']
  },

  's-m5-l2': {
    id: 's-m5-l2',
    title: 'Facilitation and Coaching',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `Stewards use facilitation and coaching to help others navigate exit without imposing solutions.`,
      sections: [
        { title: 'Exit Coaching', content: `Help clients identify their own motivations. Facilitate dependency mapping. Support option exploration. Assist transition planning. Provide accountability without judgment.` },
        { title: 'Group Facilitation', content: `Guide community exit discussions. Facilitate decision-making processes. Manage conflict. Build consensus or navigate disagreement. Document and track progress.` },
        { title: 'Common Challenges', content: `Clients who want to be told what to do. Groups stuck in analysis paralysis. Conflict that threatens to derail process. Unrealistic expectations. Burnout.` },
        { title: 'Self-Care for Stewards', content: `Boundaries on time and emotional investment. Supervision and peer support. Personal practice and renewal. Knowing when to step back.` }
      ],
      keyTakeaways: ['Coaching elicits client wisdom', 'Facilitation guides groups', 'Common challenges require preparation', 'Self-care enables sustainable service']
    },
    learningObjectives: ['Apply coaching techniques', 'Facilitate group processes', 'Navigate common challenges', 'Practice self-care']
  },

  's-m5-l3': {
    id: 's-m5-l3',
    title: 'Practice: Stewardship Scenarios',
    duration: '18 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Practice responding to stewardship scenarios.',
      gameType: 'scenario-decision',
      scenarios: [
        {
          title: 'The Eager Exiter',
          description: 'A client wants to quit their job and move to an ecovillage immediately. They have debt, no savings, and haven\'t visited any communities.',
          options: [
            { choice: 'Support their excitement and help them plan the move', analysis: 'Ignores red flags—this exit is premature.', score: 1 },
            { choice: 'Tell them it\'s a bad idea and they should wait', analysis: 'Imposes judgment rather than facilitating reflection.', score: 2 },
            { choice: 'Ask questions that help them examine their readiness', analysis: 'Coaching approach—help them discover what they need.', score: 5 }
          ]
        },
        {
          title: 'The Stuck Group',
          description: 'A community group has been discussing a food co-op for two years. They keep researching but never decide anything.',
          options: [
            { choice: 'Present a detailed plan for them to adopt', analysis: 'Takes over rather than facilitating—may create dependence.', score: 2 },
            { choice: 'Help them identify what would make them ready to decide', analysis: 'Facilitates their process while addressing the block.', score: 5 },
            { choice: 'Tell them they\'re overthinking it and should just start', analysis: 'May be true but doesn\'t address underlying hesitation.', score: 3 }
          ]
        }
      ],
      completionRequirement: 'Complete all scenarios'
    }
  },

  // MODULE 6: Teaching Exodology
  's-m6-l1': {
    id: 's-m6-l1',
    title: 'Designing Exit Education',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Teaching Exodology extends its reach. Effective education design ensures knowledge transfers and multiplies.`,
      sections: [
        { title: 'Learner-Centered Design', content: `Start with learner needs, not content. What do learners need to be able to do? What knowledge supports those abilities? What experiences develop that knowledge?` },
        { title: 'Experiential Methods', content: `Exodology is learned by doing, not just studying. Simulations, projects, fieldwork. Reflection on experience. Learning from failure.` },
        { title: 'Scaffolding Complexity', content: `Foundation before application before strategy. Simple before complex. Concrete before abstract. Build on what learners already know.` },
        { title: 'Assessment for Learning', content: `How do learners know they\'re progressing? Demonstrations of capability, not just knowledge tests. Feedback that guides improvement.` }
      ],
      keyTakeaways: ['Design from learner needs', 'Emphasize experiential learning', 'Scaffold from simple to complex', 'Assess capability, not just knowledge']
    },
    learningObjectives: ['Apply learner-centered design', 'Create experiential activities', 'Scaffold learning appropriately', 'Design meaningful assessment']
  },

  's-m6-l2': {
    id: 's-m6-l2',
    title: 'Building Learning Communities',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Individual teaching is limited. Building learning communities multiplies educational impact.`,
      sections: [
        { title: 'Peer Learning', content: `Learners teaching each other. Study groups and cohorts. Skill sharing. Collective projects. Learning happens in relationship.` },
        { title: 'Community of Practice', content: `Groups that share domain, community, and practice. Legitimate peripheral participation. Newcomers learn from practitioners. Knowledge develops through practice.` },
        { title: 'Facilitating vs. Teaching', content: `Shift from teacher as expert to teacher as facilitator. Create conditions for learning. Guide rather than direct. Trust the learning process.` },
        { title: 'Sustainability', content: `Learning communities that persist beyond any individual. Leadership development. Documentation and knowledge management. Reproduction of the community itself.` }
      ],
      keyTakeaways: ['Peer learning multiplies impact', 'Communities of practice develop knowledge', 'Facilitation enables self-directed learning', 'Sustainable communities persist beyond individuals']
    },
    learningObjectives: ['Facilitate peer learning', 'Build communities of practice', 'Shift from teaching to facilitating', 'Create sustainable learning communities']
  },

  // MODULE 7: Movement Building
  's-m7-l1': {
    id: 's-m7-l1',
    title: 'Exit as Movement',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `Individual exits add up to movement. Understanding movement dynamics helps strategic exodologists contribute to larger change.`,
      sections: [
        { title: 'Movement Characteristics', content: `Shared identity and framing. Networks of individuals and organizations. Collective action toward change. Cultural production and meaning-making. Movement infrastructure.` },
        { title: 'Movement Strategy', content: `Theory of change: how does change happen? Target analysis: who can deliver change? Tactic selection: what actions advance the goal? Escalation: how to build power over time?` },
        { title: 'Movement Roles', content: `Different people play different roles: organizers, spokespeople, researchers, supporters. Movement ecology includes diverse organizations. Find your role.` },
        { title: 'Movement Sustainability', content: `Movements burn out. Care for participants. Celebrate victories. Sustainable pace. Long-term thinking.` }
      ],
      keyTakeaways: ['Exits aggregate into movement', 'Movement strategy guides collective action', 'Diverse roles and organizations needed', 'Sustainability requires intentional care']
    },
    learningObjectives: ['Understand movement dynamics', 'Apply movement strategy concepts', 'Identify your movement role', 'Contribute to movement sustainability']
  },

  's-m7-l2': {
    id: 's-m7-l2',
    title: 'Narrative and Framing',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `How we talk about exit shapes who participates and how society responds. Strategic narrative work expands possibility.`,
      sections: [
        { title: 'Framing Effects', content: `The same action can be framed as abandonment or transformation, as dropping out or stepping up. Frames shape perception and response.` },
        { title: 'Narrative Structure', content: `Effective narratives have characters, conflict, and resolution. Who are the characters in exit stories? What is the conflict? What resolution is sought?` },
        { title: 'Counter-Narratives', content: `Dominant narratives frame exit as failure. Counter-narratives frame exit as courage, responsibility, innovation. Identify dominant frames and construct alternatives.` },
        { title: 'Story-Based Strategy', content: `Battles of the story: who is telling what story to whom? Story of self, us, and now. Using stories strategically while maintaining authenticity.` }
      ],
      keyTakeaways: ['Framing shapes perception and response', 'Narrative structure makes stories compelling', 'Counter-narratives challenge dominant frames', 'Story-based strategy uses narrative intentionally']
    },
    learningObjectives: ['Analyze framing effects', 'Construct compelling narratives', 'Develop counter-narratives', 'Apply story-based strategy']
  },

  // MODULE 8: Long-Term Thinking
  's-m8-l1': {
    id: 's-m8-l1',
    title: 'Generational Exodology',
    duration: '22 min',
    type: 'instruction' as const,
    content: {
      introduction: `Some exits take generations. Thinking beyond our lifetimes enables transitions too large for any individual.`,
      sections: [
        { title: 'Generational Time', content: `What can be accomplished in a generation? What requires multiple generations? How do we think about timescales beyond our lives?` },
        { title: 'Transmission', content: `How does exit knowledge transfer across generations? Education, culture, institutions. What is lost in transmission? What persists?` },
        { title: 'Legacy', content: `What are we building for those who come after? What do we owe future generations? How do we avoid binding them to our solutions?` },
        { title: 'Patience and Urgency', content: `Climate change is urgent. Cultural change is slow. Holding both without paralysis or despair. Strategic patience with tactical urgency.` }
      ],
      keyTakeaways: ['Some transitions require generations', 'Transmission preserves and loses knowledge', 'Legacy requires humility about future needs', 'Balance patience and urgency']
    },
    learningObjectives: ['Think in generational timeframes', 'Plan for knowledge transmission', 'Consider legacy responsibly', 'Balance patience with urgency']
  },

  's-m8-l2': {
    id: 's-m8-l2',
    title: 'Resilience Across Time',
    duration: '18 min',
    type: 'instruction' as const,
    content: {
      introduction: `Alternatives must persist through time to matter. Building for resilience ensures exits endure.`,
      sections: [
        { title: 'Threats to Persistence', content: `Internal: conflict, burnout, succession failures. External: economic pressure, political opposition, environmental change. What kills alternatives?` },
        { title: 'Resilience Principles', content: `Diversity, redundancy, modularity. Multiple ways to meet each need. Parts that can fail without system collapse. Adaptation over time.` },
        { title: 'Institutional Memory', content: `How do organizations remember? Documentation, culture, ritual. What happens when founders leave? Succession planning.` },
        { title: 'Evolution', content: `Healthy systems change. Adaptation to new conditions. Balance of stability and change. Learning organizations.` }
      ],
      keyTakeaways: ['Alternatives face internal and external threats', 'Resilience comes from diversity and redundancy', 'Institutional memory enables persistence', 'Evolution maintains relevance']
    },
    learningObjectives: ['Identify threats to persistence', 'Apply resilience principles', 'Build institutional memory', 'Enable healthy evolution']
  },

  // MODULE 9: Integration and Capstone
  's-m9-l1': {
    id: 's-m9-l1',
    title: 'Strategic Exodology Synthesis',
    duration: '25 min',
    type: 'instruction' as const,
    content: {
      introduction: `This lesson integrates all Strategic Exodology concepts into a coherent stewardship framework.`,
      sections: [
        { title: 'The Strategic Toolkit', content: `Scaling, justice, policy, regional/global transitions, stewardship, teaching, movement building, long-term thinking. These tools enable systemic change.` },
        { title: 'Steward as Linchpin', content: `Strategic exodologists connect scales: individual to community to region to world. Connect timescales: immediate to generational. Connect domains: food, energy, water, economy.` },
        { title: 'Finding Your Work', content: `Where are you called to serve? What scale? What domain? What role—facilitator, teacher, organizer, builder? What is yours to do?` },
        { title: 'The Path Forward', content: `Exodology as ongoing practice. Continuous learning. Community of practitioners. The work of a lifetime.` }
      ],
      keyTakeaways: ['Strategic tools enable systemic change', 'Stewards connect scales, times, and domains', 'Find your particular contribution', 'Exodology is lifelong practice']
    },
    learningObjectives: ['Integrate strategic concepts', 'Identify your stewardship role', 'Commit to ongoing practice']
  },

  's-m10-l1': {
    id: 's-m10-l1',
    title: 'Capstone Project Overview',
    duration: '20 min',
    type: 'instruction' as const,
    content: {
      introduction: `The Strategic Exodology capstone demonstrates comprehensive mastery through a real-world project.`,
      sections: [
        { title: 'Project Options', content: `Regional transition plan for a specific place. Exit guide for a specific domain. Teaching curriculum design. Stewardship portfolio documenting your practice. Choose based on your calling.` },
        { title: 'Project Components', content: `Situational analysis, stakeholder mapping, strategic framework, implementation plan, justice assessment, sustainability plan, reflection on learning.` },
        { title: 'Evaluation Criteria', content: `Application of concepts, realism of analysis, creativity of approach, ethical grounding, quality of reflection.` },
        { title: 'Next Steps', content: `Complete the capstone project. Join the practitioner community. Continue your Exodology practice. Welcome to stewardship.` }
      ],
      keyTakeaways: ['Capstone demonstrates comprehensive mastery', 'Choose project aligned with your calling', 'Include all required components', 'Join the community of practice']
    },
    learningObjectives: ['Select appropriate capstone project', 'Understand project components and criteria', 'Plan capstone completion']
  },

  's-m10-l2': {
    id: 's-m10-l2',
    title: 'Capstone Project Workbook',
    duration: '60 min',
    type: 'interactive' as const,
    content: {
      introduction: 'Complete your Strategic Exodology capstone project.',
      gameType: 'guided-exercise',
      steps: [
        { instruction: 'Select project type', prompt: 'Choose: Regional transition plan, Domain exit guide, Teaching curriculum, or Stewardship portfolio' },
        { instruction: 'Conduct situational analysis', prompt: 'What is the current state? What are dependencies, vulnerabilities, opportunities?' },
        { instruction: 'Map stakeholders', prompt: 'Who is affected? Who has power? Who could ally or oppose?' },
        { instruction: 'Develop strategic framework', prompt: 'What is the theory of change? What sequence of interventions?' },
        { instruction: 'Create implementation plan', prompt: 'What are the concrete steps? Timeline? Resources needed?' },
        { instruction: 'Assess justice implications', prompt: 'Who benefits and who bears costs? How is equity addressed?' },
        { instruction: 'Plan for sustainability', prompt: 'How does this persist? What are resilience mechanisms?' },
        { instruction: 'Reflect on learning', prompt: 'What did you learn? How did this change your understanding?' }
      ],
      completionRequirement: 'Complete all capstone components'
    }
  },

  's-m10-l3': {
    id: 's-m10-l3',
    title: 'Final Reflection: Your Exodology Path',
    duration: '20 min',
    type: 'reflection' as const,
    content: {
      introduction: 'Reflect on your complete Exodology journey and your path forward.',
      prompts: [
        { question: 'How has your understanding of exit changed from the beginning to now?', guidance: 'Consider your initial assumptions and how they evolved.' },
        { question: 'What is your particular contribution to Exodology?', guidance: 'Consider your skills, circumstances, calling.' },
        { question: 'What exits are you personally committed to pursuing?', guidance: 'Be specific about systems and timelines.' },
        { question: 'How will you continue developing as a practitioner?', guidance: 'Consider learning, practice, community.' },
        { question: 'What is your vision for a post-exit world?', guidance: 'What are we exiting toward, not just from?' }
      ],
      closingNote: 'You have completed the full Exodology curriculum. You are now equipped for literacy, application, and stewardship. The work begins—the work of a lifetime, the work of generations, the work of building the world we need.'
    }
  }
}

// ============================================================================
// MODULE ASSESSMENTS
// ============================================================================

export const moduleAssessments = {
  'f-m1-assessment': {
    moduleId: 'f-m1',
    title: 'Module 1 Knowledge Check',
    description: 'Test your understanding of Exodology fundamentals.',
    type: 'quiz',
    questions: [
      {
        question: 'What is the core distinction between Exodology and sustainability?',
        options: [
          'Exodology focuses on improving systems; sustainability focuses on leaving them',
          'Exodology focuses on leaving systems; sustainability focuses on improving them',
          'Exodology is about collapse; sustainability is about growth',
          'There is no meaningful distinction'
        ],
        correctAnswer: 1,
        explanation: 'Sustainability focuses on improving existing systems to reduce harm. Exodology focuses on designing ethical exits from systems that cannot be adequately improved.'
      },
      {
        question: 'Which of the following is NOT one of the three pillars of Exodology?',
        options: [
          'Literacy',
          'Application',
          'Resistance',
          'Stewardship'
        ],
        correctAnswer: 2,
        explanation: 'The three pillars are Literacy (understanding), Application (building), and Stewardship (guiding). Resistance is not a pillar of Exodology.'
      },
      {
        question: 'What does "exit capability" refer to?',
        options: [
          'The speed at which someone can leave a building',
          'The structural capacity to leave a system when needed',
          'The financial resources required for migration',
          'The legal permission to exit a contract'
        ],
        correctAnswer: 1,
        explanation: 'Exit capability refers to the structural capacity—resources, alternatives, knowledge, and support—that enable departure from a system.'
      },
      {
        question: 'According to Exodology, why is managed exit preferable to collapse?',
        options: [
          'Exit is faster than collapse',
          'Exit preserves value while collapse destroys it',
          'Exit requires less planning',
          'Collapse is illegal'
        ],
        correctAnswer: 1,
        explanation: 'Managed exit preserves resources, knowledge, and relationships that collapse destroys. Exit is chosen and planned; collapse is endured and chaotic.'
      },
      {
        question: 'What historical work is foundational to understanding exit as a social phenomenon?',
        options: [
          'The Wealth of Nations by Adam Smith',
          'Exit, Voice, and Loyalty by Albert Hirschman',
          'The Prince by Machiavelli',
          'Das Kapital by Karl Marx'
        ],
        correctAnswer: 1,
        explanation: 'Albert Hirschman\'s "Exit, Voice, and Loyalty" (1970) is the foundational text analyzing exit as a response to organizational decline.'
      }
    ],
    passingScore: 80
  },

  'f-m2-assessment': {
    moduleId: 'f-m2',
    title: 'Response Spectrum Analysis',
    description: 'Analyze a provided case study and justify your recommended response.',
    type: 'challenge',
    scenario: {
      title: 'The Regional Hospital System',
      description: `A rural region has two hospitals serving 80,000 people. Both are struggling financially due to declining population and insurance reimbursement issues. The state has proposed merging them into one facility, which would reduce services but might be financially sustainable.

Local advocates are divided: some want to fight for both hospitals (reform), others want to accept the merger (optimization), and a third group wants to build a network of community clinics and telehealth services that could eventually replace the hospital model entirely (exit).

The population is aging, with many chronic conditions requiring ongoing care. The nearest alternative hospital is 90 minutes away.`,
      questions: [
        'What type of response does each advocate group represent?',
        'What are the structural limits of reform in this scenario?',
        'What would a managed exit look like?',
        'What warning signs would indicate collapse is approaching?',
        'What hybrid approach might work?'
      ]
    },
    rubric: [
      'Correctly identifies each response type',
      'Analyzes structural limits using course frameworks',
      'Proposes viable exit strategy',
      'Identifies appropriate warning signals',
      'Integrates multiple approaches realistically'
    ],
    passingScore: 70
  }
}

// ============================================================================
// CAPSTONE PROJECT STRUCTURE
// ============================================================================

export const strategicCapstone = {
  title: 'Complete Exodology Transition Plan',
  description: 'Design a comprehensive transition plan for a community, region, or sector that demonstrates mastery of all Strategic Exodology competencies.',
  duration: '3-4 weeks',

  phases: [
    {
      phase: 1,
      title: 'System Diagnosis',
      tasks: [
        'Select a community, region, or sector facing system stress',
        'Complete comprehensive dependency mapping',
        'Identify critical nodes and failure risks',
        'Assess current exit capability',
        'Document stakeholders and their interests'
      ],
      deliverable: 'System Diagnosis Report (3-5 pages)'
    },
    {
      phase: 2,
      title: 'Exit Strategy Design',
      tasks: [
        'Define exit objectives and success criteria',
        'Design parallel systems for critical functions',
        'Develop phased transition timeline',
        'Identify resource requirements',
        'Plan for hybrid/partial exit phases'
      ],
      deliverable: 'Exit Strategy Document (5-7 pages)'
    },
    {
      phase: 3,
      title: 'Risk and Equity Analysis',
      tasks: [
        'Complete equity impact assessment',
        'Identify risks and unintended consequences',
        'Develop mitigation strategies',
        'Plan for backlash and resistance',
        'Address vulnerable populations'
      ],
      deliverable: 'Risk and Equity Report (3-5 pages)'
    },
    {
      phase: 4,
      title: 'Governance and Stewardship',
      tasks: [
        'Design governance structure for transition',
        'Develop stakeholder engagement plan',
        'Create long-term stewardship framework',
        'Plan for adaptive management',
        'Define success metrics and monitoring'
      ],
      deliverable: 'Governance Plan (3-5 pages)'
    },
    {
      phase: 5,
      title: 'Integration and Presentation',
      tasks: [
        'Integrate all components into coherent plan',
        'Create executive summary',
        'Develop presentation materials',
        'Reflect on unintended consequences',
        'Submit complete capstone portfolio'
      ],
      deliverable: 'Complete Capstone Portfolio with Executive Summary'
    }
  ],

  evaluationCriteria: [
    {
      criterion: 'Systems Analysis',
      weight: 20,
      description: 'Quality and completeness of dependency mapping and system diagnosis'
    },
    {
      criterion: 'Strategy Design',
      weight: 25,
      description: 'Viability and creativity of exit strategy and parallel system design'
    },
    {
      criterion: 'Justice Integration',
      weight: 20,
      description: 'Quality of equity analysis and protection for vulnerable populations'
    },
    {
      criterion: 'Risk Management',
      weight: 15,
      description: 'Identification and mitigation of risks and unintended consequences'
    },
    {
      criterion: 'Governance Design',
      weight: 15,
      description: 'Appropriateness of governance structure and stewardship planning'
    },
    {
      criterion: 'Integration and Presentation',
      weight: 5,
      description: 'Coherence, clarity, and professionalism of final portfolio'
    }
  ],

  passingScore: 70
}

export default {
  glossary: exodologyGlossary,
  foundations: foundationsLessons,
  applied: appliedLessons,
  strategic: strategicLessons,
  assessments: moduleAssessments,
  capstone: strategicCapstone
}
