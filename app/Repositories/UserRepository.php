<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function findActiveUsers()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findBySocialiteId(string $socialiteId)
    {
        return $this->model->where('socialite_id', $socialiteId)->first();
    }

    public function updateProfile(int $userId, array $data)
    {
        return $this->update($userId, $data);
    }

    public function deactivateUser(int $userId)
    {
        return $this->update($userId, ['is_active' => false]);
    }

    public function activateUser(int $userId)
    {
        return $this->update($userId, ['is_active' => true]);
    }
}
