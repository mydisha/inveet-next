<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'score',
        'content',
        'critics',
        'is_recommended',
        'show_on_landing',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'score' => 'integer',
        'is_recommended' => 'boolean',
        'show_on_landing' => 'boolean',
    ];

    /**
     * Get the user that owns the feedback.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include recommended feedbacks.
     */
    public function scopeRecommended($query)
    {
        return $query->where('is_recommended', true);
    }

    /**
     * Scope a query to only include feedbacks shown on landing.
     */
    public function scopeShowOnLanding($query)
    {
        return $query->where('show_on_landing', true);
    }

    /**
     * Scope a query to only include feedbacks by score range.
     */
    public function scopeByScore($query, $min, $max = null)
    {
        if ($max === null) {
            return $query->where('score', '>=', $min);
        }

        return $query->whereBetween('score', [$min, $max]);
    }
}
