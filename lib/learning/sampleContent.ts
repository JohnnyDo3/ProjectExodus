/**
 * Sample Level-Specific Content for Learning Modules
 *
 * This file contains example content for the Carbon Footprint module
 * across all 6 learning levels, demonstrating how content should be
 * tailored for different educational levels.
 */

import {
  LevelContent,
  LearningLevel,
  ActivityConfig,
  LearningGameConfig,
  ContentSection,
  KeyTerm
} from '@/types/learning'

// ============================================
// ELEMENTARY LEVEL (Ages 6-10)
// ============================================

const elementaryContent: LevelContent = {
  level: 'ELEMENTARY',
  estimatedMinutes: 15,
  readingLevel: 'Grade 2-4',

  introduction: `
    <div class="text-lg">
      <p>Hi there, Earth Explorer! 🌍</p>
      <p class="mt-2">Did you know that everything we do leaves a mark on our planet? When we use electricity, ride in cars, or throw things away, we create something called a <strong>carbon footprint</strong>.</p>
      <p class="mt-2">Let's learn how we can be superhero helpers for Earth!</p>
    </div>
  `,

  sections: [
    {
      id: 'elem-section-1',
      title: 'What is a Carbon Footprint?',
      content: `
        <p>Imagine your footprints in the sand at the beach. A <strong>carbon footprint</strong> is like that, but invisible!</p>
        <p class="mt-3">When we:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>🚗 Ride in a car</li>
          <li>💡 Turn on lights</li>
          <li>🍔 Eat food</li>
          <li>🎮 Play video games</li>
        </ul>
        <p class="mt-3">We use energy, and that energy leaves a footprint on Earth!</p>
      `
    },
    {
      id: 'elem-section-2',
      title: 'Why Does It Matter?',
      content: `
        <p>Earth is our only home! When we make big carbon footprints, it can make Earth feel sick.</p>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-3">
          <p class="font-medium">🌡️ Fun Fact:</p>
          <p>Too much carbon makes Earth warmer, like wearing a thick blanket on a hot day!</p>
        </div>
        <p class="mt-3">But don't worry - we can help make our footprints smaller!</p>
      `
    },
    {
      id: 'elem-section-3',
      title: 'How to Be an Earth Helper',
      content: `
        <p>Here are easy ways to help:</p>
        <div class="grid grid-cols-2 gap-3 mt-3">
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <span class="text-2xl">🚶</span>
            <p class="text-sm mt-1">Walk or bike</p>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <span class="text-2xl">💡</span>
            <p class="text-sm mt-1">Turn off lights</p>
          </div>
          <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
            <span class="text-2xl">♻️</span>
            <p class="text-sm mt-1">Recycle</p>
          </div>
          <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
            <span class="text-2xl">🌱</span>
            <p class="text-sm mt-1">Plant a tree</p>
          </div>
        </div>
      `
    }
  ],

  summary: `
    <p>Great job, Earth Explorer! 🎉</p>
    <p class="mt-2">Remember: A carbon footprint is the mark we leave on Earth. We can make our footprints smaller by walking, turning off lights, and recycling!</p>
  `,

  objectives: [
    'Understand what a carbon footprint is',
    'Know why it matters for Earth',
    'Learn 4 ways to help the planet'
  ],

  keyTerms: [
    { term: 'Carbon Footprint', definition: 'The invisible mark we leave on Earth when we use energy', example: 'Riding in a car creates a carbon footprint' },
    { term: 'Energy', definition: 'The power that makes things work, like electricity', example: 'Lights use energy to shine' },
    { term: 'Recycle', definition: 'Turning old things into new things instead of throwing them away', example: 'Old bottles can become new toys' }
  ],

  activities: [
    {
      id: 'elem-activity-1',
      type: 'DRAG_DROP',
      title: 'Sort the Actions!',
      instructions: 'Drag each action to show if it makes a BIG footprint or SMALL footprint.',
      points: 50,
      required: true,
      config: {
        items: [
          { id: 'item-1', label: '🚗 Driving a car', category: 'big' },
          { id: 'item-2', label: '🚶 Walking to school', category: 'small' },
          { id: 'item-3', label: '💡 Leaving lights on', category: 'big' },
          { id: 'item-4', label: '♻️ Recycling paper', category: 'small' }
        ],
        zones: [
          { id: 'zone-big', label: 'BIG Footprint 👎', accepts: ['big'] },
          { id: 'zone-small', label: 'SMALL Footprint 👍', accepts: ['small'] }
        ],
        correctPlacements: {
          'item-1': 'zone-big',
          'item-2': 'zone-small',
          'item-3': 'zone-big',
          'item-4': 'zone-small'
        },
        shuffleItems: true,
        feedback: {
          correct: 'Fantastic! You know which actions help Earth! 🌍',
          incorrect: 'Almost there! Remember, cars and lights on = big footprint'
        }
      }
    }
  ],

  learningGame: {
    id: 'elem-game-1',
    title: 'Earth Explorer Quiz',
    description: 'Show what you learned about carbon footprints!',
    totalRounds: 5,
    livesCount: 3,
    basePoints: 10,
    streakMultiplier: 0.5,
    timeBonusEnabled: false,
    timeBonusPointsPerSecond: 0,
    rounds: [
      {
        id: 'round-1',
        type: 'true_false',
        question: 'Walking to school makes a smaller carbon footprint than driving',
        correctAnswer: 'True',
        explanation: 'Walking doesn\'t use gas or electricity, so it leaves almost no footprint!',
        points: 10,
        difficulty: 1
      },
      {
        id: 'round-2',
        type: 'multiple_choice',
        question: 'What is a carbon footprint?',
        options: [
          'A footprint made of coal',
          'The mark we leave on Earth from using energy',
          'A foot-shaped cloud',
          'A type of shoe'
        ],
        correctAnswer: 'The mark we leave on Earth from using energy',
        explanation: 'A carbon footprint is the invisible mark we make when we use energy!',
        points: 10,
        difficulty: 1
      },
      {
        id: 'round-3',
        type: 'multiple_choice',
        question: 'Which helps make your footprint SMALLER?',
        options: [
          'Leaving the TV on all night',
          'Asking parents to drive everywhere',
          'Turning off lights when leaving a room',
          'Throwing everything in the trash'
        ],
        correctAnswer: 'Turning off lights when leaving a room',
        explanation: 'Turning off lights saves energy and makes your footprint smaller!',
        points: 10,
        difficulty: 1
      },
      {
        id: 'round-4',
        type: 'true_false',
        question: 'Planting trees helps Earth breathe better',
        correctAnswer: 'True',
        explanation: 'Trees breathe in the carbon that makes big footprints and give us fresh air!',
        points: 10,
        difficulty: 1
      },
      {
        id: 'round-5',
        type: 'multiple_choice',
        question: 'Why do we want smaller carbon footprints?',
        options: [
          'So our feet look smaller',
          'So Earth stays healthy and happy',
          'So we can run faster',
          'Carbon footprints are scary'
        ],
        correctAnswer: 'So Earth stays healthy and happy',
        explanation: 'Smaller footprints help keep Earth at the right temperature!',
        points: 10,
        difficulty: 1
      }
    ],
    starThresholds: {
      oneStar: 50,
      twoStar: 70,
      threeStar: 90
    },
    passingScore: 50
  }
}

// ============================================
// HIGH SCHOOL LEVEL (Ages 14-17)
// ============================================

const highSchoolContent: LevelContent = {
  level: 'HIGH_SCHOOL',
  estimatedMinutes: 30,
  readingLevel: 'Grade 9-12',

  introduction: `
    <div class="space-y-3">
      <p>Carbon footprint: a term you've probably heard, but what does it actually mean, and why should you care?</p>
      <p>In this module, we'll break down the science behind carbon emissions, explore how everyday choices impact the climate, and discover practical ways to reduce your personal environmental impact.</p>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
        <p class="font-medium">By the end of this module, you'll be able to:</p>
        <ul class="list-disc list-inside mt-2 text-sm space-y-1">
          <li>Define and calculate your personal carbon footprint</li>
          <li>Understand the main sources of carbon emissions</li>
          <li>Identify actionable steps to reduce your impact</li>
        </ul>
      </div>
    </div>
  `,

  sections: [
    {
      id: 'hs-section-1',
      title: 'Understanding Carbon Footprints',
      content: `
        <p>A <strong>carbon footprint</strong> measures the total greenhouse gas emissions caused by an individual, organization, event, or product, expressed as carbon dioxide equivalent (CO₂e).</p>

        <h4 class="font-semibold mt-4 mb-2">The Global Picture</h4>
        <p>The average American has a carbon footprint of approximately <strong>16 tons of CO₂e per year</strong> - one of the highest in the world. Compare this to the global average of about 4 tons.</p>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-3xl font-bold text-red-500">16</p>
            <p class="text-sm text-gray-500">tons CO₂e/year<br/>US Average</p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-3xl font-bold text-green-500">2</p>
            <p class="text-sm text-gray-500">tons CO₂e/year<br/>Sustainable Target</p>
          </div>
        </div>

        <p class="mt-4">To limit global warming to 1.5°C, the target set by the Paris Agreement, we need to reduce individual footprints to about <strong>2 tons per person by 2050</strong>.</p>
      `,
      checkpoint: {
        question: 'What is the approximate carbon footprint of the average American?',
        options: ['4 tons/year', '8 tons/year', '16 tons/year', '24 tons/year'],
        correctAnswer: '16 tons/year',
        explanation: 'The average American produces about 16 tons of CO₂e annually, which is 4x the global average.'
      }
    },
    {
      id: 'hs-section-2',
      title: 'Breaking Down Your Footprint',
      content: `
        <p>Your carbon footprint comes from several key areas:</p>

        <div class="space-y-4 mt-4">
          <div class="flex items-center gap-4 p-3 border rounded-lg">
            <span class="text-3xl">🚗</span>
            <div class="flex-1">
              <p class="font-medium">Transportation (29%)</p>
              <p class="text-sm text-gray-500">Cars, flights, public transit</p>
            </div>
            <span class="text-lg font-bold text-orange-500">~4.6 tons</span>
          </div>

          <div class="flex items-center gap-4 p-3 border rounded-lg">
            <span class="text-3xl">🏠</span>
            <div class="flex-1">
              <p class="font-medium">Home Energy (25%)</p>
              <p class="text-sm text-gray-500">Heating, cooling, electricity</p>
            </div>
            <span class="text-lg font-bold text-orange-500">~4 tons</span>
          </div>

          <div class="flex items-center gap-4 p-3 border rounded-lg">
            <span class="text-3xl">🍔</span>
            <div class="flex-1">
              <p class="font-medium">Food (16%)</p>
              <p class="text-sm text-gray-500">Production, transport, waste</p>
            </div>
            <span class="text-lg font-bold text-orange-500">~2.5 tons</span>
          </div>

          <div class="flex items-center gap-4 p-3 border rounded-lg">
            <span class="text-3xl">🛍️</span>
            <div class="flex-1">
              <p class="font-medium">Goods & Services (30%)</p>
              <p class="text-sm text-gray-500">Manufacturing, shipping</p>
            </div>
            <span class="text-lg font-bold text-orange-500">~4.9 tons</span>
          </div>
        </div>
      `
    },
    {
      id: 'hs-section-3',
      title: 'Taking Action',
      content: `
        <p>Here are the most impactful changes you can make:</p>

        <div class="space-y-4 mt-4">
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 class="font-semibold text-green-700 dark:text-green-300">High Impact Actions</h5>
            <ul class="mt-2 space-y-2 text-sm">
              <li>🚗 Drive less: carpool, bike, or use public transit (-2.5 tons/year potential)</li>
              <li>✈️ Reduce air travel: one transatlantic flight = ~1.6 tons CO₂e</li>
              <li>🥗 Eat less meat: plant-based diet can save up to 2 tons/year</li>
            </ul>
          </div>

          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 class="font-semibold text-blue-700 dark:text-blue-300">Medium Impact Actions</h5>
            <ul class="mt-2 space-y-2 text-sm">
              <li>💡 Switch to LED bulbs and energy-efficient appliances</li>
              <li>🌡️ Adjust thermostat by 2°F (saves ~2,000 lbs CO₂/year)</li>
              <li>👕 Buy secondhand, reduce fast fashion</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p class="font-medium">💡 Pro Tip</p>
          <p class="text-sm mt-1">Calculate your personal footprint using online tools like the EPA's carbon calculator or carbonfootprint.com to see where you can make the biggest impact.</p>
        </div>
      `
    }
  ],

  summary: `
    <div class="space-y-3">
      <p>Your carbon footprint represents your total contribution to greenhouse gas emissions. The average American's footprint of 16 tons is far above the sustainable target of 2 tons.</p>
      <p>The biggest opportunities for reduction come from:</p>
      <ul class="list-disc list-inside">
        <li>Transportation choices</li>
        <li>Home energy efficiency</li>
        <li>Dietary decisions</li>
        <li>Consumer behavior</li>
      </ul>
      <p>Small changes add up - reducing your footprint by even 20% makes a meaningful difference!</p>
    </div>
  `,

  objectives: [
    'Define carbon footprint and explain its measurement in CO₂ equivalent',
    'Identify the four main categories contributing to personal emissions',
    'Calculate the relative impact of different lifestyle choices',
    'Develop a personal action plan to reduce carbon emissions'
  ],

  keyTerms: [
    {
      term: 'Carbon Footprint',
      definition: 'The total greenhouse gas emissions caused by an individual, organization, event, or product, typically expressed in tons of carbon dioxide equivalent (CO₂e)',
      example: 'A round-trip flight from New York to London adds about 1.6 tons to your carbon footprint'
    },
    {
      term: 'CO₂ Equivalent (CO₂e)',
      definition: 'A standard unit for measuring carbon footprints that expresses the impact of different greenhouse gases in terms of the amount of CO₂ that would create the same warming effect',
      example: 'Methane is 25x more potent than CO₂, so 1 ton of methane = 25 tons CO₂e'
    },
    {
      term: 'Paris Agreement',
      definition: 'An international treaty (2015) where nations committed to limiting global warming to 1.5°C above pre-industrial levels by reducing greenhouse gas emissions',
      example: 'Under the Paris Agreement, the US pledged to cut emissions 50-52% below 2005 levels by 2030'
    },
    {
      term: 'Carbon Offset',
      definition: 'A reduction in GHG emissions made to compensate for emissions made elsewhere',
      example: 'Planting trees or investing in renewable energy projects can offset personal emissions'
    }
  ],

  activities: [
    {
      id: 'hs-activity-1',
      type: 'SIMULATION',
      title: 'Carbon Footprint Calculator',
      instructions: 'Adjust the sliders to see how different lifestyle choices affect your annual carbon footprint.',
      points: 100,
      required: true,
      config: {
        scenario: 'Explore how your daily choices impact your total carbon emissions.',
        variables: [
          { id: 'car-miles', name: 'carMiles', label: 'Miles driven per week', min: 0, max: 500, step: 10, defaultValue: 200, unit: 'miles' },
          { id: 'flights', name: 'flights', label: 'Round-trip flights per year', min: 0, max: 20, step: 1, defaultValue: 2 },
          { id: 'meat-meals', name: 'meatMeals', label: 'Meat meals per week', min: 0, max: 21, step: 1, defaultValue: 10 },
          { id: 'home-temp', name: 'homeTemp', label: 'Home temperature setting', min: 60, max: 80, step: 1, defaultValue: 72, unit: '°F' }
        ],
        formula: '(carMiles * 52 * 0.404 / 1000) + (flights * 1.6) + (meatMeals * 52 * 0.05) + ((homeTemp - 68) * 0.1)',
        targetRange: { min: 0, max: 8 },
        resultLabel: 'Estimated Annual Footprint',
        resultUnit: 'tons CO₂e',
        explanation: 'Try to get your footprint below 8 tons by making sustainable choices!'
      }
    }
  ],

  learningGame: {
    id: 'hs-game-1',
    title: 'Carbon Footprint Challenge',
    description: 'Test your knowledge about carbon footprints and climate action!',
    totalRounds: 10,
    livesCount: 3,
    basePoints: 10,
    streakMultiplier: 1.0,
    timeBonusEnabled: true,
    timeBonusPointsPerSecond: 1,
    rounds: [
      {
        id: 'hs-round-1',
        type: 'multiple_choice',
        question: 'What is the approximate carbon footprint of the average American?',
        options: ['4 tons CO₂e/year', '8 tons CO₂e/year', '16 tons CO₂e/year', '24 tons CO₂e/year'],
        correctAnswer: '16 tons CO₂e/year',
        explanation: 'Americans have one of the highest per capita carbon footprints in the world at about 16 tons, compared to the global average of 4 tons.',
        points: 10,
        difficulty: 2,
        timeLimit: 20
      },
      {
        id: 'hs-round-2',
        type: 'multiple_choice',
        question: 'Which sector contributes most to the average American\'s carbon footprint?',
        options: ['Food production', 'Home energy', 'Transportation', 'Goods & Services'],
        correctAnswer: 'Goods & Services',
        explanation: 'Goods and services account for about 30% of emissions, slightly more than transportation (29%).',
        points: 10,
        difficulty: 3,
        timeLimit: 20
      },
      {
        id: 'hs-round-3',
        type: 'true_false',
        question: 'A single round-trip transatlantic flight can add over 1 ton of CO₂ to your footprint',
        correctAnswer: 'True',
        explanation: 'A round-trip flight from NYC to London produces about 1.6 tons of CO₂e - nearly the entire sustainable annual budget!',
        points: 10,
        difficulty: 2,
        timeLimit: 15
      },
      {
        id: 'hs-round-4',
        type: 'multiple_choice',
        question: 'What is the sustainable carbon footprint target per person by 2050?',
        options: ['1 ton', '2 tons', '4 tons', '8 tons'],
        correctAnswer: '2 tons',
        explanation: 'To limit warming to 1.5°C per the Paris Agreement, we need to reduce to about 2 tons per person.',
        points: 10,
        difficulty: 3,
        timeLimit: 20
      },
      {
        id: 'hs-round-5',
        type: 'multiple_choice',
        question: 'Which dietary change has the highest impact on reducing carbon footprint?',
        options: [
          'Buying organic produce',
          'Eating locally grown food',
          'Reducing meat consumption',
          'Avoiding packaged foods'
        ],
        correctAnswer: 'Reducing meat consumption',
        explanation: 'Meat production, especially beef, has a very high carbon footprint. Going plant-based can save up to 2 tons/year.',
        points: 10,
        difficulty: 2,
        timeLimit: 20
      },
      {
        id: 'hs-round-6',
        type: 'fill_blank',
        question: 'What does "CO₂e" stand for?',
        correctAnswer: 'carbon dioxide equivalent',
        explanation: 'CO₂e (carbon dioxide equivalent) standardizes the impact of different greenhouse gases.',
        points: 15,
        difficulty: 3,
        timeLimit: 30
      },
      {
        id: 'hs-round-7',
        type: 'true_false',
        question: 'Carpooling with 3 others can reduce your transportation emissions by 75%',
        correctAnswer: 'True',
        explanation: 'When you split a car trip 4 ways, each person is responsible for only 1/4 of the emissions.',
        points: 10,
        difficulty: 2,
        timeLimit: 15
      },
      {
        id: 'hs-round-8',
        type: 'multiple_choice',
        question: 'Adjusting your thermostat by how many degrees can save ~2,000 lbs of CO₂ annually?',
        options: ['1°F', '2°F', '5°F', '10°F'],
        correctAnswer: '2°F',
        explanation: 'Small adjustments - 2° lower in winter, 2° higher in summer - significantly reduce energy use.',
        points: 10,
        difficulty: 2,
        timeLimit: 20
      },
      {
        id: 'hs-round-9',
        type: 'true_false',
        question: 'The fashion industry contributes more to global emissions than aviation',
        correctAnswer: 'True',
        explanation: 'Fast fashion accounts for about 10% of global carbon emissions, while aviation accounts for about 2.5%.',
        points: 15,
        difficulty: 4,
        timeLimit: 15
      },
      {
        id: 'hs-round-10',
        type: 'multiple_choice',
        question: 'What is a carbon offset?',
        options: [
          'A tax on carbon emissions',
          'A measurement of CO₂ in the atmosphere',
          'An investment to compensate for emissions made elsewhere',
          'A type of renewable energy'
        ],
        correctAnswer: 'An investment to compensate for emissions made elsewhere',
        explanation: 'Carbon offsets fund projects that reduce emissions (like tree planting) to balance out your own emissions.',
        points: 10,
        difficulty: 2,
        timeLimit: 25
      }
    ],
    starThresholds: {
      oneStar: 60,
      twoStar: 80,
      threeStar: 95
    },
    passingScore: 60
  }
}

// ============================================
// EXPORT ALL LEVEL CONTENT
// ============================================

export const carbonFootprintLevelContent: Record<LearningLevel, LevelContent> = {
  ELEMENTARY: elementaryContent,
  MIDDLE_SCHOOL: {
    ...elementaryContent, // Placeholder - would be properly customized
    level: 'MIDDLE_SCHOOL',
    estimatedMinutes: 20,
    readingLevel: 'Grade 6-8'
  },
  HIGH_SCHOOL: highSchoolContent,
  UNDERGRADUATE: {
    ...highSchoolContent, // Placeholder - would be properly customized
    level: 'UNDERGRADUATE',
    estimatedMinutes: 45,
    readingLevel: 'College'
  },
  GRADUATE: {
    ...highSchoolContent, // Placeholder - would be properly customized
    level: 'GRADUATE',
    estimatedMinutes: 60,
    readingLevel: 'Graduate'
  },
  PHD: {
    ...highSchoolContent, // Placeholder - would be properly customized
    level: 'PHD',
    estimatedMinutes: 90,
    readingLevel: 'Expert'
  }
}

/**
 * Helper function to get level content for a module
 */
export function getLevelContent(
  moduleSlug: string,
  level: LearningLevel
): LevelContent | null {
  // In production, this would fetch from the database
  if (moduleSlug === 'carbon-footprint') {
    return carbonFootprintLevelContent[level]
  }
  return null
}
