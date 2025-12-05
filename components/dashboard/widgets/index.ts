import {
  User,
  MessageCircle,
  BookOpen,
  Briefcase,
  Users,
  FileText,
  Clock,
  Link2,
  Quote,
} from 'lucide-react'
import { WidgetDefinition, WidgetId } from '@/types/dashboard'

// Widget component exports
export { ProfileWidget } from './ProfileWidget'
export { DiscussionsWidget } from './DiscussionsWidget'
export { LearningWidget } from './LearningWidget'
export { ProjectsWidget } from './ProjectsWidget'
export { NetworkWidget } from './NetworkWidget'
export { ArticlesWidget } from './ArticlesWidget'
export { ClockWidget } from './ClockWidget'
export { QuickLinksWidget } from './QuickLinksWidget'
export { QuoteWidget } from './QuoteWidget'

// Widget registry with definitions
export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
  profile: {
    id: 'profile',
    name: 'Identity Declaration',
    description: 'Your profile and guardian value',
    icon: User,
    defaultSize: { w: 4, h: 12 },
    minSize: { w: 3, h: 8 },
    theme: 'primary',
  },
  discussions: {
    id: 'discussions',
    name: 'My Feed Posts',
    description: 'Your discussion posts and updates',
    icon: MessageCircle,
    defaultSize: { w: 4, h: 10 },
    minSize: { w: 3, h: 6 },
    theme: 'primary',
  },
  learning: {
    id: 'learning',
    name: 'My Learning',
    description: 'Track your learning progress',
    icon: BookOpen,
    defaultSize: { w: 4, h: 10 },
    minSize: { w: 3, h: 6 },
    theme: 'accent',
  },
  projects: {
    id: 'projects',
    name: 'My Projects',
    description: 'Projects you created or joined',
    icon: Briefcase,
    defaultSize: { w: 4, h: 8 },
    minSize: { w: 3, h: 5 },
    theme: 'secondary',
  },
  network: {
    id: 'network',
    name: 'My Senate',
    description: 'Your network and connections',
    icon: Users,
    defaultSize: { w: 4, h: 8 },
    minSize: { w: 3, h: 5 },
    theme: 'primary',
  },
  articles: {
    id: 'articles',
    name: 'My Articles',
    description: 'Articles you have written',
    icon: FileText,
    defaultSize: { w: 4, h: 8 },
    minSize: { w: 3, h: 5 },
    theme: 'accent',
  },
  clock: {
    id: 'clock',
    name: 'Clock',
    description: 'Current time and date',
    icon: Clock,
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
    theme: 'accent',
  },
  quicklinks: {
    id: 'quicklinks',
    name: 'Quick Links',
    description: 'Fast access to common pages',
    icon: Link2,
    defaultSize: { w: 3, h: 5 },
    minSize: { w: 2, h: 4 },
    theme: 'secondary',
  },
  quote: {
    id: 'quote',
    name: 'Daily Inspiration',
    description: 'Inspirational quotes for your day',
    icon: Quote,
    defaultSize: { w: 6, h: 4 },
    minSize: { w: 3, h: 3 },
    theme: 'primary',
  },
}

// Get all widget IDs
export const ALL_WIDGET_IDS: WidgetId[] = Object.keys(WIDGET_REGISTRY) as WidgetId[]

// Get widget definition by ID
export function getWidgetDefinition(id: WidgetId): WidgetDefinition {
  return WIDGET_REGISTRY[id]
}
