'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass, Map, Target, BookOpen, Droplet, Zap, Wheat,
  ChevronRight, ChevronDown, Award, CheckCircle2, Lock, ArrowLeft, ArrowRight,
  Users, Globe, Shield, Layers, GitBranch, Scale, Clock, Play, Brain,
  Gamepad2, FileText, AlertTriangle, Lightbulb, Eye, Settings, Heart,
  Building, Sprout, Home, Network, BarChart3, Puzzle, GraduationCap
} from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

// ============================================================================
// COMPREHENSIVE EXODOLOGY CURRICULUM DATA
// ============================================================================

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'instruction' | 'interactive' | 'reflection' | 'game' | 'assessment'
  description: string
  learningObjectives?: string[]
  keyTerms?: { term: string; definition: string }[]
  available: boolean
}

interface Module {
  id: string
  week: number
  title: string
  subtitle: string
  description: string
  icon: any
  lessons: Lesson[]
  assessment?: {
    type: 'quiz' | 'challenge' | 'project'
    title: string
    description: string
  }
}

interface ExodologyPath {
  id: string
  title: string
  subtitle: string
  description: string
  level: string
  duration: string
  heroEmoji: string
  color: string
  gradient: string
  overview: string
  philosophy: string
  whatYoullLearn: string[]
  modules: Module[]
  certification: {
    name: string
    description: string
    requirements: string[]
  }
  capstone?: {
    title: string
    description: string
    deliverables: string[]
  }
}

// ============================================================================
// FOUNDATIONS OF EXODOLOGY - Complete Curriculum
// ============================================================================

const foundationsPath: ExodologyPath = {
  id: 'foundations',
  title: 'FOUNDATIONS OF EXODOLOGY',
  subtitle: 'Exodological Literacy',
  description: 'Understanding exit as a social, ethical, and systems-level phenomenon, especially where sustainability efforts reach structural limits.',
  level: 'Beginner',
  duration: '6 weeks',
  heroEmoji: '🧭',
  color: 'amber',
  gradient: 'from-amber-500 to-orange-600',
  overview: 'This foundational path builds your conceptual fluency in Exodology—the study of ethical exits from systems that no longer serve people or the planet. You will learn to distinguish between exit, reform, and collapse; understand why systems fail; and develop the ethical frameworks needed to guide responsible transitions. Through case studies in food, water, and energy systems, you will build the systems literacy essential for advanced Exodology practice.',
  philosophy: 'Before you can design exits, you must understand why people leave, what they leave behind, and what ethical responsibilities departure entails.',
  whatYoullLearn: [
    'Define Exodology and distinguish it from sustainability and collapse studies',
    'Analyze systems using dependency and failure frameworks',
    'Evaluate the ethics of exit across different contexts',
    'Apply Exodology concepts to food, water, and energy systems',
    'Recognize psychological and cultural barriers to system departure',
    'Determine when exit is and is not the appropriate response'
  ],
  modules: [
    {
      id: 'f-m1',
      week: 1,
      title: 'Introduction to Exodology',
      subtitle: 'Defining the Discipline',
      description: 'Establish foundational understanding of Exodology as a distinct field of study and practice.',
      icon: Compass,
      lessons: [
        {
          id: 'f-m1-l1',
          title: 'What is Exodology?',
          duration: '20 min',
          type: 'instruction',
          description: 'Define Exodology, its origins, and its relationship to sustainability, resilience, and systems thinking.',
          learningObjectives: [
            'Define Exodology in precise terms',
            'Explain how Exodology differs from related fields',
            'Identify the three pillars of Exodology practice'
          ],
          keyTerms: [
            { term: 'Exodology', definition: 'The study and practice of designing ethical exits from systems that no longer serve people or the planet.' },
            { term: 'System Exit', definition: 'A deliberate, planned departure from a dependent relationship with a system.' },
            { term: 'Exit Capability', definition: 'The structural capacity of individuals or communities to leave a system when needed.' }
          ],
          available: true
        },
        {
          id: 'f-m1-l2',
          title: 'The Exodology Trinity',
          duration: '15 min',
          type: 'instruction',
          description: 'Understand the three interconnected pillars: Literacy, Application, and Stewardship.',
          learningObjectives: [
            'Describe the three pillars of Exodology',
            'Explain how the pillars build upon each other',
            'Recognize the certification pathway'
          ],
          available: true
        },
        {
          id: 'f-m1-l3',
          title: 'Key Terms Flashcards',
          duration: '10 min',
          type: 'game',
          description: 'Master foundational Exodology vocabulary through interactive flashcard exercises.',
          available: true
        },
        {
          id: 'f-m1-l4',
          title: 'Why Exodology Now?',
          duration: '18 min',
          type: 'instruction',
          description: 'Examine the historical and contemporary contexts that make Exodology a necessary discipline.',
          learningObjectives: [
            'Identify systemic pressures driving interest in exit strategies',
            'Analyze historical examples of mass system departures',
            'Connect current events to Exodology principles'
          ],
          available: true
        },
        {
          id: 'f-m1-l5',
          title: 'Reflection: Your Relationship with Systems',
          duration: '12 min',
          type: 'reflection',
          description: 'Reflect on systems you depend on and your current exit capabilities.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Module 1 Knowledge Check',
        description: 'Test your understanding of Exodology fundamentals.'
      }
    },
    {
      id: 'f-m2',
      week: 1,
      title: 'Exit vs Reform vs Collapse',
      subtitle: 'Understanding the Spectrum',
      description: 'Learn to distinguish between different responses to failing systems and when each is appropriate.',
      icon: GitBranch,
      lessons: [
        {
          id: 'f-m2-l1',
          title: 'The Response Spectrum',
          duration: '22 min',
          type: 'instruction',
          description: 'Map the full range of responses to system dysfunction: optimization, reform, exit, and collapse.',
          learningObjectives: [
            'Define each response type on the spectrum',
            'Identify indicators for each response type',
            'Analyze real-world examples of each'
          ],
          keyTerms: [
            { term: 'System Reform', definition: 'Efforts to improve a system while remaining within its fundamental structure.' },
            { term: 'System Collapse', definition: 'Unplanned, chaotic disintegration of a system without managed transition.' },
            { term: 'Strategic Exit', definition: 'Deliberate, planned departure that preserves value and relationships.' }
          ],
          available: true
        },
        {
          id: 'f-m2-l2',
          title: 'When Reform Reaches Its Limits',
          duration: '20 min',
          type: 'instruction',
          description: 'Recognize the structural indicators that suggest reform is no longer viable.',
          learningObjectives: [
            'Identify signs of reform exhaustion',
            'Distinguish between tactical and structural limits',
            'Apply the reform-limit framework to case studies'
          ],
          available: true
        },
        {
          id: 'f-m2-l3',
          title: 'Matching Game: Response Types',
          duration: '10 min',
          type: 'game',
          description: 'Match scenarios to appropriate response types (reform, exit, or managed transition).',
          available: true
        },
        {
          id: 'f-m2-l4',
          title: 'Collapse: What Exodology Seeks to Prevent',
          duration: '18 min',
          type: 'instruction',
          description: 'Understand the characteristics of collapse and why managed exits are preferable.',
          learningObjectives: [
            'Define system collapse and its consequences',
            'Contrast collapse with managed transition',
            'Explain how Exodology prevents collapse'
          ],
          available: true
        },
        {
          id: 'f-m2-l5',
          title: 'Scenario Analysis: Exit or Reform?',
          duration: '15 min',
          type: 'interactive',
          description: 'Analyze real-world scenarios and determine the appropriate response type.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Response Spectrum Analysis',
        description: 'Analyze a provided case study and justify your recommended response.'
      }
    },
    {
      id: 'f-m3',
      week: 2,
      title: 'Why People Leave Systems',
      subtitle: 'Understanding Exit Motivations',
      description: 'Explore the diverse reasons individuals and communities choose to exit established systems.',
      icon: Users,
      lessons: [
        {
          id: 'f-m3-l1',
          title: 'Push and Pull Factors',
          duration: '20 min',
          type: 'instruction',
          description: 'Understand the forces that push people out of systems and pull them toward alternatives.',
          learningObjectives: [
            'Categorize exit motivations as push or pull factors',
            'Analyze the interplay between different motivation types',
            'Apply the push-pull framework to historical examples'
          ],
          keyTerms: [
            { term: 'Push Factors', definition: 'Conditions within a system that drive people to seek exit.' },
            { term: 'Pull Factors', definition: 'Attractions of alternatives that draw people away from current systems.' },
            { term: 'Exit Threshold', definition: 'The point at which push factors overcome inertia and barriers to exit.' }
          ],
          available: true
        },
        {
          id: 'f-m3-l2',
          title: 'Economic Exit Drivers',
          duration: '18 min',
          type: 'instruction',
          description: 'Examine how economic factors motivate system departure.',
          available: true
        },
        {
          id: 'f-m3-l3',
          title: 'Social and Cultural Exit Drivers',
          duration: '18 min',
          type: 'instruction',
          description: 'Explore social, cultural, and identity-based motivations for exit.',
          available: true
        },
        {
          id: 'f-m3-l4',
          title: 'Environmental Exit Drivers',
          duration: '15 min',
          type: 'instruction',
          description: 'Understand environmental degradation as an exit catalyst.',
          available: true
        },
        {
          id: 'f-m3-l5',
          title: 'Drag-and-Drop: Mapping Exit Motivations',
          duration: '12 min',
          type: 'game',
          description: 'Categorize various exit motivations into their proper frameworks.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Exit Motivation Assessment',
        description: 'Demonstrate understanding of why people leave systems.'
      }
    },
    {
      id: 'f-m4',
      week: 2,
      title: 'Historical and Modern Exoduses',
      subtitle: 'Learning from the Past',
      description: 'Study historical examples of mass system departures and extract applicable lessons.',
      icon: BookOpen,
      lessons: [
        {
          id: 'f-m4-l1',
          title: 'The Great Migration and Economic Systems',
          duration: '22 min',
          type: 'instruction',
          description: 'Analyze the Great Migration as an example of economic system exit.',
          available: true
        },
        {
          id: 'f-m4-l2',
          title: 'Agricultural Transitions Throughout History',
          duration: '20 min',
          type: 'instruction',
          description: 'Examine how societies have transitioned between agricultural systems.',
          available: true
        },
        {
          id: 'f-m4-l3',
          title: 'Energy Transitions: From Wood to Coal to Oil',
          duration: '20 min',
          type: 'instruction',
          description: 'Study historical energy system transitions as Exodology case studies.',
          available: true
        },
        {
          id: 'f-m4-l4',
          title: 'Modern Exit Movements',
          duration: '18 min',
          type: 'instruction',
          description: 'Survey contemporary examples of system exit across food, energy, and governance.',
          available: true
        },
        {
          id: 'f-m4-l5',
          title: 'Timeline Challenge: Historical Exits',
          duration: '12 min',
          type: 'game',
          description: 'Place historical exits in chronological order and identify patterns.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Historical Patterns Assessment',
        description: 'Identify patterns across historical system exits.'
      }
    },
    {
      id: 'f-m5',
      week: 3,
      title: 'Food System Failures',
      subtitle: 'Case Study: Agriculture',
      description: 'Apply Exodology frameworks to understand industrial food system vulnerabilities.',
      icon: Wheat,
      lessons: [
        {
          id: 'f-m5-l1',
          title: 'Industrial Agriculture Dependencies',
          duration: '22 min',
          type: 'instruction',
          description: 'Map the dependencies embedded in industrial food systems.',
          learningObjectives: [
            'Identify key dependencies in industrial agriculture',
            'Analyze supply chain vulnerabilities',
            'Evaluate system resilience gaps'
          ],
          available: true
        },
        {
          id: 'f-m5-l2',
          title: 'Food System Failure Modes',
          duration: '20 min',
          type: 'instruction',
          description: 'Understand how and why industrial food systems fail communities.',
          available: true
        },
        {
          id: 'f-m5-l3',
          title: 'Food Sovereignty Movements',
          duration: '18 min',
          type: 'instruction',
          description: 'Examine successful examples of food system exit and alternatives.',
          available: true
        },
        {
          id: 'f-m5-l4',
          title: 'Interactive: Food System Mapping',
          duration: '15 min',
          type: 'interactive',
          description: 'Map your own food dependencies and identify potential exit points.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Food System Analysis',
        description: 'Analyze a real community\'s food system dependencies.'
      }
    },
    {
      id: 'f-m6',
      week: 3,
      title: 'Water System Failures',
      subtitle: 'Case Study: Water Access',
      description: 'Apply Exodology frameworks to water systems and water justice.',
      icon: Droplet,
      lessons: [
        {
          id: 'f-m6-l1',
          title: 'Water System Dependencies',
          duration: '20 min',
          type: 'instruction',
          description: 'Map dependencies in centralized water infrastructure.',
          available: true
        },
        {
          id: 'f-m6-l2',
          title: 'When Water Systems Fail',
          duration: '20 min',
          type: 'instruction',
          description: 'Case studies: Flint, Cape Town, and other water crises.',
          available: true
        },
        {
          id: 'f-m6-l3',
          title: 'Water Commons and Exit Alternatives',
          duration: '18 min',
          type: 'instruction',
          description: 'Explore community-controlled water systems as exit destinations.',
          available: true
        },
        {
          id: 'f-m6-l4',
          title: 'Matching Game: Water Failure Modes',
          duration: '10 min',
          type: 'game',
          description: 'Match water system failures to their underlying causes.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Water Systems Knowledge Check',
        description: 'Test understanding of water system Exodology.'
      }
    },
    {
      id: 'f-m7',
      week: 4,
      title: 'Energy System Failures',
      subtitle: 'Case Study: Power and Grid',
      description: 'Apply Exodology to centralized energy systems and transition strategies.',
      icon: Zap,
      lessons: [
        {
          id: 'f-m7-l1',
          title: 'Grid Dependencies and Vulnerabilities',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand the dependencies embedded in centralized power grids.',
          available: true
        },
        {
          id: 'f-m7-l2',
          title: 'Energy System Failure Patterns',
          duration: '18 min',
          type: 'instruction',
          description: 'Analyze how energy systems fail and who bears the consequences.',
          available: true
        },
        {
          id: 'f-m7-l3',
          title: 'Microgrids and Energy Independence',
          duration: '20 min',
          type: 'instruction',
          description: 'Explore decentralized alternatives as exit destinations.',
          available: true
        },
        {
          id: 'f-m7-l4',
          title: 'Scenario Builder: Energy Exit Planning',
          duration: '15 min',
          type: 'interactive',
          description: 'Design an energy exit strategy for a hypothetical community.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Energy Transition Design',
        description: 'Propose an energy exit strategy for a given scenario.'
      }
    },
    {
      id: 'f-m8',
      week: 4,
      title: 'Ethics of Exit',
      subtitle: 'Responsibility and Departure',
      description: 'Develop ethical frameworks for responsible system departure.',
      icon: Scale,
      lessons: [
        {
          id: 'f-m8-l1',
          title: 'The Moral Landscape of Exit',
          duration: '22 min',
          type: 'instruction',
          description: 'Explore the ethical dimensions of choosing to leave versus staying to reform.',
          learningObjectives: [
            'Articulate key ethical considerations in exit decisions',
            'Apply ethical frameworks to exit scenarios',
            'Balance individual and collective responsibilities'
          ],
          keyTerms: [
            { term: 'Exit Ethics', definition: 'The moral principles governing responsible system departure.' },
            { term: 'Transition Responsibility', definition: 'Obligations to those affected by one\'s exit from a system.' },
            { term: 'Residual Duty', definition: 'Continuing obligations to those who remain in systems we leave.' }
          ],
          available: true
        },
        {
          id: 'f-m8-l2',
          title: 'Responsibilities to Those Who Stay',
          duration: '18 min',
          type: 'instruction',
          description: 'Consider ethical obligations to those who cannot or choose not to exit.',
          available: true
        },
        {
          id: 'f-m8-l3',
          title: 'When Exit is Harmful',
          duration: '18 min',
          type: 'instruction',
          description: 'Recognize when exit can cause more harm than good.',
          available: true
        },
        {
          id: 'f-m8-l4',
          title: 'Ethical Dilemma Scenarios',
          duration: '15 min',
          type: 'interactive',
          description: 'Navigate complex ethical scenarios involving system exit.',
          available: true
        },
        {
          id: 'f-m8-l5',
          title: 'Reflection: Your Exit Ethics',
          duration: '12 min',
          type: 'reflection',
          description: 'Develop your personal ethical framework for exit decisions.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Ethics Assessment',
        description: 'Demonstrate ethical reasoning in exit scenarios.'
      }
    },
    {
      id: 'f-m9',
      week: 5,
      title: 'Barriers to Exit',
      subtitle: 'Psychological and Cultural Lock-in',
      description: 'Understand the psychological, social, and cultural factors that prevent system departure.',
      icon: Lock,
      lessons: [
        {
          id: 'f-m9-l1',
          title: 'Psychological Lock-in',
          duration: '20 min',
          type: 'instruction',
          description: 'Explore cognitive biases and psychological patterns that prevent exit.',
          available: true
        },
        {
          id: 'f-m9-l2',
          title: 'Social and Cultural Barriers',
          duration: '18 min',
          type: 'instruction',
          description: 'Understand how social ties and cultural norms inhibit system departure.',
          available: true
        },
        {
          id: 'f-m9-l3',
          title: 'Economic Lock-in Mechanisms',
          duration: '18 min',
          type: 'instruction',
          description: 'Analyze how economic dependencies create exit barriers.',
          available: true
        },
        {
          id: 'f-m9-l4',
          title: 'Barrier Assessment Tool',
          duration: '15 min',
          type: 'interactive',
          description: 'Assess your own barriers to exit across different systems.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Barrier Recognition Assessment',
        description: 'Identify and categorize barriers to exit.'
      }
    },
    {
      id: 'f-m10',
      week: 5,
      title: 'When Not to Exit',
      subtitle: 'Strategic Patience',
      description: 'Learn to recognize when reform is still viable and exit would be premature or harmful.',
      icon: AlertTriangle,
      lessons: [
        {
          id: 'f-m10-l1',
          title: 'Premature Exit',
          duration: '18 min',
          type: 'instruction',
          description: 'Recognize conditions where exit is premature and reform remains viable.',
          available: true
        },
        {
          id: 'f-m10-l2',
          title: 'Harmful Exit Patterns',
          duration: '18 min',
          type: 'instruction',
          description: 'Identify exit patterns that cause more harm than good.',
          available: true
        },
        {
          id: 'f-m10-l3',
          title: 'The Stay-and-Fight Option',
          duration: '15 min',
          type: 'instruction',
          description: 'Understand when staying to reform is the ethical choice.',
          available: true
        },
        {
          id: 'f-m10-l4',
          title: 'Decision Framework: Exit or Stay?',
          duration: '15 min',
          type: 'interactive',
          description: 'Apply a structured decision framework to complex scenarios.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Exit Decision Analysis',
        description: 'Apply the full decision framework to a comprehensive case study.'
      }
    },
    {
      id: 'f-m11',
      week: 6,
      title: 'Foundations Synthesis',
      subtitle: 'Integration and Assessment',
      description: 'Integrate all foundational concepts and demonstrate mastery.',
      icon: GraduationCap,
      lessons: [
        {
          id: 'f-m11-l1',
          title: 'Concept Integration Review',
          duration: '25 min',
          type: 'instruction',
          description: 'Review and connect all foundational Exodology concepts.',
          available: true
        },
        {
          id: 'f-m11-l2',
          title: 'Comprehensive Flashcard Challenge',
          duration: '15 min',
          type: 'game',
          description: 'Master all key terms from the Foundations path.',
          available: true
        },
        {
          id: 'f-m11-l3',
          title: 'Final Case Study Analysis',
          duration: '30 min',
          type: 'interactive',
          description: 'Apply all frameworks to a comprehensive real-world case.',
          available: true
        },
        {
          id: 'f-m11-l4',
          title: 'Reflection: Your Exodology Journey',
          duration: '15 min',
          type: 'reflection',
          description: 'Reflect on your learning and prepare for Applied Exodology.',
          available: true
        }
      ],
      assessment: {
        type: 'quiz',
        title: 'Foundations Final Assessment',
        description: 'Comprehensive assessment of all Foundations concepts.'
      }
    }
  ],
  certification: {
    name: 'Exodological Literacy',
    description: 'Demonstrates foundational understanding of Exodology principles and frameworks.',
    requirements: [
      'Complete all 11 modules',
      'Pass all module assessments with 80% or higher',
      'Complete all reflection exercises',
      'Finish comprehensive final assessment'
    ]
  }
}

// ============================================================================
// APPLIED EXODOLOGY - Complete Curriculum
// ============================================================================

const appliedPath: ExodologyPath = {
  id: 'applied',
  title: 'APPLIED EXODOLOGY',
  subtitle: 'Exodological Application',
  description: 'Designing and evaluating exit-capable systems, with emphasis on decentralized food, water, and energy solutions.',
  level: 'Intermediate',
  duration: '8 weeks',
  heroEmoji: '🗺️',
  color: 'teal',
  gradient: 'from-teal-500 to-cyan-600',
  overview: 'Building on your foundational literacy, this intermediate path teaches you to design, evaluate, and support exit-capable systems. You will learn practical skills for mapping dependencies, designing decentralized alternatives in food, water, and energy, and managing the complex realities of partial exits and hybrid systems. By the end, you will be capable of advising real projects and communities.',
  philosophy: 'Understanding is necessary but not sufficient. Exodology must be practiced—through design, building, and supporting communities in transition.',
  whatYoullLearn: [
    'Map system dependencies and identify exit leverage points',
    'Design decentralized food production and distribution systems',
    'Develop water autonomy strategies for communities',
    'Plan energy microgrids and off-grid solutions',
    'Navigate partial exits and hybrid system arrangements',
    'Measure and improve system autonomy and resilience'
  ],
  modules: [
    {
      id: 'a-m1',
      week: 1,
      title: 'Mapping Dependencies',
      subtitle: 'System Analysis for Exit',
      description: 'Learn practical methods for mapping and analyzing system dependencies.',
      icon: Network,
      lessons: [
        {
          id: 'a-m1-l1',
          title: 'Dependency Mapping Fundamentals',
          duration: '25 min',
          type: 'instruction',
          description: 'Learn the core methodology for mapping system dependencies.',
          learningObjectives: [
            'Create comprehensive dependency maps',
            'Identify critical nodes and single points of failure',
            'Analyze dependency chains and cascading risks'
          ],
          keyTerms: [
            { term: 'Dependency Map', definition: 'A visual representation of how a system relies on external inputs, services, and resources.' },
            { term: 'Critical Node', definition: 'A point in a dependency chain whose failure would cause system breakdown.' },
            { term: 'Exit Leverage Point', definition: 'A dependency that can be addressed to increase exit capability.' }
          ],
          available: true
        },
        {
          id: 'a-m1-l2',
          title: 'Identifying Lock-in Mechanisms',
          duration: '20 min',
          type: 'instruction',
          description: 'Recognize structural features that create dependency lock-in.',
          available: true
        },
        {
          id: 'a-m1-l3',
          title: 'Interactive: Build Your First Dependency Map',
          duration: '25 min',
          type: 'interactive',
          description: 'Create a dependency map for a real system you use.',
          available: true
        },
        {
          id: 'a-m1-l4',
          title: 'Prioritizing Exit Targets',
          duration: '20 min',
          type: 'instruction',
          description: 'Learn to prioritize which dependencies to address first.',
          available: true
        },
        {
          id: 'a-m1-l5',
          title: 'Drag-and-Drop: Dependency Classification',
          duration: '12 min',
          type: 'game',
          description: 'Classify dependencies by type, criticality, and addressability.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Dependency Mapping Project',
        description: 'Create a comprehensive dependency map for a system of your choice.'
      }
    },
    {
      id: 'a-m2',
      week: 1,
      title: 'Decentralized Food Systems',
      subtitle: 'Designing Food Autonomy',
      description: 'Design food production and distribution systems that enable community autonomy.',
      icon: Wheat,
      lessons: [
        {
          id: 'a-m2-l1',
          title: 'Principles of Food System Decentralization',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand core principles for designing decentralized food systems.',
          available: true
        },
        {
          id: 'a-m2-l2',
          title: 'Local Production Strategies',
          duration: '25 min',
          type: 'instruction',
          description: 'Explore methods for increasing local food production capacity.',
          available: true
        },
        {
          id: 'a-m2-l3',
          title: 'Distribution and Access Design',
          duration: '20 min',
          type: 'instruction',
          description: 'Design distribution systems that ensure equitable access.',
          available: true
        },
        {
          id: 'a-m2-l4',
          title: 'Case Studies: Successful Food Networks',
          duration: '18 min',
          type: 'instruction',
          description: 'Learn from existing decentralized food initiatives.',
          available: true
        },
        {
          id: 'a-m2-l5',
          title: 'Design Challenge: Community Food System',
          duration: '30 min',
          type: 'interactive',
          description: 'Design a decentralized food system for a hypothetical community.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Food System Design',
        description: 'Design a complete decentralized food system proposal.'
      }
    },
    {
      id: 'a-m3',
      week: 2,
      title: 'Water Autonomy',
      subtitle: 'Designing Water Independence',
      description: 'Develop water autonomy strategies for individuals and communities.',
      icon: Droplet,
      lessons: [
        {
          id: 'a-m3-l1',
          title: 'Water Autonomy Principles',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand principles for achieving water independence.',
          available: true
        },
        {
          id: 'a-m3-l2',
          title: 'Rainwater Harvesting Systems',
          duration: '25 min',
          type: 'instruction',
          description: 'Design effective rainwater collection and storage systems.',
          available: true
        },
        {
          id: 'a-m3-l3',
          title: 'Greywater and Blackwater Management',
          duration: '22 min',
          type: 'instruction',
          description: 'Implement water recycling and treatment systems.',
          available: true
        },
        {
          id: 'a-m3-l4',
          title: 'Commons-Based Water Governance',
          duration: '20 min',
          type: 'instruction',
          description: 'Design governance structures for shared water resources.',
          available: true
        },
        {
          id: 'a-m3-l5',
          title: 'Water System Calculator',
          duration: '20 min',
          type: 'interactive',
          description: 'Calculate water needs and design appropriate systems.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Water Autonomy Plan',
        description: 'Develop a water autonomy plan for a given scenario.'
      }
    },
    {
      id: 'a-m4',
      week: 3,
      title: 'Energy Microgrids',
      subtitle: 'Designing Energy Independence',
      description: 'Design decentralized energy systems and microgrids for community resilience.',
      icon: Zap,
      lessons: [
        {
          id: 'a-m4-l1',
          title: 'Microgrid Fundamentals',
          duration: '25 min',
          type: 'instruction',
          description: 'Understand the architecture and components of microgrids.',
          keyTerms: [
            { term: 'Microgrid', definition: 'A local energy grid that can operate independently or in conjunction with the main grid.' },
            { term: 'Islanding', definition: 'The ability of a microgrid to disconnect from the main grid and operate autonomously.' },
            { term: 'Load Balancing', definition: 'Managing energy supply and demand within a local system.' }
          ],
          available: true
        },
        {
          id: 'a-m4-l2',
          title: 'Renewable Generation Options',
          duration: '22 min',
          type: 'instruction',
          description: 'Evaluate solar, wind, hydro, and other renewable options for local generation.',
          available: true
        },
        {
          id: 'a-m4-l3',
          title: 'Storage and Distribution',
          duration: '22 min',
          type: 'instruction',
          description: 'Design energy storage and distribution for resilient microgrids.',
          available: true
        },
        {
          id: 'a-m4-l4',
          title: 'Microgrid Economics and Governance',
          duration: '20 min',
          type: 'instruction',
          description: 'Develop economic models and governance for community energy.',
          available: true
        },
        {
          id: 'a-m4-l5',
          title: 'Microgrid Design Tool',
          duration: '25 min',
          type: 'interactive',
          description: 'Use an interactive tool to design a basic microgrid.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Microgrid Design Project',
        description: 'Design a complete microgrid for a community scenario.'
      }
    },
    {
      id: 'a-m5',
      week: 4,
      title: 'Hybrid Systems',
      subtitle: 'Managing Partial Exits',
      description: 'Navigate the complexities of partial exits and hybrid system arrangements.',
      icon: Layers,
      lessons: [
        {
          id: 'a-m5-l1',
          title: 'The Reality of Partial Exit',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand why full exit is often impractical and how to manage partial transitions.',
          available: true
        },
        {
          id: 'a-m5-l2',
          title: 'Designing Hybrid Arrangements',
          duration: '20 min',
          type: 'instruction',
          description: 'Create effective hybrid systems that combine independent and connected elements.',
          available: true
        },
        {
          id: 'a-m5-l3',
          title: 'Managing Dual Dependencies',
          duration: '18 min',
          type: 'instruction',
          description: 'Navigate the complexities of operating in two systems simultaneously.',
          available: true
        },
        {
          id: 'a-m5-l4',
          title: 'Transition Pathways',
          duration: '20 min',
          type: 'instruction',
          description: 'Design gradual transition pathways from hybrid to full autonomy.',
          available: true
        },
        {
          id: 'a-m5-l5',
          title: 'Hybrid System Simulator',
          duration: '20 min',
          type: 'interactive',
          description: 'Simulate different hybrid system configurations and their outcomes.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Hybrid System Design',
        description: 'Design an optimal hybrid system for a complex scenario.'
      }
    },
    {
      id: 'a-m6',
      week: 5,
      title: 'Failure Modes',
      subtitle: 'Anticipating and Preventing Failure',
      description: 'Learn to anticipate, prevent, and recover from exit system failures.',
      icon: AlertTriangle,
      lessons: [
        {
          id: 'a-m6-l1',
          title: 'Common Exit System Failures',
          duration: '22 min',
          type: 'instruction',
          description: 'Study common failure patterns in exit-oriented systems.',
          available: true
        },
        {
          id: 'a-m6-l2',
          title: 'Designing for Resilience',
          duration: '22 min',
          type: 'instruction',
          description: 'Build systems that can withstand and recover from failures.',
          available: true
        },
        {
          id: 'a-m6-l3',
          title: 'Re-entry Planning',
          duration: '18 min',
          type: 'instruction',
          description: 'Plan for the possibility of needing to re-enter the original system.',
          available: true
        },
        {
          id: 'a-m6-l4',
          title: 'Failure Scenario Analysis',
          duration: '20 min',
          type: 'interactive',
          description: 'Analyze potential failure scenarios and design mitigations.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Resilience Assessment',
        description: 'Assess and improve the resilience of a system design.'
      }
    },
    {
      id: 'a-m7',
      week: 6,
      title: 'Measuring Autonomy',
      subtitle: 'Quantifying Independence',
      description: 'Develop metrics and methods for measuring system autonomy and resilience.',
      icon: BarChart3,
      lessons: [
        {
          id: 'a-m7-l1',
          title: 'Autonomy Metrics Framework',
          duration: '22 min',
          type: 'instruction',
          description: 'Learn standardized metrics for measuring system independence.',
          keyTerms: [
            { term: 'Autonomy Index', definition: 'A composite measure of a system\'s ability to function independently.' },
            { term: 'Resilience Score', definition: 'A measure of a system\'s ability to maintain function under stress.' },
            { term: 'Dependency Ratio', definition: 'The proportion of system function that relies on external inputs.' }
          ],
          available: true
        },
        {
          id: 'a-m7-l2',
          title: 'Resilience Assessment Methods',
          duration: '20 min',
          type: 'instruction',
          description: 'Apply methods for assessing system resilience.',
          available: true
        },
        {
          id: 'a-m7-l3',
          title: 'Tracking Progress Over Time',
          duration: '18 min',
          type: 'instruction',
          description: 'Monitor and report on autonomy progress.',
          available: true
        },
        {
          id: 'a-m7-l4',
          title: 'Autonomy Calculator',
          duration: '20 min',
          type: 'interactive',
          description: 'Calculate autonomy metrics for a system.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Autonomy Assessment Report',
        description: 'Produce a comprehensive autonomy assessment for a system.'
      }
    },
    {
      id: 'a-m8',
      week: 7,
      title: 'Community-Scale Application',
      subtitle: 'Advising Real Projects',
      description: 'Apply all skills to community-scale exit projects.',
      icon: Users,
      lessons: [
        {
          id: 'a-m8-l1',
          title: 'Community Assessment',
          duration: '25 min',
          type: 'instruction',
          description: 'Learn to assess community readiness and capacity for exit projects.',
          available: true
        },
        {
          id: 'a-m8-l2',
          title: 'Stakeholder Engagement',
          duration: '22 min',
          type: 'instruction',
          description: 'Engage diverse stakeholders in exit planning.',
          available: true
        },
        {
          id: 'a-m8-l3',
          title: 'Implementation Planning',
          duration: '22 min',
          type: 'instruction',
          description: 'Create actionable implementation plans for communities.',
          available: true
        },
        {
          id: 'a-m8-l4',
          title: 'Advisory Role Play',
          duration: '25 min',
          type: 'interactive',
          description: 'Practice advising a community through a simulated consultation.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Community Advisory Plan',
        description: 'Develop a complete advisory plan for a community project.'
      }
    },
    {
      id: 'a-m9',
      week: 8,
      title: 'Applied Synthesis',
      subtitle: 'Integration and Assessment',
      description: 'Integrate all applied skills and demonstrate practical competence.',
      icon: GraduationCap,
      lessons: [
        {
          id: 'a-m9-l1',
          title: 'Skills Integration Review',
          duration: '25 min',
          type: 'instruction',
          description: 'Review and connect all applied Exodology skills.',
          available: true
        },
        {
          id: 'a-m9-l2',
          title: 'Comprehensive Design Challenge',
          duration: '40 min',
          type: 'interactive',
          description: 'Design a complete multi-system exit plan for a community.',
          available: true
        },
        {
          id: 'a-m9-l3',
          title: 'Peer Review Exercise',
          duration: '25 min',
          type: 'interactive',
          description: 'Review and provide feedback on peer designs.',
          available: true
        },
        {
          id: 'a-m9-l4',
          title: 'Reflection: Your Applied Practice',
          duration: '15 min',
          type: 'reflection',
          description: 'Reflect on your development as an applied Exodologist.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Applied Exodology Portfolio',
        description: 'Submit a portfolio demonstrating applied Exodology competence.'
      }
    }
  ],
  certification: {
    name: 'Exodological Application',
    description: 'Demonstrates practical ability to design and advise on exit-capable systems.',
    requirements: [
      'Complete all 9 modules',
      'Submit all design projects',
      'Pass all module assessments',
      'Complete applied portfolio'
    ]
  }
}

// ============================================================================
// STRATEGIC EXODOLOGY - Complete Curriculum
// ============================================================================

const strategicPath: ExodologyPath = {
  id: 'strategic',
  title: 'STRATEGIC EXODOLOGY',
  subtitle: 'Exodological Stewardship',
  description: 'Guiding large-scale, ethical transitions and policy-aware exits without causing instability or harm.',
  level: 'Expert',
  duration: '10 weeks',
  heroEmoji: '🎯',
  color: 'purple',
  gradient: 'from-purple-500 to-indigo-600',
  overview: 'This expert path prepares you to guide large-scale, ethical transitions at the regional, national, and sector levels. You will learn to navigate policy and governance considerations, address equity and justice concerns, manage risks and backlash, and design exit-compatible institutions. The path culminates in a capstone project where you design a complete Exodology transition plan.',
  philosophy: 'Strategic Exodology is about stewardship—guiding transitions that protect the vulnerable, maintain stability, and create lasting alternatives.',
  whatYoullLearn: [
    'Apply Exodology at regional and national scales',
    'Navigate policy and governance considerations',
    'Address equity, justice, and access in transitions',
    'Manage risks, backlash, and unintended consequences',
    'Design exit-compatible institutions and governance',
    'Guide mass transitions without causing collapse'
  ],
  modules: [
    {
      id: 's-m1',
      week: 1,
      title: 'Exodology at Scale',
      subtitle: 'Regional and National Transitions',
      description: 'Apply Exodology principles to large-scale system transitions.',
      icon: Globe,
      lessons: [
        {
          id: 's-m1-l1',
          title: 'Scaling Exodology',
          duration: '25 min',
          type: 'instruction',
          description: 'Understand how Exodology principles apply differently at larger scales.',
          learningObjectives: [
            'Identify scale-specific considerations in Exodology',
            'Analyze regional and national exit scenarios',
            'Apply scalar frameworks to complex transitions'
          ],
          available: true
        },
        {
          id: 's-m1-l2',
          title: 'Regional Transition Dynamics',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand the unique dynamics of regional-scale transitions.',
          available: true
        },
        {
          id: 's-m1-l3',
          title: 'National-Scale Considerations',
          duration: '25 min',
          type: 'instruction',
          description: 'Navigate the complexities of national-level system transitions.',
          available: true
        },
        {
          id: 's-m1-l4',
          title: 'Case Study: National Energy Transitions',
          duration: '22 min',
          type: 'instruction',
          description: 'Analyze successful and failed national energy transitions.',
          available: true
        },
        {
          id: 's-m1-l5',
          title: 'Scale Assessment Tool',
          duration: '20 min',
          type: 'interactive',
          description: 'Determine appropriate scale for different exit strategies.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Scale Analysis',
        description: 'Analyze the scale implications for a given transition scenario.'
      }
    },
    {
      id: 's-m2',
      week: 2,
      title: 'Policy and Governance',
      subtitle: 'Working Within and Beyond Systems',
      description: 'Navigate policy considerations and governance structures in large-scale transitions.',
      icon: Building,
      lessons: [
        {
          id: 's-m2-l1',
          title: 'Policy Landscapes for Exit',
          duration: '25 min',
          type: 'instruction',
          description: 'Understand how policy environments enable or constrain exit.',
          available: true
        },
        {
          id: 's-m2-l2',
          title: 'Working With Existing Governance',
          duration: '22 min',
          type: 'instruction',
          description: 'Navigate existing governance structures during transitions.',
          available: true
        },
        {
          id: 's-m2-l3',
          title: 'Exit-Compatible Policy Design',
          duration: '22 min',
          type: 'instruction',
          description: 'Design policies that enable rather than prevent exit.',
          available: true
        },
        {
          id: 's-m2-l4',
          title: 'Regulatory Navigation',
          duration: '20 min',
          type: 'instruction',
          description: 'Work within regulatory frameworks while pursuing exit.',
          available: true
        },
        {
          id: 's-m2-l5',
          title: 'Policy Analysis Simulation',
          duration: '25 min',
          type: 'interactive',
          description: 'Analyze policy implications for a transition scenario.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Policy Brief',
        description: 'Write a policy brief for an exit-enabling policy proposal.'
      }
    },
    {
      id: 's-m3',
      week: 3,
      title: 'Equity and Justice',
      subtitle: 'Fair Transitions',
      description: 'Ensure equity, justice, and access in large-scale transitions.',
      icon: Scale,
      lessons: [
        {
          id: 's-m3-l1',
          title: 'Justice Frameworks for Exit',
          duration: '25 min',
          type: 'instruction',
          description: 'Apply justice frameworks to Exodology practice.',
          keyTerms: [
            { term: 'Just Transition', definition: 'A transition that protects the rights and wellbeing of all affected parties.' },
            { term: 'Exit Equity', definition: 'Equal access to exit opportunities across different groups.' },
            { term: 'Transition Burden', definition: 'The costs and difficulties experienced by those undergoing transition.' }
          ],
          available: true
        },
        {
          id: 's-m3-l2',
          title: 'Who Bears Transition Costs?',
          duration: '22 min',
          type: 'instruction',
          description: 'Analyze and address the distribution of transition burdens.',
          available: true
        },
        {
          id: 's-m3-l3',
          title: 'Access and Inclusion',
          duration: '22 min',
          type: 'instruction',
          description: 'Ensure exit alternatives are accessible to all.',
          available: true
        },
        {
          id: 's-m3-l4',
          title: 'Protecting Vulnerable Populations',
          duration: '20 min',
          type: 'instruction',
          description: 'Design protections for those most vulnerable during transitions.',
          available: true
        },
        {
          id: 's-m3-l5',
          title: 'Equity Assessment Tool',
          duration: '20 min',
          type: 'interactive',
          description: 'Assess the equity implications of a transition plan.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Equity Impact Assessment',
        description: 'Complete an equity impact assessment for a transition scenario.'
      }
    },
    {
      id: 's-m4',
      week: 4,
      title: 'Risk and Backlash',
      subtitle: 'Managing Resistance',
      description: 'Anticipate and manage risks, backlash, and unintended consequences.',
      icon: AlertTriangle,
      lessons: [
        {
          id: 's-m4-l1',
          title: 'Risk Typology for Transitions',
          duration: '25 min',
          type: 'instruction',
          description: 'Understand the types of risks inherent in large-scale transitions.',
          available: true
        },
        {
          id: 's-m4-l2',
          title: 'Sources of Backlash',
          duration: '22 min',
          type: 'instruction',
          description: 'Identify who resists transitions and why.',
          available: true
        },
        {
          id: 's-m4-l3',
          title: 'Mitigating Unintended Consequences',
          duration: '22 min',
          type: 'instruction',
          description: 'Anticipate and address unintended effects of transitions.',
          available: true
        },
        {
          id: 's-m4-l4',
          title: 'Communication and Stakeholder Management',
          duration: '20 min',
          type: 'instruction',
          description: 'Communicate effectively to reduce resistance.',
          available: true
        },
        {
          id: 's-m4-l5',
          title: 'Risk Scenario Planning',
          duration: '25 min',
          type: 'interactive',
          description: 'Develop risk mitigation strategies for complex scenarios.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Risk Management Plan',
        description: 'Develop a comprehensive risk management plan.'
      }
    },
    {
      id: 's-m5',
      week: 5,
      title: 'Mass Transitions',
      subtitle: 'Scaling Without Collapse',
      description: 'Guide mass transitions while maintaining stability and continuity.',
      icon: Users,
      lessons: [
        {
          id: 's-m5-l1',
          title: 'Mass Transition Dynamics',
          duration: '25 min',
          type: 'instruction',
          description: 'Understand the unique challenges of mass system departures.',
          available: true
        },
        {
          id: 's-m5-l2',
          title: 'Maintaining Stability During Transition',
          duration: '22 min',
          type: 'instruction',
          description: 'Strategies for preventing destabilization.',
          available: true
        },
        {
          id: 's-m5-l3',
          title: 'Coordination at Scale',
          duration: '22 min',
          type: 'instruction',
          description: 'Coordinate multiple actors and initiatives.',
          available: true
        },
        {
          id: 's-m5-l4',
          title: 'Infrastructure Continuity',
          duration: '20 min',
          type: 'instruction',
          description: 'Maintain essential infrastructure during transitions.',
          available: true
        },
        {
          id: 's-m5-l5',
          title: 'Mass Transition Simulation',
          duration: '30 min',
          type: 'interactive',
          description: 'Simulate coordinating a mass transition scenario.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Mass Transition Plan',
        description: 'Design a coordination plan for a mass transition.'
      }
    },
    {
      id: 's-m6',
      week: 6,
      title: 'Exit-Compatible Institutions',
      subtitle: 'Designing for Departure',
      description: 'Design institutions and governance structures that enable rather than prevent exit.',
      icon: Building,
      lessons: [
        {
          id: 's-m6-l1',
          title: 'Institutional Lock-in Analysis',
          duration: '22 min',
          type: 'instruction',
          description: 'Analyze how institutions create dependency and lock-in.',
          available: true
        },
        {
          id: 's-m6-l2',
          title: 'Exit-Enabling Governance',
          duration: '25 min',
          type: 'instruction',
          description: 'Design governance that supports rather than prevents transition.',
          available: true
        },
        {
          id: 's-m6-l3',
          title: 'Transition-Ready Organizations',
          duration: '22 min',
          type: 'instruction',
          description: 'Build organizations that can evolve and transition.',
          available: true
        },
        {
          id: 's-m6-l4',
          title: 'Institutional Design Workshop',
          duration: '30 min',
          type: 'interactive',
          description: 'Design an exit-compatible institutional structure.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Institutional Design',
        description: 'Design an exit-compatible institution for a given context.'
      }
    },
    {
      id: 's-m7',
      week: 7,
      title: 'Long-term Stewardship',
      subtitle: 'Sustaining Transitions',
      description: 'Ensure long-term success and sustainability of transitions.',
      icon: Heart,
      lessons: [
        {
          id: 's-m7-l1',
          title: 'Stewardship Principles',
          duration: '22 min',
          type: 'instruction',
          description: 'Understand the principles of long-term transition stewardship.',
          available: true
        },
        {
          id: 's-m7-l2',
          title: 'Generational Transitions',
          duration: '20 min',
          type: 'instruction',
          description: 'Plan for transitions that span generations.',
          available: true
        },
        {
          id: 's-m7-l3',
          title: 'Measuring Long-term Success',
          duration: '20 min',
          type: 'instruction',
          description: 'Define and measure success over extended timeframes.',
          available: true
        },
        {
          id: 's-m7-l4',
          title: 'Adaptive Management',
          duration: '22 min',
          type: 'instruction',
          description: 'Adapt transition strategies as conditions change.',
          available: true
        },
        {
          id: 's-m7-l5',
          title: 'Stewardship Planning',
          duration: '25 min',
          type: 'interactive',
          description: 'Develop a long-term stewardship plan.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Stewardship Framework',
        description: 'Develop a comprehensive stewardship framework.'
      }
    },
    {
      id: 's-m8',
      week: 8,
      title: 'Strategic Integration',
      subtitle: 'Connecting All Elements',
      description: 'Integrate all strategic elements into coherent transition leadership.',
      icon: Puzzle,
      lessons: [
        {
          id: 's-m8-l1',
          title: 'Strategic Framework Integration',
          duration: '25 min',
          type: 'instruction',
          description: 'Connect all strategic Exodology elements.',
          available: true
        },
        {
          id: 's-m8-l2',
          title: 'Leadership in Transitions',
          duration: '22 min',
          type: 'instruction',
          description: 'Develop leadership skills for transition guidance.',
          available: true
        },
        {
          id: 's-m8-l3',
          title: 'Strategic Communication',
          duration: '20 min',
          type: 'instruction',
          description: 'Communicate strategically throughout transitions.',
          available: true
        },
        {
          id: 's-m8-l4',
          title: 'Integration Challenge',
          duration: '30 min',
          type: 'interactive',
          description: 'Apply all strategic elements to a complex scenario.',
          available: true
        }
      ],
      assessment: {
        type: 'challenge',
        title: 'Strategic Integration Assessment',
        description: 'Demonstrate integrated strategic thinking.'
      }
    },
    {
      id: 's-m9',
      week: 9,
      title: 'Capstone Preparation',
      subtitle: 'Planning Your Transition Design',
      description: 'Prepare for the capstone project by selecting and scoping your transition plan.',
      icon: Target,
      lessons: [
        {
          id: 's-m9-l1',
          title: 'Selecting Your Capstone Focus',
          duration: '20 min',
          type: 'instruction',
          description: 'Choose a community, region, or sector for your transition plan.',
          available: true
        },
        {
          id: 's-m9-l2',
          title: 'Research and Context Development',
          duration: '30 min',
          type: 'interactive',
          description: 'Research your chosen context in depth.',
          available: true
        },
        {
          id: 's-m9-l3',
          title: 'Scoping Your Plan',
          duration: '25 min',
          type: 'instruction',
          description: 'Define the scope and boundaries of your transition plan.',
          available: true
        },
        {
          id: 's-m9-l4',
          title: 'Capstone Proposal Development',
          duration: '30 min',
          type: 'interactive',
          description: 'Develop your capstone proposal for feedback.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Capstone Proposal',
        description: 'Submit your capstone proposal for review and feedback.'
      }
    },
    {
      id: 's-m10',
      week: 10,
      title: 'Capstone Project',
      subtitle: 'Complete Transition Plan',
      description: 'Design a complete Exodology transition plan for a community, region, or sector.',
      icon: Award,
      lessons: [
        {
          id: 's-m10-l1',
          title: 'Capstone Work Session 1',
          duration: '60 min',
          type: 'interactive',
          description: 'Develop dependency analysis and exit strategy.',
          available: true
        },
        {
          id: 's-m10-l2',
          title: 'Capstone Work Session 2',
          duration: '60 min',
          type: 'interactive',
          description: 'Design governance and implementation plan.',
          available: true
        },
        {
          id: 's-m10-l3',
          title: 'Capstone Work Session 3',
          duration: '60 min',
          type: 'interactive',
          description: 'Complete equity analysis and risk mitigation.',
          available: true
        },
        {
          id: 's-m10-l4',
          title: 'Final Presentation Preparation',
          duration: '30 min',
          type: 'interactive',
          description: 'Prepare your capstone for presentation.',
          available: true
        }
      ],
      assessment: {
        type: 'project',
        title: 'Capstone Submission',
        description: 'Submit your complete Exodology transition plan.'
      }
    }
  ],
  certification: {
    name: 'Exodological Stewardship',
    description: 'Demonstrates strategic leadership capability for guiding large-scale transitions.',
    requirements: [
      'Complete all 10 modules',
      'Pass all module assessments',
      'Submit and pass capstone project',
      'Demonstrate integrated strategic thinking'
    ]
  },
  capstone: {
    title: 'Complete Exodology Transition Plan',
    description: 'Design a comprehensive transition plan for a community, region, or sector that demonstrates mastery of all Strategic Exodology competencies.',
    deliverables: [
      'Comprehensive dependency analysis of current systems',
      'Detailed exit strategy with phased implementation',
      'Alternative system designs (food, water, energy)',
      'Governance and institutional framework',
      'Equity impact assessment and mitigation plan',
      'Risk analysis and management strategy',
      'Long-term stewardship plan',
      'Executive summary and presentation'
    ]
  }
}

// ============================================================================
// PATH LOOKUP
// ============================================================================

const pathsData: Record<string, ExodologyPath> = {
  'foundations': foundationsPath,
  'applied': appliedPath,
  'strategic': strategicPath
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

// Type for progress data
type LessonProgressData = {
  lessonId: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
}

export default function ExodologyPathPage() {
  const params = useParams()
  const pathId = params.pathId as string
  const path = pathsData[pathId]
  const { data: session } = useSession()
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [userProgress, setUserProgress] = useState<LessonProgressData[]>([])
  const [progressLoading, setProgressLoading] = useState(false)

  // Fetch user progress
  useEffect(() => {
    async function fetchProgress() {
      if (!session?.user) return
      setProgressLoading(true)
      try {
        const res = await fetch(`/api/exodology/progress?pathId=${pathId}`)
        if (res.ok) {
          const data = await res.json()
          setUserProgress(data.progress || [])
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setProgressLoading(false)
      }
    }
    fetchProgress()
  }, [session, pathId])

  if (!path) {
    notFound()
  }

  // Helper to check if a lesson is completed
  const isLessonCompleted = (lessonId: string) => {
    return userProgress.some((p: LessonProgressData) => p.lessonId === lessonId && p.status === 'COMPLETED')
  }

  // Helper to check if a lesson is in progress
  const isLessonInProgress = (lessonId: string) => {
    return userProgress.some((p: LessonProgressData) => p.lessonId === lessonId && p.status === 'IN_PROGRESS')
  }

  // Get first incomplete lesson for "Continue Learning"
  const getNextLesson = () => {
    for (const courseModule of path.modules) {
      for (const lesson of courseModule.lessons) {
        if (!isLessonCompleted(lesson.id)) {
          return lesson.id
        }
      }
    }
    return path.modules[0]?.lessons[0]?.id || 'f-m1-l1'
  }

  // Calculate completion stats
  const completedCount = userProgress.filter((p: LessonProgressData) => p.status === 'COMPLETED').length
  const hasProgress = completedCount > 0

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const totalLessons = path.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const totalModules = path.modules.length

  // Group modules by week
  const modulesByWeek = path.modules.reduce((acc, courseModule) => {
    if (!acc[courseModule.week]) acc[courseModule.week] = []
    acc[courseModule.week].push(courseModule)
    return acc
  }, {} as Record<number, Module[]>)

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'instruction': return BookOpen
      case 'interactive': return Play
      case 'reflection': return Lightbulb
      case 'game': return Gamepad2
      case 'assessment': return FileText
      default: return BookOpen
    }
  }

  const getLessonColor = (type: Lesson['type']) => {
    switch (type) {
      case 'instruction': return 'text-blue-500'
      case 'interactive': return 'text-purple-500'
      case 'reflection': return 'text-amber-500'
      case 'game': return 'text-green-500'
      case 'assessment': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  // Calculate module completion
  const getModuleProgress = (courseModule: Module) => {
    const completedInModule = courseModule.lessons.filter(lesson => isLessonCompleted(lesson.id)).length
    return {
      completed: completedInModule,
      total: courseModule.lessons.length,
      percentage: courseModule.lessons.length > 0 ? (completedInModule / courseModule.lessons.length) * 100 : 0
    }
  }

  // Progress Ring Component
  const ProgressRing = ({ progress, size = 40, strokeWidth = 3 }: { progress: number; size?: number; strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-[var(--muted)]"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={progress === 100 ? 'text-green-500' : `text-${path.color}-500`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {progress === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <span className="text-[10px] font-bold text-[var(--foreground)]">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-br ${path.gradient} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/exodology" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back to Exodology
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <div className="text-8xl">{path.heroEmoji}</div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-white/20 mb-2">
                  {path.level.toUpperCase()}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black mb-2">{path.title}</h1>
                <p className="text-xl font-medium opacity-90">{path.subtitle}</p>
              </div>
            </div>

            <p className="text-lg opacity-90 mb-8 max-w-2xl">{path.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{path.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">{totalModules} Modules</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Target className="w-5 h-5" />
                <span className="font-bold">{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span className="font-bold">Certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-black mb-4 text-[var(--foreground)]">Overview</h2>
                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {path.overview}
                </p>
                <div className="p-4 rounded-xl bg-[var(--muted)]/30 border border-[var(--border)]">
                  <p className="text-sm italic text-[var(--foreground)]">
                    <strong>Philosophy:</strong> {path.philosophy}
                  </p>
                </div>
              </section>

              {/* What You'll Learn */}
              <section>
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {path.whatYoullLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--card)] border-2 border-[var(--border)]">
                      <CheckCircle2 className={`w-6 h-6 text-${path.color}-500 flex-shrink-0`} />
                      <span className="font-medium text-[var(--muted-foreground)]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section>
                <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">Curriculum</h2>
                <div className="space-y-8">
                  {Object.entries(modulesByWeek).map(([week, modules]) => (
                    <div key={week}>
                      <h3 className={`text-lg font-black text-${path.color}-600 mb-4`}>
                        Week {week}
                      </h3>
                      <div className="space-y-4">
                        {modules.map((courseModule) => {
                          const Icon = courseModule.icon
                          const isExpanded = expandedModules.has(courseModule.id)

                          const moduleProgress = getModuleProgress(courseModule)

                          return (
                            <div key={courseModule.id} className={`border-2 rounded-xl overflow-hidden ${
                              moduleProgress.percentage === 100
                                ? 'border-green-500/50 bg-green-500/5'
                                : 'border-[var(--border)]'
                            }`}>
                              {/* Module Header */}
                              <button
                                onClick={() => toggleModule(courseModule.id)}
                                className="w-full flex items-center gap-4 p-4 bg-[var(--card)] hover:bg-[var(--muted)]/50 transition-colors text-left"
                              >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                                  moduleProgress.percentage === 100 ? 'from-green-500 to-emerald-600' : path.gradient
                                } flex items-center justify-center shadow-lg`}>
                                  {moduleProgress.percentage === 100 ? (
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                  ) : (
                                    <Icon className="w-6 h-6 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-[var(--foreground)]">{courseModule.title}</h4>
                                  <p className="text-sm text-[var(--muted-foreground)]">{courseModule.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  {/* Progress Ring */}
                                  {session && <ProgressRing progress={moduleProgress.percentage} />}
                                  <span className="text-sm text-[var(--muted-foreground)]">
                                    {moduleProgress.completed}/{courseModule.lessons.length}
                                  </span>
                                  <ChevronDown className={`w-5 h-5 text-[var(--muted-foreground)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </button>

                              {/* Module Content */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/20">
                                      <p className="text-sm text-[var(--muted-foreground)] mb-4">
                                        {courseModule.description}
                                      </p>

                                      {/* Lessons */}
                                      <div className="space-y-2">
                                        {courseModule.lessons.map((lesson, i) => {
                                          const LessonIcon = getLessonIcon(lesson.type)
                                          const isLocked = !session || !lesson.available
                                          const completed = isLessonCompleted(lesson.id)
                                          const inProgress = isLessonInProgress(lesson.id)

                                          const lessonContent = (
                                            <div
                                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                                isLocked
                                                  ? 'bg-[var(--muted)]/30 border-[var(--border)] cursor-not-allowed opacity-60'
                                                  : completed
                                                    ? 'bg-green-500/5 border-green-500/30 hover:border-green-500/50 cursor-pointer group'
                                                    : 'bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 cursor-pointer group'
                                              }`}
                                            >
                                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                isLocked
                                                  ? 'bg-[var(--muted)]'
                                                  : completed
                                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg'
                                                    : `bg-gradient-to-br ${path.gradient} shadow-lg group-hover:scale-110`
                                              }`}>
                                                {isLocked ? (
                                                  <Lock className="w-4 h-4 text-[var(--muted-foreground)]" />
                                                ) : completed ? (
                                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                                ) : (
                                                  <LessonIcon className="w-5 h-5 text-white" />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                  <p className={`text-sm font-bold truncate ${
                                                    isLocked ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]'
                                                  }`}>{lesson.title}</p>
                                                  {completed ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-600">
                                                      Complete
                                                    </span>
                                                  ) : inProgress ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-600">
                                                      In Progress
                                                    </span>
                                                  ) : (
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                      lesson.type === 'instruction' ? 'bg-blue-500/20 text-blue-600' :
                                                      lesson.type === 'interactive' ? 'bg-purple-500/20 text-purple-600' :
                                                      lesson.type === 'reflection' ? 'bg-amber-500/20 text-amber-600' :
                                                      lesson.type === 'game' ? 'bg-green-500/20 text-green-600' :
                                                      'bg-red-500/20 text-red-600'
                                                    }`}>
                                                      {lesson.type}
                                                    </span>
                                                  )}
                                                </div>
                                                <p className="text-xs text-[var(--muted-foreground)] truncate">{lesson.description}</p>
                                              </div>
                                              <div className="flex items-center gap-3 flex-shrink-0">
                                                <span className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)]/50 px-2 py-1 rounded-full">
                                                  {lesson.duration}
                                                </span>
                                                {!isLocked && (
                                                  <ChevronRight className={`w-5 h-5 ${completed ? 'text-green-500' : 'text-[var(--primary)]'} group-hover:translate-x-1 transition-transform`} />
                                                )}
                                              </div>
                                            </div>
                                          )

                                          return isLocked ? (
                                            <div key={lesson.id}>{lessonContent}</div>
                                          ) : (
                                            <Link
                                              key={lesson.id}
                                              href={`/exodology/paths/${pathId}/lessons/${lesson.id}`}
                                            >
                                              {lessonContent}
                                            </Link>
                                          )
                                        })}
                                      </div>

                                      {/* Module Assessment */}
                                      {courseModule.assessment && (
                                        <Link
                                          href={session ? `/exodology/paths/${pathId}/assessments/${courseModule.id}` : '#'}
                                          className={session ? '' : 'pointer-events-none'}
                                        >
                                          <div className={`mt-4 p-3 rounded-lg bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 transition-all ${
                                            session ? 'hover:border-[var(--primary)]/50 hover:shadow-md cursor-pointer' : 'opacity-60'
                                          }`}>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4 text-[var(--primary)]" />
                                                <span className="text-sm font-bold text-[var(--foreground)]">{courseModule.assessment.title}</span>
                                              </div>
                                              {session ? (
                                                <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
                                              ) : (
                                                <Lock className="w-4 h-4 text-[var(--muted-foreground)]" />
                                              )}
                                            </div>
                                            <p className="text-xs text-[var(--muted-foreground)] mt-1">{courseModule.assessment.description}</p>
                                          </div>
                                        </Link>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Capstone (for Strategic path) */}
              {path.capstone && (
                <section>
                  <h2 className="text-3xl font-black mb-6 text-[var(--foreground)]">Capstone Project</h2>
                  <Card className="border-4 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black text-[var(--foreground)] mb-2">{path.capstone.title}</h3>
                      <p className="text-[var(--muted-foreground)] mb-4">{path.capstone.description}</p>
                      <h4 className="font-bold text-[var(--foreground)] mb-2">Deliverables:</h4>
                      <ul className="space-y-2">
                        {path.capstone.deliverables.map((deliverable, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Sign In / Enroll CTA */}
              {!session ? (
                <Card className="border-4 border-[var(--primary)]/50 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-xl font-black mb-2 text-[var(--foreground)]">Sign In to Learn</h3>
                    <p className="text-[var(--muted-foreground)] mb-4 text-sm">
                      Create a free account to access all {totalLessons} lessons and track your progress.
                    </p>
                    <Link href="/auth/signin">
                      <Button className={`w-full font-bold text-lg py-6 bg-gradient-to-r ${path.gradient}`}>
                        Sign In to Start <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <p className="text-xs text-[var(--muted-foreground)] mt-3">
                      Don't have an account?{' '}
                      <Link href="/auth/register" className="text-[var(--primary)] font-bold hover:underline">
                        Register free
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className={`border-4 border-${path.color}-400 bg-gradient-to-br from-${path.color}-50 to-white dark:from-[var(--card)] dark:to-[var(--muted)]`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{path.heroEmoji}</div>
                    <h3 className="text-xl font-black mb-2 text-[var(--foreground)]">
                      {hasProgress ? 'Continue Learning' : 'Start This Path'}
                    </h3>

                    {/* Progress Stats */}
                    {hasProgress ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[var(--muted-foreground)]">Progress</span>
                          <span className="font-bold text-[var(--foreground)]">
                            {completedCount}/{totalLessons} lessons
                          </span>
                        </div>
                        <div className="w-full h-3 bg-[var(--muted)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedCount / totalLessons) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full bg-gradient-to-r ${path.gradient}`}
                          />
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] mt-2">
                          {Math.round((completedCount / totalLessons) * 100)}% complete
                        </p>
                      </div>
                    ) : (
                      <p className="text-[var(--muted-foreground)] mb-4">
                        {totalModules} modules • {totalLessons} lessons
                      </p>
                    )}

                    <Link href={`/exodology/paths/${pathId}/lessons/${hasProgress ? getNextLesson() : (path.modules[0]?.lessons[0]?.id || 'f-m1-l1')}`}>
                      <Button className={`w-full font-bold text-lg py-6 bg-gradient-to-r ${path.gradient}`}>
                        {hasProgress ? 'Continue' : 'Begin Learning'} <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Certification */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-[var(--foreground)] flex items-center gap-2">
                    <Award className={`w-6 h-6 text-${path.color}-500`} />
                    Certification
                  </h3>
                  <p className="font-bold text-[var(--foreground)] mb-2">{path.certification.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">{path.certification.description}</p>
                  <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {path.certification.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                        <CheckCircle2 className={`w-4 h-4 text-${path.color}-500 flex-shrink-0 mt-0.5`} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Trinity Progress */}
              <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-purple-500/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-4 text-[var(--foreground)] flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-amber-500" />
                    Exodology Trinity
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 p-2 rounded-lg ${pathId === 'foundations' ? 'bg-amber-500/20 border border-amber-500/30' : 'opacity-60'}`}>
                      <Compass className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-medium text-[var(--foreground)]">Foundations</span>
                      {pathId === 'foundations' && <span className="ml-auto text-xs text-amber-500 font-bold">CURRENT</span>}
                    </div>
                    <div className={`flex items-center gap-3 p-2 rounded-lg ${pathId === 'applied' ? 'bg-teal-500/20 border border-teal-500/30' : 'opacity-60'}`}>
                      <Map className="w-5 h-5 text-teal-500" />
                      <span className="text-sm font-medium text-[var(--foreground)]">Applied</span>
                      {pathId === 'applied' && <span className="ml-auto text-xs text-teal-500 font-bold">CURRENT</span>}
                    </div>
                    <div className={`flex items-center gap-3 p-2 rounded-lg ${pathId === 'strategic' ? 'bg-purple-500/20 border border-purple-500/30' : 'opacity-60'}`}>
                      <Target className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-[var(--foreground)]">Strategic</span>
                      {pathId === 'strategic' && <span className="ml-auto text-xs text-purple-500 font-bold">CURRENT</span>}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-4 text-center">
                    Complete all three to become a Certified Exodologist
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
