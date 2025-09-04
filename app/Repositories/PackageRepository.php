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

    public function findByUuid(string $uuid)
    {
        return $this->model->findByUuid($uuid);
    }

    public function updateByUuid(string $uuid, array $data)
    {
        $package = $this->findByUuid($uuid);
        if ($package) {
            $package->update($data);
            return $package;
        }
        return false;
    }

    public function deleteByUuid(string $uuid)
    {
        $package = $this->findByUuid($uuid);
        if ($package) {
            return $package->delete();
        }
        return false;
    }

    public function updateDiscount(int $packageId, int $discount)
    {
        return $this->update($packageId, ['discount' => $discount]);
    }

    public function updateDiscountByUuid(string $uuid, int $discount)
    {
        return $this->updateByUuid($uuid, ['discount' => $discount]);
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

    public function toggleRecommendationByUuid(string $uuid)
    {
        $package = $this->findByUuid($uuid);
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

    public function activatePackageByUuid(string $uuid)
    {
        return $this->updateByUuid($uuid, ['is_active' => true]);
    }

    public function deactivatePackage(int $packageId)
    {
        return $this->update($packageId, ['is_active' => false]);
    }

    public function deactivatePackageByUuid(string $uuid)
    {
        return $this->updateByUuid($uuid, ['is_active' => false]);
    }
}
