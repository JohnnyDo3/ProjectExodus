'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface Endorser {
  id: string
  name: string | null
  image: string | null
  headline: string | null
}

interface Endorsement {
  id: string
  userId: string
  endorserId: string
  skill: string
  createdAt: string
  endorser?: Endorser
}

interface EndorsementData {
  endorsements: Endorsement[]
  skillCounts: Record<string, number>
  total: number
}

interface SkillEndorsementsProps {
  userId: string
  skills: string[]
  isOwnProfile?: boolean
}

export default function SkillEndorsements({ userId, skills, isOwnProfile = false }: SkillEndorsementsProps) {
  const { data: session } = useSession()
  const [endorsementData, setEndorsementData] = useState<EndorsementData | null>(null)
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [endorsing, setEndorsing] = useState<string | null>(null)

  // Fetch endorsements
  useEffect(() => {
    fetchEndorsements()
  }, [userId])

  const fetchEndorsements = async () => {
    try {
      const res = await fetch(`/api/endorsements?userId=${userId}`)
      const data = await res.json()
      if (data.success) {
        setEndorsementData(data.data)
      }
    } catch (error) {
      console.error('Error fetching endorsements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEndorse = async (skill: string) => {
    if (!session?.user) {
      alert('Please sign in to endorse skills')
      return
    }

    setEndorsing(skill)
    try {
      const res = await fetch('/api/endorsements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, skill })
      })

      const data = await res.json()
      if (data.success) {
        // Refresh endorsements
        await fetchEndorsements()
      } else {
        alert(data.error || 'Failed to endorse skill')
      }
    } catch (error) {
      console.error('Error endorsing skill:', error)
      alert('Failed to endorse skill')
    } finally {
      setEndorsing(null)
    }
  }

  const handleRemoveEndorsement = async (endorsementId: string) => {
    try {
      const res = await fetch(`/api/endorsements/${endorsementId}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (data.success) {
        // Refresh endorsements
        await fetchEndorsements()
      } else {
        alert(data.error || 'Failed to remove endorsement')
      }
    } catch (error) {
      console.error('Error removing endorsement:', error)
      alert('Failed to remove endorsement')
    }
  }

  const toggleSkillExpanded = (skill: string) => {
    const newExpanded = new Set(expandedSkills)
    if (newExpanded.has(skill)) {
      newExpanded.delete(skill)
    } else {
      newExpanded.add(skill)
    }
    setExpandedSkills(newExpanded)
  }

  const hasUserEndorsed = (skill: string): boolean => {
    if (!session?.user?.id || !endorsementData) return false
    return endorsementData.endorsements.some(
      e => e.skill === skill && e.endorserId === session.user.id
    )
  }

  const getSkillEndorsements = (skill: string): Endorsement[] => {
    if (!endorsementData) return []
    return endorsementData.endorsements.filter(e => e.skill === skill)
  }

  const canEndorseSkill = (skill: string): boolean => {
    return !isOwnProfile && session?.user && !hasUserEndorsed(skill)
  }

  if (loading) {
    return <div className="text-gray-500">Loading endorsements...</div>
  }

  if (!skills || skills.length === 0) {
    return <div className="text-gray-500">No skills listed</div>
  }

  return (
    <div className="space-y-3">
      {skills.map((skill) => {
        const count = endorsementData?.skillCounts[skill] || 0
        const skillEndorsements = getSkillEndorsements(skill)
        const isExpanded = expandedSkills.has(skill)
        const userHasEndorsed = hasUserEndorsed(skill)

        return (
          <div key={skill} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-gray-900">{skill}</h4>
                  {count > 0 && (
                    <span className="text-sm text-gray-500">
                      {count} endorsement{count !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {canEndorseSkill(skill) && (
                  <button
                    onClick={() => handleEndorse(skill)}
                    disabled={endorsing === skill}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors disabled:opacity-50"
                  >
                    {endorsing === skill ? (
                      'Endorsing...'
                    ) : (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Endorse
                      </>
                    )}
                  </button>
                )}

                {userHasEndorsed && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-md">
                    <CheckIcon className="w-4 h-4" />
                    Endorsed
                  </span>
                )}

                {count > 0 && (
                  <button
                    onClick={() => toggleSkillExpanded(skill)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Endorsers List */}
            {isExpanded && count > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Endorsed by:</p>
                <div className="grid grid-cols-1 gap-2">
                  {skillEndorsements.map((endorsement) => (
                    <div
                      key={endorsement.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-3">
                        {endorsement.endorser?.image ? (
                          <Image
                            src={endorsement.endorser.image}
                            alt={endorsement.endorser.name || 'User'}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              {endorsement.endorser?.name?.charAt(0) || '?'}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {endorsement.endorser?.name || 'Unknown'}
                          </p>
                          {endorsement.endorser?.headline && (
                            <p className="text-xs text-gray-500">
                              {endorsement.endorser.headline}
                            </p>
                          )}
                        </div>
                      </div>

                      {endorsement.endorserId === session?.user?.id && (
                        <button
                          onClick={() => handleRemoveEndorsement(endorsement.id)}
                          className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
