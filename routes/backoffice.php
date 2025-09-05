<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackofficeController;

// Backoffice routes (protected with admin access)
Route::middleware(['auth', 'backoffice'])->prefix('backoffice')->group(function () {
    // Dashboard routes
    Route::get('/', [BackofficeController::class, 'dashboard'])->name('backoffice.dashboard');
    Route::get('/dashboard', [BackofficeController::class, 'dashboard'])->name('backoffice.dashboard.alt');

    // Management routes
    Route::get('/users', [BackofficeController::class, 'users'])->name('backoffice.users');
    Route::get('/users/{id}', [BackofficeController::class, 'userDetail'])->name('backoffice.users.detail');
    Route::get('/users/{id}/edit', [BackofficeController::class, 'userEdit'])->name('backoffice.users.edit');

    Route::get('/orders', [BackofficeController::class, 'orders'])->name('backoffice.orders');
    Route::get('/orders/{id}', [BackofficeController::class, 'orderDetail'])->name('backoffice.orders.detail');

    Route::get('/feedbacks', [BackofficeController::class, 'feedbacks'])->name('backoffice.feedbacks');
    Route::get('/feedbacks/{id}', [BackofficeController::class, 'feedbackDetail'])->name('backoffice.feedbacks.detail');

    Route::get('/themes', [BackofficeController::class, 'themes'])->name('backoffice.themes');
    Route::get('/themes/{id}', [BackofficeController::class, 'themeDetail'])->name('backoffice.themes.detail');
    Route::get('/themes/create', [BackofficeController::class, 'themeCreate'])->name('backoffice.themes.create');
    Route::get('/themes/{id}/edit', [BackofficeController::class, 'themeEdit'])->name('backoffice.themes.edit');

    Route::get('/coupons', [BackofficeController::class, 'coupons'])->name('backoffice.coupons');

    Route::get('/configurations', [BackofficeController::class, 'configurations'])->name('backoffice.configurations');
    Route::get('/configurations/{id}', [BackofficeController::class, 'configurationDetail'])->name('backoffice.configurations.detail');
    Route::get('/configurations/create', [BackofficeController::class, 'configurationCreate'])->name('backoffice.configurations.create');
});
