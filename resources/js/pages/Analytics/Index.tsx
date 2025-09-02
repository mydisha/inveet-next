import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { BarChart3, Eye, Heart, ShoppingCart } from 'lucide-react';

interface AnalyticsProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  weddings: any[];
  stats: {
    totalWeddings: number;
    totalViews: number;
    totalOrders: number;
  };
}

export default function Analytics({ user, weddings, stats }: AnalyticsProps) {
  return (
    <>
      <Head title="Analytics" />

      <DashboardLayout user={user} currentPath="/analytics">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your wedding invitation performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-6">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Total Weddings</CardTitle>
                  <CardDescription>Active wedding invitations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalWeddings}</div>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-7">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Total Views</CardTitle>
                  <CardDescription>Total page views</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalViews}</div>
            </CardContent>
          </Card>

          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-8">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Total Orders</CardTitle>
                  <CardDescription>Completed orders</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Wedding Performance */}
        <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="icon-container icon-gradient-1">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Wedding Performance</CardTitle>
                <CardDescription>View detailed analytics for each wedding</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weddings.map((wedding) => (
                <div key={wedding.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <div>
                    <h3 className="font-medium text-foreground">{wedding.title}</h3>
                    <p className="text-sm text-muted-foreground">{wedding.package.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{wedding.views} views</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
