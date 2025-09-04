<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'is_public',
        'preview_image',
        'user_id',
        'theme_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'is_public' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->theme_uuid)) {
                $model->theme_uuid = Str::uuid();
            }
        });
    }

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
        return $this->hasMany(ThemeImage::class, 'themes_id');
    }

    /**
     * Get the theme meta for the theme.
     */
    public function meta()
    {
        return $this->hasMany(ThemeMeta::class);
    }

    /**
     * Get the full URL for the preview image.
     */
    public function getPreviewImageUrlAttribute(): ?string
    {
        if (!$this->preview_image) {
            return null;
        }

        // If it's already a full URL, return as is
        if (filter_var($this->preview_image, FILTER_VALIDATE_URL)) {
            return $this->preview_image;
        }

        // If it's a relative path, prepend the AWS URL
        $awsUrl = config('filesystems.disks.s3.url') ?: env('AWS_URL');
        return $awsUrl ? rtrim($awsUrl, '/') . '/' . ltrim($this->preview_image, '/') : $this->preview_image;
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

    /**
     * Find theme by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('theme_uuid', $uuid)->first();
    }
}
