import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    BarChart3,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Clock,
    Database,
    Edit,
    Eye,
    Filter,
    Plus,
    RefreshCw,
    Save,
    Search,
    Trash2,
    TrendingUp,
    User
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ActivityLog {
  id: number;
  log_name: string;
  event: string;
  subject_type: string;
  subject_id: number;
  causer_type: string;
  causer_id: number;
  properties: any;
  description: string;
  ip_address: string;
  user_agent: string;
  url: string;
  method: string;
  created_at: string;
  created_at_human: string;
  created_at_formatted: string;
  event_category: string;
  event_label: string;
  event_color: string;
  log_name_label: string;
  has_changes: boolean;
  changed_fields: string[];
  change_summary: string[];
  changes_count: number;
  subject?: {
    id: number;
    name?: string;
    title?: string;
  };
  causer?: {
    id: number;
    name: string;
    email: string;
  };
}

interface ActivityLogsProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export default function ActivityLogsEnhanced({ auth }: ActivityLogsProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recentChanges, setRecentChanges] = useState<ActivityLog[]>([]);
  const [statistics, setStatistics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    log_name: '',
    event: '',
    date_from: '',
    date_to: '',
  });
  const [availableFilters, setAvailableFilters] = useState({
    log_names: [],
    events: [],
    subject_types: [],
  });
  const [expandedActivities, setExpandedActivities] = useState<Set<number>>(new Set());

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`/api/backoffice/activity-logs?${params}`);
      const data = await response.json();

      if (data.success) {
        setActivities(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/backoffice/activity-logs/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
    }
  };

  const fetchRecentChanges = async () => {
    try {
      const response = await fetch('/api/backoffice/activity-logs/recent-changes');
      const data = await response.json();
      if (data.success) {
        setRecentChanges(data.data);
      }
    } catch (error) {
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/backoffice/activity-logs/statistics');
      const data = await response.json();
      if (data.success) {
        setStatistics(data.data);
      }
    } catch (error) {
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await fetch('/api/backoffice/activity-logs/filters');
      const data = await response.json();
      if (data.success) {
        setAvailableFilters(data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchFilters();
    fetchCategories();
    fetchRecentChanges();
    fetchStatistics();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchActivities();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      log_name: '',
      event: '',
      date_from: '',
      date_to: '',
    });
  };

  const toggleExpanded = (activityId: number) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'created':
      case 'creating':
        return <Plus className="h-4 w-4" />;
      case 'updated':
      case 'updating':
        return <Edit className="h-4 w-4" />;
      case 'deleted':
      case 'deleting':
        return <Trash2 className="h-4 w-4" />;
      case 'saved':
      case 'saving':
        return <Save className="h-4 w-4" />;
      case 'restored':
      case 'restoring':
        return <RefreshCw className="h-4 w-4" />;
      case 'retrieved':
        return <Eye className="h-4 w-4" />;
      case 'login':
        return <CheckCircle className="h-4 w-4" />;
      case 'logout':
        return <AlertCircle className="h-4 w-4" />;
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getEventBadgeVariant = (event: string) => {
    switch (event) {
      case 'created':
      case 'creating':
        return 'default';
      case 'updated':
      case 'updating':
        return 'secondary';
      case 'deleted':
      case 'deleting':
        return 'destructive';
      case 'login':
      case 'published':
      case 'paid':
        return 'default';
      case 'logout':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getLogNameBadgeVariant = (logName: string) => {
    switch (logName) {
      case 'user':
        return 'default';
      case 'wedding':
        return 'secondary';
      case 'order':
        return 'outline';
      case 'package':
        return 'outline';
      case 'admin':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getEventColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <BackofficeLayout
      user={auth.user}
      title="Activity Monitoring Dashboard"
      description="Comprehensive activity monitoring and analytics"
    >
      <Head title="Activity Monitoring" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.total_activities || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">User Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.user_activities || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Wedding Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.wedding_activities || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Order Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.order_activities || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="changes">Recent Changes</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Quick Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search activities..."
                          value={filters.search}
                          onChange={(e) => handleFilterChange('search', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Log Name</label>
                      <Select
                        value={filters.log_name}
                        onValueChange={(value) => handleFilterChange('log_name', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All log names" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All log names</SelectItem>
                          {availableFilters.log_names.map((name: string) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Event</label>
                      <Select
                        value={filters.event}
                        onValueChange={(value) => handleFilterChange('event', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All events" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All events</SelectItem>
                          {availableFilters.events.map((event: string) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end gap-2">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={fetchActivities}
                        disabled={loading}
                        className="flex-1"
                      >
                        <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activities List */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Logs ({activities.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                      Loading activities...
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No activities found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={getLogNameBadgeVariant(activity.log_name)}>
                                  {activity.log_name_label}
                                </Badge>
                                <Badge
                                  variant={getEventBadgeVariant(activity.event)}
                                  className={cn("flex items-center gap-1", getEventColor(activity.event_color))}
                                >
                                  {getEventIcon(activity.event)}
                                  {activity.event_label}
                                </Badge>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.created_at_human}
                                </span>
                              </div>

                              <p className="text-sm text-gray-700 mb-2">
                                {activity.description}
                              </p>

                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                {activity.causer && (
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    By: {activity.causer.name} ({activity.causer.email})
                                  </span>
                                )}
                                {activity.subject && (
                                  <span>
                                    Target: {activity.subject.name || activity.subject.title || 'Unknown'}
                                  </span>
                                )}
                                {activity.ip_address && (
                                  <span>IP: {activity.ip_address}</span>
                                )}
                                {activity.method && (
                                  <span>Method: {activity.method}</span>
                                )}
                              </div>

                              {/* Data Changes */}
                              {activity.has_changes && (
                                <Collapsible>
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-2 text-xs"
                                      onClick={() => toggleExpanded(activity.id)}
                                    >
                                      {expandedActivities.has(activity.id) ? (
                                        <ChevronDown className="h-3 w-3 mr-1" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 mr-1" />
                                      )}
                                      {activity.changes_count} field(s) changed
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                                      <div className="space-y-1">
                                        {activity.change_summary.map((change, index) => (
                                          <div key={index} className="text-xs text-gray-600">
                                            {change}
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-2 text-xs text-gray-500">
                                        Changed fields: {activity.changed_fields.join(', ')}
                                      </div>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="changes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Data Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentChanges.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No recent changes found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentChanges.map((activity) => (
                        <div
                          key={activity.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={getLogNameBadgeVariant(activity.log_name)}>
                                  {activity.log_name_label}
                                </Badge>
                                <Badge
                                  variant={getEventBadgeVariant(activity.event)}
                                  className={cn("flex items-center gap-1", getEventColor(activity.event_color))}
                                >
                                  {getEventIcon(activity.event)}
                                  {activity.event_label}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {activity.created_at_human}
                                </span>
                              </div>

                              <p className="text-sm text-gray-700 mb-2">
                                {activity.description}
                              </p>

                              <div className="mt-2 p-3 bg-blue-50 rounded-md">
                                <div className="text-sm font-medium text-blue-900 mb-1">
                                  Data Changes ({activity.changes_count} field(s))
                                </div>
                                <div className="space-y-1">
                                  {activity.change_summary.map((change, index) => (
                                    <div key={index} className="text-xs text-blue-700">
                                      {change}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Activity Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No categories found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {categories.map((category) => (
                        <div key={category.log_name} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-3 capitalize">
                            {category.log_name} Activities
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.events.map((event: any) => (
                              <div
                                key={event.event}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                              >
                                <div className="flex items-center gap-2">
                                  {getEventIcon(event.event)}
                                  <span className="text-sm font-medium">{event.label}</span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn("flex items-center gap-1", getEventColor(event.color))}
                                >
                                  {event.count}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filters" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Advanced Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search activities..."
                          value={filters.search}
                          onChange={(e) => handleFilterChange('search', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Log Name</label>
                      <Select
                        value={filters.log_name}
                        onValueChange={(value) => handleFilterChange('log_name', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All log names" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All log names</SelectItem>
                          {availableFilters.log_names.map((name: string) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Event</label>
                      <Select
                        value={filters.event}
                        onValueChange={(value) => handleFilterChange('event', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All events" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All events</SelectItem>
                          {availableFilters.events.map((event: string) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Date From</label>
                      <Input
                        type="date"
                        value={filters.date_from}
                        onChange={(e) => handleFilterChange('date_from', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Date To</label>
                      <Input
                        type="date"
                        value={filters.date_to}
                        onChange={(e) => handleFilterChange('date_to', e.target.value)}
                      />
                    </div>

                    <div className="flex items-end gap-2">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                      <Button
                        onClick={fetchActivities}
                        disabled={loading}
                        className="flex-1"
                      >
                        <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BackofficeLayout>
  );
}
