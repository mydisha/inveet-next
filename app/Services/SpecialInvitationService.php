<?php

namespace App\Services;

use App\Repositories\SpecialInvitationRepository;
use Illuminate\Support\Str;

class SpecialInvitationService implements BaseServiceInterface
{
    protected $specialInvitationRepository;

    public function __construct(SpecialInvitationRepository $specialInvitationRepository)
    {
        $this->specialInvitationRepository = $specialInvitationRepository;
    }

    public function getAll(array $filters = [])
    {
        if (isset($filters['active_only']) && $filters['active_only']) {
            return $this->specialInvitationRepository->findActiveInvitations();
        }

        if (isset($filters['locked_only']) && $filters['locked_only']) {
            return $this->specialInvitationRepository->findLockedInvitations();
        }

        return $this->specialInvitationRepository->all();
    }

    public function findById(int $id)
    {
        return $this->specialInvitationRepository->find($id);
    }

    public function create(array $data)
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['name'])) {
            $data['slug'] = $this->generateUniqueSlug($data['name']);
        }

        // Set default values
        $data['is_active'] = $data['is_active'] ?? true;
        $data['is_locked'] = $data['is_locked'] ?? false;

        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        return $this->specialInvitationRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        // Generate new slug if name changed
        if (isset($data['name'])) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $id);
        }

        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        return $this->specialInvitationRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->specialInvitationRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->specialInvitationRepository->paginate($perPage);
    }

    public function findByWeddingId(int $weddingId)
    {
        return $this->specialInvitationRepository->findByWeddingId($weddingId);
    }

    public function findBySlug(string $slug)
    {
        return $this->specialInvitationRepository->findBySlug($slug);
    }

    public function findActiveInvitations()
    {
        return $this->specialInvitationRepository->findActiveInvitations();
    }

    public function findLockedInvitations()
    {
        return $this->specialInvitationRepository->findLockedInvitations();
    }

    public function lockInvitation(int $invitationId)
    {
        return $this->specialInvitationRepository->lockInvitation($invitationId);
    }

    public function unlockInvitation(int $invitationId)
    {
        return $this->specialInvitationRepository->unlockInvitation($invitationId);
    }

    public function updatePassword(int $invitationId, string $password)
    {
        return $this->specialInvitationRepository->updatePassword($invitationId, $password);
    }

    public function removePassword(int $invitationId)
    {
        return $this->specialInvitationRepository->removePassword($invitationId);
    }

    public function findByWeddingIdAndActive(int $weddingId)
    {
        return $this->specialInvitationRepository->findByWeddingIdAndActive($weddingId);
    }

    public function validatePassword(int $invitationId, string $password): bool
    {
        $invitation = $this->findById($invitationId);
        if (!$invitation || !$invitation->password) {
            return false;
        }

        return password_verify($password, $invitation->password);
    }

    public function createBulkInvitations(int $weddingId, array $invitationData): array
    {
        $created = [];
        $errors = [];

        foreach ($invitationData as $data) {
            try {
                $data['wedding_id'] = $weddingId;
                $invitation = $this->create($data);
                $created[] = $invitation;
            } catch (\Exception $e) {
                $errors[] = [
                    'data' => $data,
                    'error' => $e->getMessage()
                ];
            }
        }

        return [
            'created' => $created,
            'errors' => $errors,
            'total_created' => count($created),
            'total_errors' => count($errors)
        ];
    }

    public function toggleLockStatus(int $invitationId): bool
    {
        $invitation = $this->findById($invitationId);
        if (!$invitation) {
            return false;
        }

        if ($invitation->is_locked) {
            return $this->unlockInvitation($invitationId);
        } else {
            return $this->lockInvitation($invitationId);
        }
    }

    private function generateUniqueSlug(string $name, int $excludeId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        
        $counter = 1;
        
        while ($this->specialInvitationRepository->findBySlug($slug)) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }
        
        return $slug;
    }
}
