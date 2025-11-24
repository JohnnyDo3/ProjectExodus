import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, ThumbsUp, MessageSquare, Pin, Clock } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'
import { ReplyForm } from '@/components/forum/ReplyForm'
import { auth } from '@/auth'

async function getPost(postId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/forum/posts/${postId}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const session = await auth()
  const post = await getPost(postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Header */}
      <section className="py-12 bg-[var(--background)] border-b-4 border-theme-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Forum" fallbackUrl="/community/forum" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Link href="/community/forum" className="inline-block mb-6">
              <Button variant="outline" size="sm" className="font-bold">
                ← COMMUNITY FORUM
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {post.pinned && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] rounded-full">
                  <Pin className="w-4 h-4 text-theme-secondary" />
                  <span className="text-sm font-black text-theme-secondary uppercase">Pinned</span>
                </div>
              )}
              <h1 className="text-4xl font-black text-[var(--foreground)]">
                {post.title}
              </h1>
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold text-theme-muted">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.user.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(new Date(post.createdAt))}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>{post._count.replies} replies</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post._count.likes} likes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Post */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-accent">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  {/* Author */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center mb-2">
                      {post.user.image ? (
                        <img
                          src={post.user.image}
                          alt={post.user.name || 'User'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-theme-primary" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-[var(--foreground)]">
                        {post.user.name || 'Anonymous'}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="text-lg font-semibold leading-relaxed whitespace-pre-wrap text-[var(--foreground)]">
                      {post.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Replies */}
      <section className="py-4 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
              REPLIES ({post.replies.length})
            </h2>

            <div className="space-y-4 mb-8">
              {post.replies.map((reply: any) => (
                <Card key={reply.id} className="border-2 border-theme-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Author */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                          {reply.user.image ? (
                            <img
                              src={reply.user.image}
                              alt={reply.user.name || 'User'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-theme-accent" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-black text-[var(--foreground)]">
                            {reply.user.name || 'Anonymous'}
                          </span>
                          <span className="text-sm font-semibold text-theme-muted">
                            {formatDate(new Date(reply.createdAt))}
                          </span>
                        </div>
                        <p className="text-base font-semibold leading-relaxed text-[var(--foreground)]">
                          {reply.content}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-theme-muted">
                          <button className="flex items-center gap-1 hover:text-theme-accent transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{reply._count.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reply Form */}
            <ReplyForm postId={post.id} isSignedIn={!!session?.user} />
          </div>
        </div>
      </section>
    </div>
  )
}
