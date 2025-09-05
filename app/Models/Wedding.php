<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Traits\LogsActivity;

class Wedding extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'theme_id',
        'user_id',
        'wedding_start',
        'wedding_end',
        'view_count',
        'is_active',
        'is_draft',
        'is_published',
        'slug',
        'wedding_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'wedding_start' => 'datetime',
        'wedding_end' => 'datetime',
        'view_count' => 'integer',
        'is_active' => 'boolean',
        'is_draft' => 'boolean',
        'is_published' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->wedding_uuid)) {
                $model->wedding_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the user that owns the wedding.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the theme for the wedding.
     */
    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    /**
     * Get the orders for the wedding.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the special invitations for the wedding.
     */
    public function specialInvitations()
    {
        return $this->hasMany(SpecialInvitation::class);
    }

    /**
     * Get the wedding details for the wedding.
     */
    public function details()
    {
        return $this->hasMany(WeddingDetail::class);
    }

    /**
     * Get the wedding meta for the wedding.
     */
    public function meta()
    {
        return $this->hasMany(WeddingMeta::class);
    }

    /**
     * Get the comments for the wedding.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the galleries for the wedding.
     */
    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }

    /**
     * Get the music for the wedding.
     */
    public function music()
    {
        return $this->hasMany(Music::class);
    }

    /**
     * Get the guest list for the wedding.
     */
    public function guestList()
    {
        return $this->hasMany(GuestList::class);
    }

    /**
     * Check if the wedding is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if the wedding is published.
     */
    public function isPublished(): bool
    {
        return $this->is_published;
    }

    /**
     * Check if the wedding is a draft.
     */
    public function isDraft(): bool
    {
        return $this->is_draft;
    }

    /**
     * Publish the wedding.
     */
    public function publish(): void
    {
        $this->update([
            'is_published' => true,
            'is_draft' => false
        ]);
    }

    /**
     * Unpublish the wedding.
     */
    public function unpublish(): void
    {
        $this->update(['is_published' => false]);
    }

    /**
     * Mark as draft.
     */
    public function markAsDraft(): void
    {
        $this->update([
            'is_draft' => true,
            'is_published' => false
        ]);
    }

    /**
     * Increment view count.
     */
    public function incrementViewCount(): void
    {
        $this->increment('view_count');
    }

    /**
     * Get the wedding status.
     */
    public function getStatusAttribute(): string
    {
        if ($this->is_published) {
            return 'published';
        }

        if ($this->is_draft) {
            return 'draft';
        }

        return 'inactive';
    }

    /**
     * Scope a query to only include active weddings.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include published weddings.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to only include draft weddings.
     */
    public function scopeDraft($query)
    {
        return $query->where('is_draft', true);
    }

    /**
     * Scope a query to only include weddings by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Find wedding by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('wedding_uuid', $uuid)->first();
    }
}
