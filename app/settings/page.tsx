'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Camera,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
  })

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
  })

  if (status === 'loading') {
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

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaveMessage('Profile updated successfully!')
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('Passwords do not match!')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaveMessage('Password changed successfully!')
      setIsSaving(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const handleNotificationsSave = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaveMessage('Notification preferences updated!')
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-theme-primary hover:opacity-80 font-bold mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-[var(--foreground)] mb-2">SETTINGS</h1>
            <p className="text-lg font-semibold text-theme-muted">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className="mb-6 p-4 bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] border-2 border-theme-primary rounded-lg">
              <p className="font-bold text-theme-primary">{saveMessage}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-[var(--border)] sticky top-24">
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

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <User className="w-6 h-6" />
                      PROFILE SETTINGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSave} className="space-y-6">
                      {/* Avatar */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-3">
                          PROFILE PICTURE
                        </label>
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                            {session.user?.image ? (
                              <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-12 h-12 text-[var(--primary-foreground)]" />
                            )}
                          </div>
                          <div>
                            <Button type="button" variant="outline" className="font-bold mb-2">
                              <Camera className="w-4 h-4 mr-2" />
                              UPLOAD PHOTO
                            </Button>
                            <p className="text-xs font-medium text-theme-muted">
                              JPG, PNG or GIF. Max 2MB.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          FULL NAME
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Your full name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="your@email.com"
                        />
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          BIO
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                          placeholder="Tell us about yourself and your sustainability journey..."
                        />
                        <p className="text-xs font-medium text-theme-muted mt-2">
                          {profileData.bio.length} / 500 characters
                        </p>
                      </div>

                      <Button type="submit" className="w-full font-black" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      SECURITY SETTINGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CURRENT PASSWORD
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          NEW PASSWORD
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CONFIRM NEW PASSWORD
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        />
                      </div>

                      <Button type="submit" className="w-full font-black" disabled={isSaving}>
                        <Lock className="w-4 h-4 mr-2" />
                        {isSaving ? 'UPDATING...' : 'UPDATE PASSWORD'}
                      </Button>
                    </form>

                    <div className="mt-8 p-6 bg-[var(--muted)] rounded-lg">
                      <h4 className="font-black text-[var(--foreground)] mb-2">PASSWORD REQUIREMENTS</h4>
                      <ul className="space-y-1 text-sm font-medium text-theme-muted">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Bell className="w-6 h-6" />
                      NOTIFICATION PREFERENCES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                        { key: 'newsletter', label: 'Newsletter', desc: 'Weekly sustainability tips and articles' },
                        { key: 'communityUpdates', label: 'Community Updates', desc: 'New forum posts and replies' },
                        { key: 'productUpdates', label: 'Product Updates', desc: 'New products and special offers' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between p-4 bg-[var(--muted)] rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-black text-[var(--foreground)] mb-1">{item.label}</h4>
                            <p className="text-sm font-medium text-theme-muted">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer ml-4">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[var(--border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <Button onClick={handleNotificationsSave} className="w-full font-black" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE PREFERENCES'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      PRIVACY & DATA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-6 bg-[var(--muted)] rounded-lg">
                        <h4 className="font-black text-[var(--foreground)] mb-2">DATA EXPORT</h4>
                        <p className="text-sm font-medium text-theme-muted mb-4">
                          Download a copy of your personal data, including profile information, orders, and activity.
                        </p>
                        <Button variant="outline" className="font-bold">
                          REQUEST DATA EXPORT
                        </Button>
                      </div>

                      <div className="p-6 bg-[var(--muted)] rounded-lg">
                        <h4 className="font-black text-[var(--foreground)] mb-2">PROFILE VISIBILITY</h4>
                        <p className="text-sm font-medium text-theme-muted mb-4">
                          Control who can see your profile and activity on Project Exodus.
                        </p>
                        <select className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] font-medium focus:outline-none focus:border-theme-primary">
                          <option>Public - Everyone can see your profile</option>
                          <option>Community Only - Only registered users</option>
                          <option>Private - Only you can see your profile</option>
                        </select>
                      </div>

                      <div className="p-6 bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] border-2 border-theme-secondary rounded-lg">
                        <div className="flex items-start gap-4">
                          <AlertCircle className="w-6 h-6 text-theme-secondary flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-black text-theme-secondary mb-2">DELETE ACCOUNT</h4>
                            <p className="text-sm font-medium text-theme-muted mb-4">
                              Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <Button variant="outline" className="font-bold border-2 border-theme-secondary text-theme-secondary hover:bg-theme-secondary hover:text-[var(--secondary-foreground)]">
                              <Trash2 className="w-4 h-4 mr-2" />
                              DELETE ACCOUNT
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
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
