<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpecialInvitation\StoreSpecialInvitationRequest;
use App\Services\SpecialInvitationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SpecialInvitationController extends Controller
{
    protected $specialInvitationService;

    public function __construct(SpecialInvitationService $specialInvitationService)
    {
        $this->specialInvitationService = $specialInvitationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['active_only', 'locked_only']);
        $invitations = $this->specialInvitationService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'message' => 'Special invitations retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecialInvitationRequest $request): JsonResponse
    {
        $invitation = $this->specialInvitationService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $invitation,
            'message' => 'Special invitation created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $invitation = $this->specialInvitationService->findById($id);

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $invitation,
            'message' => 'Special invitation retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'is_active' => 'sometimes|boolean',
            'is_locked' => 'sometimes|boolean',
            'password' => 'sometimes|nullable|string|min:6|max:255',
        ]);

        $invitation = $this->specialInvitationService->update($id, $request->validated());

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $invitation,
            'message' => 'Special invitation updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->specialInvitationService->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Special invitation deleted successfully'
        ]);
    }

    /**
     * Get invitations by wedding ID
     */
    public function findByWeddingId(int $weddingId): JsonResponse
    {
        $invitations = $this->specialInvitationService->findByWeddingId($weddingId);

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'message' => 'Wedding invitations retrieved successfully'
        ]);
    }

    /**
     * Get invitation by slug
     */
    public function findBySlug(string $slug): JsonResponse
    {
        $invitation = $this->specialInvitationService->findBySlug($slug);

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $invitation,
            'message' => 'Special invitation retrieved successfully'
        ]);
    }

    /**
     * Get active invitations
     */
    public function getActiveInvitations(): JsonResponse
    {
        $invitations = $this->specialInvitationService->findActiveInvitations();

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'message' => 'Active invitations retrieved successfully'
        ]);
    }

    /**
     * Get locked invitations
     */
    public function getLockedInvitations(): JsonResponse
    {
        $invitations = $this->specialInvitationService->findLockedInvitations();

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'message' => 'Locked invitations retrieved successfully'
        ]);
    }

    /**
     * Lock an invitation
     */
    public function lock(int $id): JsonResponse
    {
        $locked = $this->specialInvitationService->lockInvitation($id);

        if (!$locked) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Special invitation locked successfully'
        ]);
    }

    /**
     * Unlock an invitation
     */
    public function unlock(int $id): JsonResponse
    {
        $unlocked = $this->specialInvitationService->unlockInvitation($id);

        if (!$unlocked) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Special invitation unlocked successfully'
        ]);
    }

    /**
     * Update invitation password
     */
    public function updatePassword(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'password' => 'required|string|min:6|max:255'
        ]);

        $updated = $this->specialInvitationService->updatePassword($id, $request->password);

        if (!$updated) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Invitation password updated successfully'
        ]);
    }

    /**
     * Remove invitation password
     */
    public function removePassword(int $id): JsonResponse
    {
        $removed = $this->specialInvitationService->removePassword($id);

        if (!$removed) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Invitation password removed successfully'
        ]);
    }

    /**
     * Get active invitations by wedding ID
     */
    public function getByWeddingIdAndActive(int $weddingId): JsonResponse
    {
        $invitations = $this->specialInvitationService->findByWeddingIdAndActive($weddingId);

        return response()->json([
            'success' => true,
            'data' => $invitations,
            'message' => 'Active wedding invitations retrieved successfully'
        ]);
    }

    /**
     * Validate invitation password
     */
    public function validatePassword(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'password' => 'required|string'
        ]);

        $isValid = $this->specialInvitationService->validatePassword($id, $request->password);

        if (!$isValid) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid password'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'success' => true,
            'message' => 'Password validated successfully'
        ]);
    }

    /**
     * Create bulk invitations
     */
    public function createBulk(Request $request): JsonResponse
    {
        $request->validate([
            'wedding_id' => 'required|integer|exists:weddings,id',
            'invitations' => 'required|array|min:1',
            'invitations.*.name' => 'required|string|max:255',
            'invitations.*.description' => 'sometimes|nullable|string',
            'invitations.*.password' => 'sometimes|nullable|string|min:6|max:255',
        ]);

        $result = $this->specialInvitationService->createBulkInvitations(
            $request->wedding_id,
            $request->invitations
        );

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'Bulk invitations created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Toggle lock status
     */
    public function toggleLock(int $id): JsonResponse
    {
        $toggled = $this->specialInvitationService->toggleLockStatus($id);

        if (!$toggled) {
            return response()->json([
                'success' => false,
                'message' => 'Special invitation not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lock status toggled successfully'
        ]);
    }
}
