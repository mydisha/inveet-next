<?php

namespace App\Repositories;

use App\Models\Theme;

class ThemeRepository extends BaseRepository
{
    public function __construct(Theme $model)
    {
        parent::__construct($model);
    }

    /**
     * Get active and public themes with their relationships.
     */
    public function getActiveThemes(int $limit = 12)
    {
        return $this->model
            ->active()
            ->where('is_public', true)
            ->with(['images', 'packages'])
            ->orderBy('is_recommended', 'desc')
            ->orderBy('name')
            ->limit($limit)
            ->get();
    }

    /**
     * Get all themes with their relationships.
     */
    public function getAllThemes()
    {
        return $this->model
            ->with(['images', 'packages'])
            ->orderBy('name')
            ->get();
    }

    /**
     * Get themes by user ID.
     */
    public function getThemesByUser(int $userId)
    {
        return $this->model
            ->byUser($userId)
            ->with(['images', 'packages'])
            ->orderBy('name')
            ->get();
    }

    /**
     * Find theme by slug.
     */
    public function findBySlug(string $slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->with(['images', 'packages'])
            ->first();
    }
}
