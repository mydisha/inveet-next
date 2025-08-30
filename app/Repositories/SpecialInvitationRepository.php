<?php

namespace App\Repositories;

use App\Models\SpecialInvitation;

class SpecialInvitationRepository extends BaseRepository
{
    public function __construct(SpecialInvitation $model)
    {
        parent::__construct($model);
    }

    public function findByWeddingId(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)->get();
    }

    public function findBySlug(string $slug)
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function findActiveInvitations()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findLockedInvitations()
    {
        return $this->model->where('is_locked', true)->get();
    }

    public function findByPassword(string $password)
    {
        return $this->model->where('password', $password)->first();
    }

    public function lockInvitation(int $invitationId)
    {
        return $this->update($invitationId, ['is_locked' => true]);
    }

    public function unlockInvitation(int $invitationId)
    {
        return $this->update($invitationId, ['is_locked' => false]);
    }

    public function updatePassword(int $invitationId, string $password)
    {
        return $this->update($invitationId, ['password' => $password]);
    }

    public function removePassword(int $invitationId)
    {
        return $this->update($invitationId, ['password' => null]);
    }

    public function findByWeddingIdAndActive(int $weddingId)
    {
        return $this->model->where('wedding_id', $weddingId)
                          ->where('is_active', true)
                          ->get();
    }
}
