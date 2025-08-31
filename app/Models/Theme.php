<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'slug',
        'is_active',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the user that owns the theme.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the weddings for the theme.
     */
    public function weddings()
    {
        return $this->hasMany(Wedding::class);
    }

    /**
     * Get the packages for the theme.
     */
    public function packages()
    {
        return $this->belongsToMany(Package::class, 'package_theme');
    }

    /**
     * Get the theme images for the theme.
     */
    public function images()
    {
        return $this->hasMany(ThemeImage::class);
    }

    /**
     * Get the theme meta for the theme.
     */
    public function meta()
    {
        return $this->hasMany(ThemeMeta::class);
    }

    /**
     * Check if the theme is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Activate the theme.
     */
    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }

    /**
     * Deactivate the theme.
     */
    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    /**
     * Scope a query to only include active themes.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include themes by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
