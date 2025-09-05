<?php

namespace App\Repositories;

use App\Models\Coupon;
use Illuminate\Pagination\LengthAwarePaginator;

class CouponRepository extends BaseRepository
{
    public function __construct(Coupon $model)
    {
        parent::__construct($model);
    }

    /**
     * Find coupon by code.
     */
    public function findByCode(string $code): ?Coupon
    {
        return $this->model->where('code', $code)->first();
    }

    /**
     * Find valid coupon by code.
     */
    public function findValidByCode(string $code): ?Coupon
    {
        return $this->model->valid()->where('code', $code)->first();
    }

    /**
     * Get active coupons.
     */
    public function getActive(array $filters = []): \Illuminate\Database\Eloquent\Collection
    {
        $query = $this->model->active();

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (isset($filters['package_id'])) {
            $query->where(function ($q) use ($filters) {
                $q->whereNull('applicable_packages')
                  ->orWhereJsonContains('applicable_packages', $filters['package_id']);
            });
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Get valid coupons for a specific user and package.
     */
    public function getValidForUserAndPackage(int $userId, int $packageId, int $orderAmount): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->valid()
            ->where(function ($query) use ($packageId) {
                $query->whereNull('applicable_packages')
                      ->orWhereJsonContains('applicable_packages', $packageId);
            })
            ->where(function ($query) use ($userId) {
                $query->whereNull('applicable_users')
                      ->orWhereJsonContains('applicable_users', $userId);
            })
            ->where(function ($query) use ($orderAmount) {
                $query->whereNull('minimum_amount')
                      ->orWhere('minimum_amount', '<=', $orderAmount);
            })
            ->where(function ($query) {
                $query->whereNull('usage_limit')
                      ->orWhereRaw('usage_count < usage_limit');
            })
            ->get()
            ->filter(function ($coupon) use ($userId) {
                return $coupon->canBeUsedByUser($userId);
            });
    }

    /**
     * Get coupons with usage statistics.
     */
    public function getWithUsageStats(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->withCount('usages');

        if (isset($filters['status'])) {
            switch ($filters['status']) {
                case 'active':
                    $query->active();
                    break;
                case 'expired':
                    $query->where('expires_at', '<', now());
                    break;
                case 'inactive':
                    $query->where('is_active', false);
                    break;
            }
        }

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('code', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('name', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    /**
     * Get coupon usage statistics.
     */
    public function getUsageStats(int $couponId): array
    {
        $coupon = $this->find($couponId);

        if (!$coupon) {
            return [];
        }

        $totalUsages = $coupon->usages()->count();
        $totalDiscount = $coupon->usages()->sum('discount_amount');
        $uniqueUsers = $coupon->usages()->distinct('user_id')->count('user_id');

        return [
            'total_usages' => $totalUsages,
            'total_discount' => $totalDiscount,
            'unique_users' => $uniqueUsers,
            'usage_limit' => $coupon->usage_limit,
            'remaining_uses' => $coupon->usage_limit ? max(0, $coupon->usage_limit - $totalUsages) : null,
        ];
    }

    /**
     * Check if coupon code is unique.
     */
    public function isCodeUnique(string $code, ?int $excludeId = null): bool
    {
        $query = $this->model->where('code', $code);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->count() === 0;
    }

    /**
     * Get expired coupons.
     */
    public function getExpired(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->where('expires_at', '<', now())->get();
    }

    /**
     * Get coupons expiring soon.
     */
    public function getExpiringSoon(int $days = 7): \Illuminate\Database\Eloquent\Collection
    {
        $expiryDate = now()->addDays($days);

        return $this->model->where('expires_at', '<=', $expiryDate)
                          ->where('expires_at', '>', now())
                          ->where('is_active', true)
                          ->get();
    }
}
