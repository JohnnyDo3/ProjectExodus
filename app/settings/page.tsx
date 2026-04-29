'use client'

import { useSession } from 'next-auth/react'
import { useHasMounted } from '@/lib/hooks/useHasMounted'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Save,
  ArrowLeft,
  AlertCircle,
  Eye,
  CreditCard,
} from 'lucide-react'
import Link from 'next/link'
import { ProfileBusinessCard } from '@/components/profile/ProfileBusinessCard'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const hasMounted = useHasMounted()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    newsletter: true,
    communityUpdates: true,
    productUpdates: false,
    messages: true,
    connectionRequests: true,
    endorsements: true,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'followers', // 'public' | 'followers' | 'private'
    showExperience: true,
    showEducation: true,
    showSkills: true,
    showBadges: true,
    showContact: false,
    showEmail: false,
    showPhone: false,
    allowMessages: 'followers', // 'everyone' | 'followers' | 'nobody'
    resumeVisibility: 'followers', // Always 'followers' (enforced)
  })

  // Fetch user settings on mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserSettings()
    }
  }, [session?.user?.id])

  const fetchUserSettings = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}`)
      const data = await res.json()

      if (data.success) {
        const user = data.data
        // Load privacy settings if they exist
        if (user.privacySettings) {
          setPrivacySettings({
            ...privacySettings,
            ...user.privacySettings,
          })
        }
        // Load notification preferences if they exist
        if (user.notificationPreferences) {
          setNotifications({
            ...notifications,
            ...user.notificationPreferences,
          })
        }
      }
    } catch (error) {
      console.error('Error fetching user settings:', error)
    }
  }

  if (hasMounted && status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('Passwords do not match!')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    setIsSaving(true)

    // Simulate API call (implement actual password change endpoint)
    setTimeout(() => {
      setSaveMessage('Password changed successfully!')
      setIsSaving(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const handleNotificationsSave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationPreferences: notifications }),
      })

      if (res.ok) {
        setSaveMessage('Notification preferences updated!')
      } else {
        const data = await res.json()
        setSaveMessage(data.error || 'Failed to save notification preferences')
      }
    } catch {
      setSaveMessage('Failed to save notification preferences')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handlePrivacySave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privacySettings }),
      })

      if (res.ok) {
        setSaveMessage('Privacy settings updated!')
      } else {
        setSaveMessage('Failed to update privacy settings')
      }
    } catch (error) {
      setSaveMessage('Error updating privacy settings')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Digital Business Card', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy Settings', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/my/volition"
              className="inline-flex items-center gap-2 text-theme-primary hover:opacity-80 font-bold mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Volition
            </Link>
            <h1 className="text-4xl font-black text-[var(--foreground)] mb-2">PROFESSIONAL SETTINGS</h1>
            <p className="text-lg font-semibold text-theme-muted">
              Build your professional profile and manage your account
            </p>
          </div>

          {/* Toast Notification - Fixed position */}
          {saveMessage && (
            <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className={`p-4 rounded-xl shadow-2xl border-2 ${
                saveMessage.toLowerCase().includes('failed') || saveMessage.toLowerCase().includes('error')
                  ? 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--card))] border-theme-secondary'
                  : 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--card))] border-theme-primary'
              }`}>
                <p className={`font-bold ${
                  saveMessage.toLowerCase().includes('failed') || saveMessage.toLowerCase().includes('error')
                    ? 'text-theme-secondary'
                    : 'text-theme-primary'
                }`}>
                  {saveMessage}
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDEBAR TABS (1/3) */}
            <div className="lg:col-span-1">
              <Card className="border-4 border-theme-primary sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${
                          activeTab === tab.id
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT CONTENT (2/3) */}
            <div className="lg:col-span-2">
              {/* DIGITAL BUSINESS CARD TAB */}
              {activeTab === 'profile' && session?.user?.id && (
                <ProfileBusinessCard
                  userId={session.user.id}
                  isFullView={true}
                />
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      SECURITY
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div className="p-4 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-2 border-theme-accent rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-theme-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm text-[var(--foreground)] mb-1">
                              Password Requirements
                            </p>
                            <ul className="text-xs font-medium text-theme-muted space-y-1">
                              <li>• At least 8 characters long</li>
                              <li>• Include uppercase and lowercase letters</li>
                              <li>• Include at least one number</li>
                              <li>• Include at least one special character</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CURRENT PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Enter your current password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          NEW PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Enter your new password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CONFIRM NEW PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Confirm your new password"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full font-black" disabled={isSaving}>
                        <Lock className="w-4 h-4 mr-2" />
                        {isSaving ? 'UPDATING...' : 'UPDATE PASSWORD'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Bell className="w-6 h-6" />
                      NOTIFICATION PREFERENCES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm font-medium text-theme-muted">
                      Choose what notifications you'd like to receive
                    </p>

                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Email Notifications</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Receive email updates about your account activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) =>
                              setNotifications({ ...notifications, email: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Newsletter */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Newsletter</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Monthly sustainability insights and platform updates
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.newsletter}
                            onChange={(e) =>
                              setNotifications({ ...notifications, newsletter: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Community Updates */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Community Updates</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New forum posts, discussions, and community activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.communityUpdates}
                            onChange={(e) =>
                              setNotifications({ ...notifications, communityUpdates: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Product Updates */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Product Updates</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New features, improvements, and platform announcements
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.productUpdates}
                            onChange={(e) =>
                              setNotifications({ ...notifications, productUpdates: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Messages */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Messages</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Direct messages from other members
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.messages}
                            onChange={(e) =>
                              setNotifications({ ...notifications, messages: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Connection Requests */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Connection Requests</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New followers and connection requests
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.connectionRequests}
                            onChange={(e) =>
                              setNotifications({ ...notifications, connectionRequests: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Endorsements */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Endorsements</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            When someone endorses your skills
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.endorsements}
                            onChange={(e) =>
                              setNotifications({ ...notifications, endorsements: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleNotificationsSave}
                      className="w-full font-black"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE PREFERENCES'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* PRIVACY SETTINGS TAB */}
              {activeTab === 'privacy' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      PRIVACY SETTINGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm font-medium text-theme-muted">
                      Control who can see your profile information and contact you
                    </p>

                    {/* Profile Visibility */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Profile Visibility</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Who can view your full profile
                          </p>
                          <select
                            value={privacySettings.profileVisibility}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                profileVisibility: e.target.value as 'public' | 'followers' | 'private',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="public">Public - Anyone can view</option>
                            <option value="followers">Followers Only</option>
                            <option value="private">Private - Only you</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Show/Hide Sections */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-[var(--foreground)]">Show on Profile</h4>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Work Experience</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showExperience}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showExperience: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Education</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEducation}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showEducation: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Skills & Interests</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showSkills}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showSkills: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Badges & Achievements</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showBadges}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showBadges: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Contact Information</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showContact}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showContact: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <div>
                          <div className="font-bold text-[var(--foreground)]">Show Email Publicly</div>
                          <p className="text-xs font-medium text-theme-muted mt-1">
                            Display your email address on your public profile
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showEmail: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <div>
                          <div className="font-bold text-[var(--foreground)]">Show Phone Publicly</div>
                          <p className="text-xs font-medium text-theme-muted mt-1">
                            Display your phone number on your public profile
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showPhone}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showPhone: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>
                    </div>

                    {/* Messaging Permissions */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Who Can Message You</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Control who can send you direct messages
                          </p>
                          <select
                            value={privacySettings.allowMessages}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                allowMessages: e.target.value as 'everyone' | 'followers' | 'nobody',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="everyone">Everyone</option>
                            <option value="followers">Followers Only</option>
                            <option value="nobody">Nobody</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Resume Visibility */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Resume/CV Visibility</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Control who can view and download your resume
                          </p>
                          <select
                            value={privacySettings.resumeVisibility}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                resumeVisibility: e.target.value as 'public' | 'followers' | 'private',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="public">Public - Anyone can view</option>
                            <option value="followers">Followers Only</option>
                            <option value="private">Private - Only you</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handlePrivacySave}
                      className="w-full font-black"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE PRIVACY SETTINGS'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
