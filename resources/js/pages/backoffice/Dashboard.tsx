import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
  DollarSign,
  MessageSquare,
  Palette,
  Settings,
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
  feedbacks_this_month: number;
  total_themes: number;
  active_themes: number;
  public_themes: number;
  themes_this_month: number;
}

interface ActivityItem {
  id: number;
  log_name: string;
  event: string;
  description: string;
  event_label: string;
  event_color: string;
  log_name_label: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
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
  activities: ActivityItem[];
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

  const getActivityIcon = (logName: string) => {
    switch (logName) {
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'feedback':
        return <MessageSquare className="h-4 w-4" />;
      case 'theme':
        return <Palette className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getActivityColor = (eventColor: string) => {
    const colorMap: { [key: string]: string } = {
      'created': 'text-green-600 bg-green-100',
      'updated': 'text-blue-600 bg-blue-100',
      'deleted': 'text-red-600 bg-red-100',
      'default': 'text-gray-600 bg-gray-100',
    };
    return colorMap[eventColor] || colorMap['default'];
  };

  return (
    <BackofficeLayout user={user}>
      <Head title="Dashboard" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Users Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(userStats.total_users)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(userStats.active_users)} active users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(orderStats.total_orders)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(orderStats.paid_orders)} paid orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orderStats.total_revenue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(orderStats.revenue_this_month)} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedbacks</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(feedbackStats.total_feedbacks)}</div>
              <p className="text-xs text-muted-foreground">
                {feedbackStats.average_score?.toFixed(1) || '0.0'} average rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* User Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="font-medium">{formatNumber(userStats.active_users)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Inactive Users</span>
                <span className="font-medium">{formatNumber(userStats.inactive_users)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">With Weddings</span>
                <span className="font-medium">{formatNumber(userStats.users_with_weddings)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">With Orders</span>
                <span className="font-medium">{formatNumber(userStats.users_with_orders)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">New This Month</span>
                <span className="font-medium">{formatNumber(userStats.new_users_this_month)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Paid Orders</span>
                <span className="font-medium">{formatNumber(orderStats.paid_orders)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Orders</span>
                <span className="font-medium">{formatNumber(orderStats.pending_orders)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Void Orders</span>
                <span className="font-medium">{formatNumber(orderStats.void_orders)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-medium">{formatNumber(orderStats.orders_this_month)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Unique Revenue</span>
                <span className="font-medium">{formatCurrency(orderStats.unique_revenue)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Theme Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Theme Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Themes</span>
                <span className="font-medium">{formatNumber(themeStats.total_themes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Themes</span>
                <span className="font-medium">{formatNumber(themeStats.active_themes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Public Themes</span>
                <span className="font-medium">{formatNumber(themeStats.public_themes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-medium">{formatNumber(themeStats.themes_this_month)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.event_color)}`}>
                      {getActivityIcon(activity.log_name)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getActivityColor(activity.event_color)}`}>
                          {activity.event_label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{activity.log_name_label}</span>
                        <span>•</span>
                        <span>{new Date(activity.created_at).toLocaleString('id-ID')}</span>
                        {activity.user && (
                          <>
                            <span>•</span>
                            <span>by {activity.user.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activities found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </BackofficeLayout>
  );
}
