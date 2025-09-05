import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    CheckCircle,
    Clock,
    Database,
    RefreshCw,
    TrendingUp,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  queue_size: number;
  processing_rate: number;
  average_processing_time: number;
  error_rate: number;
  total_processed: number;
  pending_jobs: number;
  failed_jobs: number;
  memory_usage: number;
  cpu_usage: number;
}

interface ActivityPerformanceProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export default function ActivityPerformance({ auth }: ActivityPerformanceProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/backoffice/activity-logs/performance');
      const data = await response.json();

      if (data.success) {
        setMetrics(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();

    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadge = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'destructive';
    if (value >= thresholds.warning) return 'secondary';
    return 'default';
  };

  if (loading) {
    return (
      <BackofficeLayout user={auth.user} title="Activity Performance">
        <Head title="Activity Performance" />
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mr-2" />
          Loading performance metrics...
        </div>
      </BackofficeLayout>
    );
  }

  return (
    <BackofficeLayout
      user={auth.user}
      title="Activity Performance"
      description="Performance metrics and analytics"
    >
      <Head title="Activity Performance" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={fetchMetrics}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                Refresh
              </Button>
              <Button
                onClick={() => setAutoRefresh(!autoRefresh)}
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
              </Button>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Queue Size</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      getStatusColor(metrics?.queue_size || 0, { warning: 1000, critical: 5000 })
                    )}>
                      {metrics?.queue_size || 0}
                    </p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <Badge
                  variant={getStatusBadge(metrics?.queue_size || 0, { warning: 1000, critical: 5000 })}
                  className="mt-2"
                >
                  {metrics?.queue_size === 0 ? 'Empty' :
                   (metrics?.queue_size || 0) > 5000 ? 'Critical' :
                   (metrics?.queue_size || 0) > 1000 ? 'Warning' : 'Normal'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Processing Rate</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      getStatusColor(metrics?.processing_rate || 0, { warning: 50, critical: 100 })
                    )}>
                      {metrics?.processing_rate || 0}/min
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <Progress
                  value={Math.min((metrics?.processing_rate || 0) / 100 * 100, 100)}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Error Rate</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      getStatusColor(metrics?.error_rate || 0, { warning: 5, critical: 10 })
                    )}>
                      {metrics?.error_rate || 0}%
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <Badge
                  variant={getStatusBadge(metrics?.error_rate || 0, { warning: 5, critical: 10 })}
                  className="mt-2"
                >
                  {metrics?.error_rate === 0 ? 'No Errors' :
                   (metrics?.error_rate || 0) > 10 ? 'High' : 'Low'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Processed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.total_processed?.toLocaleString() || 0}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <Badge variant="outline" className="mt-2">
                  All Time
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* System Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{metrics?.memory_usage || 0}%</span>
                    </div>
                    <Progress
                      value={metrics?.memory_usage || 0}
                      className={cn(
                        metrics?.memory_usage && metrics.memory_usage > 80 ? 'bg-red-200' :
                        metrics?.memory_usage && metrics.memory_usage > 60 ? 'bg-yellow-200' : 'bg-green-200'
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{metrics?.cpu_usage || 0}%</span>
                    </div>
                    <Progress
                      value={metrics?.cpu_usage || 0}
                      className={cn(
                        metrics?.cpu_usage && metrics.cpu_usage > 80 ? 'bg-red-200' :
                        metrics?.cpu_usage && metrics.cpu_usage > 60 ? 'bg-yellow-200' : 'bg-green-200'
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Job Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Jobs</span>
                    <Badge variant="outline">{metrics?.pending_jobs || 0}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Failed Jobs</span>
                    <Badge
                      variant={metrics?.failed_jobs && metrics.failed_jobs > 0 ? "destructive" : "outline"}
                    >
                      {metrics?.failed_jobs || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Processing Time</span>
                    <span className="text-sm font-medium">
                      {metrics?.average_processing_time || 0}ms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics?.queue_size && metrics.queue_size > 5000 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">High Queue Size</p>
                      <p className="text-sm text-red-700">
                        Consider increasing the number of queue workers or optimizing the processing logic.
                      </p>
                    </div>
                  </div>
                )}

                {metrics?.error_rate && metrics.error_rate > 10 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">High Error Rate</p>
                      <p className="text-sm text-red-700">
                        Check the failed jobs and investigate the root cause of errors.
                      </p>
                    </div>
                  </div>
                )}

                {metrics?.processing_rate && metrics.processing_rate < 10 && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Low Processing Rate</p>
                      <p className="text-sm text-yellow-700">
                        Consider using Redis-based logging or batch processing for better performance.
                      </p>
                    </div>
                  </div>
                )}

                {(!metrics?.queue_size || metrics.queue_size === 0) &&
                 (!metrics?.error_rate || metrics.error_rate === 0) && (
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">System Running Smoothly</p>
                      <p className="text-sm text-green-700">
                        All metrics are within normal ranges. No immediate action required.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BackofficeLayout>
  );
}
