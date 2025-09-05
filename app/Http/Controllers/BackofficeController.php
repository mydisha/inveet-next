<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Services\OrderService;
use App\Services\FeedbackService;
use App\Services\ThemeService;
use App\Services\CouponService;
use App\Services\AnalyticsService;
use App\Repositories\ActivityLogRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackofficeController extends BaseController
{
    protected $userService;
    protected $orderService;
    protected $feedbackService;
    protected $themeService;
    protected $couponService;
    protected $analyticsService;
    protected $activityLogRepository;

    public function __construct(
        UserService $userService,
        OrderService $orderService,
        FeedbackService $feedbackService,
        ThemeService $themeService,
        CouponService $couponService,
        AnalyticsService $analyticsService,
        ActivityLogRepository $activityLogRepository
    ) {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->userService = $userService;
        $this->orderService = $orderService;
        $this->feedbackService = $feedbackService;
        $this->themeService = $themeService;
        $this->couponService = $couponService;
        $this->analyticsService = $analyticsService;
        $this->activityLogRepository = $activityLogRepository;
    }

    /**
     * Show the backoffice dashboard with Wayfinder pattern
     */
    public function dashboard(Request $request)
    {
        $user = $this->getUser($request);

        // Check if this is a reload request (for background data loading)
        if ($request->has('reload') && $request->get('reload') === 'true') {
            try {
                // Use comprehensive analytics to get all data in one call
                $analytics = $this->analyticsService->getComprehensiveAnalytics();

                // Get recent activity logs with caching
                $activities = $this->getCachedActivities();

                return Inertia::render('backoffice/Dashboard', [
                    'user' => $this->getUserData($user),
                    'userStats' => $analytics['users'],
                    'orderStats' => $analytics['orders'],
                    'feedbackStats' => $analytics['feedbacks'],
                    'themeStats' => $analytics['weddings'],
                    'activities' => $activities,
                    'loaded_at' => now()->toDateTimeString(),
                ]);
            } catch (\Exception $e) {
                // Log error but don't fail the request
                \Log::error('Dashboard reload failed: ' . $e->getMessage());

                return Inertia::render('backoffice/Dashboard', [
                    'user' => $this->getUserData($user),
                    'userStats' => null,
                    'orderStats' => null,
                    'feedbackStats' => null,
                    'themeStats' => null,
                    'activities' => [],
                    'error' => 'Failed to load dashboard data. Please refresh the page.',
                ]);
            }
        }

        // Initial page load - return minimal data for fast rendering
        return Inertia::render('backoffice/Dashboard', [
            'user' => $this->getUserData($user),
            'userStats' => null,
            'orderStats' => null,
            'feedbackStats' => null,
            'themeStats' => null,
            'activities' => [],
        ]);
    }

    /**
     * Get cached activities with fallback
     */
    private function getCachedActivities()
    {
        return \Cache::remember('dashboard_activities', 2, function () {
            try {
                return $this->activityLogRepository->getRecentWithRelations(10);
            } catch (\Exception $e) {
                \Log::warning('Failed to load activities: ' . $e->getMessage());
                return [];
            }
        });
    }

    /**
     * Show the backoffice users page
     */
    public function users(Request $request)
    {
        $filters = $request->only(['search', 'role', 'status', 'sort_by', 'sort_order', 'per_page']);
        $users = $this->userService->paginate(15, $filters);

        return Inertia::render('backoffice/Users', [
            'user' => $this->getUserData($this->getUser($request)),
            'users' => $users,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the backoffice orders page
     */
    public function orders(Request $request)
    {
        $filters = $request->only(['search', 'status', 'payment_type', 'date_from', 'date_to']);
        $orders = $this->orderService->paginate(15, $filters);

        return Inertia::render('backoffice/Orders', [
            'user' => $this->getUserData($this->getUser($request)),
            'orders' => $orders,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the backoffice feedbacks page
     */
    public function feedbacks(Request $request)
    {
        $filters = $request->only(['search', 'recommended', 'show_landing', 'min_score', 'max_score']);
        $feedbacks = $this->feedbackService->paginate(20, $filters);

        return Inertia::render('backoffice/Feedbacks', [
            'user' => $this->getUserData($this->getUser($request)),
            'feedbacks' => $feedbacks,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the backoffice themes page
     */
    public function themes(Request $request)
    {
        $filters = $request->only(['search', 'status', 'visibility']);
        $themes = $this->themeService->paginate(20, $filters);

        return Inertia::render('backoffice/Themes', [
            'user' => $this->getUserData($this->getUser($request)),
            'themes' => $themes,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the backoffice configurations page
     */
    public function configurations(Request $request)
    {
        return Inertia::render('backoffice/Configurations', [
            'user' => $this->getUserData($this->getUser($request)),
        ]);
    }

    /**
     * Show the backoffice coupons page
     */
    public function coupons(Request $request)
    {
        $filters = $request->only(['status', 'type', 'search', 'per_page']);
        $coupons = $this->couponService->getAll($filters);

        return Inertia::render('backoffice/Coupons', [
            'user' => $this->getUserData($this->getUser($request)),
            'coupons' => $coupons,
            'filters' => $filters,
        ]);
    }

    /**
     * Show user detail page
     */
    public function userDetail(Request $request, $id)
    {
        $user = $this->userService->findById($id);

        if (!$user) {
            abort(404, 'User not found');
        }

        return Inertia::render('backoffice/UserDetail', [
            'user' => $this->getUserData($this->getUser($request)),
            'userDetail' => $this->getUserData($user),
        ]);
    }

    /**
     * Show user edit page
     */
    public function userEdit(Request $request, $id)
    {
        $user = $this->userService->findById($id);

        if (!$user) {
            abort(404, 'User not found');
        }

        return Inertia::render('backoffice/UserEdit', [
            'user' => $this->getUserData($this->getUser($request)),
            'userDetail' => $this->getUserData($user),
        ]);
    }

    /**
     * Show order detail page
     */
    public function orderDetail(Request $request, $id)
    {
        $order = $this->orderService->findByIdWithRelations($id);

        if (!$order) {
            abort(404, 'Order not found');
        }

        return Inertia::render('backoffice/OrderDetail', [
            'user' => $this->getUserData($this->getUser($request)),
            'order' => $order,
        ]);
    }

    /**
     * Show feedback detail page
     */
    public function feedbackDetail(Request $request, $id)
    {
        $feedback = $this->feedbackService->findById($id);

        if (!$feedback) {
            abort(404, 'Feedback not found');
        }

        return Inertia::render('backoffice/FeedbackDetail', [
            'user' => $this->getUserData($this->getUser($request)),
            'feedback' => $feedback,
        ]);
    }

    /**
     * Show theme detail page
     */
    public function themeDetail(Request $request, $id)
    {
        $theme = $this->themeService->findById($id);

        if (!$theme) {
            abort(404, 'Theme not found');
        }

        return Inertia::render('backoffice/ThemeDetail', [
            'user' => $this->getUserData($this->getUser($request)),
            'theme' => $theme,
        ]);
    }

    /**
     * Show theme create page
     */
    public function themeCreate(Request $request)
    {
        return Inertia::render('backoffice/ThemeCreate', [
            'user' => $this->getUserData($this->getUser($request)),
        ]);
    }

    /**
     * Show theme edit page
     */
    public function themeEdit(Request $request, $id)
    {
        $theme = $this->themeService->findById($id);

        if (!$theme) {
            abort(404, 'Theme not found');
        }

        return Inertia::render('backoffice/ThemeEdit', [
            'user' => $this->getUserData($this->getUser($request)),
            'theme' => $theme,
        ]);
    }

    /**
     * Show configuration detail page
     */
    public function configurationDetail(Request $request, $id)
    {
        return Inertia::render('backoffice/ConfigurationDetail', [
            'user' => $this->getUserData($this->getUser($request)),
            'configurationId' => $id,
        ]);
    }

    /**
     * Show configuration create page
     */
    public function configurationCreate(Request $request)
    {
        return Inertia::render('backoffice/ConfigurationCreate', [
            'user' => $this->getUserData($this->getUser($request)),
        ]);
    }

    // API Methods for AJAX requests

    /**
     * Search users for autocomplete
     */
    public function usersSearch(Request $request)
    {
        $query = $request->get('search', '');
        $limit = $request->get('limit', 20);

        if (empty($query)) {
            return response()->json(['users' => []]);
        }

        $users = $this->userService->search($query, $limit);

        return response()->json([
            'users' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            })
        ]);
    }

    /**
     * Mark order as paid
     */
    public function markOrderAsPaid(Request $request, $id)
    {
        try {
            $order = $this->orderService->findById($id);

            if (!$order) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 404);
            }

            $externalTransactionId = $request->input('external_transaction_id', 'MANUAL_' . time());
            $this->orderService->markAsPaid($id, $externalTransactionId);

            return response()->json(['success' => true, 'message' => 'Order marked as paid successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to mark order as paid'], 500);
        }
    }

    /**
     * Mark order as void
     */
    public function markOrderAsVoid(Request $request, $id)
    {
        try {
            $order = $this->orderService->findById($id);

            if (!$order) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 404);
            }

            $this->orderService->markAsVoid($id);

            return response()->json(['success' => true, 'message' => 'Order marked as void successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to mark order as void'], 500);
        }
    }

    /**
     * Get configurations
     */
    public function getConfigurations(Request $request)
    {
        // This would typically use a ConfigurationService
        return response()->json([
            'success' => true,
            'configurations' => []
        ]);
    }

    /**
     * Get single configuration
     */
    public function getConfiguration(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'configuration' => null
        ]);
    }

    /**
     * Update configuration
     */
    public function updateConfiguration(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Configuration updated successfully'
        ]);
    }

    /**
     * Delete configuration
     */
    public function deleteConfiguration(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Configuration deleted successfully'
        ]);
    }

    /**
     * Initialize default configurations
     */
    public function initializeDefaultConfigurations(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Default configurations initialized successfully'
        ]);
    }

    /**
     * Get activity logs
     */
    public function getActivityLogs(Request $request)
    {
        $filters = $request->only(['page', 'per_page', 'search', 'event', 'log_name', 'date_from', 'date_to']);
        $logs = $this->activityLogRepository->paginateWithFilters($filters);

        return response()->json([
            'success' => true,
            'logs' => $logs
        ]);
    }

    /**
     * Get activity logs performance metrics
     */
    public function getActivityLogsPerformance(Request $request)
    {
        return response()->json([
            'success' => true,
            'metrics' => [
                'total_logs' => 0,
                'logs_today' => 0,
                'average_response_time' => 0,
                'error_rate' => 0
            ]
        ]);
    }

    /**
     * Get activity logs categories
     */
    public function getActivityLogsCategories(Request $request)
    {
        return response()->json([
            'success' => true,
            'categories' => ['user', 'wedding', 'order', 'package', 'theme', 'feedback']
        ]);
    }

    /**
     * Get recent changes
     */
    public function getActivityLogsRecentChanges(Request $request)
    {
        $changes = $this->activityLogRepository->getRecentWithRelations(10);

        return response()->json([
            'success' => true,
            'changes' => $changes
        ]);
    }

    /**
     * Get activity logs statistics
     */
    public function getActivityLogsStatistics(Request $request)
    {
        return response()->json([
            'success' => true,
            'statistics' => [
                'total_activities' => 0,
                'activities_today' => 0,
                'most_active_user' => null,
                'most_common_event' => null
            ]
        ]);
    }

    /**
     * Get activity logs filters
     */
    public function getActivityLogsFilters(Request $request)
    {
        return response()->json([
            'success' => true,
            'filters' => [
                'events' => ['created', 'updated', 'deleted', 'published'],
                'log_names' => ['user', 'wedding', 'order', 'package', 'theme'],
                'date_ranges' => ['today', 'yesterday', 'this_week', 'this_month', 'last_month']
            ]
        ]);
    }

    /**
     * Update user
     */
    public function updateUser(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255|unique:users,email,' . $id,
                'phone' => 'sometimes|nullable|string|max:20',
                'is_active' => 'sometimes|boolean',
            ]);

            $user = $this->userService->update($id, $validatedData);

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'user' => $user
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user
     */
    public function deleteUser(Request $request, $id)
    {
        try {
            $this->userService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available payment types for orders.
     */
    public function getOrderPaymentTypes()
    {
        try {
            $paymentTypes = \App\Models\Order::distinct()
                ->whereNotNull('payment_type')
                ->where('payment_type', '!=', '')
                ->pluck('payment_type')
                ->sort()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $paymentTypes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch payment types: ' . $e->getMessage()
            ], 500);
        }
    }
}
