<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ReceptionController;

// Profile routes (accessible by all authenticated users)
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [App\Http\Controllers\Profile\EditProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [App\Http\Controllers\Settings\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [App\Http\Controllers\Settings\PasswordController::class, 'update'])->name('password.update');
    Route::get('/profile/preferences', [App\Http\Controllers\Profile\PreferencesController::class, 'edit'])->name('profile.preferences');
    Route::patch('/profile/preferences', [App\Http\Controllers\Profile\PreferencesController::class, 'update'])->name('profile.preferences.update');
});

// Dashboard route (protected for customers only)
Route::get('/dashboard', [UserController::class, 'dashboard'])->middleware(['auth', 'customer'])->name('dashboard');

// Protected routes (require authentication and customer role)
Route::middleware(['auth', 'customer'])->group(function () {
    // Onboarding routes (no wedding required)
    Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
    Route::get('/onboarding/couple-info', [OnboardingController::class, 'coupleInfo'])->name('onboarding.couple-info');
    Route::get('/onboarding/wedding-location', [OnboardingController::class, 'weddingLocation'])->name('onboarding.wedding-location');
    Route::get('/onboarding/design-selection', [OnboardingController::class, 'designSelection'])->name('onboarding.design-selection');
    Route::get('/onboarding/wedding-url', [OnboardingController::class, 'weddingUrl'])->name('onboarding.wedding-url');
    Route::get('/onboarding/activation', [OnboardingController::class, 'activation'])->name('onboarding.activation');

    // Design selection route (protected for customers only)
    Route::get('/design-selection', [OnboardingController::class, 'designSelection'])->name('design-selection');

    // Routes that require wedding access
    Route::middleware('wedding.access')->group(function () {
        // User management routes
        Route::get('/gallery', [UserController::class, 'gallery'])->name('gallery.index');
        Route::get('/analytics', [UserController::class, 'analytics'])->name('analytics.index');
        Route::get('/settings', [UserController::class, 'settings'])->name('settings');
        Route::get('/settings/title', [UserController::class, 'titleSettings'])->name('settings.title');

        // Order routes
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
        Route::get('/checkout/{package}', [OrderController::class, 'checkout'])->name('checkout.package');
        Route::get('/checkout/payment', [OrderController::class, 'checkoutPayment'])->name('checkout.payment');
        Route::get('/checkout/success', [OrderController::class, 'checkoutSuccess'])->name('checkout.success');

        // Music routes
        Route::get('/music', [MusicController::class, 'index'])->name('music.index');
        Route::get('/music/library', [MusicController::class, 'library'])->name('music.library');
        Route::get('/music/upload', [MusicController::class, 'upload'])->name('music.upload');

        // Reception QR Scanner routes
        Route::get('/reception/scanner', [ReceptionController::class, 'scanner'])->name('reception.scanner');
        Route::get('/reception/monitor', [ReceptionController::class, 'monitorDisplay'])->name('reception.monitor');
        Route::get('/reception/guest/{uuid}', [ReceptionController::class, 'guestGreeting'])->name('reception.guest');
    });
});
