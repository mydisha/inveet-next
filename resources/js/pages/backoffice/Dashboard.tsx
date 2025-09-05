import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, router } from '@inertiajs/react';
import {
  DollarSign,
  MessageSquare,
  Palette,
  Settings,
  ShoppingCart,
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
  total_themes: number;
  active_themes: number;
  public_themes: number;
  themes_this_month: number;
}

interface Activity {
  id: number;
  log_name: string;
  event: string;
  description: string;
  event_label: string | null;
  event_color: string | null;
  log_name_label: string | null;
  created_at: string;
  created_at_human: string;
  created_at_formatted: string;
  causer?: {
    id: number;
    name: string;
    email: string;
  };
  subject?: {
    id: number;
    name?: string;
    title?: string;
  };
  has_changes: boolean;
  changed_fields: string[];
  change_summary: string[];
}

interface DashboardProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  userStats?: DashboardStats | null;
  orderStats?: DashboardStats | null;
  feedbackStats?: DashboardStats | null;
  themeStats?: DashboardStats | null;
  activities?: Activity[] | null;
}

export default function Dashboard({ user, userStats, orderStats, feedbackStats, themeStats, activities }: DashboardProps) {
  const [loading, setLoading] = useState(!userStats);
  const [stats, setStats] = useState({
    userStats: userStats || null,
    orderStats: orderStats || null,
    feedbackStats: feedbackStats || null,
    themeStats: themeStats || null,
    activities: activities || []
  });

  // Wayfinder pattern: Load data in background after initial page render
  useEffect(() => {
    if (!userStats) {
      // Load data in background using Inertia router
      router.get('/backoffice/dashboard', { reload: true }, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page: any) => {
          setStats({
            userStats: page.props.userStats,
            orderStats: page.props.orderStats,
            feedbackStats: page.props.feedbackStats,
            themeStats: page.props.themeStats,
            activities: page.props.activities || []
          });
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        }
      });
    } else {
      setStats({
        userStats: userStats || null,
        orderStats: orderStats || null,
        feedbackStats: feedbackStats || null,
        themeStats: themeStats || null,
        activities: activities || []
      });
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Loading skeleton component
  const StatCardSkeleton = () => (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full -translate-y-4 translate-x-4"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
      </CardContent>
    </Card>
  );

  const QuickActionSkeleton = () => (
    <Card>
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3">
              <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ActivitySkeleton = () => (
    <Card>
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mx-auto"></div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <BackofficeLayout user={user}>
      <Head title="Dashboard" />

      <div className="space-y-6">
        {/* Top Row - 3 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading || !stats.userStats ? (
            <StatCardSkeleton />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -translate-y-4 translate-x-4"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.userStats.total_users)}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.userStats.active_users} active
                </p>
              </CardContent>
            </Card>
          )}

          {loading || !stats.orderStats ? (
            <StatCardSkeleton />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full -translate-y-4 translate-x-4"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.orderStats.total_orders)}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.orderStats.paid_orders} paid, {stats.orderStats.pending_orders} pending
                </p>
              </CardContent>
            </Card>
          )}

          {loading || !stats.orderStats ? (
            <StatCardSkeleton />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-full -translate-y-4 translate-x-4"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.orderStats.total_revenue)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(stats.orderStats.revenue_this_month)} this month
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle Row - 2 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading || !stats.feedbackStats ? (
            <StatCardSkeleton />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/10 to-pink-600/5 rounded-full -translate-y-4 translate-x-4"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Feedbacks</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.feedbackStats.total_feedbacks)}</div>
                <p className="text-xs text-muted-foreground">
                  Avg score: {stats.feedbackStats.average_score}
                </p>
              </CardContent>
            </Card>
          )}

          {loading || !stats.themeStats ? (
            <StatCardSkeleton />
          ) : (
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -translate-y-4 translate-x-4"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium">Themes</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <Palette className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(stats.themeStats.total_themes)}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.themeStats.active_themes} active, {stats.themeStats.public_themes} public
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bottom Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          {loading ? (
            <QuickActionSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/backoffice/users" className="block">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md group-hover:shadow-lg transition-shadow">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Manage Users</div>
                        <div className="text-sm text-gray-500">View and manage user accounts</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/backoffice/orders" className="block">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-200 group">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-md group-hover:shadow-lg transition-shadow">
                        <ShoppingCart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">View Orders</div>
                        <div className="text-sm text-gray-500">Track and manage orders</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/backoffice/themes" className="block">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 group">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-md group-hover:shadow-lg transition-shadow">
                        <Palette className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">Manage Themes</div>
                        <div className="text-sm text-gray-500">Create and edit themes</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/backoffice/settings" className="block">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 shadow-md group-hover:shadow-lg transition-shadow">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">Website Settings</div>
                        <div className="text-sm text-gray-500">Configure system settings</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          {loading ? (
            <ActivitySkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.activities && stats.activities.length > 0 ? (
                  <div className="space-y-4">
                    {stats.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {activity.created_at_human}
                            </span>
                            {activity.causer && (
                              <span className="text-xs text-gray-500">
                                by {activity.causer.name}
                              </span>
                            )}
                          </div>
                          {activity.has_changes && activity.change_summary.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-600">
                                Changes: {activity.change_summary.join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent activities
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </BackofficeLayout>
  );
}
