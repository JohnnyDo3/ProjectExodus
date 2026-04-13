import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

// All species — guppy variants (all tier 0) + species per tier
const ALL_SPECIES = [
  'guppy', 'swift-guppy', 'fancy-guppy', 'delta-guppy', 'veil-guppy', 'supreme-guppy',
  'endler', 'molly', 'platy', 'danio', 'minnow',
  'neon-tetra', 'ember-tetra', 'diamond-tetra', 'rummy-tetra', 'serpae-tetra', 'glowlight-tetra',
  'angelfish', 'marble-angelfish', 'koi-angelfish', 'platinum-angelfish', 'zebra-angelfish', 'veil-angelfish',
  'clownfish', 'tomato-clownfish', 'maroon-clownfish', 'saddleback-clownfish', 'cinnamon-clownfish', 'snowflake-clownfish',
  'tang', 'yellow-tang', 'powder-tang', 'achilles-tang', 'naso-tang', 'sailfin-tang',
  'betta', 'crown-betta', 'halfmoon-betta', 'plakat-betta', 'galaxy-betta', 'dragon-betta',
]

const VALID_PATTERNS = ['none', 'scales', 'fine-scales', 'armored', 'shimmer', 'koi']

function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color)
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { species, colors, pattern, savedDesigns } = body

    // Validate species - all guppy variants are available to everyone
    if (species && !ALL_SPECIES.includes(species)) {
      return NextResponse.json(
        { success: false, error: 'Invalid species' },
        { status: 400 }
      )
    }

    // Validate colors
    const validateColors = (c: unknown): string | null => {
      if (!c || typeof c !== 'object') return null
      const colorKeys = ['body', 'fin', 'accent', 'eye']
      for (const key of colorKeys) {
        const val = (c as Record<string, unknown>)[key]
        if (val && (typeof val !== 'string' || !isValidHexColor(val))) {
          return `Invalid color for ${key}`
        }
      }
      return null
    }

    const colorError = validateColors(colors)
    if (colorError) {
      return NextResponse.json({ success: false, error: colorError }, { status: 400 })
    }

    // Validate pattern
    if (pattern && !VALID_PATTERNS.includes(pattern)) {
      return NextResponse.json(
        { success: false, error: 'Invalid pattern' },
        { status: 400 }
      )
    }

    // Validate savedDesigns map (colors/pattern per species)
    let validatedSavedDesigns: Record<string, { colors?: unknown; pattern?: string | null }> | null = null
    if (savedDesigns && typeof savedDesigns === 'object') {
      validatedSavedDesigns = {}
      for (const [sp, design] of Object.entries(savedDesigns as Record<string, unknown>)) {
        if (!ALL_SPECIES.includes(sp)) continue
        if (!design || typeof design !== 'object') continue
        const d = design as { colors?: unknown; pattern?: unknown }
        const designColorError = validateColors(d.colors)
        if (designColorError) {
          return NextResponse.json(
            { success: false, error: `savedDesigns.${sp}: ${designColorError}` },
            { status: 400 }
          )
        }
        if (d.pattern && (typeof d.pattern !== 'string' || !VALID_PATTERNS.includes(d.pattern))) {
          return NextResponse.json(
            { success: false, error: `savedDesigns.${sp}: invalid pattern` },
            { status: 400 }
          )
        }
        validatedSavedDesigns[sp] = {
          colors: d.colors ?? null,
          pattern: (d.pattern as string) ?? null,
        }
      }
    }

    const customization = {
      species: species || null,
      colors: colors || null,
      pattern: pattern || 'none',
      savedDesigns: validatedSavedDesigns,
    }

    // Check if this is the user's first customization (one-time bonus)
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { fishCustomization: true },
    })
    const isFirstCustomization = !currentUser?.fishCustomization

    await prisma.user.update({
      where: { id: session.user.id },
      data: { fishCustomization: customization },
    })

    // Award stock points for first fish customization (one-time)
    if (isFirstCustomization) {
      incrementStockScore(session.user.id, STOCK_POINTS.FISH_CUSTOMIZED).catch(() => {})
    }

    return NextResponse.json({ success: true, data: customization })
  } catch (error) {
    console.error('Error saving fish customization:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save customization' },
      { status: 500 }
    )
  }
}
