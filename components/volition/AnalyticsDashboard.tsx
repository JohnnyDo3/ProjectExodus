'use client'

import { useEffect, useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  Users,
  FileText,
  Briefcase,
  BookOpen,
  Star,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────

interface AnalyticsData {
  articles: {
    total: number
    published: number
    drafts: number
    totalViews: number
    totalLikes: number
  }
  projects: {
    total: number
    created: number
    memberOf: number
  }
  posts: {
    total: number
    totalLikes: number
  }
  connections: {
    followers: number
    following: number
    mutual: number
  }
  learning: {
    modulesStarted: number
    modulesCompleted: number
    totalProgress: number
  }
  engagement: {
    last7days: { articleViews: number; newFollowers: number; postLikes: number }
    last30days: { articleViews: number; newFollowers: number; postLikes: number }
  }
  stockScore: number
}

// ── Helpers ────────────────────────────────────────────────────

function trendPercent(recent: number, total: number): number {
  if (total === 0) return 0
  // Approximate: 7-day portion vs 30-day portion
  // trend = (7d / 30d) compared to the expected 7/30 ratio
  // A ratio > ~23% means trending up
  return total === 0 ? 0 : Math.round((recent / total) * 100)
}

function TrendBadge({ value7d, value30d }: { value7d: number; value30d: number }) {
  if (value30d === 0 && value7d === 0) {
    return <span style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>--</span>
  }
  // Expected 7d share of 30d is ~23.3%. If higher, trending up.
  const expected = value30d * (7 / 30)
  const isUp = value7d >= expected
  const pct =
    expected === 0
      ? value7d > 0
        ? 100
        : 0
      : Math.round(((value7d - expected) / Math.max(expected, 1)) * 100)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        fontSize: 12,
        fontWeight: 600,
        color: isUp ? 'var(--success, #22c55e)' : 'var(--destructive, #ef4444)',
      }}
    >
      {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {Math.abs(pct)}%
    </span>
  )
}

// ── Skeleton ───────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.skeletonLine, width: '40%', height: 14 }} />
      <div style={{ ...styles.skeletonLine, width: '60%', height: 28, marginTop: 12 }} />
      <div style={{ ...styles.skeletonLine, width: '30%', height: 12, marginTop: 8 }} />
    </div>
  )
}

function SkeletonRow({ count }: { count: number }) {
  return (
    <div style={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  trend?: React.ReactNode
}) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <Icon size={18} style={{ color: 'var(--primary)' }} />
        <span style={styles.cardLabel}>{label}</span>
      </div>
      <div style={styles.cardValue}>{value}</div>
      {trend && <div style={styles.cardTrend}>{trend}</div>}
    </div>
  )
}

// ── Engagement Panel ───────────────────────────────────────────

function EngagementPanel({ engagement }: { engagement: AnalyticsData['engagement'] }) {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const data = period === '7d' ? engagement.last7days : engagement.last30days

  return (
    <div style={{ ...styles.card, gridColumn: '1 / -1' }}>
      <div style={styles.sectionHeader}>
        <BarChart3 size={18} style={{ color: 'var(--primary)' }} />
        <span style={styles.sectionTitle}>Engagement Overview</span>
        <div style={styles.tabGroup}>
          <button
            onClick={() => setPeriod('7d')}
            style={{
              ...styles.tab,
              ...(period === '7d' ? styles.tabActive : {}),
            }}
          >
            7 days
          </button>
          <button
            onClick={() => setPeriod('30d')}
            style={{
              ...styles.tab,
              ...(period === '30d' ? styles.tabActive : {}),
            }}
          >
            30 days
          </button>
        </div>
      </div>
      <div style={styles.engagementGrid}>
        <div style={styles.engagementItem}>
          <Eye size={20} style={{ color: 'var(--primary)' }} />
          <div style={styles.engagementValue}>{data.articleViews}</div>
          <div style={styles.engagementLabel}>Article Views</div>
        </div>
        <div style={styles.engagementItem}>
          <Users size={20} style={{ color: 'var(--primary)' }} />
          <div style={styles.engagementValue}>{data.newFollowers}</div>
          <div style={styles.engagementLabel}>New Followers</div>
        </div>
        <div style={styles.engagementItem}>
          <Heart size={20} style={{ color: 'var(--primary)' }} />
          <div style={styles.engagementValue}>{data.postLikes}</div>
          <div style={styles.engagementLabel}>Post Likes</div>
        </div>
      </div>
    </div>
  )
}

// ── Content Breakdown ──────────────────────────────────────────

function ContentBreakdown({ data }: { data: AnalyticsData }) {
  return (
    <>
      {/* Articles by status */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <FileText size={18} style={{ color: 'var(--primary)' }} />
          <span style={styles.sectionTitle}>Articles</span>
        </div>
        <div style={styles.breakdownList}>
          <BreakdownRow label="Published" value={data.articles.published} />
          <BreakdownRow label="Drafts" value={data.articles.drafts} />
          <BreakdownRow label="Total Views" value={data.articles.totalViews} />
          <BreakdownRow label="Saves" value={data.articles.totalLikes} />
        </div>
      </div>

      {/* Projects by role */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <Briefcase size={18} style={{ color: 'var(--primary)' }} />
          <span style={styles.sectionTitle}>Projects</span>
        </div>
        <div style={styles.breakdownList}>
          <BreakdownRow label="Created" value={data.projects.created} />
          <BreakdownRow label="Member Of" value={data.projects.memberOf} />
          <BreakdownRow label="Total" value={data.projects.total} />
        </div>
      </div>

      {/* Learning progress */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <BookOpen size={18} style={{ color: 'var(--primary)' }} />
          <span style={styles.sectionTitle}>Learning</span>
        </div>
        <div style={styles.breakdownList}>
          <BreakdownRow label="Started" value={data.learning.modulesStarted} />
          <BreakdownRow label="Completed" value={data.learning.modulesCompleted} />
          <div style={styles.progressContainer}>
            <div style={styles.progressLabel}>
              <span>Avg. Progress</span>
              <span>{data.learning.totalProgress}%</span>
            </div>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${data.learning.totalProgress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div style={styles.breakdownRow}>
      <span style={styles.breakdownLabel}>{label}</span>
      <span style={styles.breakdownValue}>{value}</span>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/users/analytics')
        const json = await res.json()
        if (!res.ok || !json.success) {
          setError(json.error || 'Failed to load analytics')
          return
        }
        setData(json.data)
      } catch {
        setError('Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Analytics Dashboard</h2>
        <SkeletonRow count={5} />
        <SkeletonRow count={1} />
        <SkeletonRow count={3} />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Analytics Dashboard</h2>
        <div style={styles.errorCard}>
          <p style={styles.errorText}>{error || 'No analytics data available.'}</p>
        </div>
      </div>
    )
  }

  const { engagement } = data

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Analytics Dashboard</h2>

      {/* ── Top Row: Key Metrics ── */}
      <div style={styles.grid}>
        <StatCard
          icon={FileText}
          label="Published Articles"
          value={data.articles.published}
          trend={
            <TrendBadge
              value7d={engagement.last7days.articleViews}
              value30d={engagement.last30days.articleViews}
            />
          }
        />
        <StatCard
          icon={Eye}
          label="Total Views"
          value={data.articles.totalViews}
          trend={
            <TrendBadge
              value7d={engagement.last7days.articleViews}
              value30d={engagement.last30days.articleViews}
            />
          }
        />
        <StatCard
          icon={Users}
          label="Followers"
          value={data.connections.followers}
          trend={
            <TrendBadge
              value7d={engagement.last7days.newFollowers}
              value30d={engagement.last30days.newFollowers}
            />
          }
        />
        <StatCard
          icon={Heart}
          label="Post Likes"
          value={data.posts.totalLikes}
          trend={
            <TrendBadge
              value7d={engagement.last7days.postLikes}
              value30d={engagement.last30days.postLikes}
            />
          }
        />
        <StatCard icon={Star} label="STOCK Score" value={data.stockScore} />
      </div>

      {/* ── Second Row: Engagement ── */}
      <div style={styles.grid}>
        <EngagementPanel engagement={data.engagement} />
      </div>

      {/* ── Third Row: Content Breakdown ── */}
      <div style={styles.grid}>
        <ContentBreakdown data={data} />
      </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: '24px 0',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--foreground)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  },

  // Card
  card: {
    background: 'var(--card, var(--background))',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--muted-foreground, var(--muted))',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--foreground)',
    lineHeight: 1.2,
    marginTop: 4,
  },
  cardTrend: {
    marginTop: 2,
  },

  // Section header
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--foreground)',
    flex: 1,
  },

  // Tabs
  tabGroup: {
    display: 'flex',
    gap: 4,
    background: 'var(--muted, var(--secondary))',
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    padding: '4px 12px',
    fontSize: 12,
    fontWeight: 500,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    background: 'transparent',
    color: 'var(--muted-foreground, var(--foreground))',
    transition: 'all 0.15s ease',
  },
  tabActive: {
    background: 'var(--background)',
    color: 'var(--foreground)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  },

  // Engagement
  engagementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  engagementItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '16px 8px',
    borderRadius: 10,
    background: 'var(--accent, var(--secondary))',
  },
  engagementValue: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--foreground)',
  },
  engagementLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--muted-foreground, var(--muted))',
  },

  // Breakdown
  breakdownList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  breakdownRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 13,
    color: 'var(--muted-foreground, var(--muted))',
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--foreground)',
  },

  // Progress bar
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: 4,
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: 'var(--muted-foreground, var(--muted))',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    background: 'var(--muted, var(--secondary))',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    background: 'var(--primary)',
    transition: 'width 0.4s ease',
  },

  // Skeleton
  skeletonLine: {
    borderRadius: 6,
    background: 'var(--muted, var(--secondary))',
    animation: 'pulse 1.5s ease-in-out infinite',
  },

  // Error
  errorCard: {
    background: 'var(--card, var(--background))',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: 32,
    textAlign: 'center' as const,
  },
  errorText: {
    color: 'var(--destructive, #ef4444)',
    fontSize: 15,
  },
}
