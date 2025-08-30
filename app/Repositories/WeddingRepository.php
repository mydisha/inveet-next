<?php

namespace App\Repositories;

use App\Models\Wedding;

class WeddingRepository extends BaseRepository
{
    public function __construct(Wedding $model)
    {
        parent::__construct($model);
    }

    public function findByUserId(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function findBySlug(string $slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function findActiveWeddings()
    {
        return $this->model->where('is_active', true)
                          ->where('is_published', true)
                          ->get();
    }

    public function findPublishedWeddings()
    {
        return $this->model->where('is_published', true)->get();
    }

    public function findDraftWeddings(int $userId)
    {
        return $this->model->where('user_id', $userId)
                          ->where('is_draft', true)
                          ->get();
    }

    public function incrementViewCount(int $weddingId)
    {
        $wedding = $this->find($weddingId);
        if ($wedding) {
            $wedding->increment('view_count');
            return $wedding;
        }
        return false;
    }

    public function publishWedding(int $weddingId)
    {
        return $this->update($weddingId, [
            'is_published' => true,
            'is_draft' => false
        ]);
    }

    public function unpublishWedding(int $weddingId)
    {
        return $this->update($weddingId, [
            'is_published' => false
        ]);
    }

    public function findByThemeId(int $themeId)
    {
        return $this->model->where('theme_id', $themeId)->get();
    }
}
