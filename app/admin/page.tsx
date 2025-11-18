import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Package, FileText, Users, MessageSquare, Settings, BarChart3, Tag, FolderTree, Store } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '0', change: '+0%', icon: Package },
    { label: 'Articles', value: '0', change: '+0%', icon: FileText },
    { label: 'Users', value: '0', change: '+0%', icon: Users },
    { label: 'Forum Posts', value: '0', change: '+0%', icon: MessageSquare },
  ]

  const quickActions = [
    { name: 'Add Product', href: '/admin/products/new', icon: Package, color: 'moss' },
    { name: 'Write Article', href: '/admin/articles/new', icon: FileText, color: 'ocean' },
    { name: 'Manage Tags', href: '/admin/tags', icon: Tag, color: 'terra' },
    { name: 'Manage Categories', href: '/admin/categories', icon: FolderTree, color: 'moss' },
    { name: 'Manage Vendors', href: '/admin/vendors', icon: Store, color: 'ocean' },
    { name: 'Manage Users', href: '/admin/users', icon: Users, color: 'terra' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, color: 'earth' },
  ]

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-sand-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-earth-700 mt-2">
            Welcome back, Sage! Here's your sustainability hub overview.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.name} href={action.href}>
                  <Card className="hover-lift cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${action.color}-100 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${action.color}-600`} />
                        </div>
                        <CardTitle className="text-lg">{action.name}</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Development Notice */}
        <Card className="bg-moss-50 border-moss-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Admin Panel Under Construction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-earth-700">
              The full admin panel is currently being built! Soon you'll be able to:
            </p>
            <ul className="space-y-2 text-earth-700">
              <li className="flex items-start gap-2">
                <span className="text-moss-600 mt-1">✓</span>
                <span>Manage products with full CRUD operations and sustainability metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-600 mt-1">✓</span>
                <span>Create and publish educational articles with a rich text editor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-600 mt-1">✓</span>
                <span>Moderate community content and manage users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-600 mt-1">✓</span>
                <span>View analytics and track platform growth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-moss-600 mt-1">✓</span>
                <span>Configure site settings and integrations</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button>
                View Development Roadmap
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
