<?php

namespace App\Services;

use App\Repositories\PackageRepository;

class PackageService implements BaseServiceInterface
{
    protected $packageRepository;

    public function __construct(PackageRepository $packageRepository)
    {
        $this->packageRepository = $packageRepository;
    }

    public function getAll(array $filters = [])
    {
        if (isset($filters['active_only']) && $filters['active_only']) {
            return $this->packageRepository->findActivePackages();
        }

        if (isset($filters['recommended_only']) && $filters['recommended_only']) {
            return $this->packageRepository->findRecommendedPackages();
        }

        if (isset($filters['discounted_only']) && $filters['discounted_only']) {
            return $this->packageRepository->findDiscountedPackages();
        }

        return $this->packageRepository->all();
    }

    public function findById(int $id)
    {
        return $this->packageRepository->find($id);
    }

    public function create(array $data)
    {
        // Set default values
        $data['is_active'] = $data['is_active'] ?? true;
        $data['is_recommended'] = $data['is_recommended'] ?? false;
        $data['price'] = $data['price'] ?? 0;
        $data['discount'] = $data['discount'] ?? 0;

        return $this->packageRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->packageRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->packageRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->packageRepository->paginate($perPage);
    }

    public function findActivePackages()
    {
        return $this->packageRepository->findActivePackages();
    }

    public function findRecommendedPackages()
    {
        return $this->packageRepository->findRecommendedPackages();
    }

    public function findByPriceRange(int $minPrice, int $maxPrice)
    {
        return $this->packageRepository->findByPriceRange($minPrice, $maxPrice);
    }

    public function findDiscountedPackages()
    {
        return $this->packageRepository->findDiscountedPackages();
    }

    public function updateDiscount(int $packageId, int $discount)
    {
        // Validate discount percentage
        if ($discount < 0 || $discount > 100) {
            return false;
        }

        return $this->packageRepository->updateDiscount($packageId, $discount);
    }

    public function toggleRecommendation(int $packageId)
    {
        return $this->packageRepository->toggleRecommendation($packageId);
    }

    public function activatePackage(int $packageId)
    {
        return $this->packageRepository->activatePackage($packageId);
    }

    public function deactivatePackage(int $packageId)
    {
        return $this->packageRepository->deactivatePackage($packageId);
    }

    public function calculateFinalPrice(int $packageId, int $quantity = 1): ?array
    {
        $package = $this->findById($packageId);
        if (!$package || !$package->is_active) {
            return null;
        }

        $originalPrice = $package->price;
        $discountAmount = ($originalPrice * $package->discount) / 100;
        $finalPrice = $originalPrice - $discountAmount;
        $totalPrice = $finalPrice * $quantity;

        return [
            'original_price' => $originalPrice,
            'discount_percentage' => $package->discount,
            'discount_amount' => $discountAmount,
            'final_price' => $finalPrice,
            'quantity' => $quantity,
            'total_price' => $totalPrice
        ];
    }

    public function getPackageStats(): array
    {
        $allPackages = $this->packageRepository->all();
        $activePackages = $this->packageRepository->findActivePackages();
        $recommendedPackages = $this->packageRepository->findRecommendedPackages();
        $discountedPackages = $this->packageRepository->findDiscountedPackages();

        return [
            'total_packages' => $allPackages->count(),
            'active_packages' => $activePackages->count(),
            'recommended_packages' => $recommendedPackages->count(),
            'discounted_packages' => $discountedPackages->count(),
            'average_price' => $allPackages->avg('price'),
            'total_revenue_potential' => $allPackages->sum('price')
        ];
    }
}
