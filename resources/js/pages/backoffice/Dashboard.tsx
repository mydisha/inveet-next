import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiGet } from '@/lib/api';
import { Head, Link } from '@inertiajs/react';
import {
    DollarSign,
    MessageSquare,
    Palette,
    Settings,
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

interface BackofficeDashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function BackofficeDashboard({ user }: BackofficeDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const [userStats, orderStats, feedbackStats, themeStats] = await Promise.all([
          apiGet('/backoffice/api/users/statistics'),
          apiGet('/backoffice/api/orders/statistics'),
          apiGet('/backoffice/api/feedbacks/statistics'),
          apiGet('/backoffice/api/themes/statistics'),
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
    { label: 'Total Users', value: stats?.total_users || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Active Users', value: stats?.active_users || 0, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Total Orders', value: stats?.total_orders || 0, icon: ShoppingCart, color: 'text-purple-500' },
    { label: 'Total Revenue', value: formatCurrency((stats?.total_revenue || 0) + (stats?.unique_revenue || 0)), icon: DollarSign, color: 'text-emerald-500' },
    { label: 'Feedbacks', value: stats?.total_feedbacks || 0, icon: MessageSquare, color: 'text-orange-500' },
    { label: 'Themes', value: stats?.total_themes || 0, icon: Palette, color: 'text-pink-500' },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      href: '/backoffice/users',
      variant: 'default' as const,
    },
    {
      title: 'View Orders',
      description: 'Monitor and manage orders',
      icon: ShoppingCart,
      href: '/backoffice/orders',
      variant: 'outline' as const,
    },
    {
      title: 'Manage Themes',
      description: 'Upload and manage wedding themes',
      icon: Palette,
      href: '/backoffice/themes',
      variant: 'outline' as const,
    },
    {
      title: 'Website Settings',
      description: 'Configure website settings',
      icon: Settings,
      href: '/backoffice/configurations',
      variant: 'outline' as const,
    },
  ];

  return (
    <>
      <Head title="Backoffice Dashboard" />
      <BackofficeLayout user={user}>
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.label} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-gray-50">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    className="w-full justify-start"
                    variant={action.variant}
                    asChild
                  >
                    <Link href={action.href}>
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.title}
                    </Link>
                  </Button>
                ))}
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
