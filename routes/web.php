<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ReceptionController;
use App\Http\Controllers\BackofficeController;
use App\Http\Controllers\InvitationController;

// Include domain-specific route files
require __DIR__.'/public.php';
require __DIR__.'/auth.php';
require __DIR__.'/user.php';
require __DIR__.'/wedding.php';
require __DIR__.'/packages.php';
require __DIR__.'/backoffice.php';

// Invitation routes
Route::get('/invitation/{slug}', [InvitationController::class, 'show'])->name('invitation.show');
Route::get('/invitation/{slug}/theme/{themeId}', [InvitationController::class, 'showWithTheme'])->name('invitation.show.theme');
Route::post('/api/weddings/rsvp', [InvitationController::class, 'submitRSVP'])->name('invitation.rsvp');
Route::post('/api/weddings/comments', [InvitationController::class, 'submitComment'])->name('invitation.comment');

// Sample routes for testing converted templates
Route::get('/sample-invitation/{themeId}', [InvitationController::class, 'showSample'])->name('invitation.sample');

// Test routes for elegant invitation template
Route::get('/test-elegant-invitation', function () {
    return inertia('Wedding/ElegantInvitationDemo');
})->name('test.elegant.invitation');

Route::get('/test-simple-elegant', function () {
    return inertia('Wedding/TestElegantInvitation');
})->name('test.simple.elegant');

Route::get('/test-scenarios', function () {
    return inertia('Wedding/TestDataScenarios');
})->name('test.scenarios');
