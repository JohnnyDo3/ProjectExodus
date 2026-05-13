import { prisma } from '@/lib/db'

/**
 * Server-side helper to load a user's profile with privacy filters
 * applied. Used by both the public profile page (server component) and
 * the /api/profile/:userId route so privacy is enforced in exactly one
 * place — no more "settings stored but never read" drift.
 *
 * Privacy contract:
 *   - `visibility: 'private'` and viewer is not the owner → return null
 *     (treat as hidden / 404).
 *   - `visibility: 'followers'` → currently degrades to 'public' since
 *     we don't yet check follower relationships here; can be tightened
 *     later.
 *   - `sections.<key>: false` → strip that section's data from the
 *     return shape. Sections recognised: experience, education,
 *     skills, languages, certifications, volunteer, publications,
 *     honors, projects, badges, contact, resume.
 *   - `showEmail` / `showPhone` falsy → strip email / phone unless
 *     viewer is the owner.
 *   - Unrecognised / missing settings → treat as visible (backwards
 *     compatible with existing users who never set privacy).
 */

export type ProfileVisibility = 'public' | 'followers' | 'private'

export interface PrivacySettings {
  visibility?: ProfileVisibility
  sections?: Partial<Record<
    | 'experience'
    | 'education'
    | 'skills'
    | 'languages'
    | 'certifications'
    | 'volunteer'
    | 'publications'
    | 'honors'
    | 'projects'
    | 'badges'
    | 'contact'
    | 'resume',
    boolean
  >>
  messages?: 'everyone' | 'followers' | 'nobody'
}

const SECTION_FIELDS = {
  experience: ['experience'],
  education: ['education'],
  skills: ['skills', 'expertise'],
  languages: ['languages'],
  certifications: ['certifications'],
  volunteer: ['volunteer'],
  publications: ['publications'],
  honors: ['honors'],
  projects: ['projects'],
  resume: ['resume'],
  // 'badges' is handled at the relation level (userBadges include)
  // 'contact' is handled separately for email/phone
} as const

function readPrivacy(raw: unknown): PrivacySettings {
  if (raw && typeof raw === 'object') return raw as PrivacySettings
  return {}
}

export async function loadProfile(
  userId: string,
  viewerId: string | null | undefined,
): Promise<{ user: Record<string, unknown> | null; isOwnProfile: boolean }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userBadges: { include: { badge: true } },
      _count: {
        select: {
          followers: true,
          following: true,
          articles: true,
          createdProjects: true,
        },
      },
    },
  })

  if (!user) return { user: null, isOwnProfile: false }

  const isOwnProfile = !!viewerId && viewerId === user.id
  const privacy = readPrivacy(user.privacySettings)

  // Hard private — only the owner can see anything.
  if (privacy.visibility === 'private' && !isOwnProfile) {
    return { user: null, isOwnProfile: false }
  }

  // Build filtered output. Start with a mutable copy.
  const out: Record<string, unknown> = { ...user }

  // Section toggles — strip the data for any section the user has
  // hidden in their privacy settings. Owner sees everything regardless.
  if (!isOwnProfile && privacy.sections) {
    const sectionToggles = privacy.sections as Record<string, boolean | undefined>
    for (const [section, fields] of Object.entries(SECTION_FIELDS)) {
      if (sectionToggles[section] === false) {
        for (const f of fields) {
          out[f] = Array.isArray((user as Record<string, unknown>)[f]) ? [] : null
        }
      }
    }
    if (sectionToggles.badges === false) {
      out.userBadges = []
    }
  }

  // Email / phone — separate showEmail / showPhone booleans rather
  // than living under privacy.sections.contact.
  if (!isOwnProfile) {
    if (!user.showEmail) out.email = null
    if (!user.showPhone) out.phone = null
  }
  // Drop internal flags from the returned shape.
  delete out.showEmail
  delete out.showPhone

  return { user: out, isOwnProfile }
}
