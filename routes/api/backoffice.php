<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackofficeController;

// Backoffice API routes (protected with admin access)
Route::middleware(['auth', 'backoffice'])->prefix('backoffice')->group(function () {
    // User management API
    Route::get('/users/search', [BackofficeController::class, 'usersSearch'])->name('backoffice.api.users.search');
    Route::put('/users/{id}', [BackofficeController::class, 'updateUser'])->name('backoffice.api.users.update');
    Route::delete('/users/{id}', [BackofficeController::class, 'deleteUser'])->name('backoffice.api.users.delete');

    // Order management API
    Route::post('/orders/{id}/mark-paid', [BackofficeController::class, 'markOrderAsPaid'])->name('backoffice.api.orders.mark-paid');
    Route::post('/orders/{id}/mark-void', [BackofficeController::class, 'markOrderAsVoid'])->name('backoffice.api.orders.mark-void');
    Route::get('/orders/payment-types', [BackofficeController::class, 'getOrderPaymentTypes'])->name('backoffice.api.orders.payment-types');

    // Configuration management API
    Route::get('/configurations', [BackofficeController::class, 'getConfigurations'])->name('backoffice.api.configurations.index');
    Route::get('/configurations/{id}', [BackofficeController::class, 'getConfiguration'])->name('backoffice.api.configurations.show');
    Route::put('/configurations/{id}', [BackofficeController::class, 'updateConfiguration'])->name('backoffice.api.configurations.update');
    Route::delete('/configurations/{id}', [BackofficeController::class, 'deleteConfiguration'])->name('backoffice.api.configurations.delete');
    Route::post('/configurations/initialize-defaults', [BackofficeController::class, 'initializeDefaultConfigurations'])->name('backoffice.api.configurations.initialize');

    // Activity logs API
    Route::get('/activity-logs', [BackofficeController::class, 'getActivityLogs'])->name('backoffice.api.activity-logs.index');
    Route::get('/activity-logs/performance', [BackofficeController::class, 'getActivityLogsPerformance'])->name('backoffice.api.activity-logs.performance');
    Route::get('/activity-logs/categories', [BackofficeController::class, 'getActivityLogsCategories'])->name('backoffice.api.activity-logs.categories');
    Route::get('/activity-logs/recent-changes', [BackofficeController::class, 'getActivityLogsRecentChanges'])->name('backoffice.api.activity-logs.recent-changes');
    Route::get('/activity-logs/statistics', [BackofficeController::class, 'getActivityLogsStatistics'])->name('backoffice.api.activity-logs.statistics');
    Route::get('/activity-logs/filters', [BackofficeController::class, 'getActivityLogsFilters'])->name('backoffice.api.activity-logs.filters');
});
