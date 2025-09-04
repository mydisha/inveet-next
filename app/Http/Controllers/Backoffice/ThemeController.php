<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ThemeController extends Controller
{
    /**
     * Display a listing of themes.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Theme::with(['user', 'packages', 'images']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
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

        // Filter by visibility
        if ($request->has('visibility')) {
            $visibility = $request->get('visibility');
            if ($visibility === 'public') {
                $query->where('is_public', true);
            } elseif ($visibility === 'private') {
                $query->where('is_public', false);
            }
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $themes = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    /**
     * Store a newly created theme.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
            'preview_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'packages' => 'array',
            'packages.*' => 'exists:packages,id'
        ]);

        $themeData = $request->only(['name', 'description', 'is_active', 'is_public']);
        $themeData['slug'] = Str::slug($request->name);
        $themeData['user_id'] = auth()->id();

        // Handle preview image upload
        if ($request->hasFile('preview_image')) {
            $file = $request->file('preview_image');
            $filename = 'themes/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public', $filename);
            $themeData['preview_image'] = 'storage/' . $filename;
        }

        $theme = Theme::create($themeData);

        // Attach packages if provided
        if ($request->has('packages')) {
            $theme->packages()->attach($request->get('packages'));
        }

        $theme->load(['user', 'packages', 'images']);

        return response()->json([
            'success' => true,
            'message' => 'Theme created successfully',
            'data' => $theme
        ], 201);
    }

    /**
     * Display the specified theme.
     */
    public function show(Theme $theme): JsonResponse
    {
        $theme->load(['user', 'packages', 'images', 'meta']);

        return response()->json([
            'success' => true,
            'data' => $theme
        ]);
    }

    /**
     * Update the specified theme.
     */
    public function update(Request $request, Theme $theme): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
            'preview_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'packages' => 'array',
            'packages.*' => 'exists:packages,id'
        ]);

        $themeData = $request->only(['name', 'description', 'is_active', 'is_public']);

        // Update slug if name is changed
        if ($request->has('name')) {
            $themeData['slug'] = Str::slug($request->name);
        }

        // Handle preview image upload
        if ($request->hasFile('preview_image')) {
            // Delete old preview image
            if ($theme->preview_image && Storage::exists(str_replace('storage/', 'public/', $theme->preview_image))) {
                Storage::delete(str_replace('storage/', 'public/', $theme->preview_image));
            }

            $file = $request->file('preview_image');
            $filename = 'themes/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public', $filename);
            $themeData['preview_image'] = 'storage/' . $filename;
        }

        $theme->update($themeData);

        // Update packages if provided
        if ($request->has('packages')) {
            $theme->packages()->sync($request->get('packages'));
        }

        $theme->load(['user', 'packages', 'images']);

        return response()->json([
            'success' => true,
            'message' => 'Theme updated successfully',
            'data' => $theme
        ]);
    }

    /**
     * Toggle active status.
     */
    public function toggleActive(Theme $theme): JsonResponse
    {
        $theme->update(['is_active' => !$theme->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Theme status updated successfully',
            'data' => $theme->load(['user', 'packages'])
        ]);
    }

    /**
     * Toggle public status.
     */
    public function togglePublic(Theme $theme): JsonResponse
    {
        $theme->update(['is_public' => !$theme->is_public]);

        return response()->json([
            'success' => true,
            'message' => 'Theme visibility updated successfully',
            'data' => $theme->load(['user', 'packages'])
        ]);
    }

    /**
     * Delete the specified theme.
     */
    public function destroy(Theme $theme): JsonResponse
    {
        // Delete preview image
        if ($theme->preview_image && Storage::exists(str_replace('storage/', 'public/', $theme->preview_image))) {
            Storage::delete(str_replace('storage/', 'public/', $theme->preview_image));
        }

        $theme->delete();

        return response()->json([
            'success' => true,
            'message' => 'Theme deleted successfully'
        ]);
    }

    /**
     * Get theme statistics.
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_themes' => Theme::count(),
            'active_themes' => Theme::where('is_active', true)->count(),
            'public_themes' => Theme::where('is_public', true)->count(),
            'themes_this_month' => Theme::whereMonth('created_at', now()->month)->count(),
            'most_used_themes' => Theme::withCount('weddings')
                ->orderBy('weddings_count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($theme) {
                    return [
                        'id' => $theme->id,
                        'name' => $theme->name,
                        'weddings_count' => $theme->weddings_count
                    ];
                }),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
