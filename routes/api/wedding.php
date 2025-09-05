<?php

use App\Http\Controllers\WeddingController;
use App\Http\Controllers\SpecialInvitationController;
use Illuminate\Support\Facades\Route;

// Public wedding routes
Route::get('/weddings', [WeddingController::class, 'index']);
Route::get('/weddings/published', [WeddingController::class, 'index']);
Route::get('/weddings/{uuid}', [WeddingController::class, 'show']);
Route::get('/weddings/slug/{slug}', [WeddingController::class, 'findBySlug']);
Route::post('/weddings/{uuid}/increment-view', [WeddingController::class, 'incrementViewCount']);

// Public special invitation routes
Route::get('/invitations/{uuid}/validate-password', [SpecialInvitationController::class, 'validatePassword']);

// Protected wedding routes
Route::middleware('auth:sanctum')->group(function () {
    // Wedding management routes
    Route::post('/weddings', [WeddingController::class, 'store']);
    Route::put('/weddings/{uuid}', [WeddingController::class, 'update']);
    Route::delete('/weddings/{uuid}', [WeddingController::class, 'destroy']);
    Route::get('/user/weddings', [WeddingController::class, 'findByUserId']);
    Route::get('/user/weddings/drafts', [WeddingController::class, 'getDraftWeddings']);
    Route::post('/weddings/{uuid}/publish', [WeddingController::class, 'publish']);
    Route::post('/weddings/{uuid}/unpublish', [WeddingController::class, 'unpublish']);
    Route::post('/weddings/{uuid}/activate', [WeddingController::class, 'activate']);
    Route::post('/weddings/{uuid}/deactivate', [WeddingController::class, 'deactivate']);
    Route::post('/weddings/{uuid}/mark-draft', [WeddingController::class, 'markAsDraft']);
    Route::get('/weddings/theme/{themeId}', [WeddingController::class, 'findByThemeId']);

    // Special invitation management routes
    Route::post('/invitations', [SpecialInvitationController::class, 'store']);
    Route::put('/invitations/{uuid}', [SpecialInvitationController::class, 'update']);
    Route::delete('/invitations/{uuid}', [SpecialInvitationController::class, 'destroy']);
    Route::get('/weddings/{weddingUuid}/invitations', [SpecialInvitationController::class, 'findByWeddingId']);
    Route::get('/invitations/slug/{slug}', [SpecialInvitationController::class, 'findBySlug']);
    Route::post('/invitations/bulk', [SpecialInvitationController::class, 'createBulk']);
    Route::post('/invitations/{uuid}/lock', [SpecialInvitationController::class, 'lock']);
    Route::post('/invitations/{uuid}/unlock', [SpecialInvitationController::class, 'unlock']);
    Route::put('/invitations/{uuid}/password', [SpecialInvitationController::class, 'updatePassword']);
    Route::delete('/invitations/{uuid}/password', [SpecialInvitationController::class, 'removePassword']);
    Route::get('/weddings/{weddingUuid}/invitations/active', [SpecialInvitationController::class, 'getByWeddingIdAndActive']);
    Route::post('/invitations/{uuid}/toggle-lock', [SpecialInvitationController::class, 'toggleLock']);
});
