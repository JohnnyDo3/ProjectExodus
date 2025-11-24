'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface ReplyFormProps {
  postId: string
  isSignedIn: boolean
}

export function ReplyForm({ postId, isSignedIn }: ReplyFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast.error('Please enter a reply')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: content.trim(),
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Reply posted successfully!')
        setContent('')
        router.refresh() // Refresh the page to show the new reply
      } else {
        toast.error(data.error || 'Failed to post reply')
      }
    } catch (error) {
      console.error('Error posting reply:', error)
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-4 border-theme-primary">
      <CardContent className="p-8">
        <h3 className="text-xl font-black mb-4 text-[var(--foreground)]">
          ADD YOUR REPLY
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 border-2 border-theme-muted rounded-xl font-semibold resize-none focus:outline-none focus:border-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
            rows={4}
            placeholder={isSignedIn ? "Share your thoughts..." : "Please sign in to reply"}
            disabled={!isSignedIn || isSubmitting}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-4 flex justify-between items-center">
            {!isSignedIn ? (
              <Link href="/auth/signin">
                <Button type="button" variant="outline" size="sm" className="font-bold">
                  SIGN IN TO REPLY
                </Button>
              </Link>
            ) : (
              <p className="text-sm font-semibold text-theme-muted">
                {content.length} characters
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="font-black"
              disabled={!isSignedIn || isSubmitting || !content.trim()}
            >
              {isSubmitting ? 'POSTING...' : 'POST REPLY'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
