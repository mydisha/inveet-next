<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'wedding_id',
        'key',
        'value',
    ];

    /**
     * Get the wedding that owns the detail.
     */
    public function wedding(): BelongsTo
    {
        return $this->belongsTo(Wedding::class);
    }

    /**
     * Scope a query to only include details for a specific wedding.
     */
    public function scopeForWedding($query, $weddingId)
    {
        return $query->where('wedding_id', $weddingId);
    }

    /**
     * Scope a query to only include details with a specific key.
     */
    public function scopeWithKey($query, $key)
    {
        return $query->where('key', $key);
    }

    /**
     * Get a specific detail value for a wedding.
     */
    public static function getValue($weddingId, $key, $default = null)
    {
        $detail = static::forWedding($weddingId)->withKey($key)->first();
        return $detail ? $detail->value : $default;
    }

    /**
     * Set a specific detail value for a wedding.
     */
    public static function setValue($weddingId, $key, $value)
    {
        return static::updateOrCreate(
            ['wedding_id' => $weddingId, 'key' => $key],
            ['value' => $value]
        );
    }

    /**
     * Set multiple detail values for a wedding.
     */
    public static function setValues($weddingId, array $details)
    {
        foreach ($details as $key => $value) {
            static::setValue($weddingId, $key, $value);
        }
    }

    /**
     * Get all details for a wedding as an associative array.
     */
    public static function getAllForWedding($weddingId)
    {
        return static::forWedding($weddingId)
            ->pluck('value', 'key')
            ->toArray();
    }
}
