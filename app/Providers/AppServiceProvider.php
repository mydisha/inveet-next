<?php

namespace App\Providers;

use App\Repositories\BaseRepositoryInterface;
use App\Repositories\OrderRepository;
use App\Repositories\PackageRepository;
use App\Repositories\SpecialInvitationRepository;
use App\Repositories\UserRepository;
use App\Repositories\WeddingRepository;
use App\Services\BaseServiceInterface;
use App\Services\OrderService;
use App\Services\PackageService;
use App\Services\SpecialInvitationService;
use App\Services\UserService;
use App\Services\WeddingService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind repositories
        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository($app->make(\App\Models\User::class));
        });

        $this->app->bind(WeddingRepository::class, function ($app) {
            return new WeddingRepository($app->make(\App\Models\Wedding::class));
        });

        $this->app->bind(OrderRepository::class, function ($app) {
            return new OrderRepository($app->make(\App\Models\Order::class));
        });

        $this->app->bind(PackageRepository::class, function ($app) {
            return new PackageRepository($app->make(\App\Models\Package::class));
        });

        $this->app->bind(SpecialInvitationRepository::class, function ($app) {
            return new SpecialInvitationRepository($app->make(\App\Models\SpecialInvitation::class));
        });

        // Bind services
        $this->app->bind(UserService::class, function ($app) {
            return new UserService($app->make(UserRepository::class));
        });

        $this->app->bind(WeddingService::class, function ($app) {
            return new WeddingService($app->make(WeddingRepository::class));
        });

        $this->app->bind(OrderService::class, function ($app) {
            return new OrderService($app->make(OrderRepository::class));
        });

        $this->app->bind(PackageService::class, function ($app) {
            return new PackageService($app->make(PackageRepository::class));
        });

        $this->app->bind(SpecialInvitationService::class, function ($app) {
            return new SpecialInvitationService($app->make(SpecialInvitationRepository::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
