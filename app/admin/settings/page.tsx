'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { ArrowLeft, Save, Globe, Mail, Database, Shield, Palette, Bell } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Project Exodus',
    siteDescription: 'The world\'s most accessible sustainability hub',
    siteUrl: 'https://projectexodus.com',
    contactEmail: 'hello@projectexodus.com',
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    marketingEmails: false,
    communityPosts: true
  })

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-white border-b border-sand-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-earth-700 mt-1">Configure your platform</p>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* General */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-moss-600" />
                <div>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic site configuration</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Site Name" value={settings.siteName} />
              <Textarea label="Site Description" value={settings.siteDescription} rows={3} />
              <Input label="Site URL" type="url" value={settings.siteUrl} />
              <Input label="Contact Email" type="email" value={settings.contactEmail} />
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-ocean-600" />
                <div>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Visual preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Default Theme"
                value={settings.theme}
                options={[
                  { value: 'light', label: 'Light Mode' },
                  { value: 'dark', label: 'Dark Mode' },
                  { value: 'auto', label: 'Auto (System)' }
                ]}
              />
              <Select
                label="Language"
                value={settings.language}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' }
                ]}
              />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-terra-600" />
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage email preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.emailNotifications} className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Email Notifications</div>
                  <div className="text-sm text-earth-600">Receive important updates</div>
                </div>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={settings.communityPosts} className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Community Activity</div>
                  <div className="text-sm text-earth-600">Get notified of forum posts</div>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Database */}
          <Card className="bg-moss-50 border-moss-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-moss-700" />
                <div>
                  <CardTitle style={{ color: '#36763d' }}>Database Status</CardTitle>
                  <CardDescription style={{ color: '#2d5e32' }}>Connection info</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Status</span>
                <span className="text-moss-700 font-bold">● Ready (Not Connected)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Provider</span>
                <span className="font-semibold">Neon PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Prisma</span>
                <span className="font-semibold">Schema Ready</span>
              </div>
              <Button className="w-full mt-2">
                Connect Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
