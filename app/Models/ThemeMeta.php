<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThemeMeta extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'theme_sections';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'theme_id',
        'name',
        'type',
        'config',
        'sequence',
    ];

    /**
     * Get the theme that owns the section.
     */
    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }
}
