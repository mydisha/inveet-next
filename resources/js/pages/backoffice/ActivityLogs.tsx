import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { Filter, RefreshCw, Search } from 'lucide-react';
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

export default function ActivityLogs({ auth }: ActivityLogsProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
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

  const getEventBadgeVariant = (event: string) => {
    switch (event) {
      case 'created':
        return 'default';
      case 'updated':
        return 'secondary';
      case 'deleted':
        return 'destructive';
      case 'login':
        return 'outline';
      case 'logout':
        return 'outline';
      case 'published':
        return 'default';
      case 'paid':
        return 'default';
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

  return (
    <BackofficeLayout
      user={auth.user}
      title="Activity Logs"
      description="Monitor and track system activities"
    >
      <Head title="Activity Logs" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
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
                              {activity.log_name}
                            </Badge>
                            <Badge variant={getEventBadgeVariant(activity.event)}>
                              {activity.event}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {format(new Date(activity.created_at), 'MMM dd, yyyy HH:mm')}
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 mb-2">
                            {activity.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {activity.causer && (
                              <span>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </BackofficeLayout>
  );
}
