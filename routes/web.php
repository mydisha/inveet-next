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

// Dashboard route (protected)
Route::get('/dashboard', [FrontendController::class, 'dashboard'])->middleware('auth')->name('dashboard');

// Simple dashboard test route
Route::get('/dashboard-simple', function () {
    return inertia('DashboardSimple', [
        'user' => null
    ]);
});

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    // Onboarding routes
    Route::get('/onboarding', [FrontendController::class, 'onboarding'])->name('onboarding');
    Route::get('/onboarding/couple-info', [FrontendController::class, 'coupleInfo'])->name('onboarding.couple-info');
    Route::get('/onboarding/wedding-location', [FrontendController::class, 'weddingLocation'])->name('onboarding.wedding-location');
    Route::get('/onboarding/design-selection', [FrontendController::class, 'designSelection'])->name('onboarding.design-selection');
    Route::get('/onboarding/wedding-url', [FrontendController::class, 'weddingUrl'])->name('onboarding.wedding-url');
    Route::get('/onboarding/activation', [FrontendController::class, 'activation'])->name('onboarding.activation');

    // Dashboard routes
    Route::get('/my-weddings', [FrontendController::class, 'myWeddings'])->name('weddings.my');
    Route::get('/wedding-invitations', [FrontendController::class, 'weddingInvitations'])->name('weddings.invitations');
    Route::get('/wedding/{uuid}', [FrontendController::class, 'weddingDetail'])->name('wedding.detail');
    Route::get('/wedding/{uuid}/configuration', [FrontendController::class, 'weddingConfiguration'])->name('weddings.configuration');
    Route::get('/weddings/{uuid}/design-configuration', [FrontendController::class, 'designConfiguration'])->name('weddings.design-configuration');
    Route::get('/wedding/{uuid}/couple', [FrontendController::class, 'weddingCoupleInfo'])->name('wedding.couple');
    Route::get('/wedding/{uuid}/location-time', [FrontendController::class, 'weddingVenueInfo'])->name('wedding.venue-info');
    Route::get('/wedding/{uuid}/guests', [FrontendController::class, 'guestList'])->name('wedding.guests');
    Route::get('/orders', [FrontendController::class, 'orders'])->name('orders.index');
    Route::get('/gallery', [FrontendController::class, 'gallery'])->name('gallery.index');
    Route::get('/analytics', [FrontendController::class, 'analytics'])->name('analytics.index');
    Route::get('/profile', [FrontendController::class, 'profile'])->name('profile');
    Route::get('/settings', [FrontendController::class, 'settings'])->name('settings');
    Route::get('/settings/title', [FrontendController::class, 'titleSettings'])->name('settings.title');

    // Music routes
    Route::get('/music', [FrontendController::class, 'music'])->name('music.index');
    Route::get('/music/library', [FrontendController::class, 'musicLibrary'])->name('music.library');
    Route::get('/music/upload', [FrontendController::class, 'musicUpload'])->name('music.upload');

    // Checkout routes
    Route::get('/checkout', [FrontendController::class, 'checkout'])->name('checkout');
    Route::get('/checkout/payment', [FrontendController::class, 'checkoutPayment'])->name('checkout.payment');
    Route::get('/checkout/success', [FrontendController::class, 'checkoutSuccess'])->name('checkout.success');

    // Reception QR Scanner routes
    Route::get('/reception/scanner', [FrontendController::class, 'receptionScanner'])->name('reception.scanner');
    Route::get('/reception/monitor', [FrontendController::class, 'monitorDisplay'])->name('reception.monitor');
    Route::get('/reception/guest/{uuid}', [FrontendController::class, 'guestGreeting'])->name('reception.guest');

    // Guestbook routes
    Route::get('/guestbook', [FrontendController::class, 'guestbook'])->name('guestbook.index');
    Route::get('/wedding/{uuid}/guestbook', [FrontendController::class, 'guestbook'])->name('wedding.guestbook');
});

// Public wedding routes
Route::get('/preview/{slug}', [FrontendController::class, 'showWedding'])->name('wedding.preview');
Route::get('/invitation/{slug}', [FrontendController::class, 'showWeddingInvitation'])->name('wedding.invitation');
Route::get('/packages', [FrontendController::class, 'packages'])->name('packages.index');
    Route::get('/packages/{uuid}', [FrontendController::class, 'packageDetails'])->name('packages.show');

// Test routes
Route::get('/test/qr', function () {
    return inertia('Test/QRTest');
})->name('test.qr');

// Test 404 page
Route::get('/test/404', function () {
    return inertia('NotFound', [
        'status' => 404,
        'message' => 'Test 404 page - Halaman yang Anda cari tidak ditemukan'
    ]);
})->name('test.404');

// Error pages
Route::get('/419', [FrontendController::class, 'pageExpired'])->name('page.expired');

// 404 Not Found route
Route::fallback([FrontendController::class, 'notFound']);

require __DIR__.'/auth.php';
