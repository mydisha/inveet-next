<?php

namespace App\Repositories;

use App\Models\ActivityLog;

class ActivityLogRepository extends BaseRepository
{
    public function __construct(ActivityLog $model)
    {
        parent::__construct($model);
    }

    /**
     * Get recent activity logs with relationships (optimized)
     */
    public function getRecentWithRelations(int $limit = 10)
    {
        // Use select to only get needed columns for better performance
        return $this->model->select([
                'id', 'log_name', 'event', 'description', 'properties',
                'created_at', 'causer_type', 'causer_id', 'subject_type', 'subject_id'
            ])
            ->with([
                'causer:id,name,email', // Only select needed causer columns
                'subject:id,name' // Only select needed subject columns (removed title as it may not exist)
            ])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'log_name' => $log->log_name,
                    'event' => $log->event,
                    'description' => $log->description,
                    'event_label' => $this->getEventLabel($log->event),
                    'event_color' => $this->getEventColor($log->event),
                    'log_name_label' => $this->getLogNameLabel($log->log_name),
                    'created_at' => $log->created_at->toISOString(),
                    'created_at_human' => $log->created_at->diffForHumans(),
                    'created_at_formatted' => $log->created_at->format('M d, Y H:i:s'),
                    'causer' => $log->causer ? [
                        'id' => $log->causer->id,
                        'name' => $log->causer->name,
                        'email' => $log->causer->email,
                    ] : null,
                    'subject' => $log->subject ? [
                        'id' => $log->subject->id,
                        'name' => $log->subject->name ?? 'Unknown',
                    ] : null,
                    'has_changes' => isset($log->properties['changes']),
                    'changed_fields' => $log->properties['changed_fields'] ?? [],
                    'change_summary' => $log->properties['change_summary'] ?? [],
                ];
            });
    }

    /**
     * Get event label for display
     */
    private function getEventLabel(string $event): string
    {
        return match($event) {
            'created' => 'Created',
            'updated' => 'Updated',
            'deleted' => 'Deleted',
            'published' => 'Published',
            'unpublished' => 'Unpublished',
            'activated' => 'Activated',
            'deactivated' => 'Deactivated',
            default => ucfirst($event),
        };
    }

    /**
     * Get event color for display
     */
    private function getEventColor(string $event): string
    {
        return match($event) {
            'created' => 'bg-green-100 text-green-600',
            'updated' => 'bg-blue-100 text-blue-600',
            'deleted' => 'bg-red-100 text-red-600',
            'published' => 'bg-purple-100 text-purple-600',
            'unpublished' => 'bg-gray-100 text-gray-600',
            'activated' => 'bg-green-100 text-green-600',
            'deactivated' => 'bg-yellow-100 text-yellow-600',
            default => 'bg-gray-100 text-gray-600',
        };
    }

    /**
     * Get log name label for display
     */
    private function getLogNameLabel(string $logName): string
    {
        return match($logName) {
            'user' => 'User',
            'wedding' => 'Wedding',
            'order' => 'Order',
            'package' => 'Package',
            'theme' => 'Theme',
            'feedback' => 'Feedback',
            'coupon' => 'Coupon',
            default => ucfirst($logName),
        };
    }

    /**
     * Get activity logs by causer
     */
    public function getByCauser(int $causerId, int $limit = 20)
    {
        return $this->model->where('causer_id', $causerId)
            ->with(['subject'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get activity logs by subject
     */
    public function getBySubject(string $subjectType, int $subjectId, int $limit = 20)
    {
        return $this->model->where('subject_type', $subjectType)
            ->where('subject_id', $subjectId)
            ->with(['causer'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Paginate activity logs with filters
     */
    public function paginateWithFilters(array $filters = [])
    {
        $query = $this->model->with(['causer:id,name,email', 'subject:id,name'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if (isset($filters['search']) && !empty($filters['search'])) {
            $searchTerm = $filters['search'];
            $query->where(function ($q) use ($searchTerm) {
                $q->where('description', 'like', "%{$searchTerm}%")
                  ->orWhere('log_name', 'like', "%{$searchTerm}%")
                  ->orWhere('event', 'like', "%{$searchTerm}%");
            });
        }

        if (isset($filters['event']) && !empty($filters['event'])) {
            $query->where('event', $filters['event']);
        }

        if (isset($filters['log_name']) && !empty($filters['log_name'])) {
            $query->where('log_name', $filters['log_name']);
        }

        if (isset($filters['date_from']) && !empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to']) && !empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        $perPage = $filters['per_page'] ?? 15;
        return $query->paginate($perPage);
    }
}
