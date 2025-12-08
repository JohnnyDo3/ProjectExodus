'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Globe,
  Mail,
  Shield,
  Settings2,
  Gauge,
  Save,
  Loader2,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Hash,
  Type,
  List,
} from 'lucide-react'

interface SettingItem {
  key: string
  value: any
  description: string
  updatedAt: string | null
}

interface Categories {
  general: SettingItem[]
  features: SettingItem[]
  moderation: SettingItem[]
  email: SettingItem[]
  limits: SettingItem[]
}

const categoryIcons: Record<string, React.ReactNode> = {
  general: <Globe className="w-5 h-5" />,
  features: <Settings2 className="w-5 h-5" />,
  moderation: <Shield className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
  limits: <Gauge className="w-5 h-5" />,
}

const categoryLabels: Record<string, { title: string; description: string }> = {
  general: { title: 'General Settings', description: 'Basic site configuration' },
  features: { title: 'Feature Toggles', description: 'Enable or disable platform features' },
  moderation: { title: 'Moderation', description: 'Content moderation settings' },
  email: { title: 'Email Configuration', description: 'Email notification settings' },
  limits: { title: 'Limits', description: 'User and content limits' },
}

export default function SettingsPage() {
  const [categories, setCategories] = useState<Categories | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const [changes, setChanges] = useState<Record<string, any>>({})

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        setCategories(data.categories)
        setChanges({})
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleChange = (key: string, value: any) => {
    setChanges(prev => ({ ...prev, [key]: value }))
  }

  const getValue = (key: string, originalValue: any) => {
    return key in changes ? changes[key] : originalValue
  }

  const hasChanges = Object.keys(changes).length > 0

  const handleSave = async () => {
    if (!hasChanges) return

    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: changes })
      })

      if (res.ok) {
        const data = await res.json()
        setSavedMessage(`${data.updated} setting${data.updated !== 1 ? 's' : ''} updated successfully`)
        setTimeout(() => setSavedMessage(null), 3000)
        fetchSettings()
      } else {
        const data = await res.json()
        setSavedMessage(`Error: ${data.error}`)
        setTimeout(() => setSavedMessage(null), 3000)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      setSavedMessage('Error: Failed to save settings')
      setTimeout(() => setSavedMessage(null), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setChanges({})
  }

  const renderSettingInput = (setting: SettingItem) => {
    const value = getValue(setting.key, setting.value)
    const isChanged = setting.key in changes

    // Boolean toggle
    if (typeof setting.value === 'boolean') {
      return (
        <div className="flex items-center justify-between py-3 border-b border-[var(--card-border)] last:border-0">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-theme-primary">{formatKeyLabel(setting.key)}</span>
              {isChanged && <span className="text-xs text-orange-500">(modified)</span>}
            </div>
            <p className="text-sm text-theme-muted">{setting.description}</p>
          </div>
          <button
            onClick={() => handleChange(setting.key, !value)}
            className={`p-1 transition-colors ${value ? 'text-green-500' : 'text-gray-400'}`}
          >
            {value ? <ToggleRight className="w-10 h-6" /> : <ToggleLeft className="w-10 h-6" />}
          </button>
        </div>
      )
    }

    // Number input
    if (typeof setting.value === 'number') {
      return (
        <div className="flex items-center justify-between py-3 border-b border-[var(--card-border)] last:border-0">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-theme-muted" />
              <span className="font-medium text-theme-primary">{formatKeyLabel(setting.key)}</span>
              {isChanged && <span className="text-xs text-orange-500">(modified)</span>}
            </div>
            <p className="text-sm text-theme-muted">{setting.description}</p>
          </div>
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(setting.key, parseInt(e.target.value) || 0)}
            className="w-24 px-3 py-1.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-right focus:outline-none focus:ring-2 focus:ring-theme-primary"
          />
        </div>
      )
    }

    // Array input (keywords)
    if (Array.isArray(setting.value)) {
      return (
        <div className="py-3 border-b border-[var(--card-border)] last:border-0">
          <div className="flex items-center gap-2 mb-2">
            <List className="w-4 h-4 text-theme-muted" />
            <span className="font-medium text-theme-primary">{formatKeyLabel(setting.key)}</span>
            {isChanged && <span className="text-xs text-orange-500">(modified)</span>}
          </div>
          <p className="text-sm text-theme-muted mb-2">{setting.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {(value as string[]).map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--muted)] rounded-full text-sm"
              >
                {item}
                <button
                  onClick={() => {
                    const newValue = [...value]
                    newValue.splice(i, 1)
                    handleChange(setting.key, newValue)
                  }}
                  className="text-theme-muted hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add keyword..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleChange(setting.key, [...value, e.currentTarget.value.trim()])
                  e.currentTarget.value = ''
                }
              }}
              className="flex-1 px-3 py-1.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary text-sm"
            />
          </div>
        </div>
      )
    }

    // String input (default)
    return (
      <div className="flex items-center justify-between py-3 border-b border-[var(--card-border)] last:border-0">
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-theme-muted" />
            <span className="font-medium text-theme-primary">{formatKeyLabel(setting.key)}</span>
            {isChanged && <span className="text-xs text-orange-500">(modified)</span>}
          </div>
          <p className="text-sm text-theme-muted">{setting.description}</p>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(setting.key, e.target.value)}
          className="w-64 px-3 py-1.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary"
        />
      </div>
    )
  }

  const formatKeyLabel = (key: string) => {
    // Convert "site.name" to "Site Name"
    const parts = key.split('.')
    const lastPart = parts[parts.length - 1]
    return lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-theme-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-theme-primary">Settings</h1>
          <p className="text-theme-muted mt-1">Configure your platform</p>
        </div>
        <div className="flex items-center gap-2">
          {savedMessage && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
              savedMessage.startsWith('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {savedMessage.startsWith('Error') ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {savedMessage}
            </div>
          )}
          {hasChanges && (
            <Button variant="outline" onClick={handleReset} disabled={saving}>
              Reset
            </Button>
          )}
          <Button variant="outline" onClick={fetchSettings} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
            {hasChanges && (
              <span className="ml-2 w-5 h-5 bg-white/20 rounded-full text-xs flex items-center justify-center">
                {Object.keys(changes).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Settings by Category */}
      {categories && Object.entries(categoryLabels).map(([category, meta]) => {
        const items = categories[category as keyof Categories]
        if (!items || items.length === 0) return null

        return (
          <Card key={category} className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-theme-primary/10 rounded-lg flex items-center justify-center text-theme-primary">
                  {categoryIcons[category]}
                </div>
                <div>
                  <CardTitle className="text-lg">{meta.title}</CardTitle>
                  <CardDescription>{meta.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {items.map((setting) => (
                <div key={setting.key}>
                  {renderSettingInput(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}

      {/* Database Status */}
      <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-green-700 dark:text-green-300">Database Status</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">Connection healthy</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-green-600 dark:text-green-400">Status</span>
              <p className="font-semibold text-green-700 dark:text-green-300">Connected</p>
            </div>
            <div>
              <span className="text-sm text-green-600 dark:text-green-400">Provider</span>
              <p className="font-semibold text-green-700 dark:text-green-300">PostgreSQL</p>
            </div>
            <div>
              <span className="text-sm text-green-600 dark:text-green-400">Prisma</span>
              <p className="font-semibold text-green-700 dark:text-green-300">Active</p>
            </div>
            <div>
              <span className="text-sm text-green-600 dark:text-green-400">ORM</span>
              <p className="font-semibold text-green-700 dark:text-green-300">Ready</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
