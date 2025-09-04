import DebugCsrf from '@/components/DebugCsrf';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { forceRefreshCsrfToken } from '@/lib/auth';
import { Head, Link } from '@inertiajs/react';
import {
  Calendar,
  Heart,
  Plus,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEffect } from 'react';

interface DashboardFixedProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function DashboardFixed({ user }: DashboardFixedProps) {
  // Force refresh CSRF token immediately on dashboard load to ensure it's current after login
  // This prevents CSRF token mismatch when user tries to logout immediately after login
  useEffect(() => {
    // Refresh CSRF token immediately to sync with server
    forceRefreshCsrfToken();
  }, []);

  return (
    <>
      <Head title="Dashboard" />
      <DebugCsrf />

      <DashboardLayout user={user} currentPath="/dashboard">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-inter-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground font-inter-normal">
            Ready to create your perfect wedding invitation?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-inter-semibold">Create New Wedding</CardTitle>
                  <CardDescription className="font-inter-normal">Start your wedding invitation journey</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/onboarding">
                <Button className="btn-hero w-full group-hover:scale-105 transition-transform font-inter-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-2 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-inter-semibold">My Weddings</CardTitle>
                  <CardDescription className="font-inter-normal">Manage your existing weddings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/my-weddings">
                <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent transition-all duration-300 font-inter-medium">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-3 group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-inter-semibold">Settings</CardTitle>
                  <CardDescription className="font-inter-normal">Manage your account settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/settings">
                <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300 font-inter-medium">
                  Configure
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-inter-semibold">
              <Users className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription className="font-inter-normal">
              Your latest wedding invitation activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.hasWedding ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-inter-medium">Wedding invitation created</p>
                    <p className="text-xs text-muted-foreground font-inter-normal">2 hours ago</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-inter-semibold text-foreground mb-2">No weddings yet</h3>
                <p className="text-muted-foreground mb-4 font-inter-normal">
                  Start creating your first wedding invitation to see your activity here.
                </p>
                <Link href="/onboarding">
                  <Button className="btn-hero font-inter-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Wedding
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
