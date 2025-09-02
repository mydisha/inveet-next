<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    /**
     * Show the landing page
     */
    public function landing()
    {
        return Inertia::render('Landing');
    }

    /**
     * Show the login page
     */
    public function login()
    {
        return Inertia::render('auth/login');
    }

    /**
     * Show the forgot password page
     */
    public function forgotPassword()
    {
        return Inertia::render('auth/ForgotPassword');
    }

    /**
     * Show the reset password page
     */
    public function resetPassword(Request $request, $token)
    {
        return Inertia::render('auth/ResetPassword', [
            'email' => $request->query('email'),
            'token' => $token,
        ]);
    }

    /**
     * Show the register page
     */
    public function register()
    {
        return Inertia::render('auth/register');
    }

    /**
     * Show the dashboard
     */
    public function dashboard(Request $request)
    {
        // Get user data if authenticated
        $user = $request->user();

        return Inertia::render('DashboardFixed', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->weddings()->exists(),
            ] : null,
        ]);
    }

    /**
     * Show the onboarding overview
     */
    public function onboarding(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/index', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->weddings()->exists(),
            ] : null,
            'currentStep' => 1,
        ]);
    }

    /**
     * Show the couple info step
     */
    public function coupleInfo(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/couple-info', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Show the wedding location step
     */
    public function weddingLocation(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/wedding-location', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Show the design selection step
     */
    public function designSelection(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/design-selection', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Show the wedding URL step
     */
    public function weddingUrl(Request $request)
    {
        $user = $request->user();

        return Inertia::render('onboarding/wedding-url', [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }

    /**
     * Show the activation step
     */
    public function activation()
    {
        return Inertia::render('Onboarding/Activation');
    }

    /**
     * Show a specific wedding by slug
     */
    public function showWedding($slug)
    {
        // Get wedding data from API
        $wedding = app(\App\Services\WeddingService::class)->findBySlug($slug);

        if (!$wedding) {
            abort(404);
        }

        return Inertia::render('Wedding/Show', [
            'wedding' => $wedding,
        ]);
    }

    /**
     * Show user's weddings
     */
    public function myWeddings(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $weddings = $user->weddings()->with('package')->get();

        return Inertia::render('Wedding/MyWeddings', [
            'weddings' => $weddings,
        ]);
    }

    /**
     * Show packages
     */
    public function packages()
    {
        $packages = app(\App\Services\PackageService::class)->findActivePackages();

        return Inertia::render('Package/Index', [
            'packages' => $packages,
        ]);
    }

    /**
     * Show package details
     */
    public function packageDetails($id)
    {
        $package = app(\App\Services\PackageService::class)->findById($id);

        if (!$package) {
            abort(404);
        }

        return Inertia::render('Package/Show', [
            'package' => $package,
        ]);
    }

    /**
     * Show user profile
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        return Inertia::render('Profile/Index', [
            'user' => $user,
        ]);
    }

    /**
     * Show settings
     */
    public function settings(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        return Inertia::render('Settings/Index', [
            'user' => $user,
        ]);
    }

    /**
     * Show user's orders
     */
    public function orders(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $orders = $user->orders()->with(['package', 'wedding'])->get();

        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show analytics dashboard
     */
    public function analytics(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Get user's wedding analytics
        $weddings = $user->weddings()->with(['package'])->get();
        $totalViews = $weddings->sum('views');
        $totalOrders = $user->orders()->count();

        return Inertia::render('Analytics/Index', [
            'user' => $user,
            'weddings' => $weddings,
            'stats' => [
                'totalWeddings' => $weddings->count(),
                'totalViews' => $totalViews,
                'totalOrders' => $totalOrders,
            ],
        ]);
    }
}
