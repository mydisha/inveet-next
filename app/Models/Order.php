<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'package_id',
        'wedding_id',
        'coupon_id',
        'invoice_number',
        'total_price',
        'unique_price',
        'discount_amount',
        'subtotal',
        'coupon_code',
        'payment_type',
        'is_paid',
        'paid_at',
        'expired_at',
        'is_void',
        'void_at',
        'status',
        'last_checked_at',
        'payment_url',
        'external_transaction_id',
        'order_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_price' => 'integer',
        'unique_price' => 'integer',
        'discount_amount' => 'integer',
        'subtotal' => 'integer',
        'is_paid' => 'boolean',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'is_void' => 'boolean',
        'void_at' => 'datetime',
        'last_checked_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->order_uuid)) {
                $model->order_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the package for the order.
     */
    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    /**
     * Get the wedding for the order.
     */
    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }

    /**
     * Get the payments for the order.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get the wallet transactions for the order.
     */
    public function walletTransactions()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    /**
     * Get the coupon used for the order.
     */
    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    /**
     * Get the coupon usage record for this order.
     */
    public function couponUsage()
    {
        return $this->hasOne(CouponUsage::class);
    }

    /**
     * Check if the order is paid.
     */
    public function isPaid(): bool
    {
        return $this->is_paid;
    }

    /**
     * Check if the order is void.
     */
    public function isVoid(): bool
    {
        return $this->is_void;
    }

    /**
     * Check if the order is pending.
     */
    public function isPending(): bool
    {
        return !$this->is_paid && !$this->is_void;
    }

    /**
     * Check if the order is expired.
     */
    public function isExpired(): bool
    {
        return $this->expired_at && $this->expired_at->isPast();
    }

    /**
     * Mark the order as paid.
     */
    public function markAsPaid(string $externalTransactionId = null): void
    {
        $this->update([
            'is_paid' => true,
            'paid_at' => now(),
            'external_transaction_id' => $externalTransactionId
        ]);
    }

    /**
     * Mark the order as void.
     */
    public function markAsVoid(): void
    {
        $this->update([
            'is_void' => true,
            'void_at' => now()
        ]);
    }

    /**
     * Update the order status.
     */
    public function updateStatus(string $status): void
    {
        $this->update([
            'status' => $status,
            'last_checked_at' => now()
        ]);
    }

    /**
     * Get the final price (total + unique - discount).
     */
    public function getFinalPriceAttribute(): int
    {
        $subtotal = $this->subtotal ?? ($this->total_price + $this->unique_price);
        return $subtotal - $this->discount_amount;
    }

    /**
     * Get the subtotal (total + unique before discount).
     */
    public function getSubtotalAttribute(): int
    {
        return $this->subtotal ?? ($this->total_price + $this->unique_price);
    }

    /**
     * Check if the order has a discount applied.
     */
    public function hasDiscount(): bool
    {
        return $this->discount_amount > 0;
    }

    /**
     * Get the discount percentage.
     */
    public function getDiscountPercentageAttribute(): float
    {
        if (!$this->hasDiscount() || !$this->subtotal) {
            return 0;
        }

        return ($this->discount_amount / $this->subtotal) * 100;
    }

    /**
     * Scope a query to only include paid orders.
     */
    public function scopePaid($query)
    {
        return $query->where('is_paid', true);
    }

    /**
     * Scope a query to only include pending orders.
     */
    public function scopePending($query)
    {
        return $query->where('is_paid', false)->where('is_void', false);
    }

    /**
     * Scope a query to only include void orders.
     */
    public function scopeVoid($query)
    {
        return $query->where('is_void', true);
    }

    /**
     * Scope a query to only include orders by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include orders by wedding.
     */
    public function scopeByWedding($query, $weddingId)
    {
        return $query->where('wedding_id', $weddingId);
    }

    /**
     * Scope a query to only include orders by package.
     */
    public function scopeByPackage($query, $packageId)
    {
        return $query->where('package_id', $packageId);
    }

    /**
     * Find order by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('order_uuid', $uuid)->first();
    }
}
