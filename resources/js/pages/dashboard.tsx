import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Heart, Plus, Sparkles, Users, Eye, Share2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface DashboardProps {
  user: User | null;
  loading?: boolean;
}

export default function Dashboard({ user, loading = false }: DashboardProps) {
  // Show loading state
  if (loading) {
    return (
      <>
        <Head title="Dashboard" />
        <DashboardLayout user={user} currentPath="/dashboard">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground font-inter-normal">Loading...</p>
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  // If user has no weddings, show the new user dashboard
  if (user && !user.hasWedding) {
    return (
      <>
        <Head title="Welcome to Inveet" />
        <DashboardLayout user={user} currentPath="/dashboard">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-inter-bold text-foreground mb-4">
              Welcome to Inveet, {user.name}! 👋
            </h1>
            <p className="text-xl text-muted-foreground font-inter-normal mb-8 max-w-2xl mx-auto">
              Create beautiful, personalized wedding invitations that your guests will love.
              Start your journey to the perfect wedding celebration.
            </p>
                                    <Button
              size="lg"
              asChild
            >
              <Link href="/onboarding/couple-info">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Invitation
              </Link>
            </Button>
          </div>
        </DashboardLayout>
      </>
    );
  }

  // If user has weddings, show the user dashboard
  if (user && user.hasWedding) {
    const stats = [
      { label: 'Total Invitations', value: '3', icon: Heart, color: 'text-pink-500' },
      { label: 'Total Views', value: '1,247', icon: Eye, color: 'text-blue-500' },
      { label: 'Guests Invited', value: '156', icon: Users, color: 'text-green-500' },
      { label: 'RSVPs Received', value: '89', icon: Calendar, color: 'text-purple-500' },
    ];

    const quickActions = [
      {
        title: 'Create New Invitation',
        description: 'Design a new wedding invitation',
        icon: Plus,
        href: '/onboarding/couple-info',
        variant: 'default' as const,
      },
      {
        title: 'Manage Invitations',
        description: 'View and edit your existing invitations',
        icon: Heart,
        href: '/my-weddings',
        variant: 'outline' as const,
      },
      {
        title: 'Share Invitation',
        description: 'Share your invitation with guests',
        icon: Share2,
        href: '/wedding-invitations',
        variant: 'outline' as const,
      },
    ];

    return (
      <>
        <Head title="Dashboard" />
        <DashboardLayout user={user} currentPath="/dashboard">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-inter-bold text-foreground mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground font-inter-normal">
              Here's an overview of your wedding invitations
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-elegant hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gray-50 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-inter-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-inter-normal">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-inter-semibold">{action.title}</CardTitle>
                        <CardDescription className="font-inter-normal">{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      variant={action.variant}
                      className="w-full"
                      asChild
                    >
                      <Link href={action.href}>
                        {action.title}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardLayout>
      </>
    );
  }

  // Fallback - should not reach here in normal flow
  return (
    <>
      <Head title="Dashboard" />
      <DashboardLayout user={user} currentPath="/dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-inter-bold text-foreground mb-4">Welcome to Inveet</h1>
            <p className="text-muted-foreground font-inter-normal">Please log in to access your dashboard.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
