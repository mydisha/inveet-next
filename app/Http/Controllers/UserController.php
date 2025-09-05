<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('view-users');

        $filters = $request->only(['active_only']);
        $users = $this->userService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $users,
            'message' => 'Users retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $this->authorize('create-users');

        $user = $this->userService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $this->authorize('view-users');

        $user = $this->userService->findById($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        $this->authorize('edit-users');

        $user = $this->userService->update($id, $request->validated());

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $this->authorize('delete-users');

        $deleted = $this->userService->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get user by email
     */
    public function findByEmail(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = $this->userService->findByEmail($request->email);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User retrieved successfully'
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(UpdateUserRequest $request): JsonResponse
    {
        // Get the authenticated user's ID - SECURITY FIX: Use authenticated user instead of request input
        $userId = $request->user()->id;

        // SECURITY FIX: Verify user can only update their own profile
        if ($request->has('user_id') && $request->input('user_id') != $userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: You can only update your own profile'
            ], 403);
        }

        $user = $this->userService->updateProfile($userId, $request->validated());

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Profile updated successfully'
        ]);
    }

    /**
     * Deactivate user
     */
    public function deactivate(int $id): JsonResponse
    {
        $this->authorize('deactivate-users');

        $deactivated = $this->userService->deactivateUser($id);

        if (!$deactivated) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'User deactivated successfully'
        ]);
    }

    /**
     * Activate user
     */
    public function activate(int $id): JsonResponse
    {
        $this->authorize('activate-users');

        $activated = $this->userService->activateUser($id);

        if (!$activated) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'User activated successfully'
        ]);
    }

    /**
     * Assign role to user
     */
    public function assignRole(Request $request, int $id): JsonResponse
    {
        $this->authorize('assign-roles');

        $request->validate([
            'role' => 'required|string|exists:roles,name'
        ]);

        $assigned = $this->userService->assignRole($id, $request->role);

        if (!$assigned) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to assign role'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully'
        ]);
    }

    /**
     * Remove role from user
     */
    public function removeRole(Request $request, int $id): JsonResponse
    {
        $this->authorize('assign-roles');

        $request->validate([
            'role' => 'required|string|exists:roles,name'
        ]);

        $removed = $this->userService->removeRole($id, $request->role);

        if (!$removed) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove role'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role removed successfully'
        ]);
    }

    /**
     * Sync user roles
     */
    public function syncRoles(Request $request, int $id): JsonResponse
    {
        $this->authorize('assign-roles');

        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name'
        ]);

        $synced = $this->userService->syncRoles($id, $request->roles);

        if (!$synced) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to sync roles'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Roles synced successfully'
        ]);
    }

    /**
     * Get title settings for user
     */
    public function getTitleSettings(Request $request): JsonResponse
    {
        $user = $request->user();

        // Mock title settings data - in real implementation, this would come from database
        $titleSettings = [
            'couple_title' => 'Mempelai',
            'mother_title' => 'Ibu',
            'father_title' => 'Bapak',
            'separator_title' => 'dari',
            'cover_title' => 'Pernikahan',
            'location_title' => 'Lokasi',
            'venue_title' => 'Tempat',
            'time_title' => 'Waktu',
            'rsvp_title' => 'Konfirmasi Kehadiran',
            'gift_title' => 'Hadiah',
            'message_title' => 'Pesan',
        ];

        return response()->json([
            'success' => true,
            'data' => $titleSettings,
            'message' => 'Title settings retrieved successfully'
        ]);
    }

    /**
     * Update title settings for user
     */
    public function updateTitleSettings(Request $request, $weddingId = null): JsonResponse
    {
        $request->validate([
            'couple_title' => 'string|max:255',
            'mother_title' => 'string|max:255',
            'father_title' => 'string|max:255',
            'separator_title' => 'string|max:255',
            'cover_title' => 'string|max:255',
            'location_title' => 'string|max:255',
            'venue_title' => 'string|max:255',
            'time_title' => 'string|max:255',
            'rsvp_title' => 'string|max:255',
            'gift_title' => 'string|max:255',
            'message_title' => 'string|max:255',
        ]);

        $user = $request->user();

        // In real implementation, this would save to database
        // For now, we'll just return success

        return response()->json([
            'success' => true,
            'message' => 'Title settings updated successfully'
        ]);
    }
}
