'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, MessageSquare, Users, TrendingUp, Pin,
  ChevronRight, Search, Filter, Clock, MessageCircle,
  Bookmark, ThumbsUp, Lock, Plus
} from 'lucide-react'
import Link from 'next/link'

// Forum categories
const forumCategories = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Open discussions about Exodology concepts and applications',
    icon: MessageSquare,
    color: 'from-blue-500 to-indigo-600',
    topics: 24,
    posts: 156
  },
  {
    id: 'case-studies',
    name: 'Case Study Discussion',
    description: 'Analyze and discuss transition case studies',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
    topics: 18,
    posts: 89
  },
  {
    id: 'methodology',
    name: 'Research & Methodology',
    description: 'Discuss research methods and theoretical frameworks',
    icon: Bookmark,
    color: 'from-purple-500 to-violet-600',
    topics: 12,
    posts: 67
  },
  {
    id: 'practice',
    name: 'Practitioner Exchange',
    description: 'Share experiences from real-world transition work',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    topics: 15,
    posts: 93
  }
]

// Sample discussions (in production, these would come from a database)
const sampleDiscussions = [
  {
    id: 'd1',
    title: 'Applying MLP to Digital Platform Transitions',
    category: 'general',
    author: 'Dr. Sarah Lindqvist',
    authorLevel: 'master',
    excerpt: 'Has anyone applied the multi-level perspective to analyze transitions in digital platform ecosystems? I\'m finding that niche-regime dynamics behave differently...',
    replies: 12,
    likes: 24,
    lastActivity: '2 hours ago',
    pinned: true
  },
  {
    id: 'd2',
    title: 'Comparing German Energiewende with UK Energy Policy',
    category: 'case-studies',
    author: 'Priya Sharma',
    authorLevel: 'stewardship',
    excerpt: 'I\'m preparing a comparative analysis of energy transitions and would love input from those familiar with both cases...',
    replies: 8,
    likes: 15,
    lastActivity: '5 hours ago',
    pinned: false
  },
  {
    id: 'd3',
    title: 'Justice Framework Application: Challenges in Practice',
    category: 'methodology',
    author: 'Marcus Okonkwo',
    authorLevel: 'master',
    excerpt: 'The theoretical frameworks for just transitions are well-developed, but I\'m encountering practical challenges when applying them in contexts with weak civil society...',
    replies: 21,
    likes: 38,
    lastActivity: '1 day ago',
    pinned: true
  },
  {
    id: 'd4',
    title: 'Community Resistance in Agricultural Transitions',
    category: 'practice',
    author: 'Ana Reis',
    authorLevel: 'stewardship',
    excerpt: 'Working with farming communities in Southern Brazil, we\'re facing significant resistance to sustainable practices. Seeking advice from those with similar experiences...',
    replies: 14,
    likes: 29,
    lastActivity: '1 day ago',
    pinned: false
  },
  {
    id: 'd5',
    title: 'Quantitative Methods in Transition Analysis',
    category: 'methodology',
    author: 'Hiroshi Tanaka',
    authorLevel: 'application',
    excerpt: 'Most transition studies use qualitative methods. I\'m exploring how quantitative approaches might complement our toolkit. Anyone working on similar questions?',
    replies: 6,
    likes: 12,
    lastActivity: '2 days ago',
    pinned: false
  },
  {
    id: 'd6',
    title: 'The Role of Financial Institutions in Transitions',
    category: 'general',
    author: 'Michael Green',
    authorLevel: 'literacy',
    excerpt: 'As a graduate researcher, I\'m curious about how financial institutions can accelerate or hinder transitions. What readings would you recommend?',
    replies: 9,
    likes: 18,
    lastActivity: '3 days ago',
    pinned: false
  }
]

const levelColors = {
  'literacy': 'bg-green-500',
  'application': 'bg-teal-500',
  'stewardship': 'bg-purple-500',
  'master': 'bg-amber-500'
}

export default function DiscussionsPage() {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDiscussions = sampleDiscussions.filter(d => {
    if (selectedCategory && d.category !== selectedCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!d.title.toLowerCase().includes(query) && !d.excerpt.toLowerCase().includes(query)) return false
    }
    return true
  })

  const pinnedDiscussions = filteredDiscussions.filter(d => d.pinned)
  const regularDiscussions = filteredDiscussions.filter(d => !d.pinned)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Discussion Forum</h1>
                <p className="text-xl text-white/80">
                  Academic discourse and knowledge exchange
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{forumCategories.reduce((sum, c) => sum + c.topics, 0)}</div>
                <div className="text-sm text-white/70">Topics</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{forumCategories.reduce((sum, c) => sum + c.posts, 0)}</div>
                <div className="text-sm text-white/70">Posts</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{forumCategories.length}</div>
                <div className="text-sm text-white/70">Categories</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">42</div>
                <div className="text-sm text-white/70">Active Members</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Not signed in notice */}
          {!session && (
            <Card className="border-2 border-[var(--primary)]/30 mb-8">
              <CardContent className="p-6 flex items-center gap-4">
                <Lock className="w-8 h-8 text-[var(--primary)]" />
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--foreground)]">Sign in to participate</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    You can browse discussions, but need to sign in to post or reply.
                  </p>
                </div>
                <Link href="/auth/signin">
                  <Button>Sign In</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--foreground)] mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === null
                          ? 'bg-[var(--primary)] text-white'
                          : 'hover:bg-[var(--muted)]/50 text-[var(--muted-foreground)]'
                      }`}
                    >
                      All Discussions
                    </button>
                    {forumCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-[var(--primary)] text-white'
                            : 'hover:bg-[var(--muted)]/50 text-[var(--muted-foreground)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-xs opacity-70">{cat.topics}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Community Guidelines</h3>
                  <ul className="text-sm text-[var(--muted-foreground)] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      Be respectful and constructive
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      Cite sources and evidence
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      Stay on topic
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      Follow academic conventions
                    </li>
                  </ul>
                  <Link href="/exodology/about/ethics" className="block mt-3">
                    <span className="text-sm text-[var(--primary)] hover:underline">
                      View full ethics guidelines
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and New Topic */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                </div>
                {session && (
                  <Button className="bg-gradient-to-r from-indigo-500 to-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    New Topic
                  </Button>
                )}
              </div>

              {/* Category header if filtered */}
              {selectedCategory && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[var(--muted)]/30 to-[var(--muted)]/10">
                  {(() => {
                    const cat = forumCategories.find(c => c.id === selectedCategory)
                    if (!cat) return null
                    const Icon = cat.icon
                    return (
                      <>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[var(--foreground)]">{cat.name}</h2>
                          <p className="text-sm text-[var(--muted-foreground)]">{cat.description}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}

              {/* Pinned Discussions */}
              {pinnedDiscussions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider flex items-center gap-2">
                    <Pin className="w-4 h-4" />
                    Pinned
                  </h3>
                  {pinnedDiscussions.map((discussion, i) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <DiscussionCard discussion={discussion} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Regular Discussions */}
              <div className="space-y-3">
                {pinnedDiscussions.length > 0 && regularDiscussions.length > 0 && (
                  <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                    Recent Discussions
                  </h3>
                )}
                {regularDiscussions.map((discussion, i) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (pinnedDiscussions.length + i) * 0.05 }}
                  >
                    <DiscussionCard discussion={discussion} />
                  </motion.div>
                ))}

                {filteredDiscussions.length === 0 && (
                  <Card className="border border-[var(--border)]">
                    <CardContent className="p-8 text-center">
                      <MessageCircle className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
                      <h3 className="font-bold text-[var(--foreground)] mb-2">No discussions found</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {searchQuery ? 'Try adjusting your search terms.' : 'Be the first to start a discussion in this category!'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DiscussionCard({ discussion }: { discussion: typeof sampleDiscussions[0] }) {
  const category = forumCategories.find(c => c.id === discussion.category)

  return (
    <Card className="border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Author avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            {discussion.author.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {discussion.pinned && (
                <Pin className="w-3 h-3 text-amber-500" />
              )}
              <h3 className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                {discussion.title}
              </h3>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-2">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${levelColors[discussion.authorLevel as keyof typeof levelColors]}`} />
                {discussion.author}
              </span>
              {category && (
                <span className="px-2 py-0.5 rounded bg-[var(--muted)]/50">
                  {category.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {discussion.lastActivity}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              {discussion.excerpt}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {discussion.replies} replies
              </span>
              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {discussion.likes} likes
              </span>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}
