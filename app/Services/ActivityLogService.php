<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogService
{
    /**
     * Log a custom activity.
     */
    public function log(
        string $logName,
        string $event,
        Model $subject,
        array $properties = [],
        string $description = null,
        Model $causer = null
    ): ActivityLog {
        return ActivityLog::create([
            'log_name' => $logName,
            'event' => $event,
            'subject_type' => get_class($subject),
            'subject_id' => $subject->id,
            'causer_type' => $causer ? get_class($causer) : $this->getCauserType(),
            'causer_id' => $causer ? $causer->id : $this->getCauserId(),
            'properties' => $properties,
            'description' => $description,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'url' => Request::url(),
            'method' => Request::method(),
        ]);
    }

    /**
     * Log user login activity.
     */
    public function logLogin(User $user, string $method = 'email'): ActivityLog
    {
        return $this->log(
            'user',
            'login',
            $user,
            ['method' => $method],
            "User {$user->name} logged in via {$method}"
        );
    }

    /**
     * Log user logout activity.
     */
    public function logLogout(User $user): ActivityLog
    {
        return $this->log(
            'user',
            'logout',
            $user,
            [],
            "User {$user->name} logged out"
        );
    }

    /**
     * Log user registration activity.
     */
    public function logRegistration(User $user, array $additionalData = []): ActivityLog
    {
        return $this->log(
            'user',
            'registered',
            $user,
            array_merge(['email' => $user->email], $additionalData),
            "User {$user->name} registered"
        );
    }

    /**
     * Log wedding publication activity.
     */
    public function logWeddingPublication(Model $wedding, User $user): ActivityLog
    {
        return $this->log(
            'wedding',
            'published',
            $wedding,
            ['wedding_title' => $wedding->title ?? 'Untitled'],
            "Wedding published by {$user->name}"
        );
    }

    /**
     * Log order payment activity.
     */
    public function logOrderPayment(Model $order, User $user, array $paymentData = []): ActivityLog
    {
        return $this->log(
            'order',
            'paid',
            $order,
            array_merge([
                'order_number' => $order->invoice_number ?? $order->id,
                'amount' => $order->total_price ?? 0,
            ], $paymentData),
            "Order #" . ($order->invoice_number ?? $order->id) . " paid by {$user->name}"
        );
    }

    /**
     * Log admin action activity.
     */
    public function logAdminAction(string $action, Model $subject, array $properties = []): ActivityLog
    {
        $user = Auth::user();

        return $this->log(
            'admin',
            $action,
            $subject,
            array_merge([
                'admin_id' => $user->id,
                'admin_name' => $user->name,
                'admin_role' => $user->roles->pluck('name')->join(', '),
            ], $properties),
            "Admin {$user->name} performed {$action} on " . class_basename($subject)
        );
    }

    /**
     * Get activities for a specific user.
     */
    public function getUserActivities(User $user, int $limit = 50)
    {
        return ActivityLog::where(function ($query) use ($user) {
            $query->where('causer_type', get_class($user))
                  ->where('causer_id', $user->id);
        })
        ->orWhere(function ($query) use ($user) {
            $query->where('subject_type', get_class($user))
                  ->where('subject_id', $user->id);
        })
        ->orderBy('created_at', 'desc')
        ->limit($limit)
        ->get();
    }

    /**
     * Get activities for a specific model.
     */
    public function getModelActivities(Model $model, int $limit = 50)
    {
        return ActivityLog::where('subject_type', get_class($model))
            ->where('subject_id', $model->id)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Search activities.
     */
    public function searchActivities(array $filters = [], int $limit = 50)
    {
        $query = ActivityLog::query();

        if (isset($filters['log_name'])) {
            $query->where('log_name', $filters['log_name']);
        }

        if (isset($filters['event'])) {
            $query->where('event', $filters['event']);
        }

        if (isset($filters['causer_id'])) {
            $query->where('causer_id', $filters['causer_id']);
        }

        if (isset($filters['subject_type'])) {
            $query->where('subject_type', $filters['subject_type']);
        }

        if (isset($filters['subject_id'])) {
            $query->where('subject_id', $filters['subject_id']);
        }

        if (isset($filters['date_from'])) {
            $query->where('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to'])) {
            $query->where('created_at', '<=', $filters['date_to']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('log_name', 'like', "%{$search}%")
                  ->orWhere('event', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('created_at', 'desc')
                    ->limit($limit)
                    ->get();
    }

    /**
     * Get activity statistics.
     */
    public function getActivityStats(string $period = '30 days')
    {
        $startDate = now()->sub($period);

        return [
            'total_activities' => ActivityLog::where('created_at', '>=', $startDate)->count(),
            'user_activities' => ActivityLog::where('log_name', 'user')
                ->where('created_at', '>=', $startDate)
                ->count(),
            'wedding_activities' => ActivityLog::where('log_name', 'wedding')
                ->where('created_at', '>=', $startDate)
                ->count(),
            'order_activities' => ActivityLog::where('log_name', 'order')
                ->where('created_at', '>=', $startDate)
                ->count(),
            'admin_activities' => ActivityLog::where('log_name', 'admin')
                ->where('created_at', '>=', $startDate)
                ->count(),
        ];
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
}
