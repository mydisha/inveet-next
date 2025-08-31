<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\FrontendController;
use Inertia\Inertia;

// Public routes
Route::get('/', [FrontendController::class, 'landing'])->name('home');
Route::get('/login', [FrontendController::class, 'login'])->name('login.view');
Route::get('/register', [FrontendController::class, 'register'])->name('register.view');
Route::get('/forgot-password', [FrontendController::class, 'forgotPassword'])->name('password.request');

// Demo routes (publicly accessible for demo purposes)
Route::get('/dashboard', [FrontendController::class, 'dashboard'])->name('dashboard');
Route::get('/onboarding', [FrontendController::class, 'onboarding'])->name('onboarding');
Route::get('/onboarding/couple-info', [FrontendController::class, 'coupleInfo'])->name('onboarding.couple-info');
Route::get('/onboarding/wedding-details', [FrontendController::class, 'weddingDetails'])->name('onboarding.wedding-details');
Route::get('/onboarding/custom-url', [FrontendController::class, 'customUrl'])->name('onboarding.custom-url');
Route::get('/onboarding/design-selection', [FrontendController::class, 'designSelection'])->name('onboarding.design-selection');
Route::get('/onboarding/activation', [FrontendController::class, 'activation'])->name('onboarding.activation');

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::get('/my-weddings', [FrontendController::class, 'myWeddings'])->name('weddings.my');
    Route::get('/profile', [FrontendController::class, 'profile'])->name('profile');
    Route::get('/settings', [FrontendController::class, 'settings'])->name('settings');
});

// Public wedding routes
Route::get('/preview/{slug}', [FrontendController::class, 'showWedding'])->name('wedding.preview');
Route::get('/packages', [FrontendController::class, 'packages'])->name('packages.index');
Route::get('/packages/{id}', [FrontendController::class, 'packageDetails'])->name('packages.show');

// Catch-all route for SPA (temporarily disabled for debugging)
// Route::get('/{any?}', [FrontendController::class, 'landing'])->where('any', '.*');

require __DIR__.'/auth.php';
