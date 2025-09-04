<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backoffice\UserController;
use App\Http\Controllers\Backoffice\OrderController;
use App\Http\Controllers\Backoffice\FeedbackController;
use App\Http\Controllers\Backoffice\ThemeController;
use App\Http\Controllers\Backoffice\ConfigurationController;

/*
|--------------------------------------------------------------------------
| Backoffice Routes
|--------------------------------------------------------------------------
|
| Here is where you can register backoffice routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "backoffice" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum', 'backoffice'])->prefix('backoffice')->group(function () {

    // Dashboard/Statistics
    Route::get('/dashboard', function () {
        return response()->json([
            'success' => true,
            'message' => 'Backoffice dashboard accessed successfully'
        ]);
    });

    // User Management
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/statistics', [UserController::class, 'statistics']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::post('/{user}/auto-login', [UserController::class, 'autoLogin']);
        Route::post('/{user}/activate', [UserController::class, 'activate']);
        Route::post('/{user}/deactivate', [UserController::class, 'deactivate']);
    });

    // Order Management
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/statistics', [OrderController::class, 'statistics']);
        Route::get('/{order}', [OrderController::class, 'show']);
        Route::put('/{order}', [OrderController::class, 'update']);
        Route::post('/{order}/mark-paid', [OrderController::class, 'markAsPaid']);
        Route::post('/{order}/mark-void', [OrderController::class, 'markAsVoid']);
    });

    // Feedback Management
    Route::prefix('feedbacks')->group(function () {
        Route::get('/', [FeedbackController::class, 'index']);
        Route::get('/statistics', [FeedbackController::class, 'statistics']);
        Route::get('/{feedback}', [FeedbackController::class, 'show']);
        Route::put('/{feedback}', [FeedbackController::class, 'update']);
        Route::post('/{feedback}/toggle-recommendation', [FeedbackController::class, 'toggleRecommendation']);
        Route::post('/{feedback}/toggle-show-landing', [FeedbackController::class, 'toggleShowOnLanding']);
        Route::delete('/{feedback}', [FeedbackController::class, 'destroy']);
    });

    // Theme Management
    Route::prefix('themes')->group(function () {
        Route::get('/', [ThemeController::class, 'index']);
        Route::post('/', [ThemeController::class, 'store']);
        Route::get('/statistics', [ThemeController::class, 'statistics']);
        Route::get('/{theme}', [ThemeController::class, 'show']);
        Route::put('/{theme}', [ThemeController::class, 'update']);
        Route::post('/{theme}/toggle-active', [ThemeController::class, 'toggleActive']);
        Route::post('/{theme}/toggle-public', [ThemeController::class, 'togglePublic']);
        Route::delete('/{theme}', [ThemeController::class, 'destroy']);
    });

    // Website Configuration
    Route::prefix('configurations')->group(function () {
        Route::get('/', [ConfigurationController::class, 'index']);
        Route::post('/', [ConfigurationController::class, 'store']);
        Route::get('/groups', [ConfigurationController::class, 'getGroups']);
        Route::get('/group/{group}', [ConfigurationController::class, 'getByGroup']);
        Route::get('/website-settings', [ConfigurationController::class, 'getWebsiteSettings']);
        Route::post('/initialize-defaults', [ConfigurationController::class, 'initializeDefaults']);
        Route::post('/update-multiple', [ConfigurationController::class, 'updateMultiple']);
        Route::get('/{configuration}', [ConfigurationController::class, 'show']);
        Route::put('/{configuration}', [ConfigurationController::class, 'update']);
        Route::delete('/{configuration}', [ConfigurationController::class, 'destroy']);
    });

});
