// Global type definitions

export type Role = 'USER' | 'EDITOR' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN'

export type ProductStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'ARCHIVED'

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'

export type NotificationType =
  | 'PRODUCT_APPROVED'
  | 'ARTICLE_PUBLISHED'
  | 'COMMENT_REPLY'
  | 'FORUM_REPLY'
  | 'NEW_FOLLOWER'
  | 'BADGE_EARNED'
  | 'PROJECT_INVITE'
  | 'SYSTEM'

export interface SustainabilityData {
  carbonFootprint?: number
  carbonSavings?: number
  waterUsage?: number
  waterSavings?: number
  recycledContent?: number
  recyclable?: boolean
  biodegradable?: boolean
  energyEfficiencyRating?: string
  renewableEnergy?: boolean
  lifespanYears?: number
  repairability?: number
  sustainabilityScore?: number
}

export interface ProductFormData {
  name: string
  description: string
  price?: number
  purchaseLink?: string
  categoryId: string
  vendorId?: string
  specifications?: Record<string, any>
  sustainabilityMetric?: SustainabilityData
  tags?: string[]
}

export interface ArticleFormData {
  title: string
  excerpt?: string
  content: string
  coverImage?: string
  categoryId: string
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams extends PaginationParams {
  search?: string
  category?: string
  tags?: string[]
  status?: string
  featured?: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
