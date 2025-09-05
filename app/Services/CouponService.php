<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use App\Repositories\CouponRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CouponService implements BaseServiceInterface
{
    protected $couponRepository;

    public function __construct(CouponRepository $couponRepository)
    {
        $this->couponRepository = $couponRepository;
    }

    /**
     * Get all coupons with optional filters.
     */
    public function getAll(array $filters = [])
    {
        return $this->couponRepository->getWithUsageStats($filters);
    }

    /**
     * Find coupon by ID.
     */
    public function findById(int $id)
    {
        return $this->couponRepository->find($id);
    }

    /**
     * Create a new coupon.
     */
    public function create(array $data)
    {
        $this->validateCouponData($data);

        // Check if code is unique
        if (!$this->couponRepository->isCodeUnique($data['code'])) {
            throw ValidationException::withMessages([
                'code' => ['The coupon code has already been taken.']
            ]);
        }

        // Convert applicable arrays to JSON
        if (isset($data['applicable_packages']) && is_array($data['applicable_packages'])) {
            $data['applicable_packages'] = array_filter($data['applicable_packages']);
        }

        if (isset($data['applicable_users']) && is_array($data['applicable_users'])) {
            $data['applicable_users'] = array_filter($data['applicable_users']);
        }

        return $this->couponRepository->create($data);
    }

    /**
     * Update an existing coupon.
     */
    public function update(int $id, array $data)
    {
        $coupon = $this->findById($id);

        if (!$coupon) {
            return false;
        }

        $this->validateCouponData($data, $id);

        // Check if code is unique (excluding current coupon)
        if (isset($data['code']) && !$this->couponRepository->isCodeUnique($data['code'], $id)) {
            throw ValidationException::withMessages([
                'code' => ['The coupon code has already been taken.']
            ]);
        }

        // Convert applicable arrays to JSON
        if (isset($data['applicable_packages']) && is_array($data['applicable_packages'])) {
            $data['applicable_packages'] = array_filter($data['applicable_packages']);
        }

        if (isset($data['applicable_users']) && is_array($data['applicable_users'])) {
            $data['applicable_users'] = array_filter($data['applicable_users']);
        }

        return $this->couponRepository->update($id, $data);
    }

    /**
     * Delete a coupon.
     */
    public function delete(int $id)
    {
        $coupon = $this->findById($id);

        if (!$coupon) {
            return false;
        }

        // Check if coupon has been used
        if ($coupon->usage_count > 0) {
            throw ValidationException::withMessages([
                'coupon' => ['Cannot delete coupon that has been used.']
            ]);
        }

        return $this->couponRepository->delete($id);
    }

    /**
     * Paginate coupons.
     */
    public function paginate(int $perPage = 15, array $filters = [])
    {
        $filters['per_page'] = $perPage;
        return $this->couponRepository->getWithUsageStats($filters);
    }

    /**
     * Validate coupon code for a user and order.
     */
    public function validateCoupon(string $code, int $userId, int $packageId, int $orderAmount): array
    {
        $coupon = $this->couponRepository->findValidByCode($code);

        if (!$coupon) {
            return [
                'valid' => false,
                'message' => 'Invalid or expired coupon code.'
            ];
        }

        if (!$coupon->canBeUsedByUser($userId)) {
            return [
                'valid' => false,
                'message' => 'This coupon cannot be used by you.'
            ];
        }

        if (!$coupon->canBeAppliedToPackage($packageId)) {
            return [
                'valid' => false,
                'message' => 'This coupon is not applicable to the selected package.'
            ];
        }

        if (!$coupon->canBeAppliedToAmount($orderAmount)) {
            return [
                'valid' => false,
                'message' => 'Order amount does not meet the minimum requirement for this coupon.'
            ];
        }

        $discountAmount = $coupon->calculateDiscount($orderAmount);

        return [
            'valid' => true,
            'coupon' => $coupon,
            'discount_amount' => $discountAmount,
            'message' => 'Coupon applied successfully.'
        ];
    }

    /**
     * Apply coupon to an order.
     */
    public function applyCouponToOrder(Order $order, string $couponCode): array
    {
        $validation = $this->validateCoupon(
            $couponCode,
            $order->user_id,
            $order->package_id,
            $order->subtotal
        );

        if (!$validation['valid']) {
            return $validation;
        }

        $coupon = $validation['coupon'];
        $discountAmount = $validation['discount_amount'];

        DB::transaction(function () use ($order, $coupon, $discountAmount) {
            // Update order with coupon information
            $order->update([
                'coupon_id' => $coupon->id,
                'coupon_code' => $coupon->code,
                'discount_amount' => $discountAmount,
                'subtotal' => $order->subtotal,
            ]);

            // Create coupon usage record
            CouponUsage::create([
                'coupon_id' => $coupon->id,
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'discount_amount' => $discountAmount,
                'order_amount' => $order->subtotal,
                'used_at' => now(),
            ]);

            // Increment coupon usage count
            $coupon->incrementUsage();
        });

        return [
            'valid' => true,
            'coupon' => $coupon,
            'discount_amount' => $discountAmount,
            'final_amount' => $order->fresh()->final_price,
            'message' => 'Coupon applied successfully.'
        ];
    }

    /**
     * Remove coupon from an order.
     */
    public function removeCouponFromOrder(Order $order): array
    {
        if (!$order->coupon_id) {
            return [
                'valid' => false,
                'message' => 'No coupon applied to this order.'
            ];
        }

        DB::transaction(function () use ($order) {
            $coupon = $order->coupon;

            // Delete coupon usage record
            $order->couponUsage()->delete();

            // Decrement coupon usage count
            $coupon->decrementUsage();

            // Remove coupon from order
            $order->update([
                'coupon_id' => null,
                'coupon_code' => null,
                'discount_amount' => 0,
            ]);
        });

        return [
            'valid' => true,
            'message' => 'Coupon removed successfully.',
            'final_amount' => $order->fresh()->final_price
        ];
    }

    /**
     * Get available coupons for a user and package.
     */
    public function getAvailableCoupons(int $userId, int $packageId, int $orderAmount): array
    {
        $coupons = $this->couponRepository->getValidForUserAndPackage($userId, $packageId, $orderAmount);

        return $coupons->map(function ($coupon) use ($orderAmount) {
            return [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'name' => $coupon->name,
                'description' => $coupon->description,
                'type' => $coupon->type,
                'value' => $coupon->value,
                'formatted_value' => $coupon->formatted_value,
                'discount_amount' => $coupon->calculateDiscount($orderAmount),
                'minimum_amount' => $coupon->minimum_amount,
                'expires_at' => $coupon->expires_at,
            ];
        })->toArray();
    }

    /**
     * Get coupon usage statistics.
     */
    public function getUsageStats(int $couponId): array
    {
        return $this->couponRepository->getUsageStats($couponId);
    }

    /**
     * Toggle coupon active status.
     */
    public function toggleActive(int $id): array
    {
        $coupon = $this->findById($id);

        if (!$coupon) {
            return [
                'success' => false,
                'message' => 'Coupon not found.'
            ];
        }

        if ($coupon->is_active) {
            $coupon->deactivate();
            $message = 'Coupon deactivated successfully.';
        } else {
            $coupon->activate();
            $message = 'Coupon activated successfully.';
        }

        return [
            'success' => true,
            'message' => $message,
            'is_active' => $coupon->fresh()->is_active
        ];
    }

    /**
     * Validate coupon data.
     */
    private function validateCouponData(array $data, ?int $excludeId = null): void
    {
        $rules = [
            'code' => 'required|string|max:50|unique:coupons,code' . ($excludeId ? ',' . $excludeId : ''),
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|integer|min:1',
            'minimum_amount' => 'nullable|integer|min:0',
            'maximum_discount' => 'nullable|integer|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'user_limit' => 'nullable|integer|min:1',
            'starts_at' => 'nullable|date|after_or_equal:today',
            'expires_at' => 'nullable|date|after:starts_at',
            'is_active' => 'boolean',
            'applicable_packages' => 'nullable|array',
            'applicable_packages.*' => 'integer|exists:packages,id',
            'applicable_users' => 'nullable|array',
            'applicable_users.*' => 'integer|exists:users,id',
        ];

        // Additional validation for percentage coupons
        if (isset($data['type']) && $data['type'] === 'percentage') {
            $rules['value'] = 'required|integer|min:1|max:100';
        }

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
