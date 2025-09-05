<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\OnboardingController;

// Public wedding routes
Route::get('/preview/{slug}', [WeddingController::class, 'show'])->name('wedding.preview');
Route::get('/invitation/{slug}', [WeddingController::class, 'showInvitation'])->name('wedding.invitation');

// Protected wedding routes (require authentication and customer role)
Route::middleware(['auth', 'customer'])->group(function () {
    // Routes that require wedding access
    Route::middleware('wedding.access')->group(function () {
        // Wedding management routes
        Route::get('/my-weddings', [WeddingController::class, 'myWeddings'])->name('weddings.my');
        Route::get('/wedding-invitations', [WeddingController::class, 'invitations'])->name('weddings.invitations');
        Route::get('/wedding/{uuid}', [WeddingController::class, 'detail'])->name('wedding.detail');
        Route::get('/wedding/{uuid}/configuration', [WeddingController::class, 'configuration'])->name('weddings.configuration');
        Route::get('/weddings/{uuid}/design-configuration', [OnboardingController::class, 'designConfiguration'])->name('weddings.design-configuration');
        Route::get('/wedding/{uuid}/couple', [WeddingController::class, 'coupleInfo'])->name('wedding.couple');
        Route::get('/wedding/{uuid}/location-time', [WeddingController::class, 'venueInfo'])->name('wedding.venue-info');
        Route::get('/wedding/{uuid}/guests', [WeddingController::class, 'guestList'])->name('wedding.guests');

        // Guestbook routes
        Route::get('/guestbook', [WeddingController::class, 'guestbook'])->name('guestbook.index');
        Route::get('/wedding/{uuid}/guestbook', [WeddingController::class, 'guestbook'])->name('wedding.guestbook');
    });
});
