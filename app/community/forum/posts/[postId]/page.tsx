import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, ThumbsUp, MessageSquare, Pin, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'

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
  const post = await getPost(postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="py-12 bg-white border-b-4 border-sand-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href={`/community/forum/${post.category.slug}`} className="inline-block mb-6">
              <Button variant="outline" size="sm" className="font-bold">
                ← BACK TO {post.category.name.toUpperCase()}
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              {post.pinned && (
                <div className="flex items-center gap-2 px-3 py-1 bg-terra-100 rounded-full">
                  <Pin className="w-4 h-4 text-terra-600" />
                  <span className="text-sm font-black text-terra-600 uppercase">Pinned</span>
                </div>
              )}
              <h1 className="text-4xl font-black" style={{ color: '#000' }}>
                {post.title}
              </h1>
            </div>

            <div className="flex items-center gap-6 text-sm font-semibold" style={{ color: '#666' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name || 'Anonymous'}</span>
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
            <Card className="border-4 border-ocean-300">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  {/* Author */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-moss-100 flex items-center justify-center mb-2">
                      {post.author.image ? (
                        <img
                          src={post.author.image}
                          alt={post.author.name || 'User'}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-moss-600" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black" style={{ color: '#000' }}>
                        {post.author.name || 'Anonymous'}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="text-lg font-semibold leading-relaxed whitespace-pre-wrap" style={{ color: '#1f2937' }}>
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
            <h2 className="text-2xl font-black mb-6" style={{ color: '#000' }}>
              REPLIES ({post.replies.length})
            </h2>

            <div className="space-y-4 mb-8">
              {post.replies.map((reply: any) => (
                <Card key={reply.id} className="border-2 border-moss-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Author */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                          {reply.author.image ? (
                            <img
                              src={reply.author.image}
                              alt={reply.author.name || 'User'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-ocean-600" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-black" style={{ color: '#000' }}>
                            {reply.author.name || 'Anonymous'}
                          </span>
                          <span className="text-sm font-semibold" style={{ color: '#888' }}>
                            {formatDate(new Date(reply.createdAt))}
                          </span>
                        </div>
                        <p className="text-base font-semibold leading-relaxed" style={{ color: '#1f2937' }}>
                          {reply.content}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-sm font-bold" style={{ color: '#666' }}>
                          <button className="flex items-center gap-1 hover:text-ocean-600 transition-colors">
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

            {/* Reply Form Placeholder */}
            <Card className="border-4 border-moss-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-black mb-4" style={{ color: '#000' }}>
                  ADD YOUR REPLY
                </h3>
                <textarea
                  className="w-full p-4 border-2 border-sand-300 rounded-xl font-semibold resize-none focus:outline-none focus:border-moss-500"
                  rows={4}
                  placeholder="Share your thoughts..."
                  disabled
                />
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm font-semibold" style={{ color: '#888' }}>
                    Sign in to post a reply
                  </p>
                  <Button size="lg" className="font-black" disabled>
                    POST REPLY
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
