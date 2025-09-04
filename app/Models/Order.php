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
        'invoice_number',
        'total_price',
        'unique_price',
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
     * Get the final price (total + unique).
     */
    public function getFinalPriceAttribute(): int
    {
        return $this->total_price + $this->unique_price;
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
