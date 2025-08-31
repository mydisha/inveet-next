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
     * Show the register page
     */
    public function register()
    {
        return Inertia::render('auth/Register');
    }

    /**
     * Show the forgot password page
     */
    public function forgotPassword()
    {
        return Inertia::render('auth/forgot-password');
    }

    /**
     * Show the dashboard
     */
    public function dashboard(Request $request)
    {
        // Get user data if authenticated, otherwise provide demo data
        $user = $request->user();
        
        if ($user) {
            // Real user data
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'hasWedding' => $user->weddings()->exists(),
            ];
        } else {
            // Demo data for public access
            $userData = [
                'id' => null,
                'name' => 'Demo User',
                'email' => 'demo@inveet.com',
                'hasWedding' => false,
                'isDemo' => true,
            ];
        }
        
        return Inertia::render('Dashboard', [
            'user' => $userData,
        ]);
    }

    /**
     * Show the onboarding overview
     */
    public function onboarding()
    {
        return Inertia::render('Onboarding');
    }

    /**
     * Show the couple info step
     */
    public function coupleInfo()
    {
        return Inertia::render('Onboarding/CoupleInfo');
    }

    /**
     * Show the wedding details step
     */
    public function weddingDetails()
    {
        return Inertia::render('Onboarding/WeddingDetails');
    }

    /**
     * Show the custom URL step
     */
    public function customUrl()
    {
        return Inertia::render('Onboarding/CustomUrl');
    }

    /**
     * Show the design selection step
     */
    public function designSelection()
    {
        return Inertia::render('Onboarding/DesignSelection');
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

        // Add demo data if no packages found
        if ($packages->isEmpty()) {
            $packages = collect([
                [
                    'id' => 1,
                    'name' => 'Starter Package',
                    'description' => 'Perfect for intimate weddings',
                    'price' => 29.99,
                    'features' => ['Basic templates', 'RSVP tracking', 'Email support'],
                    'isDemo' => true,
                ],
                [
                    'id' => 2,
                    'name' => 'Premium Package',
                    'description' => 'Everything you need for your special day',
                    'price' => 59.99,
                    'features' => ['Premium templates', 'Advanced RSVP', 'Priority support', 'Custom domain'],
                    'isDemo' => true,
                ],
                [
                    'id' => 3,
                    'name' => 'Luxury Package',
                    'description' => 'The ultimate wedding invitation experience',
                    'price' => 99.99,
                    'features' => ['All templates', 'Full customization', '24/7 support', 'Custom domain', 'Analytics'],
                    'isDemo' => true,
                ],
            ]);
        }

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
}
