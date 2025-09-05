<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Protected user routes
Route::middleware('auth:sanctum')->group(function () {
    // User profile routes
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/user/find-by-email', [UserController::class, 'findByEmail']);

    // Settings management routes
    Route::get('/settings/title', [UserController::class, 'getTitleSettings']);
    Route::patch('/settings/title/{weddingId?}', [UserController::class, 'updateTitleSettings']);
});
