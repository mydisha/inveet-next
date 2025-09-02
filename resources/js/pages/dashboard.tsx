import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Heart,
    Plus,
    Settings,
    Sparkles,
    Users,
} from 'lucide-react';

interface DashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <>
      <Head title="Dashboard" />

      <DashboardLayout user={user} currentPath="/dashboard">
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
              <Card className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Create New Wedding</CardTitle>
                      <CardDescription>Start your wedding invitation journey</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/onboarding">
                    <Button className="btn-hero w-full group-hover:scale-105 transition-transform">
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
                      <CardTitle className="text-lg">My Weddings</CardTitle>
                      <CardDescription>Manage your existing weddings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/my-weddings">
                    <Button variant="outline" className="w-full group-hover:border-accent group-hover:text-accent transition-all duration-300">
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
                      <CardTitle className="text-lg">Settings</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                      Configure
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="card-elegant">
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
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
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
                      <Button className="btn-hero">
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
