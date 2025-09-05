<?php

namespace App\Repositories;

use App\Models\Feedback;

class FeedbackRepository extends BaseRepository
{
    public function __construct(Feedback $model)
    {
        parent::__construct($model);
    }

    /**
     * Get feedbacks with filters
     */
    public function getWithFilters(array $filters = [])
    {
        $query = $this->model->with('user');

        if (isset($filters['search']) && $filters['search']) {
            $search = trim($filters['search']);
            if (strlen($search) > 255) {
                $search = substr($search, 0, 255);
            }
            $query->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                  ->orWhere('critics', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if (isset($filters['recommended']) && $filters['recommended'] !== '') {
            $query->where('is_recommended', $filters['recommended'] === 'true');
        }

        if (isset($filters['show_on_landing']) && $filters['show_on_landing'] !== '') {
            $query->where('show_on_landing', $filters['show_on_landing'] === 'true');
        }

        if (isset($filters['min_score'])) {
            $query->where('score', '>=', $filters['min_score']);
        }

        if (isset($filters['max_score'])) {
            $query->where('score', '<=', $filters['max_score']);
        }

        if (isset($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Get recommended feedbacks
     */
    public function getRecommended()
    {
        return $this->model->where('is_recommended', true)->get();
    }

    /**
     * Get feedbacks for landing page
     */
    public function getForLanding()
    {
        return $this->model->where('show_on_landing', true)
                          ->where('is_recommended', true)
                          ->orderBy('created_at', 'desc')
                          ->get();
    }

    /**
     * Get feedback statistics
     */
    public function getStatistics()
    {
        return [
            'total_feedbacks' => $this->model->count(),
            'average_score' => $this->model->avg('score') ?? 0,
            'recommended_feedbacks' => $this->model->where('is_recommended', true)->count(),
            'show_on_landing_feedbacks' => $this->model->where('show_on_landing', true)->count(),
            'feedbacks_this_month' => $this->model->whereMonth('created_at', now()->month)->count(),
        ];
    }
}
