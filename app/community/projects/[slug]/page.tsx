'use client'

import { BackButton } from '@/components/navigation/BackButton'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import TeamCollaborationVisualization from '@/components/projects/TeamCollaborationVisualization'
import {
  ArrowLeft,
  Users,
  Target,
  Calendar,
  MessageSquare,
  Send,
  Settings as SettingsIcon,
  Shield,
  Crown,
  User,
  Network,
} from 'lucide-react'
import Link from 'next/link'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    fetchProject()
  }, [params.slug])

  useEffect(() => {
    if (project?.id) {
      fetchMessages()
      // Poll for new messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000)
      return () => clearInterval(interval)
    }
  }, [project?.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects`)
      const data = await res.json()
      if (data.success) {
        const proj = data.data.find((p: any) => p.slug === params.slug)
        setProject(proj)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async () => {
    if (!project?.id) return
    try {
      const res = await fetch(`/api/projects/${project.id}/messages`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      const res = await fetch(`/api/projects/${project.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      })

      const data = await res.json()
      if (data.success) {
        setNewMessage('')
        fetchMessages()
      } else {
        alert(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-4 border-theme-secondary">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-black mb-4 text-theme-muted">PROJECT NOT FOUND</h2>
            <p className="text-lg font-semibold mb-8 text-theme-muted">
              This project doesn't exist or has been removed.
            </p>
            <Link href="/community/projects">
              <Button className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO PROJECTS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusColors = {
    ACTIVE: { bg: 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]', text: 'text-theme-primary' },
    COMPLETED: { bg: 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]', text: 'text-theme-accent' },
    PLANNING: { bg: 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]', text: 'text-theme-secondary' },
  }

  const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING
  const isMember = project.members?.some((m: any) => m.userId === session?.user?.id)
  const isCreator = project.creatorId === session?.user?.id
  const userMembership = project.members?.find((m: any) => m.userId === session?.user?.id)

  const getRoleBadge = (member: any) => {
    if (member.userId === project.creatorId) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] text-xs font-black">
          <Crown className="w-3 h-3" />
          OWNER
        </div>
      )
    }
    if (member.role === 'ADMIN') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_80%,var(--background))] text-[var(--primary-foreground)] text-xs font-black">
          <Shield className="w-3 h-3" />
          ADMIN
        </div>
      )
    }
    if (member.role === 'MODERATOR') {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_60%,var(--background))] text-[var(--foreground)] text-xs font-black">
          <Shield className="w-3 h-3" />
          MOD
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" />
          </div>
          <div className="max-w-6xl mx-auto">
            <Link href="/community/projects">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO PROJECTS
              </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`px-4 py-2 rounded-full ${colors.bg} ${colors.text} font-black text-sm uppercase`}>
                    {project.status}
                  </div>
                  {isCreator && (
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] font-black text-sm uppercase flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      YOUR PROJECT
                    </div>
                  )}
                </div>

                <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                  {project.name}
                </h1>
                <p className="text-xl font-semibold text-theme-muted mb-6">
                  {project.description}
                </p>

                {project.goal && (
                  <div className="flex items-start gap-3 p-4 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] rounded-lg border-2 border-theme-accent mb-6">
                    <Target className="w-6 h-6 text-theme-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-black text-sm uppercase text-theme-accent mb-1">PROJECT GOAL</p>
                      <p className="font-semibold text-[var(--foreground)]">{project.goal}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm font-bold text-theme-muted">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{project._count?.members || 0} MEMBERS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {!isMember && (
                  <div className="mt-6">
                    <JoinProjectButton projectId={project.id} projectName={project.name} />
                  </div>
                )}
              </div>

              {/* Members Card */}
              <Card className="lg:w-80 border-4 border-theme-primary">
                <CardHeader>
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    MEMBERS ({project.members?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {project.members?.map((member: any) => (
                      <Link key={member.id} href={`/profile/${member.userId}`}>
                        <div className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--muted)]/70 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                            {member.user.image ? (
                              <img
                                src={member.user.image}
                                alt={member.user.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-sm truncate text-[var(--foreground)] hover:text-theme-primary transition-colors">
                              {member.user.name || 'Anonymous'}
                            </p>
                            <div className="mt-1">
                              {getRoleBadge(member)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Network Visualization - Members Only */}
      {isMember && (
        <section className="py-16 bg-gradient-to-b from-[var(--background)] to-[color-mix(in_srgb,var(--primary)_5%,var(--background))]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-4">
                  <Network className="w-5 h-5" />
                  TEAM NETWORK
                </div>
                <h2 className="text-4xl font-black mb-3 text-[var(--foreground)]">
                  TEAM COLLABORATION MAP
                </h2>
                <p className="text-lg font-semibold text-theme-muted max-w-2xl mx-auto">
                  Visualize how your team connects and collaborates on {project.name}
                </p>
              </div>
              <TeamCollaborationVisualization
                projectId={project.id}
                projectName={project.name}
                members={project.members?.map((m: any) => ({
                  id: m.id,
                  userId: m.userId,
                  name: m.user.name || 'Anonymous',
                  image: m.user.image,
                  role: m.role,
                  isCreator: m.userId === project.creatorId,
                  messageCount: messages.filter((msg: any) => msg.userId === m.userId).length,
                })) || []}
                currentUserId={session?.user?.id || null}
                messages={messages}
              />
            </div>
          </div>
        </section>
      )}

      {/* Project Discussion */}
      {isMember && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="border-4 border-theme-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-black flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    PROJECT DISCUSSION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Messages */}
                  <div className="mb-6 h-96 overflow-y-auto bg-[var(--muted)] rounded-lg p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageSquare className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-bold text-theme-muted">No messages yet</p>
                        <p className="text-sm font-medium text-theme-muted mt-2">
                          Be the first to start the conversation!
                        </p>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isOwnMessage = msg.userId === session?.user?.id
                        const memberData = project.members?.find((m: any) => m.userId === msg.userId)

                        return (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                              {msg.user.image ? (
                                <img
                                  src={msg.user.image}
                                  alt={msg.user.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                              )}
                            </div>
                            <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                {!isOwnMessage && (
                                  <>
                                    <span className="font-black text-sm text-[var(--foreground)]">
                                      {msg.user.name || 'Anonymous'}
                                    </span>
                                    {memberData && getRoleBadge(memberData)}
                                  </>
                                )}
                                {isOwnMessage && (
                                  <>
                                    {memberData && getRoleBadge(memberData)}
                                    <span className="font-black text-sm text-[var(--foreground)]">
                                      {msg.user.name || 'Anonymous'}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div
                                className={`inline-block p-3 rounded-lg ${
                                  isOwnMessage
                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                    : 'bg-[var(--background)] text-[var(--foreground)]'
                                } font-semibold`}
                              >
                                {msg.content}
                              </div>
                              <p className="text-xs font-medium text-theme-muted mt-1">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isSending}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      disabled={isSending || !newMessage.trim()}
                      className="font-bold px-6"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      SEND
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Not a Member Message */}
      {!isMember && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <Shield className="w-16 h-16 text-theme-secondary mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black mb-4 text-theme-muted">
                    JOIN TO ACCESS PROJECT DISCUSSION
                  </h3>
                  <p className="text-lg font-semibold mb-6 text-theme-muted">
                    Become a member to chat with the team and collaborate on this project!
                  </p>
                  <JoinProjectButton projectId={project.id} projectName={project.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
