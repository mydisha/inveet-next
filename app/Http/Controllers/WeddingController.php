<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wedding\StoreWeddingRequest;
use App\Http\Requests\Wedding\UpdateWeddingRequest;
use App\Services\WeddingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WeddingController extends Controller
{
    protected $weddingService;

    public function __construct(WeddingService $weddingService)
    {
        $this->weddingService = $weddingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['published_only', 'active_only']);
        $weddings = $this->weddingService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $weddings,
            'message' => 'Weddings retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWeddingRequest $request): JsonResponse
    {
        $wedding = $this->weddingService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $wedding,
            'message' => 'Wedding created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $wedding = $this->weddingService->findById($id);

        if (!$wedding) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $wedding,
            'message' => 'Wedding retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWeddingRequest $request, int $id): JsonResponse
    {
        $wedding = $this->weddingService->update($id, $request->validated());

        if (!$wedding) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $wedding,
            'message' => 'Wedding updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->weddingService->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding deleted successfully'
        ]);
    }

    /**
     * Get weddings by user ID
     */
    public function findByUserId(int $userId): JsonResponse
    {
        $weddings = $this->weddingService->findByUserId($userId);

        return response()->json([
            'success' => true,
            'data' => $weddings,
            'message' => 'User weddings retrieved successfully'
        ]);
    }

    /**
     * Get wedding by slug
     */
    public function findBySlug(string $slug): JsonResponse
    {
        $wedding = $this->weddingService->findBySlug($slug);

        if (!$wedding) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $wedding,
            'message' => 'Wedding retrieved successfully'
        ]);
    }

    /**
     * Get draft weddings for a user
     */
    public function getDraftWeddings(int $userId): JsonResponse
    {
        $weddings = $this->weddingService->findDraftWeddings($userId);

        return response()->json([
            'success' => true,
            'data' => $weddings,
            'message' => 'Draft weddings retrieved successfully'
        ]);
    }

    /**
     * Publish a wedding
     */
    public function publish(int $id): JsonResponse
    {
        $published = $this->weddingService->publishWedding($id);

        if (!$published) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding published successfully'
        ]);
    }

    /**
     * Unpublish a wedding
     */
    public function unpublish(int $id): JsonResponse
    {
        $unpublished = $this->weddingService->unpublishWedding($id);

        if (!$unpublished) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding unpublished successfully'
        ]);
    }

    /**
     * Increment view count
     */
    public function incrementViewCount(int $id): JsonResponse
    {
        $wedding = $this->weddingService->incrementViewCount($id);

        if (!$wedding) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $wedding,
            'message' => 'View count incremented successfully'
        ]);
    }

    /**
     * Get weddings by theme ID
     */
    public function findByThemeId(int $themeId): JsonResponse
    {
        $weddings = $this->weddingService->findByThemeId($themeId);

        return response()->json([
            'success' => true,
            'data' => $weddings,
            'message' => 'Theme weddings retrieved successfully'
        ]);
    }

    /**
     * Activate a wedding
     */
    public function activate(int $id): JsonResponse
    {
        $activated = $this->weddingService->activateWedding($id);

        if (!$activated) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding activated successfully'
        ]);
    }

    /**
     * Deactivate a wedding
     */
    public function deactivate(int $id): JsonResponse
    {
        $deactivated = $this->weddingService->deactivateWedding($id);

        if (!$deactivated) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding deactivated successfully'
        ]);
    }

    /**
     * Mark wedding as draft
     */
    public function markAsDraft(int $id): JsonResponse
    {
        $marked = $this->weddingService->markAsDraft($id);

        if (!$marked) {
            return response()->json([
                'success' => false,
                'message' => 'Wedding not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Wedding marked as draft successfully'
        ]);
    }
}
