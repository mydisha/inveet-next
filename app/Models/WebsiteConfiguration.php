<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WebsiteConfiguration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'description',
        'is_public',
        'config_uuid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_public' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->config_uuid)) {
                $model->config_uuid = Str::uuid();
            }
        });
    }

    /**
     * Get configuration value by key.
     */
    public static function getValue(string $key, $default = null)
    {
        $config = static::where('key', $key)->first();

        if (!$config) {
            return $default;
        }

        return match ($config->type) {
            'boolean' => (bool) $config->value,
            'integer' => (int) $config->value,
            'float' => (float) $config->value,
            'array', 'json' => json_decode($config->value, true),
            default => $config->value,
        };
    }

    /**
     * Set configuration value by key.
     */
    public static function setValue(string $key, $value, string $type = 'string', string $group = 'general', string $description = null): self
    {
        $config = static::where('key', $key)->first();

        if (!$config) {
            $config = new static();
            $config->key = $key;
            $config->type = $type;
            $config->group = $group;
            $config->description = $description;
        }

        $config->value = match ($type) {
            'array', 'json' => is_array($value) ? json_encode($value) : $value,
            default => (string) $value,
        };

        $config->save();

        return $config;
    }

    /**
     * Get all configurations by group.
     */
    public static function getByGroup(string $group): \Illuminate\Database\Eloquent\Collection
    {
        return static::where('group', $group)->get();
    }

    /**
     * Scope a query to only include public configurations.
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope a query to only include configurations by group.
     */
    public function scopeByGroup($query, string $group)
    {
        return $query->where('group', $group);
    }

    /**
     * Find configuration by UUID.
     */
    public static function findByUuid(string $uuid): ?self
    {
        return static::where('config_uuid', $uuid)->first();
    }
}
