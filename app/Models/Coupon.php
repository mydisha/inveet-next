<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Coupon extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'minimum_amount',
        'maximum_discount',
        'usage_limit',
        'usage_count',
        'user_limit',
        'starts_at',
        'expires_at',
        'is_active',
        'applicable_packages',
        'applicable_users',
        'coupon_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => 'integer',
        'minimum_amount' => 'integer',
        'maximum_discount' => 'integer',
        'usage_limit' => 'integer',
        'usage_count' => 'integer',
        'user_limit' => 'integer',
        'starts_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
        'applicable_packages' => 'array',
        'applicable_users' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->coupon_uuid)) {
                $model->coupon_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the coupon usages.
     */
    public function usages()
    {
        return $this->hasMany(CouponUsage::class);
    }

    /**
     * Get the orders that used this coupon.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Check if the coupon is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if the coupon is valid (active and within date range).
     */
    public function isValid(): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        $now = now();

        if ($this->starts_at && $now->isBefore($this->starts_at)) {
            return false;
        }

        if ($this->expires_at && $now->isAfter($this->expires_at)) {
            return false;
        }

        return true;
    }

    /**
     * Check if the coupon has reached its usage limit.
     */
    public function hasReachedUsageLimit(): bool
    {
        return $this->usage_limit && $this->usage_count >= $this->usage_limit;
    }

    /**
     * Check if the coupon can be used by a specific user.
     */
    public function canBeUsedByUser(int $userId): bool
    {
        // Check if coupon is valid
        if (!$this->isValid()) {
            return false;
        }

        // Check usage limit
        if ($this->hasReachedUsageLimit()) {
            return false;
        }

        // Check user-specific restrictions
        if ($this->applicable_users && !in_array($userId, $this->applicable_users)) {
            return false;
        }

        // Check per-user usage limit
        if ($this->user_limit) {
            $userUsageCount = $this->usages()->where('user_id', $userId)->count();
            if ($userUsageCount >= $this->user_limit) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if the coupon can be applied to a specific package.
     */
    public function canBeAppliedToPackage(int $packageId): bool
    {
        if (!$this->applicable_packages) {
            return true; // No package restrictions
        }

        return in_array($packageId, $this->applicable_packages);
    }

    /**
     * Check if the coupon can be applied to an order amount.
     */
    public function canBeAppliedToAmount(int $amount): bool
    {
        if (!$this->minimum_amount) {
            return true; // No minimum amount requirement
        }

        return $amount >= $this->minimum_amount;
    }

    /**
     * Calculate discount amount for a given order amount.
     */
    public function calculateDiscount(int $orderAmount): int
    {
        if (!$this->canBeAppliedToAmount($orderAmount)) {
            return 0;
        }

        $discount = 0;

        if ($this->type === 'percentage') {
            $discount = ($orderAmount * $this->value) / 100;

            // Apply maximum discount limit if set
            if ($this->maximum_discount && $discount > $this->maximum_discount) {
                $discount = $this->maximum_discount;
            }
        } else { // fixed amount
            $discount = $this->value;
        }

        // Ensure discount doesn't exceed order amount
        return min($discount, $orderAmount);
    }

    /**
     * Increment usage count.
     */
    public function incrementUsage(): void
    {
        $this->increment('usage_count');
    }

    /**
     * Decrement usage count.
     */
    public function decrementUsage(): void
    {
        if ($this->usage_count > 0) {
            $this->decrement('usage_count');
        }
    }

    /**
     * Activate the coupon.
     */
    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }

    /**
     * Deactivate the coupon.
     */
    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    /**
     * Scope a query to only include active coupons.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include valid coupons.
     */
    public function scopeValid($query)
    {
        $now = now();
        return $query->where('is_active', true)
                    ->where(function ($q) use ($now) {
                        $q->whereNull('starts_at')
                          ->orWhere('starts_at', '<=', $now);
                    })
                    ->where(function ($q) use ($now) {
                        $q->whereNull('expires_at')
                          ->orWhere('expires_at', '>=', $now);
                    });
    }

    /**
     * Scope a query to only include coupons by type.
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Find coupon by code.
     */
    public static function findByCode(string $code): ?self
    {
        return static::where('code', $code)->first();
    }

    /**
     * Find coupon by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('coupon_uuid', $uuid)->first();
    }

    /**
     * Get the formatted value for display.
     */
    public function getFormattedValueAttribute(): string
    {
        if ($this->type === 'percentage') {
            return $this->value . '%';
        }

        return 'Rp ' . number_format($this->value, 0, ',', '.');
    }

    /**
     * Get the status text.
     */
    public function getStatusTextAttribute(): string
    {
        if (!$this->is_active) {
            return 'Inactive';
        }

        if (!$this->isValid()) {
            return 'Expired';
        }

        if ($this->hasReachedUsageLimit()) {
            return 'Usage Limit Reached';
        }

        return 'Active';
    }
}
