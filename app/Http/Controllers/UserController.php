<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Services\SettingsService;
use App\Services\WeddingService;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends BaseController
{
    protected $userService;
    protected $settingsService;
    protected $weddingService;
    protected $analyticsService;

    public function __construct(
        UserService $userService,
        SettingsService $settingsService,
        WeddingService $weddingService,
        AnalyticsService $analyticsService
    ) {
        parent::__construct(app(\App\Services\AuthService::class));
        $this->userService = $userService;
        $this->settingsService = $settingsService;
        $this->weddingService = $weddingService;
        $this->analyticsService = $analyticsService;
    }

    /**
     * Show the dashboard
     */
    public function dashboard(Request $request)
    {
        $this->ensureFreshCsrfToken($request);

        return $this->renderWithUser('Dashboard', [], $request);
    }

    /**
     * Show user profile
     */
    public function profile(Request $request)
    {
        $this->ensureFreshCsrfToken($request);

        return $this->renderWithUser('Profile/Index', [], $request);
    }

    /**
     * Show settings
     */
    public function settings(Request $request)
    {
        return $this->renderWithUser('Settings/Index', [], $request);
    }

    /**
     * Show title settings
     */
    public function titleSettings(Request $request)
    {
        $titleSettings = $this->settingsService->getTitleSettings();

        return $this->renderWithUser('Settings/title', [
            'weddingId' => $request->query('wedding'),
            'titleSettings' => $titleSettings,
        ], $request);
    }

    /**
     * Show gallery page
     */
    public function gallery(Request $request)
    {
        return $this->renderWithUser('Gallery', [], $request);
    }

    /**
     * Show analytics dashboard
     */
    public function analytics(Request $request)
    {
        $user = $this->getUser($request);
        $weddings = $this->weddingService->findByUserId($user->id);
        $analytics = $this->analyticsService->getWeddingAnalytics();

        return $this->renderWithUser('Analytics/Index', [
            'weddings' => $weddings,
            'stats' => $analytics,
        ], $request);
    }
}
