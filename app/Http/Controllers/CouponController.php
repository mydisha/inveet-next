<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\ApiResponseTrait;
use App\Services\CouponService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CouponController extends Controller
{
    use ApiResponseTrait, AuthorizesRequests;

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

        return $this->successResponse($coupons, 'Coupons retrieved successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create-coupons');

        try {
            $coupon = $this->couponService->create($request->all());
            return $this->successResponse($coupon, 'Coupon created successfully', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->handleException($e, 'creating the coupon');
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
            return $this->notFoundResponse('Coupon not found');
        }

        // Get usage statistics
        $usageStats = $this->couponService->getUsageStats($id);
        $coupon->usage_stats = $usageStats;

        return $this->successResponse($coupon, 'Coupon retrieved successfully');
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
                return $this->notFoundResponse('Coupon not found');
            }

            return $this->successResponse($coupon, 'Coupon updated successfully');
        } catch (\Exception $e) {
            return $this->handleException($e, 'updating the coupon');
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
                return $this->notFoundResponse('Coupon not found');
            }

            return $this->successResponse(null, 'Coupon deleted successfully');
        } catch (\Exception $e) {
            return $this->handleException($e, 'deleting the coupon');
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
            return $this->notFoundResponse($result['message']);
        }

        return $this->successResponse(['is_active' => $result['is_active']], $result['message']);
    }

    /**
     * Get coupon usage statistics.
     */
    public function usageStats(int $id): JsonResponse
    {
        $this->authorize('view-coupons');

        $stats = $this->couponService->getUsageStats($id);

        if (empty($stats)) {
            return $this->notFoundResponse('Coupon not found');
        }

        return $this->successResponse($stats, 'Usage statistics retrieved successfully');
    }

    /**
     * Validate coupon code.
     */
    public function validate(Request $request): JsonResponse
    {
        try {
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

            return $this->successResponse($result, $result['message']);
        } catch (\Exception $e) {
            return $this->handleException($e, 'validating the coupon');
        }
    }

    /**
     * Get available coupons for user and package.
     */
    public function available(Request $request): JsonResponse
    {
        try {
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

            return $this->successResponse($coupons, 'Available coupons retrieved successfully');
        } catch (\Exception $e) {
            return $this->handleException($e, 'retrieving available coupons');
        }
    }
}
