<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeedbackController extends Controller
{
    /**
     * Display a listing of feedbacks.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Feedback::with(['user']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('content', 'like', "%{$search}%")
                  ->orWhere('critics', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by score
        if ($request->has('score_min')) {
            $query->where('score', '>=', $request->get('score_min'));
        }
        if ($request->has('score_max')) {
            $query->where('score', '<=', $request->get('score_max'));
        }

        // Filter by recommendation status
        if ($request->has('is_recommended')) {
            $query->where('is_recommended', $request->get('is_recommended'));
        }

        // Filter by show on landing status
        if ($request->has('show_on_landing')) {
            $query->where('show_on_landing', $request->get('show_on_landing'));
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }
        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $feedbacks = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $feedbacks
        ]);
    }

    /**
     * Display the specified feedback.
     */
    public function show(Feedback $feedback): JsonResponse
    {
        $feedback->load(['user']);

        return response()->json([
            'success' => true,
            'data' => $feedback
        ]);
    }

    /**
     * Update the specified feedback.
     */
    public function update(Request $request, Feedback $feedback): JsonResponse
    {
        $request->validate([
            'score' => 'sometimes|integer|min:1|max:5',
            'content' => 'sometimes|nullable|string',
            'critics' => 'sometimes|nullable|string',
            'is_recommended' => 'sometimes|boolean',
            'show_on_landing' => 'sometimes|boolean'
        ]);

        $feedback->update($request->only([
            'score', 'content', 'critics', 'is_recommended', 'show_on_landing'
        ]));

        $feedback->load(['user']);

        return response()->json([
            'success' => true,
            'message' => 'Feedback updated successfully',
            'data' => $feedback
        ]);
    }

    /**
     * Toggle recommendation status.
     */
    public function toggleRecommendation(Feedback $feedback): JsonResponse
    {
        $feedback->update(['is_recommended' => !$feedback->is_recommended]);

        return response()->json([
            'success' => true,
            'message' => 'Recommendation status updated successfully',
            'data' => $feedback->load(['user'])
        ]);
    }

    /**
     * Toggle show on landing status.
     */
    public function toggleShowOnLanding(Feedback $feedback): JsonResponse
    {
        $feedback->update(['show_on_landing' => !$feedback->show_on_landing]);

        return response()->json([
            'success' => true,
            'message' => 'Show on landing status updated successfully',
            'data' => $feedback->load(['user'])
        ]);
    }

    /**
     * Delete the specified feedback.
     */
    public function destroy(Feedback $feedback): JsonResponse
    {
        $feedback->delete();

        return response()->json([
            'success' => true,
            'message' => 'Feedback deleted successfully'
        ]);
    }

    /**
     * Get feedback statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_feedbacks' => Feedback::count(),
            'average_score' => Feedback::avg('score'),
            'recommended_feedbacks' => Feedback::where('is_recommended', true)->count(),
            'show_on_landing_feedbacks' => Feedback::where('show_on_landing', true)->count(),
            'feedbacks_this_month' => Feedback::whereMonth('created_at', now()->month)->count(),
            'score_distribution' => Feedback::selectRaw('score, COUNT(*) as count')
                ->groupBy('score')
                ->orderBy('score')
                ->get()
                ->pluck('count', 'score')
                ->toArray(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
