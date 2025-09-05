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
  const [loading, setLoading] = useState({
    users: true,
    orders: true,
    feedbacks: true,
    themes: true,
  });
  const [errors, setErrors] = useState({
    users: null,
    orders: null,
    feedbacks: null,
    themes: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Load each statistics section independently for better performance
      const loadUserStats = async (retryCount = 0) => {
        try {
          const userStats = await apiGet('/backoffice/api/users/statistics');
          setStats(prev => ({ ...prev, ...userStats.data }));
          setErrors(prev => ({ ...prev, users: null }));
        } catch (error) {
          setErrors(prev => ({ ...prev, users: error.message || 'Failed to load user statistics' }));

          // Retry once after 2 seconds
          if (retryCount === 0) {
            setTimeout(() => loadUserStats(1), 2000);
          }
        } finally {
          setLoading(prev => ({ ...prev, users: false }));
        }
      };

      const loadOrderStats = async (retryCount = 0) => {
        try {
          const orderStats = await apiGet('/backoffice/api/orders/statistics');
          setStats(prev => ({ ...prev, ...orderStats.data }));
          setErrors(prev => ({ ...prev, orders: null }));
        } catch (error) {
          setErrors(prev => ({ ...prev, orders: error.message || 'Failed to load order statistics' }));

          if (retryCount === 0) {
            setTimeout(() => loadOrderStats(1), 2000);
          }
        } finally {
          setLoading(prev => ({ ...prev, orders: false }));
        }
      };

      const loadFeedbackStats = async (retryCount = 0) => {
        try {
          const feedbackStats = await apiGet('/backoffice/api/feedbacks/statistics');
          setStats(prev => ({ ...prev, ...feedbackStats.data }));
          setErrors(prev => ({ ...prev, feedbacks: null }));
        } catch (error) {
          setErrors(prev => ({ ...prev, feedbacks: error.message || 'Failed to load feedback statistics' }));

          if (retryCount === 0) {
            setTimeout(() => loadFeedbackStats(1), 2000);
          }
        } finally {
          setLoading(prev => ({ ...prev, feedbacks: false }));
        }
      };

      const loadThemeStats = async (retryCount = 0) => {
        try {
          const themeStats = await apiGet('/backoffice/api/themes/statistics');
          setStats(prev => ({ ...prev, ...themeStats.data }));
          setErrors(prev => ({ ...prev, themes: null }));
        } catch (error) {
          setErrors(prev => ({ ...prev, themes: error.message || 'Failed to load theme statistics' }));

          if (retryCount === 0) {
            setTimeout(() => loadThemeStats(1), 2000);
          }
        } finally {
          setLoading(prev => ({ ...prev, themes: false }));
        }
      };

      // Start all requests in parallel but handle them independently
      loadUserStats();
      loadOrderStats();
      loadFeedbackStats();
      loadThemeStats();
    };

    fetchStats();
  }, []);

  const isLoading = loading.users || loading.orders || loading.feedbacks || loading.themes;
  const loadedCount = Object.values(loading).filter(loading => !loading).length;
  const totalCount = Object.keys(loading).length;
  const progressPercentage = (loadedCount / totalCount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
  );

  const statCards = [
    {
      label: 'Total Users',
      value: loading.users ? <LoadingSpinner /> : (stats?.total_users || 0),
      icon: Users,
      color: 'text-blue-500',
      isLoading: loading.users,
      error: errors.users
    },
    {
      label: 'Active Users',
      value: loading.users ? <LoadingSpinner /> : (stats?.active_users || 0),
      icon: TrendingUp,
      color: 'text-green-500',
      isLoading: loading.users,
      error: errors.users
    },
    {
      label: 'Total Orders',
      value: loading.orders ? <LoadingSpinner /> : (stats?.total_orders || 0),
      icon: ShoppingCart,
      color: 'text-purple-500',
      isLoading: loading.orders,
      error: errors.orders
    },
    {
      label: 'Total Revenue',
      value: loading.orders ? <LoadingSpinner /> : formatCurrency((stats?.total_revenue || 0) + (stats?.unique_revenue || 0)),
      icon: DollarSign,
      color: 'text-emerald-500',
      isLoading: loading.orders,
      error: errors.orders
    },
    {
      label: 'Feedbacks',
      value: loading.feedbacks ? <LoadingSpinner /> : (stats?.total_feedbacks || 0),
      icon: MessageSquare,
      color: 'text-orange-500',
      isLoading: loading.feedbacks,
      error: errors.feedbacks
    },
    {
      label: 'Themes',
      value: loading.themes ? <LoadingSpinner /> : (stats?.total_themes || 0),
      icon: Palette,
      color: 'text-pink-500',
      isLoading: loading.themes,
      error: errors.themes
    },
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
          {/* Loading Progress */}
          {isLoading && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Loading Dashboard Statistics</span>
                  <span className="text-sm text-gray-500">{loadedCount}/{totalCount} loaded</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.label} className={`hover:shadow-lg transition-shadow ${stat.isLoading ? 'opacity-75' : ''} ${stat.error ? 'border-red-200 bg-red-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-gray-50">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <div className="flex items-center">
                        {stat.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <LoadingSpinner />
                            <span className="text-sm text-gray-500">Loading...</span>
                          </div>
                        ) : stat.error ? (
                          <div className="flex flex-col">
                            <p className="text-sm text-red-500">Error loading data</p>
                            <p className="text-xs text-gray-400">Retrying...</p>
                          </div>
                        ) : (
                          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        )}
                      </div>
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
