<?php

namespace App\Http\Controllers;

use App\Services\CouponService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CouponController extends Controller
{
    protected $couponService;

    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('view-coupons');

        $filters = $request->only(['status', 'type', 'search', 'per_page']);
        $coupons = $this->couponService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $coupons,
            'message' => 'Coupons retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create-coupons');

        try {
            $coupon = $this->couponService->create($request->all());

            return response()->json([
                'success' => true,
                'data' => $coupon,
                'message' => 'Coupon created successfully'
            ], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $this->authorize('view-coupons');

        $coupon = $this->couponService->findById($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Get usage statistics
        $usageStats = $this->couponService->getUsageStats($id);
        $coupon->usage_stats = $usageStats;

        return response()->json([
            'success' => true,
            'data' => $coupon,
            'message' => 'Coupon retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $this->authorize('edit-coupons');

        try {
            $coupon = $this->couponService->update($id, $request->all());

            if (!$coupon) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coupon not found'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'data' => $coupon,
                'message' => 'Coupon updated successfully'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $this->authorize('delete-coupons');

        try {
            $deleted = $this->couponService->delete($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coupon not found'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Coupon deleted successfully'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Toggle coupon active status.
     */
    public function toggleActive(int $id): JsonResponse
    {
        $this->authorize('edit-coupons');

        $result = $this->couponService->toggleActive($id);

        if (!$result['success']) {
            return response()->json([
                'success' => false,
                'message' => $result['message']
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => ['is_active' => $result['is_active']],
            'message' => $result['message']
        ]);
    }

    /**
     * Get coupon usage statistics.
     */
    public function usageStats(int $id): JsonResponse
    {
        $this->authorize('view-coupons');

        $stats = $this->couponService->getUsageStats($id);

        if (empty($stats)) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $stats,
            'message' => 'Usage statistics retrieved successfully'
        ]);
    }

    /**
     * Validate coupon code.
     */
    public function validate(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required|string',
            'user_id' => 'required|integer|exists:users,id',
            'package_id' => 'required|integer|exists:packages,id',
            'order_amount' => 'required|integer|min:0'
        ]);

        $result = $this->couponService->validateCoupon(
            $request->code,
            $request->user_id,
            $request->package_id,
            $request->order_amount
        );

        return response()->json([
            'success' => $result['valid'],
            'data' => $result,
            'message' => $result['message']
        ]);
    }

    /**
     * Get available coupons for user and package.
     */
    public function available(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'package_id' => 'required|integer|exists:packages,id',
            'order_amount' => 'required|integer|min:0'
        ]);

        $coupons = $this->couponService->getAvailableCoupons(
            $request->user_id,
            $request->package_id,
            $request->order_amount
        );

        return response()->json([
            'success' => true,
            'data' => $coupons,
            'message' => 'Available coupons retrieved successfully'
        ]);
    }
}
