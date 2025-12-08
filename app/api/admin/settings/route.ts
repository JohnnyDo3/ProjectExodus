import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import { logSettingsChange } from '@/lib/audit'

// Default settings with categories
const DEFAULT_SETTINGS: Record<string, { value: any; description: string; category: string }> = {
  // General
  'site.name': { value: 'Project Exodus', description: 'Site display name', category: 'general' },
  'site.description': { value: 'Sustainability Hub Platform', description: 'Site meta description', category: 'general' },
  'site.contactEmail': { value: 'admin@example.com', description: 'Contact email address', category: 'general' },
  'site.supportUrl': { value: '', description: 'Support/help page URL', category: 'general' },

  // Features
  'features.marketplace': { value: true, description: 'Enable marketplace/products', category: 'features' },
  'features.forums': { value: true, description: 'Enable community forums', category: 'features' },
  'features.projects': { value: true, description: 'Enable collaborative projects', category: 'features' },
  'features.learning': { value: true, description: 'Enable learning modules', category: 'features' },
  'features.socialFeed': { value: true, description: 'Enable social feed', category: 'features' },
  'features.messaging': { value: true, description: 'Enable direct messaging', category: 'features' },

  // Moderation
  'moderation.autoFlagKeywords': { value: [], description: 'Keywords that auto-flag content', category: 'moderation' },
  'moderation.requireProductApproval': { value: true, description: 'Products require admin approval', category: 'moderation' },
  'moderation.requireArticleApproval': { value: false, description: 'Articles require admin approval', category: 'moderation' },
  'moderation.spamScoreThreshold': { value: 70, description: 'Auto-flag spam score threshold (0-100)', category: 'moderation' },

  // Email
  'email.enabled': { value: true, description: 'Enable email notifications', category: 'email' },
  'email.fromAddress': { value: 'noreply@example.com', description: 'Sender email address', category: 'email' },
  'email.fromName': { value: 'Project Exodus', description: 'Sender display name', category: 'email' },

  // Limits
  'limits.maxProductsPerUser': { value: 50, description: 'Max products per user', category: 'limits' },
  'limits.maxArticlesPerUser': { value: 100, description: 'Max articles per user', category: 'limits' },
  'limits.maxProjectsPerUser': { value: 20, description: 'Max projects per user', category: 'limits' },
  'limits.maxConnectionsPerUser': { value: 1000, description: 'Max connections per user', category: 'limits' },
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get all stored settings
    const storedSettings = await prisma.siteSettings.findMany()
    const settingsMap = new Map<string, { key: string; value: any; updatedAt: Date | null }>(
      storedSettings.map((s: any) => [s.key, s])
    )

    // Merge with defaults
    const settings: Record<string, any> = {}
    const categories: Record<string, any[]> = {}

    for (const [key, defaultConfig] of Object.entries(DEFAULT_SETTINGS)) {
      const stored = settingsMap.get(key)
      const value = stored ? stored.value : defaultConfig.value

      settings[key] = value

      // Organize by category
      if (!categories[defaultConfig.category]) {
        categories[defaultConfig.category] = []
      }
      categories[defaultConfig.category].push({
        key,
        value,
        description: defaultConfig.description,
        updatedAt: stored?.updatedAt || null
      })
    }

    return NextResponse.json({ settings, categories })
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canEdit = await hasPermission(session.user.id, 'settings.edit')
    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { key, value } = body

    if (!key) {
      return NextResponse.json(
        { error: 'Missing setting key' },
        { status: 400 }
      )
    }

    // Validate key exists in defaults
    if (!DEFAULT_SETTINGS[key]) {
      return NextResponse.json(
        { error: 'Invalid setting key' },
        { status: 400 }
      )
    }

    // Get old value for audit log
    const existing = await prisma.siteSettings.findUnique({
      where: { key }
    })
    const oldValue = existing?.value ?? DEFAULT_SETTINGS[key].value

    // Upsert the setting
    const setting = await prisma.siteSettings.upsert({
      where: { key },
      create: {
        key,
        value,
        description: DEFAULT_SETTINGS[key].description
      },
      update: {
        value,
      }
    })

    // Log the change
    await logSettingsChange(
      session.user.id,
      key,
      oldValue,
      value,
      request.headers.get('x-forwarded-for') || undefined
    )

    return NextResponse.json({
      success: true,
      setting: {
        key: setting.key,
        value: setting.value,
        updatedAt: setting.updatedAt
      }
    })
  } catch (error) {
    console.error('Failed to update setting:', error)
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    )
  }
}

// Bulk update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canEdit = await hasPermission(session.user.id, 'settings.edit')
    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { settings } = body // { key: value, key2: value2, ... }

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings object' },
        { status: 400 }
      )
    }

    const results: any[] = []
    const ipAddress = request.headers.get('x-forwarded-for') || undefined

    for (const [key, value] of Object.entries(settings)) {
      // Validate key exists in defaults
      if (!DEFAULT_SETTINGS[key]) {
        continue
      }

      // Get old value for audit log
      const existing = await prisma.siteSettings.findUnique({
        where: { key }
      })
      const oldValue = existing?.value ?? DEFAULT_SETTINGS[key].value

      // Skip if unchanged
      if (JSON.stringify(oldValue) === JSON.stringify(value)) {
        continue
      }

      // Upsert the setting
      const setting = await prisma.siteSettings.upsert({
        where: { key },
        create: {
          key,
          value: value as any,
          description: DEFAULT_SETTINGS[key].description
        },
        update: {
          value: value as any,
        }
      })

      // Log the change
      await logSettingsChange(session.user.id, key, oldValue, value, ipAddress)

      results.push({
        key: setting.key,
        value: setting.value,
        updatedAt: setting.updatedAt
      })
    }

    return NextResponse.json({
      success: true,
      updated: results.length,
      settings: results
    })
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
