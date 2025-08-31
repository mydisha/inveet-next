<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SpecialInvitation extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'wedding_id',
        'name',
        'description',
        'slug',
        'is_active',
        'is_locked',
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'is_locked' => 'boolean',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the wedding that owns the invitation.
     */
    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }

    /**
     * Check if the invitation is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if the invitation is locked.
     */
    public function isLocked(): bool
    {
        return $this->is_locked;
    }

    /**
     * Check if the invitation has a password.
     */
    public function hasPassword(): bool
    {
        return !empty($this->password);
    }

    /**
     * Lock the invitation.
     */
    public function lock(): void
    {
        $this->update(['is_locked' => true]);
    }

    /**
     * Unlock the invitation.
     */
    public function unlock(): void
    {
        $this->update(['is_locked' => false]);
    }

    /**
     * Update the invitation password.
     */
    public function updatePassword(string $password): void
    {
        $this->update(['password' => bcrypt($password)]);
    }

    /**
     * Remove the invitation password.
     */
    public function removePassword(): void
    {
        $this->update(['password' => null]);
    }

    /**
     * Validate the password.
     */
    public function validatePassword(string $password): bool
    {
        if (!$this->hasPassword()) {
            return false;
        }

        return password_verify($password, $this->password);
    }

    /**
     * Toggle the lock status.
     */
    public function toggleLock(): void
    {
        $this->update(['is_locked' => !$this->is_locked]);
    }

    /**
     * Scope a query to only include active invitations.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include locked invitations.
     */
    public function scopeLocked($query)
    {
        return $query->where('is_locked', true);
    }

    /**
     * Scope a query to only include invitations by wedding.
     */
    public function scopeByWedding($query, $weddingId)
    {
        return $query->where('wedding_id', $weddingId);
    }

    /**
     * Scope a query to only include invitations by slug.
     */
    public function scopeBySlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}
