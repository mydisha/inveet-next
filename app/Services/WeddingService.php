<?php

namespace App\Services;

use App\Repositories\WeddingRepository;
use Illuminate\Support\Str;

class WeddingService implements BaseServiceInterface
{
    protected $weddingRepository;

    public function __construct(WeddingRepository $weddingRepository)
    {
        $this->weddingRepository = $weddingRepository;
    }

    public function getAll(array $filters = [])
    {
        if (isset($filters['published_only']) && $filters['published_only']) {
            return $this->weddingRepository->findPublishedWeddings();
        }

        if (isset($filters['active_only']) && $filters['active_only']) {
            return $this->weddingRepository->findActiveWeddings();
        }

        return $this->weddingRepository->all();
    }

    public function findById(int $id)
    {
        return $this->weddingRepository->find($id);
    }

    public function create(array $data)
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['user_id'])) {
            $data['slug'] = $this->generateUniqueSlug($data['user_id']);
        }

        // Set default values
        $data['is_active'] = $data['is_active'] ?? true;
        $data['is_draft'] = $data['is_draft'] ?? true;
        $data['is_published'] = $data['is_published'] ?? false;
        $data['view_count'] = $data['view_count'] ?? 0;

        return $this->weddingRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        // Generate new slug if name changed
        if (isset($data['user_id'])) {
            $data['slug'] = $this->generateUniqueSlug($data['user_id'], $id);
        }

        return $this->weddingRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->weddingRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->weddingRepository->paginate($perPage);
    }

    public function findByUserId(int $userId)
    {
        return $this->weddingRepository->findByUserId($userId);
    }

    public function findBySlug(string $slug)
    {
        return $this->weddingRepository->findBySlug($slug);
    }

    public function findDraftWeddings(int $userId)
    {
        return $this->weddingRepository->findDraftWeddings($userId);
    }

    public function publishWedding(int $weddingId)
    {
        return $this->weddingRepository->publishWedding($weddingId);
    }

    public function unpublishWedding(int $weddingId)
    {
        return $this->weddingRepository->unpublishWedding($weddingId);
    }

    public function incrementViewCount(int $weddingId)
    {
        return $this->weddingRepository->incrementViewCount($weddingId);
    }

    public function findByThemeId(int $themeId)
    {
        return $this->weddingRepository->findByThemeId($themeId);
    }

    public function activateWedding(int $weddingId)
    {
        return $this->weddingRepository->update($weddingId, ['is_active' => true]);
    }

    public function deactivateWedding(int $weddingId)
    {
        return $this->weddingRepository->update($weddingId, ['is_active' => false]);
    }

    public function markAsDraft(int $weddingId)
    {
        return $this->weddingRepository->update($weddingId, [
            'is_draft' => true,
            'is_published' => false
        ]);
    }

    private function generateUniqueSlug(int $userId, int $excludeId = null): string
    {
        $baseSlug = 'wedding-' . $userId . '-' . time();
        $slug = Str::slug($baseSlug);
        
        $counter = 1;
        $originalSlug = $slug;
        
        while ($this->weddingRepository->findBySlug($slug)) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return $slug;
    }
}
