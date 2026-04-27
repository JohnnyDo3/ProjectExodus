import { createHash } from 'node:crypto'

const HIBP_RANGE_URL = 'https://api.pwnedpasswords.com/range/'

/**
 * Checks a password against HaveIBeenPwned using k-anonymity:
 * only the first 5 chars of the SHA-1 hash leave the server.
 * Fails open on network/API errors so an HIBP outage can't block signups.
 */
export async function isPasswordPwned(password: string): Promise<boolean> {
  try {
    const sha1 = createHash('sha1').update(password).digest('hex').toUpperCase()
    const prefix = sha1.slice(0, 5)
    const suffix = sha1.slice(5)

    const res = await fetch(`${HIBP_RANGE_URL}${prefix}`, {
      headers: {
        'User-Agent': 'ProjectExodus-Auth',
        'Add-Padding': 'true',
      },
      signal: AbortSignal.timeout(3000),
    })

    if (!res.ok) return false

    const body = await res.text()
    for (const line of body.split('\n')) {
      const [hashSuffix] = line.split(':')
      if (hashSuffix?.trim().toUpperCase() === suffix) return true
    }
    return false
  } catch (error) {
    console.error('HIBP lookup failed, allowing password through:', error)
    return false
  }
}
