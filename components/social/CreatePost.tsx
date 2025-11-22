'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Image, Send, Globe, Users, Lock, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface CreatePostProps {
  onPostCreated?: () => void
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>('PUBLIC')
  const [loading, setLoading] = useState(false)
  const [showVisibilityMenu, setShowVisibilityMenu] = useState(false)

  const visibilityOptions = [
    { value: 'PUBLIC', icon: Globe, label: 'Public', desc: 'Anyone can see' },
    { value: 'FOLLOWERS_ONLY', icon: Users, label: 'Followers', desc: 'Only your followers' },
    { value: 'PRIVATE', icon: Lock, label: 'Private', desc: 'Only you' }
  ]

  const currentVisibility = visibilityOptions.find(v => v.value === visibility)!

  const handleSubmit = async () => {
    if (!content.trim() || !session?.user) return

    setLoading(true)
    try {
      // Extract hashtags and mentions
      const hashtags = (content.match(/#[\w]+/g) || []).map(tag => tag.substring(1))
      const mentions = (content.match(/@[\w]+/g) || []).map(mention => mention.substring(1))

      const res = await fetch('/api/social/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          visibility,
          hashtags,
          mentions
        })
      })

      if (res.ok) {
        setContent('')
        setVisibility('PUBLIC')
        if (onPostCreated) onPostCreated()
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!session?.user) {
    return (
      <Card className="border-4 border-theme-primary">
        <CardContent className="p-8 text-center">
          <p className="text-lg font-semibold text-theme-muted mb-4">
            Sign in to share your sustainability journey
          </p>
          <Button size="lg" className="font-black">
            SIGN IN
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-4 border-theme-primary shadow-theme-lg">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <span className="text-xl font-black text-white">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your sustainability story, tips, or questions..."
              className="w-full px-4 py-3 text-base font-medium rounded-xl bg-[var(--muted)] border-2 border-[var(--border)] focus:border-theme-primary focus:outline-none text-[var(--foreground)] placeholder:text-theme-muted resize-none"
              rows={3}
              maxLength={5000}
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                {/* Visibility Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowVisibilityMenu(!showVisibilityMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] hover:bg-theme-muted transition-colors border-2 border-[var(--border)]"
                  >
                    <currentVisibility.icon className="w-4 h-4 text-theme-primary" />
                    <span className="text-sm font-bold text-[var(--foreground)]">
                      {currentVisibility.label}
                    </span>
                  </button>

                  {showVisibilityMenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--card)] border-4 border-theme-primary rounded-xl shadow-2xl z-50">
                      {visibilityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setVisibility(option.value as any)
                            setShowVisibilityMenu(false)
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-[var(--muted)] transition-colors flex items-start gap-3 first:rounded-t-lg last:rounded-b-lg ${
                            visibility === option.value ? 'bg-theme-muted' : ''
                          }`}
                        >
                          <option.icon className="w-5 h-5 text-theme-primary mt-0.5" />
                          <div>
                            <div className="font-black text-[var(--foreground)]">{option.label}</div>
                            <div className="text-xs font-semibold text-theme-muted">{option.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Character Count */}
                <span className="text-sm font-semibold text-theme-muted">
                  {content.length} / 5000
                </span>
              </div>

              {/* Post Button */}
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || loading}
                className="font-black px-6"
              >
                {loading ? (
                  'POSTING...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    POST
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
