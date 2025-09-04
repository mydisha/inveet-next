<?php

namespace App\Services;

use App\Repositories\ThemeRepository;
use Illuminate\Database\Eloquent\Collection;

class ThemeService implements BaseServiceInterface
{
    protected $themeRepository;

    public function __construct(ThemeRepository $themeRepository)
    {
        $this->themeRepository = $themeRepository;
    }

    /**
     * Get all themes with optional filters.
     */
    public function getAll(array $filters = []): Collection
    {
        if (isset($filters['active_only']) && $filters['active_only']) {
            return $this->themeRepository->getActiveThemes();
        }

        if (isset($filters['user_id'])) {
            return $this->themeRepository->getThemesByUser($filters['user_id']);
        }

        return $this->themeRepository->getAllThemes();
    }

    /**
     * Get active themes for public display.
     */
    public function getActiveThemes(int $limit = 12): Collection
    {
        return $this->themeRepository->getActiveThemes($limit);
    }

    /**
     * Find theme by ID.
     */
    public function findById(int $id)
    {
        return $this->themeRepository->find($id);
    }

    /**
     * Find theme by slug.
     */
    public function findBySlug(string $slug)
    {
        return $this->themeRepository->findBySlug($slug);
    }

    /**
     * Create a new theme.
     */
    public function create(array $data)
    {
        return $this->themeRepository->create($data);
    }

    /**
     * Update theme by ID.
     */
    public function update(int $id, array $data)
    {
        return $this->themeRepository->update($id, $data);
    }

    /**
     * Delete theme by ID.
     */
    public function delete(int $id)
    {
        return $this->themeRepository->delete($id);
    }

    /**
     * Paginate themes.
     */
    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->themeRepository->getModel()->with(['images', 'packages']);

        if (isset($filters['active_only']) && $filters['active_only']) {
            $query->active();
        }

        if (isset($filters['user_id'])) {
            $query->byUser($filters['user_id']);
        }

        return $query->orderBy('name')->paginate($perPage);
    }
}
