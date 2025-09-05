<?php

namespace App\Http\Controllers;

use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends BaseController
{
    protected $packageService;

    public function __construct(PackageService $packageService)
    {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->packageService = $packageService;
    }

    /**
     * Show packages
     */
    public function index()
    {
        $packages = $this->packageService->findActivePackages();

        return Inertia::render('Package/Index', [
            'packages' => $packages,
        ]);
    }

    /**
     * Show package details
     */
    public function show($id)
    {
        $package = $this->packageService->findById($id);

        if (!$package) {
            abort(404);
        }

        return Inertia::render('Package/Show', [
            'package' => $package,
        ]);
    }
}
