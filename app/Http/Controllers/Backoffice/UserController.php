<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['roles'])
            ->withCount(['weddings', 'orders']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role')) {
            $query->role($request->get('role'));
        }

        // Filter by status
        if ($request->has('status')) {
            $status = $request->get('status');
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $users = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): JsonResponse
    {
        $user->load(['roles', 'weddings.theme', 'orders.package', 'feedback']);

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone_number' => 'sometimes|nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
            'roles' => 'sometimes|array',
            'roles.*' => 'string|exists:roles,name'
        ]);

        $user->update($request->only(['name', 'email', 'phone_number', 'is_active']));

        // Update roles if provided
        if ($request->has('roles')) {
            $user->syncRoles($request->get('roles'));
        }

        $user->load(['roles', 'weddings', 'orders']);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Auto-login as the specified user.
     */
    public function autoLogin(User $user): JsonResponse
    {
        // Create a temporary token for the admin to login as the user
        $token = $user->createToken('admin-auto-login', ['*'], now()->addMinutes(30))->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Auto-login token generated successfully',
            'data' => [
                'user' => $user->load(['roles']),
                'token' => $token,
                'login_url' => route('login') . '?token=' . $token
            ]
        ]);
    }

    /**
     * Activate the specified user.
     */
    public function activate(User $user): JsonResponse
    {
        $user->activate();

        return response()->json([
            'success' => true,
            'message' => 'User activated successfully',
            'data' => $user
        ]);
    }

    /**
     * Deactivate the specified user.
     */
    public function deactivate(User $user): JsonResponse
    {
        $user->deactivate();

        return response()->json([
            'success' => true,
            'message' => 'User deactivated successfully',
            'data' => $user
        ]);
    }

    /**
     * Get user statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'inactive_users' => User::where('is_active', false)->count(),
            'users_with_weddings' => User::has('weddings')->count(),
            'users_with_orders' => User::has('orders')->count(),
            'new_users_this_month' => User::whereMonth('created_at', now()->month)->count(),
            'new_users_this_week' => User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
