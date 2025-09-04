<?php

namespace App\Http\Controllers;

use App\Services\ThemeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    protected $themeService;

    public function __construct(ThemeService $themeService)
    {
        $this->themeService = $themeService;
    }

    /**
     * Get all themes.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->only(['active_only', 'user_id']);

            // For public access, only show active themes by default
            if (!isset($filters['active_only'])) {
                $filters['active_only'] = true;
            }

            $themes = $this->themeService->getAll($filters);

            return response()->json([
                'success' => true,
                'data' => $themes,
                'message' => 'Themes retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve themes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active themes for public display.
     */
    public function active(Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 12);
            $themes = $this->themeService->getActiveThemes($limit);

            // Append preview_image_url to each theme
            $themes->each(function ($theme) {
                $theme->preview_image_url = $theme->preview_image_url;
            });

            return response()->json([
                'success' => true,
                'data' => $themes,
                'message' => 'Active themes retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve active themes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get theme by ID.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $theme = $this->themeService->findById($id);

            if (!$theme) {
                return response()->json([
                    'success' => false,
                    'message' => 'Theme not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $theme,
                'message' => 'Theme retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve theme',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get theme by slug.
     */
    public function showBySlug(string $slug): JsonResponse
    {
        try {
            $theme = $this->themeService->findBySlug($slug);

            if (!$theme) {
                return response()->json([
                    'success' => false,
                    'message' => 'Theme not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $theme,
                'message' => 'Theme retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve theme',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
