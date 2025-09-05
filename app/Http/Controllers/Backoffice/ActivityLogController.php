<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    /**
     * Display a listing of activity logs.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'log_name',
            'event',
            'causer_id',
            'subject_type',
            'subject_id',
            'date_from',
            'date_to',
            'search'
        ]);

        $perPage = $request->get('per_page', 50);
        $activities = $this->activityLogService->searchActivities($filters, $perPage);

        // Enhance activities with additional data
        $enhancedActivities = $activities->map(function ($activity) {
            return $this->enhanceActivityData($activity);
        });

        return response()->json([
            'success' => true,
            'data' => $enhancedActivities,
            'filters' => $filters,
            'pagination' => [
                'per_page' => $perPage,
                'total' => $activities->count()
            ]
        ]);
    }

    /**
     * Get activity logs for a specific user.
     */
    public function userActivities(Request $request, $userId): JsonResponse
    {
        $user = \App\Models\User::findOrFail($userId);
        $limit = $request->get('limit', 50);

        $activities = $this->activityLogService->getUserActivities($user, $limit);

        return response()->json([
            'success' => true,
            'data' => $activities,
            'user' => $user->only(['id', 'name', 'email'])
        ]);
    }

    /**
     * Get activity logs for a specific model.
     */
    public function modelActivities(Request $request, $modelType, $modelId): JsonResponse
    {
        $modelClass = "App\\Models\\{$modelType}";

        if (!class_exists($modelClass)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid model type'
            ], 400);
        }

        $model = $modelClass::findOrFail($modelId);
        $limit = $request->get('limit', 50);

        $activities = $this->activityLogService->getModelActivities($model, $limit);

        return response()->json([
            'success' => true,
            'data' => $activities,
            'model' => [
                'type' => $modelType,
                'id' => $modelId,
                'name' => $model->name ?? $model->title ?? 'Unknown'
            ]
        ]);
    }

    /**
     * Get activity statistics.
     */
    public function statistics(Request $request): JsonResponse
    {
        $period = $request->get('period', '30 days');
        $stats = $this->activityLogService->getActivityStats($period);

        return response()->json([
            'success' => true,
            'data' => $stats,
            'period' => $period
        ]);
    }

    /**
     * Get available log names and events for filtering.
     */
    public function filters(): JsonResponse
    {
        $logNames = ActivityLog::distinct('log_name')
            ->pluck('log_name')
            ->filter()
            ->values();

        $events = ActivityLog::distinct('event')
            ->pluck('event')
            ->filter()
            ->values();

        $subjectTypes = ActivityLog::distinct('subject_type')
            ->pluck('subject_type')
            ->filter()
            ->values();

        return response()->json([
            'success' => true,
            'data' => [
                'log_names' => $logNames,
                'events' => $events,
                'subject_types' => $subjectTypes
            ]
        ]);
    }

    /**
     * Show a specific activity log.
     */
    public function show($id): JsonResponse
    {
        $activity = ActivityLog::with(['subject', 'causer'])->findOrFail($id);
        $enhancedActivity = $this->enhanceActivityData($activity);

        return response()->json([
            'success' => true,
            'data' => $enhancedActivity
        ]);
    }

    /**
     * Get activity categories and their counts.
     */
    public function categories(): JsonResponse
    {
        $categories = ActivityLog::selectRaw('log_name, event, COUNT(*) as count')
            ->groupBy('log_name', 'event')
            ->orderBy('count', 'desc')
            ->get()
            ->groupBy('log_name')
            ->map(function ($events, $logName) {
                return [
                    'log_name' => $logName,
                    'events' => $events->map(function ($event) {
                        return [
                            'event' => $event->event,
                            'count' => $event->count,
                            'label' => $this->getEventLabel($event->event),
                            'color' => $this->getEventColor($event->event)
                        ];
                    })
                ];
            })
            ->values();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Get recent changes summary.
     */
    public function recentChanges(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 20);
        $activities = ActivityLog::whereNotNull('properties->changes')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($activity) {
                return $this->enhanceActivityData($activity);
            });

        return response()->json([
            'success' => true,
            'data' => $activities
        ]);
    }

    /**
     * Enhance activity data with additional information.
     */
    protected function enhanceActivityData($activity)
    {
        $enhanced = $activity->toArray();

        // Add event categorization
        $enhanced['event_category'] = $this->getEventCategory($activity->event);
        $enhanced['event_label'] = $this->getEventLabel($activity->event);
        $enhanced['event_color'] = $this->getEventColor($activity->event);
        $enhanced['log_name_label'] = $this->getLogNameLabel($activity->log_name);

        // Add change information if available
        if (isset($activity->properties['changes'])) {
            $enhanced['has_changes'] = true;
            $enhanced['changed_fields'] = $activity->properties['changed_fields'] ?? [];
            $enhanced['change_summary'] = $activity->properties['change_summary'] ?? [];
            $enhanced['changes_count'] = count($activity->properties['changes']);
        } else {
            $enhanced['has_changes'] = false;
            $enhanced['changed_fields'] = [];
            $enhanced['change_summary'] = [];
            $enhanced['changes_count'] = 0;
        }

        // Add human-readable timestamps
        $enhanced['created_at_human'] = $activity->created_at->diffForHumans();
        $enhanced['created_at_formatted'] = $activity->created_at->format('M d, Y H:i:s');

        return $enhanced;
    }

    /**
     * Get performance metrics for activity logging.
     */
    public function performance(): JsonResponse
    {
        try {
            $circuitBreaker = app(\App\Services\ActivityLogCircuitBreaker::class);
            $circuitBreakerStatus = $circuitBreaker->getStatus();

            // Get queue metrics
            $queueSize = \Queue::size('activity-logs');
            $failedJobs = \DB::table('failed_jobs')->count();
            $pendingJobs = \DB::table('jobs')->count();

            // Get activity log statistics
            $totalProcessed = \App\Models\ActivityLog::count();
            $recentActivities = \App\Models\ActivityLog::where('created_at', '>=', now()->subHour())->count();
            $errorRate = $failedJobs > 0 ? ($failedJobs / ($totalProcessed + $failedJobs)) * 100 : 0;

            // Get system metrics
            $memoryUsage = memory_get_usage(true) / 1024 / 1024; // MB
            $memoryPeak = memory_get_peak_usage(true) / 1024 / 1024; // MB

            return response()->json([
                'success' => true,
                'data' => [
                    'queue_size' => $queueSize,
                    'processing_rate' => $recentActivities, // activities per hour
                    'average_processing_time' => 0, // Would need to track this
                    'error_rate' => round($errorRate, 2),
                    'total_processed' => $totalProcessed,
                    'pending_jobs' => $pendingJobs,
                    'failed_jobs' => $failedJobs,
                    'memory_usage' => round($memoryUsage, 2),
                    'cpu_usage' => 0, // Would need system monitoring
                    'circuit_breaker' => $circuitBreakerStatus,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get performance metrics: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get event category for grouping.
     */
    protected function getEventCategory(string $event): string
    {
        $categories = [
            'creating' => 'create',
            'created' => 'create',
            'updating' => 'update',
            'updated' => 'update',
            'saving' => 'save',
            'saved' => 'save',
            'deleting' => 'delete',
            'deleted' => 'delete',
            'restoring' => 'restore',
            'restored' => 'restore',
            'retrieved' => 'read',
            'login' => 'auth',
            'logout' => 'auth',
            'registered' => 'auth',
            'published' => 'publish',
            'paid' => 'payment',
            'activate' => 'admin',
            'deactivate' => 'admin',
        ];

        return $categories[$event] ?? 'other';
    }

    /**
     * Get human-readable event label.
     */
    protected function getEventLabel(string $event): string
    {
        $labels = [
            'creating' => 'Creating',
            'created' => 'Created',
            'updating' => 'Updating',
            'updated' => 'Updated',
            'saving' => 'Saving',
            'saved' => 'Saved',
            'deleting' => 'Deleting',
            'deleted' => 'Deleted',
            'restoring' => 'Restoring',
            'restored' => 'Restored',
            'retrieved' => 'Retrieved',
            'login' => 'Logged In',
            'logout' => 'Logged Out',
            'registered' => 'Registered',
            'published' => 'Published',
            'paid' => 'Payment Made',
            'activate' => 'Activated',
            'deactivate' => 'Deactivated',
        ];

        return $labels[$event] ?? ucfirst($event);
    }

    /**
     * Get event color for UI display.
     */
    protected function getEventColor(string $event): string
    {
        $colors = [
            'creating' => 'blue',
            'created' => 'green',
            'updating' => 'yellow',
            'updated' => 'green',
            'saving' => 'blue',
            'saved' => 'green',
            'deleting' => 'red',
            'deleted' => 'red',
            'restoring' => 'purple',
            'restored' => 'green',
            'retrieved' => 'gray',
            'login' => 'green',
            'logout' => 'gray',
            'registered' => 'blue',
            'published' => 'green',
            'paid' => 'green',
            'activate' => 'green',
            'deactivate' => 'red',
        ];

        return $colors[$event] ?? 'gray';
    }

    /**
     * Get human-readable log name label.
     */
    protected function getLogNameLabel(string $logName): string
    {
        $labels = [
            'user' => 'User',
            'wedding' => 'Wedding',
            'order' => 'Order',
            'package' => 'Package',
            'theme' => 'Theme',
            'admin' => 'Admin',
            'coupon' => 'Coupon',
            'feedback' => 'Feedback',
        ];

        return $labels[$logName] ?? ucfirst($logName);
    }
}
