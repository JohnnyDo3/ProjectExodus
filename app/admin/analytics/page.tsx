'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Users,
  FileText,
  Package,
  FolderKanban,
  TrendingUp,
  Eye,
  Loader2,
  RefreshCw,
  Download,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Summary {
  totalUsers: number
  totalArticles: number
  totalProducts: number
  totalProjects: number
  newUsersInRange: number
  articleReadsInRange: number
}

interface ChartData {
  userSignups: { date: string; signups: number }[]
  cumulativeUsers: { date: string; total: number }[]
  content: { date: string; articles: number; products: number; projects: number }[]
  roleDistribution: { role: string; count: number }[]
  reportStatus: { status: string; count: number }[]
  topArticles: { title: string; views: number; author: string }[]
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const roleColors: Record<string, string> = {
  USER: '#6366f1',
  EDITOR: '#22c55e',
  MODERATOR: '#f59e0b',
  ADMIN: '#ef4444',
  SUPER_ADMIN: '#8b5cf6',
}

const statusColors: Record<string, string> = {
  PENDING: '#f59e0b',
  REVIEWING: '#6366f1',
  RESOLVED: '#22c55e',
  DISMISSED: '#9ca3af',
}

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [charts, setCharts] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState('30')

  const fetchAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`)
      if (res.ok) {
        const data = await res.json()
        setSummary(data.summary)
        setCharts(data.charts)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [range])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading && !summary) {
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
          <h1 className="text-2xl font-bold text-theme-primary">Analytics</h1>
          <p className="text-theme-muted mt-1">Platform performance and insights</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <Button variant="outline" size="sm" onClick={fetchAnalytics} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">{summary.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">+{summary.newUsersInRange.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">New Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">{summary.totalArticles.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">Articles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">{summary.totalProducts.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">Products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">{summary.totalProjects.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">{summary.articleReadsInRange.toLocaleString()}</p>
                  <p className="text-xs text-theme-muted">Article Reads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {charts && (
        <>
          {/* User Growth Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Signups */}
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
              <CardHeader>
                <CardTitle className="text-lg">Daily User Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={charts.userSignups}>
                      <defs>
                        <linearGradient id="signupsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                        stroke="var(--card-border)"
                      />
                      <YAxis
                        tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                        stroke="var(--card-border)"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--card-border)',
                          borderRadius: '8px',
                        }}
                        labelFormatter={formatDate}
                      />
                      <Area
                        type="monotone"
                        dataKey="signups"
                        stroke="#6366f1"
                        fill="url(#signupsGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Cumulative Users */}
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
              <CardHeader>
                <CardTitle className="text-lg">Total User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={charts.cumulativeUsers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                        stroke="var(--card-border)"
                      />
                      <YAxis
                        tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                        stroke="var(--card-border)"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--card-border)',
                          borderRadius: '8px',
                        }}
                        labelFormatter={formatDate}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Created Chart */}
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardHeader>
              <CardTitle className="text-lg">Content Created Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.content}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                      stroke="var(--card-border)"
                    />
                    <YAxis
                      tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                      stroke="var(--card-border)"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                      }}
                      labelFormatter={formatDate}
                    />
                    <Legend />
                    <Bar dataKey="articles" name="Articles" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="products" name="Products" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="projects" name="Projects" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Role Distribution */}
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
              <CardHeader>
                <CardTitle className="text-lg">User Roles Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={charts.roleDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="role"
                        label={({ payload }: any) => `${payload.role}: ${payload.count}`}
                        labelLine={false}
                      >
                        {charts.roleDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={roleColors[entry.role] || COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--card-border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Report Status */}
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
              <CardHeader>
                <CardTitle className="text-lg">Report Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={charts.reportStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="status"
                        label={({ payload }: any) => `${payload.status}: ${payload.count}`}
                        labelLine={false}
                      >
                        {charts.reportStatus.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={statusColors[entry.status] || COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--card-border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Articles */}
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={charts.topArticles}
                    layout="vertical"
                    margin={{ left: 20, right: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                    <XAxis
                      type="number"
                      tick={{ fill: 'var(--theme-muted)', fontSize: 12 }}
                      stroke="var(--card-border)"
                    />
                    <YAxis
                      type="category"
                      dataKey="title"
                      tick={{ fill: 'var(--theme-muted)', fontSize: 11 }}
                      stroke="var(--card-border)"
                      width={200}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [value.toLocaleString(), 'Views']}
                    />
                    <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
