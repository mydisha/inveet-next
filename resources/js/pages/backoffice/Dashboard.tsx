import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
  DollarSign,
  MessageSquare,
  Palette,
  ShoppingCart,
  Users
} from 'lucide-react';

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
  userStats: DashboardStats;
  orderStats: DashboardStats;
  feedbackStats: DashboardStats;
  themeStats: DashboardStats;
  activities: Activity[];
}

export default function Dashboard({ user, userStats, orderStats, feedbackStats, themeStats, activities }: DashboardProps) {
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

  return (
    <BackofficeLayout user={user}>
      <Head title="Dashboard" />

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        {/* Main Stats Grid - 5 main stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Total Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(userStats.total_users)}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.active_users} active
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orderStats.total_revenue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(orderStats.revenue_this_month)} this month
              </p>
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(orderStats.total_orders)}</div>
              <p className="text-xs text-muted-foreground">
                {orderStats.paid_orders} paid, {orderStats.pending_orders} pending
              </p>
            </CardContent>
          </Card>

          {/* Total Themes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Themes</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(themeStats.total_themes)}</div>
              <p className="text-xs text-muted-foreground">
                {themeStats.active_themes} active, {themeStats.public_themes} public
              </p>
            </CardContent>
          </Card>

          {/* Total Feedbacks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(feedbackStats.total_feedbacks)}</div>
              <p className="text-xs text-muted-foreground">
                Avg score: {feedbackStats.average_score}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/backoffice/users">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage user accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/backoffice/orders">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">View Orders</h3>
                    <p className="text-sm text-gray-600">Track and manage orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/backoffice/themes">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Palette className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Manage Themes</h3>
                    <p className="text-sm text-gray-600">Create and edit themes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/backoffice/feedbacks">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">View Feedbacks</h3>
                    <p className="text-sm text-gray-600">Read customer feedback</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent activities
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </BackofficeLayout>
  );
}
