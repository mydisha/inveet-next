<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserService implements BaseServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll(array $filters = [])
    {
        if (isset($filters['active_only']) && $filters['active_only']) {
            return $this->userRepository->findActiveUsers();
        }
        return $this->userRepository->all();
    }

    public function findById(int $id)
    {
        return $this->userRepository->find($id);
    }

    public function create(array $data)
    {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        // Generate slug if name is provided
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $user = $this->userRepository->create($data);

        // Assign default role if specified
        if (isset($data['role'])) {
            $role = Role::findByName($data['role']);
            if ($role) {
                $user->assignRole($role);
            }
        }

        return $user;
    }

    public function update(int $id, array $data)
    {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        // Generate slug if name is provided
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $user = $this->userRepository->update($id, $data);

        // Update roles if specified
        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        return $user;
    }

    public function delete(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->userRepository->paginate($perPage);
    }

    public function findByEmail(string $email)
    {
        return $this->userRepository->findByEmail($email);
    }

    public function findBySocialiteId(string $socialiteId)
    {
        return $this->userRepository->findBySocialiteId($socialiteId);
    }

    public function updateProfile(int $userId, array $data)
    {
        return $this->userRepository->updateProfile($userId, $data);
    }

    public function deactivateUser(int $userId)
    {
        return $this->userRepository->deactivateUser($userId);
    }

    public function activateUser(int $userId)
    {
        return $this->userRepository->activateUser($userId);
    }

    public function assignRole(int $userId, string $roleName)
    {
        $user = $this->findById($userId);
        if ($user) {
            $role = Role::findByName($roleName);
            if ($role) {
                $user->assignRole($role);
                return true;
            }
        }
        return false;
    }

    public function removeRole(int $userId, string $roleName)
    {
        $user = $this->findById($userId);
        if ($user) {
            $role = Role::findByName($roleName);
            if ($role) {
                $user->removeRole($role);
                return true;
            }
        }
        return false;
    }

    public function syncRoles(int $userId, array $roleNames)
    {
        $user = $this->findById($userId);
        if ($user) {
            $roles = Role::whereIn('name', $roleNames)->get();
            $user->syncRoles($roles);
            return true;
        }
        return false;
    }
}
