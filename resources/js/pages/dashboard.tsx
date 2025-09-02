import { Head, Link } from '@inertiajs/react';
import { Heart, Plus, Settings, User, LogOut, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const handleLogout = () => {
    // Inertia.js will handle the logout form submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = '_token';
      tokenInput.value = csrfToken;
      form.appendChild(tokenInput);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <Head title="Dashboard" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-gradient-primary">Inveet</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/my-weddings" className="text-foreground hover:text-primary transition-colors">
                  My Weddings
                </Link>
                <Link href="/packages" className="text-foreground hover:text-primary transition-colors">
                  Packages
                </Link>
              </nav>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to create your perfect wedding invitation?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Create New Wedding</CardTitle>
                    <CardDescription>Start your wedding invitation journey</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/onboarding">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-warm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">My Weddings</CardTitle>
                    <CardDescription>Manage your existing weddings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/my-weddings">
                  <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent transition-colors">
                    View All
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Settings</CardTitle>
                    <CardDescription>Manage your account settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/settings">
                  <Button variant="outline" className="w-full group-hover:border-primary-light group-hover:text-primary-light transition-colors">
                    Configure
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your latest wedding invitation activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.hasWedding ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Wedding invitation created</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No weddings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start creating your first wedding invitation to see your activity here.
                  </p>
                  <Link href="/onboarding">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Wedding
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
