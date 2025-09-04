<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\WebsiteConfiguration;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ConfigurationController extends Controller
{
    /**
     * Display a listing of configurations.
     */
    public function index(Request $request): JsonResponse
    {
        $query = WebsiteConfiguration::query();

        // Filter by group
        if ($request->has('group')) {
            $query->where('group', $request->get('group'));
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->get('type'));
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('key', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort_by', 'group');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 50);
        $configurations = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $configurations
        ]);
    }

    /**
     * Store a newly created configuration.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'key' => 'required|string|max:255|unique:website_configurations,key',
            'value' => 'required',
            'type' => 'required|string|in:string,integer,boolean,array,json,float',
            'group' => 'required|string|max:100',
            'description' => 'nullable|string',
            'is_public' => 'boolean'
        ]);

        $configuration = WebsiteConfiguration::create($request->all());

        // Clear configuration cache
        Cache::forget('website_configurations');

        return response()->json([
            'success' => true,
            'message' => 'Configuration created successfully',
            'data' => $configuration
        ], 201);
    }

    /**
     * Display the specified configuration.
     */
    public function show(WebsiteConfiguration $configuration): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $configuration
        ]);
    }

    /**
     * Update the specified configuration.
     */
    public function update(Request $request, WebsiteConfiguration $configuration): JsonResponse
    {
        $request->validate([
            'key' => 'sometimes|string|max:255|unique:website_configurations,key,' . $configuration->id,
            'value' => 'sometimes|required',
            'type' => 'sometimes|string|in:string,integer,boolean,array,json,float',
            'group' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'is_public' => 'boolean'
        ]);

        $configuration->update($request->all());

        // Clear configuration cache
        Cache::forget('website_configurations');

        return response()->json([
            'success' => true,
            'message' => 'Configuration updated successfully',
            'data' => $configuration
        ]);
    }

    /**
     * Update multiple configurations at once.
     */
    public function updateMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'configurations' => 'required|array',
            'configurations.*.key' => 'required|string',
            'configurations.*.value' => 'required',
        ]);

        $updated = [];

        foreach ($request->get('configurations') as $config) {
            $configuration = WebsiteConfiguration::where('key', $config['key'])->first();

            if ($configuration) {
                $configuration->update(['value' => $config['value']]);
                $updated[] = $configuration;
            }
        }

        // Clear configuration cache
        Cache::forget('website_configurations');

        return response()->json([
            'success' => true,
            'message' => 'Configurations updated successfully',
            'data' => $updated
        ]);
    }

    /**
     * Delete the specified configuration.
     */
    public function destroy(WebsiteConfiguration $configuration): JsonResponse
    {
        $configuration->delete();

        // Clear configuration cache
        Cache::forget('website_configurations');

        return response()->json([
            'success' => true,
            'message' => 'Configuration deleted successfully'
        ]);
    }

    /**
     * Get configurations by group.
     */
    public function getByGroup(string $group): JsonResponse
    {
        $configurations = WebsiteConfiguration::where('group', $group)->get();

        return response()->json([
            'success' => true,
            'data' => $configurations
        ]);
    }

    /**
     * Get all configuration groups.
     */
    public function getGroups(): JsonResponse
    {
        $groups = WebsiteConfiguration::select('group')
            ->distinct()
            ->orderBy('group')
            ->pluck('group');

        return response()->json([
            'success' => true,
            'data' => $groups
        ]);
    }

    /**
     * Get website settings for frontend.
     */
    public function getWebsiteSettings(): JsonResponse
    {
        $settings = [
            'general' => WebsiteConfiguration::getByGroup('general')->pluck('value', 'key'),
            'seo' => WebsiteConfiguration::getByGroup('seo')->pluck('value', 'key'),
            'social' => WebsiteConfiguration::getByGroup('social')->pluck('value', 'key'),
            'maintenance' => WebsiteConfiguration::getByGroup('maintenance')->pluck('value', 'key'),
        ];

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Initialize default configurations.
     */
    public function initializeDefaults(): JsonResponse
    {
        $defaultConfigs = [
            // General Settings
            ['key' => 'site_name', 'value' => 'Inveet', 'type' => 'string', 'group' => 'general', 'description' => 'Website name'],
            ['key' => 'site_tagline', 'value' => 'Beautiful Wedding Invitations', 'type' => 'string', 'group' => 'general', 'description' => 'Website tagline'],
            ['key' => 'site_url', 'value' => config('app.url'), 'type' => 'string', 'group' => 'general', 'description' => 'Website URL'],
            ['key' => 'contact_email', 'value' => 'info@inveet.com', 'type' => 'string', 'group' => 'general', 'description' => 'Contact email'],
            ['key' => 'contact_phone', 'value' => '+62 123 456 789', 'type' => 'string', 'group' => 'general', 'description' => 'Contact phone'],

            // SEO Settings
            ['key' => 'meta_title', 'value' => 'Inveet - Beautiful Wedding Invitations', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta title'],
            ['key' => 'meta_description', 'value' => 'Create beautiful and personalized wedding invitations with Inveet. Easy to use, professional designs.', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta description'],
            ['key' => 'meta_keywords', 'value' => 'wedding invitations, digital invitations, wedding cards, online invitations', 'type' => 'string', 'group' => 'seo', 'description' => 'Default meta keywords'],

            // Social Media
            ['key' => 'facebook_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Facebook page URL'],
            ['key' => 'instagram_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Instagram profile URL'],
            ['key' => 'twitter_url', 'value' => '', 'type' => 'string', 'group' => 'social', 'description' => 'Twitter profile URL'],

            // Maintenance Mode
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean', 'group' => 'maintenance', 'description' => 'Enable maintenance mode'],
            ['key' => 'maintenance_message', 'value' => 'We are currently performing maintenance. Please check back later.', 'type' => 'string', 'group' => 'maintenance', 'description' => 'Maintenance mode message'],
        ];

        $created = [];
        foreach ($defaultConfigs as $config) {
            if (!WebsiteConfiguration::where('key', $config['key'])->exists()) {
                $created[] = WebsiteConfiguration::create($config);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Default configurations initialized',
            'data' => $created
        ]);
    }
}
