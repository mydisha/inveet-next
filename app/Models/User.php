<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'socialite_id',
        'socialite_name',
        'socialite_avatar',
        'phone_number',
        'is_active',
        'user_uuid',
        'language',
        'theme',
        'email_notifications',
        'marketing_emails',
    ];

    /**
     * The attributes that should be guarded from mass assignment.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
        'email_notifications' => 'boolean',
        'marketing_emails' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->user_uuid)) {
                $model->user_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get the weddings for the user.
     */
    public function weddings()
    {
        return $this->hasMany(Wedding::class);
    }

    /**
     * Get the orders for the user.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the individual wallets for the user.
     */
    public function individualWallets()
    {
        return $this->hasMany(IndividualWallet::class);
    }

    /**
     * Get the withdraw transactions for the user.
     */
    public function withdrawTransactions()
    {
        return $this->hasMany(WithdrawTransaction::class);
    }

    /**
     * Get the feedback for the user.
     */
    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }

    /**
     * Get the comments for the user.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the user onboarding record.
     */
    public function onboarding()
    {
        return $this->hasOne(UserOnboarding::class);
    }

    /**
     * Check if the user is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Activate the user.
     */
    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }

    /**
     * Deactivate the user.
     */
    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    /**
     * Get the user's display name.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->name ?: $this->email;
    }

    /**
     * Check if the user has a phone number.
     */
    public function hasPhoneNumber(): bool
    {
        return !empty($this->phone_number);
    }

    /**
     * Check if the user has social authentication.
     */
    public function hasSocialAuth(): bool
    {
        return !empty($this->socialite_id);
    }

    /**
     * Find user by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('user_uuid', $uuid)->first();
    }

    /**
     * Check if the user has any weddings.
     */
    public function getHasWeddingAttribute(): bool
    {
        return $this->weddings()->exists();
    }
}
