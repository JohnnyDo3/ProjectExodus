// Template Library Components
export { TemplateSelector } from './TemplateSelector'
export { TemplateCard } from './TemplateCard'
export { TemplatePreview } from './TemplatePreview'
export { SaveAsTemplate } from './SaveAsTemplate'

// Re-export template data types and utilities
export {
  DOCUMENT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  getDocumentTemplateById,
  getDocumentTemplatesByType,
  getDocumentTemplatesByCategory,
  getDocumentTemplateCategories,
  getPopularDocumentTemplates,
  searchDocumentTemplates,
} from '@/data/document-templates'

export type { DocumentTemplate, TemplateCategory } from '@/data/document-templates'
