<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'discount',
        'is_recommended',
        'is_active',
        'package_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'integer',
        'discount' => 'integer',
        'is_recommended' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->package_uuid)) {
                $model->package_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the orders for the package.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the themes for the package.
     */
    public function themes()
    {
        return $this->belongsToMany(Theme::class, 'package_theme');
    }

    /**
     * Check if the package is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if the package is recommended.
     */
    public function isRecommended(): bool
    {
        return $this->is_recommended;
    }

    /**
     * Check if the package has a discount.
     */
    public function hasDiscount(): bool
    {
        return $this->discount > 0;
    }

    /**
     * Get the discounted price.
     */
    public function getDiscountedPriceAttribute(): int
    {
        if ($this->hasDiscount()) {
            return $this->price - (($this->price * $this->discount) / 100);
        }

        return $this->price;
    }

    /**
     * Get the discount amount.
     */
    public function getDiscountAmountAttribute(): int
    {
        if ($this->hasDiscount()) {
            return ($this->price * $this->discount) / 100;
        }

        return 0;
    }

    /**
     * Calculate the final price for a quantity.
     */
    public function calculatePrice(int $quantity = 1): int
    {
        return $this->discounted_price * $quantity;
    }

    /**
     * Toggle the recommendation status.
     */
    public function toggleRecommendation(): void
    {
        $this->update(['is_recommended' => !$this->is_recommended]);
    }

    /**
     * Activate the package.
     */
    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }

    /**
     * Deactivate the package.
     */
    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    /**
     * Update the discount percentage.
     */
    public function updateDiscount(int $discount): void
    {
        if ($discount >= 0 && $discount <= 100) {
            $this->update(['discount' => $discount]);
        }
    }

    /**
     * Scope a query to only include active packages.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include recommended packages.
     */
    public function scopeRecommended($query)
    {
        return $query->where('is_recommended', true);
    }

    /**
     * Scope a query to only include packages with discounts.
     */
    public function scopeDiscounted($query)
    {
        return $query->where('discount', '>', 0);
    }

    /**
     * Scope a query to only include packages by price range.
     */
    public function scopeByPriceRange($query, int $minPrice, int $maxPrice)
    {
        return $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    /**
     * Find package by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('package_uuid', $uuid)->first();
    }
}
