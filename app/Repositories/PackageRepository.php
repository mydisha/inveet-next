<?php

namespace App\Repositories;

use App\Models\Package;

class PackageRepository extends BaseRepository
{
    public function __construct(Package $model)
    {
        parent::__construct($model);
    }

    public function findActivePackages()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findRecommendedPackages()
    {
        return $this->model->where('is_recommended', true)
                          ->where('is_active', true)
                          ->get();
    }

    public function findByPriceRange(int $minPrice, int $maxPrice)
    {
        return $this->model->where('is_active', true)
                          ->whereBetween('price', [$minPrice, $maxPrice])
                          ->get();
    }

    public function findDiscountedPackages()
    {
        return $this->model->where('is_active', true)
                          ->where('discount', '>', 0)
                          ->get();
    }

    public function updateDiscount(int $packageId, int $discount)
    {
        return $this->update($packageId, ['discount' => $discount]);
    }

    public function toggleRecommendation(int $packageId)
    {
        $package = $this->find($packageId);
        if ($package) {
            $package->is_recommended = !$package->is_recommended;
            $package->save();
            return $package;
        }
        return false;
    }

    public function activatePackage(int $packageId)
    {
        return $this->update($packageId, ['is_active' => true]);
    }

    public function deactivatePackage(int $packageId)
    {
        return $this->update($packageId, ['is_active' => false]);
    }
}
