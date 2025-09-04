import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    DollarSign,
    MessageSquare,
    Palette,
    ShoppingCart,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  users_with_weddings: number;
  users_with_orders: number;
  new_users_this_month: number;
  new_users_this_week: number;
  total_orders: number;
  paid_orders: number;
  pending_orders: number;
  void_orders: number;
  total_revenue: number;
  unique_revenue: number;
  orders_this_month: number;
  revenue_this_month: number;
  total_feedbacks: number;
  average_score: number;
  recommended_feedbacks: number;
  show_on_landing_feedbacks: number;
  feedbacks_this_month: number;
  total_themes: number;
  active_themes: number;
  public_themes: number;
  themes_this_month: number;
}

export default function BackofficeDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userStats, orderStats, feedbackStats, themeStats] = await Promise.all([
          fetch('/backoffice/users/statistics').then(res => res.json()),
          fetch('/backoffice/orders/statistics').then(res => res.json()),
          fetch('/backoffice/feedbacks/statistics').then(res => res.json()),
          fetch('/backoffice/themes/statistics').then(res => res.json()),
        ]);

        setStats({
          ...userStats.data,
          ...orderStats.data,
          ...feedbackStats.data,
          ...themeStats.data,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <BackofficeLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </BackofficeLayout>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: `+${stats?.new_users_this_week || 0} this week`,
    },
    {
      title: 'Active Users',
      value: stats?.active_users || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: `${Math.round(((stats?.active_users || 0) / (stats?.total_users || 1)) * 100)}% of total`,
    },
    {
      title: 'Total Orders',
      value: stats?.total_orders || 0,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: `${stats?.paid_orders || 0} paid`,
    },
    {
      title: 'Total Revenue',
      value: formatCurrency((stats?.total_revenue || 0) + (stats?.unique_revenue || 0)),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: formatCurrency(stats?.revenue_this_month || 0) + ' this month',
    },
    {
      title: 'Feedbacks',
      value: stats?.total_feedbacks || 0,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: `Avg: ${(stats?.average_score || 0).toFixed(1)}/5`,
    },
    {
      title: 'Themes',
      value: stats?.total_themes || 0,
      icon: Palette,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      change: `${stats?.active_themes || 0} active`,
    },
  ];

  return (
    <>
      <Head title="Backoffice Dashboard" />
      <BackofficeLayout title="Dashboard" description="Overview of your application">
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.change}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Palette className="mr-2 h-4 w-4" />
                  Manage Themes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Website Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">New user registered</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">New order received</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">New feedback received</p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BackofficeLayout>
    </>
  );
}
