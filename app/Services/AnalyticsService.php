<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Wedding;
use App\Models\User;
use App\Models\Feedback;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    /**
     * Cache duration in minutes
     */
    const CACHE_DURATION = 5;

    /**
     * Get wedding analytics with caching
     */
    public function getWeddingAnalytics(int $weddingId = null)
    {
        $cacheKey = 'analytics_weddings_' . ($weddingId ?? 'all');

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($weddingId) {
            if ($weddingId) {
                $wedding = Wedding::find($weddingId);
                if (!$wedding) {
                    return [
                        'total_weddings' => 0,
                        'total_views' => 0,
                        'active_weddings' => 0,
                        'published_weddings' => 0,
                        'draft_weddings' => 0,
                    ];
                }

                return [
                    'total_weddings' => 1,
                    'total_views' => $wedding->view_count ?? 0,
                    'active_weddings' => $wedding->is_active ? 1 : 0,
                    'published_weddings' => $wedding->is_published ? 1 : 0,
                    'draft_weddings' => $wedding->is_draft ? 1 : 0,
                ];
            }

            // Use raw SQL for better performance
            $stats = DB::selectOne("
                SELECT
                    COUNT(*) as total_weddings,
                    COALESCE(SUM(view_count), 0) as total_views,
                    SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_weddings,
                    SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published_weddings,
                    SUM(CASE WHEN is_draft = 1 THEN 1 ELSE 0 END) as draft_weddings
                FROM weddings
            ");

            return [
                'total_weddings' => (int) $stats->total_weddings,
                'total_views' => (int) $stats->total_views,
                'active_weddings' => (int) $stats->active_weddings,
                'published_weddings' => (int) $stats->published_weddings,
                'draft_weddings' => (int) $stats->draft_weddings,
            ];
        });
    }

    /**
     * Get order analytics with caching and optimized queries
     */
    public function getOrderAnalytics()
    {
        return Cache::remember('analytics_orders', self::CACHE_DURATION, function () {
            // Use raw SQL for better performance
            $stats = DB::selectOne("
                SELECT
                    COUNT(*) as total_orders,
                    SUM(CASE WHEN is_paid = 1 THEN 1 ELSE 0 END) as paid_orders,
                    SUM(CASE WHEN is_paid = 0 AND is_void = 0 THEN 1 ELSE 0 END) as pending_orders,
                    SUM(CASE WHEN is_void = 1 THEN 1 ELSE 0 END) as void_orders,
                    COALESCE(SUM(CASE WHEN is_paid = 1 THEN total_price ELSE 0 END), 0) as total_revenue,
                    SUM(CASE WHEN MONTH(created_at) = ? THEN 1 ELSE 0 END) as orders_this_month,
                    COALESCE(SUM(CASE WHEN is_paid = 1 AND MONTH(created_at) = ? THEN total_price ELSE 0 END), 0) as revenue_this_month
                FROM orders
                WHERE payment_type NOT IN ('promo', 'free')
                AND total_price > 0
            ", [now()->format('m'), now()->format('m')]);

            return [
                'total_orders' => (int) $stats->total_orders,
                'paid_orders' => (int) $stats->paid_orders,
                'pending_orders' => (int) $stats->pending_orders,
                'void_orders' => (int) $stats->void_orders,
                'total_revenue' => (float) $stats->total_revenue,
                'orders_this_month' => (int) $stats->orders_this_month,
                'revenue_this_month' => (float) $stats->revenue_this_month,
            ];
        });
    }

    /**
     * Get user analytics with caching and optimized queries
     */
    public function getUserAnalytics()
    {
        return Cache::remember('analytics_users', self::CACHE_DURATION, function () {
            // Use raw SQL for better performance
            $stats = DB::selectOne("
                SELECT
                    COUNT(*) as total_users,
                    SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_users,
                    SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive_users,
                    (SELECT COUNT(DISTINCT user_id) FROM weddings) as users_with_weddings,
                    (SELECT COUNT(DISTINCT user_id) FROM orders) as users_with_orders,
                    SUM(CASE WHEN MONTH(created_at) = ? THEN 1 ELSE 0 END) as new_users_this_month,
                    SUM(CASE WHEN created_at >= ? AND created_at <= ? THEN 1 ELSE 0 END) as new_users_this_week
                FROM users
            ", [
                now()->format('m'),
                now()->startOfWeek()->toDateTimeString(),
                now()->endOfWeek()->toDateTimeString()
            ]);

            return [
                'total_users' => (int) $stats->total_users,
                'active_users' => (int) $stats->active_users,
                'inactive_users' => (int) $stats->inactive_users,
                'users_with_weddings' => (int) $stats->users_with_weddings,
                'users_with_orders' => (int) $stats->users_with_orders,
                'new_users_this_month' => (int) $stats->new_users_this_month,
                'new_users_this_week' => (int) $stats->new_users_this_week,
            ];
        });
    }

    /**
     * Get feedback analytics with caching and optimized queries
     */
    public function getFeedbackAnalytics()
    {
        return Cache::remember('analytics_feedbacks', self::CACHE_DURATION, function () {
            // Use raw SQL for better performance
            $stats = DB::selectOne("
                SELECT
                    COUNT(*) as total_feedbacks,
                    COALESCE(AVG(score), 0) as average_score,
                    SUM(CASE WHEN is_recommended = 1 THEN 1 ELSE 0 END) as recommended_feedbacks,
                    SUM(CASE WHEN show_on_landing = 1 THEN 1 ELSE 0 END) as show_on_landing_feedbacks,
                    SUM(CASE WHEN MONTH(created_at) = ? THEN 1 ELSE 0 END) as feedbacks_this_month
                FROM feedbacks
            ", [now()->format('m')]);

            return [
                'total_feedbacks' => (int) $stats->total_feedbacks,
                'average_score' => round((float) $stats->average_score, 2),
                'recommended_feedbacks' => (int) $stats->recommended_feedbacks,
                'show_on_landing_feedbacks' => (int) $stats->show_on_landing_feedbacks,
                'feedbacks_this_month' => (int) $stats->feedbacks_this_month,
            ];
        });
    }

    /**
     * Get comprehensive analytics with caching
     */
    public function getComprehensiveAnalytics()
    {
        return Cache::remember('analytics_comprehensive', self::CACHE_DURATION, function () {
            return [
                'weddings' => $this->getWeddingAnalytics(),
                'orders' => $this->getOrderAnalytics(),
                'users' => $this->getUserAnalytics(),
                'feedbacks' => $this->getFeedbackAnalytics(),
            ];
        });
    }

    /**
     * Clear all analytics cache
     */
    public function clearCache()
    {
        Cache::forget('analytics_weddings_all');
        Cache::forget('analytics_orders');
        Cache::forget('analytics_users');
        Cache::forget('analytics_feedbacks');
        Cache::forget('analytics_comprehensive');
    }
}
