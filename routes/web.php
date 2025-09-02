<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\FrontendController;

// Test route to see if Inertia is working
Route::get('/test', function () {
    try {
        Log::info('Attempting to render Inertia page: Test');

        // Try to render a very simple page using the helper
        return inertia('Test', [
            'message' => 'Hello from Inertia!',
            'timestamp' => now()->toISOString()
        ]);
    } catch (\Exception $e) {
        Log::error('Inertia render failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
});

// Simple test route for React component
Route::get('/simple-test', function () {
    return inertia('SimpleTest');
});

// Simple test route without Inertia
Route::get('/simple-test-json', function () {
    Log::info('Simple test route executed');
    return response()->json(['message' => 'Simple route is working!']);
});

// Public routes (guest only)
Route::middleware('guest')->group(function () {
    Route::get('/login', [FrontendController::class, 'login'])->name('login');
    Route::get('/register', [FrontendController::class, 'register'])->name('register');
    Route::get('/forgot-password', [FrontendController::class, 'forgotPassword'])->name('password.request');
    Route::get('/reset-password/{token}', [FrontendController::class, 'resetPassword'])->name('password.reset');
});

// Public routes (no auth required)
Route::get('/', [FrontendController::class, 'landing'])->name('home');

// Dashboard route (temporarily without auth for testing)
Route::get('/dashboard', [FrontendController::class, 'dashboard'])->name('dashboard');

// Simple dashboard test route
Route::get('/dashboard-simple', function () {
    return inertia('DashboardSimple', [
        'user' => null
    ]);
});

// Onboarding routes (accessible without auth for testing)
Route::get('/onboarding', [FrontendController::class, 'onboarding'])->name('onboarding');
Route::get('/onboarding/couple-info', [FrontendController::class, 'coupleInfo'])->name('onboarding.couple-info');
Route::get('/onboarding/wedding-location', [FrontendController::class, 'weddingLocation'])->name('onboarding.wedding-location');
Route::get('/onboarding/design-selection', [FrontendController::class, 'designSelection'])->name('onboarding.design-selection');
Route::get('/onboarding/wedding-url', [FrontendController::class, 'weddingUrl'])->name('onboarding.wedding-url');
Route::get('/onboarding/activation', [FrontendController::class, 'activation'])->name('onboarding.activation');

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::get('/my-weddings', [FrontendController::class, 'myWeddings'])->name('weddings.my');
    Route::get('/orders', [FrontendController::class, 'orders'])->name('orders.index');
    Route::get('/analytics', [FrontendController::class, 'analytics'])->name('analytics.index');
    Route::get('/profile', [FrontendController::class, 'profile'])->name('profile');
    Route::get('/settings', [FrontendController::class, 'settings'])->name('settings');
});

// Public wedding routes
Route::get('/preview/{slug}', [FrontendController::class, 'showWedding'])->name('wedding.preview');
Route::get('/packages', [FrontendController::class, 'packages'])->name('packages.index');
Route::get('/packages/{id}', [FrontendController::class, 'packageDetails'])->name('packages.show');

// Catch-all route for SPA (must be last)
Route::get('/{any?}', [FrontendController::class, 'landing'])->where('any', '.*');

require __DIR__.'/auth.php';
