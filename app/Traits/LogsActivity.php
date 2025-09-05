<?php

namespace App\Traits;

use App\Jobs\LogActivityJob;
use App\Models\ActivityLog;
use App\Services\ActivityLogCircuitBreaker;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

trait LogsActivity
{
    /**
     * Boot the trait and register model events.
     * Only track INSERT and UPDATE events to prevent performance issues.
     */
    protected static function bootLogsActivity()
    {
        // Check if activity logging is enabled
        if (!config('activity_log.enabled', true)) {
            return;
        }

        // Only track created (INSERT) and updated (UPDATE) events
        static::created(function (Model $model) {
            $model->logActivity('created');
        });

        static::updated(function (Model $model) {
            $model->logActivity('updated');
        });

        // Optional: Track soft deletes for important models only
        if (in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses_recursive(static::class))) {
            static::deleted(function (Model $model) {
                // Only log soft deletes for important models
                if (in_array(static::class, [
                    \App\Models\User::class,
                    \App\Models\Wedding::class,
                    \App\Models\Order::class,
                ])) {
                    $model->logActivity('deleted');
                }
            });
        }
    }

    /**
     * Log an activity for this model.
     */
    public function logActivity(string $event, array $properties = [], string $description = null, bool $async = true): void
    {
        // Skip logging if model doesn't have an ID yet (for creating/saving events)
        if (!$this->id && in_array($event, ['creating', 'saving'])) {
            return;
        }

        // Check circuit breaker before attempting to log
        $circuitBreaker = app(ActivityLogCircuitBreaker::class);
        if (!$circuitBreaker->isAllowed()) {
            return;
        }

        $logName = $this->getLogName();
        $activityData = [
            'log_name' => $logName,
            'event' => $event,
            'subject_type' => get_class($this),
            'subject_id' => $this->id,
            'causer_type' => $this->getCauserType(),
            'causer_id' => $this->getCauserId(),
            'properties' => $this->getActivityProperties($event, $properties),
            'description' => $description ?: $this->getActivityDescription($event),
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'url' => Request::url(),
            'method' => Request::method(),
        ];

        try {
            // Always use async logging to prevent database timeouts
            if (config('queue.default') !== 'sync') {
                // Dispatch to queue for async processing
                LogActivityJob::dispatch(
                    $activityData['log_name'],
                    $activityData['event'],
                    $activityData['subject_type'],
                    $activityData['subject_id'],
                    $activityData['causer_type'],
                    $activityData['causer_id'],
                    $activityData['properties'],
                    $activityData['description'],
                    $activityData['ip_address'],
                    $activityData['user_agent'],
                    $activityData['url'],
                    $activityData['method']
                )->onQueue('activity-logs');

                $circuitBreaker->recordSuccess();
            } else {
                // Only for testing - use try-catch to prevent timeouts
                ActivityLog::create($activityData);
                $circuitBreaker->recordSuccess();
            }
        } catch (\Exception $e) {
            $circuitBreaker->recordFailure();
            \Log::warning('Activity log failed: ' . $e->getMessage());
        }
    }

    /**
     * Get the log name for this model.
     */
    protected function getLogName(): string
    {
        return strtolower(Str::afterLast(get_class($this), '\\'));
    }

    /**
     * Get the causer type for this activity.
     */
    protected function getCauserType(): ?string
    {
        if (Auth::check()) {
            return get_class(Auth::user());
        }

        return null;
    }

    /**
     * Get the causer ID for this activity.
     */
    protected function getCauserId(): ?int
    {
        if (Auth::check()) {
            return Auth::id();
        }

        return null;
    }

    /**
     * Get the properties for this activity.
     */
    protected function getActivityProperties(string $event, array $additionalProperties = []): array
    {
        $properties = [
            'model' => get_class($this),
            'model_id' => $this->id,
        ];

        // Add changes for updated events
        if (in_array($event, ['updating', 'updated', 'saving', 'saved']) && method_exists($this, 'getChanges')) {
            $changes = $this->getChanges();
            if (!empty($changes)) {
                $properties['changes'] = $changes;
                $properties['original'] = $this->getOriginal();

                // Calculate what fields changed
                $properties['changed_fields'] = array_keys($changes);

                // Calculate change summary
                $properties['change_summary'] = $this->generateChangeSummary($changes);
            }
        }

        // Add model attributes for created events
        if (in_array($event, ['creating', 'created', 'saving', 'saved'])) {
            $properties['attributes'] = $this->getAttributes();
        }

        // Add model attributes for deleted events
        if (in_array($event, ['deleting', 'deleted'])) {
            $properties['attributes'] = $this->getAttributes();
        }

        return array_merge($properties, $additionalProperties);
    }

    /**
     * Generate a human-readable summary of changes.
     */
    protected function generateChangeSummary(array $changes): array
    {
        $summary = [];

        foreach ($changes as $field => $newValue) {
            $oldValue = $this->getOriginal($field);

            // Handle different data types
            if (is_bool($newValue)) {
                $summary[] = "{$field}: " . ($oldValue ? 'true' : 'false') . " → " . ($newValue ? 'true' : 'false');
            } elseif (is_numeric($newValue)) {
                $summary[] = "{$field}: {$oldValue} → {$newValue}";
            } elseif (is_string($newValue) && strlen($newValue) > 50) {
                $summary[] = "{$field}: " . substr($oldValue, 0, 20) . "... → " . substr($newValue, 0, 20) . "...";
            } else {
                $summary[] = "{$field}: {$oldValue} → {$newValue}";
            }
        }

        return $summary;
    }

    /**
     * Get the description for this activity.
     */
    protected function getActivityDescription(string $event): string
    {
        $modelName = Str::afterLast(get_class($this), '\\');
        $causerName = Auth::check() ? Auth::user()->name : 'System';

        return sprintf(
            '%s %s %s',
            $causerName,
            $event,
            $modelName
        );
    }

    /**
     * Get all activities for this model.
     */
    public function activities()
    {
        return $this->morphMany(ActivityLog::class, 'subject');
    }

    /**
     * Get activities caused by this model.
     */
    public function causedActivities()
    {
        return $this->morphMany(ActivityLog::class, 'causer');
    }
}
