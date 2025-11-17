import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, Users, Award, TrendingUp } from 'lucide-react'

export default function CommunityPage() {
  const features = [
    {
      title: 'Discussion Forums',
      description: 'Join conversations on sustainability topics that matter to you',
      icon: MessageSquare,
      color: 'moss'
    },
    {
      title: 'User Profiles',
      description: 'Build your sustainability profile and track your impact',
      icon: Users,
      color: 'ocean'
    },
    {
      title: 'Achievements',
      description: 'Earn badges and recognition for your contributions',
      icon: Award,
      color: 'terra'
    },
    {
      title: 'Collaborative Projects',
      description: 'Team up on sustainability initiatives in your area',
      icon: TrendingUp,
      color: 'earth'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Join the{' '}
              <span className="earth-gradient bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl text-earth-700">
              Connect with fellow sustainability enthusiasts, share knowledge,
              collaborate on projects, and grow together.
            </p>
            <Button size="lg">
              Create Your Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="card-gradient hover-lift">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 text-${feature.color}-600`} />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Community Stats Mockup */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold earth-gradient bg-clip-text text-transparent">
                  0
                </div>
                <div className="text-sm text-earth-600 mt-1">Active Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold earth-gradient bg-clip-text text-transparent">
                  0
                </div>
                <div className="text-sm text-earth-600 mt-1">Forum Posts</div>
              </div>
              <div>
                <div className="text-4xl font-bold earth-gradient bg-clip-text text-transparent">
                  0
                </div>
                <div className="text-sm text-earth-600 mt-1">Active Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold earth-gradient bg-clip-text text-transparent">
                  0
                </div>
                <div className="text-sm text-earth-600 mt-1">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-terra-50 border-2 border-terra-200 rounded-xl p-8">
              <Users className="w-16 h-16 text-terra-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-terra-900">
                Community Features Launching Soon!
              </h3>
              <p className="text-terra-800 mb-6">
                We're building a vibrant, supportive community space where sustainability enthusiasts
                can connect, share, and collaborate. Forums, user profiles, project boards, and more
                are coming very soon!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  Join Waitlist
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
