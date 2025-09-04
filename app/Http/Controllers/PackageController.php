<?php

namespace App\Http\Controllers;

use App\Http\Requests\Package\StorePackageRequest;
use App\Services\PackageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PackageController extends Controller
{
    protected $packageService;

    public function __construct(PackageService $packageService)
    {
        $this->packageService = $packageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['active_only', 'recommended_only', 'discounted_only']);
        $packages = $this->packageService->getAll($filters);

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Packages retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePackageRequest $request): JsonResponse
    {
        $package = $this->packageService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package created successfully'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid): JsonResponse
    {
        $package = $this->packageService->findByUuid($uuid);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uuid): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|integer|min:0',
            'discount' => 'sometimes|nullable|integer|min:0|max:100',
            'is_recommended' => 'sometimes|boolean',
            'is_active' => 'sometimes|boolean',
        ]);

        $package = $this->packageService->updateByUuid($uuid, $request->validated());

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid): JsonResponse
    {
        $deleted = $this->packageService->deleteByUuid($uuid);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Package deleted successfully'
        ]);
    }

    /**
     * Get active packages
     */
    public function getActivePackages(): JsonResponse
    {
        $packages = $this->packageService->findActivePackages();

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Active packages retrieved successfully'
        ]);
    }

    /**
     * Get recommended packages
     */
    public function getRecommendedPackages(): JsonResponse
    {
        $packages = $this->packageService->findRecommendedPackages();

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Recommended packages retrieved successfully'
        ]);
    }

    /**
     * Get packages by price range
     */
    public function getByPriceRange(Request $request): JsonResponse
    {
        $request->validate([
            'min_price' => 'required|integer|min:0',
            'max_price' => 'required|integer|min:0|gte:min_price'
        ]);

        $packages = $this->packageService->findByPriceRange(
            $request->min_price,
            $request->max_price
        );

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Packages by price range retrieved successfully'
        ]);
    }

    /**
     * Get discounted packages
     */
    public function getDiscountedPackages(): JsonResponse
    {
        $packages = $this->packageService->findDiscountedPackages();

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Discounted packages retrieved successfully'
        ]);
    }

    /**
     * Update package discount
     */
    public function updateDiscount(Request $request, string $uuid): JsonResponse
    {
        $request->validate([
            'discount' => 'required|integer|min:0|max:100'
        ]);

        $updated = $this->packageService->updateDiscountByUuid($uuid, $request->discount);

        if (!$updated) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found or invalid discount'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => 'Package discount updated successfully'
        ]);
    }

    /**
     * Toggle package recommendation
     */
    public function toggleRecommendation(string $uuid): JsonResponse
    {
        $toggled = $this->packageService->toggleRecommendationByUuid($uuid);

        if (!$toggled) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $toggled,
            'message' => 'Package recommendation toggled successfully'
        ]);
    }

    /**
     * Activate package
     */
    public function activate(string $uuid): JsonResponse
    {
        $activated = $this->packageService->activatePackageByUuid($uuid);

        if (!$activated) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Package activated successfully'
        ]);
    }

    /**
     * Deactivate package
     */
    public function deactivate(string $uuid): JsonResponse
    {
        $deactivated = $this->packageService->deactivatePackageByUuid($uuid);

        if (!$deactivated) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Package deactivated successfully'
        ]);
    }

    /**
     * Calculate final price for a package
     */
    public function calculatePrice(Request $request, string $uuid): JsonResponse
    {
        $request->validate([
            'quantity' => 'sometimes|integer|min:1'
        ]);

        $priceDetails = $this->packageService->calculateFinalPriceByUuid(
            $uuid,
            $request->input('quantity', 1)
        );

        if (!$priceDetails) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found or inactive'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $priceDetails,
            'message' => 'Price calculated successfully'
        ]);
    }

    /**
     * Get package statistics
     */
    public function getStats(): JsonResponse
    {
        $stats = $this->packageService->getPackageStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
            'message' => 'Package statistics retrieved successfully'
        ]);
    }
}
