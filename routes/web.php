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

// Dashboard route (protected for customers only)
Route::get('/dashboard', [FrontendController::class, 'dashboard'])->middleware(['auth', 'customer'])->name('dashboard');

// Design selection route (protected for customers only)
Route::get('/design-selection', [FrontendController::class, 'designSelection'])->middleware(['auth', 'customer'])->name('design-selection');

// Checkout route (protected for customers only)
Route::get('/checkout/{package}', [FrontendController::class, 'checkout'])->middleware(['auth', 'customer'])->name('checkout');

// Coupon validation API routes (protected for customers)
Route::middleware(['auth', 'customer'])->group(function () {
    Route::post('/api/coupons/validate', [App\Http\Controllers\CouponController::class, 'validate']);
    Route::get('/api/coupons/available', [App\Http\Controllers\CouponController::class, 'available']);
});

// Backoffice routes (protected with admin access)
Route::middleware(['auth', 'backoffice'])->prefix('backoffice')->group(function () {
    Route::get('/', [FrontendController::class, 'backofficeDashboard'])->name('backoffice.dashboard');
    Route::get('/dashboard', [FrontendController::class, 'backofficeDashboard'])->name('backoffice.dashboard.alt');
    Route::get('/users', [FrontendController::class, 'backofficeUsers'])->name('backoffice.users');
    Route::get('/users/{user}', [FrontendController::class, 'backofficeUserDetail'])->name('backoffice.users.show');
    Route::get('/users/{user}/edit', [FrontendController::class, 'backofficeUserEdit'])->name('backoffice.users.edit');
    Route::get('/orders', [FrontendController::class, 'backofficeOrders'])->name('backoffice.orders');
    Route::get('/orders/{order}', [FrontendController::class, 'backofficeOrderDetail'])->name('backoffice.orders.show');
    Route::get('/feedbacks', [FrontendController::class, 'backofficeFeedbacks'])->name('backoffice.feedbacks');
    Route::get('/coupons', [FrontendController::class, 'backofficeCoupons'])->name('backoffice.coupons');
    Route::get('/coupons/create', [FrontendController::class, 'backofficeCouponCreate'])->name('backoffice.coupons.create');
    Route::get('/coupons/{coupon}', [FrontendController::class, 'backofficeCouponDetail'])->name('backoffice.coupons.show');
    Route::get('/coupons/{coupon}/edit', [FrontendController::class, 'backofficeCouponEdit'])->name('backoffice.coupons.edit');
    Route::get('/themes', [FrontendController::class, 'backofficeThemes'])->name('backoffice.themes');
    Route::get('/configurations', [FrontendController::class, 'backofficeConfigurations'])->name('backoffice.configurations');

    // API routes for backoffice (using web authentication with CSRF protection)
    Route::prefix('api')->group(function () {
        Route::get('/users/statistics', [FrontendController::class, 'backofficeUsersStatistics']);
        Route::get('/orders/statistics', [FrontendController::class, 'backofficeOrdersStatistics']);
        Route::get('/feedbacks/statistics', [FrontendController::class, 'backofficeFeedbacksStatistics']);
        Route::get('/themes/statistics', [FrontendController::class, 'backofficeThemesStatistics']);
        Route::post('/users/{user}/activate', [FrontendController::class, 'backofficeUserActivate']);
        Route::post('/users/{user}/deactivate', [FrontendController::class, 'backofficeUserDeactivate']);
        Route::post('/users/{user}/auto-login', [FrontendController::class, 'backofficeUserAutoLogin']);

        // Orders API routes
        Route::post('/orders/{order}/mark-paid', [FrontendController::class, 'backofficeOrdersMarkPaid']);
        Route::post('/orders/{order}/mark-void', [FrontendController::class, 'backofficeOrdersMarkVoid']);

        // Themes API routes
        Route::get('/themes', [FrontendController::class, 'backofficeThemesApi']);
        Route::post('/themes', [FrontendController::class, 'backofficeThemesStore']);
        Route::get('/themes/{theme}', [FrontendController::class, 'backofficeThemesShow']);
        Route::put('/themes/{theme}', [FrontendController::class, 'backofficeThemesUpdate']);
        Route::post('/themes/{theme}/toggle-active', [FrontendController::class, 'backofficeThemesToggleActive']);
        Route::post('/themes/{theme}/toggle-public', [FrontendController::class, 'backofficeThemesTogglePublic']);
        Route::delete('/themes/{theme}', [FrontendController::class, 'backofficeThemesDestroy']);

        // Feedbacks API routes
        Route::get('/feedbacks', [FrontendController::class, 'backofficeFeedbacksApi']);
        Route::post('/feedbacks/{feedback}/toggle-recommendation', [FrontendController::class, 'backofficeFeedbacksToggleRecommendation']);
        Route::post('/feedbacks/{feedback}/toggle-show-landing', [FrontendController::class, 'backofficeFeedbacksToggleShowLanding']);
        Route::delete('/feedbacks/{feedback}', [FrontendController::class, 'backofficeFeedbacksDestroy']);

        // Coupons API routes
        Route::get('/coupons', [FrontendController::class, 'backofficeCouponsApi']);
        Route::post('/coupons', [FrontendController::class, 'backofficeCouponsStore']);
        Route::get('/coupons/{coupon}', [FrontendController::class, 'backofficeCouponsShow']);
        Route::put('/coupons/{coupon}', [FrontendController::class, 'backofficeCouponsUpdate']);
        Route::post('/coupons/{coupon}/toggle-active', [FrontendController::class, 'backofficeCouponsToggleActive']);
        Route::delete('/coupons/{coupon}', [FrontendController::class, 'backofficeCouponsDestroy']);
        Route::get('/coupons/{coupon}/usage-stats', [FrontendController::class, 'backofficeCouponsUsageStats']);
        Route::get('/coupons/{coupon}/usages', [FrontendController::class, 'backofficeCouponsUsages']);
    });
});

// Simple dashboard test route
Route::get('/dashboard-simple', function () {
    return inertia('DashboardSimple', [
        'user' => null
    ]);
});

// Debug route for backoffice
Route::get('/backoffice-debug', function () {
    return response()->json([
        'auth' => auth()->check(),
        'user' => auth()->user(),
        'roles' => auth()->user() ? auth()->user()->roles->pluck('name') : null,
        'middleware' => 'working'
    ]);
})->middleware(['auth', 'backoffice']);

// Profile routes (accessible by all authenticated users)
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [FrontendController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [App\Http\Controllers\Profile\EditProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [App\Http\Controllers\Settings\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [App\Http\Controllers\Settings\PasswordController::class, 'update'])->name('password.update');
    Route::get('/profile/preferences', [App\Http\Controllers\Profile\PreferencesController::class, 'edit'])->name('profile.preferences');
    Route::patch('/profile/preferences', [App\Http\Controllers\Profile\PreferencesController::class, 'update'])->name('profile.preferences.update');
});

// Protected routes (require authentication and customer role)
Route::middleware(['auth', 'customer'])->group(function () {
    // Onboarding routes (no wedding required)
    Route::get('/onboarding', [FrontendController::class, 'onboarding'])->name('onboarding');
    Route::get('/onboarding/couple-info', [FrontendController::class, 'coupleInfo'])->name('onboarding.couple-info');
    Route::get('/onboarding/wedding-location', [FrontendController::class, 'weddingLocation'])->name('onboarding.wedding-location');
    Route::get('/onboarding/design-selection', [FrontendController::class, 'designSelection'])->name('onboarding.design-selection');
    Route::get('/onboarding/wedding-url', [FrontendController::class, 'weddingUrl'])->name('onboarding.wedding-url');
    Route::get('/onboarding/activation', [FrontendController::class, 'activation'])->name('onboarding.activation');

    // Routes that require wedding access
    Route::middleware('wedding.access')->group(function () {
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
