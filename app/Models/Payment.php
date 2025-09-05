<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\LogsActivity;

class Payment extends Model
{
    use HasFactory, LogsActivity;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'payments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'payment_channel',
        'gateway_source',
        'payment_status',
        'transaction_type',
        'callback_response',
        'payment_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'callback_response' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->payment_uuid)) {
                $model->payment_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the order that owns the payment.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Scope a query to only include settled payments.
     */
    public function scopeSettled($query)
    {
        return $query->where('payment_status', 'settlement');
    }

    /**
     * Scope a query to only include pending payments.
     */
    public function scopePending($query)
    {
        return $query->where('payment_status', 'pending');
    }

    /**
     * Scope a query to only include failed payments.
     */
    public function scopeFailed($query)
    {
        return $query->where('payment_status', 'failed');
    }

    /**
     * Check if the payment is settled.
     */
    public function isSettled(): bool
    {
        return $this->payment_status === 'settlement';
    }

    /**
     * Check if the payment is pending.
     */
    public function isPending(): bool
    {
        return $this->payment_status === 'pending';
    }

    /**
     * Check if the payment failed.
     */
    public function isFailed(): bool
    {
        return $this->payment_status === 'failed';
    }

    /**
     * Check if the payment is using Xendit gateway.
     */
    public function isXenditPayment(): bool
    {
        return $this->gateway_source === 'xendit';
    }

    /**
     * Get Xendit payment status mapping.
     */
    public function getXenditStatusMapping(): array
    {
        return [
            'PENDING' => 'pending',
            'PAID' => 'settlement',
            'SETTLED' => 'settlement',
            'EXPIRED' => 'failed',
            'FAILED' => 'failed',
        ];
    }

    /**
     * Update payment status from Xendit callback.
     */
    public function updateFromXenditCallback(array $callbackData): void
    {
        $statusMapping = $this->getXenditStatusMapping();
        $xenditStatus = $callbackData['status'] ?? 'PENDING';

        $currentCallbackResponse = $this->callback_response ?? [];
        $currentCallbackResponse = array_merge($currentCallbackResponse, $callbackData);

        $this->update([
            'payment_status' => $statusMapping[$xenditStatus] ?? 'pending',
            'callback_response' => $currentCallbackResponse,
        ]);
    }

    /**
     * Scope a query to only include Xendit payments.
     */
    public function scopeXendit($query)
    {
        return $query->where('gateway_source', 'xendit');
    }
}
