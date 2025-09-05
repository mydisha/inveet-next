<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;

class UserService implements BaseServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll(array $filters = [])
    {
        $query = $this->userRepository->getModel()->with(['roles'])
            ->withCount(['weddings', 'orders']);

        // Search functionality
        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if (isset($filters['role'])) {
            $query->role($filters['role']);
        }

        // Filter by status
        if (isset($filters['status'])) {
            $status = $filters['status'];
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Sort
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->get();
    }

    public function findById(int $id)
    {
        return $this->userRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->userRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->userRepository->getModel()->with(['roles'])
            ->withCount(['weddings', 'orders']);

        // Apply filters
        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        if (isset($filters['role'])) {
            $query->role($filters['role']);
        }

        if (isset($filters['status'])) {
            $status = $filters['status'];
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->paginate($perPage);
    }

    /**
     * Get user statistics
     */
    public function getStatistics()
    {
        $now = now();
        return [
            'total_users' => $this->userRepository->getModel()->count(),
            'active_users' => $this->userRepository->getModel()->where('is_active', true)->count(),
            'inactive_users' => $this->userRepository->getModel()->where('is_active', false)->count(),
            'users_with_weddings' => $this->userRepository->getModel()->has('weddings')->count(),
            'users_with_orders' => $this->userRepository->getModel()->has('orders')->count(),
            'new_users_this_month' => $this->userRepository->getModel()->whereMonth('created_at', $now->month)->count(),
            'new_users_this_week' => $this->userRepository->getModel()->whereBetween('created_at', [$now->startOfWeek(), $now->endOfWeek()])->count(),
        ];
    }

    /**
     * Activate user
     */
    public function activate(int $userId)
    {
        $user = $this->findById($userId);
        if ($user) {
            $user->activate();
            return $user;
        }
        return false;
    }

    /**
     * Deactivate user
     */
    public function deactivate(int $userId)
    {
        $user = $this->findById($userId);
        if ($user) {
            $user->deactivate();
            return $user;
        }
        return false;
    }

    /**
     * Search users
     */
    public function search(string $query, int $limit = 20)
    {
        return $this->userRepository->getModel()
            ->select('id', 'name', 'email')
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%");
            })
            ->orderBy('name', 'asc')
            ->limit($limit)
            ->get();
    }
}
